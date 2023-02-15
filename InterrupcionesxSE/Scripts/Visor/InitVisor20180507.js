
var p_anio = "";
var p_empresa = "";
var p_cod_emp = "";
var p_id_emp = "";
var p_cod_alim = "";
var p_lsispor = "MT";

var p_id_emp_vnr = "";

var cchart_se_saifi_prog;

var seriesSE1 = [];
var seriesSE2 = [];

var EventoAlerta;





/*
var EXPORT_WIDTH = 1000;

function save_chart(chart, filename) {
    var render_width = EXPORT_WIDTH;
    var render_height = render_width * chart.chartHeight / chart.chartWidth;

    var svg = chart.getSVG({
        exporting: {
            sourceWidth: chart.chartWidth,
            sourceHeight: chart.chartHeight
        }
    });

    var canvas = document.createElement('canvas');
    canvas.height = render_height;
    canvas.width = render_width;

    var image = new Image;
    image.onload = function() {
        canvas.getContext('2d').drawImage(this, 0, 0, render_width, render_height);
        var data = canvas.toDataURL("image/png")
        download(data, filename + '.png');
    };
    image.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
    //image.src = 'data:image/svg+xml;base64,' + window.btoa(svg);
}

function download(data, filename) {
    var a = document.createElement('a');
    a.download = filename;
    a.href = data
    document.body.appendChild(a);
    a.click();
    a.remove();
}

*/



//--CARGAR SED MODAL---------------------------
function cargarSED(pIDSED) {
    //pp_anio = '2017'; //$('#select-anio').val();
    console.log($('#select-anio').val());
    //console.log(pp_anio);
    pp_cod_emp = "EPU";
    pp_cod_se = "SE0027";
    pp_cod_alim = "7501";

    $.ajax({
        type: 'POST',
        url: 'ServicioVisorInterrupciones.asmx/ListarSEDxID',
        data: "{pIDSubDistribucion:'" + pIDSED + "',pIDEmpresa:'" + p_id_emp + "',pIDSisElectrico:'" + p_cod_se + "', pIDAlimentadorMT:'" + p_cod_alim + "', pPeriodo:'" + $('#select-anio').val() + "'}",
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (result) {
            $('#infoSED-codAlim').html(result.d.ID_ALIMENTADORMT);
            $('#infoSED-codSED').html(result.d.ID_SUBEDISTRIBUCION);
            $('#infoSED-numUsu').html(result.d.NUMERO_USUARIOS);
            var JSONSumi = JSON.parse(result.d.SUMINISTRO_MCT);
            if (jQuery.isEmptyObject(JSONSumi)) {
                $("#infoSED-sumiMCT").html('');
            } else {
                $("#infoSED-sumiMCT").html(tablaSEDSuminitroMC(JSONSumi, result.d.NUMERO_USUARIOS));
            }

            var SUM_MT_DENTRO_ZC = "";
            var SUM_MT_FUERA_ZC = "";
            var SUM_BT_DENTRO_ZC = "";
            var SUM_BT_FUERA_ZC = "";
            var sumiColec = "";

            SUM_MT_DENTRO_ZC = result.d.SUM_MT_DENTRO_ZC;
            SUM_MT_FUERA_ZC = result.d.SUM_MT_FUERA_ZC;
            SUM_BT_DENTRO_ZC = result.d.SUM_BT_DENTRO_ZC;
            SUM_BT_FUERA_ZC = result.d.SUM_BT_FUERA_ZC;

            if (SUM_MT_DENTRO_ZC != '0') {
                sumiColec = 'Suministros MT Dentro de la Zona de Concesión: ' + SUM_MT_DENTRO_ZC + '<br />';
            }

            if (SUM_MT_FUERA_ZC != '0') {
                sumiColec += 'Suministros MT Fuera de la Zona de Concesión: ' + SUM_MT_FUERA_ZC + '<br />';
            }

            if (SUM_BT_DENTRO_ZC != '0') {
                sumiColec += 'Suministros BT Dentro de la Zona de Concesión: ' + SUM_BT_DENTRO_ZC + '<br />';
            }

            if (SUM_BT_FUERA_ZC != '0') {
                sumiColec += 'Suministros BT Fuera de la Zona de Concesión: ' + SUM_BT_FUERA_ZC + '<br />';
            }
            if (sumiColec == '')
                $('#infoSED-VerMas').hide();
            else
                $('#infoSED-VerMas').show();

            $("#infoSED-sumiColec").html(sumiColec + '<br />');


        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('jqXHR:' + jqXHR); console.log('textStatus:' + textStatus); console.log('errorThrown:' + errorThrown);
        }
    });
}

function tablaSEDSuminitroMC(data, nroUsuarios) {
    var html = '<table class="cell-hover row-border bg-white" style="width:100%!important;"><tbody>' +
        '<tr><td class="p-0" style="height: 0px!important; max-width: 12vw!important; min-width: 12vw!important;"></td><td class="p-0" style="height: 0px!important; max-width: 12vw!important; min-width: 12vw!important;"></td></tr>' +
        '<tr><td colspan="2"><b><label>Suministros BT con Mala Calidad de Tensión </label></b></td></tr>' +
        '<tr><td>Urbano</td><td>Rural</td></tr> <tr>';
    if (data.hasOwnProperty("Urbano")) {
        html += '<td>' + tablaSEDSuminitroMC_Fila(data.Urbano, 'U') + '<br/>';
        html += 'Suministros Compensados: ' + data.Urbano.T.scom + '<br/>Compensación USD: ' + data.Urbano.T.mcom + '<br/></td>';
    } else {
        html += '<td></td>';
    };

    if (data.hasOwnProperty("Rural")) {
        html += '<td>' + tablaSEDSuminitroMC_Fila(data.Rural, 'R') + '<br/>';
        html += ' Suministros Compensados: ' + nroUsuarios + '<br/>Compensación USD: ' + data.Rural.T.mcom + '<br/></td>';
    } else {
        html += '<td></td>';
    };

    html += '</tr></tbody></table>';
    return html;
}

function tablaSEDSuminitroMC_Fila(dataFila, tipo) {
    var html = "";
    if (dataFila.F1.c != 0) {
        html += '<b>Sobretensión > 7,5%</b> (<a href="#" onclick="$(\'#S' + tipo + 'F1\').toggle();">' + dataFila.F1.c + ' Suministros</a>) <br>';
        html += '<div id="S' + tipo + 'F1" style="display:none">' + dataFila.F1.data + ' </div>';
    }
    if (dataFila.F2.c != 0) {
        html += '<b>' + (tipo === "U" ? "Sobretensión < 7,5% " : "Subtensión > 7,5%") + '</b> (<a href="#" onclick="$(\'#S' + tipo + 'F2\').toggle();">' + dataFila.F2.c + ' Suministros</a>) <br>';
        html += '<div id="S' + tipo + 'F2" style="display:none">' + dataFila.F2.data + ' </div>';
    }
    if (tipo == 'U') {
        if (dataFila.F3.c != 0) {
            html += '<b>Subtensión > 7,5%</b> (<a href="#" onclick="$(\'#S' + tipo + 'F3\').toggle();">' + dataFila.F3.c + ' Suministros</a>) <br>';
            html += '<div id="S' + tipo + 'F3" style="display:none">' + dataFila.F3.data + ' </div>';
        }
        if (dataFila.F4.c != 0) {
            html += '<b>Subtensión < 7,5%</b> (<a href="#" onclick="$(\'#S' + tipo + 'F4\').toggle();">' + dataFila.F4.c + ' Suministros</a>) <br>';
            html += '<div id="S' + tipo + 'F4" style="display:none">' + dataFila.F4.data + ' </div>';
        }
    }
    return html;
}

//--------------------------------------------

//--CARGAR SET MODAL--------------------------
//cargarSET('ADIL', '024H00ST2');
function cargarSET(pIDEMP, pIDSET) {
    console.log('cargarSET');
    console.log(p_anio);
    $.ajax({
        type: 'POST',
        url: 'ServicioVisorInterrupciones.asmx/ListarSETxID',
        data: "{pIDSubTransmision:'" + pIDSET + "',pIDEmpresa:'" + pIDEMP + "', pPeriodo:'" + p_anio + "'}",
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (result) {
            $('#infoSET-Empresa').html(result.d.ID_EMPRESA + ' - ' + result.d.EMPRESA);
            // $('#infoSET-codSET').html(result.d.ID_SUBETRANSMISION);
            // $('#infoSET-NomSET').html(result.d.NOMBRE);     
            var jSONCEL = JSON.parse(result.d.CEL_EQUI_PROTEC);
            if (jQuery.isEmptyObject(jSONCEL)) {
                $("#infoSET-cel-equipo").html('');
            } else {
                var pTable = "";
                pTable += "  <div class=\"example bg-white set-border bd-grayLight no-padding no-margin\" data-text=\"\">";
                pTable += "    <table style=\"display: table !important;  width: 100%; ;table-layout: auto !important\">";
                pTable += "      <thead>";
                pTable += "        <tr><th colspan=\"8\" style=\"font-size: 0.8rem; padding: 5px;\"><label>Listado de celdas MT y Equipos de Protección<\/label><\/th><\/tr>";
                pTable += "        <tr>";
                pTable += "          <th style=\"width: 16%!important;\"><label>Celda<\/label><\/th>";
                pTable += "          <th style=\"width: 12%!important;\"><label>Cod. Equipo<\/label><\/th>";
                pTable += "          <th style=\"width: 12%!important;\"><label>Cod. Rele<\/label><\/th>";
                pTable += "          <th style=\"width: 12%!important;\"><label>Marca<\/label><\/th>";
                pTable += "          <th style=\"width: 12%!important;\"><label>Tipo<\/label><\/th>";
                pTable += "          <th style=\"width: 12%!important;\"><label>Alimentador<\/label><\/th>";
                pTable += "          <th style=\"width: 12%!important;\"><label>Nivel Tensión(Kv)<\/label><\/th>";
                pTable += "          <th style=\"width: 12%!important;\"><label>Cod. SE<\/label><\/th>";
                pTable += "        <\/tr>";
                pTable += "      <\/thead>";
                pTable += "    <\/table>";
                pTable += "  <\/div>";
                pTable += "  <div class=\"example bg-white set-border bd-grayLight no-padding no-margin\" data-text=\"\" style=\"max-height: 30vh!important; overflow-y:auto\">";
                pTable += "    <table id=\"TablaInfoSET-CELEQUIPO\" class=\"table striped compact\" style=\"display: table !important; width: 100%; text-align:center; font-size: 0.8rem;table-layout: auto !important\">";
                pTable += "      <tbody>";
                $.each(jSONCEL, function (i, row) {
                    pTable += '<tr>' +
                        '<td style = "width: 16%!important;">' + row.CELDA + '</td>' +
                        '<td style = "width: 12%!important;">' + row.EQUIPO + '</td>' +
                        '<td style = "width: 12%!important;">' + row.RELE + '</td>' +
                        '<td style = "width: 12%!important;">' + row.MARCA + '</td>' +
                        '<td style = "width: 12%!important;">' + row.TIPO + '</td>' +
                        '<td style = "width: 12%!important;">' + row.ALIM + '</td>' +
                        '<td style = "width: 12%!important;">' + row.TENSION + '</td>' +
                        '<td style = "width: 12%!important;">' + row.SE + '</td>' +
                        '</tr>';
                });
                pTable += "      <\/tbody>";
                pTable += "    <\/table>";
                pTable += "  <\/div>";
                if (jSONCEL.length > 0)
                    $("#infoSET-cel-equipo").html(pTable);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('jqXHR:' + jqXHR); console.log('textStatus:' + textStatus); console.log('errorThrown:' + errorThrown);
        }
    });
}


//--------------------------------------------




$(document).ready(function () {
    //CargarCompenentesMalEstado();
    //-----Config Inicial----------
    //cargarSED('7501076');
    // cargarSET('P405');
    $.ajax({
        type: 'POST',
        url: 'ServicioVisorInterrupciones.asmx/ObtenerConfig',
        data: '{}',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (result) {

            //console.log(result.d.ULTIMA_ACT);
            //console.log(result.d.PERIODOS);
            //var datosPER = result.d.PERIODOS;
            //console.log(result);
            //console.log(result.d.PERIODOS);
            var sel = $('#select-anio').data('select');
            sel.data(result.d.PERIODOS);

            p_anio = $('#select-anio').val();
            //console.log('ObtenerConfig');
            //console.log($('#select-anio').val());
            $('#divAnio').attr('title', result.d.ULTIMA_ACT);
            $('#select-anio').val(p_anio);
            $("#select-anio").change(function () {
                p_anio = $('#select-anio').val();
                iniciar();
                ActivarTab(0);
                LimpiarEmpresa();
            });
            //console.log('iniciar.3');
            iniciar()

            /*
            $.each(datosPER, function (val, text) {
                $('#select-anio').append($('<option></option>').val(val).html(text))
            });
            */

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('jqXHR:' + jqXHR); console.log('textStatus:' + textStatus); console.log('errorThrown:' + errorThrown);
        }
    });
    //-----------------------------

    /*
    $('#save_btn').click(function () {
       // save_chart($('#chart-emp').highcharts(), 'chart');
        var element = document.getElementById("chart-emp");

        html2canvas(element).then(function (canvas) {
            // Export the canvas to its data URI representation
            var base64image = canvas.toDataURL("image/png");

            // Open the image in a new window
            download(base64image, 'asdasdsa' + '.png');
           // window.open(base64image, "_blank");
        });
    });
    */


    //iniciar();

    if($("#TipoUsuario").val()!='PUBLIC'){
        clearInterval(EventoAlerta);
        EventoAlerta = setInterval("ConsultarAlerta()", 30000);

    }

   /// ConsultarAlerta();----------

    $('#EliminarSeleccionEmpresa').click(function () {
        ActivarTab(0);
        LimpiarEmpresa();
    });

    $('#EliminarSeleccionSistemaElectrico').click(function () {
        ActivarTab(2);
        LimpiarSistemaElectrico()
    });

    $('#EliminarSeleccionAlimentador').click(function () {
        ActivarTab(3);
        LimpiarAlimentador();
    });

    //$('#DetalleAlerta').attr('display', 'none');

    //$('#DetalleAlerta').hide();

    //cargarEmpresa('ESM');
    //cargarSistemaElectrico('ESM', 'SE0044');
    //cargarAlimentador('ESM', '117');
    //cargarAlimentador('SE0044', 'PN103');



});


var ResulAlertas;
var CodigoAlertaInicial = '';
function ConsultarAlerta() {
    $.ajax({
        type: "POST",
        url: "ServicioVisorInterrupciones.asmx/ConsultaAlerta",
        data: "{numRegistros:30, pIDEmpresa:'"+ $("#CodEmpresa").val() +"'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            ResulAlertas = msg.d;
            if (ResulAlertas.length > 0)
            {
                if (CodigoAlertaInicial != ResulAlertas[0].Reg_cod) {
                    CodigoAlertaInicial = ResulAlertas[0].Reg_cod;
                } else { return false; }

                var i = 0;
                var row;
                var rowunica = "";
                var rowunicaAnt = "";
                if (ResulAlertas.length > 0) {
                    $('#tablaAlerta tbody').html('');
                    for (i = 0; i < ResulAlertas.length; i++) {
                        rowunicaAnt = ResulAlertas[i].Reg_cod + ResulAlertas[i].Cod_empresa + ResulAlertas[i].Cod_sisele;
                        if (rowunicaAnt != rowunica) {
                            rowunica = rowunicaAnt;
                            row = creaFila({
                                REG_COD: ResulAlertas[i].Reg_cod,
                                REG_FECHA: ResulAlertas[i].Reg_fecha,
                                FEC_INI: ResulAlertas[i].Fec_ini,
                                FEC_FIN: ResulAlertas[i].Fec_fin,
                                MOT_MOTIVO: ResulAlertas[i].Mot_motivo,
                                MOT_CAUSA: ResulAlertas[i].Mot_causa,
                                MOT_DETALLE: ResulAlertas[i].Mot_detalle,
                                INST_DESCRIPCION: ResulAlertas[i].Inst_descripcion,
                                INST_TIPO: ResulAlertas[i].Inst_tipo,
                                INST_PERTENENCIA: ResulAlertas[i].Inst_pertenencia,
                                AFEC_USUARIOS: ResulAlertas[i].Afec_usuarios,
                                AFEC_DEMANDA: ResulAlertas[i].Afecdemanda,
                                SIS_ELECTRICO: ResulAlertas[i].Sis_electrico,
                                SIS_LUGAR: ResulAlertas[i].Sis_lugar,
                                SIS_UBICACION: ResulAlertas[i].Sis_ubicacion,
                                SIS_UBIGEO: ResulAlertas[i].Sis_ubigeo,
                                COD_EMPRESA: ResulAlertas[i].Cod_empresa,
                                EMPRESA: ResulAlertas[i].empresa,
                                COD_SISELE: ResulAlertas[i].Cod_sisele,
                                SIS_ELE: ResulAlertas[i].Sis_ele
                            }, i);
                            $('#tablaAlerta tbody').append(row);
                        }                        
                    }
                    if (i > 0) {
                        $('#alerta').addClass("ani-ring");
                    } else {
                        $('#alerta').removeClass("ani-ring");
                    }
                }
            }
        }
    });
}

