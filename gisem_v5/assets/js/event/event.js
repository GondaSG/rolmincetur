require([
    "assets/js/visor/query.js",
], (
    Queryjs
) => {

    let diccionarioEquipos = [{
        cop_tip: "SC",
        idPanel: 1
    }]
    $("#ulEmpresas").on("click", "li", function() {
        diccionarioEquipos.forEach(t => {
            var obj = {
                empresa: $(this).attr("value"),
                cop_tip: t.cop_tip,
                idPanel: t.idPanel
            }
            Queryjs.getQueryLayerGetEquipo(obj);
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
        let codEquipo = $(this).attr("value")
        let codEmpresa = $("#ulEmpresas>li.active").attr("value")
        Queryjs.getQueryLayerUbigeo(codEquipo, codEmpresa);
    });
})