require([
    "assets/js/visor/query.js",
], (
    Queryjs
) => {

    let diccionarioEquipos = [{
            cop_tip: "SC",
            idPanel: 1
        },
        {
            cop_tip: "RE",
            idPanel: 2
        }
    ]
    let diccionarioCountEquipos = [{
            cop_tip: "RE",
            idPanel: 3
        },
        {
            cop_tip: "SE",
            idPanel: 4
        },
        {
            cop_tip: "SF",
            idPanel: 5
        }
    ]
    $("#ulEmpresas").on("click", "li", function() {
        diccionarioEquipos.forEach(t => {
            var obj = {
                empresa: $(this).attr("value"),
                cop_tip: t.cop_tip,
                idPanel: t.idPanel
            }
            Queryjs.getQueryLayerGetEquipo(obj);
        })
        diccionarioCountEquipos.forEach(t => {
            var obj = {
                empresa: $(this).attr("value"),
                cop_tip: t.cop_tip,
                idPanel: t.idPanel
            }
            Queryjs.getQueryLayerGetCountEquipo(obj);
        })
    });
    $("#imputEmpresas").on("keyup", function() {
        $("#ulEmpresas li").filter((index, elemento) => {
            $(elemento).addClass("hiddenLi");
            if ($(elemento).children().filter("p").text().toUpperCase().includes($("#imputEmpresas").prop("value").toUpperCase())) {
                $(elemento).removeClass("hiddenLi");
            }
        })
    })
    $("#imputEquipos").on("keyup", function() {
        $("#ulEquipos li").filter((index, elemento) => {
            $(elemento).addClass("hiddenLi");
            if ($(elemento).children().filter("p").text().toUpperCase().includes($("#imputEquipos").prop("value").toUpperCase())) {
                $(elemento).removeClass("hiddenLi");
            }
        })
    })
    $("#ulEquipos").on("click", "li", function() {
        let obj = "";
        Queryjs.getQueryLayerUbigeos(obj);
    });
})