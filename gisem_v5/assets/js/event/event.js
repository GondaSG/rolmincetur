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
        $(".loading").show()
        diccionarioEquipos.forEach(t => {
            var obj = {
                empresa: $(this).attr("value"),
                idPanel: t.idPanel
            }
            Queryjs.getQueryLayerGetEquipo(obj);
        })
        Queryjs.getQueryLayerSeccionamientCount($(this).attr("value"));
        Queryjs.getQueryLayerSubEstacionCount($(this).attr("value"));
        Queryjs.getQuerySuministroCount($(this).attr("value"));
        $("#imputEquipos").val('')
        $('#ulSeccionamientosAfectados>li').remove()
        $('#ulSedAfectados>li').remove()
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
        $(".loading").show()
        let codEquipo = $(this).attr("value")
        let codEmpresa = $("#ulEmpresas>li.active").attr("value")
        Queryjs.getQueryLayerUbigeo(codEquipo, codEmpresa);
    });
    $("#ulSeccionamientosAfectados").on("click", "li", function() {
        $(".loading").show()
        let codSeccionamiento = $(this).attr("value")
        Queryjs.getExtendLayerSeccionamiento(codSeccionamiento);
    });
    $("#ulSedAfectados").on("click", "li", function() {
        $(".loading").show()
        let codSED = $(this).attr("value")
        Queryjs.getExtendLayerSED(codSED);
    });
})