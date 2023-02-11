define([
  "js/helper",
  "js/core/permission",  

  "esri/core/watchUtils"
], function (
  Helper,
  Permission,

  watchUtils
) {

  var __filtersinsector = {
      sqlperiod: 'init',
      sqlcompany: 'init',
    },
    __arr_filtergeometries = [],
    $body = $('body');

  // Variables de servicios
  const f_oper_empresa = 'EMPRESA';

  // Variables de Permisos
  var __permisos_actionsgroup = Permission.getPermisosActionsgroup();

  $(function(){
    if(__permisos_actionsgroup.indexOf('FiltrarEmpresa') != -1 && $("#wg_filterforcompany_content").length == 0 ) { 
      $.get("./view/widgets-group.html", function(data) { 
        $('#wg_filterforcompany').append($(data).find("#wg_filterforcompany_content"));
      });        
    }
    // esta validación hace disponible automaticamente al widget FiltrarEmpresa también para Sistemas en Alerta y Proyectos. 
  });  


  /*********************** UX ****************************/

  //Al terminar de actualizar el View
  watchUtils.whenFalse(__globspace.view, "updating", function (evt) {
    if ($body.hasClass("filter-operacion")) { //preolader para los filtros     
      __globspace.view.when(function () { // zoom al filtro
        __globspace.view.goTo({
          target: __arr_filtergeometries
        });
      });

      Helper.hidePreloader();
      $body.removeClass("filter-operacion");
      __arr_filtergeometries = [];
    }
  });


  // ################### FILTRAR POR EMPRESA ############################

  // Evento lanzado para realizar el filtro por empresa
  $('#div_widgets').on('submit', '#form_searchforcompany.form-operacion', function (evt) {
    evt.preventDefault();
    Helper.showPreloader();

    let fieldrequiere = [
      {
        idfiel: 'txt_searchforcompany',
        label: 'Empresa'
      }
    ];

    const cancontinue = Helper.getValidationForm('form_searchforcompany', fieldrequiere);
    if (cancontinue ) {
      $body.addClass('filter-operacion');
      __arr_filtergeometries = [];
      
      let filter = $('#txt_searchforcompany').val().toUpperCase(),
        sql = `(UPPER(${ f_oper_empresa }) like '%${ filter }%')`,
  
        sector = __globspace.infolayers.find(sublayer => sublayer.alias == '__mil_operacion'),
        layers = sector.layers,
        nlayers = layers.length;
  
      Helper.turnOnParentsLayer(layers[0], true); //para asegurarse la visualización de al menos la primera capa en el view
  
      if (__filtersinsector.sqlcompany == sql) {
        $body.removeClass('filter-operacion');
        Helper.hidePreloader();
      } else {
        __filtersinsector.sqlcompany = sql;
        for (let i = 0; i < nlayers; i++) {
          let layer = layers[i];
          layer.definitionExpression = sql;
          queryForWellGeometries(layer, nlayers);
        }
      }
      
    }

  });

  // Evento lanzado para limpiar lo filtrado por empresa
  $('#div_widgets').on('click', '#btn_clearsearchforcompany.form-operacion', function () {
    $('#txt_searchforcompany').val('');
    $body.addClass('filter-operacion');
    Helper.showPreloader();

    let sector = __globspace.infolayers.find(sublayer => sublayer.alias == '__mil_operacion'),
      layers = sector.layers,
      nlayers = layers.length;

    Helper.turnOnParentsLayer(layers[0], true); //para asegurarse la visualización de la primera capa en el view

    if (__filtersinsector.sqlcompany == '') {
      $body.removeClass('filter-operacion');
      Helper.hidePreloader();
    } else {
      __filtersinsector.sqlcompany = '';
      for (let i = 0; i < nlayers; i++) {
        let layer = layers[i];
        layer.definitionExpression = null;
      }
      $("#btn_home").click(); //volver el zoom inicial
      Helper.hidePreloader();
    }
  });


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
          $body.removeClass("filter-operacion");
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
          $body.removeClass("filter-operacion");
          alertMessage("No se encontraron registros con el filtro realizado", "warning", 'top-center', true);
        }
      }
    });
  }
  

});