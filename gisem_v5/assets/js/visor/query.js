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
    async function QueryLayerGetEmpresa() {

        await $.getJSON("https://gisem.osinergmin.gob.pe/validar/seccionador/data.json", function( response ) {
            console.log(response);
            createList2(response.data, $("#ulEmpresas"), "EMPRESA", 1);
            $(".loading").hide()
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
        $(".loading").hide()
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
        debugger;
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

    function setValueCount(count, dom, attribute) {
        p = count.toString();
        dom.html(p);
    }

    async function QueryLayerUbigeos(codEquipo, codEmpresa) {
        let url = `https://gisem.osinergmin.gob.pe/validar/seccionador/api/api/values/GetData/${codEmpresa}/${codEquipo}`;
        await $.get(url).then(response => {
            getQueryService(response.seccionadorAfectado, Servicejs.getLayerEquipoSymbol(), 1);
            createList(response.seccionadorAfectado, $("#ulSeccionamientosAfectados"), "", 1)
            setValueCount(response.seccionadorAfectado.length, $("#idSecAfec"))

            getQueryService(response.sed, Servicejs.getLayerSubEstacionSymbol(), 2);
            createList(response.sed, $("#ulSedAfectados"), "", 2)
            setValueCount(response.sed.length, $("#idSubAfec"))

            getQueryService(response.tramos, Servicejs.getLayerTramoSymbol(), 3);
        });
        $(".loading").hide()

    }

    function getQueryService(obj, Layer, id) {
        let cadena = obj.map(t => { return `'${t.toString()}'` }).join(",")
        let where = `COD in (${cadena})`;
        if (id == 2)
            QuerySuministroCount(null, obj)
        if (obj.length == 0) {
            Layer.definitionExpression = "COD = 1";
            Layer.visible = false;
            return;
        }

        Layer.definitionExpression = where;
        Layer.visible = true;
        Layer.popupTemplate = Layer.createPopupTemplate()
        if (id == 3)
            Layer
            .when(() => {
                return Layer.queryExtent();
            })
            .then((response) => {
                View.goTo(response.extent);
            });
        // var feature = new FeatureLayer({
        //     url: url,
        //     definitionExpression: `COD in (${cadena})`,
        //     id: id
        // });
        // Map.add(feature)
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

    async function ExtendLayerSeccionamiento(cod) {
        let query = new Query();
        query.where = `COD = '${cod}'`;
        await Servicejs.getLayerEquipoSymbol().queryExtent(query).then(response => {
            View.goTo(response.extent);
        })
        $(".loading").hide()
    }

    async function ExtendLayerSED(cod) {
        let query = new Query();
        query.where = `COD = '${cod}'`;
        await Servicejs.getLayerSubEstacionSymbol().queryExtent(query).then(response => {
            View.goTo(response.extent);
        })
        $(".loading").hide()
    }

    function QuerySuministroCount(CodEmpresa, obj) {
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
                query.where = `COD in (${cadena})`;
            } else { setValueCount(0, $("#idSumAfec")); return }
        }
        query.outStatistics = [totalSUm];

        Servicejs.getLayerSubEstacionSymbol().queryFeatures(query).then(count => {

            setValueCount(count.features[0].attributes.NUM_SUMIN_TOTAL, $("#idSumAfec"))
        });
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