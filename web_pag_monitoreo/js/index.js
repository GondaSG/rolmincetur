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
    "esri/widgets/Measurement"
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
    Measurement
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
        content: basemapGallery
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
        content: print
      });

      let compass = new Compass({
        view: view
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

      // Add the home button to the top left corner of the view
      
      //view.ui.add(zoom, "top-right");
      //view.ui.move(["zoom"], "top-right");

      

      // view.ui.add(searchWidget, "bottom-trailing");

      // Call the loadView() function for the initial view
      loadView();
      //loadWidgets();

      function loadWidgets(activeView){
        measurement.view = activeView;
        basemapGallery.view = activeView;
        locate.view = activeView;
        homeBtn.view = activeView;
        print.view = activeView;
        compass.view = activeView;
        activeView.ui.add(homeBtn, "top-right");
        activeView.ui.add(measurement, "top-right");
        activeView.ui.move(["zoom"], "top-right");
        activeView.ui.add([expBasemapGallery, locate, _print, compass], "top-right");
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
        switchButton.value = type.toUpperCase();
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
