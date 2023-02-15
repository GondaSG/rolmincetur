//var url_service = "http://190.41.94.92:6080/arcgis/rest/services/celsat/SrvInterrupNew/MapServer";
var url_service2 = "https://gisem.osinergmin.gob.pe/arcgis/rest/services/VNR2016_INTERRUPCIONES/MapServer";
//var url_service = "https://gisem.osinergmin.gob.pe/serverdc/rest/services/Electricidad/VNR2016_INTERRUPCIONES/MapServer";
var url_service =  "https://gisem.osinergmin.gob.pe/serverch/rest/services/Electricidad/Interrupciones/MapServer";

var url_service3 = "https://gisem.osinergmin.gob.pe/serverch/rest/services/Electricidad/Interrupciones/MapServer/16";
var map;
var printTask, params;
var navToolbar, toolbar;

dojo.require("esri.toolbars.navigation");
dojo.require("esri.toolbars.draw");

dojo.require("esri.tasks.PrintTask");
dojo.require("esri.tasks.PrintTemplate");
dojo.require("esri.tasks.PrintParameters");
dojo.require("esri.request");

var swExtend = false;
var isMeasureLine = false;
var isLegend = false;
var toolbar, lengthParams, areaParams;
var swIdentify = false;
var tabActivado = 4;
var symbolo;
var rendererSymbolo;
var stre_view = 0;
var pLat;
var pLon;

var cod_Empresa;
var cod_Sistema;
var cod_Alimentador;
var cod_SED;
var cod_SET;

var app = {};

var printTask, params;


//var layerList;

function cursor(obj) {
    switch (obj.id) {
        case 'zoomin':
            map.setMapCursor("wait");
            break;
        case 'zoomout':
            map.setMapCursor("wait");
            break;
        case 'pan':
            map.setMapCursor("wait");
            break;
        case 'identidad':
            map.setMapCursor("hand");
            break;
        case 'clear':
            map.setMapCursor("default");
            break;
        case 'measure':
            map.setMapCursor("wait");
            break;
        case 'measure_area':
            map.setMapCursor("wait");
            break;
    }
}

