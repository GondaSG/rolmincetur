require(
    [
        "esri/Map",
        "esri/views/MapView"
    ],
    (
        Map,
        MapView
    ) => {

        $(document).ready(function() {
            let map = new Map({
                basemap: "topo-vector"
            });
            let view = new MapView({
                container: "div_map",
                map: map,
                zoom: 5,
                center: [-75, -10]
            });
        });

    });