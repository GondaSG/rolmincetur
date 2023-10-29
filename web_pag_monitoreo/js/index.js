var url_electricidad = 'https://gisem.osinergmin.gob.pe/serverosih/rest/services/Electricidad/ELECTRICIDAD_TOTAL/MapServer';


require(
  [
    "esri/Map",
    "esri/views/MapView",
    "esri/views/SceneView",
    "esri/identity/IdentityManager",
    "esri/core/urlUtils",
    "esri/layers/FeatureLayer",
    "esri/tasks/QueryTask",
    "esri/tasks/support/Query",
    "esri/core/watchUtils",
    "dojo/_base/array",
    "dojo/domReady!",
    "esri/widgets/Expand",
    "esri/widgets/Home",
    "esri/widgets/BasemapGallery",
    "esri/widgets/Locate",
    "esri/widgets/Search",
    "esri/widgets/Print",
    "esri/widgets/Compass",
    "esri/widgets/Measurement",
    "esri/layers/MapImageLayer",
    "esri/layers/FeatureLayer",
    "esri/layers/GroupLayer",
    "esri/config",
    "esri/widgets/LayerList",
    "esri/widgets/Zoom",
    "esri/layers/KMLLayer",
  ],
  function(
    Map,
    MapView,
    SceneView,
    IdentityManager,
    urlUtils, 
    FeatureLayer,
    QueryTask,
    Query,
    watchUtils,
    array,
    domReady,
    Expand,
    Home,
    BasemapGallery,
    Locate,
    Search,
    Print,
    Compass,
    Measurement,
    MapImageLayer,
    FeatureLayer,
    GroupLayer,
    esriConfig,
    LayerList,
    Zoom,
    KMLLayer
  ){

    $(document).ready(function(){     

      const appConfig = {
        mapView: null,
        sceneView: null,
        activeView: null,
        container: "map" // use same container for views
      };

      const initialViewParams = {
        zoom: 6,
        center: [-72,-10],
        container: appConfig.container
      };

      var map = new Map({
        basemap: "osm"
      });

      // Crea la vista general
      var overviewMap = new Map({
        basemap: "topo-vector"
      });

      var overviewView = new MapView({
        container: "overviewDiv",
        map: overviewMap,
        constraints: {
          snapToZoom: false
        }
      });

      // Remove the default widgets
      overviewView.ui.components = [];

      
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

      // Create new instance of the Measurement widget
      const measurement = new Measurement();      

      var _mil_electricidad = new MapImageLayer({
        url: url_electricidad,
        title: 'ELECTRICIDAD',
        aux_alias: 'sectorelectricidad'
      });

      const searchWidget = new Search({
        view: appConfig.activeView,
        container: "divTop",
        allPlaceholder: "Buscar en Google Maps",
        placeholder: "Buscar en Google Maps"
      });
//
      var homeBtn = new Home({
        view: appConfig.activeView,
      })

      var basemapGallery = new BasemapGallery({
        view: appConfig.activeView,
      });
//
      var expBasemapGallery = new Expand({
        expandIcon: "home",  // see https://developers.arcgis.com/calcite-design-system/icons/
        view: appConfig.activeView,
        content: basemapGallery,
        group: "top-right",
        expandTooltip: "Mapas Base"
      });
//
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
        expandIcon: "legend",  // see https://developers.arcgis.com/calcite-design-system/icons/
        expandIconClass : "esri-icon-measure-line",
        view: appConfig.activeView,
        content: document.getElementById("toolbarDiv"),
        group: "top-right",
        expandTooltip: "Medición",
      });
//
      var _cmo = new Expand({
        expandIconClass : "esri-icon-drag-horizontal",
        view: appConfig.activeView,
        content: document.getElementById("divCMO"),
        group: "top-right",
        expandTooltip: "Formulario CMO",
      });
//
      var _addLayers = new Expand({
        expandIconClass : "esri-icon-plus",
        view: appConfig.activeView,
        content: document.getElementById("widgetAddLayers"),
        group: "top-right",
        expandTooltip: "Añadir Capas",
      });
//
      var _upload = new Expand({
        expandIconClass : "esri-icon-up-arrow-circled",
        view: appConfig.activeView,
        content: document.getElementById("widgetUpload"),
        group: "top-right",
        expandTooltip: "Subir KML",
      });
//
      let compass = new Compass({
        view: appConfig.activeView,
      });
      
      // Set-up event handlers for buttons and click events
      const switchButton = document.getElementById("switch-btn");
      const distanceButton = document.getElementById('distance');
      const areaButton = document.getElementById('area');
      const clearButton = document.getElementById('clear');

      switchButton.addEventListener("click", () => {
        switchView();
      });
      distanceButton.addEventListener("click", () => {
        distanceMeasurement();
      });
      areaButton.addEventListener("click", () => {
        areaMeasurement();
      });
      clearButton.addEventListener("click", () => {
        clearMeasurements();
      });

      // Crea el widget de zoom
      var zoomWidget = new Zoom({
        view: appConfig.activeView
      });

      map.add(_mil_electricidad);

      var _lyl_gasnatural = new LayerList({
        view: appConfig.activeView,
        container: 'collapseExample',
      });

      // Call the loadView() function for the initial view
      loadWidgets(appConfig.activeView);

      $('#toolbarDiv').removeClass("d-none");
      $('#divCMO').removeClass("d-none");
      $('#widgetAddLayers').removeClass("d-none");
      $('#widgetUpload').removeClass("d-none");            

      function loadWidgets(activeView){
        measurement.view = activeView;
        basemapGallery.view = activeView;
        locate.view = activeView;
        homeBtn.view = activeView;
        print.view = activeView;
        compass.view = activeView;
        zoomWidget.view = activeView;
        activeView.ui.add(homeBtn, "top-right");
        if (activeView.type === "3d") {
          activeView.ui.components = [];
          activeView.ui.add(zoomWidget, "top-right");
        }
        else activeView.ui.move(["zoom"], "top-right");
        //activeView.ui.add(measurement, "top-right");
        activeView.ui.add([expBasemapGallery, locate, _print, compass, _medicion, _cmo, _addLayers, _upload], "top-right");
        //activeView.ui.add(overview, "bottom-right");
      }

      // Switches the view from 2D to 3D and vice versa
      function switchView() {
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
          switchButton.innerHTML = "3D";
        } else {
          appConfig.sceneView.viewpoint = activeViewpoint;
          appConfig.sceneView.container = appConfig.container;
          appConfig.activeView = appConfig.sceneView;
          switchButton.innerHTML = "2D";
        }
        loadWidgets(appConfig.activeView);
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
        //let $msgstatus = $("#sp_uploadstatus_kml").html('');          
        let files = event.target.files;
        if(files.length == 1 ){
          let filename = event.target.value.toLowerCase();
          if (filename.indexOf(".kml") !== -1 || filename.indexOf(".kmz") !== -1) { //Si archivo es .kml o .kmz
            let file = files[0];
            addKmlLayer(file);
          } else {
            alert("error");
            //$msgstatus.removeClass('ok').addClass('failed').html('Solo se admite subir un archivo .kml');
          }
        }
      });
  
  
      function addKmlLayer(file){   
        //let $preloader = $('#tabpane_addlayer_kml .preuploader').removeClass('notvisible').addClass('visible');
        //let $placeholder = $('#tabpane_addlayer_kml .drop-zone-placeholder').removeClass('visible').addClass('notvisible');
        //let $infile = $('#tabpane_addlayer_kml .infile').removeClass('visible').addClass('notvisible');
        //let $msgstatus = $("#sp_uploadstatus_kml").removeClass('failed ok').html("<b>Cargando…  </b>" + file.name);
  
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
                    //nuevacapa.load().then(function(){
                    //  __gru_aniadido.visible = true;
                    //  __gru_aniadido.layers.add(nuevacapa);
                    //  if(nuevacapa.extent){
                    //    view.goTo(nuevacapa.extent);
                    //  }
                    //  //handleSuccess($msgstatus, $preloader, $placeholder, $infile, filename);
                    //}, function(error){
                    //  //handleError($msgstatus, $preloader, $placeholder, $infile, 'Error al cargar capa', error);
                    //});                         
  
                  }else{
                    //handleError($msgstatus, $preloader, $placeholder, $infile, 'Error al subir archivo', $.trim(filename));
                  }
                }
            });
        }
      }

    });
    
    
      
});
