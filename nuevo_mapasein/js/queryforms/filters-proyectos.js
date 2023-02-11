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
    },
    __arr_filtergeometries = [],
    __aniosproyect = [];

  // Variables de servicios
  const f_proy_anio = 'PCO_ANIO',
    f_proy_empresa = 'EMPRESA';

  // Variables de Permisos
  var __permisos_actionsgroup = Permission.getPermisosActionsgroup(),
    __permisos_layers = Permission.getPermisosLayers();

  $(function () {
    if (__permisos_actionsgroup.indexOf('FiltrarPeriodo') != -1 && __permisos_layers.indexOf('Proyectos') != -1) {
      $.get("./view/widgets-group.html", function (data) {
        $('#wg_filterperiodproyect').append($(data).find("#wg_filterperiodproyect_content"));
      });
    }
    // Si tiene permisos de FiltrarEmpresa, ya tendrá al wg disponible gracias a la validación en filters-operacion. 
  });


  /*********************** UX ****************************/

  //Al terminar de actualizar el View
  watchUtils.whenFalse(__globspace.view, "updating", function (evt) {
    if ($body.hasClass("init-filter-proyect")) { //acciones para el primer updating solamente (carga inicial)     
      if (__permisos_actionsgroup.indexOf('FiltrarPeriodo') != -1 && __permisos_layers.indexOf('Proyectos') != -1) {
        loadCmbAnios();
      }

      $body.removeClass("init-filter-proyect");
    }

    if ($body.hasClass("filter-proyect")) { //preolader para los filtros     
      __globspace.view.when(function () { // zoom filtro
        __globspace.view.goTo({
          target: __arr_filtergeometries
        });
      });

      Helper.hidePreloader();
      $body.removeClass("filter-proyect");
      __arr_filtergeometries = [];
    }
  });


  /*********************** UX ****************************/

  // ################### FILTRAR PERIODO ############################

  // Evento lanzado para realizar el filtro 
  $('#wg_filterperiodproyect').on('submit', '#form_filterperiodproyect', function (evt) {
    evt.preventDefault();
    $body.addClass('filter-proyect');
    Helper.showPreloader();

    let anios = $('#cmb_anio_filterperiodproyect').val(),
      nanios = anios.length,

      sector = __globspace.infolayers.find(sublayer => sublayer.alias == '__mil_proyectos'),
      layers = sector.layers,
      nlayers = layers.length,

      aux_anios = '',
      sql = '',
      sqlperiod = '';

    Helper.turnOnParentsLayer(layers[0], true); //para asegurarse la visualización de la primera capa en el view

    for (let i = 0; i < nanios; i++) {
      aux_anios += ',' + anios[i];
    }
    aux_anios = aux_anios.trim().substring(1);
    nanios > 0 ? sqlperiod = `( ${f_proy_anio } in(${ aux_anios }))` : '';

    if (__filtersinsector.sqlperiod == sqlperiod) {
      $body.removeClass('filter-proyect');
      Helper.hidePreloader();
    } else {
      __filtersinsector.sqlperiod = sqlperiod;
      __filtersinsector.sqlcompany != '' ? sql = `${__filtersinsector.sqlcompany} and ${ sqlperiod }` : sql = `${ sqlperiod }`;

      for (let i = 0; i < nlayers; i++) {
        let layer = layers[i];
        layer.filtersinsector = __filtersinsector;
        layer.definitionExpression = sql;
        queryForWellGeometries(layer, nlayers);
      }
    }

  });

  // Evento lanzado para limpiar lo filtrado
  $('#wg_filterperiodproyect').on('click', '#btn_clearfilterperiodproyect', function () {
    $('#cmb_anio_filterperiodproyect').selectpicker('deselectAll');
    $body.addClass('filter-proyect');
    Helper.showPreloader();

    let sector = __globspace.infolayers.find(sublayer => sublayer.alias == '__mil_proyectos'),
      layers = sector.layers,
      nlayers = layers.length;

    Helper.turnOnParentsLayer(layers[0], true); //para asegurarse la visualización de la primera capa en el view

    if (__filtersinsector.sqlperiod == '') {
      $body.removeClass('filter-proyect');
      Helper.hidePreloader();
    } else {
      __filtersinsector.sqlperiod = '';
      if (__filtersinsector.sqlcompany != '') {
        for (let i = 0; i < nlayers; i++) {
          let layer = layers[i];
          layer.filtersinsector = __filtersinsector;
          layer.definitionExpression = __filtersinsector.sqlcompany;

          queryForWellGeometries(layer, nlayers);
        }
      } else {
        for (let i = 0; i < nlayers; i++) {
          let layer = layers[i];
          layer.filtersinsector = __filtersinsector;
          layer.definitionExpression = null;
        }

        $("#btn_home").click(); //volver el zoom inicial
      }
    }
  });


  // ################### FILTRAR EMPRESA ############################

  // Evento lanzado para realizar el filtro 
  $('#div_widgets').on('submit', '#form_searchforcompany.form-proyecto', function (evt) {
    evt.preventDefault();
    Helper.showPreloader();

    let fieldrequiere = [{
      idfiel: 'txt_searchforcompany',
      label: 'Empresa'
    }];

    const cancontinue = Helper.getValidationForm('form_searchforcompany', fieldrequiere);
    if (cancontinue) {
      $body.addClass('filter-proyect');

      let filter = $('#txt_searchforcompany').val().trim().toUpperCase(),
        sqlcompany = `(UPPER(${ f_proy_empresa }) like '%${ filter }%')`,
        sql = '',

        sector = __globspace.infolayers.find(sublayer => sublayer.alias == '__mil_proyectos'),
        layers = sector.layers,
        nlayers = layers.length;

      Helper.turnOnParentsLayer(layers[0], true); //para asegurarse la visualización de la primera capa en el view

      if (__filtersinsector.sqlcompany == sqlcompany) {
        $body.removeClass('filter-proyect');
        Helper.hidePreloader();
      } else {
        __filtersinsector.sqlcompany = sqlcompany;
        __filtersinsector.sqlperiod != '' ? sql = `${ sqlcompany } and ${ __filtersinsector.sqlperiod }` : sql = sqlcompany;

        for (let i = 0; i < nlayers; i++) {
          let layer = layers[i];
          layer.filtersinsector = __filtersinsector;
          layer.definitionExpression = sql;
          queryForWellGeometries(layer, nlayers);
        }
      }

    }

  });

  // Evento lanzado para limpiar lo filtrado
  $('#div_widgets').on('click', '#btn_clearsearchforcompany.form-proyecto', function () {
    $('#txt_searchforcompany').val('');
    $body.addClass('filter-proyect');
    Helper.showPreloader();

    let sector = __globspace.infolayers.find(sublayer => sublayer.alias == '__mil_proyectos'),
      layers = sector.layers,
      nlayers = layers.length;

    Helper.turnOnParentsLayer(layers[0], true); //para asegurarse la visualización de la primera capa en el view

    if (__filtersinsector.sqlcompany == '') {
      $body.removeClass('filter-proyect');
      Helper.hidePreloader();
    } else {
      __filtersinsector.sqlcompany = '';
      if (__filtersinsector.sqlperiod != '') {
        for (let i = 0; i < nlayers; i++) {
          let layer = layers[i];
          layer.filtersinsector = __filtersinsector;
          layer.definitionExpression = __filtersinsector.sqlperiod;
          queryForWellGeometries(layer, nlayers);
        }
      } else {
        for (let i = 0; i < nlayers; i++) {
          let layer = layers[i];
          layer.filtersinsector = __filtersinsector;
          layer.definitionExpression = null;
        }
        $("#btn_home").click(); //volver el zoom inicial
        Helper.hidePreloader();
      }
    }
  });


  /*********************** FUNCIONES DE APOYO ****************************/
  
  function loadCmbAnios() {
    let layers = __globspace.map.layers.items,
      urlsproyects = [],
      nlayers = layers.length;

    for (let i = 0; i < nlayers; i++) {
      let result = [],
        hassublayers = '';

      if (layers[i].type == "map-image") {
        let aux_alias = layers[i].aux_alias;
        if (aux_alias == "gruproyectos") {
          layers[i].sublayers != null ? hassublayers = true : hassublayers = false;
          urlsproyects = getUrlLayers(layers[i].sublayers.items, hassublayers, result);
        }
      }
    }
    getAniosLayer(urlsproyects);
  }

  function getUrlLayers(layers, hassublayers, result) {
    if (hassublayers) {
      for (let i = 0; i < layers.length; i++) {
        let layer = layers[i];
        layer.sublayers != null ? hassublayers = true : hassublayers = false;
        if (hassublayers) {
          getUrlLayers(layer.sublayers.items, hassublayers, result);
        } else {
          let url_servicio = layer.url;
          result.push({
            'url': url_servicio,
            'sublayer': layer
          });
          hassublayers = false;
          getUrlLayers(layer, hassublayers, result);
        }
      }
    } else {
      return
    }
    return result;
  }

  function getAniosLayer(layers) {
    let aux_count = 1,
      auxlength = layers.length,
      outfields = f_proy_anio;
    for (let i = auxlength - 1; i >= 0; i--) {
      let url_servicio = layers[i].url,
        _queryt = new QueryTask({
          url: url_servicio
        }),
        _qparams = new Query();

      _qparams.where = '1=1';
      _qparams.outFields = outfields;
      _qparams.returnDistinctValues = true;
      _qparams.returnGeometry = false;
      _queryt.execute(_qparams)
        .then(function (response) {
          let nreg = response.features.length;
          for (let i = 0; i < nreg; i++) {
            let row = response.features[i].attributes;
            let anio = (row[outfields]);
            if (anio != null) {
              anio = parseInt(anio);
              let index = __aniosproyect.indexOf(anio);
              if (index == -1) {
                __aniosproyect.push(anio);
              }
            }
          }

          if (aux_count == auxlength) {
            renderCmb();
          }
          aux_count++;
        }).catch(function (error) {
          // Helper.showError(error);
          console.log("query task error - carga inicial: ");
          console.log(error);
        });
    }
  }

  function renderCmb() {
    __aniosproyect.sort((a, b) => a - b);
    let auxlength = __aniosproyect.length;
    let select = '';
    for (let i = 0; i < auxlength; i++) {
      select += `<option value=${__aniosproyect[i]}> ${__aniosproyect[i]} </option>`;
    }
    $('#cmb_anio_filterperiodproyect').html(select).selectpicker({title: '--Elija año(s)--'}).selectpicker('refresh');
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
          $body.removeClass("filter-proyect");
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
          $body.removeClass("filter-proyect");
          alertMessage("No se encontraron registros con el filtro realizado", "warning", 'top-center', true);
        }
      }
    });
  }
  
});