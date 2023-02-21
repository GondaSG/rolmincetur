define(["esri/Map",
    "esri/views/MapView",
    "esri/views/SceneView",
    "dojo/domReady!"
], function(
    Map,
    MapView,
    SceneView,
) {
    __globspace = {};

    __globspace.initParams = {
        zoom: 6,
        center: [-72, -11],
        container: "div_view"
    };

    __globspace.map = new Map({
        basemap: "osm"
    });

    __globspace.view = new MapView({
        container: "div_view",
        map: __globspace.map,
        zoom: 6,
        center: [-72, -10],
        popup: {
            dockEnabled: false,
            dockOptions: {
                buttonEnabled: false,
                breakpoint: false
            }
        }
    });
    return {
        getInitParams: function() { return initParams; },
        getMap: function() { return __globspace.map; }
    }
});