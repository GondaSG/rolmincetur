define([
    "assets/js/visor/services.js",
    "assets/js/visor/visor.js",
    "esri/rest/support/Query",
    "esri/layers/FeatureLayer",
    "esri/PopupTemplate",
    "esri/rest/support/StatisticDefinition"
], (
    Servicejs,
    visorjs,
    Query,
    FeatureLayer,
    PopupTemplate,
    StatisticDefinition
) => {
    var _equipo_secc_equipo = Servicejs.getLayerEquipo();
    var _equipo_secc_SED = Servicejs.getLayerSubEstacion();
    var View = visorjs.getView();
    var Map = visorjs.getMap();
    var empresas = "";
    async function QueryLayerGetEmpresa() {

        await $.getJSON("https://gisem.osinergmin.gob.pe/validar/seccionador/data.json", function( response ) {
            createList2(response.data, $("#ulEmpresas"), "EMPRESA", 1);
            $(".loading").hide();
        });
        //const query = new Query();
        //query.where = "1=1";
        //query.returnGeometry = false;
        //query.outFields = ["EMPRESA"];
        //query.returnDistinctValues = true;
        //await _equipo_secc_equipo.queryFeatures(query).then(function(results) {
        //    createList(results.features, $("#ulEmpresas"), "EMPRESA", 1);
        //    $(".loading").hide()
        //});
    }
    async function QueryLayerGetEquipo(obj) {
        const query = new Query();
        query.where = `EMPRESA = '${obj.empresa}'`;
        query.returnGeometry = false;
        query.outFields = ["COD"];
        query.orderByFields = ["COD ASC"];
        query.returnDistinctValues = true;
        await _equipo_secc_equipo.queryFeatures(query).then(function(results) {
            switch (obj.idPanel) {
                case 1:
                    createList(results.features, $("#ulEquipos"), "COD", 1)
                    break;
            }
        });
        $(".loading").hide();
    }

    async function QueryLayerGetCountEquipo(obj) {
        var xmlhttp = new XMLHttpRequest();

        //EMPRESA+%3D+%27SEAL%27+and+COD_TIP+%3D+%27RE%27
        //EMPRESA+%3D+%27${obj.empresa}%27+and+COD_TIP+%3D+%27${obj.cop_tip}%27
        var url = _equipo_secc_equipo.url + "/0/query?f=json&where=" + `EMPRESA+%3D+%27${obj.empresa}%27+and+COD_TIP+%3D+%27${obj.cop_tip}%27` + "&returnCountOnly=true";

        var count = 0;

        xmlhttp.open("GET", url, false);
        await xmlhttp.send();

        if (xmlhttp.status !== 200) {
            return (xmlhttp.status);
        } else {
            var responseJSON = JSON.parse(xmlhttp.responseText)
            if (responseJSON.error) {
                return (JSON.stringify(responseJSON.error));
            } else {
                count = JSON.stringify(responseJSON.count);
            }
        }
        switch (obj.idPanel) {
            case 3:
                setValueCount(count, $("#idSecAfec"))
                break;
            case 4:
                setValueCount(count, $("#idSubAfec"))
                break;
            case 5:
                setValueCount(count, $("#idSumAfec"))
                break;
        }
    }
    async function QueryLayerGetCountEquipo2(obj) {
        const query = new Query();
        query.where = `EMPRESA = '${obj.empresa}' and COD_TIP = '${obj.cop_tip}'`;
        query.returnGeometry = false;
        query.outFields = ["COD"];
        query.returnDistinctValues = false;
        await _equipo_secc_equipo.queryFeatures(query).then(function(results) {
            switch (obj.idPanel) {
                case 3:
                    setValueCount(results.features, $("#idSecAfec"))
                    break;
                case 4:
                    setValueCount(results.features, $("#idSubAfec"))
                    break;
                case 5:
                    setValueCount(results.features, $("#idSumAfec"))
                    break;
            }
        });
    }

    function createList(features, dom, attribute, etiqueta) {
        let etiqueta1 = `<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="15" height="15" fill="#000"><path d="M12,19a7,7,0,1,1,7-7A7.008,7.008,0,0,1,12,19Z"/></svg>`;
        let etiqueta2 = `<img src="assets/images/subestaciones.png" alt="">`;

        let li = `<li class="list-group-item d-flex">
                <label>No se encontro registros.</label>
            </li>`;
        if (features.length)
            li = features.map(t => {
                return `<li class="list-group-item d-flex align-items-end" value="${attribute != "" ? t.attributes[attribute]: t}">
                <h3 class="h4 mb-0 text-accent-app">${etiqueta == 1 ? etiqueta1: etiqueta2 }</h3>
                <p class="mb-0">${attribute != "" ? t.attributes[attribute]: t}</p>
            </li>`;
            })
        dom.html(li);
    }

    function createList2(features, dom, attribute, etiqueta) {
        let etiqueta1 = `<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="15" height="15" fill="#000"><path d="M12,19a7,7,0,1,1,7-7A7.008,7.008,0,0,1,12,19Z"/></svg>`;
        let etiqueta2 = `<img src="assets/images/subestaciones.png" alt="">`;

        let li = `<li class="list-group-item d-flex">
                <label>No se encontro registros.</label>
            </li>`;
        if (Object.keys(features).length)
            li = Object.keys(features).map(t => {
                return `<li class="list-group-item d-flex align-items-end" value="${t}">
                <h3 class="h4 mb-0 text-accent-app">${etiqueta == 1 ? etiqueta1: etiqueta2 }</h3>
                <p class="mb-0">${features[t]}</p>
            </li>`;
            })
        dom.html(li);
    }

    function setValueCount(count, dom) {
        console.log('count');
        console.log(count.toString().length);
        var p = "";
        if (count && count.toString().length == 4)
            p = count.toString().substring(0, 1) + " k";
        else if (count && count.toString().length == 5)
            p = count.toString().substring(0, 2) + " k";
        else if (count && count.toString().length == 6)
            p = count.toString().substring(0, 3) + " k";
        else if (count && count.toString().length == 7)
            p = count.toString().substring(0, 4) + " k";
        else 
            p = count.toString();
        dom.html(p);
    }

    async function QueryLayerUbigeos(codEquipo, codEmpresa) {
        //empresas = codEmpresa;
        let url = `https://gisem.osinergmin.gob.pe/validar/seccionador/api/api/values/GetData/${codEmpresa}/${codEquipo}`;
        await $.get(url).then(response => {
            getQueryService(response.seccionadorAfectado, Servicejs.getLayerEquipoSymbol(), 1, codEmpresa);
            createList(response.seccionadorAfectado, $("#ulSeccionamientosAfectados"), "", 1);
            setValueCount(response.seccionadorAfectado.length, $("#idSecAfec"));

            getQueryService(response.sed, Servicejs.getLayerSubEstacionSymbol(), 2, codEmpresa);
            createList(response.sed, $("#ulSedAfectados"), "", 2);
            setValueCount(response.sed.length, $("#idSubAfec"));

            getQueryService(response.tramos, Servicejs.getLayerTramoSymbol(), 3, codEmpresa);
            console.log('codEmpresa');
            console.log(codEmpresa);
            getQueryService(response.elementos, Servicejs.getLayerTramosBT(), 6, codEmpresa);
            getQueryService(response.elementos, Servicejs.getLayerSuministros(), 7, codEmpresa);
            $(".loading").hide();
        });
    }

    function getQueryService(obj, Layer, id, codEmpresa) {
        if (obj.length == 0) {
            Layer.definitionExpression = "COD = 1";
            Layer.visible = false;
            return;
        }
        let cadena = obj.map(t => { return `'${t.toString()}'` }).join(",");
        if (id == 1) {
            Layer.definitionExpression = `COD in (${cadena}) AND EMPRESA = '${codEmpresa}'`;
            Layer.visible = true;
            Layer.popupTemplate = Layer.createPopupTemplate();
        }
        else if (id == 2) {            
            QuerySuministroCount(codEmpresa, obj);
        }
        else if (id == 3) {
            Layer.definitionExpression = `COD in (${cadena}) AND EMPRESA = '${codEmpresa}'`;
            Layer.visible = true;
            Layer.popupTemplate = Layer.createPopupTemplate();
            Layer
            .when(() => { return Layer.queryExtent(); })
            .then((response) => { View.goTo(response.extent); });
        }
        else if (id == 6 || id == 7) {
            if (codEmpresa){
                console.log(`SED in (${cadena}) AND EMPRESA = '${codEmpresa}'`);
                Layer.definitionExpression = `SED in (${cadena}) AND EMPRESA = '${codEmpresa}'`;
                Layer.visible = true;
                //Layer.popupTemplate = Layer.createPopupTemplate();
            }            
        }
    }

    function QueryLayerSubEstacionCount(CodEmpresa, ) {
        if (CodEmpresa) {
            var query = new Query({
                where: `EMPRESA = '${CodEmpresa}'`
            })
            _equipo_secc_SED.queryFeatureCount(query).then(count => {
                setValueCount(count, $("#idSubAfec"))
            });
        } else
            _equipo_secc_SED.queryFeatureCount().then(count => {
                setValueCount(count, $("#idSubAfec"))
            });
    }

    function QuerySeccionamientCount(CodEmpresa) {
        if (CodEmpresa) {
            var query = new Query({
                where: `EMPRESA = '${CodEmpresa}'`
            })
            _equipo_secc_equipo.queryFeatureCount(query).then(count => {
                setValueCount(count, $("#idSecAfec"))
            });
        } else
            _equipo_secc_equipo.queryFeatureCount().then(count => {
                setValueCount(count, $("#idSecAfec"))
            });
    }

    function QuerySuministroCount(CodEmpresa, obj) {
        console.log('CodEmpresa ' + CodEmpresa);
        let totalSUm = new StatisticDefinition({
            statisticType: "sum",
            onStatisticField: "NUM_SUMIN",
            outStatisticFieldName: "NUM_SUMIN_TOTAL"
        });
        var query = new Query();
        if (CodEmpresa)
            query.where = `EMPRESA = '${CodEmpresa}'`;
        if (obj) {
            if (obj.length > 0) {
                let cadena = obj.map(t => { return `'${t.toString()}'` }).join(",");
                console.log(`COD in (${cadena}) AND EMPRESA = '${CodEmpresa}'`);
                query.where = `COD in (${cadena}) AND EMPRESA = '${CodEmpresa}'`;
            } else { 
                setValueCount(0, $("#idSumAfec"));
                return;
            }
        }
        query.outStatistics = [totalSUm];

        Servicejs.getLayerSubEstacionSymbol().queryFeatures(query).then(count => {
            setValueCount(count.features[0].attributes.NUM_SUMIN_TOTAL, $("#idSumAfec"))
        });
    }

    async function ExtendLayerSeccionamiento(cod, codEmpresa) {
        console.log('ExtendLayerSeccionamiento');
        let query = new Query();
        query.where = `COD = '${cod}' AND EMPRESA = '${codEmpresa}'`;
        await Servicejs.getLayerEquipoSymbol().queryExtent(query).then(response => {
            View.goTo(response.extent);
        });
        $(".loading").hide();
    }

    async function ExtendLayerSED(cod, codEmpresa) {
        let query = new Query();
        query.where = `COD = '${cod}' AND EMPRESA = '${codEmpresa}'`;
        await Servicejs.getLayerSubEstacionSymbol().queryExtent(query).then(response => {
            View.goTo(response.extent);
        })
        $(".loading").hide();
    }

    return {
        getQueryLayerGetEmpresa: QueryLayerGetEmpresa,
        getQueryLayerGetEquipo: QueryLayerGetEquipo,
        getQueryLayerGetCountEquipo: QueryLayerGetCountEquipo,
        getQueryLayerUbigeo: QueryLayerUbigeos,
        getQueryLayerSeccionamientCount: QuerySeccionamientCount,
        getQueryLayerSubEstacionCount: QueryLayerSubEstacionCount,
        getQuerySuministroCount: QuerySuministroCount,
        getExtendLayerSeccionamiento: ExtendLayerSeccionamiento,
        getExtendLayerSED: ExtendLayerSED,
    }
});