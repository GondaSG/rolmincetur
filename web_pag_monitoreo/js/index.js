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
    Compass
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

      const searchWidget = new Search({
        view: view,
        container: "divTop",
        allPlaceholder: "Buscar en Google Maps",
        placeholder: "Buscar en Google Maps"
      });

      var homeBtn = new Home({
        view: view
      })

      var basemapGallery = new Expand({
        expandIcon: "home",  // see https://developers.arcgis.com/calcite-design-system/icons/
        // expandTooltip: "Expand LayerList", // optional, defaults to "Expand" for English locale
        view: view,
        content: new BasemapGallery({
          view: view
        })
      });

      let locate = new Locate({
        view: view
      });

      var _print = new Expand({
        expandIcon: "print",  // see https://developers.arcgis.com/calcite-design-system/icons/
        // expandTooltip: "Expand LayerList", // optional, defaults to "Expand" for English locale
        view: view,
        content: new Print({
          view: view,
          //container: 'container_printmap',
          templateOptions: {
            title: "Mapa Energético Minero",
            format: "pdf",
            exportOptions: {
              dpi: 300
            },
          },
          printServiceUrl: "https://gisem.osinergmin.gob.pe/serverosih/rest/services/ExportWebMapMEM/GPServer/Export%20Web%20Map"
        })
      });

      let compass = new Compass({
        view: view
      });

      //view.ui.components = [ "attribution", "zoom"];
      // Add the home button to the top left corner of the view
      view.ui.add(homeBtn, "top-right");
      //view.ui.add(zoom, "top-right");
      view.ui.move([ "zoom" ], "top-right");

      view.ui.add([basemapGallery, locate, _print, compass], "top-right");

      // view.ui.add(searchWidget, "bottom-trailing");

    });
    
    
      
});
