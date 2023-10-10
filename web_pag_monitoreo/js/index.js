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
    LayerList
  ){

    $(document).ready(function(){     
      

      var map = new Map({
        basemap: "osm"
      });
  
      //var map3d = new Map({
      //  basemap : "satellite",
      //  ground: "world-elevation"
      //});
  
      var view = new MapView({
        //container: "map",
        map: map,
        zoom: 6,
        center: [-72,-10],
        popup: {
          dockEnabled: false,
          dockOptions: {
            buttonEnabled: false,
            breakpoint: false
          }
        }
      });

      // Create SceneView with similar extent to MapView
      const sceneView = new SceneView({
        zoom: 6,
        center: [-72,-10],
        map: map
      });

      // Set the activeView to the 2D MapView
      let activeView = view;

      // Create new instance of the Measurement widget
      const measurement = new Measurement();

      //const view = new SceneView({
      //  container: "map",
      //  map: map3d,
      //  zoom: 6,
      //  center: [-72,-10]
      //});

      var _mil_electricidad = new MapImageLayer({
        url: url_electricidad,
        title: 'ELECTRICIDAD',
        aux_alias: 'sectorelectricidad'
      });

      const searchWidget = new Search({
        view: view,
        container: "divTop",
        allPlaceholder: "Buscar en Google Maps",
        placeholder: "Buscar en Google Maps"
      });

      var homeBtn = new Home({
        view: view
      })
      var basemapGallery = new BasemapGallery({
        view: view
      });
      var expBasemapGallery = new Expand({
        expandIcon: "home",  // see https://developers.arcgis.com/calcite-design-system/icons/
        // expandTooltip: "Expand LayerList", // optional, defaults to "Expand" for English locale
        view: view,
        content: basemapGallery,
        group: "top-right",
        expandTooltip: "Mapas Base"
      });

      let locate = new Locate({
        view: view
      });

      var print = new Print({
        view: view,
        templateOptions: {
          title: "Mapa Centro Monitoreo",
          format: "pdf",
          exportOptions: {
            dpi: 300
          },
        },
        printServiceUrl: "https://gisem.osinergmin.gob.pe/serverosih/rest/services/ExportWebMapMEM/GPServer/Export%20Web%20Map"
      });

      var _print = new Expand({
        expandIcon: "print",  // see https://developers.arcgis.com/calcite-design-system/icons/
        view: view,
        content: print,
        expandTooltip: "Imprimir",
        group: "top-right"
      });

      var _medicion = new Expand({
        expandIcon: "legend",  // see https://developers.arcgis.com/calcite-design-system/icons/
        expandIconClass : "esri-icon-measure-line",
        view: view,
        content: document.getElementById("toolbarDiv"),
        group: "top-right",
        expandTooltip: "Medición",
      });

      let compass = new Compass({
        view: view
      });

      // Set-up event handlers for buttons and click events
      //const switchButton = document.getElementById("switch-btn");
      const distanceButton = document.getElementById('distance');
      const areaButton = document.getElementById('area');
      const clearButton = document.getElementById('clear');

      //switchButton.addEventListener("click", () => {
      //  switchView();
      //});
      distanceButton.addEventListener("click", () => {
        distanceMeasurement();
      });
      areaButton.addEventListener("click", () => {
        areaMeasurement();
      });
      clearButton.addEventListener("click", () => {
        clearMeasurements();
      });
      map.add(_mil_electricidad);


      var _lyl_gasnatural = new LayerList({
        view: view,
        container: 'collapseExample',
      });
      // Add the home button to the top left corner of the view
      
      //view.ui.add(zoom, "top-right");
      //view.ui.move(["zoom"], "top-right");

      

      // view.ui.add(searchWidget, "bottom-trailing");

      // Call the loadView() function for the initial view
      loadView();
      //loadWidgets();
      //$("#switch-btn").click(function(){
      //  debugger;
      //  console.log($("#switch-btn"));
      //  switchView();
      //});
      $('#toolbarDiv').removeClass("d-none");
      
      $(document).on('click', '#switch-btn', function () {
        debugger;
        v = $(this).data('value');
        console.log($("#switch-btn"));
        switchView();
      }); 

      function loadWidgets(activeView){
        measurement.view = activeView;
        basemapGallery.view = activeView;
        locate.view = activeView;
        homeBtn.view = activeView;
        print.view = activeView;
        compass.view = activeView;
        activeView.ui.components = [ "attribution" ];
        activeView.ui.add(homeBtn, "top-right");
        //activeView.ui.add(measurement, "top-right");
        activeView.ui.move(["zoom"], "top-right");
        activeView.ui.add([expBasemapGallery, locate, _print, compass, _medicion], "top-right");
        console.log($("#switch-btn"));
        if ($("#switch-btn").length == 0) {
          console.log($('body'));
          //$('body').append($("<button class='esri-component esri-widget--button esri-widget esri-interactive' type='button' id='switch-btn'>"+ (activeView.type.toUpperCase() === "2D"  ? "3D" : "2D") +"</button>"));
        }
        
        activeView.ui.add('switch-btn', "top-right");
        //const switchButton = document.getElementById("switch-btn");
        //switchButton.addEventListener("click", () => {
        //  switchView();
        //});
      }

      // The loadView() function to define the view for the widgets and div
      function loadView() {
        activeView.set({ container: "map" });
        // Add the appropriate measurement UI to the bottom-right when activated
        //activeView.ui.add(measurement, "top-right");
        // Add the legend to the bottom left
        //activeView.ui.add(legend, "bottom-left");
        // Set the views for the widgets
        //measurement.view = activeView;
        //locate.view = activeView;
        loadWidgets(activeView);
        //legend.view = activeView;
      }

      // When the 2D or 3D button is activated, the switchView() function is called
      function switchView() {
        debugger;
        // Clone the viewpoint for the MapView or SceneView
        const viewpoint = activeView.viewpoint.clone();
        // Get the view type, either 2d or 3d
        const type = activeView.type;

        // Clear any measurements that had been drawn
        clearMeasurements();

        // Reset the measurement tools in the div
        activeView.container = null;
        activeView = null;
        // Set the view based on whether it switched to 2D MapView or 3D SceneView
        activeView = type.toUpperCase() === "2D" ? sceneView : view;
        activeView.set({ container: "map", viewpoint: viewpoint });
        loadWidgets(activeView);
        // Add the appropriate measurement UI to the bottom-right when activated
        //activeView.ui.add(measurement, "top-right");
        //activeView.ui.move(["zoom"], "top-right");
        // Add the legend to the bottom left
        //activeView.ui.add(legend, "bottom-left");
        //locate.view = activeView;
        // Set the views for the widgets
        //measurement.view = activeView;
        //legend.view = activeView;
        // Reset the value of the 2D or 3D switching button
        //switchButton.value = type.toUpperCase();
      }

      // Call the appropriate DistanceMeasurement2D or DirectLineMeasurement3D
      function distanceMeasurement() {
        const type = activeView.type;
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

      

    });
    
    
      
});
