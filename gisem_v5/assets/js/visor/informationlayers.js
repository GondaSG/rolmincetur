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
    "esri/Basemap",
    "esri/widgets/BasemapGallery",
    "esri/widgets/Search",
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
    Basemap,
    BasemapGallery,
    Search,
    domConstruct
) => {
    var _equipo_secc_equipo = Services.getLayerEquipo();
    var _equipo_secc_tramo = Services.getLayerTramo();

    var _equipo_secc_equipo_symbol = Services.getLayerEquipoSymbol();
    var _equipo_secc_tramo_symbol = Services.getLayerTramoSymbol();
    var _equipo_secc_Subestacion_symbol = Services.getLayerSubEstacionSymbol();
    var Map = visor.getMap();
    var View = visor.getView();
    Map.addMany([_equipo_secc_equipo, _equipo_secc_tramo, _equipo_secc_equipo_symbol, _equipo_secc_tramo_symbol, _equipo_secc_Subestacion_symbol]);
    layerList = new LayerList({
        container: document.createElement("div"),
        view: View
    });
    const customBasemap = new Basemap({
        portalItem: {
            id: "46a87c20f09e4fc48fa3c38081e0cae6"
        }
    })
    const basemapGallery = new BasemapGallery({
        view: View,
        source: [Basemap.fromId("topo-vector"), Basemap.fromId("hybrid"), customBasemap] // autocasts to LocalBasemapsSource
    });
    layerListExpand = new Expand({
        expandIconClass: "esri-icon-layers", // see https://developers.arcgis.com/javascript/latest/guide/esri-icon-font/
        // expandTooltip: "Expand LayerList", // optional, defaults to "Expand" for English locale
        view: View,
        content: layerList
    });
    const searchWidget = new Search({
        view: View
    });
    baseMapExpand = new Expand({
        expandIconClass: "esri-icon-basemap", // see https://developers.arcgis.com/javascript/latest/guide/esri-icon-font/
        // expandTooltip: "Expand LayerList", // optional, defaults to "Expand" for English locale
        view: View,
        content: basemapGallery
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
    View.ui.add(searchWidget, {
        position: "top-right"
    });
    View.ui.add(legendExpand, "top-right");
    View.ui.add(layerListExpand, "top-right");
    View.ui.add(baseMapExpand, "top-right");

    layerList.when(async() => {
        await Queryjs.getQueryLayerGetEmpresa();
        await Queryjs.getQueryLayerSeccionamientCount();
        await Queryjs.getQueryLayerSubEstacionCount();

    })
    Map.on("update-end", function(layer) {
        $(".loading").hide()
    });
});