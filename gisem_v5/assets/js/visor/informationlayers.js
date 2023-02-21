define([
    "assets/js/visor/services.js",
    "assets/js/visor/visor.js",

    "esri/widgets/Legend",
    "esri/widgets/LayerList",
    "esri/layers/GraphicsLayer",

    "esri/core/watchUtils",
    "esri/request",
    "esri/Graphic",
    "esri/PopupTemplate",
    "dojo/dom-construct"
], (
    Services,
    visor,
    Legend,
    LayerList,
    GraphicsLayer,

    watchUtils,
    esriRequest,
    Graphic,
    PopupTemplate,
    domConstruct
) => {
    var __equipo_secc = Services.getLayerSeccionamiento();
    var Map = visor.getMap();
    Map.add(__equipo_secc);

});