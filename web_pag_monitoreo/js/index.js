require(
  [
    "esri/Map",
    "esri/views/MapView",
    "esri/identity/IdentityManager",
    "esri/core/urlUtils",
    "esri/layers/FeatureLayer",
    "esri/tasks/QueryTask",
    "esri/tasks/support/Query",
    "esri/core/watchUtils",
    "dojo/_base/array",
    "dojo/domReady!"
  ],
  function(
    Map,
    MapView,
    IdentityManager,
    urlUtils, 
    FeatureLayer,
    QueryTask,
    Query,
    watchUtils,
    array
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

    });
    
    
      
});