require([
    "esri/map",
    "esri/InfoTemplate",
	"esri/dijit/Legend",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane",
    "dijit/TitlePane",
    "esri/layers/ImageParameters",
    "dojo/domReady!",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/dijit/Popup",
    "esri/Color",
    "dojo/dom-construct",
    "esri/dijit/Search",
    "esri/dijit/OverviewMap",
    "esri/tasks/IdentifyTask",
    "esri/tasks/IdentifyParameters",
    "dojo/_base/array",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/renderers/SimpleRenderer",
    "esri/geometry/webMercatorUtils",
    "dojo/dom",
    "esri/dijit/Measurement",
    "esri/config",
    "dojo/query",
    "esri/arcgis/utils",
    "esri/dijit/LayerList",
    "esri/dijit/BasemapGallery",

], function (
    Map,
    InfoTemplate,
	Legend,
    ArcGISDynamicMapServiceLayer,
    BorderContainer,
    ContentPane,
    TitlePane,
    ImageParameters,
    domReady,
    SimpleFillSymbol,
    SimpleLineSymbol,
    Popup,
    Color,
    domConstruct,
    Search,
    OverviewMap,
    IdentifyTask,
    IdentifyParameters,
    arrayUtils,
    SimpleMarkerSymbol,
    SimpleRenderer,
    webMercatorUtils,
    dom,
    Measurement,
    esriConfig,
    query,
    arcgisUtils,
    LayerList
    //ArcGISDynamicMapServiceLayer1, dom1, on1, query1, arrayUtils1
    //arcgisUtils,
    //LayerList
) {

    esriConfig.defaults.io.proxyUrl = "/proxy/";
    esriConfig.defaults.io.alwaysUseProxy = false;



    var identifyTask, identifyParams;


    function mapReady() {
        map.on("click", executeIdentifyTask);
        map.on("mouse-move", showCoordinates);
        map.on("mouse-drag", showCoordinates);
    }

    symbolo = new SimpleMarkerSymbol( SimpleMarkerSymbol.STYLE_CIRCLE, 24, new SimpleLineSymbol(SimpleLineSymbol.STYLE_NULL, new Color([247, 34, 101, 0.9]), 1 ),
        new Color([207, 34, 171, 0.5])
    );

    rendererSymbolo = new SimpleRenderer(symbolo);

    function showCoordinates(evt) {
        //the map is in web mercator but display coordinates in geographic (lat, long)
        var mp = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
        //display mouse coordinates
        pLon = mp.x.toFixed(3);
        pLat = mp.y.toFixed(3);
        dom.byId("info").innerHTML = mp.y.toFixed(3) + ", " + mp.x.toFixed(3);
    }



    function executeIdentifyTask(event) {
		debugger;
		//if(true){
        if (swIdentify && isMeasureLine == false) {
            if (stre_view == 0 && swIdentify == true) {
                var pIDSED = '';
                var ancho = 350;
                var alto = 400;
                var pIDSET = '';
                identifyTask = new IdentifyTask(url_service);

                identifyParams = new IdentifyParameters();
                identifyParams.tolerance = 3; //2.5;
                //identifyParams.returnGeometry = true;
                identifyParams.layerIds = [1, 2, 4, 5, 6, 7,16]; //[tabActivado];
                identifyParams.layerOption = "top"; // IdentifyParameters.LAYER_OPTION_ALL;
                identifyParams.width = map.width;
                identifyParams.height = map.height;
                identifyParams.geometry = event.mapPoint;
                identifyParams.mapExtent = map.extent;

                var deferred = identifyTask.execute(identifyParams).addCallback(function (response) {
                    return arrayUtils.map(response, function(result) {
                        var feature = result.feature;
                        var layerName = result.layerName;
                        //dom.byId("map").style.cursor = "wait";
                        feature.attributes.layerName = layerName;
						console.log(layerName);
                        if (layerName === 'Empresas') {
                            var texEmpresa = new InfoTemplate('Empresa', '${NOM_EMP} <br/> km: ${redes_totales_km}<br/><button class="button drop-shadow mini" onclick="MostrarEstadisticoEmpresa(\'${EMPRESA}\', \'${EMPRESA}\', \'${NOM_EMP}\')">Ver estadísticos</button>');
                            feature.setInfoTemplate(texEmpresa);
                        } else
                        if (layerName === 'Sistemas_Electricos') {
                            //console.log(feature.attributes.PARCELID);
                            var textSisElec = new InfoTemplate('Sistema Eléctrico', '${SISTEMA ELÉCTRICO}<br>Código: ${COD. SISTEMA} <br/><button class="button drop-shadow mini" onclick="MostrarEstadisticoSistemaElectrico(\'${COD. SISTEMA}\', \'' + p_id_emp + '\')">Ver estadísticos</button>');
                            feature.setInfoTemplate(textSisElec);
                        } else
                        if (layerName === 'Alimentadores') {
                            var textAlimentador = new InfoTemplate('Alimentador', 'EMPRESA: ${EMPRESA} <br/> Sistema Eléctrico: ${SISTEMA ELÉCTRICO} <br/> Alimentador: ${ALIMENTADOR} <br/><button class="button drop-shadow mini" onclick="MostrarEstadisticoAlimentador(\'${ALIMENTADOR}\', \'${COD. SISTEMA}\')">Ver estadísticos</button>');
                            feature.setInfoTemplate(textAlimentador);
                        } else
                        if (layerName === 'Subestacion_Distribucion') {
                            //if (feature.attributes.CODIGO.length > 1 && pIDSED.length == 0) {
                            pIDSED = feature.attributes.CODIGO;
                            var textAlimentador = new InfoTemplate('Subestación Distribución', 'Código Alimentador: <span id="infoSED-codAlim"></span><br/>Código SED: <span id="infoSED-codSED"></span><br/>N° Usuarios: <span id="infoSED-numUsu"></span><br/><div id="infoSED-sumiMCT"></div><br/><a id="infoSED-VerMas" href="#" onclick="$(\'#infoSED-sumiColec\').toggle();">Ver más [+]</a><div id="infoSED-sumiColec" style="display:none"></div>');
                            feature.setInfoTemplate(textAlimentador);
                            cargarSED(pIDSED);
                            //}
                        } else
                        if (layerName === 'Subestacion_Transmision') {
                            //if (feature.attributes.CODIGO.length > 1 && pIDSET.length == 0) {
                            // pIDSET = feature.attributes.CODIGO;
                            var textAlimentador = new InfoTemplate('Subestación Transmisión', 'Empresa: <span id="infoSET-Empresa">${EMPRESA}</span><br/>Código SET: <span id="infoSET-codSET">${CÓDIGO}</span><br/>Nombre SET: <span id="infoSET-NomSET">${NOMBRE}</span><br /><br/><div id="infoSET-cel-equipo"></div>');
                            feature.setInfoTemplate(textAlimentador);
                            cargarSET(feature.attributes.EMPRESA, feature.attributes.CÓDIGO);
                            ancho = 550;
                            //}
                        } else
                        if (layerName === 'Suministros') {
                            //if (feature.attributes.CODIGO.length > 1 && pIDSET.length == 0) {
                            // pIDSET = feature.attributes.CODIGO;
                            var textSuministro = new InfoTemplate('Suministro', 'Empresa: <span id="infoSET-Empresa">${EMPRESA}</span><br/>Sistema Eléctrico: <span id="infoSE">${Sist_Elect}</span><br/>Nombre: <span id="infoNombre">${identifica}</span>');
                            feature.setInfoTemplate(textSuministro);
                            //cargarSET(pIDSET);
                            //}
                        } else
                        if (layerName === 'Deficiencias') {
                            //if (feature.attributes.CODIGO.length > 1 && pIDSET.length == 0) {
                            // pIDSET = feature.attributes.CODIGO;
                            var textSuministro = new InfoTemplate('Deficiencias', 'Código Empresa: <span id="infoSE">${COD_EMPRES}</span><br/>Código identificación: <span id="infoNombre">${CO_DEFIC_X}</span><br/>Código tipo de instalación: <span id="infoNombre">${NU_INSTAL}</span><br/>Código iden. de instalación: <span id="infoNombre">${CO_INSTAL}</span><br/>Código tipificación: <span id="infoNombre">${CO_TIPIF_D}</span><br/>Responsable del incuplimiento: <span id="infoNombre">${CO_RES_INC}</span><br/>Fecha inspección: <span id="infoNombre">${FE_INSPECC}</span><br/>Fecha subsanación: <span id="infoNombre">${FE_SUBS_PR}</span><br/>Estado subsanación: <span id="infoNombre">${ES_SUBS}</span>');
                            feature.setInfoTemplate(textSuministro);
                            //cargarSET(pIDSET);
                            //}
                        }
                        return feature;
                    });
                });
                map.infoWindow.setFeatures([deferred]);
                map.infoWindow.show(event.mapPoint);
                map.infoWindow.resize(ancho, alto);
            } else {
                if (stre_view === 1) {
                    $('#ventanastreView').html('<iframe src="View.html?Lat=' + pLat + '&Lon=' + pLon + '" style="width:100%; height:36.5rem; border:0;"></iframe>');
                }
            }
        }
    }

    var url = url_service + "?f=pjson";
    $.getJSON(url, function (data) {
        var extent = new esri.geometry.Extent(-81.328230, -18.350928, -68.652279, -0.038606, new esri.SpatialReference({ wkid: 4326 })).expand(1.2);

        var popup = new Popup(
            {
                fillSymbol: new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 0]), 2), new Color([255, 255, 0, 0.25]))
            }, domConstruct.create("div"));

        map = new Map("map", {
            basemap: "topo",
            center: [-76.0, -11.0], // long, lat 
            zoom: 6,
            sliderStyle: "small",
        });


        map.on("load", mapReady);



        //var layerList = new LayerList({
        //    map: map,
        //    //showLegend: true,
        //    //showSubLayers: false,
        //    //showOpacitySlider: true,
        //    layers: []
        //}, "legendDiv");
        //layerList.startup();




        /**
         * regla
         */
        var measurement = new Measurement({
            map: map
        }, dom.byId("measurementDiv"));
        measurement.startup();
        /*** fin de regla***/

        var search = new Search({ map: map}, "search");
        search.startup();

        var overviewMapDijit = new OverviewMap({ map: map, visible: false });
        overviewMapDijit.startup();

        navToolbar = new esri.toolbars.Navigation(map);
        dojo.connect(navToolbar, "onExtentHistoryChange", extentHistoryChangeHandler);
        dojo.connect(map, "onExtentChange", Extend);

        toolbar = new esri.toolbars.Draw(map);

        cargarServicio();
		legendaOn();
		legendaPoint();
		
        var mapGMapSat = new esri.dijit.Basemap({
            layers: [new esri.dijit.BasemapLayer({
                type: "WebTiledLayer",
                url: "https://mts1.google.com/vt/lyrs=s@186112443&hl=x-local&src=app&x={col}&y={row}&z={level}&s=Galile",
                copyright: "Google Maps"
            })],
            id: "gmapsat",
            thumbnailUrl: "https://maps.ngdc.noaa.gov/viewers/dijits/agsjs/xbuild/agsjs/dijit/images/googlehybrid.png",
            title: "Google Imagery"
        });

        //arcgisUtils.createMap(url_service, "map").then(function (response) {
        //    var myWidget = new LayerList({
        //        map: response.map,
        //        layers: arcgisUtils.getLayerList(response)
        //    }, "layerList");
        //    myWidget.startup();
        //});

        //var layerList = new LayerList({
        //    map: map,
        //    showLegend: true,
        //    showSubLayers: false,
        //    showOpacitySlider: true,
        //    layers: [0,1,2,3,4,5,6,7]
        //}, "layerList");

        //layerList.startup();

        var basemapGallery = new esri.dijit.BasemapGallery({ showArcGISBasemaps: true, map: map }, "basemapGallery");

        basemapGallery.add(mapGMapSat);
        basemapGallery.startup();

        basemapGallery.on("error", function (msg) { console.log("Error gelería mapa base:  ", msg); });
		
		//var legend = new Legend({
        //    map: map
        //}, "legendDiv");
        //legend.startup();
    });


    $('#layer0CheckBox').change(function () { updateLayerVisibility(capaG.Emp, this); });
    $('#layer1CheckBox').change(function () { updateLayerVisibility(capaG.SisEle, this); });
    $('#layer2CheckBox').change(function () { updateLayerVisibility(capaG.Ali, this); });
    $('#layer3CheckBox').change(function () { updateLayerVisibility(capaG.SubDis, this); });
    $('#layer4CheckBox').change(function () { updateLayerVisibility(capaG.SubTra, this); });
    $('#layer5CheckBox').change(function () { updateLayerVisibility(capaG.Sum, this); });
    ////on(dom.byId("layer0CheckBox"), "change", updateLayerVisibility);
    ////on(dom.byId("layer1CheckBox"), "change", updateLayerVisibility);
    

    function updateLayerVisibility(Tipocapa, check) {
        var imageParameters = new ImageParameters();
        imageParameters.layerIds = [6];
        imageParameters.layerOption = ImageParameters.LAYER_OPTION_SHOW;

        var dynamicLayerG = new esri.layers.ArcGISDynamicMapServiceLayer(url_serviceG, {"imageParameters": imageParameters});

        map.addLayer(dynamicLayerG);
        var visibleLayerIds = [];
        visibleLayerIds = [6];
        //alert(document.getElementById('layer2CheckBox').checked);
        if (document.getElementById('layer0CheckBox').checked) {
            visibleLayerIds.push(capaG.Emp);
        }
        if (document.getElementById('layer1CheckBox').checked) {
            visibleLayerIds.push(capaG.SisEle);
        }
        if (document.getElementById('layer2CheckBox').checked) {
            visibleLayerIds.push(capaG.Ali);
        }
        if (document.getElementById('layer3CheckBox').checked) {
            visibleLayerIds.push(capaG.SubDis);
        }
        if (document.getElementById('layer4CheckBox').checked) {
            visibleLayerIds.push(capaG.SubTra);
        }
        if (document.getElementById('layer5CheckBox').checked) {
            visibleLayerIds.push(capaG.Sum);
        }
        if (visibleLayerIds.length === 0) {
            visibleLayerIds.push(-1);
        }
		visibleLayerIds.push(capa.Defi);
        dynamicLayerG.setVisibleLayers(visibleLayerIds);

        //dynamicLayerG.setVisibleLayers([Tipocapa]);
        //var layerDefinitionsG = [];
        ////if (cod_Empresa != "") {
        ////    layerDefinitions[Tipocapa] = "EMPRESA='" + cod_Empresa + "'"; //4
        ////}
        //dynamicLayerG.setLayerDefinitions(layerDefinitionsG);
        //map.addLayers([dynamicLayerG]);
    }
});