function creaFila(data, i) {
    return (
        '<tr>' +
        '<td style = "width: 12%;text-align: center;">' + data.REG_COD + '</td>' +
        '<td style = "width: 18%;text-align: center;">' + data.REG_FECHA + '</td>' +
        '<td style = "width: 8%;text-align: center;">' + data.COD_EMPRESA + '</td>' +
        '<td style = "width: 17%;">' + data.EMPRESA + '</td>' +
        '<td style = "width: 12%;text-align: center;">' + data.COD_SISELE + '</td>' +
        '<td style = "">' + data.SIS_ELE + '</td>' +
        '<td style = "width: 5%;"><button title="Ver mapa" class="button primary cycle mini outline" onclick="buscarCapaSEAlerta(\'' + data.COD_SISELE + '\')"><span class="mif-earth"></span></button></td> ' +
        '<td style = "width: 5%;"><button title="Detalle" class="button alert cycle mini outline" onclick="AlertaDetalle(' + i + ')"><span class="mif-eye"></span></button></td> ' +
        '</tr>'
    );
}

function AlertaDetalle(i) {
    $('#DetalleAlerta-charms').data('charms').toggle();
    $('#RegistroGrabacion').html(ResulAlertas[i].Reg_cod);
    $('#FechaGrabacion').html(ResulAlertas[i].Reg_fecha);
    $('#RangoFechaIni').html(ResulAlertas[i].Fec_ini);
    $('#RangoFechaFin').html(ResulAlertas[i].Fec_fin);
    $('#Motivo').html(ResulAlertas[i].Mot_motivo);
    $('#Causa').html(ResulAlertas[i].Mot_causa);
    $('#DetalleCausa').html(ResulAlertas[i].Mot_detalle);
    $('#Tipo').html(ResulAlertas[i].Inst_tipo);
    $('#Perteneciente').html(ResulAlertas[i].Inst_pertenencia);
    $('#Descripcion').html(ResulAlertas[i].Inst_descripcion);
    $('#NumUsuarios').html(ResulAlertas[i].Afec_usuarios);
    $('#DemandaAfectadaKW').html(ResulAlertas[i].Afec_demanda);

    $('#sisafectado tbody').html('');
    var row = "";
    var codReg = ResulAlertas[i].Reg_cod;
    for (c = 0; c < ResulAlertas.length; c++) {
        if (ResulAlertas[c].Reg_cod == codReg){
                row ='<tr>';            
                row += '<td>' + ResulAlertas[c].Cod_sisele + '</td>';
                row += '<td>' + ResulAlertas[c].Sis_lugar + '</td>';
                row += '<td>' + ResulAlertas[c].Sis_ubicacion + '</td>';
                row += '<td>' + ResulAlertas[c].Sis_ubigeo + '</td>';
                row += '</tr>';
                $('#sisafectado tbody').append(row);
        }
    }

}

function getAbsolutePath() {
    // + 1
    var loc = window.location;
    var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/'));
    var resp = loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length)) + '/';
    return resp.replace("///", "/").replace("///", "/");
}

/********************************/
//import Highcharts from '../parts/Globals.js';
/* global document */
// Load the fonts
Highcharts.createElement('link', {
    href: 'https://fonts.googleapis.com/css?family=Dosis:400,600',
    rel: 'stylesheet',
    type: 'text/css'
}, null, document.getElementsByTagName('head')[0]);

Highcharts.theme = {
    colors: ['#7cb5ec', '#f7a35c', '#90ee7e', '#7798BF', '#aaeeee', '#ff0066',
        '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee',
        '#7cb5ec', '#f7a35c', '#90ee7e', '#7798BF', '#aaeeee', '#ff0066',
        '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee',
        '#FFB233'],
    chart: {
        backgroundColor: null,
        style: {
            fontFamily: 'Dosis, sans-serif'
        }
    },
    title: {
        style: {
            fontSize: '16px',
            fontWeight: 'bold',
            textTransform: 'uppercase'
        }
    },
    tooltip: {
        borderWidth: 0,
        backgroundColor: 'rgba(219,219,216,0.8)',
        shadow: false
    },
    legend: {
        itemStyle: {
            fontWeight: 'bold',
            fontSize: '13px'
        }
    },
    xAxis: {
        gridLineWidth: 1,
        labels: {
            style: {
                fontSize: '12px'
            }
        }
    },
    yAxis: {
        minorTickInterval: 'auto',
        title: {
            style: {
                textTransform: 'uppercase'
            }
        },
        labels: {
            style: {
                fontSize: '12px'
            }
        }
    },
    plotOptions: {
        candlestick: {
            lineColor: '#404048'
        }
    },
    // General
    background2: '#F0F0EA'
};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);

/**********************************/

Highcharts.setOptions({
    colors: $.map(Highcharts.getOptions().colors, function (color) {
        return {
            radialGradient: {
                cx: 0.4,
                cy: 0.3,
                r: 0.5
            },
            stops: [
                [0, color],
                [1, Highcharts.Color(color).brighten(-0.2).get('rgb')]
            ]
        };
    })
});

(function (H) {
    function symbolWrap(proceed, symbol, x, y, w, h, options) {
        if (symbol.indexOf('text:') === 0) {
            var text = symbol.split(':')[1],
                svgElem = this.text(text, x, y + h)
                    .css({
                        fontFamily: 'metro',
                        fontSize: '18px', //h * 2
                    });
            if (svgElem.renderer.isVML) {
                svgElem.fillSetter = function (value, key, element) {
                    element.style.color = H.Color(value).get('rgb');
                };
            }
            return svgElem;
        }
        return proceed.apply(this, [].slice.call(arguments, 1));
    }
    H.wrap(H.SVGRenderer.prototype, 'symbol', symbolWrap);
    if (H.VMLRenderer) {
        H.wrap(H.VMLRenderer.prototype, 'symbol', symbolWrap);
    }

    H.wrap(H.Chart.prototype, 'getSVG', function (proceed) {
        var svg = proceed.call(this);
        svg = '<?xml-stylesheet type="text/css" ' + 'href="../../Content/css/metro-all20180403.min.css"?>' + svg;
        return svg;
    });
}(Highcharts));

var cadeSym = [
    ["text:\ueb01", "\ueb01", ""],
    ["text:\ueb02", "\ueb02", ""],
    ["text:\ueb03", "\ueb03", ""],
    ["text:\ueb04", "\ueb04", ""],
    ["text:\ueb05", "\ueb05", ""],
    ["text:\ueb06", "\ueb06", ""],
    ["text:\ueb07", "\ueb07", ""],
    ["text:\ueb08", "\ueb08", ""],
    ["text:\ueb09", "\ueb09", ""],
    ["text:\ueb10", "\ueb10", ""],
    ["text:\ueb11", "\ueb11", ""],
    ["text:\ueb12", "\ueb12", ""],
    ["text:\ueb13", "\ueb13", ""],
    ["text:\ueb14", "\ueb14", ""],
    ["text:\ueb15", "\ueb15", ""],
    ["text:\ueb16", "\ueb16", ""],
    ["text:\ueb17", "\ueb17", ""],
    ["text:\ueb18", "\ueb18", ""],
    ["text:\ueb19", "\ueb19", ""],
    ["text:\ueb20", "\ueb20", ""],
    ["text:\ueb21", "\ueb21", ""],
    ["text:\ueb22", "\ueb22", ""],
    ["text:\ueb23", "\ueb23", ""],
    ["text:\ueb24", "\ueb24", ""],
    ["text:\ueb25", "\ueb25", ""],
    ["text:\ueb26", "\ueb26", ""],
    ["text:\ueb27", "\ueb27", ""],
    ["text:\ueb28", "\ueb28", ""],
    ["text:\ueb29", "\ueb29", ""],
    ["text:\ueb30", "\ueb30", ""],
    ["text:\ueb31", "\ueb31", ""],
    ["text:\ueb32", "\ueb32", ""],
    ["text:\ueb33", "\ueb33", ""],
    ["text:\ueb34", "\ueb34", ""],
    ["text:\ueb35", "\ueb35", ""],
    ["text:\ueb36", "\ueb36", ""],
    ["text:\ueb37", "\ueb37", ""],
    ["text:\ueb38", "\ueb38", ""],
    ["text:\ueb39", "\ueb39", ""],
    ["text:\ueb40", "\ueb40", ""],
    ["text:\ueb41", "\ueb41", ""],
    ["text:\ueb42", "\ueb42", ""],
    ["text:\ueb43", "\ueb43", ""],
    ["text:\ueb44", "\ueb44", ""],
    ["text:\ueb45", "\ueb45", ""],
    ["text:\ueb46", "\ueb46", ""],
    ["text:\ueb47", "\ueb47", ""],
    ["text:\ueb48", "\ueb48", ""],
    ["text:\ueb49", "\ueb49", ""],
    ["text:\ueb50", "\ueb50", ""]
];

function MostrarEstadisticoEmpresa(idEmpresaVNR, idEmpresa, NameEmpresa) {
    p_id_emp_vnr = idEmpresaVNR;
    p_id_emp = idEmpresa;
    p_empresa = NameEmpresa;
    p_cod_se = '';
    buscarCapaEmpresa(p_id_emp_vnr);
    cargarEmpresa(p_id_emp);

}

function MostrarEstadisticoSistemaElectrico(CodSE, idEmpresa) {
    //alert(cod_Empresa);
    p_cod_se = CodSE;
    buscarCapaSE(p_cod_se);
    cargarSistemaElectrico(idEmpresa, CodSE);
}

function MostrarEstadisticoAlimentador(CodAlimentador, CodSE) {
    p_cod_alim = CodAlimentador;
    cargarAlimentador(CodSE, CodAlimentador);
    buscarCapaAlimentador(p_cod_alim);
}

