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
  const f_da_fecha = 'FECHA';

  // Variables de Permisos
  var __permisos_actionsgroup = Permission.getPermisosActionsgroup(),
      __permisos_layers = Permission.getPermisosLayers();

  $(function(){
    if(__permisos_actionsgroup.indexOf('FiltrarPeriodo') != -1 && __permisos_layers.indexOf('DescargasAtmosfericas') != -1){ 
      $.get("./view/widgets-group.html", function(data) { 
        $('#wg_filterperiodda').append($(data).find("#wg_filterperiodda_content")); 
      });
    }      
  });  


  /*********************** UX ****************************/

  //Al terminar de actualizar el View
  watchUtils.whenFalse(__globspace.view, "updating", function (evt) {
    if ($body.hasClass("filter-da")) { //preolader para los filtros     
      __globspace.view.when(function () { //zoom al filtro
        __globspace.view.goTo({
          target: __arr_filtergeometries
        });
      });
      Helper.hidePreloader();
      $body.removeClass("filter-da");
      __arr_filtergeometries = [];
    }
  });

  // Evento lanzado para realizar el filtro
  //sql de map de agol: (FECHA BETWEEN timestamp '2018-11-01 05:00:00' AND timestamp '2018-11-04 04:59:59') AND (1=1)
  $('#div_widgets').on('submit', '#form_filterperiodda', function (evt) {
    evt.preventDefault();
    console.log('aqui');
    $body.addClass('filter-da');
    Helper.showPreloader();
    __arr_filtergeometries = [];

    let fechainicio = $('#fec_da_inicio').val(),
      fechafin = $('#fec_da_fin').val(),
      fi = moment(fechainicio).add(5, 'hours').format('YYYY-MM-DD HH:mm:ss'); //consulta al servicio en hora utc (+5),
      ff = moment(fechafin).add(29, 'hours').subtract(1, 'seconds').format('YYYY-MM-DD HH:mm:ss'),
      sql = `(${ f_da_fecha } BETWEEN timestamp '${ fi }' AND timestamp '${ ff }')`,

      sector = __globspace.infolayers.find(sublayer => sublayer.alias == '__mil_da'),
      layers = sector.layers,
      nlayers = layers.length;

    Helper.turnOnParentsLayer(layers[0], true); //para asegurarse la visualización de la primera capa en el view

    if (__filtersinsector.sqlperiod == sql) {
      $body.removeClass('filter-da');
      Helper.hidePreloader();
    } else {
      __filtersinsector.sqlperiod = sql;
      for (let i = 0; i < nlayers; i++) {
        let layer = layers[i];
        layer.definitionExpression = `${sql}`;
        queryForWellGeometries(layer, nlayers);
      }
    }
  });

  // Evento lanzado para limpiar lo filtrado
  $('#div_widgets').on('click', '#btn_clearfilterperiodda', function () {
    $('#fec_da_inicio').val('');
    $('#fec_da_fin').val('');
    $body.addClass('filter-da');
    Helper.showPreloader();

    let sector = __globspace.infolayers.find(sublayer => sublayer.alias == '__mil_da'),
      layers = sector.layers,
      nlayers = layers.length;

    Helper.turnOnParentsLayer(layers[0], true); //para asegurarse la visualización de la primera capa en el view

    if (__filtersinsector.sqlperiod == '') {
      $body.removeClass('filter-evt');
      Helper.hidePreloader();
    } else {
      __filtersinsector.sqlperiod = '';

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
          $body.removeClass("filter-da");
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
          $body.removeClass("filter-da");
          alertMessage("No se encontraron registros con el filtro realizado", "warning", 'top-center', true);
        }
      }
    });
  }

});