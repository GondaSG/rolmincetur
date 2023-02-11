define([
  "js/helper",
  "js/core/services",
  "js/core/popup",
  "js/core/permission",

  "js/widgets/eventssein",  

  "esri/widgets/Legend",
  "esri/widgets/LayerList",
  "esri/core/watchUtils",
  "esri/request",
  "esri/Graphic",
  "esri/tasks/QueryTask",
  "esri/tasks/support/Query"

], function (
  Helper,
  Services,
  Popup,
  Permission,

  Eventssein,

  Legend,
  LayerList,
  watchUtils,
  esriRequest,
  Graphic,
  QueryTask,
  Query

) {

  // LAYERS => se usa para la transparencia 
  var __mil_operacion = Services.getMilOperacion();
  var __mil_alerta = Services.getMilAlerta();
  var __mil_proyectos = Services.getMilProyectos();

  var __mil_da = Services.getMilDA();
  var __mil_pi = Services.getMilPI();
  var __mil_drone = Services.getMilDrone();
  var __mil_er = Services.getMilER();  
  var __mil_pe = Services.getMilPE();  
  var __mil_concesionelectrica = Services.getMilConcesionElectrica();  

  var __mil_redvial = Services.getMilRedvial();
  var __mil_hidrografia = Services.getMilHidrografia();

  var __mil_areaproteg =  Services.getMilAreaproteg();
  var __mil_zonaamortig =  Services.getMilZonaamortig();
  var __mil_zonaarqueolog =  Services.getMilZonaarqueolog();
  var __mil_concesionminera =  Services.getMilConcesionminera();
  var __mil_cenepred1 =  Services.getMilCenepred1();
  var __mil_cenepred2 =  Services.getMilCenepred2();
  var __mil_cenepred3 =  Services.getMilCenepred3();
  

  // Variables de Permisos
  var __sectorsallowed = Permission.getSectorsAllowed();  
  var __permisos_actionsgroup = Permission.getPermisosActionsgroup();
  var __permisos_others = Permission.getPermisosOthers();

 

  /*********************** AÑADIR CAPAS DE INFORMACIÓN ***********************/ 

  __globspace.map.addMany(__sectorsallowed);

  // Leyenda
  var legend = new Legend({
    view: __globspace.view,
    container: "Legenda",
    layerInfos: getLayersForLegend(__sectorsallowed)
  });

  // Layerlist
  var _lyl_sein = new LayerList({
    view: __globspace.view,
    container: 'lyl_sein',
  });


  /*********************** UX ****************************/

  var $body = $('body');

  // Carga previa del view
  __globspace.view.when(function(){
    $('#div_preloadermain').removeClass('preloader').addClass('preloader-none');
    setTimeout(function() {
      if ($body.hasClass("cargando")) $('#mensaje_carga_lenta').removeClass('notvisible');      
    }, 4000);
    Eventssein.showEventosRelevantesCoes();
  });
  

  //Al terminar de actualizar el View
  watchUtils.whenFalse(__globspace.view, "updating", function (evt) {    

    //acciones para el primer updating solamente (carga inicial)     
    if ($body.hasClass("cargando")) { 
      loadPopups();
      $('#mensaje_carga_lenta').addClass('notvisible');
      $('#preloader_layerlist').hide();
      $body.removeClass('cargando');

      $body.addClass('init-filter-proyect'); // añadir esta clase aux para poder cargar el select de filtrarPeriodo de Proyectos
      $body.addClass('init-filter-pi'); // añadir esta clase aux para poder cargar el select de filtrarPeriodo de PI 
      $body.addClass('init-filter-pe'); // añadir esta clase aux para poder cargar el select de filtrarCliente de PE 
      activeTooltip();      
      console.log('View actualizado');
    }
  });

  
  //Control active/desactive Popup
  __globspace.view.popup.autoOpenEnabled = true;
  __globspace.view.on('click', function () {
    if ($('#div_view').hasClass('desactive-click')) {
      __globspace.view.popup.autoOpenEnabled = true;
    } else {
      __globspace.view.popup.autoOpenEnabled = false;
    }
  });


  // Control de Opacidad de las capas
  $('#div_widgets').on('input', '.ran-opacity', function () {
    let idlayer = $(this).attr('id').split('?')[0];

    let opacity = $(this).val() / 100;
    $(this).siblings('span').text($(this).val() + "%");

    if ($(this).hasClass('class-sector')) {
      let layer = __globspace.map.findLayerById(idlayer);
      layer.opacity = opacity;
    } else {
      let alias = $(this).attr('data-alias');
      idlayer = $(this).attr('id').split('¿')[0];
      let _mil_sectorx = eval(alias);
      let sublayer = _mil_sectorx.findSublayerById(parseInt(idlayer));
      sublayer.opacity = opacity;
    }
  }).trigger('input');

  // Botones de acción del popup
  let morepopactions = {
    title: "Ver más información",
    id: "more-popactions",
    className: "esri-icon-handle-horizontal"
  };
  let transfpopaction = {
    title: "Ver Transformadores",
    id: "transf-popaction",
    className: "esri-icon-table"
  };
  

  function loadPopups() { //obtener todos los sublayers finales(mil) para crear los popup por defecto o asignarlo un popup personalizado
    let layers = __globspace.map.allLayers.items,
      grouplayers = [],
      auxlength = layers.length;

    for (let i = 0; i < auxlength; i++) {
      let result = [],
        sublayers = [],
        hassublayers = '';

      if (layers[i].type == "map-image") { //si es MapImageLayer 
        let aux_alias = layers[i].aux_alias;
        let url_mil = layers[i].url;
        let title = layers[i].title;
        layers[i].sublayers != null ? hassublayers = true : hassublayers = false;
        if (hassublayers) {
          sublayers = getSublayers(layers[i].sublayers.items, hassublayers, result );
        } else {
          sublayers = getSublayers(layers[i], hassublayers, result);
        }
        grouplayers.push({
          'group': aux_alias,
          'title': title,
          'url_mil': url_mil,
          'sublayers': sublayers
        });
      }

    }

    createPopupDefault(grouplayers);
  }

  function getSublayers(layers, hassublayers, result) {
    if (hassublayers) {
      for (let i = 0; i < layers.length; i++) {
        let layer = layers[i];
        layer.sublayers != null ? hassublayers = true : hassublayers = false;
        if (hassublayers) {
          getSublayers(layer.sublayers.items, hassublayers, result);
        } else {
          let url_servicio = layer.url;
          result.push({
            'idsublayer': layer.id,
            'url': url_servicio,
            'sublayer': layer,
            'name': layer.title
          });
          hassublayers = false;
          getSublayers(layer, hassublayers, result);
        }
      }
    } else {
      return
    }
    return result;
  }

  /**
   * obtener la leyenda de los sublayers
   * añadir los popup por defecto o personalizados
   * añadir las url detalles a los sublayers
   * 
   */
  function createPopupDefault(grouplayers) {
    let auxcount = 1;
    let auxlength = grouplayers.length;
    for (let i = auxlength - 1; i >= 0; i--) {
      let grouplayer = grouplayers[i];
      let group = grouplayer.group;
      let urlmil = grouplayer.url_mil;
      let sublayers = grouplayer.sublayers;
      let urllegends = urlmil + '/legend';
      let sublayersector = [];
      if(sublayers){
        let aux_sector = __globspace.infolayers.find(sublayer => sublayer.aux_alias == group);
        let alias_sector = aux_sector.alias;
        // let _mil_sectorx = eval(alias_sector);
        esriRequest(urllegends, {
          query: {
            f: 'json'
          },
          responseType: "json"
        })
        .then(function (response) {
          let layerslegends = response.data.layers; //leyendas de todas las capas de un mapImageLayer
          let auxlength2 = sublayers.length;
          for (let j = auxlength2 - 1; j >= 0; j--) {
            let item = sublayers[j];
            let idlayer = item.idsublayer;
            let sublayer = item.sublayer;
            let url_serviciodetalle = getUrlDetalle(sublayer.title, alias_sector);
            let url_serviciotransform = getUrlTransformadores(sublayer.title, alias_sector);
            let url_serviciodetallepe = getUrlDetallePE(sublayer.title, alias_sector);
            if (url_serviciodetalle != '') {
              sublayer.url_serviciodetalle = url_serviciodetalle; 
            }
            if (url_serviciotransform != '') {
              sublayer.url_serviciotransform = url_serviciotransform; 
            }
            if (url_serviciodetallepe != '') {
              sublayer.url_serviciodetallepe = url_serviciodetallepe; 
            }
            // let sublayer = _mil_sectorx.findSublayerById(parseInt(idlayer));
            let layerlegend = layerslegends.find(layer => layer.layerId === idlayer);
            sublayer.layerlegend = layerlegend; //added legend
            sublayer.alias_sector = alias_sector;
            sublayersector.push(sublayer);
            let popuptemplate = getPopup(sublayer);
            if (popuptemplate != '') { 
              // Añade Popup personalizado predefinido para algunas capas
              sublayer.popupTemplate = popuptemplate;
              // Añade Botones generales de acción al popup de algunas capas seleccionadas por título
              if(__permisos_others.indexOf('AccionesPopup') != -1) {   
                let accionspopup = []; // para añadir botones generales de popactions
                let sector = __globspace.infolayers.find(layer => layer.alias == sublayer.alias_sector);
                if (sublayer.alias_sector == '__mil_operacion') {
                  accionspopup = [morepopactions]; 
                  if ([sector.aliastitlelayers.layer_set_33, sector.aliastitlelayers.layer_set_60, sector.aliastitlelayers.layer_set_138, sector.aliastitlelayers.layer_set_220, sector.aliastitlelayers.layer_set_500].includes(sublayer.title)) {
                    accionspopup = [morepopactions, transfpopaction];
                  } else if ([sector.aliastitlelayers.layer_lt_33, sector.aliastitlelayers.layer_lt_60, sector.aliastitlelayers.layer_lt_138, sector.aliastitlelayers.layer_lt_220, sector.aliastitlelayers.layer_lt_500].includes(sublayer.title)) {
                    accionspopup = []; //sin popactions
                  } else if (sublayer.title == sector.aliastitlelayers.layer_estructura) {
                    accionspopup = []; //sin popactions
                  }
                } 
                else if (sublayer.alias_sector == "__mil_alerta") {
                  accionspopup = [morepopactions]; 
                  if ([sector.aliastitlelayers.layer_ts, sector.aliastitlelayers.layer_tc, sector.aliastitlelayers.layer_sec].includes(sublayer.title)) {
                    accionspopup = [transfpopaction];
                  }else if(sublayer.title == sector.aliastitlelayers.layer_ugc){
                    accionspopup = []; // sin popactions
                  }
                }
                else if (sublayer.alias_sector == "__mil_proyectos") {
                  accionspopup = [morepopactions]; 
                }
                else if (sublayer.alias_sector == "__mil_pe") {
                  accionspopup = [morepopactions]; 
                }
                else if (sublayer.alias_sector == "__mil_pi") {
                  accionspopup = [morepopactions]; 
                }
                sublayer.popupTemplate.actions = accionspopup;
              }
            } else {
              // Popup por defecto para el resto de las capas
              sublayer.createFeatureLayer().then((featureLayer) => featureLayer.load())
              .then((featureLayer) => {
                sublayer.popupTemplate = featureLayer.createPopupTemplate(); // popup added;              
                sublayer.popupTemplate.title += `: { ${ featureLayer.displayField } }`;
              });
            }
          }
          aux_sector.layers = sublayersector;
          if (auxcount == auxlength) {
            createLegendActionsLyl();
            auxcount = 1;
          }
          auxcount++;
        })
        .catch(function (error) {
          if (auxcount == auxlength) {
            createLegendActionsLyl();
            auxcount = 1;
          }
          auxcount++;
        })
      }else{
        auxcount ++;
      }
    }
  }

  /**
   * obtener la url detalle para:
   *  -alertas
   *  -eventos relevantes
   * 
   */
  function getUrlDetalle(title, aliassector) {
    let url_serviciodetalle = '';
    title = title.trim();
    let sector = __globspace.infolayers.find(layer => layer.alias == aliassector);

    if (aliassector == "__mil_alerta") {
      switch (title) {
        case sector.aliastitlelayers.layer_ugc:
          url_serviciodetalle = Services.getUrlAlertUGC();
          break;
        case sector.aliastitlelayers.layer_ts:
          url_serviciodetalle = Services.getUrlAlertTS();
          break;
        case sector.aliastitlelayers.layer_tc:
          url_serviciodetalle = Services.getUrlAlertTC();
          break;
        case sector.aliastitlelayers.layer_sec :
          url_serviciodetalle = Services.getUrlAlertSEC();
          break;
        case sector.aliastitlelayers.layer_ltc:
          url_serviciodetalle = Services.getUrlAlertLTC();
          break;
        case sector.aliastitlelayers.layer_ltcyr:
          url_serviciodetalle = Services.getUrlAlertLTCYR();
          break;
      }
    } else if (aliassector == '__mil_er') {
      switch (title) {
        case sector.aliastitlelayers.layer_set:
          url_serviciodetalle = Services.getUrlERSET();
          break;
        case sector.aliastitlelayers.layer_lt:
          url_serviciodetalle = Services.getUrlERLT(); 
          break;
        case sector.aliastitlelayers.layer_c:
          url_serviciodetalle = Services.getUrlERC(); 
          break;
      }
    }

    return url_serviciodetalle;
  }


  /**
   * obtener la url de transformadores para: 
   *  SETs de operacion
   *  SETs de alerta
   */
  function getUrlTransformadores(title, aliassector) {
    let url_serviciotransform = '';
    title = title.trim();
    let sector = __globspace.infolayers.find(layer => layer.alias == aliassector);

    if (aliassector == "__mil_alerta") {
      switch (title) {
        case sector.aliastitlelayers.layer_ts:
        case sector.aliastitlelayers.layer_tc:
        case sector.aliastitlelayers.layer_sec:
          url_serviciotransform = Services.getUrlTblTrf();
          break;
      }
    } else if (aliassector == '__mil_operacion') {
      switch (title) {
        case sector.aliastitlelayers.layer_set_33:
        case sector.aliastitlelayers.layer_set_60:
        case sector.aliastitlelayers.layer_set_138:
        case sector.aliastitlelayers.layer_set_220:
        case sector.aliastitlelayers.layer_set_500:
          url_serviciotransform = Services.getUrlTblTrf();
          break;
      }
    }

    return url_serviciotransform;
  }

  /**
   * obtener la url de detalle para: 
   *  Puntos de Entrega
   */
  function getUrlDetallePE(title, aliassector) {
    let url_serviciodetallepe = '';
    title = title.trim();
    let sector = __globspace.infolayers.find(layer => layer.alias == aliassector);

    if (aliassector == "__mil_pe") {
      switch (title) {
        case sector.aliastitlelayers.layer_pe:
          url_serviciodetallepe = {
            url_pe_pe: Services.getUrlPE(),
            url_pe_contrato: Services.getUrlPEContrato(),
            url_pe_interrupcion: Services.getUrlPEInterrupcion(),
            url_pe_tension: Services.getUrlPETension(),
            url_pe_tensiondet: Services.getUrlPETensionDet(),
          };
          break;
      }
    } 

    return url_serviciodetallepe;
  }

  /**
   * obtener el popup personalizado que le corresponde a cada capa
   */
  function getPopup(sublayer) {
    let title = sublayer.title.trim();
    let aliassector = sublayer.alias_sector;
    let sector = __globspace.infolayers.find(layer => layer.alias == aliassector);


    let popuptemplate = '';
    if (aliassector == "__mil_operacion") {
      switch (title) {
        
        // Centrales termicas
        case sector.aliastitlelayers.layer_cc_ct_sein: 
        case sector.aliastitlelayers.layer_cc_ct_aislados:  
          popuptemplate = Popup.getPopOperCT();
          break;
      
        // Centrales hidroelectricas
        case sector.aliastitlelayers.layer_cc_ch_aislados: 
        case sector.aliastitlelayers.layer_cc_ch_sein: 
          popuptemplate = Popup.getPopOperCH();
          break;
        
        // Centrales No Convencionales
        case sector.aliastitlelayers.layer_cnc_hidroelectrica:  
        case sector.aliastitlelayers.layer_cnc_eolica:
        case sector.aliastitlelayers.layer_cnc_biomasa:
        case sector.aliastitlelayers.layer_cnc_solar:
          popuptemplate = Popup.getPopOperCRER();
          break;
                  
        // LT
        case sector.aliastitlelayers.layer_lt_33:
        case sector.aliastitlelayers.layer_lt_60:
        case sector.aliastitlelayers.layer_lt_138:
        case sector.aliastitlelayers.layer_lt_220:
        case sector.aliastitlelayers.layer_lt_500:
          popuptemplate = Popup.getPopOperLT();
          break;

        // Estructuras
        case sector.aliastitlelayers.layer_estructura:
          popuptemplate = Popup.getPopOperEstructura();
          break;

        // SETs
        case sector.aliastitlelayers.layer_set_33:
        case sector.aliastitlelayers.layer_set_60:
        case sector.aliastitlelayers.layer_set_138:
        case sector.aliastitlelayers.layer_set_220:
        case sector.aliastitlelayers.layer_set_500:
          popuptemplate = Popup.getPopOperSET();
          break;
      }

    } else if (aliassector == "__mil_alerta") {
      switch (title) {
        case sector.aliastitlelayers.layer_ugc:
          popuptemplate = Popup.getPopAlertUGC();
          break;
        case sector.aliastitlelayers.layer_ts:
          popuptemplate = Popup.getPopAlertTS();
          break;
        case sector.aliastitlelayers.layer_tc:
          popuptemplate = Popup.getPopAlertTC();
          break;
        case sector.aliastitlelayers.layer_sec:
          popuptemplate = Popup.getPopAlertSEC();
          break;
        case sector.aliastitlelayers.layer_ltc:
          popuptemplate = Popup.getPopAlertLTC();
          break;
        case sector.aliastitlelayers.layer_ltcyr:
          popuptemplate = Popup.getPopAlertLTCyR();
          break;
      }

    } else if (aliassector == "__mil_proyectos") {
      switch (title) {        
        // SETs
        case sector.aliastitlelayers.layer_set_33:
        case sector.aliastitlelayers.layer_set_60:
        case sector.aliastitlelayers.layer_set_138:
        case sector.aliastitlelayers.layer_set_220:
        case sector.aliastitlelayers.layer_set_500:
          popuptemplate = Popup.getPopProySET();
          break;
        
        // LT
        case sector.aliastitlelayers.layer_lt_33:
        case sector.aliastitlelayers.layer_lt_60:
        case sector.aliastitlelayers.layer_lt_138:
        case sector.aliastitlelayers.layer_lt_220:
        case sector.aliastitlelayers.layer_lt_500: 
          popuptemplate = Popup.getPopProyLT();
          break;
        
        // Centrales convencionales y No convencionales
        case sector.aliastitlelayers.layer_cc_hidroelectrica: 
        case sector.aliastitlelayers.layer_cc_termica :
        case sector.aliastitlelayers.layer_cnc_hidroelectrica:
        case sector.aliastitlelayers.layer_cnc_eolica: 
        case sector.aliastitlelayers.layer_cnc_biomasa: 
        case sector.aliastitlelayers.layer_cnc_solar: 
          popuptemplate = Popup.getPopProyCE();
          break;
      }

    } else if (aliassector == "__mil_da") {
      switch (title) {
        case sector.aliastitlelayers.layer_descarganegativo:
        case sector.aliastitlelayers.layer_descargapositivo:
          popuptemplate = Popup.getPopDA();
          break;
      }

    } else if (aliassector == '__mil_er') {
      switch (title) {
        case sector.aliastitlelayers.layer_set:
          popuptemplate = Popup.getPopErSET();
          break;
        case sector.aliastitlelayers.layer_lt:
          popuptemplate = Popup.getPopErLT();
          break;
        case sector.aliastitlelayers.layer_c:
          popuptemplate = Popup.getPopErCE();
          break;
      }

    } else if (aliassector == "__mil_drone") {
      switch (title) {
        case sector.aliastitlelayers.layer_drone:
          popuptemplate = Popup.getPopDrone();
          break;
      }

    } else if (aliassector == "__mil_pi") {      
      switch (title) {  
        // SETs
        case sector.aliastitlelayers.layer_set_33:
        case sector.aliastitlelayers.layer_set_60:
        case sector.aliastitlelayers.layer_set_138:
        case sector.aliastitlelayers.layer_set_220:
        case sector.aliastitlelayers.layer_set_500:
          popuptemplate = Popup.getPopPiSET();
          break;
        
        // LT
        case sector.aliastitlelayers.layer_lt_33:
        case sector.aliastitlelayers.layer_lt_60:
        case sector.aliastitlelayers.layer_lt_138:
        case sector.aliastitlelayers.layer_lt_220:
        case sector.aliastitlelayers.layer_lt_500:
          popuptemplate = Popup.getPopPiLT();
          break;
      }

    }else if (aliassector == "__mil_pe") {
      switch (title) {
        case sector.aliastitlelayers.layer_pe:
          popuptemplate = Popup.getPopPE();
          break;
      }
    }
    return popuptemplate;
  }


  function createLegendActionsLyl() { //Crea Leyenda y Actions en Layerlists

    _lyl_sein.listItemCreatedFunction = defineActionsLyl;
    _lyl_sein.on("trigger-action", triggerActionLyl);

    // ocultar actions auxiliares (no funcionales) creados para corregir diseño
    setTimeout(function () { 
      $('#lyl_sein .action-hiden').parent().css('display', 'none')
    }, 10000);

  }

  function defineActionsLyl(event) {
    let item = event.item;
    let layer = item.layer;
    let idlayer = layer.id;

    /**
     * añadir transparencia solamente a los Grupos
     * añadir los botones de acciones del layerlist para cada Grupo
     */
    if (layer.type == 'map-image') {
      if (layer.aux_alias == "gruoperacion") {
        let actions = [];
        if (__permisos_actionsgroup.indexOf('FiltrarEmpresa') != -1) {
          actions.push({
            title: "Filtrar por Empresa",
            className: "icon-filter",
            id: "filterforcompany"
          });
        }

        if (__permisos_actionsgroup.indexOf('BusquedaUbigeo') != -1) {
          actions.push({
            title: "Búsqueda por Ubigeo",
            className: "icon-peru-line",
            id: "searchforubigeo"
          });
        }

        if (__permisos_actionsgroup.indexOf('Informes') != -1) {
          actions.push({
            title: "Informes",
            className: "icon-file-text2",
            id: "reportoperacion",
          });
        }

        // para corregir diseño cuando solo hay 1 action
        if (actions.length == 1) {
          actions.push({
            title: "aux",
            className: "remove-accion", //para ocultarlo con css y mantener el modo "más" (...)
            id: "remove"
          });
        }

        item.actionsSections = [actions];

      }
      if (layer.aux_alias == "grualerta") {
        let actions = [];
        if (__permisos_actionsgroup.indexOf('FiltrarPeriodo') != -1) {
          actions.push({
            title: "Filtrar por Periodo",
            className: "icon-filter",
            id: "filteralert"
          });
        }

        if (__permisos_actionsgroup.indexOf('FiltrarEmpresa') != -1) {
          actions.push({
            title: "Filtrar por Empresa",
            className: "icon-filter",
            id: "filterforcompany"
          });
        }

        if (__permisos_actionsgroup.indexOf('BusquedaUbigeo') != -1) {
          actions.push({
            title: "Búsqueda por Ubigeo",
            className: "icon-peru-line",
            id: "searchforubigeo"
          });
        }

        if (__permisos_actionsgroup.indexOf('Informes') != -1) {
          actions.push({
            title: "Informes",
            className: "icon-file-text2",
            id: "reportalert"
          });
        }

        if (__permisos_actionsgroup.indexOf('EventosSein') != -1) {
          actions.push({
            title: "Eventos Relevantes - COES",
            className: "icon-table2",
            id: "eventosein",
          });
        }

        if (__permisos_actionsgroup.indexOf('OtrosDocsIndicadores') != -1) {
          actions.push({
            title: "Otros indicadores - G. Aislada",
            className: "icon-line-chart",
            id: "masalert", // Tendrá Calificacion AD y alternativas para SETA, Margen de Reserva de Generación Aislada, Unidades de Generación Aislada Críticos (Interrupciones en Sistemas Eléctricos Aislados)
          });
        }

        // para corregir diseño cuando solo hay 1 action
        if (actions.length == 1) {
          actions.push({
            title: "aux",
            className: "remove-accion", //para ocultarlo con css y mantener el modo "más" (...)
            id: "remove"
          });
        }

        item.actionsSections = [actions];

      }
      if (layer.aux_alias == "gruproyectos") {
        let actions = [];
        if (__permisos_actionsgroup.indexOf('FiltrarPeriodo') != -1) {
          actions.push({
            title: "Filtrar por Periodo",
            className: "icon-filter",
            id: "filterproyect"
          });
        }

        if (__permisos_actionsgroup.indexOf('FiltrarEmpresa') != -1) {
          actions.push({
            title: "Filtrar por Empresa",
            className: "icon-filter",
            id: "filterforcompany"
          });
        }

        if (__permisos_actionsgroup.indexOf('BusquedaUbigeo') != -1) {
          actions.push({
            title: "Búsqueda por Ubigeo",
            className: "icon-peru-line",
            id: "searchforubigeo"
          });
        }

        if (__permisos_actionsgroup.indexOf('Informes') != -1) {
          actions.push({
            title: "Informes",
            className: "icon-file-text2",
            id: "reportproyect"
          });
        }

        // para corregir diseño cuando solo hay 1 action
        if (actions.length == 1) {
          actions.push({
            title: "aux",
            className: "remove-accion", //para ocultarlo con css y mantener el modo "más" (...)
            id: "remove"
          });
        }

        item.actionsSections = [actions];

      }

      if (layer.aux_alias == "grupi") {
        let actions = [];
        if (__permisos_actionsgroup.indexOf('FiltrarPeriodo') != -1) {
          actions.push({
            title: "Filtrar por Periodo",
            className: "icon-filter",
            id: "filterpi"
          });

          actions.push({
            title: "aux",
            className: "remove-accion", //para ocultarlo con css y mantener el modo "más" (...)
            id: "remove"
          });
        }

        item.actionsSections = [actions];

      }

      if (layer.aux_alias == "gruda") {
        let actions = [];
        if (__permisos_actionsgroup.indexOf('FiltrarPeriodo') != -1) {
          actions.push({
            title: "Filtrar por Fecha",
            className: "icon-filter",
            id: "filterdatmosf",
          });
          
          actions.push({
            title: "aux",
            className: "remove-accion", //para ocultarlo con css y mantener el modo "más" (...)
            id: "remove"
          });
        }

        item.actionsSections = [actions];

      }

      if (layer.aux_alias == "grupe") {
        let actions = [];

        if (__permisos_actionsgroup.indexOf('FiltrarPETension') != -1) {
          actions.push({
            title: "Filtro por Tensión",
            className: "icon-filter",
            id: "filterpetension"
          });  
        }
        if (__permisos_actionsgroup.indexOf('FiltrarPECliente') != -1) {
          actions.push({
            title: "Filtro por Cliente",
            className: "icon-filter",
            id: "filterclientepe"
          });  
        }
        if (__permisos_actionsgroup.indexOf('SearchPE') != -1) {
          actions.push({
            title: "Búsqueda por Punto Entrega",
            className: "esri-icon-search",
            id: "searchpe"
          });
        }

        // para corregir diseño cuando solo hay 1 action
        if (actions.length == 1) {
          actions.push({
            title: "aux",
            className: "remove-accion", //para ocultarlo con css y mantener el modo "más" (...)
            id: "remove"
          });
        }
        item.actionsSections = [actions];

      }

      if (layer.aux_alias == "gruer") { //añadir los botones de acciones del layerlist para sector Eventos relevantes
        if (__permisos_actionsgroup.indexOf('FiltrarPeriodo') != -1) {
          item.actionsSections = [
            [{
              title: "Filtrar por Periodo",
              className: "icon-filter",
              id: "filterevent",
            }, {
              title: "aux",
              className: "remove-accion",
              id: "remove"
            }]
          ];
        }
      }

      let class_sector = 'class-sector';
      idlayer = `${idlayer}?${item.aux_alias}`;
      // añadir caja de transparencia
      let div = document.createElement("div");
      div.className = 'caja-transparencia';
      div.id = 'div_' + idlayer;
      div.innerHTML = `<input type="range" min="0" max="100" value="100" step="5" id='${idlayer}' class="ran-opacity ${class_sector}" > <span id='lbl_${idlayer}' >100 %</span>`;

      item.panel = {
        content: [div],
        title: "Transparencia Sector",
        className: "esri-icon-environment-settings",
      };
    }

    if (layer.type == 'group') {

      let class_sector = 'class-sector';
      idlayer = `${idlayer}?${item.aux_alias}`;
      // añadir caja de transparencia
      let div = document.createElement("div");
      div.className = 'caja-transparencia';
      div.id = 'div_' + idlayer;
      div.innerHTML = `<input type="range" min="0" max="100" value="100" step="5" id='${idlayer}' class="ran-opacity ${class_sector}" > <span id='lbl_${idlayer}' >100 %</span>`;

      item.panel = {
        content: [div],
        title: "Transparencia",
        className: "esri-icon-environment-settings sector-123",
      };
    }
    /* fin transparencia sectores*/

    // Añadir opción de Busqueda por Grupo
    if(__globspace.groupsforsearch.includes(layer.title.trim()) && layer.sublayers != null){
      if (__permisos_actionsgroup.indexOf('BuscarGrupo') != -1) {
        item.actionsSections = [
          [{
            title: "Buscar en el grupo",
            className: "esri-icon-search icon-search-layer",
            id: "search-in-group",
          }]
        ];
      }
    }

    /**
     * Formar Leyenda y Actions en las Capas
     */
    if (item.children.items.length !== 0) {
      // make array of the sublayers
      let childrensublayer = item.children.items
      let auxlength = childrensublayer.length;
      for (let i = 0; i < auxlength; i++) {
        if (childrensublayer[i].children.items.length == 0) {
          let layerlegend = childrensublayer[i].layer.layerlegend;

          if (typeof layerlegend === 'undefined') {
            // caso de featurelayers crear su leyenda solo para los limites politicos
            childrensublayer[i].panel = {
              content: "legend",
              open: true
            };
          } else {
            // caso de MapImageLayer
            let auxlength2 = layerlegend.legend.length;
            let $containerlegend = document.createElement("div");

            for (let j = 0; j < auxlength2; j++) {
              let $lbllegend = document.createElement("span");
              $lbllegend.style.margin = "2px";
              $lbllegend.style.verticalAlign = "middle";
              $lbllegend.style.display = "block";

              let $imglegend = document.createElement("img");
              $imglegend.style.height = "20px";
              $imglegend.style.verticalAlign = "bottom";
              $imglegend.src = "data:image/png;base64," + layerlegend.legend[j].imageData;

              let $textnode = document.createTextNode(layerlegend.legend[j].label);

              $lbllegend.appendChild($imglegend);
              $lbllegend.appendChild($textnode);
              $containerlegend.appendChild($lbllegend);
            }

            childrensublayer[i].panel = {
              title: "Mostrar/Ocultar Leyenda",
              className: "esri-icon-layer-list",
              content: $containerlegend,
              open: true,
              visible: true
            };

            let actionscapa = [];
            actionscapa.push({
              title: "Transparencia",
              className: "esri-icon-environment-settings opacity layer-123",
              id: "layer-opacity"
            });

            if (__permisos_actionsgroup.indexOf('BuscarCapa') != -1) {
              actionscapa.push({
                title: "Buscar en Capa",
                className: "esri-icon-search icon-search-layer",
                id: "search-on-layer"
              });
            }

            // para corregir diseño cuando solo hay 1 action
            if (actionscapa.length == 1) {
              actionscapa.push({
                title: "aux",
                className: "remove-accion-sublayer",
                id: "remove"
              });
            }

            childrensublayer[i].actionsSections = [actionscapa];
                       
          }
        }
      }
    }    
  }


  function triggerActionLyl(event) {

    // Minimizar grilla y descender div contenedor de btns maximizadores en caso esté visible 
    $(".grilla").removeClass('min-size').addClass('max-size');
    let heightgrilla = $('#div_results').find('.visible').outerHeight();
    $('#div_btnmaximizadores, #div_btnmaximizadoresresult').css('bottom', `${heightgrilla}px`);

    let actionid = event.action.id;
    let itemlayer = event.item.layer;
    let idlayer = itemlayer.id;
    let group = itemlayer.aux_alias;

    switch (actionid) {
      // Acciones de Grupo

      // Sistemas en Operacion
      case "reportoperacion":
        $('#wg_reports').addClass('visible').removeClass('notvisible');
        $('#container_proyectlayer').addClass('notvisible').removeClass('visible');
        $('#container_sistemalertlayer').addClass('notvisible').removeClass('visible');
        $('#container_meses').addClass('visible').removeClass('notvisible');
        $('#container_trimestre').addClass('notvisible').removeClass('visible');
        $('#cmb_group_reports').val(group).change();
        break;

      // Sistemas en Alerta
      case "filteralert":
        $('#wg_filterperiodalert').toggleClass('notvisible visible');
        break;

      case "reportalert":
        $('#wg_reports').addClass('visible').removeClass('notvisible');
        $('#container_proyectlayer').addClass('notvisible').removeClass('visible');
        $('#container_sistemalertlayer').addClass('visible').removeClass('notvisible');
        $('#container_meses').addClass('notvisible').removeClass('visible');
        $('#container_trimestre').addClass('visible').removeClass('notvisible');
        $('#cmb_group_reports').val(group).change();
        break;

      case "eventosein":
        $('#li_vermas_events a').click();
        break;

      case "masalert":
        $('#wg_othersalert').toggleClass('notvisible visible');
        break;

      // Proyectos
      case "filterproyect":
        $('#wg_filterperiodproyect').toggleClass('notvisible visible');
        break;

      case "reportproyect":
        $('#wg_reports').addClass('visible').removeClass('notvisible');
        $('#container_proyectlayer').addClass('visible').removeClass('notvisible');
        $('#container_sistemalertlayer').addClass('notvisible').removeClass('visible');
        $('#container_meses').addClass('visible').removeClass('notvisible');
        $('#container_trimestre').addClass('notvisible').removeClass('visible');
        $('#cmb_group_reports').val(group).change();
        break;

      // PI
      case 'filterpi':
        $('#wg_filterperiodpi').toggleClass('notvisible visible');
        break;
      
      // DA
      case 'filterdatmosf':
        $('#wg_filterperiodda').toggleClass('notvisible visible');
        break;
      
      // ER
      case 'filterevent':
        $('#wg_filterperioder').toggleClass('notvisible visible');
        break;

      //PE 
      case 'filterpetension':
        $('#wg_filtertensionpe').toggleClass('notvisible visible');
        break;
      
      case 'filterclientepe':
        $('#wg_filterclientepe').toggleClass('notvisible visible');
        break;
      
      case 'searchpe':
        $('#wg_searchpe').toggleClass('notvisible visible');
        break;      

      case 'search-in-group':
        let result2 = [],
          padres2 = '',
          hasparent2 = true;
        let parents2 = getParentsLayerlist(itemlayer, hasparent2, padres2, result2);
        let aux_parents2 = parents2[0].title.substring(1).split('?');
        let nparents2 = aux_parents2.length;
        let sector3 = aux_parents2[nparents2 - 1];
        let capas2 = '';
        for (let i = nparents2 - 2; i >= 0; i--) {
          capas2 += ' / ' + aux_parents2[i];
        }
        $('#lbl_sector_searchingroup').text(sector3);
        $('#lbl_layer_searchingroup').text(capas2.substring(2));

        __globspace.grouplayersearch = itemlayer;
        $('#wg_searchingroup').removeClass('notvisible').addClass('visible');
        break;

      case 'searchforubigeo':
        __globspace.sublayersearchforubigeo = itemlayer;
        $('#lbl_sector_searchforubigeo').text(itemlayer.title);
        $('#wg_searchforubigeo').removeClass('notvisible').addClass('visible');
        break;

      case "filterforcompany":
        let anteriorgroup = $('#txt_aliassector').val();
        $('#txt_aliassector').val(group);
        $('#lbl_sector_searchforcompany').text(itemlayer.title);
        $('#form_searchforcompany').removeClass();
        $('#btn_clearsearchforcompany').removeClass('form-operacion form-alert form-proyecto');

        if (anteriorgroup != group) {
          $('#txt_searchforcompany').val('');
        }

        let clase = '';
        switch (group) {
          case 'gruoperacion':
            clase = 'form-operacion';
            break;
          case 'grualerta':
            clase = 'form-alert';
            break;
          case 'gruproyectos':
            clase = 'form-proyecto';
            break;
        }
        $('#form_searchforcompany').addClass(clase);
        $('#btn_clearsearchforcompany').addClass(clase);

        $('#wg_filterforcompany').removeClass('notvisible').addClass('visible');
        break;

      // Acciones de Capa
      case "layer-opacity":
        let alias = itemlayer.alias_sector;
        let sector = __globspace.infolayers.find(layer => layer.alias == alias);
        let $parentopacity = `#${sector.containerlyl}_${event.item.uid}__title`;
        let $aux_opacity = $(`#${sector.containerlyl}_${event.item.uid}_actions ul li:first`);
        $aux_opacity.toggleClass("esri-layer-list__item-actions-menu-item esri-layer-list__item-actions-menu-item--active");
        let opacity = (itemlayer.layer.opacity) * 100;
        let $div_opacity = $(`#div_${event.item.uid}`);

        idlayer = `${idlayer}¿${event.item.uid}`

        if ($('#' + idlayer).length > 0) {
          $div_opacity.toggleClass("active inactive");
          $(`#${idlayer}`).val(opacity);
          $(`#span${idlayer}`).text(opacity);
        } else {
          let $div = `<div class="caja-transparencia active" id='div_${event.item.uid}'> 
            <input type="range" min="0" max="100" value="${opacity}" step="5" id="${idlayer}" data-alias=${alias} class="ran-opacity"> 
            <span id="lbl_${idlayer}">100 %</span>
          </div>`;
          $($parentopacity).parent().parent().after($div);
        }
        break;

      case "search-on-layer":
        $('#wg_searchinlayer').removeClass('notvisible').addClass('visible');
        let result = [],
          padres = '',
          hasparent = true;
        let parents = getParentsLayerlist(itemlayer, hasparent, padres, result);
        let aux_parents = parents[0].title.substring(1).split('?');
        let nparents = aux_parents.length;
        let sector2 = aux_parents[nparents - 1];
        let capas = '';
        for (let i = nparents - 2; i >= 0; i--) {
          capas += ' / ' + aux_parents[i];
        }
        $('#lbl_sector_searchinlayer').text(sector2);
        $('#lbl_layer_searchinlayer').text(capas.substring(2));

        let titlereport = `${sector2} / ${capas.substring(2)}`;
        let data = {
          'sublayer': itemlayer,
          'titlereport': titlereport
        };

        __globspace.sublayersearch = data;
        break;
    }
  }


  /*********************** FUNCIONES DE APOYO ****************************/

  function getParentsLayerlist(layer, hasparent, padres, result) { //Obtiene cadena de layers padre de una capa (title c/layer) 
    //evaluación ascendente (de Capa a Sector) 
    if (!hasparent) {
      return result.push({
        'title': padres
      });
    } else {
      typeof (layer.parent.title) === "undefined" ? hasparent = false: hasparent = true;
      padres += '?' + layer.title;
      getParentsLayerlist(layer.parent, hasparent, padres, result);
    }
    return result;
  }


  function getLayersForLegend(arr_sectors) {
    let layerinfos = [];
    for (let i = 0; i < arr_sectors.length; i++) {
      let item = {
        layer: arr_sectors[i]
      }
      layerinfos.push(item);
    }
    return layerinfos;
  }

  function activeTooltip(){

    setTimeout(() => {
      $('[title]:not([data-toggle="tooltip"])').tooltip('setContent');
      $('[title]:not([data-toggle="tooltip"])').tooltip({'placement': 'right'});
      $('[data-original-title="Abierto"]').tooltip('disable');
      $('[data-original-title="Expandir"]').tooltip('disable');
      $('[data-original-title="Transparencia Sector"]').tooltip('disable');
      $('.esri-layer-list__item-title').tooltip('disable');
      $('.container-wg-medir .esri-button').tooltip('disable');
      
      $('li.esri-layer-list__item-action').tooltip('disable');
      $('.esri-direct-line-measurement-3d__clear-button').tooltip('disable');
      $('li.esri-layer-list__item-action[data-original-title="Transparencia"]').tooltip('enable');
      $('li.esri-layer-list__item-action[data-original-title="Buscar en Capa"]').tooltip('enable');
      
      $('[title]:not([data-toggle="tooltip"])').tooltip({ trigger: "hover" });
      $('[data-toggle="tooltip"]').tooltip({ trigger: "hover" }); // para activar el tooltip
    }, 500);
    
  }

});


/* REVISADO */