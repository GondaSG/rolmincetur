define([
    "esri/layers/MapImageLayer",
    "esri/layers/FeatureLayer",
    "esri/layers/GroupLayer",
    "esri/core/urlUtils",
    "esri/config",

], function(
    MapImageLayer,
    FeatureLayer,
    GroupLayer,
    urlUtils,
    esriConfig,

) {

    //AUTENTICACIÓN 

    esriConfig.request.proxyUrl = "https://gisem.osinergmin.gob.pe/proxy_esri_corsgral/proxy.ashx";

    //Endpoints de Proxies  
    _proxyurl2 = "https://gisem.osinergmin.gob.pe/proxy_sein/proxy.ashx";


    //Reglas de acceso a Servicios Privados

    urlUtils.addProxyRule({
        urlPrefix: "https://gisem.osinergmin.gob.pe/serverosih/rest/services/Electricidad/MapaSEIN_Administracion", //servicios de admin
        proxyUrl: _proxyurl2
    });


    //Reglas de acceso a Servicios No-cors

    urlUtils.addProxyRule({
        urlPrefix: "https://sigrid.cenepred.gob.pe/arcgis/rest/services",
        proxyUrl: _proxyurl2
    });



    // DEFINICIÓN DE SERVICIOS REST

    // Urls de Fuentes internas 
    var url_operacion = 'https://gisem.osinergmin.gob.pe/serverosih/rest/services/Electricidad/MapaSEIN_Operacion/MapServer';
    var url_operaciones_visual = "https://gisem.osinergmin.gob.pe/serverosih/rest/services/Electricidad/MapaSEIN_Restringido/MapServer"
    var url_operacion_logueo = 'https://gisem.osinergmin.gob.pe/serverosih/rest/services/Electricidad/MapaSEIN_Operacion_Total/MapServer';
    var url_alerta = 'https://gisem.osinergmin.gob.pe/serverosih/rest/services/Electricidad/MapaSEIN_Alerta/MapServer';
    var url_proyectos = 'https://gisem.osinergmin.gob.pe/serverosih/rest/services/Electricidad/MapaSEIN_Proyectadas/MapServer';

    var url_er = 'https://gisem.osinergmin.gob.pe/serverosih/rest/services/Electricidad/MapaSEIN_Eventos/MapServer';
    var url_pi = 'https://gisem.osinergmin.gob.pe/serverosih/rest/services/Electricidad/MapaSEIN_Inversion/MapServer';
    var url_da = 'https://gisem.osinergmin.gob.pe/serverosih/rest/services/Electricidad/MapaSEIN_Descargas/MapServer';
    var url_drone = 'https://gisem.osinergmin.gob.pe/serverosih/rest/services/Electricidad/MapaSEIN_Drone/MapServer';

    var url_pe = 'https://gisem.osinergmin.gob.pe/serverosih/rest/services/Electricidad/MapaSEIN_Calidad/MapServer';
    var url_concesionelectrica = 'https://gisem.osinergmin.gob.pe/serverosih/rest/services/Electricidad/MapaSEIN_Concesiones/MapServer';

    // Urls de Fuentes internas - servicios Detalles 
    var url_tbl_trf = 'https://gisem.osinergmin.gob.pe/serverosih/rest/services/Electricidad/MapaSEIN_Operacion/MapServer/30';

    var url_er_detalle = 'https://gisem.osinergmin.gob.pe/serverosih/rest/services/Electricidad/MapaSEIN_Eventos_Det/MapServer';
    var url_er_detalle_c = `${ url_er_detalle }/2`;
    var url_er_detalle_set = `${ url_er_detalle }/0`;
    var url_er_detalle_lt = `${ url_er_detalle }/1`;

    var url_alert_detalle = 'https://gisem.osinergmin.gob.pe/serverosih/rest/services/Electricidad/MapaSEIN_Alerta_Det/MapServer';
    var url_alert_detalle_ugc = `${url_alert_detalle}/2`;
    var url_alert_detalle_ts = `${url_alert_detalle}/5`;
    var url_alert_detalle_tc = `${url_alert_detalle}/6`;
    var url_alert_detalle_sec = `${url_alert_detalle}/7`;
    var url_alert_detalle_ltc = `${url_alert_detalle}/9`;
    var url_alert_detalle_ltcyr = `${url_alert_detalle}/10`;

    var url_pe_pe = `${ url_pe }/0`;
    var url_pe_contrato = `${ url_pe }/1`;
    var url_pe_interrupcion = `${ url_pe }/2`;
    var url_pe_tension = `${ url_pe }/4`;
    var url_pe_tensiondet = `${ url_pe }/3`;


    // Urls de Cartografia
    var url_depa = "https://gisem.osinergmin.gob.pe/serverosih/rest/services/Cartografia/LIMITE_DEPARTAMENTAL/MapServer/0";
    var url_prov = "https://gisem.osinergmin.gob.pe/serverosih/rest/services/Cartografia/LIMITE_PROVINCIAL/MapServer/0";
    var url_dist = "https://gisem.osinergmin.gob.pe/serverosih/rest/services/Cartografia/LIMITES_DISTRITALES/MapServer/0";

    // Urls de Fuentes externas
    var url_redvial = "https://geocatminapp.ingemmet.gob.pe/arcgis/rest/services/SERV_CARTOGRAFIA_BASE_WGS84/MapServer";
    var url_hidrografia = "https://geocatminapp.ingemmet.gob.pe/arcgis/rest/services/SERV_CARTOGRAFIA_BASE_WGS84/MapServer";
    var url_areaproteg = "https://geoservicios.sernanp.gob.pe/arcgis/rest/services/gestion_de_anp/peru_sernanp_021300/MapServer";
    var url_zonaamortig = "https://geoservicios.sernanp.gob.pe/arcgis/rest/services/gestion_de_anp/peru_sernanp_021401/MapServer";
    var url_zonaarqueolog = "https://geocatminapp.ingemmet.gob.pe/arcgis/rest/services/SERV_AREA_RESERVADA/MapServer";
    var url_concesionminera = "https://geocatminapp.ingemmet.gob.pe/arcgis/rest/services/SERV_CATASTRO_MINERO_WGS84/MapServer";

    var url_cenepred1 = "https://sigrid.cenepred.gob.pe/arcgis/rest/services/Cartografia_Peligros/MapServer";
    var url_cenepred2 = "https://sigrid.cenepred.gob.pe/arcgis/rest/services/Informacion_CENEPRED/MapServer";
    var url_cenepred3 = "https://sigrid.cenepred.gob.pe/arcgis/rest/services/Informacion_Complementaria/MapServer";

    // Urls de administración de Usuarios y Permisos
    var url_admin = 'https://gisem.osinergmin.gob.pe/serverosih/rest/services/Electricidad/MapaSEIN_Administracion/FeatureServer';
    var url_usuario = `${url_admin}/0`;
    var url_rol = `${url_admin}/1`;
    var url_permiso = `${url_admin}/2`;
    var url_componente = `${url_admin}/3`;


    // DEFINICIÓN DE LAYERS

    /** TEMÁTICA INTERNA */

    var __mil_operacion = new MapImageLayer({
        url: url_operacion,
        title: 'Sistemas en Operación',
        aux_alias: 'gruoperacion'
    });

    var __mil_operacion_visual = new MapImageLayer({
        url: url_operaciones_visual,
        title: 'Sistemas en Operación visual',
        aux_alias: 'gruoperacion_visual',

    });

    var __mil_operacion_logueo = new MapImageLayer({
        url: url_operacion_logueo,
        title: 'Sistemas en Operación logueo',
        aux_alias: 'gruoperacion_logueo'
    });

    var __mil_alerta = new MapImageLayer({
        url: url_alerta,
        title: 'Sistemas en Alerta',
        aux_alias: 'grualerta',
        visible: false
    });

    var __mil_proyectos = new MapImageLayer({
        url: url_proyectos,
        title: 'Proyectos',
        aux_alias: 'gruproyectos',
        visible: false
    });


    var __mil_da = new MapImageLayer({
        url: url_da,
        title: 'Descargas Atmosféricas',
        aux_alias: 'gruda',
        visible: false,
    });

    var __mil_pi = new MapImageLayer({
        url: url_pi,
        title: 'Plan de Inversión',
        aux_alias: 'grupi',
        visible: false,
    });

    var __mil_drone = new MapImageLayer({
        url: url_drone,
        title: 'Información gráfica',
        aux_alias: 'grudrone',
        visible: false,
    });

    var __mil_er = new MapImageLayer({
        url: url_er,
        title: 'Eventos Relevantes',
        aux_alias: 'gruer',
        visible: false,
    });

    var __mil_pe = new MapImageLayer({
        url: url_pe,
        title: 'Puntos de entrega - Calidad',
        aux_alias: 'grupe',
        visible: false,
    });

    var __mil_concesionelectrica = new MapImageLayer({
        url: url_concesionelectrica,
        title: 'Concesiones',
        aux_alias: 'gruconcesionelectrica',
        visible: false,
    });

    var _gru_extra = new GroupLayer({
        title: 'Extras',
        visible: false,
        visibilityMode: "independent",
        layers: [], // para __mil_drone, __mil_da, __mil_pi, __mil_er
        opacity: 1
    });

    /** CARTOGRAFÍA */

    //Limites Políticos
    var labeldep = {
        symbol: {
            type: "text",
            color: "black",
            haloColor: "white",
            haloSize: 1,
            font: {
                family: "arial",
                size: 11,
                weight: "bold"
            }
        },
        labelExpressionInfo: {
            expression: "$feature.NOMDEPARTAMENTO"
        },
        minScale: 30000000,
        maxScale: 2000000
    };
    var labelprov = {
        symbol: {
            type: "text",
            color: 'white',
            haloColor: [32, 33, 31, 1],
            haloSize: 1.5,
            font: {
                family: "arial",
                size: 10,
                weight: "bold"
            }
        },
        labelExpressionInfo: {
            expression: "$feature.NOMPROVINCIA"
        },
        minScale: 3000000,
        maxScale: 499999
    };
    var labeldist = {
        symbol: {
            type: "text",
            color: "black",
            haloColor: "white",
            haloSize: "2px",
            font: {
                family: "arial",
                size: 10,
                weight: "bold"
            }
        },
        labelExpressionInfo: {
            expression: "$feature.NOMDISTRITO"
        },
        minScale: 500000
    };

    var __fly_dpto = new FeatureLayer({
        url: url_depa,
        title: "Departamentos",
        outFields: ["*"],
        visible: true,
        labelingInfo: [labeldep]
    });
    var __fly_prov = new FeatureLayer({
        url: url_prov,
        title: "Provincias",
        outFields: ["*"],
        visible: true,
        labelingInfo: [labelprov],
        minScale: 3000000
    });
    var __fly_dist = new FeatureLayer({
        url: url_dist,
        title: "Distritos",
        outFields: ["*"],
        visible: true,
        labelingInfo: [labeldist],
        minScale: 500000
    });
    var __gru_limitespol = new GroupLayer({
        title: 'Límites Políticos',
        visible: false,
        visibilityMode: "independent",
        layers: [__fly_dist, __fly_prov, __fly_dpto],
        opacity: 1
    });


    var __mil_redvial = new MapImageLayer({
        url: url_redvial,
        title: 'Red Vial',
        aux_alias: 'gruredvial',
        visible: false,
        sublayers: [{
            id: 3,
            visible: true,
            title: 'Vía Vecinal'
        }, {
            id: 2,
            visible: true,
            title: 'Vía Departamental'
        }, {
            id: 1,
            visible: true,
            title: 'Vía Nacional'
        }]
    });

    var __mil_hidrografia = new MapImageLayer({
        url: url_redvial,
        title: 'Hidrografía',
        aux_alias: 'gruhidrografia',
        visible: false,
        sublayers: [{
            id: 19,
            visible: true,
            title: 'Nevados'
        }, {
            id: 18,
            visible: true,
            title: 'Lagunas'
        }, {
            id: 17,
            visible: true,
            title: 'Ríos Polígono'
        }, {
            id: 16,
            visible: true,
            title: 'Ríos Secundarios'
        }, {
            id: 15,
            visible: true,
            title: 'Ríos'
        }, {
            id: 14,
            visible: true,
            title: 'Ríos Principales'
        }]
    });

    var __gru_cartografico = new GroupLayer({
        title: 'Cartografía',
        visible: false,
        visibilityMode: "independent",
        layers: [__mil_hidrografia, __mil_redvial, __gru_limitespol],
        opacity: 1
    });


    /** CAPAS DE FUENTES EXTERNAS */

    var __mil_areaproteg = new MapImageLayer({
        url: url_areaproteg,
        title: 'Áreas Protegidas',
        aux_alias: 'gruareaproteg',
        visible: true
    });

    var __mil_zonaamortig = new MapImageLayer({
        url: url_zonaamortig,
        title: 'Zonas de Amortiguamiento',
        aux_alias: 'gruzonaamortig',
        visible: true
    });

    var __mil_zonaarqueolog = new MapImageLayer({
        url: url_zonaarqueolog,
        title: 'Zonas Arqueológicas',
        aux_alias: 'gruzonaarqueolog',
        visible: true
    });

    var __mil_concesionminera = new MapImageLayer({
        url: url_concesionminera,
        title: 'Concesiones Mineras',
        aux_alias: 'gruconcesionminera',
        visible: true
    });

    var __gru_arestring = new GroupLayer({
        title: 'Áreas Restringidas',
        visible: false,
        visibilityMode: "independent",
        layers: [__mil_concesionminera, __mil_zonaarqueolog, __mil_zonaamortig, __mil_areaproteg],
        opacity: 1
    });

    var __mil_cenepred1 = new MapImageLayer({
        url: url_cenepred1,
        title: 'Cartografía de Peligros - CENEPRED',
        aux_alias: 'grucenepred1',
        visible: false
    });

    var __mil_cenepred2 = new MapImageLayer({
        url: url_cenepred2,
        title: 'Información CENEPRED',
        aux_alias: 'grucenepred2',
        visible: false
    });

    var __mil_cenepred3 = new MapImageLayer({
        url: url_cenepred3,
        title: 'Información Complementaria - CENEPRED',
        aux_alias: 'grucenepred3',
        visible: false
    });

    var __gru_externo = new GroupLayer({
        title: 'Fuentes Externas',
        visible: false,
        visibilityMode: "independent",
        layers: [__mil_cenepred3, __mil_cenepred2, __mil_cenepred1, __gru_arestring],
        opacity: 1
    });

    // Grupo definido para Capas Añadidas Tmp
    var __gru_aniadido = new GroupLayer({
        title: 'Capas Añadidas',
        visible: false,
        visibilityMode: "independent",
        layers: [],
        opacity: 1
    });


    /** CAPAS DE ADMINISTRACION DE USUARIOS Y PERMISOS */

    var __fly_crudusuarios = new FeatureLayer({
        url: url_usuario,
        outFields: ["*"],
    });
    var __fly_crudroles = new FeatureLayer({
        url: url_rol,
        outFields: ["*"],
    });
    var __fly_crudpermisos = new FeatureLayer({
        url: url_permiso,
        outFields: ["*"],
    });


    //INFORMACION AUXILIAR DE CAPAS

    /*
      NOTA: El objeto __globspace.infolayers se conforma por un array de objetos que corresponden a los grupos de capas. 
      Cada objeto tiene los siguientes atributos: 

      alias: coincide con el nombre de la variable __mil
      aux_alias: coincide con el nombre del atributo aux_alias del objeto MIL definido en la variable __mil
      containerlyl: coincide con el id del contenedor DOM del layerlist en este caso sería lyl_sein 
      layers: [] //objeto usado en el proceso de dinamicidad.
      aliastitlelayers: objeto que contiene el title de las subcapas finales (capas propiamente dichas)
    */

    __globspace.infolayers = [{
            alias: '__mil_operacion',
            aux_alias: 'gruoperacion',
            containerlyl: 'lyl_sein',
            layers: [], //sublayers
            aliastitlelayers: { //titlesublayers
                'layer_cc_ct_sein': 'C.T. SEIN',
                'layer_cc_ct_aislados': 'C.T. Aislados',
                'layer_cc_ch_aislados': 'C.H. Aislados',
                'layer_cc_ch_sein': 'C.H. SEIN',
                'layer_cc_creserva': 'C.Reserva',
                'layer_cc_gen_aislada_municipios': 'Gen. Aislada- Municipios',
                'layer_cnc_hidroelectrica': 'Hidroeléctrica',
                'layer_cnc_eolica': 'Eólica',
                'layer_cnc_biomasa': 'Biomasa',
                'layer_cnc_solar': 'Solar',
                'layer_lt_33': 'L.T. 33 kV',
                'layer_lt_60': 'L.T.  60 kV',
                'layer_lt_138': 'L.T.  138 kV',
                'layer_lt_220': 'L.T.  220 kV',
                'layer_lt_500': 'L.T.  500 kV',
                'layer_estructura': 'Estructuras',
                'layer_set_33': 'SET 33 kV',
                'layer_set_60': 'SET 60 kV',
                'layer_set_138': 'SET 138 kV',
                'layer_set_220': 'SET 220 kV',
                'layer_set_500': 'SET 500 kV',

            }
        },
        {
            alias: '__mil_alerta',
            aux_alias: 'grualerta',
            containerlyl: 'lyl_sein',
            layers: [],
            aliastitlelayers: {
                'layer_ugc': 'Unidades de Generación Criticas',
                'layer_ts': 'Transformadores Sobrecargados',
                'layer_tc': 'Transformadores Críticos',
                'layer_sec': 'Asociadas a S.E. Criticos',
                'layer_ltc': 'L.T. Congestionadas',
                'layer_ltcyr': 'L.T. Criticas y Radiales',

            }

        },
        {
            alias: '__mil_proyectos',
            aux_alias: 'gruproyectos',
            containerlyl: 'lyl_sein',
            layers: [],
            aliastitlelayers: {
                'layer_set_33': 'SET 33 kV',
                'layer_set_60': 'SET 60 kV',
                'layer_set_138': 'SET 138 kV',
                'layer_set_220': 'SET 220 kV',
                'layer_set_500': 'SET 500 kV',
                'layer_lt_33': 'L.T. 33 kV',
                'layer_lt_60': 'L.T. 60 kV',
                'layer_lt_138': 'L.T. 138 kV',
                'layer_lt_220': 'L.T. 220 kV',
                'layer_lt_500': 'L.T. 500 kV',
                'layer_cc_hidroelectrica': 'Hidroeléctrica', //cc
                'layer_cc_termica': 'Térmica',
                'layer_cnc_hidroelectrica': 'Hidroeléctrica', //cnc
                'layer_cnc_eolica': 'Eólica',
                'layer_cnc_biomasa': 'Biomasa',
                'layer_cnc_solar': 'Solar',

            }
        },
        {
            alias: '__mil_da',
            aux_alias: 'gruda',
            containerlyl: 'lyl_sein',
            layers: [],
            aliastitlelayers: {
                'layer_descarganegativo': 'Descarga -',
                'layer_descargapositivo': 'Descarga +',

            }
        },
        {
            alias: '__mil_pi',
            aux_alias: 'grupi',
            containerlyl: 'lyl_sein',
            layers: [],
            aliastitlelayers: {
                'layer_set_33': 'SET 33 kV',
                'layer_set_60': 'SET 60 kV',
                'layer_set_138': 'SET 138 kV',
                'layer_set_220': 'SET 220 kV',
                'layer_set_500': 'SET 500 kV',
                'layer_lt_33': 'L.T. 33 kV',
                'layer_lt_60': 'L.T. 60 kV',
                'layer_lt_138': 'L.T. 138 kV',
                'layer_lt_220': 'L.T. 220 kV',
                'layer_lt_500': 'L.T. 500 kV',

            }
        },
        {
            alias: '__mil_drone',
            aux_alias: 'grudrone',
            containerlyl: 'lyl_sein',
            layers: [],
            aliastitlelayers: {
                'layer_drone': 'Drone',
            }
        },
        {
            alias: '__mil_er',
            aux_alias: 'gruer',
            containerlyl: 'lyl_sein',
            layers: [],
            aliastitlelayers: {
                'layer_set': 'Subestaciones',
                'layer_lt': 'Linea Transmisión',
                'layer_c': 'Centrales',

            }
        },
        {
            alias: '__mil_pe',
            aux_alias: 'grupe',
            containerlyl: 'lyl_sein',
            layers: [],
            aliastitlelayers: {
                'layer_pe': 'Puntos de entrega',
            }
        },
        {
            alias: '__mil_concesionelectrica',
            aux_alias: 'gruconcesionelectrica',
            containerlyl: 'lyl_sein',
            layers: [],
            aliastitlelayers: {
                'layer_concesioneselectricas': 'Concesiones eléctricas'
            }
        },
        {
            alias: '__mil_redvial',
            aux_alias: 'gruredvial',
            containerlyl: 'lyl_sein',
            layers: []
        },
        {
            alias: '__mil_hidrografia',
            aux_alias: 'gruhidrografia',
            containerlyl: 'lyl_sein',
            layers: []
        },
        {
            alias: '__mil_areaproteg',
            aux_alias: 'gruareaproteg',
            containerlyl: 'lyl_sein',
            layers: []
        },
        {
            alias: '__mil_zonaamortig',
            aux_alias: 'gruzonaamortig',
            containerlyl: 'lyl_sein',
            layers: []
        },
        {
            alias: '__mil_zonaarqueolog',
            aux_alias: 'gruzonaarqueolog',
            containerlyl: 'lyl_sein',
            layers: []
        },
        {
            alias: '__mil_concesionminera',
            aux_alias: 'gruconcesionminera',
            containerlyl: 'lyl_sein',
            layers: []
        },
        {
            alias: '__mil_cenepred1',
            aux_alias: 'grucenepred1',
            containerlyl: 'lyl_sein',
            layers: []
        },
        {
            alias: '__mil_cenepred2',
            aux_alias: 'grucenepred2',
            containerlyl: 'lyl_sein',
            layers: []
        },
        {
            alias: '__mil_cenepred3',
            aux_alias: 'grucenepred3',
            containerlyl: 'lyl_sein',
            layers: []
        },

    ];

    // Title de los subgrupos a los que se les asignará el wg "Buscar por grupo"

    __globspace.groupsforsearch = [
        // operacion
        'Centrales Convencionales',
        'Centrales Hidroelectricas',
        'Centrales Térmicas',
        'Centrales Reserva',
        'Gen. Aislada- Municipios',
        'Centrales No Convencionales',
        'Subestaciones de Transformación (SET)',
        'Lineas de Transmisión (L.T.)',

        // alerta
        'SEIN',
        'SETA',
        'Subestaciones',
        'Lineas de Transmisión',

        // proyectos
        'Centrales Convencionales',
        'Centrales No Convencionales',
        'Subestaciones de Transformación (SET)',
        'Lineas de Transmision (L.T.)',

        // PI
        'Subestaciones de Transformación (SET)',
        'Lineas de Transmision (L.T.)'
    ]


    return {

        //Return capas
        getMilOperacion: function() { return __mil_operacion; },
        getMilOperacionVisual: function() { return __mil_operacion_visual; },
        getMilOperacionLogeo: function() { return __mil_operacion_logueo; },
        getMilAlerta: function() { return __mil_alerta; },
        getMilProyectos: function() { return __mil_proyectos; },

        getMilDA: function() { return __mil_da; },
        getMilPI: function() { return __mil_pi; },
        getMilDrone: function() { return __mil_drone; },
        getMilER: function() { return __mil_er; },
        getMilPE: function() { return __mil_pe; },
        getMilConcesionElectrica: function() { return __mil_concesionelectrica; },
        getGruExtra: function() { return _gru_extra; },

        getGruLimitesPol: function() { return __gru_limitespol; },
        getMilRedvial: function() { return __mil_redvial; },
        getMilHidrografia: function() { return __mil_hidrografia; },
        getGruCartografico: function() { return __gru_cartografico; },

        getMilAreaproteg: function() { return __mil_areaproteg; },
        getMilZonaamortig: function() { return __mil_zonaamortig; },
        getMilZonaarqueolog: function() { return __mil_zonaarqueolog; },
        getMilConcesionminera: function() { return __mil_concesionminera; },
        getMilCenepred1: function() { return __mil_cenepred1; },
        getMilCenepred2: function() { return __mil_cenepred2; },
        getMilCenepred3: function() { return __mil_cenepred3; },
        getGruExterno: function() { return __gru_externo; },

        getGruAniadido: function() { return __gru_aniadido; },

        getFlyUsuarios: function() { return __fly_crudusuarios; },
        getFlyRoles: function() { return __fly_crudroles; },
        getFlyPermisos: function() { return __fly_crudpermisos; },

        //Return Urls
        getUrlAlertDetalle: function() { return url_alert_detalle; },
        getUrlErDetalle: function() { return url_er_detalle; },
        getUrlTblTrf: function() { return url_tbl_trf; },

        getUrlDepartamento: function() { return url_depa; },
        getUrlProvincia: function() { return url_prov; },
        getUrlDistrito: function() { return url_dist; },

        getUrlUsuario: function() { return url_usuario; },
        getUrlRol: function() { return url_rol; },
        getUrlComponente: function() { return url_componente; },
        getUrlPermiso: function() { return url_permiso; },

        getUrlPE: function() { return url_pe_pe; },
        getUrlPEContrato: function() { return url_pe_contrato; },
        getUrlPEInterrupcion: function() { return url_pe_interrupcion; },
        getUrlPETension: function() { return url_pe_tension; },
        getUrlPETensionDet: function() { return url_pe_tensiondet; }, // tension_perfil

        getUrlERC: function() { return url_er_detalle_c; },
        getUrlERSET: function() { return url_er_detalle_set; },
        getUrlERLT: function() { return url_er_detalle_lt; },

        getUrlAlertUGC: function() { return url_alert_detalle_ugc; },
        getUrlAlertTS: function() { return url_alert_detalle_ts; },
        getUrlAlertTC: function() { return url_alert_detalle_tc; },
        getUrlAlertSEC: function() { return url_alert_detalle_sec; },
        getUrlAlertLTC: function() { return url_alert_detalle_ltc; },
        getUrlAlertLTCYR: function() { return url_alert_detalle_ltcyr; },

    }

});

/* REVISADO  */