function iniciar() {
    //Pace.track(function () {
    //console.log('iniciar'); 
    //console.log($('#select-anio').val()); 
    //console.log(p_anio);    
    $.ajax({
        type: 'POST',
        url: 'ServicioVisorInterrupciones.asmx/EmpresaListarxPeriodo',
        data: "{pPeriodo:" + p_anio + ",pIDEmpresa:'" + $("#CodEmpresa").val() + "'}",
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (result) {
            var series = [];
            var x_suma_SAIFI = 0, x_suma_SAIDI = 0, x_count = 0;
            $.each(result.d, function (i, feature) {
                x_suma_SAIFI += feature.SAIFI_TOTAL == null ? 0 : feature.SAIFI_TOTAL;
                x_suma_SAIDI += feature.SAIDI_TOTAL == null ? 0 : feature.SAIDI_TOTAL;
                if (feature.SAIFI_TOTAL != null && feature.SAIDI_TOTAL != null) {
                    x_count += 1;
                }
            });
            var color = "";
            var x_SAIFI;
            var x_SAIDI;

            var x_prom_SAIFI = x_suma_SAIFI / x_count;
            var x_prom_SAIDI = x_suma_SAIDI / x_count;
            var ii = 0;
            var axiCodEmpVNR='';
            $.each(result.d, function (i, feature) {
                x_SAIFI = feature.SAIFI_TOTAL == null ? 0 : feature.SAIFI_TOTAL;
                x_SAIDI = feature.SAIDI_TOTAL == null ? 0 : feature.SAIDI_TOTAL;
                x_SAIFI = Math.round(x_SAIFI * 100) / 100;
                x_SAIDI = Math.round(x_SAIDI * 100) / 100;
                serie = {
                    colorByPoint: false,
                    color: '#0066CC',
                    name: feature.NOMBRE,
                    data: [{
                        x: x_SAIFI,
                        y: x_SAIDI,
                        value: feature.ID_EMPRESA,
                        name: feature.NOMBRE,
                        idempresavnr: feature.ID_EMPRESA_VNR
                    }],
                    marker: { symbol: cadeSym[ii][0] },
                    icon: cadeSym[ii][1]
                };
                axiCodEmpVNR = feature.ID_EMPRESA_VNR;
                ii++;
                series.push(serie);
            });

            if (ii == 1) {                
                buscarCapaEmpresa(axiCodEmpVNR);
            }
            /**Gráfico Dispersión Empresas***/

            var chart = new Highcharts.Chart({
                chart: {
                    renderTo: 'chart-emp',
                    type: 'scatter',
                    zoomType: 'xy',
                },
                exporting: {
                    buttons: {
                        contextButton: {
                            menuItems: ['printChart', 'separator', 'downloadCSV', 'downloadXLS']
                        }
                    }
                },
                title: { text: 'Total de Interrupciones (G+T+D)' },
                subtitle: { text: 'Año ' + p_anio },
                xAxis: {
                    title: { enabled: true, text: 'SAIFI' },
                    startOnTick: true,
                    endOnTick: true,
                    showLastLabel: true,
                    min: 0,
                },
                yAxis: {
                    title: { text: 'SAIDI' },
                },
                legend: {
                    layout: 'horizontal',
                    align: 'left',
                    verticalAlign: 'bottom',
                    floating: false,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
                    borderWidth: 1,
                    itemWidth: 215,
                    adjustChartSize: true,
                    navigation: { enabled: true }
                },
                plotOptions: {
                    series: {
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function () {
                                    MostrarEstadisticoEmpresa(this.options.idempresavnr.trim(), this.options.value, this.options.name);
                                    //p_id_emp_vnr = this.options.idempresavnr.trim();
                                    //p_id_emp = this.options.value;
                                    //p_empresa = this.options.name;
                                    //buscarCapaEmpresa(p_id_emp_vnr);
                                    //cargarEmpresa(p_id_emp);
                                }
                            }
                        }
                    },
                    scatter: {
                        marker: {
                            radius: 5,
                            states: {
                                hover: {
                                    enabled: true,
                                    lineColor: 'rgb(100,100,100)'
                                }
                            }
                        },
                        states: {
                            hover: {
                                marker: {
                                    enabled: false
                                }
                            }
                        },
                        tooltip: {
                            headerFormat: '<b>{series.name}</b><br>',
                            valueDecimals: 2,
                            pointFormat: '{point.x} SAIFI, {point.y} SAIDI'
                        }
                    }
                },
                series: series
            });

            /**Gráfico Barras Empresas***/
            var categories = [];
            var data1 = [], data2 = [];
            $.each(result.d, function (i, feature) {
                categories.push(feature.NOMBRE);
                var x_SAIFI = feature.SAIFI_TOTAL == null ? 0 : feature.SAIFI_TOTAL;
                var x_SAIDI = feature.SAIDI_TOTAL == null ? 0 : feature.SAIDI_TOTAL;
                x_SAIFI = Math.round(x_SAIFI * 100) / 100;
                x_SAIDI = Math.round(x_SAIDI * 100) / 100;
                data1.push(x_SAIFI);
                data2.push(x_SAIDI);
            });

            var chart = new Highcharts.Chart({
                //$('#chart-emp_all').highcharts({
                chart: {
                    renderTo: 'chart-emp_all',
                    //type: 'bar'
                    type: 'bar',
                    options3d: {
                        enabled: true,
                        alpha: 5,
                        beta: 5,
                        viewDistance: 25,
                        depth: 40
                    }
                },
                title: {
                    text: 'Total de Interrupciones (G+T+D)'
                },
                subtitle: {
                    text: 'Año ' + p_anio
                },
                xAxis: {
                    categories: categories,
                    title: {
                        text: 'EMPRESAS',
                        x: -1000
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                tooltip: {
                    valueSuffix: ''
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },/*
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -40,
                    y: 80,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                    shadow: true
                },*/
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'SAIFI',
                    data: data1
                }, {
                    name: 'SAIDI',
                    data: data2
                }]
            });
            //Pace.stop;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //alert('An error occurred... Look at the console (F12 or Ctrl+Shift+I, Console tab) for more information!');
            //alert('<p>status code: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>' + jqXHR.responseText + '</div>');
            console.log('jqXHR:');
            console.log(jqXHR);
            console.log('textStatus:');
            console.log(textStatus);
            console.log('errorThrown:');
            console.log(errorThrown);
            //Pace.stop;
        }
    }).done(function (msg) {
 
    }); 
    //});
}

function ActivarTab(nivel) {
    switch (nivel) {
        case 0:
            $('#tabEmpresa').removeClass("disabled");
            $('#tabSisElectrico').addClass("disabled");
            $('#tabAlimentadores').addClass("disabled");
            $('#SubDistribucion').addClass("disabled");
            break;
        case 1:
            $('#tabEmpresa').removeClass("disabled");
            $('#tabSisElectrico').addClass("disabled");
            $('#tabAlimentadores').addClass("disabled");
            $('#SubDistribucion').addClass("disabled");
            break;
        case 2:
            $('#tabEmpresa').removeClass("disabled");
            $('#tabSisElectrico').removeClass("disabled");
            $('#tabAlimentadores').addClass("disabled");
            $('#SubDistribucion').addClass("disabled");
            break;
            break;
        case 3:
            $('#tabEmpresa').removeClass("disabled");
            $('#tabSisElectrico').removeClass("disabled");
            $('#tabAlimentadores').removeClass("disabled");
            $('#SubDistribucion').addClass("disabled");
            break;
            break;
        case 4:
            $('#tabEmpresa').removeClass("disabled");
            $('#tabSisElectrico').removeClass("disabled");
            $('#tabAlimentadores').removeClass("disabled");
            $('#SubDistribucion').removeClass("disabled");
            $('#SubDistribucion').removeClass("disabled");
            break;
    }
}

function activarLeyendaMapaBase(tipo_capa) {
    switch (tipo_capa) {
        case 1:
            $('#galeria-mapas-charms').data('charms').close();
            $('#leyenda-charms').data('charms').toggle();
            break;
        case 2:
            $('#leyenda-charms').data('charms').close();
            $('#galeria-mapas-charms').data('charms').toggle();
            $('#galleryNode_gmapsat').remove();
            break;
    }
}

function ActualizarTituloSeguimiento() {
    if ($("#empresa_sel").html().length > 0) {
        if ($("#sis_electrico").html().length > 0) {
            if ($("#alimentador_Seleccionado").html().length > 0) {
                $("#SerieSeleccionada").html($("#empresa_sel").html() + ' / ' + $('#sis_electrico').html() + ' / ALIM:' + $("#alimentador_Seleccionado").html());
            } else {
                $("#SerieSeleccionada").html($("#empresa_sel").html() + ' / ' + $('#sis_electrico').html());
            }
        } else {
            $("#SerieSeleccionada").html($("#empresa_sel").html());
        }
    } else {
        $("#SerieSeleccionada").html('');
    }


}

function LimpiarEmpresa() {
    //zoomExtend();
    clearAll();
    $("#empresa_sel").html('');
    $('#empresa_codigo').html('');
    $('#empresa_codigoVNR').html('');
    $('#empresa_sel_usu').html('');
    $('#empresa_sel_red').html('');
    $('#empresa_sel_red_num').html('');

    $('#empresa_sumProDentro').html('');
    $('#empresa_sumNorDentro').html('');
    $('#empresa_sumProFuera').html('');
    $('#empresa_sumNorFuera').html('');

    $("#DetalleEmpresaSeleccionada").css("display", "none");
    $("#GraficoBarrasEmpresas").css("display", "block");
    $("#DetalleSAIFIEmpresaSeleccionada").css("display", "none");
    $("#DetalleSAIDIEmpresaSeleccionada").css("display", "none");

    LimpiarSistemaElectrico();
    LimpiarAlimentador();
    ActualizarTituloSeguimiento();

    //$("#GraficoSistemaElectrico1").css("display", "block");
    //$("#GraficoSistemaElectrico2").css("display", "block");
    //$("#DetalleSistemaElectricoSeleccionado").css("display", "none");
}

function ActivarControlesEmpresa() {
    $("#DetalleEmpresaSeleccionada").css("display", "block");
    $("#GraficoBarrasEmpresas").css("display", "none");
    $("#DetalleSAIFIEmpresaSeleccionada").css("display", "block");
    $("#DetalleSAIDIEmpresaSeleccionada").css("display", "block");
}

function LimpiarSistemaElectrico() {
    clearAll();
    $('#sis_electrico').html('');
    $("#sis_electrico_codigo").html('');
    $("#sis_electrico_usu").html('');
    $("#sis_electrico_sector_tipico").html('');
    $("#sis_electrico_red").html('');
    //$("#sis_electrico_red_num").html('');

    $("#GraficoSistemaElectrico1").css("display", "block");
    $("#GraficoSistemaElectrico2").css("display", "block");

    $("#DetalleSistemaElectricoSeleccionado").css("display", "none");
    $("#GraficoSistemaElectricoSeleccionado1").css("display", "none");
    $("#GraficoSistemaElectricoSeleccionado2").css("display", "none");
    $("#GraficoSistemaElectricoSeleccionado3").css("display", "none");
    $("#GraficoSistemaElectricoSeleccionado4").css("display", "none");
    $("#GraficoSistemaElectricoSeleccionado5").css("display", "none");
    $("#GraficoSistemaElectricoSeleccionado6").css("display", "none");
    $("#GraficoSistemaElectricoSeleccionado7").css("display", "none");
    $("#GraficoSistemaElectricoSeleccionado8").css("display", "none");
    $("#GraficoSistemaElectricoSeleccionado9").css("display", "none");
    $("#GraficoSistemaElectricoSeleccionado10").css("display", "none");
    $("#GraficoSistemaElectricoSeleccionado11").css("display", "none");
    $("#GraficoSistemaElectricoSeleccionado12").css("display", "none");
    $("#GraficoSistemaElectricoSeleccionado13").css("display", "none");

    ActualizarTituloSeguimiento();
    LimpiarAlimentador();
}


function ActivarControlesSistemaElectricoSeleccionado() {

    //$("#GraficoSistemaElectrico1").css("display", "block");
    //$("#GraficoSistemaElectrico2").css("display", "block"); 

    //alert($('#sis_electrico').html());
    if ($('#sis_electrico').html().length > 0) {
        var tipo = $('#serieSE').val();
        if (tipo == 'MT') {
            $("#DetalleSistemaElectricoSeleccionado").css("display", "block");
            $("#GraficoSistemaElectricoSeleccionado1").css("display", "block");
            $("#GraficoSistemaElectricoSeleccionado2").css("display", "block");

            $("#GraficoSistemaElectricoSeleccionado3").css("display", "block");
            $("#GraficoSistemaElectricoSeleccionado4").css("display", "block");
            $("#GraficoSistemaElectricoSeleccionado5").css("display", "block");
            $("#GraficoSistemaElectricoSeleccionado6").css("display", "block");
            $("#GraficoSistemaElectricoSeleccionado7").css("display", "block");
            $("#GraficoSistemaElectricoSeleccionado8").css("display", "block");
            $("#GraficoSistemaElectricoSeleccionado9").css("display", "block");
            $("#GraficoSistemaElectricoSeleccionado10").css("display", "block");
            $("#GraficoSistemaElectricoSeleccionado11").css("display", "block");
            $("#GraficoSistemaElectricoSeleccionado12").css("display", "none");
            $("#GraficoSistemaElectricoSeleccionado13").css("display", "block");

        } else {
            $("#DetalleSistemaElectricoSeleccionado").css("display", "block");
            $("#GraficoSistemaElectricoSeleccionado1").css("display", "block");
            $("#GraficoSistemaElectricoSeleccionado2").css("display", "block");
            $("#GraficoSistemaElectricoSeleccionado3").css("display", "none");
            $("#GraficoSistemaElectricoSeleccionado4").css("display", "none");
            $("#GraficoSistemaElectricoSeleccionado5").css("display", "none");
            $("#GraficoSistemaElectricoSeleccionado6").css("display", "none");
            $("#GraficoSistemaElectricoSeleccionado7").css("display", "none");
            $("#GraficoSistemaElectricoSeleccionado8").css("display", "none");
            $("#GraficoSistemaElectricoSeleccionado9").css("display", "none");
            $("#GraficoSistemaElectricoSeleccionado10").css("display", "none");
            $("#GraficoSistemaElectricoSeleccionado11").css("display", "none");
            $("#GraficoSistemaElectricoSeleccionado12").css("display", "none");
            $("#GraficoSistemaElectricoSeleccionado13").css("display", "block");

        }

    }

}