var capaG = {
    SubTra: 0,
    SubDis: 1,
    SubDisM: 2,
    Ali: 3,
    SisEle: 4,
    Emp: 5,
    Sum: 6,
    SumM: 7,
}

var capa = {
    SubTra: 1,
    SubDis: 2,
    SubDisM: 3,
    Ali: 4,
    SisEle: 5,
    Emp: 6,
    Sum: 7,
    SumM: 8,
	Defi: 16,
}
var capaElectricidad = {
    Deficiencias: 0
}

function cargarListaCapa() {
    ////if (layerList != undefined) {
    ////    layerList.destroy();
    ////} 
    //    layerList = new esri.dijit.LayerList({
    //        map: map,
    //        //showLegend: true,
    //        //showSubLayers: false,
    //        //showOpacitySlider: true,
    //        layers: []
    //    }, "legendDiv");
    //    layerList.startup();

}


function Imprimir() {
    var printTask = new esri.tasks.PrintTask("http://gisem.osinergmin.gob.pe//arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task");
    var params = new esri.tasks.PrintParameters();
    var template = new esri.tasks.PrintTemplate();

    params.map = map;
    template.exportOptions = {
        width: 3300,
        height: 2550,
        dpi: 300
    };
    template.format = "pdf";   
    template.layout = "A3 Landscape";
    template.preserveScale = false;

    template.layoutOptions = {
        "authorText": "Osinergmin",
        "copyrightText": "Copyright © 2018",
        "legendLayers": [],
        "titleText": "Visor de Interrupciones",
        "scalebarUnit": "Kilometers"
    };

    params.template = template;

    $("#loadingPrint").show();
    $("#btnImprimir").prop('disabled', true);
    //printTask.execute(params, printResult, printError);
    setTimeout(function () { printTask.execute(params, printResult, printError); }, 2500);
}

