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
    "esri/widgets/Zoom",
    "esri/widgets/BasemapGallery"
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
    Zoom,
    BasemapGallery
  ){

    $(document).ready(function(){     
      

      var map = new Map({
        basemap: "osm"
      });
  
      var map3d = new Map({
        basemap : "satellite",
        ground: "world-elevation"
      });
  
      var view = new MapView({
        container: "map",
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

      //const view = new SceneView({
      //  container: "map",
      //  map: map3d,
      //  zoom: 6,
      //  center: [-72,-10]
      //});

      var homeBtn = new Home({
        view: view
      })
      basemapGallery = new Expand({
        expandIcon: "home",  // see https://developers.arcgis.com/calcite-design-system/icons/
        // expandTooltip: "Expand LayerList", // optional, defaults to "Expand" for English locale
        view: view,
        content: new BasemapGallery({
          view: view
        })
      });
            // Add the widget to the top-right corner of the view
      

      // Add the home button to the top left corner of the view
      view.ui.add(homeBtn, "top-right");
      //view.ui.add(zoom, "top-right");
      view.ui.move([ "zoom" ], "top-right");

      view.ui.add(basemapGallery, "top-right");

      

    });
    
    
      
});
