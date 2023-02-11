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
      sqlperiod: '',
      sqlcompany: '',
      titleperiod: '',
      titleanio: ''
    },
    __arr_filtergeometries = [];

  // Variables de servicios
  const f_alert_anio = 'ANIO',
    f_alert_period = 'PERIODO',
    f_alert_empresa = 'EMPRESA',

    f_alert_ugc_idcg = 'ID_CG',
    f_alert_ugc_det_idcg = 'ID_CG',
    f_alert_ts_codset = 'COD_SE',
    f_alert_ts_det_codset = 'COD_SE',
    f_alert_tc_codset = 'COD_SE',
    f_alert_tc_det_codset = 'COD_SE',
    f_alert_sec_codset = 'COD_SE',
    f_alert_sec_det_codset = 'COD_SE',
    f_alert_ltcong_codlinea = 'COD_LINEA',
    f_alert_ltcong_det_codlinea = 'COD_LINEA',
    f_alert_ltcrit_codlinea = 'COD_LINEA',
    f_alert_ltcrit_det_codlinea = 'COD_LINEA';

  // Variables de Permisos
  var __permisos_actionsgroup = Permission.getPermisosActionsgroup(),
    __permisos_layers = Permission.getPermisosLayers();

  $(function () {
    if (__permisos_actionsgroup.indexOf('FiltrarPeriodo') != -1 && __permisos_layers.indexOf('SistemasAlerta') != -1) {
      $.get("./view/widgets-group.html", function (data) {
        $('#wg_filterperiodalert').append($(data).find("#wg_filterperiodalert_content"));
        initFilterPeriodAlert();
      });
    }
    // Si tiene permisos de FiltrarEmpresa, ya tendrá al wg disponible gracias a la validación en filters-operacion. 
  });


  /*********************** UX ****************************/

  //Al terminar de actualizar el View
  watchUtils.whenFalse(__globspace.view, "updating", function (evt) {

    if ($body.hasClass("filter-alert")) { //preolader para los filtros     
      __globspace.view.when(function () { //zoom al filtro
        __globspace.view.goTo({
          target: __arr_filtergeometries
        });
      });

      Helper.hidePreloader();
      $body.removeClass("filter-alert");
      __arr_filtergeometries = [];
    }
  });

  // ################### FILTRAR POR PERIODO ############################

  var today = new Date();
  var current_year = today.getFullYear();
  var current_month = today.getMonth() + 1; //1-12
  var current_trimester = getQuarterOfYear(current_month); //1-4


  //DEFINICIÓN DE PERIODOS 
  var periods_filter = {
    'anioinicio': 2016,
    'aniofin': current_year,
    'periodofin': current_trimester
  };

  function initFilterPeriodAlert() {
    renderCmbAnios(periods_filter);
  }

  // Evento lanzado para generar los trimenestres con respecto al año
  $('#wg_filterperiodalert').on('change', '#cmb_anio_filterperiodalert', function () {
    let anios = $(this).val();
    let $cmbtrimestres = $('#cmb_period_filterperiodalert');
    if (anios.length == 1 && anios[0] == current_year) {
      $cmbtrimestres.html(getOptionsTrimester(current_trimester));
    } else {
      $cmbtrimestres.html(getOptionsTrimester(4)); //todos los trimestres
    }
    $cmbtrimestres.selectpicker({title: '--Elija trimestre(s)--'}).selectpicker('refresh');

  });

  // Evento lanzado para realizar el filtro por periodo
  $('#wg_filterperiodalert').on('submit', '#form_filterperiodalert', function (evt) {
    evt.preventDefault();
    $body.addClass('filter-alert');
    Helper.showPreloader();
    __arr_filtergeometries = [];

    let anios = $('#cmb_anio_filterperiodalert').val(),
      trimestres = $('#cmb_period_filterperiodalert').val(),
      nanios = anios.length,
      ntrimestres = trimestres.length,

      aux_anios = '',
      aux_trimestre = '',
      sql = '',
      sqlperiod = '',

      titleperiod = '',
      titleanio = '',
      titletrimentre = '';

    if (nanios != 0 || ntrimestres != 0) {
      for (let i = 0; i < nanios; i++) {
        aux_anios += ',' + anios[i];
        titleanio += ', ' + anios[i];
      }
      aux_anios = aux_anios.trim().substring(1);
      titleanio = titleanio.trim().substring(1);

      for (let i = 0; i < ntrimestres; i++) {
        aux_trimestre += `,'${ trimestres[i] }'`;
        titletrimentre += `, ${ trimestres[i] }`;
      }
      aux_trimestre = aux_trimestre.trim().substring(1);
      titletrimentre = titletrimentre.trim().substring(1);

      if (aux_anios != '' && aux_trimestre != '') {
        titleperiod = `( ${ titleanio } - ${ titletrimentre } )`;

        aux_anios = `${ f_alert_anio } in (${ aux_anios })`;
        aux_trimestre = `${ f_alert_period } in (${ aux_trimestre })`;
        sqlperiod = `(${ aux_anios } and ${ aux_trimestre })`;

      } else if (aux_anios != '' && aux_trimestre == '') {
        titleperiod = `( ${ titleanio } )`;

        aux_anios = `${ f_alert_anio } in (${ aux_anios })`;
        sqlperiod = `(${aux_anios})`;

      } else if (aux_anios == '' && aux_trimestre != '') {
        titleperiod = `( ${ titletrimentre } )`;

        aux_trimestre = `${ f_alert_period } in (${ aux_trimestre })`;
        sqlperiod = `(${ aux_trimestre })`;
      }

      if (__filtersinsector.sqlperiod == sqlperiod) {
        $body.removeClass('filter-alert');
        Helper.hidePreloader();
      } else {
        __filtersinsector.sqlperiod = sqlperiod;
        __filtersinsector.titleperiod = titleperiod;
        __filtersinsector.titleanio = `( ${ titleanio } )`;
        __filtersinsector.sqlcompany != '' ? sql = `${ __filtersinsector.sqlcompany } and ${ sqlperiod }` : sql = sqlperiod;
        loadQuery(sql);
      }
    } else {
      $body.removeClass('filter-alert');
      Helper.hidePreloader();
      alertMessage('Elija un año o un periodo', 'warning', 'top-center', true);
    }
  });

  // Evento lanzado para limpiar lo filtrado por periodo 
  $('#wg_filterperiodalert').on('click', '#btn_clearfilterperiodalert', function () {
    $('#cmb_anio_filterperiodalert').selectpicker('deselectAll');
    $('#cmb_period_filterperiodalert').selectpicker('deselectAll');
    $body.addClass('filter-alert');
    Helper.showPreloader();

    let sector = __globspace.infolayers.find(sublayer => sublayer.alias == '__mil_alerta'),
      layers = sector.layers,
      nlayers = layers.length;

    if (__filtersinsector.sqlperiod == '') {
      $body.removeClass('filter-alert');
      Helper.hidePreloader();
    } else {
      __filtersinsector.sqlperiod = '';
      __filtersinsector.titleperiod = '';
      __filtersinsector.titleanio = '';
      if (__filtersinsector.sqlcompany != '') {
        loadQuery(__filtersinsector.sqlcompany);
      } else {

        Helper.turnOnParentsLayer(layers[0], true); //para asegurarse la visualización de la primera capa en el view

        for (let i = 0; i < nlayers; i++) {
          let layer = layers[i];
          layer.definitionExpression = null;
          layer.filtersinsector = __filtersinsector;
        }
        $("#btn_home").click(); //volver el zoom inicial
        Helper.hidePreloader();
        
      }
    }

  });


  // ################### FILTRAR POR EMPRESA ############################

  // Evento lanzado para realizar el filtro por empresa
  $('#div_widgets').on('submit', '#form_searchforcompany.form-alert', function (evt) {
    evt.preventDefault();
    Helper.showPreloader();
    
    let fieldrequiere = [{
      idfiel: 'txt_searchforcompany',
      label: 'Empresa'
    }];

    const cancontinue = Helper.getValidationForm('form_searchforcompany', fieldrequiere);
    if (cancontinue) {
      __arr_filtergeometries = [];
      $body.addClass('filter-alert');

      let filter = $('#txt_searchforcompany').val().trim().toUpperCase(),
        sqlcompany = `(UPPER(${ f_alert_empresa }) like '%${ filter }%')`,
        sql = '';

      if (__filtersinsector.sqlcompany == sqlcompany) {
        $body.removeClass('filter-alert');
        Helper.hidePreloader();
      } else {
        __filtersinsector.sqlcompany = sqlcompany;
        __filtersinsector.sqlperiod != '' ? sql = `${sqlcompany} and ${__filtersinsector.sqlperiod}` : sql = sqlcompany;
        loadQuery(sql);
      }

    }

  });

  // Evento lanzado para limpiar lo filtrado por empresa 
  $('#div_widgets').on('click', ' #btn_clearsearchforcompany.form-alert', function () {
    $('#txt_searchforcompany').val('');
    $body.addClass('filter-alert');
    Helper.showPreloader();

    let sector = __globspace.infolayers.find(sublayer => sublayer.alias == '__mil_alerta'),
      layers = sector.layers,
      nlayers = layers.length;

    if (__filtersinsector.sqlcompany == '') {
      $body.removeClass('filter-alert');
      Helper.hidePreloader();
    } else {
      __filtersinsector.sqlcompany = '';
      if (__filtersinsector.sqlperiod != '') {
        loadQuery(__filtersinsector.sqlperiod);
      } else {

        Helper.turnOnParentsLayer(layers[0], true); //para asegurarse la visualización de la primera capa en el view

        for (let i = 0; i < nlayers; i++) {
          let layer = layers[i];
          layer.definitionExpression = null;
          layer.filtersinsector = __filtersinsector;
        }

        $("#btn_home").click(); //volver el zoom inicial
        Helper.hidePreloader();
      }
    }
  });



  function loadQuery(sql) {
    let sector = __globspace.infolayers.find(sublayer => sublayer.alias == '__mil_alerta'),
      layers = sector.layers,
      nlayers = layers.length,
      count = 0,
      auxwithoutresults = true; //sin resultados

    Helper.turnOnParentsLayer(layers[0], true); //para asegurarse la visualización de la primera capa en el view

    for (let i = 0; i < nlayers; i++) {
      let layer = layers[i],
        fieldcod = getFieldCod(layer.title, sector),
        url_servicio = layer.url_serviciodetalle,
        _queryt = new QueryTask({ url: url_servicio }),
        _qparams = new Query();

      _qparams.where = sql;
      _qparams.outFields = fieldcod.detalle;
      _qparams.returnGeometry = false;
      _qparams.returnDistinctValues = true;
      _queryt.execute(_qparams)
        .then(function (response) {
          let sql2 = '';
          let auxlength = response.features.length;
          for (let j = 0; j < auxlength; j++) {
            let row = response.features[j].attributes;
            sql2 += `'${ row[fieldcod.detalle] }', `;
          }

          if (auxlength == 0) {
            layer.definitionExpression = `1<>1`;
          } else {
            sql2 = sql2.trim().slice(0, -1);
            sql2 = `${ fieldcod.maestro } in (${ sql2 })`;
            layer.definitionExpression = sql2;
          }
          queryForWellGeometries(layer, nlayers);
          layer.filtersinsector = __filtersinsector;

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



  /*********************** FUNCIONES DE APOYO ****************************/

  function renderCmbAnios(dataperiodos) {
    let $cmbanios = $('#cmb_anio_filterperiodalert').html(''),
      inicio = dataperiodos.anioinicio,
      fin = dataperiodos.aniofin,
      options = "";
    for (let i = inicio; i <= fin; i++) {
      options += `<option value="${ i }">${ i }</option>`;
    }
    $cmbanios.append(options).selectpicker({title: '--Elija año(s)--'}).selectpicker('refresh');
  }

  function getQuarterOfYear(month) {
    return (Math.ceil(month / 3));
  }

  function getOptionsTrimester(numtrimester) {
    let options = '';
    let trimester = "";
    for (let i = 1; i <= numtrimester; i++) {
      switch (i) {
        case 1:
          trimester = "1° Trimestre";
          options += `<option value="1T" title="1T">${trimester}</option>`;
          break;
        case 2:
          trimester = "2° Trimestre";
          options += `<option value="2T" title="2T">${trimester}</option>`;
          break;
        case 3:
          trimester = "3° Trimestre";
          options += `<option value="3T" title="3T">${trimester}</option>`;
          break;
        case 4:
          trimester = "4° Trimestre";
          options += `<option value="4T" title="4T">${trimester}</option>`;
          break;
        default:
          trimester = "Trimestre no identificado";
          options += `<option value="${trimester}">${trimester}</option>`;
          break;
      }
    }
    return options;
  }

  function getFieldCod(titlelayer, sector) { //Obtener los fields de las capas para realizar la query
    titlelayer = titlelayer.trim();
    let fieldcod = {
      maestro: '',
      detalle: '',
    };


    switch (titlelayer) {
      case sector.aliastitlelayers.layer_ugc:
        fieldcod.maestro = f_alert_ugc_idcg;
        fieldcod.detalle = f_alert_ugc_det_idcg;
        break;
      case sector.aliastitlelayers.layer_ts:
        fieldcod.maestro = f_alert_ts_codset;
        fieldcod.detalle = f_alert_ts_det_codset;
        break;
      case sector.aliastitlelayers.layer_tc:
        fieldcod.maestro = f_alert_tc_codset;
        fieldcod.detalle = f_alert_tc_det_codset;
        break;
      case sector.aliastitlelayers.layer_sec:
        fieldcod.maestro = f_alert_sec_codset;
        fieldcod.detalle = f_alert_sec_det_codset;
        break;
      case sector.aliastitlelayers.layer_ltc:
        fieldcod.maestro = f_alert_ltcong_codlinea;
        fieldcod.detalle = f_alert_ltcong_det_codlinea;
        break;
      case sector.aliastitlelayers.layer_ltcyr:
        fieldcod.maestro = f_alert_ltcrit_codlinea;
        fieldcod.detalle = f_alert_ltcrit_det_codlinea;
        break;
    }
    return fieldcod
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
           $body.removeClass("filter-alert");
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
           $body.removeClass("filter-alert");
          alertMessage("No se encontraron registros con el filtro realizado", "warning", 'top-center', true);
        }
      }
    });
  }

});