function printResult(result){
   // alert(result.url);
    window.open(result.url);
    $("#loadingPrint").hide();
    $("#btnImprimir").prop('disabled', false);
}
function printError(result){
    showMensaje("Error de servicio ArcGIS, porfavor elija Google Map o OpenStreetMap");
    console.log(result);
    $("#loadingPrint").hide();
    $("#btnImprimir").prop('disabled', false);
}


function extentHistoryChangeHandler() {
    //dijit.byId("zoomprev").disabled = navToolbar.isFirstExtent();
    //dijit.byId("zoomnext").disabled = navToolbar.isLastExtent();
}

function Extend(extent) {
    if (!swExtend) {
        xMin = -94.7015998444392;
        yMin = -20.26654382435;
        xMax = -55.276;
        yMax = 2.875;
        swExtend = true;
    }
}

function zoomExtend() {
    location.reload();
    //var extent = new esri.geometry.Extent(-81.328230, -18.350928, -68.652279, -0.038606, new esri.SpatialReference({ wkid: 4326 })).expand(1.2);
    //map.setExtent(extent)
    //swIdentify = false;
}

function clearAll() {
    closeDialog();
    //cargarServicio();
    map.infoWindow.hide();
    map.graphics.clear();
    swIdentify = false;
    swBuffer = false;
    isMeasureLine = false;
}

