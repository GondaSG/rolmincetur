const url_equipo_seccionamiento = "https://gisem.osinergmin.gob.pe/serverch/rest/services/TEST_ELEC_DIST/TEST_ELEC_DIST/MapServer";
define([
    "esri/layers/FeatureLayer",
    "esri/config"
], (
    FeatureLayer,
    esriConfig
) => {
    //esriConfig.request.proxyUrl = "https://gisem.osinergmin.gob.pe/proxy_esri_corsgral/proxy.ashx"; //oficial
    var _equipo_secc = new FeatureLayer({
        url: url_equipo_seccionamiento,
        title: 'Equipo Seccionamiento',
        aux_alias: 'equipo_secc'
    });
    /*__globspace.infolayers = [{
        alias: '__equipo_secc',
        containerlyl: 'lyl_equipo_secc',
        aux_alias: 'equipo_secc',
        layers: [],
    }]*/
    return {
        getLayerSeccionamiento: function() { return _equipo_secc },
        getUrlSeccionamiento: function() { return url_equipo_seccionamiento }
    }
});