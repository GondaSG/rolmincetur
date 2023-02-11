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

  var $body = $('body');

  var __filtersinsector = {
      sqlperiod: 'init',
      sqlcompany: 'init',
      titleperiod: ''
    },
    __arr_filtergeometries = [];

  // Variables de servicios
  const f_er_anio = 'ANIO',
    f_er_semana = 'SEMANA',
    f_er_nombre = 'NOMBRE',
    f_er_det_nombre = 'NOMBRE';

  // Variables de Permisos
  var __permisos_actionsgroup = Permission.getPermisosActionsgroup(),
    __permisos_layers = Permission.getPermisosLayers();

  $(function () {
    if (__permisos_actionsgroup.indexOf('FiltrarPeriodo') != -1 && __permisos_layers.indexOf('EventosRelevantes') != -1) {
      $.get("./view/widgets-group.html", function (data) {
        $('#wg_filterperioder').append($(data).find("#wg_filterperioder_content"));
        initFilterPeriodER();
      });
    }
  });


  // ################### FILTRAR PERIODO ############################    

  function initFilterPeriodER() {
    $.datetimepicker.setLocale("es");
    $("#evt_semana").datetimepicker({
      i18n: {
        es: {
          dayOfWeek: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]
        }
      },
      weeks: true,
      timepicker: false,
      dayOfWeekStart: 1,
      format: "d/m/Y",
      onChangeDateTime: function (e, input) {
        var date = moment(input.val(), "DD/MM/YYYY");
        if (date.isValid()) {
          $("#week").val(date.isoWeek());
          $("#year").val(date.year());
          $("#selectweek").text("S" + date.isoWeek() + ", " + Helper.getMonthName(date.month() + 1).s + " " + date.year());
        }
      },
    });
  }

  /*********************** UX ****************************/

  //Al terminar de actualizar el View
  watchUtils.whenFalse(__globspace.view, "updating", function (evt) {
    if ($body.hasClass("filter-evt")) { //preolader para los filtros     
      __globspace.view.when(function () { //zoom al filter
        __globspace.view.goTo({
          target: __arr_filtergeometries
        });
      });

      Helper.hidePreloader();
      $body.removeClass("filter-evt");
      __arr_filtergeometries = [];
    }
  });

  
  // Evento lanzado para realizar el filtro
  $('#wg_filterperioder').on('submit', '#form_filterperiodevent', function (evt) {
    evt.preventDefault();
    $body.addClass('filter-evt');
    Helper.showPreloader();

    let sector = __globspace.infolayers.find(sublayer => sublayer.alias == '__mil_er'),
      layers = sector.layers,
      nlayers = layers.length,
      count = 0,
      auxwithoutresults = true; //sin resultados

      week = $("#week").val(),
      anio = $("#year").val(),
      sql = '',
      titleperiod = $('#selectweek').text();

    if (week != '' && anio != '')
      sql = `(${ f_er_semana } = ${ week } and ${ f_er_anio } = ${ anio })`;

    Helper.turnOnParentsLayer(layers[0], true); //para asegurarse la visualización de la primera capa en el view

    if (__filtersinsector.sqlperiod == sql) {
      $body.removeClass('filter-evt');
      Helper.hidePreloader();
    } else {
      __filtersinsector.sqlperiod = sql;
      __filtersinsector.titleperiod = titleperiod;

      for (let i = 0; i < nlayers; i++) {
        let layer = layers[i];
        layer.filtersinsector = __filtersinsector;

        let url_servicio = layer.url_serviciodetalle,
          _queryt = new QueryTask({ url: url_servicio }),
          _qparams = new Query();

        _qparams.where = sql;
        _qparams.outFields = f_er_det_nombre;
        _qparams.returnDistinctValues = true;
        _qparams.returnGeometry = false;
        _queryt.execute(_qparams)
          .then(function (response) {
            let sql2 = '';
            let auxlength = response.features.length;
            for (let i = 0; i < auxlength; i++) {
              let row = response.features[i].attributes;
              sql2 += `'${ row[f_er_det_nombre] }', `;
            }
            if (auxlength != 0) {
              sql2 = sql2.trim().slice(0, -1);
              sql2 = `${ f_er_nombre } in (${sql2})`;
              layer.definitionExpression = `${sql2}`;
            } else {
              layer.definitionExpression = `1<>1`;
            }
            queryForWellGeometries(layer, nlayers);

            count ++ ;
            if(count == nlayers ){
              count = 0;
              if(auxwithoutresults){
                Helper.hidePreloader();
              }
            }

          })
          .catch(function (error) {
            console.log(error);
            // Helper.showError(error);
            count ++ ;
            if(count == nlayers ){
              count = 0;
              if(auxwithoutresults){
                Helper.hidePreloader();
              }
            }
          });
      }
    }
  });

  // Evento lanzado para limpiar lo filtrado
  $('#wg_filterperioder').on('click', '#btn_clearfilterperiodevent', function () {
    $("#week").val('');
    $("#selectweek").text('Semana no seleccionada');
    $("#year").val('');
    $("#evt_semana").val('').datetimepicker('reset');
    $body.addClass('filter-evt');
    Helper.showPreloader();

    let sector = __globspace.infolayers.find(sublayer => sublayer.alias == '__mil_er'),
      layers = sector.layers,
      nlayers = layers.length;

    Helper.turnOnParentsLayer(layers[0], true); //para asegurarse la visualización de la primera capa en el view

    if (__filtersinsector.sqlperiod == '') {
      $body.removeClass('filter-evt');
      Helper.hidePreloader();
    } else {
      __filtersinsector.sqlperiod = '';
      __filtersinsector.titleperiod = '';
      for (let i = 0; i < nlayers; i++) {
        let layer = layers[i];
        layer.definitionExpression = null;
        layer.filtersinsector = __filtersinsector;
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
          $body.removeClass("filter-evt");
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
          $body.removeClass("filter-evt");
          alertMessage("No se encontraron registros con el filtro realizado", "warning", 'top-center', true);
        }
      }
    });
  }

});