function identify() {
    swIdentify = true;
    $('#map_container').css('cursor','pointer');
}

function MaximizarCapa() {
    $('#map_container').css('cursor', 'crosshair');
}
function MinimizarCapa() {
    $('#map_container').css('cursor', 'default');
}
function MoverCapa() {
    $('#map_container').css('cursor', 'move');
}

function CursorPointer() {
    $('#map_container').css('cursor', 'pointer');
}


function closeDialog() {
    $('#map_container').css('cursor', 'default');
    var tooltip = dijit.byId("tooltip");
	console.log(tooltip);
	console.log($('#map_container'));
    if (tooltip) {
        tooltip.destroy();
    }
}

function measure() {
    isMeasureLine = !isMeasureLine;
    $('#medidaDIV')[0].style.visibility = "";
    if (isMeasureLine) {
        $('#medidaDIV').offset({ top: 70, right: 20 });
    } else {
        $('#medidaDIV').offset({ top: -500, right: -500 });
    }
}

function legendaOn() {
    $('#leyendid')[0].style.visibility = "";
    if (isLegend) {
        $('#leyendid').show()
    } else {
        $('#leyendid').hide()
    }
    isLegend = !isLegend;

}

function legendaPoint() {
    
	$.getJSON(url_service3 + "?f=json", data => {
		let renderer = data.drawingInfo.renderer;
		let $divLegend = $("#leyendid");
		let $div = $divLegend.append("<div class='row m-2'></div>");
		$div = $div.find('>div:last');
		//$div.append("<span> "+ layer.title +" </span>");
		renderer.uniqueValueInfos.forEach( data2 => {
				$div.append("<div class='row m-2'><span><img class='image-legend' src=data:"+data2.symbol.contentType+";base64,"+data2.symbol.imageData+"> "+data2.label+"</span></div>");
			});
	});

}
function limpiarCapas() {
    for (var i = 1; i < map.layerIds.length; i++) {
        map.removeLayer(map.getLayer(map.layerIds[i]));
    }
}


var dynamicLayers;
var dynamicLayers2;
var layerDefinitions = [];
function cargarServicio() {
    //limpiarCapas();
    if (map.layerIds.length > 1) {
        map.removeLayer(map.getLayer(map.layerIds[1]));
    }
    var extent = new esri.geometry.Extent(-81.328230, -18.350928, -68.652279, -0.038606, new esri.SpatialReference({ wkid: 4326 })).expand(1.2);
    map.setExtent(extent);
    dynamicLayers = new esri.layers.ArcGISDynamicMapServiceLayer(url_service);
    dynamicLayers.setVisibleLayers([capa.Emp,capa.Defi]);

    dynamicLayers.setLayerDefinitions(layerDefinitions);
    map.addLayers([dynamicLayers]);

    cargarListaCapa();
}
function cargarCapaSE_Empresa(codEmp) {
    limpiarCapas();

    var dynamicLayer = new esri.layers.ArcGISDynamicMapServiceLayer(url_service);
    dynamicLayer.setVisibleLayers([capa.SisEle, capa.SubTra,capa.Defi]); // 3, 0
    var layerDefinitions = [];
    if (codEmp !== "") {
        layerDefinitions[capa.SisEle] = "CODEMP='" + codEmp + "'";
        layerDefinitions[capa.SubTra] = "CODEMP='" + codEmp + "'";
        //layerDefinitions[1] = "CODEMP='" + codEmp + "'";

    }
    dynamicLayer.setLayerDefinitions(layerDefinitions);
    map.addLayers([dynamicLayer]);
    //layerList.refresh();
}



function cargarCapaAlimentador_SE(codSE) {
    limpiarCapas();
    //if (map.layerIds.length > 1) {
    //    map.removeLayer(map.getLayer(map.layerIds[1]));
    //}
    var dynamicLayer = new esri.layers.ArcGISDynamicMapServiceLayer(url_service);
    //dynamicLayer.setVisibleLayers([capa.Ali]); //2
    var layerDefinitions = [];
    //if (codSE !== "") {
    //    layerDefinitions[capa.Ali] = "SISTEMA='" + codSE + "'";
    //}

    if (codSE !== "") {
        //, capa.Sum
        dynamicLayer.setVisibleLayers([capa.Ali, capa.SubTra,capa.Defi]); //2
        layerDefinitions[capa.Ali] = "SISTEMA = '" + codSE + "'";
        //layerDefinitions[capa.Sum] = "Empresa='" + cod_Empresa + "' OR Empresa='" + p_id_emp + "'";
        layerDefinitions[capa.SubTra] = "CODEMP='" + cod_Empresa + "'";
    } else {
        //capa.Sum,
        dynamicLayer.setVisibleLayers([capa.SubTra, capa.SisEle,capa.Defi]); //2
        layerDefinitions[capa.SisEle] = "SISTEMA='" + cod_Sistema + "'";
        //layerDefinitions[capa.Sum] = "Empresa='" + cod_Empresa + "' OR Empresa='" + p_id_emp + "'";
        layerDefinitions[capa.SubTra] = "CODEMP='" + cod_Empresa + "'";
    }
    dynamicLayer.setLayerDefinitions(layerDefinitions);
    map.addLayers([dynamicLayer]);
    //layerList.refresh();
}

