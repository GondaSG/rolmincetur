require([
    "assets/js/visor/query.js",
], (
    Queryjs
) => {
    $("#ulEmpresas").on("click", "li", function() {
        var obj = {
            empresa: $(this).attr("value"),
            cop_tip: "SC",
            idPanel: 1
        }
        Queryjs.getQueryLayerGetEquipo(obj);
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
})