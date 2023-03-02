define([
    "assets/js/visor/services.js",
    "assets/js/visor/visor.js",
    "esri/rest/support/Query",
    "esri/layers/FeatureLayer",
], (
    Servicejs,
    visorjs,
    Query,
    FeatureLayer
) => {
    var _equipo_secc_equipo = Servicejs.getLayerEquipo();
    var _equipo_secc_tramo = Servicejs.getLayerTramo();
    var _equipo_secc_Subestacion = Servicejs.getLayerSubEstacion();
    var View = visorjs.getView();
    var Map = visorjs.getMap();
    async function QueryLayerGetEmpresa() {
        const query = new Query();
        query.where = "1=1";
        query.returnGeometry = false;
        query.outFields = ["EMPRESA"];
        query.returnDistinctValues = true;
        await _equipo_secc_equipo.queryFeatures(query).then(function(results) {
            createList(results.features, $("#ulEmpresas"), "EMPRESA");
            $(".loading").hide()
        });
    }
    async function QueryLayerGetEquipo(obj) {
        const query = new Query();
        query.where = `EMPRESA = '${obj.empresa}' and COD_TIP = '${obj.cop_tip}'`;
        query.returnGeometry = false;
        query.outFields = ["COD"];
        query.returnDistinctValues = true;
        await _equipo_secc_equipo.queryFeatures(query).then(function(results) {
            switch (obj.idPanel) {
                case 1:
                    createList(results.features, $("#ulEquipos"), "COD")
                    break;
                case 2:
                    createList(results.features, $("#ulEquiposAfectados"), "COD")
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

    function createList(features, dom, attribute) {
        let li = `<li class="list-group-item d-flex">
                <label>No se encontro registros.</label>
            </li>`;
        if (features.length)
            li = features.map(t => {
                return `<li class="list-group-item d-flex align-items-end" value="${attribute != "" ? t.attributes[attribute]: t}">
                <h3 class="h4 mb-0 text-accent-app">.</h3>
                <p class="mb-0">${attribute != "" ? t.attributes[attribute]: t}</p>
            </li>`;
            })
        dom.html(li);
    }

    function createListAfectados(features, dom, attribute) {
        let li = `<li class="list-group-item d-flex">
                <label>No se encontro registros.</label>
            </li>`;
        if (features.length)
            li = features.map(t => {
                return ` <li class="list-group-item d-flex align-items-end" value="${attribute == "" ? t.attributes[attribute]: t}>
                    <h3 class="h4 mb-0 text-accent-app pe-3"> .</h3>
                    <p class="mb-0">${attribute == "" ? t.attributes[attribute]: t}</p>
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
            createList(response.seccionadorAfectado, $("#ulSeccionamientosAfectados"), "")
            setValueCount(response.seccionadorAfectado.length, $("#idSecAfec"))
            getQueryService(response.sed, Servicejs.getLayerSubEstacionSymbol(), 2);
            createList(response.sed, $("#ulSedAfectados"), "")
            setValueCount(response.sed.length, $("#idSubAfec"))
            getQueryService(response.tramos, Servicejs.getLayerTramoSymbol(), 3);
        });
        $(".loading").hide()

    }

    function getQueryService(obj, Layer, id) {
        let cadena = obj.map(t => { return `'${t.toString()}'` }).join(",")
        Layer.definitionExpression = `COD in (${cadena})`;
        Layer.visible = true
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
    return {
        getQueryLayerGetEmpresa: QueryLayerGetEmpresa,
        getQueryLayerGetEquipo: QueryLayerGetEquipo,
        getQueryLayerGetCountEquipo: QueryLayerGetCountEquipo,
        getQueryLayerUbigeo: QueryLayerUbigeos
    }
});