function cargarCapaSubDistribucion_Alimentador(codA) {
    //if (map.layerIds.length > 1) {
    //    map.removeLayer(map.getLayer(map.layerIds[1]));
    //}
    var dynamicLayer = new esri.layers.ArcGISDynamicMapServiceLayer(url_service);
    dynamicLayer.setVisibleLayers([capa.SubDis, capa.Ali,capa.Defi]);
    var layerDefinitions = [];
    if (codA !== "") {
        layerDefinitions[1] = "ALIMENTADOR='" + codA + "'";
        //layerDefinitions[1] = "SISTEMA='" + p_cod_se + "'";
    }
    else {
    }
    dynamicLayer.setLayerDefinitions(layerDefinitions);
    map.addLayers([dynamicLayer]);
}


function cargarCapaSubDistribucionMalEstado(Codigos) {
    //if (map.layerIds.length > 1) {
    //    map.removeLayer(map.getLayer(map.layerIds[1]));
    //}
    var dynamicLayer = new esri.layers.ArcGISDynamicMapServiceLayer(url_service);
    dynamicLayer.setVisibleLayers([capa.SubDisM, capa.SubDis,capa.Defi]); //1
    var layerDefinitions = [];
    if (Codigos !== "") {
        layerDefinitions[capa.SubDisM] = Codigos;
        layerDefinitions[capa.SubDis] = "ALIMENTADOR='" + cod_Alimentador + "'";
    }
    dynamicLayer.setLayerDefinitions(layerDefinitions);
    //dynamicLayer.setRenderer(rendererSymbolo);
    map.addLayers([dynamicLayer]);
    //layerList.refresh();
}




/**********************/
function buscarCapaEmpresa(id) {
    cod_Empresa = id;
    cod_Sistema = '';
    var url = url_service + "/" + capa.Emp + "/query?where=EMPRESA='" + id + "'&f=pjson"; //4
    $.getJSON(url, function (data) {
        if (data.features.length > 0) {
            cargarCapaEmpresa(id);
            var polygon = new esri.geometry.Polyline(data.features[0].geometry);
            map.setExtent(polygon.getExtent().expand(1.5));
        }
        else {
            showMensaje("Información de Empresa no está georeferenciada");
        }
    });
}
function cargarCapaEmpresa(codEmp) {
    limpiarCapas();
    var dynamicLayer = new esri.layers.ArcGISDynamicMapServiceLayer(url_service);
    dynamicLayer.setVisibleLayers([capa.Emp,capa.Defi]);
    var layerDefinitions = [];
    if (codEmp != "") {
        //layerDefinitions[capa.SisEle] = "CODEMP='" + codEmp + "'"; //4
        layerDefinitions[capa.Emp] = "EMPRESA='" + codEmp + "'"; //4
    }
    dynamicLayer.setLayerDefinitions(layerDefinitions);
    map.addLayers([dynamicLayer]);
    var url = url_service + "/" + capa.Emp + "/query?where=EMPRESA='" + codEmp + "'&outFields=redes_totales_km&returnGeometry=false&f=pjson";
    $.getJSON(url, function (result) {
        $('#empresa_sel_red').html(redondearValor(result.features[0].attributes.REDES_TOTALES_KM));

    });
}

function buscarCapaSE(id) {
    cod_Sistema = id;

    var url = url_service + "/" + capa.SisEle + "/query?where=SISTEMA='" + id + "'&f=pjson"; //3
    $.getJSON(url, function (data) {
        if (data.features.length > 0) {
            cargarCapaSE(id);
            var polygon = new esri.geometry.Polyline(data.features[0].geometry);
            map.setExtent(polygon.getExtent().expand(1.5));
        }
        else {
            showMensaje("Sistema Electrico no georeferecniado");
        }
    });
}