function cargarEmpresa(id) {
    LimpiarEmpresa();
    var CodigoEmpresa = ''
    console.log('cargarEmpresa');
    console.log($('#select-anio').val());
    var p_anio = $('#select-anio').val();
    $.ajax({
        type: 'POST',
        url: 'ServicioVisorInterrupciones.asmx/EmpresaListarxIDEmpresa',
        data: "{pIDEmpresa:'" + id + "'}",
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (result) {
            var dataSAIFI_DIS = [], dataSAIFI_TRA = [], dataSAIFI_GEN = [],
                dataSAIDI_DIS = [], dataSAIDI_TRA = [], dataSAIDI_GEN = [], dataPER = [];
            var max = 0, min = 0;
            var per = 0;
            var NombreEmpresa = "";
            //var CodigoEmpresa = "";
            var NumUsuarios = 0;
            var KmRedes = 0;
            var SUM_MT_DENTRO_ZC = "";
            var SUM_MT_FUERA_ZC = "";
            var SUM_BT_DENTRO_ZC = "";
            var SUM_BT_FUERA_ZC = "";
            $.each(result.d, function (i, feature) {
                per = parseInt(feature.PERIODO);
                dataPER.push(per);
                dataSAIFI_DIS.push(feature.SAIFI_DIS);
                dataSAIFI_TRA.push(feature.SAIFI_TRA);
                dataSAIFI_GEN.push(feature.SAIFI_GEN);
                dataSAIDI_DIS.push(feature.SAIDI_DIS);
                dataSAIDI_TRA.push(feature.SAIDI_TRA);
                dataSAIDI_GEN.push(feature.SAIDI_GEN);

                if (max == 0 || max < per) { max = per; }
                if (min == 0 || min > per) { min = per; }
                if (p_anio == per) {

                    NombreEmpresa = feature.NOMBRE;
                    CodigoEmpresa = feature.ID_EMPRESA;
                    NumUsuarios = feature.NUMERO_USUARIOS;
                    KmRedes = feature.KILOMETRO_REDES;
                    id = feature.ID_EMPRESA;

                    SUM_MT_DENTRO_ZC = feature.SUM_MT_DENTRO_ZC;
                    SUM_MT_FUERA_ZC = feature.SUM_MT_FUERA_ZC;
                    SUM_BT_DENTRO_ZC = feature.SUM_BT_DENTRO_ZC;
                    SUM_BT_FUERA_ZC = feature.SUM_BT_FUERA_ZC;

                }
            });

            ActivarControlesEmpresa();
            ActivarTab(2);

            $("#empresa_sel").html(NombreEmpresa);

            ActualizarTituloSeguimiento();

            $("#empresa_codigo").html(CodigoEmpresa);
            $("#empresa_sel_usu").html(NumUsuarios);

            $('#emp_SUM_MT_DENTRO_ZC').html(SUM_MT_DENTRO_ZC);
            $('#emp_SUM_MT_FUERA_ZC').html(SUM_MT_FUERA_ZC);
            $('#emp_SUM_BT_DENTRO_ZC').html(SUM_BT_DENTRO_ZC);
            $('#emp_SUM_BT_FUERA_ZC').html(SUM_BT_FUERA_ZC);


            $('#chart-saifi').highcharts({
                chart: {
                    type: 'column',
                    margin: 75,
                },
                exporting: {
                    tableCaption: p_empresa + ' SAIFI (' + min + ' - ' + max + ')',
                },
                title: {
                    text: p_empresa
                },
                subtitle: {
                    text: 'SAIFI (' + min + " - " + max + ")"
                },
                tooltip: {
                    headerFormat: '<b>{point.x}</b><br/>',
                    pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                },
                plotOptions: {
                    column: {
                        depth: 25,
                        stacking: 'normal',
                        depth: 25,
                        dataLabels: {
                            enabled: true,
                            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                        }
                    }
                },
                xAxis: {
                    title: {
                        text: 'Año',
                        x: -1000
                    },
                    categories: dataPER
                },
                yAxis: {
                    title: {
                        text: 'SAIFI (N° Interrup./Año)'
                    },
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                        }
                    }
                },
                series: [{
                    name: 'Distribución',
                    data: dataSAIFI_DIS,
                    borderWidth: 0
                }, {
                    name: 'Transmisión',
                    data: dataSAIFI_TRA,
                    borderWidth: 0
                }, {
                    name: 'Generación',
                    data: dataSAIFI_GEN,
                    borderWidth: 0
                }]
            });


            $('#chart-saidi').highcharts({
                chart: {
                    type: 'column',
                    margin: 75,
                },
                exporting: {
                    tableCaption: p_empresa + ' SAIDI (' + min + ' - ' + max + ')',
                },
                title: {
                    text: p_empresa
                },
                subtitle: {
                    text: 'SAIDI (' + min + " - " + max + ")"
                },
                tooltip: {
                    headerFormat: '<b>{point.x}</b><br/>',
                    pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                },
                plotOptions: {
                    column: {
                        depth: 25,
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true,
                            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                        }
                    }
                },
                xAxis: {
                    title: {
                        text: 'Año',
                        x: -1000
                    },
                    categories: dataPER
                },
                yAxis: {
                    title: {
                        text: 'SAIDI (Horas/Año)'
                    },
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                        }
                    }
                },
                series: [{
                    name: 'Distribución',
                    data: dataSAIDI_DIS,
                    borderWidth: 0
                }, {
                    name: 'Transmisión',
                    data: dataSAIDI_TRA,
                    borderWidth: 0
                }, {
                    name: 'Generación',
                    data: dataSAIDI_GEN,
                    borderWidth: 0
                }]
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('jqXHR:');
            console.log(jqXHR);
            console.log('textStatus:');
            console.log(textStatus);
            console.log('errorThrown:');
            console.log(errorThrown);
        }
    }).done(function (data) {
        p_id_emp = CodigoEmpresa;
        $.ajax({
            type: 'POST',
            url: 'ServicioVisorInterrupciones.asmx/EmpresaMensualListarxPeriodo',
            data: "{pIDEmpresa:'" + CodigoEmpresa + "', pPeriodo:'" + p_anio + "'}",
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (result) {
                var dataSAIFI_DIS = [], dataSAIFI_TRA = [], dataSAIFI_GEN = [],
                    dataSAIDI_DIS = [], dataSAIDI_TRA = [], dataSAIDI_GEN = [];
                var data = result.d[0];
                var mes = "";
                for (i = 1; i < 13; i++) {
                    if (i < 10)
                        mes = "0" + i;
                    else
                        mes = i;
                    dataSAIFI_DIS.push(data['SAIFI_DIS_M' + mes]);
                    dataSAIFI_TRA.push(data['SAIFI_TRA_M' + mes]);
                    dataSAIFI_GEN.push(data['SAIFI_GEN_M' + mes]);
                    dataSAIDI_DIS.push(data['SAIDI_DIS_M' + mes]);
                    dataSAIDI_TRA.push(data['SAIDI_TRA_M' + mes]);
                    dataSAIDI_GEN.push(data['SAIDI_GEN_M' + mes]);
                }

                $('#chart-saifi-mensual').highcharts({
                    chart: {
                        type: 'column',
                        margin: 75,
                    },
                    exporting: {
                        tableCaption: p_empresa + ' SAIFI (' + p_anio + ')',
                    },
                    title: {
                        text: p_empresa
                    },
                    subtitle: {
                        text: 'SAIFI (' + p_anio + ")"
                    },
                    tooltip: {
                        headerFormat: '<b>{point.x}</b><br/>',
                        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                    },
                    plotOptions: {
                        column: {
                            depth: 25,
                            stacking: 'normal',
                            depth: 25,
                            dataLabels: {
                                enabled: true,
                                color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                            }
                        }
                    },
                    xAxis: {
                        title: {
                            text: 'Mes',
                            x: -1000
                        },
                        categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic']
                    },
                    yAxis: {
                        title: {
                            text: 'SAIFI (N° Interrup./Año)'
                        },
                        stackLabels: {
                            enabled: true,
                            style: {
                                fontWeight: 'bold',
                                color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                            }
                        }
                    },
                    series: [{
                        name: 'Distribución',
                        data: dataSAIFI_DIS,
                        borderWidth: 0
                    }, {
                        name: 'Transmisión',
                        data: dataSAIFI_TRA,
                        borderWidth: 0
                    }, {
                        name: 'Generación',
                        data: dataSAIFI_GEN,
                        borderWidth: 0
                    }]
                });

                $('#chart-saidi-mensual').highcharts({
                    chart: {
                        type: 'column',
                        margin: 75,
                    },
                    exporting: {
                        tableCaption: p_empresa + ' SAIDI (' + p_anio + ')',
                    },
                    title: {
                        text: p_empresa
                    },
                    subtitle: {
                        text: 'SAIDI (' + p_anio + ")"
                    },
                    tooltip: {
                        headerFormat: '<b>{point.x}</b><br/>',
                        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                    },
                    plotOptions: {
                        column: {
                            depth: 25,
                            stacking: 'normal',
                            depth: 25,
                            dataLabels: {
                                enabled: true,
                                color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                            }
                        }
                    },
                    xAxis: {
                        title: {
                            text: 'Mes',
                            x: -1000
                        },
                        categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic']
                    },
                    yAxis: {
                        title: {
                            text: 'SAIDI (Horas/Año)'
                        },
                        stackLabels: {
                            enabled: true,
                            style: {
                                fontWeight: 'bold',
                                color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                            }
                        }
                    },
                    series: [{
                        name: 'Distribución',
                        data: dataSAIDI_DIS,
                        borderWidth: 0
                    }, {
                        name: 'Transmisión',
                        data: dataSAIDI_TRA,
                        borderWidth: 0
                    }, {
                        name: 'Generación',
                        data: dataSAIDI_GEN,
                        borderWidth: 0
                    }]
                });

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('jqXHR:');
                console.log(jqXHR);
                console.log('textStatus:');
                console.log(textStatus);
                console.log('errorThrown:');
                console.log(errorThrown);
            }
        });

        if($("#TipoUsuario").val()!='PUBLIC'){
            //SISTEMAS ELECTRICOS-------------------------------------------------
            $.ajax({
            type: 'POST',
            url: 'ServicioVisorInterrupciones.asmx/SisElectricoListarxPeriodo',
            data: "{pIDEmpresa:'" + CodigoEmpresa + "', pPeriodo:'" + p_anio + "'}",
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (result) {
                var sistemas_SAIFI = [], sistemas_SAIDI = [];
                var dataSAIFIProg = [], dataSAIDIProg = [];
                var dataSAIFINoProg = [], dataSAIDINoProg = [];
                var dataSECTOR_TIPICO_SAIFI = [], dataSECTOR_TIPICO_SAIDI = [];
                var ii = 0;
                var serie = {};
                seriesSE1 = [];
                seriesSE2 = [];
                $.each(result.d, function (i, feature) {
                    sistemas_SAIFI.push(feature.NOMBRE + ' - ' + feature.ID_SIS_ELECTRICO);
                    sistemas_SAIDI[feature.ORDEN_STSAIDI] = feature.NOMBRE + ' - ' + feature.ID_SIS_ELECTRICO;


                    x_SAIFI = Math.round(feature.SAIFI_MT * 100) / 100;
                    x_SAIDI = Math.round(feature.SAIDI_MT * 100) / 100;
                    serie = { colorByPoint: false, color: '#ff5733', name: feature.NOMBRE + ' - ' + feature.ID_SIS_ELECTRICO, data: [{ x: x_SAIFI, y: x_SAIDI, idempresa: feature.ID_EMPRESA, value: feature.ID_SIS_ELECTRICO, name: feature.ID_SIS_ELECTRICO }], marker: { symbol: cadeSym[ii][0] }, icon: cadeSym[ii][1] };
                    seriesSE1.push(serie);


                    x_SAIFI = Math.round(feature.SAIFI_PRO * 100) / 100;
                    x_SAIDI = Math.round(feature.SAIDI_PRO * 100) / 100;
                    serie = { colorByPoint: false, color: '#FFB233', name: feature.NOMBRE + ' - ' + feature.ID_SIS_ELECTRICO, data: [{ x: x_SAIFI, y: x_SAIDI, idempresa: feature.ID_EMPRESA, value: feature.ID_SIS_ELECTRICO, name: feature.ID_SIS_ELECTRICO }], marker: { symbol: cadeSym[ii][0] }, icon: cadeSym[ii][1] };
                    seriesSE2.push(serie);


                    x_SAIFIProg = Math.round((feature.SAIFI_MT - feature.SAIFI_PRO) * 100) / 100;
                    x_SAIDIProg = Math.round((feature.SAIDI_MT - feature.SAIDI_PRO) * 100) / 100;
                    x_SAIFINoProg = Math.round(feature.SAIFI_PRO * 100) / 100;
                    x_SAIDINoProg = Math.round(feature.SAIDI_PRO * 100) / 100;
                    dataSAIFIProg.push(x_SAIFIProg);
                    dataSAIFINoProg.push(x_SAIFINoProg);
                    dataSECTOR_TIPICO_SAIFI.push({ y: feature.SECTOR_TIPICO_SAIFI, sectorTipico: feature.SECTOR_TIPICO });

                    dataSAIDIProg[feature.ORDEN_STSAIDI] = x_SAIDIProg;
                    dataSAIDINoProg[feature.ORDEN_STSAIDI] = x_SAIDINoProg;
                    dataSECTOR_TIPICO_SAIDI[feature.ORDEN_STSAIDI] = { y: feature.SECTOR_TIPICO_SAIDI, sectorTipico: feature.SECTOR_TIPICO };
                    //var serie = { name: feature.attributes.COD_SIEL, color: color, data: [{ x: x_SAIFI, y: x_SAIDI, value: feature.attributes.COD_SIEL, name: feature.attributes.COD_SIEL }] };
                    ii++;
                });
                //
                $("#empresa_sel_red_num").html(ii);

                graficarPrincipalSisElectrico();

                //------ETIQUETAS SECTOR TIPICO----PlotBands
                var axiFa = -1, axiF = 1, STF = '0', aSTC_SAIFI = [];
                var axiDa = -1, axiD = 1, STD = '0', aSTC_SAIDI = [];
                for (i = 0; i < dataSECTOR_TIPICO_SAIFI.length; i++) {
                    //SAIFI
                    if (dataSECTOR_TIPICO_SAIFI[i].sectorTipico != STF) {
                        axiFa++;
                        aSTC_SAIFI[axiFa] = { SectorTipico: dataSECTOR_TIPICO_SAIFI[i].sectorTipico, Cantidad: 1 };
                        STF = dataSECTOR_TIPICO_SAIFI[i].sectorTipico;
                        axiF = 1;
                    } else {
                        axiF++;
                        aSTC_SAIFI[axiFa].Cantidad = axiF;
                    }
                    //SAIDI
                    if (dataSECTOR_TIPICO_SAIDI[i].sectorTipico != STD) {
                        axiDa++;
                        aSTC_SAIDI[axiDa] = { SectorTipico: dataSECTOR_TIPICO_SAIDI[i].sectorTipico, Cantidad: 1 };
                        STD = dataSECTOR_TIPICO_SAIDI[i].sectorTipico;
                        axiD = 1;
                    } else {
                        axiD++;
                        aSTC_SAIDI[axiDa].Cantidad = axiD;
                    }
                }

                var dataST_PB_SAIFI = [], auxiCF = -0.5, dataST_PB_SAIDI = [], auxiCD = -0.5;
                for (i = 0; i < aSTC_SAIFI.length; i++) {
                    //SAIFI
                    dataST_PB_SAIFI.push({ from: auxiCF, to: auxiCF + aSTC_SAIFI[i].Cantidad, zIndex: 5, label: { text: 'ST' + aSTC_SAIFI[i].SectorTipico, align: 'right', x: -5, style: { color: '#3498DB', fontWeight: 'bold' } } });
                    dataST_PB_SAIFI.push({ color: '#3498DB', value: auxiCF + aSTC_SAIFI[i].Cantidad, width: 1, dashStyle: 'LongDash', zIndex: 5 })
                    auxiCF = auxiCF + aSTC_SAIFI[i].Cantidad;
                    //SAIDI
                    dataST_PB_SAIDI.push({ from: auxiCD, to: auxiCD + aSTC_SAIDI[i].Cantidad, zIndex: 5, label: { text: 'ST' + aSTC_SAIDI[i].SectorTipico, align: 'right', x: -5, style: { color: '#3498DB', fontWeight: 'bold' } } });
                    dataST_PB_SAIDI.push({ color: '#3498DB', value: auxiCD + aSTC_SAIDI[i].Cantidad, width: 1, dashStyle: 'LongDash', zIndex: 5 })
                    auxiCD = auxiCD + aSTC_SAIDI[i].Cantidad;
                }

                //------------------------------------------

                $('#chart-se-saifi-prog').highcharts({
                    chart: {
                        renderTo: 'chart-se-saifi-prog',
                        type: 'bar'
                    },
                    title: {
                        text: 'SAIFI Programadas y No Programadas'
                    },
                    xAxis: {
                        gridLineWidth: 0,
                        categories: sistemas_SAIFI,
                        title: {
                            text: 'Sis. Eléctrico',
                            x: -1000
                        },
                        plotBands: dataST_PB_SAIFI
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'SAIFI'
                        }
                    },
                    legend: {
                        reversed: true
                    },
                    plotOptions: {
                        series: {
                            stacking: 'normal'
                        }
                    },
                    series: [{
                        name: 'Programadas',
                        data: dataSAIFIProg
                    }, {
                        name: 'No programadas',
                        data: dataSAIFINoProg
                    }, {
                        name: 'Tolerancia',
                        type: 'line',
                        step: 'left',
                        data: dataSECTOR_TIPICO_SAIFI,
                        tooltip: {
                            pointFormat: 'Sector Típico: <b>{point.sectorTipico}</b> / Tolerancia: <b>{point.y}</b>'

                        }
                    }
                    ]
                });

                $('#chart-se-saidi-prog').highcharts({
                    chart: {
                        type: 'bar'
                    },
                    title: {
                        text: 'SAIDI Programadas y No Programadas'
                    },
                    xAxis: {
                        gridLineWidth: 0,
                        categories: sistemas_SAIDI,
                        title: {
                            text: 'Sis. Eléctrico',
                            x: -1000
                        }, plotBands: dataST_PB_SAIDI
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'SAIDI (Horas/Mes)'
                        }
                    },
                    legend: {
                        reversed: true
                    },
                    plotOptions: {
                        series: {
                            stacking: 'normal'
                        }
                    },
                    series: [{
                        name: 'Programadas',
                        data: dataSAIDIProg
                    }, {
                        name: 'No programadas',
                        data: dataSAIDINoProg
                    }, {
                        name: 'Tolerancia',
                        type: 'line',
                        step: 'left',
                        data: dataSECTOR_TIPICO_SAIDI,
                        tooltip: {
                            pointFormat: 'Sector Típico: <b>{point.sectorTipico}</b> / Tolerancia: <b>{point.y}</b>'

                        }

                    }]
                });

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('jqXHR:' + jqXHR);
                console.log('textStatus:' + textStatus);
                console.log('errorThrown:' + errorThrown);
            }
        });
            LimpiarSistemaElectrico();
        }

       



    });




}

