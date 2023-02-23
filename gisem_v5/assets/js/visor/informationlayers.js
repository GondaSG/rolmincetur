define([
    "assets/js/visor/services.js",
    "assets/js/visor/visor.js",
    "assets/js/visor/query.js",
    "esri/widgets/Legend",
    "esri/widgets/LayerList",
    "esri/layers/GraphicsLayer",
    "esri/widgets/Expand",
    "esri/core/watchUtils",
    "esri/request",
    "esri/Graphic",
    "esri/PopupTemplate",
    "dojo/dom-construct"
], (
    Services,
    visor,
    Queryjs,
    Legend,
    LayerList,
    GraphicsLayer,
    Expand,
    watchUtils,
    esriRequest,
    Graphic,
    PopupTemplate,
    domConstruct
) => {
    var __equipo_secc = Services.getLayerSeccionamiento();
    var Map = visor.getMap();
    var View = visor.getView();
    Map.add(__equipo_secc);
    layerList = new LayerList({
        container: document.createElement("div"),
        view: View
    });
    layerListExpand = new Expand({
        expandIconClass: "esri-icon-layers", // see https://developers.arcgis.com/javascript/latest/guide/esri-icon-font/
        // expandTooltip: "Expand LayerList", // optional, defaults to "Expand" for English locale
        view: View,
        content: layerList
    });
    let legend = new Legend({
        view: View
    });
    legendExpand = new Expand({
        expandIconClass: "esri-icon-layer-list", // see https://developers.arcgis.com/javascript/latest/guide/esri-icon-font/
        // expandTooltip: "Expand LayerList", // optional, defaults to "Expand" for English locale
        view: View,
        content: legend
    });
    View.ui.add(legendExpand, "top-right");
    View.ui.add(layerListExpand, "top-right");

    layerList.when(async() => {
        await Queryjs.getQueryLayerGetEmpresa();
    })
});