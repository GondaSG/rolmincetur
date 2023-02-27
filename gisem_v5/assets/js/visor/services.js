const url_equipo_seccionamiento_Equipos = "https://gisem.osinergmin.gob.pe/serverch/rest/services/TEST_ELEC_DIST/TEST_ELEC_DIST/MapServer/0";
const url_equipo_seccionamiento_Tramo = "https://gisem.osinergmin.gob.pe/serverch/rest/services/TEST_ELEC_DIST/TEST_ELEC_DIST/MapServer/1";
define([
    "esri/layers/FeatureLayer",
    "esri/config"
], (
    FeatureLayer,
    esriConfig
) => {
    //esriConfig.request.proxyUrl = "https://gisem.osinergmin.gob.pe/proxy_esri_corsgral/proxy.ashx"; //oficial
    var _equipo_secc_equipo = new FeatureLayer({
        url: url_equipo_seccionamiento_Equipos
    });
    var _equipo_secc_tramo = new FeatureLayer({
        url: url_equipo_seccionamiento_Tramo
    });
    /*__globspace.infolayers = [{
        alias: '__equipo_secc',
        containerlyl: 'lyl_equipo_secc',
        aux_alias: 'equipo_secc',
        layers: [],
    }]*/
    return {
        getLayerSeccionamientoEquipo: function() { return _equipo_secc_equipo },
        getUrlSeccionamientoEquipo: function() { return url_equipo_seccionamiento_Equipos },
        getLayerSeccionamientoTramo: function() { return _equipo_secc_tramo },
        getUrlSeccionamientoTramo: function() { return url_equipo_seccionamiento_Tramo }
    }
});