define([
  "js/helper",
  "js/core/permission",  

  "esri/tasks/QueryTask",
  "esri/tasks/support/Query",
  "esri/core/watchUtils"
], function (
  Helper,
  Permission,
  
  QueryTask,
  Query,
  watchUtils
) {

  var __filtersinsector = {
      sqlperiod: '',
      sqltension: '',
      sqlcliente: '',
    },
    __arr_filtergeometries = [],
    $body = $('body');

  var __urlservicio_clientes = 'https://gisem.osinergmin.gob.pe/serverosih/rest/services/Electricidad/MapaSEIN_Calidad/MapServer/0';  
  // Variables de servicios
  const f_pe_niveltension = 'NIVEL_TENSION';
  const f_pe_cliente = 'CLIENTE';

  // Variables de Permisos
  var __permisos_actionsgroup = Permission.getPermisosActionsgroup(),
    __permisos_layers = Permission.getPermisosLayers();

  $(function(){
    if(__permisos_actionsgroup.indexOf('FiltrarPETension') != -1 && __permisos_layers.indexOf('PuntoEntrega') != -1) {
      $.get("./view/widgets-group.html", function(data) {
        $('#wg_filtertensionpe').append($(data).find("#wg_filterpetension_content"));
      });        
    }
    if(__permisos_actionsgroup.indexOf('FiltrarPECliente') != -1 && __permisos_layers.indexOf('PuntoEntrega') != -1) { 
      $.get("./view/widgets-group.html", function(data) { 
        $('#wg_filterclientepe').append($(data).find("#wg_filterclientepe_content"));
        initFilterPE();
      });        
    }
    
  });  

  function initFilterPE(){
    getCliente();
  }


  /*********************** UX ****************************/

  //Al terminar de actualizar el View
  watchUtils.whenFalse(__globspace.view, "updating", function (evt) {
    if ($body.hasClass("init-filter-pe")) { //acciones para el primer updating solamente (carga inicial)     
      $body.removeClass("init-filter-pe");
    }

    if ($body.hasClass("filter-pe")) { //preolader para los filtros     
      __globspace.view.when(function () { // zoom al filtro
        __globspace.view.goTo({
          target: __arr_filtergeometries
        });
      });

      Helper.hidePreloader();
      $body.removeClass("filter-pe");
      __arr_filtergeometries = [];
    }
  });


  // ################### FILTRAR POR TENSION ############################

  // Evento lanzado para realizar el filtro  por tension  
  $('#div_widgets').on('submit', '#form_filtertensionpe', function (evt) {
    evt.preventDefault();
    Helper.showPreloader();
    $body.addClass('filter-pe');
    __arr_filtergeometries =[];
    
    let filter = $('#cmb_filtertensionpe').val(),
      sqltension = ` ${ f_pe_niveltension } = '${ filter }'`,
      sql = '';

    if (__filtersinsector.sqltension == sqltension) {
      $body.removeClass('filter-pe');
      Helper.hidePreloader();
    } else {
      __filtersinsector.sqltension = sqltension;
      __filtersinsector.sqlcliente != '' ? sql = `${ __filtersinsector.sqlcliente } and ${ sqltension }` : sql = sqltension;

      loadQuery(sql);
      
    }
      
  });

  // Evento lanzado para limpiar lo filtrado por tension
  $('#div_widgets').on('click', '#btn_clearfiltertensionpe', function () {
    
    $('#cmb_filtertensionpe').prop('selectedIndex', 0);

    $body.addClass('filter-pe');
    Helper.showPreloader();

    if (__filtersinsector.sqltension == '') {
      $body.removeClass('filter-pe');
      Helper.hidePreloader();
    } else {
      __filtersinsector.sqltension = '';
      
      if(__filtersinsector.sqlcliente != ''){
        loadQuery(__filtersinsector.sqlcliente);
      }else{
        loadQuery('');
      }

    }
  });

  // ################### FILTRAR POR CLIENTE ############################

  // Evento lanzado para realizar el filtro por cliente  
  $('#div_widgets').on('submit', '#form_filterclientepe', function (evt) {
    evt.preventDefault();
    Helper.showPreloader();
    $body.addClass('filter-pe');
    __arr_filtergeometries =[];
    
    let filter = $('#cmb_filterclientepe').val(),
      sqlcliente = ` ${ f_pe_cliente } = '${ filter }'`,
      sql = '';

    if (__filtersinsector.sqlcliente == sqlcliente) {
      $body.removeClass('filter-pe');
      Helper.hidePreloader();
    } else {
      __filtersinsector.sqlcliente = sqlcliente;
      __filtersinsector.sqltension != '' ? sql = `${sqlcliente} and ${__filtersinsector.sqltension}` : sql = sqlcliente;

      loadQuery(sql);
      
    }
      
  });

  // Evento lanzado para limpiar lo filtrado por cliente
  $('#div_widgets').on('click', '#btn_clearfilterclientepe', function () {
    
    $('#cmb_filterclientepe').val('').trigger('change');

    $body.addClass('filter-pe');
    Helper.showPreloader();

    if (__filtersinsector.sqlcliente == '') {
      $body.removeClass('filter-pe');
      Helper.hidePreloader();
    } else {
      __filtersinsector.sqlcliente = '';

      if(__filtersinsector.sqltension != ''){
        loadQuery(__filtersinsector.sqltension);
      }else{
        loadQuery('');
      }
    }
  });


  function loadQuery(sql) {

    let sector = __globspace.infolayers.find(sublayer => sublayer.alias == '__mil_pe'),
      layers = sector.layers,
      nlayers = layers.length;
  
    Helper.turnOnParentsLayer(layers[0], true); //para asegurarse la visualización de al menos la primera capa en el view

    if(sql ==''){
      for (let i = 0; i < nlayers; i++) {
        let layer = layers[i];
        layer.definitionExpression = null;
      }
      $("#btn_home").click(); //volver el zoom inicial
      Helper.hidePreloader();

    }else{
      for (let i = 0; i < nlayers; i++) {
        let layer = layers[i];
        layer.definitionExpression = sql;
        queryForWellGeometries(layer, nlayers);
      }

    }

  }


  function getCliente() {
    let $selectfilter = $("#cmb_filterclientepe");
    $selectfilter.prop("disabled", true);
    if ( $selectfilter.hasClass("select2-hidden-accessible")) {
      $selectfilter.select2("destroy");
    }
    $selectfilter.html('');

    let jsonvaluefiels = [],
      _queryt = new QueryTask({ url: __urlservicio_clientes }),
      _qparams = new Query();

    _qparams.where = '1=1';
    _qparams.outFields = [`${ f_pe_cliente }`];
    _qparams.orderByFields = [`${ f_pe_cliente } ASC`];
    _qparams.returnDistinctValues = true;
    _qparams.returnGeometry = false;
    _queryt.execute(_qparams)
      .then(function (response) {
        let auxlength = response.features.length;   
        jsonvaluefiels = [{id: '', text: 'Seleccione un cliente'}];
        for (let i = 0 ; i<auxlength ; i++) {
            let item = response.features[i].attributes;
            let auxfield = item[f_pe_cliente];
            if(auxfield != null && auxfield.trim().length != 0){
              jsonvaluefiels.push({id: auxfield, text: auxfield});
            }

            if(auxlength == i+1){
                $selectfilter.select2({
                  data: jsonvaluefiels,
                });
                $selectfilter.prop("disabled", false);
                activeTooltipField();
            }
        }

      })
      .catch(function (error) {
        // Helper.showError(error);
        console.log("query task error - carga inicial: ");
        console.log(error);
      });
        
  }


  var auxcount = 0;
  var withoutresults = true; //sin resultados
  function queryForWellGeometries(wellslayer, count) { // obtener geometrias para hacer el zoom

    let wellsquery = wellslayer.createQuery();
    wellsquery.outFields = ['OBJECTID'];
    wellslayer.queryFeatures(wellsquery).then(function (response) {
      let wellsgeometries = response.features.map(function (feature) {
        return feature.geometry;
      });

      let auxlength = wellsgeometries.length;
      for (let i = 0; i < auxlength; i++) {
        const item = wellsgeometries[i];
        __arr_filtergeometries.push(item);
      }

      auxcount ++;
      if(withoutresults && auxlength > 0){
        withoutresults = false;
      }
      if(auxcount == count ){
        auxcount = 0;
        Helper.hidePreloader();
        if(withoutresults){
          $body.removeClass("filter-pe");
          alertMessage("No se encontraron registros con el filtro realizado", "warning", 'top-center', true);
        }
      }

    }).catch(function (error) {
      console.log(error);
      auxcount ++;
      if(auxcount == count ){
        auxcount = 0;
        Helper.hidePreloader();
        if(withoutresults){
          $body.removeClass("filter-pe");
          alertMessage("No se encontraron registros con el filtro realizado", "warning", 'top-center', true);
        }
      }
    });
  }
  

  function activeTooltipField(){
    $('#wg_filterclientepe #select2-cmb_filterclientepe-container').mouseover(function(){
        let mensaje = $(this).attr('title');
        $(this).tooltip().attr('data-original-title',mensaje);
    });
}

});