function buscarCapaSEAlerta(id) {
    var url = url_service + "/" + capa.SisEle + "/query?where=SISTEMA='" + id + "'&f=pjson"; //3
    $.getJSON(url, function (data) {
        if (data.features.length > 0) {
            cargarCapaSE(id);
            var polygon = new esri.geometry.Polyline(data.features[0].geometry);
            map.setExtent(polygon.getExtent().expand(1.5));
        }
        else {
            showMensaje("Sistema Electrico no georeferecniado");
        }
    });
}
function cargarCapaSE(sistema) {
    limpiarCapas();
    //if (map.layerIds.length > 1) {
    //    map.removeLayer(map.getLayer(map.layerIds[1]));
    //}
    var dynamicLayer = new esri.layers.ArcGISDynamicMapServiceLayer(url_service);
    dynamicLayer.setVisibleLayers([capa.SubTra, capa.SisEle,capa.Defi]); //3,0
    var layerDefinitions = [];
    if (cod_Empresa !== "") {
        layerDefinitions[capa.SisEle] = "SISTEMA='" + sistema + "'";
        layerDefinitions[capa.SubTra] = "CODEMP='" + cod_Empresa + "'";
        //layerDefinitions[1] = "CODEMP='" + cod_Empresa + "'";
    }
    dynamicLayer.setLayerDefinitions(layerDefinitions);
    map.addLayers([dynamicLayer]);
    var url = url_service + "/" + capa.SisEle + "/query?where=SISTEMA='" + sistema + "'&outFields=redes_totales_km&returnGeometry=false&f=pjson";
    $.getJSON(url, function (result) {
        $('#sis_electrico_red').html(redondearValor(result.features[0].attributes.REDES_TOTALES_KM));

    });
    //layerList.refresh();
}


function buscarCapaAlimentador(id) {
    cod_Alimentador = id.trim();
    var url = url_service + "/" + capa.Ali + "/query?where=ALIMENTADOR='" + cod_Alimentador + "'&f=pjson"; //
    $.getJSON(url, function (data) {
        
        if (data.features.length > 0) {
            cargarCapaAlimentador(cod_Alimentador);
            var polygon = new esri.geometry.Polyline(data.features[0].geometry);
            map.setExtent(polygon.getExtent().expand(1.5));
        }
        else {
            cargarCapaAlimentador('');
            showMensaje("Alimentador no georeferenciado")
        }
    });
}

function buscarCapaSubDistribucion(id) {
    cod_SED = id;
    var url = url_service + "/" + capa.SubDis + "/query?where=ALIMENTADOR='" + cod_Alimentador + "'&f=pjson"; //
    $.getJSON(url, function (data) {
        if (data.features.length > 0) {
            cargarCapaSubDistribucion_Alimentador(cod_Alimentador);
        }
        else {
            showMensaje("Subestación Distribución no georeferenciado")
        }
    });
}

function buscarCapaSubDistribucionMalEstado(id) {

    var CodSED = "CODSED='" + id.replace(/,/g, "' OR CODSED='") + "'"

    var url = url_service + "/" + capa.SubDisM + "/query?where=" + CodSED + "&f=pjson"; //
    $.getJSON(url, function (data) {
        if (data.features.length > 0) {
            cargarCapaSubDistribucionMalEstado(CodSED);
        }
        else {
            showMensaje("Subestaciones Distribución en mal estado no georeferenciado")
        }
    });
}

function cargarCapaAlimentador(codA) {
    limpiarCapas();
    //if (map.layerIds.length > 1) {
    //    map.removeLayer(map.getLayer(map.layerIds[1]));
    //}
    var dynamicLayer = new esri.layers.ArcGISDynamicMapServiceLayer(url_service);
    
    var layerDefinitions = [];
    if (codA !== "") {
        //, capa.Sum
        dynamicLayer.setVisibleLayers([capa.Ali, capa.SubTra,capa.Defi]); //2
        layerDefinitions[capa.Ali] = "ALIMENTADOR='" + codA + "'";
        //layerDefinitions[capa.Sum] = "Empresa='" + cod_Empresa + "' OR Empresa='" + p_id_emp + "'";
        layerDefinitions[capa.SubTra] = "CODEMP='" + cod_Empresa + "'";
    } else {
        //capa.Sum,
        dynamicLayer.setVisibleLayers([capa.SubTra, capa.SisEle,capa.Defi]); //2
        layerDefinitions[capa.SisEle] = "SISTEMA='" + cod_Sistema + "'";
        //layerDefinitions[capa.Sum] = "Empresa='" + cod_Empresa + "' OR Empresa='" + p_id_emp + "'";
        layerDefinitions[capa.SubTra] = "CODEMP='" + cod_Empresa + "'";
    }
    dynamicLayer.setLayerDefinitions(layerDefinitions);
    map.addLayers([dynamicLayer]);
    var url = url_service + "/" + capa.Ali + "/query?where=ALIMENTADOR='" + codA + "'&outFields=redes_totales_km&returnGeometry=false&f=pjson";
    $.getJSON(url, function (result) {
        if (result.features.length > 0) {
            $('#alimentador_red').html(redondearValor(result.features[0].attributes.REDES_TOTALES_KM));
        }
    });
    //layerList.refresh();
}

