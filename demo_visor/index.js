let map, view;
let isOffice = true;
let codeUbigeo = "";
let urlServicePuertos = "https://gisem.osinergmin.gob.pe/validar/puerto/apipuertos/puerto";
//let urlServicePuertos = "http://localhost:27185/puerto";
let puerto;
let puertoxano;
let terminalesxano;
let terminalxanolast;
let terminalxpuerto;
let ano;
const symBlue = {
    type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
    color: "blue",
    outline: { // autocasts as new SimpleLineSymbol()
        color: [74, 33, 255, 0.5],
        width: 5
    }
};
const symRed = {
    type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
    color: "red",
    outline: { // autocasts as new SimpleLineSymbol()
        color: [250, 0, 35, 0.5],
        width: 5
    }
};
require([
    "esri/core/urlUtils",
    "esri/Map",
    "esri/config",
    "esri/views/MapView",
    "esri/WebMap",
    "esri/Graphic",
    "esri/layers/FeatureLayer",
    "esri/tasks/QueryTask",
    "esri/tasks/support/Query",
    "esri/widgets/Expand",
    "esri/widgets/BasemapGallery",
    "esri/widgets/Editor",
    "esri/widgets/Search",
    "esri/widgets/Home",
    "esri/widgets/Legend",
    "esri/widgets/LayerList",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/layers/GraphicsLayer"
], (
    urlUtils,
    Map,
    esriConfig,
    MapView,
    WebMap,
    Graphic,
    FeatureLayer,
    QueryTask,
    Query,
    Expand,
    BasemapGallery,
    Editor,
    Search,
    Home,
    Legend,
    LayerList,
    SimpleMarkerSymbol,
    GraphicsLayer
) => {

    _proxyurl = "http://gisem.osinergmin.gob.pe/proxy_developer/proxy.ashx";
    $(document).ready(async function() {

        var urlPuertos1 = "https://locationservices2.arcgis.com/Sd7lSuz9Mahnylzk/ArcGIS/rest/services/location_tracking/FeatureServer/0?token=kzSwaJcNtXT-juJt7eSTbWb0SOdG8Crsd7CyC882WRQSnfNQoRtCg8zg8txhgsjWMKMSHgCmw_eayjqpQQqZprw6mZcDiLZpmonNACvYIOA55441D9fvUITPEOefLbd-wr0vZa-LNhiKKsYTfQcu2kdFmYmeazQf6LxMTQ8GRNmJ_iE80Lmkk7vY7qVENcEwHMdWpG3Cijp0u4kmwPtJ80lJpArexGJL0S12XLCIOD4Rx88Bsb3vmS6WaQHx64xq";
        var urlPuertos2 = "https://locationservices2.arcgis.com/Sd7lSuz9Mahnylzk/ArcGIS/rest/services/location_tracking/FeatureServer/1?token=kzSwaJcNtXT-juJt7eSTbWb0SOdG8Crsd7CyC882WRQSnfNQoRtCg8zg8txhgsjWMKMSHgCmw_eayjqpQQqZprw6mZcDiLZpmonNACvYIOA55441D9fvUITPEOefLbd-wr0vZa-LNhiKKsYTfQcu2kdFmYmeazQf6LxMTQ8GRNmJ_iE80Lmkk7vY7qVENcEwHMdWpG3Cijp0u4kmwPtJ80lJpArexGJL0S12XLCIOD4Rx88Bsb3vmS6WaQHx64xq";
        var layer1 = {
            url: urlPuertos1,
            title: "Límite Departamental",
            index: 0
        }
        var layer2 = {
            url: urlPuertos2,
            title: "Terminales",
            index: 0
        }

        map = new Map({
            basemap: "osm"
        });

        view = new MapView({
            container: "map",
            map: map,
            center: [-74.049, -8.185],
            zoom: 5
        });

        var homeWidget = new Home({
            view: view
        });

        let layerList = new LayerList({
            view: view
        });
        layerListExpand = new Expand({
            expandIconClass: "esri-icon-layer-list", // see https://developers.arcgis.com/javascript/latest/guide/esri-icon-font/
            // expandTooltip: "Expand LayerList", // optional, defaults to "Expand" for English locale
            view: view,
            content: layerList
        });
        // Adds widget below other elements in the top left corner of the view

        //view.ui.add(homeWidget, "top-left");
        view.ui.add(layerListExpand, "top-left");
        $("#map").css("height", "100%");
        $("#containerBarra").css("height", window.innerHeight - 160 + "px");
        $(".loading").hide();
        var layer_Feature1 = await createFeatureLayer(layer1, "1=1");
        var layer_Feature2 = await createFeatureLayer(layer2, "1=1");
        map.add(layer_Feature1, 0);
        map.add(layer_Feature2, 0);
        //map.add(layer_Feature3, 0);

        function createFeatureLayer(layer, where) {
            let featureLayer = new FeatureLayer({
                url: layer.url,
                title: layer.title,
                outFields: ["*"],
                definitionExpression: where
            });
            return featureLayer;
        }
        
    });
});