function graficarPrincipalSisElectrico() {
    console.log('graficarPrincipalSisElectrico');
    console.log(p_anio);
    var series = [];
    p_lsispor = $('#serieSE').val();
    var etiquetaS = '';
    if (p_lsispor == 'MT') {
        series = seriesSE1;
        etiquetaS = 'Media Tensión';
    } else {
        series = seriesSE2;
        etiquetaS = 'Propio';
    }

    $('#chart-se').highcharts({
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        exporting: {
            tableCaption: 'Interrupciones - ' + etiquetaS + p_empresa + ' - Año ' + p_anio,
            buttons: {
                contextButton: {
                    menuItems: ['printChart', 'separator', 'downloadCSV', 'downloadXLS']
                }
            }
        },
        title: {
            text: 'Interrupciones - ' + etiquetaS
        },
        subtitle: {
            text: p_empresa + ' - Año ' + p_anio
        },
        xAxis: {
            title: {
                enabled: true,
                text: 'SAIFI'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: 'SAIDI'
            }
        },
        legend: {
            layout: 'horizontal',
            align: 'left',
            verticalAlign: 'bottom',
            floating: false,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
            borderWidth: 1,
            itemWidth: 215,
            adjustChartSize: true,
            navigation: { enabled: true }

        },
        plotOptions: {
            series: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function () {
                            MostrarEstadisticoSistemaElectrico(this.options.value, this.options.idempresa);
                            //p_cod_se = this.options.value;
                            //buscarCapaSE(p_cod_se);
                            //cargarSistemaElectrico(this.options.idempresa, this.options.value);

                        }
                    }
                }
            },
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    valueDecimals: 2,
                    useHTML: true,
                    pointFormat: '{point.x} SAIFI, {point.y} SAIDI'
                }
            }
        },
        series: series
    });

    ActivarControlesSistemaElectricoSeleccionado();
    if (p_cod_se.length > 0 && p_id_emp.length > 0) {
        cargarSistemaElectrico(p_id_emp, p_cod_se);
    }

}

