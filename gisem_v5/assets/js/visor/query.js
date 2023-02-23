define([
    "assets/js/visor/services.js",
    "esri/rest/support/Query",
], (
    Servicejs,
    Query,
) => {
    __equipo_secc = Servicejs.getLayerSeccionamiento();
    async function QueryLayerGetEmpresa() {
        const query = new Query();
        query.where = "1=1";
        query.returnGeometry = false;
        query.outFields = ["EMPRESA"];
        query.returnDistinctValues = true;
        await __equipo_secc.queryFeatures(query).then(function(results) {
            createList(results.features, $("#ulEmpresas"), "EMPRESA"); // prints the array of features to the console
        });
    }
    async function QueryLayerGetEquipo(obj) {
        const query = new Query();
        query.where = `EMPRESA = '${obj.empresa}' and COD_TIP = '${obj.cop_tip}'`;
        query.returnGeometry = false;
        query.outFields = ["COD"];
        query.returnDistinctValues = true;
        await __equipo_secc.queryFeatures(query).then(function(results) {
            switch (obj.idPanel) {
                case 1:
                    createList(results.features, $("#ulEquipos"), "COD")
                    break;
                case 2:
                    createList(results.features, $("#ulEquiposAfectados"), "COD")
                    break;
            }
        });
    }

    async function QueryLayerGetCountEquipo(obj) {
        debugger
        var xmlhttp = new XMLHttpRequest();

        //EMPRESA+%3D+%27SEAL%27+and+COD_TIP+%3D+%27RE%27
        //EMPRESA+%3D+%27${obj.empresa}%27+and+COD_TIP+%3D+%27${obj.cop_tip}%27
        var url = __equipo_secc.url + "/0/query?f=json&where=" + `EMPRESA+%3D+%27${obj.empresa}%27+and+COD_TIP+%3D+%27${obj.cop_tip}%27` + "&returnCountOnly=true";

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
        await __equipo_secc.queryFeatures(query).then(function(results) {
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
                return `<li class="list-group-item d-flex align-items-end" value="${t.attributes[attribute]}">
                <h3 class="h4 mb-0 text-accent-app">.</h3>
                <p class="mb-0">${t.attributes[attribute]}</p>
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
                return ` <li class="list-group-item d-flex align-items-end" value="${t.attributes[attribute]}>
                    <h3 class="h4 mb-0 text-accent-app pe-3"> .</h3>
                    <p class="mb-0">${t.attributes[attribute]}</p>
                </li>`;
            })
        dom.html(li);
    }

    function setValueCount(count, dom, attribute) {
        p = count.toString();
        dom.html(p);
    }

    async function QueryLayerUbigeos(value) {
        const query = new Query();
        query.where = `EMPRESA = '${obj.empresa}' and COD_TIP = '${obj.cop_tip}'`;
        query.returnGeometry = false;
        query.outFields = ["COD"];
        query.returnDistinctValues = false;
        await __equipo_secc.queryFeatures(query).then(function(results) {
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
    return {
        getQueryLayerGetEmpresa: QueryLayerGetEmpresa,
        getQueryLayerGetEquipo: QueryLayerGetEquipo,
        getQueryLayerGetCountEquipo: QueryLayerGetCountEquipo,
        getQueryLayerUbigeo: QueryLayerUbigeos
    }
});