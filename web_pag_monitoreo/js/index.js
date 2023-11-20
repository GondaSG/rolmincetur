var url_electricidad = 'https://services5.arcgis.com/oAvs2fapEemUpOTy/arcgis/rest/services/Registro_de_Emergencias_View/FeatureServer';


require(
  [
    "esri/Map",
    "esri/views/MapView",
    "esri/views/SceneView",
    "esri/widgets/Expand",
    "esri/widgets/Home",
    "esri/widgets/BasemapGallery",
    "esri/widgets/Locate",
    "esri/widgets/Search",
    "esri/widgets/Print",
    "esri/widgets/Compass",
    "esri/widgets/Measurement",
    "esri/layers/MapImageLayer",
    "esri/widgets/LayerList",
    "esri/widgets/Zoom",
    "esri/layers/KMLLayer",
    "esri/layers/WebTileLayer",
    "esri/Basemap",
    "esri/layers/BingMapsLayer",
    "esri/layers/TileLayer",
    "esri/layers/OpenStreetMapLayer",
    "esri/widgets/BasemapGallery/support/LocalBasemapsSource",
    "esri/layers/FeatureLayer",
    "esri/layers/WMSLayer",
    "esri/tasks/QueryTask",
    "esri/tasks/support/Query"
  ],
  function(
    Map,
    MapView,
    SceneView,
    Expand,
    Home,
    BasemapGallery,
    Locate,
    Search,
    Print,
    Compass,
    Measurement,
    MapImageLayer,
    LayerList,
    Zoom,
    KMLLayer,
    WebTileLayer,
    Basemap,
    BingMapsLayer,
    TileLayer,
    OpenStreetMapLayer,
    LocalBasemapsSource,
    FeatureLayer,
    WMSLayer,
    QueryTask,
    Query
  ){

    $(document).ready(function(){     
      const appConfig = {
        mapView: null,
        sceneView: null,
        activeView: null,
        container: "map" // use same container for views
      };

      var basemaps = [
        new Basemap({
            baseLayers: [
                new WebTileLayer({
                    urlTemplate: "https://mts1.google.com/vt/lyrs=y@186112443&hl=x-local&src=app&x={col}&y={row}&z={level}&s=Galile",
                    title: "Google Maps Satélite",
                    copyright: 'Datos de mapas ©2023 Google, INEGI'
                })
            ],
            title: "Google Maps Satélite",
            id: "BaseMapGMSalelite",
            thumbnailUrl: "https://snirh.ana.gob.pe/IconoGis/MiniMapGMSatelite.png"
        }),
        new Basemap({
            baseLayers: [
                new WebTileLayer({
                    urlTemplate: "https://mts1.google.com/vt/lyrs=m@221097413&hl=x-local&src=app&x={col}&y={row}&z={level}&s=Galile",
                    title: "Google Maps Calles",
                    copyright: 'Datos de mapas ©2023 Google, INEGI'
                })
            ],
            title: "Google Maps Calles",
            id: "BaseMapGMStreet",
            thumbnailUrl: "https://snirh.ana.gob.pe/IconoGis/MiniMapGMStreet.png"
        }),
        new Basemap({
            id: 'satellite',
            baseLayers: new TileLayer({
                url: 'http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
            }),
            thumbnailUrl: 'https://www.arcgis.com/sharing/rest/content/items/c7d2b5c334364e8fb5b73b0f4d6a779b/info/thumbnail/thumbnail1607389529861.jpeg',
            title: 'Imágenes',
        }),
        new Basemap({
            id: 'streets',
            baseLayers: [new TileLayer({
                url: 'http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
            }), new TileLayer({
                url: 'http://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer',
                isReference: true,
                displayLevels: [0, 1, 2, 3, 4, 5, 6, 7],
            }),
            ],
            thumbnailUrl: 'https://www.arcgis.com/sharing/rest/content/items/ea3befe305494bb5b2acd77e1b3135dc/info/thumbnail/thumbnail1607389425104.jpeg',
            title: 'Imágenes con Etiquetas',
        }),
        new Basemap({
            id: 'streets-vector',
            baseLayers: new TileLayer({
                url: 'http://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer',
            }),
            thumbnailUrl: 'https://www.arcgis.com/sharing/rest/content/items/e3e6df1d2f6a485d8a70f28fdd3ce19e/info/thumbnail/thumbnail1607389307240.jpeg',
            title: 'Calles'//,
            //tabindex: 1,
        }),
        new Basemap({
            id: 'topo',
            baseLayers: new TileLayer({
                url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer',
            }),
            thumbnailUrl: 'https://www.arcgis.com/sharing/rest/content/items/dd247558455c4ffab54566901a14f42c/info/thumbnail/thumbnail1607389112065.jpeg',
            title: 'Topográfico',
        }),
        new Basemap({
            id: 'gray',
            baseLayers: [new TileLayer({
                url: 'http://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer',
            }), new TileLayer({
                url: 'http://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer',
            })],
            thumbnailUrl: 'https://www.arcgis.com/sharing/rest/content/items/0f74af7609054be8a29e0ba5f154f0a8/info/thumbnail/thumbnail1607388219207.jpeg',
            title: 'Lona Gris Claro',
        }),
        new Basemap({
            id: 'dark-gray',
            baseLayers: [new TileLayer({
                url: 'http://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer',
            }), new TileLayer({
                url: 'http://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Reference/MapServer',
            })],
            thumbnailUrl: 'https://www.arcgis.com/sharing/rest/content/items/7742cd5abef8497288dc81426266df9b/info/thumbnail/thumbnail1607387673856.jpeg',
            title: 'Lona Gris Oscuro',
        }),        
        new Basemap({
            id: 'osm',
            baseLayers: new OpenStreetMapLayer(),
            thumbnailUrl: '//oefa.maps.arcgis.com/sharing/rest/content/items/d415dff75dd042258ceda46f7252ad70/info/thumbnail/temposm.jpg',
            title: 'OpenStreetMap',
        }),
        new Basemap({
          baseLayers : [
            new WebTileLayer({
            urlTemplate: "https://mts1.google.com/vt/lyrs=s@186112443&hl=x-local&src=app&x={col}&y={row}&z={level}&s=Galile",
            title: "google maps"
          })
          ],
          thumbnailUrl: "img/widget/mapgoogle.png",
          title: "Google maps"
        }),
        new Basemap({
          baseLayers : [new BingMapsLayer({
            style : "aerial",
            key : "AicSAOPnUoCgvinvEKdYlAQ0lHWapVDXrLjbSPtamQME4fpNseNCu3vHRRTuOejk",
          })],
          thumbnailUrl: "img/widget/mapabing.png",
          title: "Bing aerial"
        }),
        new Basemap({
          portalItem: {
            id: "c50de463235e4161b206d000587af18b" // Mid-Century Map
          }
        })
      ];

      boundsDefault = { xmin: - 81.3867, ymin: -18.4483, xmax: -68.652329, ymax: - 0.038777 };// new google.maps.LatLngBounds(new google.maps.LatLng(-18.4483, -81.3867), new google.maps.LatLng(-0.038777, -68.652329));

      const initialViewParams = {
        zoom: 6,
        ui: {
          components: ["attribution"]
        },
        extent: boundsDefault,
        container: appConfig.container
      };

      var map = new Map({
        basemap: basemaps[3],
        ground: "world-elevation",
      });

      // Crea la vista general
      var overviewMap = new Map({
        basemap: basemaps[4],
      });
      
      var overviewView = new MapView({
        container: "overviewDiv",
        map: overviewMap,
        constraints: {
          snapToZoom: false
        },
        ui: {
          components : []
        }
      });
      
      // Remove the default widgets
      //overviewView.ui.components = [];

      
      // create 2D view and and set active
      appConfig.mapView = createView(initialViewParams, "2d");
      appConfig.mapView.map = map;
      appConfig.activeView = appConfig.mapView;

      // Evento para sincronizar las vistas
      appConfig.activeView.watch("extent", function() {
        // Sincroniza la extensión de la vista general con la vista principal
        overviewView.goTo(appConfig.activeView.extent);
        
        // Dibuja un rectángulo que representa la extensión actual del mapa principal en la vista general
        overviewView.graphics.removeAll(); // Limpia gráficos anteriores
        overviewView.graphics.add({
          geometry: appConfig.activeView.extent,
          symbol: {
            type: "simple-fill",
            color: [0, 0, 0, 0.5],
            outline: null
          }
        });
      });

      // create 3D view, won't initialize until container is set
      initialViewParams.container = null;
      initialViewParams.map = map;
      appConfig.sceneView = createView(initialViewParams, "3d");
      appConfig.sceneView.watch("extent", function() {
        // Sincroniza la extensión de la vista general con la vista principal
        overviewView.goTo(appConfig.activeView.extent);
        
        // Dibuja un rectángulo que representa la extensión actual del mapa principal en la vista general
        overviewView.graphics.removeAll(); // Limpia gráficos anteriores
        overviewView.graphics.add({
          geometry: appConfig.activeView.extent,
          symbol: {
            type: "simple-fill",
            color: [0, 0, 0, 0.5],
            outline: null
          }
        });
      });

      // convenience function for creating either a 2D or 3D view dependant on the type parameter
      function createView(params, type) {
        let view;
        if (type === "2d") {
          view = new MapView(params);
          return view;
        } else {
          view = new SceneView(params);
        }
        return view;
      }

      const measurement = new Measurement();      
      measurement.view = appConfig.activeView;

      var localSource = new LocalBasemapsSource({
        basemaps: basemaps
      });

      var basemapGallery = new BasemapGallery({ container: document.createElement("div"), view: appConfig.activeView, source: localSource });
      
      // Create new instance of the Measurement widget
      ConfigBotonesMap(appConfig.mapView);
      ConfigBotonesMap(appConfig.sceneView);

      function ConfigBotonesMap(pView) {
        CreateCustomButton({
          mapView: pView,
          position: "top-right",
          innerHTML: "3D",
          className: "switch-btn-3d esri-widget--button esri-widget esri-interactive",
          toolTip: "Mapa 3D",
          onClick: function (e) {
              switchView(this);
          }
        });
      }
      var homeBtn = new Home({
        view: appConfig.activeView,
      });
      appConfig.activeView.ui.add(homeBtn, "top-right");

      const searchWidget = new Search({
        view: appConfig.activeView,
        container: "divTop",
        allPlaceholder: "Buscar en Google Maps",
        placeholder: "Buscar en Google Maps"
      });
      
      var zoomBtn = new Zoom({ view: appConfig.activeView });
      //zoomBtn.render(function () { Metro.makePlugin($(".esri-icon-plus").parent(), "hint", { hintText: "Acercar", hintPosition: "left", clsHint: "custom-hint" }); })
      appConfig.activeView.ui.add(zoomBtn, "top-right");
      
      var btnMapaBaseGallery = new Expand({ view: appConfig.activeView, content: basemapGallery, expandIconClass: "esri-icon-basemap btnMapaBaseGallery" });
      basemapGallery.watch("activeBasemap", function () {
          var mobileSize = appConfig.activeView.heightBreakpoint === "xsmall" || appConfig.activeView.widthBreakpoint === "xsmall";
          if (mobileSize) {
              btnMapaBaseGallery.collapse();
          }
      });
      appConfig.activeView.ui.add(btnMapaBaseGallery, "top-right");
      appConfig.activeView.when(function() {
        configIconos();
        $(".esri-attribution__link").after('<span id="sMapLonLat"><\/span>');
      });
      appConfig.mapView.on("pointer-move", function(n) {
        let t = appConfig.mapView.toMap(n)
          , i = document.getElementById("sMapLonLat");
        i && (i.innerHTML = " | Lon:" + t.longitude.toFixed(6) + ", Lat:" + t.latitude.toFixed(6));
      });
      appConfig.sceneView.when(function() {
          $(".esri-attribution__link").after('<span id="sMapLonLat3D"><\/span>')
      });
      appConfig.sceneView.on("pointer-move", function(n) {
          let t = appConfig.sceneView.toMap(n);
          if (t!=null)
            document.getElementById("sMapLonLat3D").innerHTML = " | Lon:" + t.longitude.toFixed(6) + ", Lat:" + t.latitude.toFixed(6)
      });

      let locate = new Locate({
        view: appConfig.activeView,
      });
      //
      var print = new Print({
        view: appConfig.activeView,
        templateOptions: {
          title: "Mapa Centro Monitoreo",
          format: "pdf",
          exportOptions: {
            dpi: 300
          },
        },
        printServiceUrl: "https://gisem.osinergmin.gob.pe/serverosih/rest/services/ExportWebMapMEM/GPServer/Export%20Web%20Map"
      });
      //
      var _print = new Expand({
        expandIcon: "print",  // see https://developers.arcgis.com/calcite-design-system/icons/
        view: appConfig.activeView,
        content: print,
        expandTooltip: "Imprimir",
        group: "top-right"
      });
      //
      var _medicion = new Expand({
        // expandIcon: "legend",  // see https://developers.arcgis.com/calcite-design-system/icons/
        expandIconClass : "esri-icon-measure-line",
        view: appConfig.activeView,
        content: document.getElementById("toolbarDiv"),
        group: "top-right",
        expandTooltip: "Medición",
      });
      //
      var _addLayers = new Expand({
        expandIconClass : "mif-download",
        view: appConfig.activeView,
        content: document.getElementById("widgetAddLayers"),
        group: "top-right",
        expandTooltip: "Descargar capas",
        position: "top-right"
      });
      //
      var _upload = new Expand({
        expandIconClass : "mif-file-upload",
        view: appConfig.activeView,
        content: document.getElementById("widgetUpload"),
        group: "top-right",
        expandTooltip: "Subir KML"
      });
      //
      let compass = new Compass({
        view: appConfig.activeView,
      });
      //
      var _cmo = new Expand({
        expandIconClass : "mif-comment",
        view: appConfig.activeView,
        content: document.getElementById("divCMO"),
        group: "top-right",
        expandTooltip: "Formulario CMO",
        mode:'floating'
      });   
      
      appConfig.activeView.ui.add([locate, _print, compass, _medicion, _cmo, _addLayers, _upload], "top-right");

      function CreateCustomButton(pParams) {
        var element = document.createElement('div');
        element.className = pParams.className;
        element.setAttribute("data-role", "hint");
        if (pParams.dataHintPosition)
            element.setAttribute("data-hint-position", pParams.dataHintPosition);
        else
            element.setAttribute("data-hint-position", "left");
        element.setAttribute("data-hint-text", pParams.toolTip);
        element.setAttribute("data-cls-hint", "custom-hint");
        if (pParams.innerHTML)
            element.innerHTML = pParams.innerHTML;
        if (pParams.onClick)
            element.onclick = pParams.onClick;
        pParams.mapView.ui.add(element, pParams.position);
      }
      
      // Set-up event handlers for buttons and click events
      const distanceButton = document.getElementById('distance');
      const areaButton = document.getElementById('area');
      const clearButton = document.getElementById('clear');
      
      distanceButton.addEventListener("click", () => {
        distanceMeasurement();
      });
      areaButton.addEventListener("click", () => {
        areaMeasurement();
      });
      clearButton.addEventListener("click", () => {
        clearMeasurements();
      });
      
      var _mil_electricidad = new MapImageLayer({
        url: url_electricidad,
        title: 'ELECTRICIDAD'
      });

      const layer = new FeatureLayer({
        visible:false,
        url: url_electricidad,
        outFields: ["*"],
        popupTemplate: {
          outFields: ["*"],
          content: populationChange
        }        
      });
      var url2 =  "https://services5.arcgis.com/oAvs2fapEemUpOTy/ArcGIS/rest/services/RegEmergencias__Bitacora_vista/FeatureServer/0";

      function populationChange(feature) {
        appConfig.activeView.popup.close();
        var featureD = feature.graphic.attributes;
        console.log(featureD);
        $("#dteRegistro").html(moment(new Date(featureD.fecha_y_hora_registro)).format("D/M/YYYY"));
        $("#spanSector").html(featureD.selected_sector);
        
        $("#spanOficina").html(featureD.oficina_regional);
        $("#spanIncidente").html(featureD);
        
        $("#spanOperativa").html(featureD);
        $("#spanMedios").html(featureD);
        $("#spanAtencion").html(featureD);
        $("#txtDes").html(featureD.descripcion);
        $('.btnclosebtn').show();
        var charms = Metro.getPlugin('#layerInfo', 'charms');
        charms.open();
        var id_um = feature.graphic.attributes.codigo;
        $.getJSON("https://gisem.osinergmin.gob.pe/validar/geodash/ws/api/incidente/"+id_um, function( response ) {
          console.log(response);
          if (response.length > 0) {
           var attr = response[0];
            console.log(attr);
            $("#spanCriticidad").html(attr.criticidad);
            $("#spanEstado").html(attr.estadO_EVENTO);
          }
       });
       
        var query = new QueryTask({url:url2}); 
        var params  = new Query();  
        params.returnGeometry = false;
        params.outFields = ["*"];
        params.where = "codigo = '"+id_um+"'";
        query.execute(params).then(function(response){
              console.log(response);
              var features = response.features;
              var html2 = "";
              features.forEach( (t, i) => {
                  html2 +=  `<tr><td style="width:15%" class="esri-feature__field-data">${t.attributes.selected_gerencia}</td>`;
                  html2 +=  `<td style="width:35%" class="esri-feature__field-data">${t.attributes.actividad}</td>`;
                  html2 +=  `<td style="width:20%" class="esri-feature__field-data">${moment(new Date(t.attributes.fecha_y_hora_registro)).format("D/M/YYYY")}</td>`;
                  html2 +=  `<td style="width:10%" class="esri-feature__field-data">''</td></tr>`;
              });
              $("#tbResult").html(html2);
        });
        appConfig.activeView.popup.close();
        return null;
      }

      map.add(layer);

      //setInterval(() => {
      //  console.log('intervalos');
      //  if (layer)  {
      //      layer.visible=!layer.visible?true:false;
      //  }
      //}, 1000);

      var _lyl_gasnatural = new LayerList({
        view: appConfig.activeView,
        container: 'collapseExample',
      });

      // Call the loadView() function for the initial view
      loadWidgets(appConfig.activeView);

      function loadWidgets(activeView){
        measurement.view = activeView;
        btnMapaBaseGallery.view = activeView;
        locate.view = activeView;
        homeBtn.view = activeView;
        print.view = activeView;
        compass.view = activeView;
        zoomBtn.view = activeView;
        activeView.ui.add(homeBtn, "top-right");
        activeView.ui.add(zoomBtn, "top-right");
        activeView.ui.add(btnMapaBaseGallery, "top-right");
        activeView.ui.add([compass, locate, _medicion, _print, _addLayers, _upload, _cmo], "top-right");
      }

      // Switches the view from 2D to 3D and vice versa
      function switchView(switchButton) {
        const is3D = appConfig.activeView.type === "3d";
        const activeViewpoint = appConfig.activeView.viewpoint.clone();

        // remove the reference to the container for the previous view
        appConfig.activeView.container = null;

        if (is3D) {
          // if the input view is a SceneView, set the viewpoint on the
          // mapView instance. Set the container on the mapView and flag
          // it as the active view
          appConfig.mapView.viewpoint = activeViewpoint;
          appConfig.mapView.container = appConfig.container;
          appConfig.activeView = appConfig.mapView;
          switchButton.innerHTML = "2D";
        } else {
          appConfig.sceneView.viewpoint = activeViewpoint;
          appConfig.sceneView.container = appConfig.container;
          appConfig.activeView = appConfig.sceneView;
          switchButton.innerHTML = "3D";
        }
        appConfig.activeView.when(function () {
          loadWidgets(appConfig.activeView);
        });
        
      }

      // Call the appropriate DistanceMeasurement2D or DirectLineMeasurement3D
      function distanceMeasurement() {
        const type = appConfig.activeView.type;
        measurement.activeTool = type.toUpperCase() === "2D" ? "distance" : "direct-line";
        distanceButton.classList.add("active");
        areaButton.classList.remove("active");
      }

      // Call the appropriate AreaMeasurement2D or AreaMeasurement3D
      function areaMeasurement() {
        measurement.activeTool = "area";
        distanceButton.classList.remove("active");
        areaButton.classList.add("active");
      }

      // Clears all measurements
      function clearMeasurements() {
        distanceButton.classList.remove("active");
        areaButton.classList.remove("active");
        measurement.clear();
      }

      $("#widgetUpload").on("change", "#form_uploadkml", function(event) {
        let files = event.target.files;
        if(files.length == 1){
          let filename = event.target.value.toLowerCase();
          if (filename.indexOf(".kml") !== -1 || filename.indexOf(".kmz") !== -1) { //Si archivo es .kml o .kmz
            let file = files[0];
            addKmlLayer(file);
          } else {
            alert("error");
          }
        }
      });  
  
      function addKmlLayer(file){   
        if (window.FormData !== undefined) {
            let data = new FormData();
            data.append("file", file);
            let filename = file.name;
            filename = filename.replace(/\ /g, '%20'); //replace whitespace por %20
            $.ajax({
                type: "POST",
                url: "https://gisem.osinergmin.gob.pe/validar/servicekml/home/uploadfile",
                contentType: false,
                processData: false,
                data: data,
                success: function(reponse) {
                  if(reponse.result){           
                    let urlkml = "https://gisem.osinergmin.gob.pe/validar/servicekml/files/"+ filename;
                    let nuevacapa = new KMLLayer(urlkml, {
                        id: 'KMLLayer'
                    });                    
                    map.add(nuevacapa);
                    nuevacapa.when(function(){
                      appConfig.activeView.extent = nuevacapa.fullExtent;
                    });
                  }else{
                    //handleError($msgstatus, $preloader, $placeholder, $infile, 'Error al subir archivo', $.trim(filename));
                  }
                }
            });
        }
      }

      $("#btn_addlayer").on("click", function(event) {
        //$('#sp_uploadstatus_url').html("");
        debugger;
        let //$preloader = $('#btn_preuploader').removeClass('notvisible').addClass('visible'),
          $btnadd = $(this).removeClass('visible').addClass('notvisible'),
          tipo = $('#cmb_tiposervice').val(),
          url_newcapa = $.trim($('#txt_urlservice').val()),
          nuevacapa = "";
  
        switch (tipo) {
          case 'shape':
            nuevacapa = new FeatureLayer(url_newcapa);
            break;
          case 'wms':
            nuevacapa = new WMSLayer({
              url: url_newcapa,
              legendEnabled: true,
            });
            break;
          default: ''; break;
        }

        nuevacapa.load().then(function(){
          nuevacapa.opacity = 0.75;
          map.add(nuevacapa);
          //Zoom to new layer
          if(tipo == 'wms' && nuevacapa.fullExtent) {
            appConfig.activeView.goTo(nuevacapa.fullExtent);
          }else {
            zoomTolayer(nuevacapa);
          } 
        });
        
      });

      function zoomTolayer(layer){
        return layer.queryExtent().then(function(response){
          appConfig.activeView.goTo(response.extent);
        });
      }

      $.getJSON("https://gisem.osinergmin.gob.pe/validar/geodash/ws/api/indicadorCalculoCache", function( response ) {
         console.log(response);
         if (response.length > 0) {
          response.forEach( (t, i) =>{
            if (i > 0) {
              return;
            }
            var id = "div" + t.iD_INDICADOR_CALCULO;
            $div = $("<div id='"+id+"'></div>");
            $("#divCharts").append($div);
            var indicador = JSON.parse(t.valor);
            console.log(indicador);
            Highcharts.chart(id, indicador);
          });
         }
      });

      var response = {
        chart: {
          type: 'bar'
        },
        title: {
            text: 'Incidentes por sector'
        },
        xAxis: {
            categories: ['ELECTRICIDAD', 'HIDROCARBUROS LIQ...', 'GENERAL', 'GAS NATURAL', 'MINERIA']
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        legend: {
            reversed: true
        },
        tooltip: {
            headerFormat: '<b>Sector: {point.x}</b><br/>',
            pointFormat: ' Criticidad: {series.name}<br/> Incidencias: {point.y} <br/>Total: {point.stackTotal}'
        }, 
        credits: {
          enabled: false
        }, 
        plotOptions: {
            series: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: '#FFFFFF',
                    formatter: function() {
                      if (this.y > 0)
                        return '<span style="color: white">' + this.y + ' </span>';
                      else '';
                  },
                }
            }
        },
        series: [{
            name: 'POR DEFINIR',
            data: [16, 1, 0, 2, 1],
            color: '#41A4FF',
        }, {
            name: 'MEDIO',
            data: [15, 13, 4, 1, 3],
            color: '#D9B300',
        }, {
            name: 'BAJO',
            data: [118, 40, 9, 8, 1],
            color: '#317F43',
        }, {
            name: 'ALTO',
            data: [13, 8, 1, 0, 1],
            color: '#FF0000',
        }]
      };
      console.log(JSON.stringify(response));
    
      $('#toolbarDiv').removeClass("d-none");
      $('#divCMO').removeClass("d-none");
      $('#widgetAddLayers').removeClass("d-none");
      $('#widgetUpload').removeClass("d-none");  


      Highcharts.setOptions({
        lang: {
          viewFullscreen:"Ver en pantalla completa",
          downloadJPEG:"Descarga JPEG",
          downloadPDF:"Descarga PDF",
          downloadPNG:"Descarga PNG ",
          downloadSVG:"Descarga SVG", 
          printChart:"Imprimir"
        },
        credits : {
          enabled: false
        }
      });

      Metro.makePlugin("#layerInfo", 'charms', {});

      $("li.item-element").click(function(e){
        e.stopPropagation();
        e.preventDefault();
        $(this).addClass("active").siblings().removeClass("active")
        console.log('e', e);
        if (e.currentTarget.dataset.item=="1")
          layer.visible=true;
      })
      
    });
    document.getElementById("ovwButton").addEventListener("click", function() {
      var n = document.getElementById("overviewDiv")
        , t = document.getElementById("ovwButton");
      t.classList.toggle("ovwHide");
      n.classList.toggle("hide")
    });
    document.getElementById("ovwButton").classList.toggle("ovwHide");
    document.getElementById("overviewDiv").classList.toggle("hide");
    //$('#overviewDiv').addClass("hide");

    function configIconos() {
      Metro.makePlugin(".esri-home", "hint", {
          hintText: "Vista de mapa predeterminada",
          hintPosition: "left",
          clsHint: "custom-hint"
      });
      Metro.makePlugin(".esri-fullscreen", "hint", {
          hintText: "Activar pantalla completa",
          hintPosition: "left",
          clsHint: "custom-hint"
      });
      Metro.makePlugin($(".esri-icon-plus").parent(), "hint", {
          hintText: "Acercar",
          hintPosition: "left",
          clsHint: "custom-hint"
      });
      Metro.makePlugin($(".esri-icon-minus").parent(), "hint", {
          hintText: "Alejar",
          hintPosition: "left",
          clsHint: "custom-hint"
      });
      Metro.makePlugin($(".btnMapaBaseGallery").parent(), "hint", {
          hintText: "Mapa base",
          hintPosition: "left",
          clsHint: "custom-hint"
      });
      Metro.makePlugin(".esri-compass", "hint", {
          hintText: "Restablecer orientación de brújula",
          hintPosition: "left",
          clsHint: "custom-hint"
      });
      Metro.makePlugin($(".esri-icon-printer").parent(), "hint", {
          hintText: "Imprimir",
          hintPosition: "left",
          clsHint: "custom-hint"
      });
      Metro.makePlugin($(".esri-icon-measure-line").parent(), "hint", {
          hintText: "Dibujar",
          hintPosition: "left",
          clsHint: "custom-hint"
      });
      Metro.makePlugin($(".mif-comment").parent(), "hint", {
          hintText: "Enviar Comentarios",
          hintPosition: "left",
          clsHint: "custom-hint"
      });
      Metro.makePlugin($(".mif-file-upload").parent(), "hint", {
          hintText: "Subir Capas",
          hintPosition: "left",
          clsHint: "custom-hint"
      });
      Metro.makePlugin($(".mif-download").parent(), "hint", {
          hintText: "Descargar Capas",
          hintPosition: "left",
          clsHint: "custom-hint"
      });
      Metro.makePlugin($(".esri-icon-locate").parent(), "hint", {
          hintText: "Mi ubicación",
          hintPosition: "left",
          clsHint: "custom-hint"
      })
    }
    
    
      
});

function closeLayerContainer() {
  var charms = Metro.getPlugin('#layerInfo', 'charms');
  charms.close();
  $('.btnclosebtn').hide(); 
}

function openLayerContainer(e) {
  $('#sb1').addClass("open");
  $('.btnEPanelCapas').hide();
  return null;
}