function cargarSistemaElectrico(pIDEmpresa, pIDSisElectrico) {
	
    //alert(pIDEmpresa);
    //LimpiarSistemaElectrico();
    LimpiarTablaSumiALIM();

    $('#sis_electrico').html('--');
    $('#sis_electrico_codigo').html('');
    $('#sis_electrico_usu').html('');
    $('#sis_electrico_red').html('');
    //$('#sis_electrico_red_num').html('');
    $('#sis_electrico_sector_tipico').html('');

    $('#sis_electrico_sumProDentro').html('');
    $('#sis_electrico_sumNorDentro').html('');
    $('#sis_electrico_sumProFuera').html('');
    $('#sis_electrico_sumNorFuera').html('');

    var p_anio = $('#select-anio').val();
    var p_tipo = $('#serieSE').val();
    $.ajax({
        type: 'POST',
        url: 'ServicioVisorInterrupciones.asmx/SisElectricoListarxIDSisElectrico',
        data: "{pIDEmpresa:'" + pIDEmpresa + "', pIDSisElectrico:'" + pIDSisElectrico + "', pTipo:'" + p_tipo + "'}",
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (result) {
            var dataSAIFI = [], dataSAIDI = [], dataPER = [], dataSAIFIMensual = [], dataSAIDIMensual = [];
            var max = 0, min = 0;
            var per = 0;
            var NombreSisElectrico = "";
            var NumUsuarios = 0;
            var KmRedes = 0;
            var SectorTipico = "";
            //---------------------
            var periodos = [];
            var dataSAIFIProg = [], dataSAIDIProg = [];
            var dataSAIFINoProg = [], dataSAIDINoProg = [];
            var SAIFIProgAnioSel = 0, SAIDIProgAnioSel = 0;
            var SAIFINoProgAnioSel = 0, SAIDINoProgAnioSel = 0;
            //----------------------
            var SAIFI_DISAnioSel = 0, SAIFI_TRAAnioSel = 0, SAIFI_GENAnioSel = 0;
            var SAIDI_DISAnioSel = 0, SAIDI_TRAAnioSel = 0, SAIDI_GENAnioSel = 0;
            var dataSAIFI_DIS = [], dataSAIFI_TRA = [], dataSAIFI_GEN = [];
            var dataSAIDI_DIS = [], dataSAIDI_TRA = [], dataSAIDI_GEN = [];
            //----------------------
            var SAIFI_RESP_OTRA_EEAnioSel = 0, SAIFI_RESP_FEN_NATAnioSel = 0, SAIFI_RESP_TERCEROAnioSel = 0, SAIFI_RESP_PROPIAAnioSel = 0;
            var SAIDI_RESP_OTRA_EEAnioSel = 0, SAIDI_RESP_FEN_NATAnioSel = 0, SAIDI_RESP_TERCEROAnioSel = 0, SAIDI_RESP_PROPIAAnioSel = 0;
            var dataSAIFI_RESP_OTRA_EE = [], dataSAIFI_RESP_FEN_NAT = [], dataSAIFI_RESP_TERCERO = [], dataSAIFI_RESP_PROPIA = [];
            var dataSAIDI_RESP_OTRA_EE = [], dataSAIDI_RESP_FEN_NAT = [], dataSAIDI_RESP_TERCERO = [], dataSAIDI_RESP_PROPIA = [];

            var SUM_MT_DENTRO_ZC = "";
            var SUM_MT_FUERA_ZC = "";
            var SUM_BT_DENTRO_ZC = "";
            var SUM_BT_FUERA_ZC = "";

            var dataPRINC_CAUSAS_INTERRUP_ANUAL = []; //----

            $.each(result.d, function (i, feature) {
                NombreSisElectrico = feature.NOMBRE;
                per = parseInt(feature.PERIODO);
                dataPER.push(per);
                if (p_tipo == 'MT') {
                    dataSAIFI.push(feature.SAIFI_MT);
                    dataSAIDI.push(feature.SAIDI_MT);
                } else {
                    dataSAIFI.push(feature.SAIFI_PRO);
                    dataSAIDI.push(feature.SAIDI_PRO);
                }
                periodos.push(feature.PERIODO);
                //------------------                
                x_SAIFI = Math.round(feature.SAIFI_MT * 100) / 100;
                x_SAIDI = Math.round(feature.SAIDI_MT * 100) / 100;
                x_SAIFIProg = Math.round((feature.SAIFI_MT - feature.SAIFI_PRO) * 100) / 100;
                x_SAIDIProg = Math.round((feature.SAIDI_MT - feature.SAIDI_PRO) * 100) / 100;
                x_SAIFINoProg = Math.round(feature.SAIFI_PRO * 100) / 100;
                x_SAIDINoProg = Math.round(feature.SAIDI_PRO * 100) / 100;
                dataSAIFIProg.push(x_SAIFIProg);
                dataSAIDIProg.push(x_SAIDIProg);
                dataSAIFINoProg.push(x_SAIFINoProg);
                dataSAIDINoProg.push(x_SAIDINoProg);
                //-------------------
                dataSAIFI_DIS.push(feature.SAIFI_DIS);
                dataSAIFI_TRA.push(feature.SAIFI_TRA);
                dataSAIFI_GEN.push(feature.SAIFI_GEN);
                dataSAIDI_DIS.push(feature.SAIDI_DIS);
                dataSAIDI_TRA.push(feature.SAIDI_TRA);
                dataSAIDI_GEN.push(feature.SAIDI_GEN);
                //-------------------
                dataSAIFI_RESP_OTRA_EE.push(feature.SAIFI_RESP_OTRA_EE);
                dataSAIFI_RESP_FEN_NAT.push(feature.SAIFI_RESP_FEN_NAT);
                dataSAIFI_RESP_TERCERO.push(feature.SAIFI_RESP_TERCERO);
                dataSAIFI_RESP_PROPIA.push(feature.SAIFI_RESP_PROPIA);
                dataSAIDI_RESP_OTRA_EE.push(feature.SAIDI_RESP_OTRA_EE);
                dataSAIDI_RESP_FEN_NAT.push(feature.SAIDI_RESP_FEN_NAT);
                dataSAIDI_RESP_TERCERO.push(feature.SAIDI_RESP_TERCERO);
                dataSAIDI_RESP_PROPIA.push(feature.SAIDI_RESP_PROPIA);

                dataPRINC_CAUSAS_INTERRUP_ANUAL.push(eval(feature.PRINC_CAUSAS_INTERRUP));//---

                //console.log(feature.SAIFI_DIS);
                if (max == 0 || max < per) { max = per; }
                if (min == 0 || min > per) { min = per; }
                if (p_anio == per) {
                    NombreSisElectrico = feature.NOMBRE;
                    NumUsuarios = feature.NUMERO_USUARIOS;
                    KmRedes = feature.KILOMETRO_REDES;
                    SectorTipico = feature.SECTOR_TIPICO;
                    SAIFIProgAnioSel = x_SAIFIProg;
                    SAIDIProgAnioSel = x_SAIDIProg;
                    SAIFINoProgAnioSel = x_SAIFINoProg;
                    SAIDINoProgAnioSel = x_SAIDINoProg;
                    SAIFI_DISAnioSel = feature.SAIFI_DIS;
                    SAIFI_TRAAnioSel = feature.SAIFI_TRA;
                    SAIFI_GENAnioSel = feature.SAIFI_GEN;
                    SAIDI_DISAnioSel = feature.SAIDI_DIS;
                    SAIDI_TRAAnioSel = feature.SAIDI_TRA;
                    SAIDI_GENAnioSel = feature.SAIDI_GEN;
                    SAIFI_RESP_OTRA_EEAnioSel = feature.SAIFI_RESP_OTRA_EE;
                    SAIFI_RESP_FEN_NATAnioSel = feature.SAIFI_RESP_FEN_NAT;
                    SAIFI_RESP_TERCEROAnioSel = feature.SAIFI_RESP_TERCERO;
                    SAIFI_RESP_PROPIAAnioSel = feature.SAIFI_RESP_PROPIA;
                    SAIDI_RESP_OTRA_EEAnioSel = feature.SAIDI_RESP_OTRA_EE;
                    SAIDI_RESP_FEN_NATAnioSel = feature.SAIDI_RESP_FEN_NAT;
                    SAIDI_RESP_TERCEROAnioSel = feature.SAIDI_RESP_TERCERO;
                    SAIDI_RESP_PROPIAAnioSel = feature.SAIDI_RESP_PROPIA;
                    dataPRINC_CAUSAS_INTERRUP = eval(feature.PRINC_CAUSAS_INTERRUP);

                    SUM_MT_DENTRO_ZC = feature.SUM_MT_DENTRO_ZC;
                    SUM_MT_FUERA_ZC = feature.SUM_MT_FUERA_ZC;
                    SUM_BT_DENTRO_ZC = feature.SUM_BT_DENTRO_ZC;
                    SUM_BT_FUERA_ZC = feature.SUM_BT_FUERA_ZC;

                    //Mensual por SE
                    for (i = 1; i < 13; i++) {
                        if (i < 10){mes = "0" + i;} else {mes = i;}
                        if (p_tipo == 'MT') {
                            dataSAIFIMensual.push(feature['SAIFI_MT_M' + mes]);
                            dataSAIDIMensual.push(feature['SAIDI_MT_M' + mes]);
                        } else {
                            dataSAIFIMensual.push(feature['SAIFI_PRO_M' + mes]);
                            dataSAIDIMensual.push(feature['SAIDI_PRO_M' + mes]);
                        }
                    }

                }
            });

            ActivarControlesSistemaElectricoSeleccionado();

            $('#sis_electrico').html(NombreSisElectrico);

            ActualizarTituloSeguimiento();

            $('#sis_electrico_codigo').html(pIDSisElectrico);
            $('#sis_electrico_usu').html(NumUsuarios);
            //$('#sis_electrico_red').html(KmRedes);
            $('#sis_electrico_sector_tipico').html(SectorTipico);

            $('#sis_SUM_MT_DENTRO_ZC').html(SUM_MT_DENTRO_ZC);
            $('#sis_SUM_MT_FUERA_ZC').html(SUM_MT_FUERA_ZC);
            $('#sis_SUM_BT_DENTRO_ZC').html(SUM_BT_DENTRO_ZC);
            $('#sis_SUM_BT_FUERA_ZC').html(SUM_BT_FUERA_ZC);



            ActivarTab(3);



            //----MT y PROPIO
            $('#chart-se-saifi').highcharts({
                chart: {
                    type: 'column',
                    margin: 75,
                    options3d: {
                        enabled: true,
                        alpha: 10,
                        beta: 25,
                        depth: 70
                    }
                },
                title: {
                    text: NombreSisElectrico
                },
                subtitle: {
                    text: 'SAIFI (' + min + " - " + max + ")"
                },
                exporting: {
                    tableCaption: NombreSisElectrico + ' SAIFI (' + min + " - " + max + ")"
                },
                plotOptions: {
                    column: {
                        depth: 25
                    }
                },
                xAxis: {
                    title: {
                        text: 'Año',
                        x: -1000
                    },
                    categories: dataPER
                },
                yAxis: {
                    title: {
                        text: 'SAIFI (N° Interrup./Año)'
                    }
                },
                series: [{
                    name: 'SAIFI',
                    data: dataSAIFI,
                    //color: '#50B432'
                    colorIndex: ($('#serieSE').val() == 'MT' ? 0 : 22)
                }]
            });
            
            $('#chart-se-saidi').highcharts({
                chart: {
                    type: 'column',
                    margin: 75,
                    options3d: {
                        enabled: true,
                        alpha: 10,
                        beta: 25,
                        depth: 70
                    }
                },
                title: {
                    text: NombreSisElectrico
                },
                subtitle: {
                    text: 'SAIDI (' + min + " - " + max + ")"
                },
                exporting: {
                    tableCaption: NombreSisElectrico + ' SAIDI (' + min + " - " + max + ")"
                },
                plotOptions: {
                    column: {
                        depth: 25
                    }
                },
                xAxis: {
                    title: {
                        text: 'Año',
                        x: -1000
                    },
                    categories: dataPER
                },
                yAxis: {
                    title: {
                        text: 'SAIDI (Horas/Año)'
                    }
                },
                series: [{
                    name: 'SAIDI',
                    data: dataSAIDI,
                    colorIndex: ($('#serieSE').val() == 'MT' ? 0 : 22)
                }]
            });

            $('#chart-se-saifi-mensual').highcharts({
                chart: {
                    type: 'column',
                    margin: 75,
                },
                exporting: {
                    tableCaption: NombreSisElectrico + ' SAIFI (' + p_anio + ')',
                },
                title: {
                    text: NombreSisElectrico
                },
                subtitle: {
                    text: 'SAIFI (' + p_anio + ")"
                },
                tooltip: {
                    headerFormat: '<b>{point.x}</b><br/>',
                    pointFormat: '{series.name}: {point.y}'
                },
                plotOptions: {
                    column: {
                        depth: 25,
                        stacking: 'normal'
                    }
                },
                xAxis: {
                    title: {
                        text: 'Mes',
                        x: -1000
                    },
                    categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic']
                },
                yAxis: {
                    title: {
                        text: 'SAIFI (N° Interrup./Mes)'
                    },
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                        }
                    }
                },
                series: [{
                    name: 'SAIFI',
                    data: dataSAIFIMensual,
                    colorIndex: ($('#serieSE').val() == 'MT' ? 0 : 22)
                }]
            });

            $('#chart-se-saidi-mensual').highcharts({
                chart: {
                    type: 'column',
                    margin: 75,
                },
                exporting: {
                    tableCaption: NombreSisElectrico + ' SAIDI (' + p_anio + ')',
                },
                title: {
                    text: NombreSisElectrico
                },
                subtitle: {
                    text: 'SAIDI (' + p_anio + ")"
                },
                tooltip: {
                    headerFormat: '<b>{point.x}</b><br/>',
                    pointFormat: '{series.name}: {point.y}'
                },
                plotOptions: {
                    column: {
                        depth: 25,
                        stacking: 'normal'
                    }
                },
                xAxis: {
                    title: {
                        text: 'Mes',
                        x: -1000
                    },
                    categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic']
                },
                yAxis: {
                    title: {
                        text: 'SAIDI (Horas/Mes)'
                    },
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                        }
                    }
                },
                series: [{
                    name: 'SAIDI',
                    data: dataSAIDIMensual,
                    colorIndex: ($('#serieSE').val() == 'MT' ? 0 : 22)
                }]
            });


            //--------
            //------MT
            $('#chart-se-saifi-prog-anio').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'SAIFI Programada ' + pIDSisElectrico + " - Año " + p_anio
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    name: 'Porcentaje',
                    colorByPoint: true,
                    data: [{
                        name: 'Programado',
                        y: SAIFIProgAnioSel
                    }, {
                        name: 'No programado',
                        y: SAIFINoProgAnioSel
                    }]
                }]
            });

            $('#chart-se-saidi-prog-anio').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'SAIDI Programada ' + pIDSisElectrico + " - Año " + p_anio
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    name: 'Porcentaje',
                    colorByPoint: true,
                    data: [{
                        name: 'Programado',
                        y: SAIDIProgAnioSel
                    }, {
                        name: 'No programado',
                        y: SAIDINoProgAnioSel
                    }]
                }]
            });

            $('#chart-se-saifi-prog-anual').highcharts({
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'SAIFI Programadas y No Programadas - ' + pIDSisElectrico
                },
                xAxis: {
                    title: {
                        text: 'Año',
                        x: -1000
                    },
                    categories: periodos
                },
                exporting: {
                    tableCaption: 'SAIFI Programadas y No Programadas - ' + pIDSisElectrico 
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'SAIFI (N° Interrup./Año)'
                    }
                },
                legend: {
                    reversed: true
                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                },
                series: [{
                    name: 'Programadas',
                    data: dataSAIFIProg
                }, {
                    name: 'No programadas',
                    data: dataSAIFINoProg
                }]
            });

            $('#chart-se-saidi-prog-anual').highcharts({
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'SAIDI Programadas y No programadas - ' + pIDSisElectrico
                },
                xAxis: {
                    title: {
                        text: 'Año',
                        x: -1000
                    },
                    categories: periodos
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'SAIDI (Horas/Año)'
                    }
                },
                legend: {
                    reversed: true
                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                },
                series: [{
                    name: 'Programadas',
                    data: dataSAIDIProg
                }, {
                    name: 'No programadas',
                    data: dataSAIDINoProg
                }]
            });

            $('#chart-se-saifi-evol-anio').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'SAIFI Instalación ' + pIDSisElectrico + " - Año " + p_anio
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    name: 'Porcentaje',
                    colorByPoint: true,
                    data: [{
                        name: 'Generación',
                        y: SAIFI_GENAnioSel
                    }, {
                        name: 'Transmisión',
                        y: SAIFI_TRAAnioSel
                    }, {
                        name: 'Distribución',
                        y: SAIFI_DISAnioSel
                    }]
                }]
            });

            $('#chart-se-saidi-evol-anio').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'SAIDI Instalación ' + pIDSisElectrico + " - Año " + p_anio
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    name: 'Porcentaje',
                    colorByPoint: true,
                    data: [{
                        name: 'Generación',
                        y: SAIDI_GENAnioSel
                    }, {
                        name: 'Transmisión',
                        y: SAIDI_TRAAnioSel
                    }, {
                        name: 'Distribución',
                        y: SAIDI_DISAnioSel
                    }]
                }]
            });

            $('#chart-se-saifi-evol-anual').highcharts({
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'SAIFI Evolución por Instalación - ' + pIDSisElectrico
                },
                xAxis: {
                    title: {
                        text: 'Año',
                        x: -1000
                    },
                    categories: periodos
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'SAIFI (N° Interrup./Año)'
                    }
                },
                legend: {
                    reversed: true
                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                },
                series: [{
                    name: 'Generación',
                    data: dataSAIFI_GEN
                }, {
                    name: 'Transmisión',
                    data: dataSAIFI_TRA
                }, {
                    name: 'Distribución',
                    data: dataSAIFI_DIS
                }]
            });

            $('#chart-se-saidi-evol-anual').highcharts({
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'SAIDI Evolución por Instalación - ' + pIDSisElectrico
                },
                xAxis: {
                    title: {
                        text: 'Año',
                        x: -1000
                    },
                    categories: periodos
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'SAIDI (Horas/Año)'
                    }
                },
                legend: {
                    reversed: true
                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                },
                series: [{
                    name: 'Generación',
                    data: dataSAIDI_GEN
                }, {
                    name: 'Transmisión',
                    data: dataSAIDI_TRA
                }, {
                    name: 'Distribución',
                    data: dataSAIDI_DIS
                }]
            });

            $('#chart-se-saifi-caus-anio').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'SAIFI Responsabilidad ' + pIDSisElectrico + " - Año " + p_anio
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    name: 'Porcentaje',
                    colorByPoint: true,
                    data: [{
                        name: 'Propias',
                        y: SAIFI_RESP_PROPIAAnioSel
                    }, {
                        name: 'Terceros',
                        y: SAIFI_RESP_TERCEROAnioSel
                    }, {
                        name: 'Fen. Natural',
                        y: SAIFI_RESP_FEN_NATAnioSel
                    }, {
                        name: 'Otras EE',
                        y: SAIFI_RESP_OTRA_EEAnioSel
                    }]
                }]
            });

            $('#chart-se-saidi-caus-anio').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'SAIDI Responsabilidad ' + pIDSisElectrico + " - Año " + p_anio
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    name: 'Porcentaje',
                    colorByPoint: true,
                    data: [{
                        name: 'Propias',
                        y: SAIDI_RESP_PROPIAAnioSel
                    }, {
                        name: 'Terceros',
                        y: SAIDI_RESP_TERCEROAnioSel
                    }, {
                        name: 'Fen. Natural',
                        y: SAIDI_RESP_FEN_NATAnioSel
                    }, {
                        name: 'Otras EE',
                        y: SAIDI_RESP_OTRA_EEAnioSel
                    }]
                }]
            });

            $('#chart-se-saifi-caus-anual').highcharts({
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'SAIFI Evolución Responsabilidad - ' + pIDSisElectrico
                },
                xAxis: {
                    title: {
                        text: 'Año',
                        x: -1000
                    },
                    categories: periodos
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'SAIFI (N° Interrup./Año)'
                    }
                },
                legend: {
                    reversed: true
                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                },
                series: [{
                    name: 'Propias',
                    data: dataSAIFI_RESP_PROPIA
                }, {
                    name: 'Terceros',
                    data: dataSAIFI_RESP_TERCERO
                }, {
                    name: 'Fen. Natural',
                    data: dataSAIFI_RESP_FEN_NAT
                }, {
                    name: 'Otras EE',
                    data: dataSAIFI_RESP_OTRA_EE
                }]
            });

            $('#chart-se-saidi-caus-anual').highcharts({
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'SAIDI Evolución Responsabilidad - ' + pIDSisElectrico
                },
                xAxis: {
                    title: {
                        text: 'Año',
                        x: -1000
                    },
                    categories: periodos
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'SAIDI (Horas/Año)'
                    }
                },
                legend: {
                    reversed: true
                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                },
                series: [{
                    name: 'Propias',
                    data: dataSAIDI_RESP_PROPIA
                }, {
                    name: 'Terceros',
                    data: dataSAIDI_RESP_TERCERO
                }, {
                    name: 'Fen. Natural',
                    data: dataSAIDI_RESP_FEN_NAT
                }, {
                    name: 'Otras EE',
                    data: dataSAIDI_RESP_OTRA_EE
                }]
            });
            //-------

            //----MT y PROPIO
            $('#chart-se-saifi-pri-caus-anual').highcharts({
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Evolución Principales Causas de Interrupción - ' + pIDSisElectrico
                },
                xAxis: {
                    categories: periodos
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: ''
                    }
                },
                legend: {
                    reversed: true
                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                },
                series: dataPRINC_CAUSAS_INTERRUP_ANUAL /*[
                            { name: 'Propias', data: dataSAIDI_RESP_PROPIA },
                            { name: 'Terceros', data: dataSAIDI_RESP_TERCERO },
                            { name: 'Fen. Natural', data: dataSAIDI_RESP_FEN_NAT },
                            { name: 'Otras EE',data: dataSAIDI_RESP_OTRA_EE }
                        ]*/
            });

            $('#chart-se-saifi-prin-causas').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Principales Causas de Interrupción ' + pIDSisElectrico + " - Año " + p_anio
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    name: 'Porcentaje',
                    colorByPoint: true,
                    data: dataPRINC_CAUSAS_INTERRUP
                }]
            });
            //----

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('jqXHR:' + jqXHR);
            console.log('textStatus:' + textStatus);
            console.log('errorThrown:' + errorThrown);
        }
    });


    //ALIMENTADORES MT
    $.ajax({
        type: 'POST',
        url: 'ServicioVisorInterrupciones.asmx/AlimentadorMTListarxPeriodo',
        data: "{pIDSisElectrico:'" + pIDSisElectrico + "', pPeriodo:'" + p_anio + "'}",
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (result) {
            var alimentadoresMTCat = [];
            var dataSAIFI_ALI = [], dataSAIDI_ALI = [];
            var dataSAIFI_CSE = [], dataSAIDI_CSE = [];
            ii = 1
            var c = 1;
            var SAIFIOtros5 = 0, SAIDIOtros5 = 0;
            var SAIFIOtros10 = 0, SAIDIOtros10 = 0;
            $.each(result.d, function (i, feature) {
                alimentadoresMTCat.push(feature.ID_ALIMENTADORMT);
                dataSAIFI_ALI.push({ y: feature.CONTRIBUCION_SAIFI_SE, idalim: feature.ID_ALIMENTADORMT, idsistema: feature.ID_SIS_ELECTRICO });
                dataSAIDI_ALI.push({ y: feature.CONTRIBUCION_SAIDI_SE, idalim: feature.ID_ALIMENTADORMT, idsistema: feature.ID_SIS_ELECTRICO });
                SAIFIOtros10 += Number(feature.CONTRIBUCION_SAIFI_SE);
                SAIDIOtros10 += Number(feature.CONTRIBUCION_SAIDI_SE);
                if (c < 6) {
                    dataSAIFI_CSE.push({ name: feature.ID_ALIMENTADORMT, y: feature.CONTRIBUCION_SAIFI_SE, idsistema: feature.ID_SIS_ELECTRICO });
                    dataSAIDI_CSE.push({ name: feature.ID_ALIMENTADORMT, y: feature.CONTRIBUCION_SAIDI_SE, idsistema: feature.ID_SIS_ELECTRICO });
                    c++;
                    SAIFIOtros5 += Number(feature.CONTRIBUCION_SAIFI_SE);
                    SAIDIOtros5 += Number(feature.CONTRIBUCION_SAIDI_SE);
                }
                ii++;
            });

            SAIFIOtros5 = (100 - SAIFIOtros5);
            SAIDIOtros5 = (100 - SAIDIOtros5);

            if (SAIFIOtros5 > 0.5 && result.d.length != 0) {
                console.log(100 - SAIFIOtros5);
                dataSAIFI_CSE.push({ name: 'Otros', y: redondearValor(SAIFIOtros5), idsistema: pIDSisElectrico });
                dataSAIDI_CSE.push({ name: 'Otros', y: redondearValor(SAIDIOtros5), idsistema: pIDSisElectrico });
            }
            SAIFIOtros10 = (100 - SAIFIOtros10);
            SAIDIOtros10 = (100 - SAIDIOtros10);
            if (SAIFIOtros10 > 0.5 && result.d.length != 0) {
                console.log(100 - SAIFIOtros5);
                dataSAIFI_ALI.push({ name: 'Otros', y: redondearValor(SAIFIOtros10), idsistema: pIDSisElectrico });
                dataSAIDI_ALI.push({ name: 'Otros', y: redondearValor(SAIDIOtros10), idsistema: pIDSisElectrico });
            }



            $('#chart-alim-contri-saifi').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Contribución SAIFI al SE ' + pIDSisElectrico + " - Año " + p_anio
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.y}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function () {
                                    MostrarEstadisticoAlimentador(this.name, this.idsistema);
                                    //p_cod_alim = this.name;
                                    //cargarAlimentador(this.idsistema, p_cod_alim);
                                    //buscarCapaAlimentador(p_cod_alim);
                                }
                            }
                        },
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    name: 'Porcentaje',
                    colorByPoint: true,
                    data: dataSAIFI_CSE
                }]
            });

            $('#chart-alim-contri-saidi').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Contribución SAIDI al SE ' + pIDSisElectrico + " - Año " + p_anio
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.y}%</b>'
                },                
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function () {
                                    MostrarEstadisticoAlimentador(this.name, this.idsistema);
                                    //p_cod_alim = this.name;
                                    //cargarAlimentador(this.idsistema, p_cod_alim);
                                }
                            }
                        },
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    name: 'Porcentaje',
                    colorByPoint: true,
                    data: dataSAIDI_CSE
                }]
            });

            $('#chart-res-alim').highcharts({
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Contribución SAIFI y SAIDI al'
                },
                subtitle: {
                    text: 'Sistema Eléctrico - ' + pIDSisElectrico + ' - Año ' + p_anio
                },
                exporting: {
                    tableCaption: 'Contribución SAIFI y SAIDI al Sistema Eléctrico - ' + pIDSisElectrico + ' - Año ' + p_anio
                },
                xAxis: {
                    categories: alimentadoresMTCat,
                    title: {
                        text: 'Alimentador',
                        x: -1000
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.y} %</b>'
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true,
                            format: '{y} %'
                        },
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function () {
                                    MostrarEstadisticoAlimentador(this.name, this.idsistema);
                                    //p_cod_alim = this.idalim;
                                    //cargarAlimentador(this.idsistema, p_cod_alim);
                                }
                            }
                        },
                    }
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'SAIFI',
                    data: dataSAIFI_ALI
                }, {
                    name: 'SAIDI',
                    data: dataSAIDI_ALI
                }]
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('jqXHR:' + jqXHR);
            console.log('textStatus:' + textStatus);
            console.log('errorThrown:' + errorThrown);
        }
    });

    LimpiarAlimentador();
    $("#GraficoSistemaElectrico1").css("display", "none");
    $("#GraficoSistemaElectrico2").css("display", "none");

}