function buscarCapaSuministrosMTMalEstado(id) {
    var Cod = "suministro=" + id.replace(/,/g, " OR suministro=") + ""

    var url = url_service + "/" + capa.Sum + "/query?where=" + Cod + "&f=pjson"; //
    $.getJSON(url, function (data) {
        if (data.features != undefined) {
            if (data.features.length > 0) {
                cargarCapaSuministrosMTMalEstado(Cod);
            }
            else {
                showMensaje("Suministros MT en mal estado no georeferenciado")
            }
        }
        else {
            showMensaje("Suministros MT en mal estado no georeferenciado")
        }
    });
}

function cargarCapaSuministrosMTMalEstado(Codigos) {
    var dynamicLayer = new esri.layers.ArcGISDynamicMapServiceLayer(url_service);
    dynamicLayer.setVisibleLayers([capa.SumM, capa.Sum,capa.Defi]); //1
    var layerDefinitions = [];
    if (Codigos !== "") {
        layerDefinitions[capa.SumM] = Codigos;
        layerDefinitions[capa.Sum] = "Empresa='" + cod_Empresa + "' OR Empresa='" + p_id_emp + "'";
    }
    dynamicLayer.setLayerDefinitions(layerDefinitions);
    map.addLayers([dynamicLayer]);
    //layerList.refresh();
}

function showMensaje(pTexto) {
    var toast = Metro.toast.create;
    toast(pTexto, null, 5000, "bg-red fg-white");
}

function ActividadTabs(tab, elem) {
    tabActivado = capa.Emp;
    $('#tabEmpresa').css('border', '0px solid #3d7eff');
    $('#tabSisElectrico').css('border', '0px solid #3d7eff');
    $('#tabAlimentadores').css('border', '0px solid #3d7eff');
    $('#SubDistribucion').css('border', '0px solid #3d7eff');

    $('#tabEmpresa').css('border-bottom', '1px solid #3d7eff');
    $('#tabSisElectrico').css('border-bottom', '1px solid #3d7eff');
    $('#tabAlimentadores').css('border-bottom', '1px solid #3d7eff');
    $('#SubDistribucion').css('border-bottom', '1px solid #3d7eff');

    switch (tab[0].id) {
        case "tabEmpresa":
            tabActivado = capa.Emp;
            $('#tabEmpresa').css('border', '2px solid #3d7eff');
            $('#tabEmpresa').css('background-color', '#0CA9F2;');
            $('#tabEmpresa').css('color', '#FFFFFF;');
            if (p_id_emp_vnr.length > 0) {
                buscarCapaEmpresa(p_id_emp_vnr);
            }
            break;
        case "tabSisElectrico":
            tabActivado = capa.SisEle;
            $('#tabSisElectrico').css('border', '2px solid #3d7eff');
            $('#tabSisElectrico').css('border-bottom-width', '0px');
            if (p_id_emp_vnr.length > 0) {
                if (p_cod_se.length > 0) {
                    buscarCapaSE(p_cod_se);
                } else {
                    cargarCapaSE_Empresa(p_id_emp_vnr);
                }
            }
            break;
        case "tabAlimentadores":
            tabActivado = capa.Ali;
            $('#tabAlimentadores').css('border', '2px solid #3d7eff');
            $('#tabAlimentadores').css('border-bottom-width', '0px');
            if (p_cod_se.length > 0) {
                //if (p_cod_alim != undefined) {
                    if (p_cod_alim.length > 0) {
                        buscarCapaAlimentador(p_cod_alim);
                    } else {
                        cargarCapaAlimentador_SE(p_cod_se);
                }
                //}
            } else {
                cargarCapaAlimentador_SE(p_cod_se);
            }
            break;
        case "SubDistribucion":
            $('#SubDistribucion').css('border', '2px solid #3d7eff');
            $('#SubDistribucion').css('border-bottom-width', '0px');
            tabActivado = capa.SubDis;
            if (p_cod_alim.length > 0) {
                buscarCapaSubDistribucion(p_cod_alim);
            } else {
                cargarCapaSubDistribucion_Alimentador('');
            }
            break;
    }
    return true;
}

function get_loc() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(coordenadas);
    } else {
        mensaje4('No es posible capturar su ubicación, actualiza tu navegador');
    }
}

function coordenadas(position) {
    pLat = position.coords.latitude;
    pLon = position.coords.longitude;
}

function streView() {
    var idPadre = $('#ventanastreView').parent().parent().attr('id');
    if (stre_view == 0) {
        stre_view = 1;
        $('#ventanastreView').html('<iframe src="View.html?Lat=' + pLat + '&Lon=' + pLon + '" style="width:100%; height:36.5rem; border:0;"></iframe>');
        $('#' + idPadre).offset({ top: 80, left: 20 });
        $('#map_container').css('cursor', 'pointer');
    } else {
        stre_view = 0;
        $('#' + idPadre ).offset({ top: -800, left: -800 });
        $('#ventanastreView').html('');
        $('#map_container').css('cursor', 'default');

    }
}
