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
                    $("#")

                    break;
                case 3:
                    $("#")
                    break;
                case 4:
                    $("#")
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
                return `<li class="${attribute} list-group-item d-flex align-items-end" value="${t.attributes[attribute]}">
                <h3 class="h4 mb-0 text-accent-dark">.</h3>
                <p class="mb-0">${t.attributes[attribute]}</p>
            </li>`;
            })
        dom.html(li);
    }

    function createListEmpresa(features) {

        li = features.map(t => {
            return `<li class="list-group-item d-flex align-items-end">
                <h3 class="h4 mb-0 text-accent-dark">.</h3>
                <p class="mb-0">${t.attributes.EMPRESA}</p>
            </li>`;
        })
        $("#ulEmpresas").html(liEmpresa);
    }

    return {
        getQueryLayerGetEmpresa: QueryLayerGetEmpresa,
        getQueryLayerGetEquipo: QueryLayerGetEquipo
    }
});