function cargarAlimentador(pIDSisElectrico, pIDAlimentador) {
    //var pIDSisElectrico = '0';
    LimpiarTablaSumiSED();
    if (pIDAlimentador == 'Otros') {
        //Desactivar Tab
        //Eliminar Alimentador seleccionado

        ActivarTab(3);
        LimpiarAlimentador();

    } else {

        var p_anio = $('#select-anio').val();
        $.ajax({
            type: 'POST',
            url: 'ServicioVisorInterrupciones.asmx/AlimentadorObtener',
            data: "{pIDSisElectrico:'" + pIDSisElectrico + "', pIDAlimentradorMT:'" + pIDAlimentador + "', pPeriodo:'" + p_anio + "'}",
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (result) {



                var SUM_MT_DENTRO_ZC = "";
                var SUM_MT_FUERA_ZC = "";
                var SUM_BT_DENTRO_ZC = "";
                var SUM_BT_FUERA_ZC = "";

                SUM_MT_DENTRO_ZC = result.d.SUM_MT_DENTRO_ZC;
                SUM_MT_FUERA_ZC = result.d.SUM_MT_FUERA_ZC;
                SUM_BT_DENTRO_ZC = result.d.SUM_BT_DENTRO_ZC;
                SUM_BT_FUERA_ZC = result.d.SUM_BT_FUERA_ZC;

                $('#alim_SUM_MT_DENTRO_ZC').html(SUM_MT_DENTRO_ZC);
                $('#alim_SUM_MT_FUERA_ZC').html(SUM_MT_FUERA_ZC);
                $('#alim_SUM_BT_DENTRO_ZC').html(SUM_BT_DENTRO_ZC);
                $('#alim_SUM_BT_FUERA_ZC').html(SUM_BT_FUERA_ZC);

                var dataPRINC_CAUSAS_INTERRUP = [];
                dataPRINC_CAUSAS_INTERRUP = eval(result.d.PRINC_CAUSAS_INTERRUP);

                // $("#alim-sumin-mct").html(result.d.SUMINISTRO_MCT);
                $("#alimentador_codigo").html(result.d.ID_ALIMENTADORMT);

                $("#alimentador_Seleccionado").html(result.d.ID_ALIMENTADORMT);
                ActualizarTituloSeguimiento();

                $("#alimentador_usu").html(result.d.NUMERO_USUARIOS);
                //$("#alimentador_red").html('');//----------Llenar con Km de alimentador gis
                $("#alimentador_nivel_tension").html(result.d.NIVEL_TENSION);

                //console.log(result.d.SUMINISTRO_MCT);
                $("#chart-alim-prin-causas").css("display", "block");


                var JSONSumi = JSON.parse(result.d.SUMINISTRO_MCT);
                //var jsSumi =sumi.replace(/\\u0027/g, "'");   
                if (jQuery.isEmptyObject(JSONSumi.table)) {
                    $("#chart-alim-sumin-mct").hide();
                    $("#alim-sumin-mct").html('');
                    $('#alim-sum-urbano').hide();
                    $('#alim-sum-rural').hide();
                } else {
                    $("#GraficoAlimentadorMTSeleccionado3").show();
                    $("#GraficoAlimentadorMTSeleccionado5").show();
                    $("#alim-sumin-mct").html(tablaSuminitroMC(JSONSumi.table, pIDAlimentador));

                    //objUrbano = JSON.parse(result.d.URBANO);
                    $('#TablaASSUrbano tbody').html('');
                    $.each(JSONSumi.table_det.Urbano, function (i, row) {
                        rr = '<tr>' +
                            '<td style = "width: 20%!important;">' + row.SUMI + '</td>' +
                            '<td style = "width: 15%!important;">' + row.F1 + '</td>' +
                            '<td style = "width: 15%!important;">' + row.F2 + '</td>' +
                            '<td style = "width: 15%!important;">' + row.F3 + '</td>' +
                            '<td style = "width: 15%!important;">' + row.F4 + '</td>' +
                            '<td style = "width: 20%!important;">' + row.MC + '</td>' +
                            '</tr>'
                        $('#TablaASSUrbano tbody').append(rr);
                    });

                    if (JSONSumi.table_det.hasOwnProperty("Urbano")) {
                        if (JSONSumi.table_det.Urbano.length > 0) {
                            $('#alim-sum-urbano').show();
                        } else {
                            $('#alim-sum-urbano').hide();
                        }
                    } else {
                        $('#alim-sum-urbano').hide();
                    }


                    $('#TablaASSRural tbody').html('');
                    $.each(JSONSumi.table_det.Rural, function (i, row) {
                        rr = '<tr>' +
                            '<td style = "width: 20%!important;">' + row.SUMI + '</td>' +
                            '<td style = "width: 15%!important;">' + row.F1 + '</td>' +
                            '<td style = "width: 15%!important;">' + row.F2 + '</td>' +
                            '<td style = "width: 15%!important;">' + row.F3 + '</td>' +
                            '<td style = "width: 15%!important;">' + row.F4 + '</td>' +
                            '<td style = "width: 20%!important;">' + row.MC + '</td>' +
                            '</tr>'
                        $('#TablaASSRural tbody').append(rr);
                    });


                    if (JSONSumi.table_det.hasOwnProperty("Rural")) {
                        if (JSONSumi.table_det.Rural.length > 0) {
                            $('#alim-sum-rural').show();
                        } else {
                            $('#alim-sum-rural').hide();
                        }
                    } else {
                        $('#alim-sum-rural').hide();
                    }


                    $("#chart-alim-sumin-mct").show();
                    $('#chart-alim-sumin-mct').highcharts({
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'Suministros MT con Mala Calidad de Tensión - ALIM:' + pIDAlimentador
                        },
                        xAxis: {
                            categories: JSONSumi.chart.categories //['Urbano', 'Rural']
                        },
                        yAxis: {
                            min: 0,
                            allowDecimals: false,
                            title: {
                                text: 'Suministros con Mala Calidad'
                            },
                            stackLabels: {
                                enabled: true,
                                style: {
                                    fontWeight: 'bold',
                                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                                }
                            }
                        },
                        tooltip: {
                            headerFormat: '<b>{point.x}</b><br/>',
                            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                        },
                        plotOptions: {
                            column: {
                                stacking: 'normal',
                                dataLabels: {
                                    enabled: true,
                                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                                }
                                , cursor: 'pointer',
                                point: {
                                    events: {
                                        click: function () {
                                            buscarCapaSuministrosMTMalEstado(this.data);
                                        }
                                    }
                                }
                            }
                        },
                        series: JSONSumi.chart.series /*[{name: 'Sobretensión',data: [5, 3]}, {name: 'Subtensión',data: [2, 2]}]*/
                    });
                }



                $('#chart-alim-prin-causas').highcharts({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: 'Principales Causas de Interrupción ' + pIDAlimentador + " - Año " + p_anio
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: false
                            },
                            showInLegend: true
                        }
                    },
                    series: [{
                        name: 'Porcentaje',
                        colorByPoint: true,
                        data: dataPRINC_CAUSAS_INTERRUP
                    }]
                });

                ActivarTab(4);
                //Subest. Distribución------------------------------
                $('#chart-sed').highcharts({
                    chart: {
                        type: 'column',
                        margin: 75,
                    },
                    exporting: {
                        tableCaption: 'SED',
                    },
                    title: {
                        text: 'SEDs con Suministros de Mala Calidad'
                    },
                    subtitle: {
                        text: 'Alimentador - ' + pIDAlimentador + ' / Sistema Eléctrico: ' + pIDSisElectrico
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        series: {
                            borderWidth: 0,
                            dataLabels: {
                                enabled: true,
                            },
                            cursor: 'pointer',
                            point: {
                                events: {
                                    click: function () {
                                        cargarSubDistribucion(this.idsistema, this.idalim, this.tipo);
                                    }
                                }
                            }
                        }
                    },
                    xAxis: {
                        title: {
                            text: 'SED',
                            x: -1000
                        },
                        type: 'category'
                    },
                    yAxis: {
                        title: {
                            text: 'Cantidad SED'
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:11px">Subestaciones de Distribución</span><br>',
                        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}<br/>'
                    },
                    series: [{
                        name: 'Cantidad',
                        colorByPoint: true,
                        data:
                        [{
                            name: 'Total',
                            y: result.d.CANT_SUMINISTRO_TOTAL,
                            idalim: pIDAlimentador,
                            idsistema: pIDSisElectrico,
                            tipo: 'TO',
                            borderWidth: 0
                        }, {
                            name: 'Mala Calidad',
                            y: result.d.CANT_SUMINISTRO_MCT,
                            idalim: pIDAlimentador,
                            idsistema: pIDSisElectrico,
                            tipo: 'MC',
                            borderWidth: 0
                        }]
                    }]
                });


                $("#DetalleAlimentadorMTSeleccionado").show();
                $("#GraficoAlimentadorMTSeleccionado1").show();
                $("#GraficoAlimentadorMTSeleccionado2").show();

                $("#GraficoAlimentadorMTSeleccionado4").show();




            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('jqXHR:' + jqXHR);
                console.log('textStatus:' + textStatus);
                console.log('errorThrown:' + errorThrown);
            }
        });

    }
}

