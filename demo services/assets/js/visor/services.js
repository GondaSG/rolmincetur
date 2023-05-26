const url_equipo_seccionamiento_Equipos = "https://gisem.osinergmin.gob.pe/serverch/rest/services/TEST_ELEC_DIST/TEST_ELEC_DIST/MapServer/0";
const url_equipo_seccionamiento_Tramo = "https://gisem.osinergmin.gob.pe/serverch/rest/services/TEST_ELEC_DIST/TEST_ELEC_DIST/MapServer/1";
const url_equipo_seccionamiento_SubEstacion = "https://gisem.osinergmin.gob.pe/serverch/rest/services/TEST_ELEC_DIST/TEST_ELEC_DIST/MapServer/2";
const url_equipo_seccionamiento_Tramo_simbologia = "https://gisem.osinergmin.gob.pe/serverch/rest/services/TEST_ELEC_DIST/TEST_ELEC_DIST/MapServer/3";
const url_equipo_seccionamiento_SubEstacion_simbologia = "https://gisem.osinergmin.gob.pe/serverch/rest/services/TEST_ELEC_DIST/TEST_ELEC_DIST/MapServer/4";
const url_equipo_seccionamiento_equipos_simbologia = "https://gisem.osinergmin.gob.pe/serverch/rest/services/TEST_ELEC_DIST/TEST_ELEC_DIST/MapServer/5";
const url_equipo_seccionamiento_tramos_bt = "https://gisem.osinergmin.gob.pe/serverch/rest/services/TEST_ELEC_DIST/TEST_ELEC_DIST/MapServer/6";
const url_equipo_seccionamiento_suministros = "https://gisem.osinergmin.gob.pe/serverch/rest/services/TEST_ELEC_DIST/TEST_ELEC_DIST/MapServer/7";
define([
    "esri/layers/FeatureLayer",
    "esri/config",
    "esri/PopupTemplate"
], (
    FeatureLayer,
    esriConfig,
    PopupTemplate
) => {
    esriConfig.request.interceptors.push({
        urls: /FeatureServer\/\d+$/,
        after: function(response) {
            response.data.supportedQueryFormats = "JSON";
        }
    })

    //esriConfig.request.proxyUrl = "https://gisem.osinergmin.gob.pe/proxy_esri_corsgral/proxy.ashx"; //oficial
    var _equipo_secc_equipo = new FeatureLayer({
        url: url_equipo_seccionamiento_Equipos,
        title: "SECCIONADORES"
    });
    var _equipo_secc_tramo = new FeatureLayer({
        url: url_equipo_seccionamiento_Tramo,
        title: "TRAMO MT"
    });
    var _equipo_secc_subEstacion = new FeatureLayer({
        url: url_equipo_seccionamiento_SubEstacion,
        listMode: "hide"
    });

    var _equipo_secc_equipo_symbol = new FeatureLayer({
        url: url_equipo_seccionamiento_equipos_simbologia,
        visible: false,
        definitionExpression: "COD = 0",
        title: "SECCIONADORES AFECTADOS"
    });
    var _equipo_secc_tramo_symbol = new FeatureLayer({
        url: url_equipo_seccionamiento_Tramo_simbologia,
        visible: false,
        definitionExpression: "COD = 0",
        title: "TRAMO MT AFECTADOS"
    });
    var _equipo_secc_subEstacion_symbol = new FeatureLayer({
        url: url_equipo_seccionamiento_SubEstacion_simbologia,
        visible: false,
        definitionExpression: "COD = 0",
        title: "SUBESTACION AFECTADA"
    });
    var _equipo_secc_tramos = new FeatureLayer({
        url: url_equipo_seccionamiento_tramos_bt,
        visible: false,
        definitionExpression: "1 = 0",
        title: "TRAMO BT"
    });
    var _equipo_secc_suministros = new FeatureLayer({
        url: url_equipo_seccionamiento_suministros,
        visible: false,
        definitionExpression: "1 = 0",
        title: "SUMINISTROS"
    });
    /*__globspace.infolayers = [{
        alias: '__equipo_secc',
        containerlyl: 'lyl_equipo_secc',
        aux_alias: 'equipo_secc',
        layers: [],
    }]*/
    return {
        getLayerEquipo: function() { return _equipo_secc_equipo },
        getUrlEquipo: function() { return url_equipo_seccionamiento_Equipos },
        getLayerTramo: function() { return _equipo_secc_tramo },
        getUrlTramo: function() { return url_equipo_seccionamiento_Tramo },
        getLayerSubEstacion: function() { return _equipo_secc_subEstacion },
        getUrlSubEstacion: function() { return url_equipo_seccionamiento_SubEstacion },

        getUrlTramoSimbologia: function() { return url_equipo_seccionamiento_Tramo_simbologia },
        getUrlSubEstacionSimbolia: function() { return url_equipo_seccionamiento_SubEstacion_simbologia },
        getUrlEquipoSimbologia: function() { return url_equipo_seccionamiento_equipos_simbologia },
        getLayerEquipoSymbol: function() { return _equipo_secc_equipo_symbol },
        getLayerTramoSymbol: function() { return _equipo_secc_tramo_symbol },
        getLayerSubEstacionSymbol: function() { return _equipo_secc_subEstacion_symbol },
        getLayerTramosBT: function() { return _equipo_secc_tramos },
        getLayerSuministros: function() { return _equipo_secc_suministros },
    }
});