function LimpiarAlimentador() {

    clearAll();
    $("#alimentador_Seleccionado").html('');
    $("#alimentador_codigo").html('');
    $("#alimentador_usu").html('');
    $("#alimentador_red").html('');
    $("#alimentador_nivel_tension").html('');
    //$("#sis_electrico_red_num").html('');
    $("#chart-alim-prin-causas").css("display", "none");

    $("#DetalleAlimentadorMTSeleccionado").hide();
    $("#GraficoAlimentadorMTSeleccionado1").hide();
    $("#GraficoAlimentadorMTSeleccionado2").hide();
    $("#GraficoAlimentadorMTSeleccionado3").hide();
    $("#GraficoAlimentadorMTSeleccionado4").hide();
    $("#GraficoAlimentadorMTSeleccionado5").hide();

    ActualizarTituloSeguimiento();
}

function LimpiarTablaSumiALIM() {
    $('#TablaASSUrbano tbody').html('');
    $('#TablaASSRural tbody').html('');
    $('#alim-sum-urbano').hide();
    $('#alim-sum-rural').hide();
    $("#chart-alim-sumin-mct").hide();
    $("#alim-sumin-mct").html('');

}

function LimpiarTablaSumiSED() {
    $('#TablaSSUrbano tbody').html('');
    $('#TablaSSRural tbody').html('');
    $('#sed-sum-urbano').hide();
    $('#sed-sum-rural').hide();
}

function cargarSubDistribucion(pIDSisElectrico, pIDAlimentador, pTipo) {
    var p_anio = $('#select-anio').val();
    $.ajax({
        type: 'POST',
        url: 'ServicioVisorInterrupciones.asmx/ListaCodSEDxEstado',
        data: "{pIDSisElectrico:'" + pIDSisElectrico + "', pIDAlimentadorMT:'" + pIDAlimentador + "', pTipo:'" + pTipo + "', pPeriodo:'" + p_anio + "'}",
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (result) {
            if (pTipo == 'MC') {
                //Mala Calidad llamr funcion GIS
                buscarCapaSubDistribucionMalEstado(result.d.COD_SEDS);
                //console.log(result.d.COD_SEDS);
                //--------
                objUrbano = JSON.parse(result.d.URBANO);
                $('#TablaSSUrbano tbody').html('');
                $.each(objUrbano, function (i, row) {
                    rr = '<tr>' +
                        '<td style = "width: 12%!important;">' + row.SED + '</td>' +
                        '<td style = "width: 13%!important;">' + row.F1 + '</td>' +
                        '<td style = "width: 13%!important;">' + row.F2 + '</td>' +
                        '<td style = "width: 12%!important;">' + row.F3 + '</td>' +
                        '<td style = "width: 12%!important;">' + row.F4 + '</td>' +
                        '<td style = "width: 15%!important;">' + row.SC + '</td>' +
                        '<td style = "width: 15%!important;">' + row.MC + '</td>' +
                        '</tr>'
                    $('#TablaSSUrbano tbody').append(rr);
                });
                if (objUrbano.length > 0) {
                    $('#sed-sum-urbano').show();
                } else {
                    $('#sed-sum-urbano').hide();
                }

                objRural = JSON.parse(result.d.RURAL);
                $('#TablaSSRural tbody').html('');
                $.each(objRural, function (i, row) {
                    rr = '<tr>' +
                        '<td style = "width: 25%!important;">' + row.SED + '</td>' +
                        '<td style = "width: 25%!important;">' + (parseInt(row.F1) > 0 ? "X" : "") + '</td>' +
                        //'<td style = "width: 13%!important;">' + row.F2 + '</td>' +
                        '<td style = "width: 25%!important;">' + (parseInt(row.F3) > 0 ? "X" : "") + '</td>' +
                        //'<td style = "width: 12%!important;">' + row.F4 + '</td>' +
                        //'<td style = "width: 20%!important;">' + row.T + '</td>' +
                        '<td style = "width: 25%!important;">' + row.MC + '</td>' +
                        '</tr>'
                    $('#TablaSSRural tbody').append(rr);
                });
                if (objRural.length > 0) {
                    $('#sed-sum-rural').show();
                } else {
                    $('#sed-sum-rural').hide();
                }

            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('jqXHR:' + jqXHR);
            console.log('textStatus:' + textStatus);
            console.log('errorThrown:' + errorThrown);
        }
    });

}

function tablaSuminitroMC(data, idalim) {
    var html = '<table class="cell-hover row-border bg-white" style="width:100%!important;"><tbody>' +
        '<tr><td class="p-0" style="height: 0px!important; max-width: 17vw!important; min-width: 17vw!important;"></td><td class="p-0" style="height: 0px!important; max-width: 17vw!important; min-width: 17vw!important;"></td></tr>' +
        '<tr><td colspan="2"><h6 style="margin-top: .5rem!important;">Suministros MT con Mala Calidad de Tensión - ALIM:' + idalim + ' </h6></td></tr>' +
        '<tr><td>Urbano</td><td>Rural</td></tr> <tr>';
    if (data.hasOwnProperty("Urbano")) {
        html += '<td>' + tablaSuminitroMC_Fila(data.Urbano, 'U') + '</td>';
    } else {
        html += '<td></td>';
    };

    if (data.hasOwnProperty("Rural")) {
        html += '<td>' + tablaSuminitroMC_Fila(data.Rural, 'R') + '</td>';
    } else {
        html += '<td></td>';
    };

    html += '</tr></tbody></table>';
    return html;
}

function tablaSuminitroMC_Fila(dataFila, tipo) {
    var html = "";
    if (dataFila.F1.c != 0) {
        html += '<b>Sobretensión > 7,5%</b> (<a href="#" onclick="$(\'#' + tipo + 'F1\').toggle();">' + dataFila.F1.c + ' Suministros</a>) <br>';
        html += '<div id="' + tipo + 'F1" style="display:none">' + dataFila.F1.data + ' </div>';
    }
    if (dataFila.F2.c != 0) {
        html += '<b>Sobretensión < 7,5%</b> (<a href="#" onclick="$(\'#' + tipo + 'F2\').toggle();">' + dataFila.F2.c + ' Suministros</a>) <br>';
        html += '<div id="' + tipo + 'F2" style="display:none">' + dataFila.F2.data + ' </div>';
    }
    if (dataFila.F3.c != 0) {
        html += '<b>Subtensión > 7,5%</b> (<a href="#" onclick="$(\'#' + tipo + 'F3\').toggle();">' + dataFila.F3.c + ' Suministros</a>) <br>';
        html += '<div id="' + tipo + 'F3" style="display:none">' + dataFila.F3.data + ' </div>';
    }
    if (dataFila.F4.c != 0) {
        html += '<b>Subtensión < 7,5%</b> (<a href="#" onclick="$(\'#' + tipo + 'F4\').toggle();">' + dataFila.F4.c + ' Suministros</a>) <br>';
        html += '<div id="' + tipo + 'F4" style="display:none">' + dataFila.F4.data + ' </div>';
    }
    return html;
}

//function CargarCompenentesMalEstado(pIDEmpresa, pIDAlimentador) {
function CargarCompenentesMalEstado() {
    var pIDEmpresa = p_id_emp;
    var pIDAlimentador = p_cod_alim;



    $.ajax({
        type: 'POST',
        url: 'ServicioVisorInterrupciones.asmx/ListarComponentesMalEstado',
        data: "{pIDEmpresa:'" + pIDEmpresa + "',pIDAlimentadorMT:'" + pIDAlimentador + "'}",
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (result) {            
            var jSONT = JSON.parse(result.d);
            var Tabla = "";
            Tabla += '<table id="CompMalEstado" class="table striped table-border" style="display: block!important;  overflow-x: auto!important;">';
            Tabla +='<thead><tr>';
            Tabla +='<th>DEFICIENCIA</th>';
            Tabla +='<th>TIPO INSTALACIÓN</th>';
            Tabla +='<th>COD INSTALACIÓN</th>';
            Tabla +='<th>TIPIFICACIÓN</th>';
            Tabla +='<th>RESPONSABLE</th>';
            Tabla += '<th>SUMINISTRO</th>';
            Tabla += '<th>DENUNCIANTE</th>';
            Tabla += '<th>FECHA DENUNCIA</th>';
            Tabla += '<th>FECHA INSPECCIÓN</th>';
            Tabla += '<th>FECHA SUBSANACIÓN</th>';
            Tabla += '<th>ESTADO</th>';
            Tabla += '<th>OBSERVACIONES</th>';
            Tabla += '<th>REFERENCIA1</th>';
            Tabla += '<th>REFERENCIA2</th>';
            Tabla += '</tr></thead><tbody>';      
            if (jQuery.isEmptyObject(jSONT)) {            
                Tabla = "";
            } else {               
                $.each(jSONT, function (i, row) {
                    Tabla += '<tr>' +
                        '<td>' + row.C01 + '</td>' +
                        '<td>' + row.C02 + '</td>' +
                        '<td>' + row.C03 + '</td>' +
                        '<td>' + row.C04 + '</td>' +
                        '<td>' + row.C05 + '</td>' +
                        '<td>' + row.C06 + '</td>' +
                        '<td>' + row.C07 + '</td>' +
                        '<td>' + row.C08 + '</td>' +
                        '<td>' + row.C09 + '</td>' +
                        '<td>' + row.C10 + '</td>' +
                        '<td>' + row.C11 + '</td>' +
                        '<td>' + row.C12 + '</td>' +
                        '<td>' + row.C13 + '</td>' +
                        '<td>' + row.C14 + '</td>' +
                        '</tr>';           
                });
            }         
            Tabla += '</tbody></table>';
     
           
            Desktop.createWindow({
                width: 800,
                btnMin: false,
                btnMax: false,
                title: 'Componentes en Mal Estado - Alimentador: ' + p_cod_alim,
                content: "<div class='p-2'>"+Tabla+"</div>"
            });
            $('#CompMalEstado').dataTable({
                dom: 'Bfrtip',
                buttons: [
                    {
                        extend: 'excelHtml5',
                        title: 'Componentes en Mal Estado - Alimentador: ' + p_cod_alim
                    }
                ]
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('jqXHR:' + jqXHR); console.log('textStatus:' + textStatus); console.log('errorThrown:' + errorThrown);
        }
    });
}



function redondearValor(valor) {
    var tmp = (valor == null ? 0 : valor);
    tmp = Math.round(tmp * 100) / 100;
    return tmp;
}

function ActDesEmpresas(el, vchart) {
    if ($(el).is(':checked')) {
        for (i = 0; i < vchart.series.length; i++) {
            vchart.series[i].show();
        }
    } else {
        for (i = 0; i < vchart.series.length; i++) {
            vchart.series[i].hide();
        }
    }
}

function ActivarEmpresa() {
    alert('hola');

}

function ActivarOsinergmin() {

}

function ReporteInterrupciones() {    
/*
    Desktop.createWindow({
        width: 850,
        height: 430,
        btnMin: false,
        btnMax: false,
        icon: "<span class='mif-event-available'></span>",
        title: "Reporte Interrupciones",
        content: "<iframe src=\"http://gfe.osinerg.gob.pe/riep-gfe\" width=\"100%\" height=\"100%\"></iframe>"      
    });
    */

    var windowName = 'userConsole';
    var popUp = window.open('http://gfe.osinerg.gob.pe/riep-gfe', windowName, 'width=1000, height=700, scrollbars, resizable');
    if (popUp == null || typeof (popUp) == 'undefined') {
        alert('Please disable your pop-up blocker and click the "Open" link again.');
    }
    else {
        popUp.focus();
    }

    /*
    var ptitle = ' (' + $('#SerieSeleccionada').html() + ')';
    $('#alim-sum-rural').tableExport({ type: 'excel', escape: 'false', title: ptitle  });
    */
}


function ExportarXLSSuministro(pDiv) {
   var ptitle = ' (' + $('#SerieSeleccionada').html() + ')'; 
   $('#' + pDiv).tableExport({ type: 'excel', escape: 'false', title: ptitle });
}

//function VerMes(obj) {
//    $('#specific-charms').data('charms').toggle()
//}



var Desktop = {
    options: {
        windowArea: ".window-area",
        windowAreaClass: "",
        taskBar: ".task-bar > .tasks",
        taskBarClass: ""
    },

    wins: {},

    setup: function (options) {
        this.options = $.extend({}, this.options, options);
        return this;
    },

    addToTaskBar: function (wnd) {
        var icon = wnd.getIcon();
        var wID = wnd.win.attr("id");
        var item = $("<span>").addClass("task-bar-item started").html(icon);

        item.data("wID", wID);

        item.appendTo($(this.options.taskBar));
    },

    removeFromTaskBar: function (wnd) {
        console.log(wnd);
        var wID = wnd.attr("id");
        var items = $(".task-bar-item");
        var that = this;
        $.each(items, function () {
            var item = $(this);
            if (item.data("wID") === wID) {
                delete that.wins[wID];
                item.remove();
            }
        })
    },

    createWindow: function (o) {
        var that = this;
        o.onDragStart = function (pos, el) {
            win = $(el);
            $(".window").css("z-index", 100000);
            if (!win.hasClass("modal"))
                win.css("z-index", 3000000);
        };
        o.onDragStop = function (pos, el) {
            win = $(el);
            if (!win.hasClass("modal"))
                win.css("z-index", 2000);
        };
        o.onWindowDestroy = function (win) {
            console.log(win);
            that.removeFromTaskBar(win);
        };
        var w = $("<div>").appendTo($(this.options.windowArea));
        var wnd = w.window(o).data("window");
        var win = wnd.win;
        var shift = Metro.utils.objectLength(this.wins) * 16;
        
        if (wnd.options.place === "auto" && wnd.options.top === "auto" && wnd.options.left === "auto") {
            win.css({
                top: shift+80,
                left: shift
            });
        }
        
        this.wins[win.attr("id")] = wnd;
        this.addToTaskBar(wnd);
        w.remove();
    }
};

Desktop.setup();


