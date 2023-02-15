<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="VisorInterrupciones.InicioVisor" %>

<!DOCTYPE html> 
<html>  
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>    
    <link href="https://www.osinergmin.gob.pe/_catalogs/masterpage/starter/images/osinerg.ico" rel="shortcut icon" type="image/x-icon" />
    <title>INTERRRUPCIONES</title>
    <script src="Scripts/jquery-3.1.1.js"></script>
    <link href="Content/css/dojo.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://js.arcgis.com/3.23/esri/themes/calcite/dijit/calcite.css"/>
    <link rel="stylesheet" href="https://js.arcgis.com/3.23/esri/themes/calcite/esri/esri.css"/>
    <link href="Content/css/style20180401.css" rel="stylesheet" />
    <link href="src/agsjs/css/agsjs.css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="https://serverapi.arcgisonline.com/jsapi/arcgis/3.2/js/dojo/dojox/layout/resources/ResizeHandle.css" />
    <link rel="stylesheet" type="text/css" href="https://serverapi.arcgisonline.com/jsapi/arcgis/3.2/js/dojo/dojox/layout/resources/ExpandoPane.css" />
    <script src="Scripts/librerias/highchart/highcharts.js"></script>
    <script src="Scripts/librerias/highchart/highcharts-3d.js"></script>
    <link href="Content/datatables.css" rel="stylesheet" />
    <script src="Scripts/librerias/exporting.js"></script>
    <% if (TipoUsuario=="OSINERGMIN") {%> 
    <script src="Scripts/librerias/highchart/export-data.js"></script>       
    <% } %>
    <script src="Scripts/librerias/highchart/adapt-chart-to-legend.js"></script>    
 
    <script src="Scripts/librerias/datatables/jszip.min.js"></script>
    <script src="Scripts/librerias/datatables/jquery.dataTables.min.js"></script>
    <script src="Scripts/librerias/datatables/dataTables.buttons.min.js"></script>
    <script src="Scripts/librerias/datatables/buttons.html5.min.js"></script>

    <script src="Scripts/metro20180401.js"></script>
    <link href="Content/css/metro-all20180403.css" rel="stylesheet" />
    <script>  
        var dojoConfig = {
            packages: [{
                name: "agsjs",
                "location": location.pathname.replace(/\/[^/]+$/, '') + '/src/agsjs'
            }]
        };
    </script>
    <script src="https://js.arcgis.com/3.23/"></script>
    <script src="Scripts/Visor/InitVisor20180507.js"></script>
    <script src="Scripts/Visor/InitVisorGIS20180822.js"></script>
    <script src="Scripts/tableExport.js"></script>

</head>  
  
<body class="calcite window-area">
      <div class="task-bar" style="display:none">  
            <div class="task-bar-section tasks"></div>
     </div> 

    <input type="hidden" id="TipoUsuario" value="<%=TipoUsuario%>"/>
    <input type="hidden" id="CodEmpresa" value="<%=CodEmpresa%>"/>
    <input type="hidden" id="NombreUsuario" value="<%=NombreUsuario%>"/>
    <div id="loadingPrint" class="bg-white pos-fixed pos-top-right drop-shadow" style="display: none; z-index: 10800 !important; width: 184px; height: 42px; padding:5px">
        <img style="width:30px;height:30px;" src="Content/css/images/loading.svg"/>   
        <div class="place-right" style="font-size:13px;margin-top:4px;">Procesando Impresión...</div>
    </div>
   
    <header class="app-bar-expand-md" data-role="appbar" style="background-color: #075DAA!important;">
        <a onclick="InciarVentana('Inicio.aspx');" class="brand no-hover" data-role="hint" data-hint-background="bg-blue" data-hint-color="fg-white" data-hint-mode="2" data-hint="Pantalla principal">
            <img src="https://www.osinergmin.gob.pe/seccion/institucional/SiteAssets/logo.png" alt="Osinergmin" style="height: 70%!important;" />
        </a>
        <a id="NombreVentana" href="#" class="brand no-hover fg-white" style="font-size: 0.94rem!important;">Monitoreo Interrupciones</a>
        <div class="toolbar" style="margin-left: auto; width: 58rem!important; top: 0.2rem!important;">
            <div class="row mb-2 w-100">
                <div class="cell-sm-8" style="padding:0px!important;">
                    <button id="zoomin" class="tool-button info outline" title="Acercar" onclick="navToolbar.activate(esri.toolbars.Navigation.ZOOM_IN); toolbar.deactivate(); MaximizarCapa();"><span class="esri-icon-zoom-in-magnifying-glass fg-white"></span></button>
                    <button id="zoomout" class="tool-button info outline" title="Alejar" onclick="navToolbar.activate(esri.toolbars.Navigation.ZOOM_OUT); toolbar.deactivate();  MinimizarCapa();"><span class="esri-icon-zoom-out-magnifying-glass fg-white"></span></button>
                    <button id="zoomfullext" class="tool-button info outline" title="Reiniciar" onclick="zoomExtend(); toolbar.deactivate();"><span class="esri-icon-globe fg-white"></span></button>
                    <button id="zoomprev" class="tool-button info outline" title="Vista anterior" onclick="navToolbar.zoomToPrevExtent(); toolbar.deactivate();"><span style="font-size: 1.2rem!important;" class="mif-undo fg-white"></span></button>
                    <button id="zoomnext" class="tool-button info outline" title="Vista posterior" onclick="navToolbar.zoomToNextExtent(); toolbar.deactivate();"><span style="font-size: 1.2rem!important;" class="mif-redo fg-white"></span></button>
                    <button id="pan" class="tool-button info outline" title="Mover" onclick="navToolbar.activate(esri.toolbars.Navigation.PAN); toolbar.deactivate(); MoverCapa();"><span style="font-size: 1.2rem!important;" class="esri-icon-pan2 fg-white"></span></button>
                    <button id="identidad" class="tool-button info outline" title="Identificar" onclick="identify(); toolbar.deactivate();"><span style="font-size: 1.2rem!important;" class="esri-icon-description fg-white"></span></button>
                    <button id="clear" class="tool-button info outline" title="Limpiar selecci&oacute;n" onclick="clearAll(); toolbar.deactivate(); dojo.style('medidaDIV', {visibility:'hidden'});"><img src="images/broom.png" /></button>
                    <button id="measure" class="tool-button info outline" title="Regla" onclick="measure();"><span style="font-size: 1.2rem!important;" class="esri-icon-polyline fg-white"></span></button>
                    <button id="legend" class="tool-button info outline" title="Legenda" onclick="legendaOn();"><span style="font-size: 1.2rem!important;" class="esri-icon-collection fg-white"></span></button>
                 
					<% if (TipoUsuario!="PUBLIC") {%> 
                         <button id="alerta" class="tool-button info outline" title="Activar alerta"  onclick="$('#alerta-charms').data('charms').toggle(); $('#alerta').removeClass('ani-ring');"><span style="font-size: 1.2rem!important;" class="mif-bell fg-white"></span></button>
                    <% } %>                    
                    <% if (TipoUsuario=="OSINERGMIN") {%> 
                         <button id="inteImportantes" class="tool-button info outline" title="Reporte Interrupciones"  onclick="ReporteInterrupciones()"><span style="font-size: 1.2rem!important;" class="mif-event-available fg-white"></span></button>
                    <% } %>
                    <button id="streView" class="tool-button info outline" title="Street View" onclick="streView();" ><span style="font-size: 1.2rem!important;" class="esri-icon-hollow-eye fg-white"></span></button>
                    <!-- <% if (TipoUsuario!="PUBLIC") {%> 
                    <button class="tool-button info outline" title="Leyenda" onclick="activarLeyendaMapaBase(1);"><span style="font-size: 1.2rem!important;" class="esri-icon-layer-list fg-white"></span></button>
                    <% } %>  -->
                    <button class="tool-button info outline" title="Mapa Base" onclick="activarLeyendaMapaBase(2);"><span style="font-size: 1.2rem!important;" class="esri-icon-basemap fg-white"></span></button>
                    <button id="btnImprimir" class="tool-button info outline" title="Imprimir" onclick="Imprimir();"><span id="btnImprimirIcon" style="font-size: 1.2rem!important;" class="esri-icon-printer ani-spin fg-white"></span></button>
                </div>        
                <div class="cell-sm-4" style="padding:0px!important;">
                    <div id="search"></div>
                </div>
            </div>
        </div>
    </header>
    <div class="container-fluid " style="height: 94vh!important; padding-top: 52px; padding-left: 0!important; padding-right: 0!important; margin-left: 0!important; margin-right: 0!important;">
		<div id="ventanastreView" data-role="window" data-top="-750" data-cls-caption="bg-dark" data-width="650" data-height="650" data-title="Google Street View" data-btn-close="false" data-btn-min="false" data-btn-max="false" class="p-2">
        </div>
        <div class="grid demo-grid" style="margin-bottom: 0!important; overflow: hidden; max-height: 100vh; height: calc(100vh - 52px);">
            <div class="row h-100">
                <div class="cell-sm-5 border-right bd-gray pr-2">
                    <div class="row mb-2 drop-shadow" style="margin-left: 0!important; margin-right: 0!important;">
                        <div class="cell-sm-1 text-right" style="padding-top: 6px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;">
                            <label style="padding-top: 4px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;">Periodo:</label>
                        </div>
                        <div id="divAnio" class="cell-sm-3" title="">
                            <select id="select-anio" data-role="select"></select>
                        </div>
                        <div class="cell-sm-8 text-left border-left bd-gray" style="padding-top: 6px;">
                            <p class="text-small" id="SerieSeleccionada"></p>
                        </div>
                    </div>
                    <div class="row mb-2 bg-white" style="margin-left: 0!important; margin-right: 0!important;">
                        <ul data-role="tabs" class="bg-light tabs-expand-md w-100" style="top: 11px; border-bottom: 1px solid #3d7eff;" data-on-before-tab="ActividadTabs">
                            <li id="tabEmpresa" style="border:2px solid #3d7eff; border-bottom-width:0px;"><a href="#_target_1">Empresas</a></li>
                            <li id="tabSisElectrico" class="disabled" style="border-bottom: 1px solid #3d7eff; <% =(TipoUsuario=="PUBLIC"?"display:none":"")%> "><a href="#_target_2">Sis. Eléctricos</a></li>
                            <li id="tabAlimentadores" class="disabled" style="border-bottom: 1px solid #3d7eff; <% =(TipoUsuario=="PUBLIC"?"display:none":"")%>"><a href="#_target_3">Alimentadores</a></li>
                            <li id="SubDistribucion" class="disabled" style="border-bottom: 1px solid #3d7eff; <% =(TipoUsuario=="PUBLIC"?"display:none":"")%>"><a href="#_target_4">Subest. Distribución</a></li>
                        </ul>
                        <div class="no-border p-2 w-100 chart__container" style="overflow-y: auto;height: calc(100vh - 142px);">
                            <div id="_target_1">
                                <div class="example" style="">
                                    <div class="row mb-2 border bd-gray" style="margin-left: 0!important; margin-right: 0!important;">
                                        <!--button id="save_btn">Save Chart</button-->
                                        <div id="chart-emp" style="height: 600px; width: 92%; margin: 0 auto"></div>
                                        <input id="SelEmpresas" type="checkbox" data-role="switch" data-caption="Todos" checked onclick="ActDesEmpresas(this, $('#chart-emp').highcharts())" />
                                    </div>
                                    <div id="GraficoBarrasEmpresas" class="row mb-2 border bd-gray" style="margin-left: 0!important; margin-right: 0!important;">
                                        <div id="chart-emp_all" style="height: 650px; width: 92%; margin: 0 auto"></div>
                                    </div>
                                    <div id="DetalleEmpresaSeleccionada" class="row mb-2 bg-lightCobalt fg-white bd-gray drop-shadow" style="margin-left: 0!important; margin-right: 5px!important; display: none;">
                                        <div class="example bg-white set-border bd-grayLight bg-lightCobalt" data-text="">
                                            <table class="cell-hover row-border bg-white" style="width: 99%!important;">
                                                <tbody>
                                                    <tr>
                                                        <td class="p-0" style="height: 0px!important; max-width: 5.4vw!important; min-width: 5.4vw!important;"></td>
                                                        <td class="p-0" style="height: 0px!important; max-width: 5.4vw!important; min-width: 5.4vw!important;"></td>
                                                        <td class="p-0" style="height: 0px!important; max-width: 5.4vw!important; min-width: 5.4vw!important;"></td>
                                                        <td class="p-0" style="height: 0px!important; max-width: 5.4vw!important; min-width: 5.4vw!important;"></td>
                                                        <td class="p-0" style="height: 0px!important; max-width: 5.4vw!important; min-width: 5.4vw!important;"></td>
                                                        <td class="p-0" style="height: 0px!important; max-width: 5.4vw!important; min-width: 5.4vw!important;"></td>
                                                        <td class="p-0" style="height: 0px!important; max-width: 5.4vw!important; min-width: 5.4vw!important;"></td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="3" rowspan="2">
                                                            <h6 id="empresa_sel" style="margin-top: .5rem!important;"></h6>
                                                            <button class="button light mini" id="dropdown_toggle_1">ver mas...</button>
                                                            <button class="button light mini place-right" id="EliminarSeleccionEmpresa">Eliminar selección</button>
                                                        </td>
                                                        <td>Código</td>
                                                        <td>N° Usuarios</td>
                                                        <td>Km. Redes</td>
                                                        <td>Nº Sis. Eléc.</td>
                                                    </tr>
                                                    <tr>
                                                        <td id="empresa_codigo"></td>
                                                        <td id="empresa_sel_usu"></td>
                                                        <td id="empresa_sel_red"></td>
                                                        <td id="empresa_sel_red_num"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div class="pos-relative">
                                                <div data-role="dropdown" data-toggle-element="#dropdown_toggle_1">
                                                    <table class="cell-hover row-border bg-white" style="width: 99%!important;">
                                                        <tbody>
                                                            <tr>
                                                                <td class="p-0" style="height: 0px!important; max-width: 5.4vw!important; min-width: 5.4vw!important;"></td>
                                                                <td class="p-0" style="height: 0px!important; max-width: 5.4vw!important; min-width: 5.4vw!important;"></td>
                                                                <td class="p-0" style="height: 0px!important; max-width: 5.4vw!important; min-width: 5.4vw!important;"></td>
                                                                <td class="p-0" style="height: 0px!important; max-width: 5.4vw!important; min-width: 5.4vw!important;"></td>
                                                                <td class="p-0" style="height: 0px!important; max-width: 5.4vw!important; min-width: 5.4vw!important;"></td>
                                                                <td class="p-0" style="height: 0px!important; max-width: 5.4vw!important; min-width: 5.4vw!important;"></td>
                                                                <td class="p-0" style="height: 0px!important; max-width: 5.4vw!important; min-width: 5.4vw!important;"></td>
                                                            </tr>
                                                            <tr id="Fila_emp_SUM_MT_DENTRO_ZC">
                                                                <td colspan="6" style="max-width: 35vw!important; min-width: 35vw!important;">Suministros MT Dentro de la Zona de Concesión</td>
                                                                <td id="emp_SUM_MT_DENTRO_ZC"></td>
                                                            </tr>
                                                            <tr id="Fila_emp_SUM_MT_FUERA_ZC">
                                                                <td colspan="6" style="max-width: 35vw!important; min-width: 35vw!important;">Suministros MT Fuera de la Zona de Concesión</td>
                                                                <td id="emp_SUM_MT_FUERA_ZC"></td>
                                                            </tr>
                                                            <tr id="Fila_emp_SUM_BT_DENTRO_ZC">
                                                                <td colspan="6" style="max-width: 35vw!important; min-width: 35vw!important;">Suministros BT Dentro de la Zona de Concesión</td>
                                                                <td id="emp_SUM_BT_DENTRO_ZC"></td>
                                                            </tr>
                                                            <tr id="Fila_emp_SUM_BT_FUERA_ZC">
                                                                <td colspan="6" style="max-width: 35vw!important; min-width: 35vw!important;">Suministros BT Fuera de la Zona de Concesión</td>
                                                                <td id="emp_SUM_BT_FUERA_ZC"></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="DetalleSAIFIEmpresaSeleccionada" class="row mb-2 border bd-gray" style="margin-left: 0!important; margin-right: 0!important; display: none">
                                        <div id="chart-saifi" style="height: 400px; width: 92%; margin: 0 auto"></div>
                                        <input id="dropMesSAIFI" type="checkbox" data-role="switch" data-caption="Información mensual SAIFI" />
                                        <div class="pos-relative w-100">
                                            <div id="mensualSAIFI" class="bg-white" data-role="collapse" data-toggle-element="#dropMesSAIFI" data-collapsed="true">
                                                <div id="chart-saifi-mensual" style="height: 400px; margin: 0 auto"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="DetalleSAIDIEmpresaSeleccionada" class="row mb-2 border bd-gray" style="margin-left: 0!important; margin-right: 0!important; display: none;">
                                        <div id="chart-saidi" style="height: 400px; width: 92%; margin: 0 auto"></div>
                                        <input id="dropMesSAIDI" type="checkbox" data-role="switch" data-caption="Información mensual SAIDI" />
                                        <div class="pos-relative w-100">
                                            <div id="mensualSAIDI" class="bg-white" data-role="collapse" data-toggle-element="#dropMesSAIDI" data-collapsed="true">
                                                <div id="chart-saidi-mensual" style="height: 400px; width: 92%; margin: 0 auto"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="_target_2" style="display:none;">
                                <div class="example" style="">
                                    <div class="row mb-2 border bd-gray" style="margin-left: 0!important; margin-right: 0!important;">
                                        <select class="drop-shadow" id="serieSE" data-role="select" data-on-change="graficarPrincipalSisElectrico();" style="width: 32%!important;">
                                            <option class="fg-red" value="MT" selected="selected" title="Anexo 3_P074">Media Tensión (MT)</option>
                                            <option class="fg-orange" value="P" title="Anexo 3_P074 sin PM y PE">Propio (P)</option>
                                        </select>
                                        <div id="chart-se" style="height: 500px; width: 92%; margin: 0 auto"></div>
                                        <input id="SelSistemas" type="checkbox" data-role="switch" data-caption="Todos" checked onclick="ActDesEmpresas(this, $('#chart-se').highcharts())" />
                                    </div>
                                    <div id="GraficoSistemaElectrico1" class="row mb-2 border bd-gray" style="margin-left: 0!important; margin-right: 0!important;">
                                        <div id="chart-se-saifi-prog" style="height: 800px; width: 92%; margin: 0 auto"></div>
                                    </div>
                                    <div id="GraficoSistemaElectrico2" class="row mb-2 border bd-gray" style="margin-left: 0!important; margin-right: 0!important;">
                                        <div id="chart-se-saidi-prog" style="height: 800px; width: 92%; margin: 0 auto"></div>
                                    </div>
                                    <div id="DetalleSistemaElectricoSeleccionado" class="row mb-2 bg-orange fg-white bd-gray drop-shadow" style="margin-left: 0!important; margin-right: 0!important; display: none;">
                                        <div class="example bg-white set-border bd-grayLight bg-orange" data-text="">
                                            <table class="cell-hover row-border bg-white" style="width: 99%!important;">
                                                <tbody>
                                                    <tr>
                                                        <td class="p-0" style="height: 0px!important; max-width: 4.8vw!important; min-width: 4.8vw!important;"></td>
                                                        <td class="p-0" style="height: 0px!important; max-width: 4.8vw!important; min-width: 4.8vw!important;"></td>
                                                        <td class="p-0" style="height: 0px!important; max-width: 4.8vw!important; min-width: 4.8vw!important;"></td>
                                                        <td class="p-0" style="height: 0px!important; max-width: 4.8vw!important; min-width: 4.8vw!important;"></td>
                                                        <td class="p-0" style="height: 0px!important; max-width: 4.8vw!important; min-width: 4.8vw!important;"></td>
                                                        <td class="p-0" style="height: 0px!important; max-width: 4.8vw!important; min-width: 4.8vw!important;"></td>
                                                        <td class="p-0" style="height: 0px!important; max-width: 4.8vw!important; min-width: 4.8vw!important;"></td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="3" rowspan="2">
                                                            <h6 id="sis_electrico" style="margin-top: .5rem!important;"></h6>
                                                            <button class="button light mini" id="dropdown_toggle_2">ver mas...</button>
                                                            <button class="button light mini place-right" id="EliminarSeleccionSistemaElectrico">Eliminar selección</button>
                                                        </td>
                                                        <td>Código</td>
                                                        <td>N° Usuarios</td>
                                                        <td>Sector Típico</td>
                                                        <td>Km</td>
                                                    </tr>
                                                    <tr>
                                                        <td id="sis_electrico_codigo"></td>
                                                        <td id="sis_electrico_usu"></td>
                                                        <td id="sis_electrico_sector_tipico"></td>
                                                        <td id="sis_electrico_red"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div class="pos-relative">
                                                <div data-role="dropdown" data-toggle-element="#dropdown_toggle_2">
                                                    <table class="cell-hover row-border bg-white" style="width: 99%!important;">
                                                        <tbody>
                                                            <tr>
                                                                <td class="p-0" style="height: 0px!important; max-width: 4.8vw!important; min-width: 4.8vw!important;"></td>
                                                                <td class="p-0" style="height: 0px!important; max-width: 4.8vw!important; min-width: 4.8vw!important;"></td>
                                                                <td class="p-0" style="height: 0px!important; max-width: 4.8vw!important; min-width: 4.8vw!important;"></td>
                                                                <td class="p-0" style="height: 0px!important; max-width: 4.8vw!important; min-width: 4.8vw!important;"></td>
                                                                <td class="p-0" style="height: 0px!important; max-width: 4.8vw!important; min-width: 4.8vw!important;"></td>
                                                                <td class="p-0" style="height: 0px!important; max-width: 4.8vw!important; min-width: 4.8vw!important;"></td>
                                                                <td class="p-0" style="height: 0px!important; max-width: 4.8vw!important; min-width: 4.8vw!important;"></td>
                                                                <td class="p-0" style="height: 0px!important; max-width: 4.8vw!important; min-width: 4.8vw!important;"></td>
                                                            </tr>
                                                            <tr id="Fila_sis_SUM_MT_DENTRO_ZC">
                                                                <td colspan="7" style="max-width: 35vw!important; min-width: 35vw!important;">Suministros MT Dentro de la Zona de Concesión</td>
                                                                <td id="sis_SUM_MT_DENTRO_ZC"></td>
                                                            </tr>
                                                            <tr id="Fila_sis_SUM_MT_FUERA_ZC">
                                                                <td colspan="7" style="max-width: 35vw!important; min-width: 35vw!important;">Suministros MT Fuera de la Zona de Concesión</td>
                                                                <td id="sis_SUM_MT_FUERA_ZC"></td>
                                                            </tr>
                                                            <tr id="Fila_sis_SUM_BT_DENTRO_ZC">
                                                                <td colspan="7" style="max-width: 35vw!important; min-width: 35vw!important;">Suministros BT Dentro de la Zona de Concesión</td>
                                                                <td id="sis_SUM_BT_DENTRO_ZC"></td>
                                                            </tr>
                                                            <tr id="Fila_sis_SUM_BT_FUERA_ZC">
                                                                <td colspan="7" style="max-width: 35vw!important; min-width: 35vw!important;">Suministros BT Fuera de la Zona de Concesión</td>
                                                                <td id="sis_SUM_BT_FUERA_ZC"></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="GraficoSistemaElectricoSeleccionado1" class="row mb-2 border bd-gray" style="margin-left: 0!important; margin-right: 0!important; display: none;">
                                        <div id="chart-se-saifi" style="height: 300px; width: 92%; margin: 0 auto"></div>
                                        <input id="dropMesSAIFI-SE" type="checkbox" data-role="switch" data-caption="Información mensual SAIFI" />
                                        <div class="pos-relative w-100">
                                            <div id="mensualSAIFI-SE" class="bg-white" data-role="collapse" data-toggle-element="#dropMesSAIFI-SE" data-collapsed="true">
                                                <div id="chart-se-saifi-mensual" style="height: 400px; margin: 0 auto"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="GraficoSistemaElectricoSeleccionado2" class="row mb-2 border bd-gray" style="margin-left: 0!important; margin-right: 0!important; display: none;">
                                        <div id="chart-se-saidi" style="height: 300px; width: 92%; margin: 0 auto"></div>
                                        <input id="dropMesSAIDI-SE" type="checkbox" data-role="switch" data-caption="Información mensual SAIDI" />
                                        <div class="pos-relative w-100">
                                            <div id="mensualSAIDI-SE" class="bg-white" data-role="collapse" data-toggle-element="#dropMesSAIDI-SE" data-collapsed="true">
                                                <div id="chart-se-saidi-mensual" style="height: 400px; width: 92%; margin: 0 auto"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="GraficoSistemaElectricoSeleccionado3" class="row mb-2 border bd-gray" style="margin-left: 0!important; margin-right: 0!important;">
                                        <div class="grid demo-grid">
                                            <div class="row">
                                                <div class="cell-6" style="margin: 0!important; padding: 0px!important;">
                                                    <div id="chart-se-saifi-prog-anio" style="height: 300px; margin: 0 auto;"></div>
                                                </div>
                                                <div class="cell-6" style="margin: 0!important; padding: 0px!important;">
                                                    <div id="chart-se-saidi-prog-anio" style="height: 300px; margin: 0 auto;"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="GraficoSistemaElectricoSeleccionado4" class="row mb-2 border bd-gray" style="margin-left: 0!important; margin-right: 0!important; display: none;">
                                        <div id="chart-se-saifi-prog-anual" style="height: 300px; width: 92%; margin: 0 auto"></div>
                                    </div>
                                    <div id="GraficoSistemaElectricoSeleccionado5" class="row mb-2 border bd-gray" style="margin-left: 0!important; margin-right: 0!important; display: none;">
                                        <div id="chart-se-saidi-prog-anual" style="height: 300px; width: 92%; margin: 0 auto"></div>
                                    </div>
                                    <div id="GraficoSistemaElectricoSeleccionado6" class="row mb-2 border bd-gray" style="margin-left: 0!important; margin-right: 0!important; display: none;">
                                        <div class="grid demo-grid">
                                            <div class="row">
                                                <div class="cell-6">
                                                    <div id="chart-se-saifi-evol-anio" style="height: 300px; margin: 0 auto"></div>
                                                </div>
                                                <div class="cell-6">
                                                    <div id="chart-se-saidi-evol-anio" style="height: 300px; margin: 0 auto"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="GraficoSistemaElectricoSeleccionado7" class="row mb-2 border bd-gray" style="margin-left: 0!important; margin-right: 0!important; display: none;">
                                        <div id="chart-se-saifi-evol-anual" style="height: 300px; width: 92%; margin: 0 auto"></div>
                                    </div>
                                    <div id="GraficoSistemaElectricoSeleccionado8" class="row mb-2 border bd-gray" style="margin-left: 0!important; margin-right: 0!important; display: none;">
                                        <div id="chart-se-saidi-evol-anual" style="height: 300px; width: 92%; margin: 0 auto"></div>
                                    </div>
                                    <div id="GraficoSistemaElectricoSeleccionado9" class="row mb-2 border bd-gray" style="margin-left: 0!important; margin-right: 0!important; display: none;">
                                        <div class="grid demo-grid">
                                            <div class="row">
                                                <div class="cell-6">
                                                    <div id="chart-se-saifi-caus-anio" style="height: 300px; margin: 0 auto"></div>
                                                </div>
                                                <div class="cell-6">
                                                    <div id="chart-se-saidi-caus-anio" style="height: 300px; margin: 0 auto"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="GraficoSistemaElectricoSeleccionado10" class="row mb-2 border bd-gray" style="margin-left: 0!important; margin-right: 0!important; display: none;">
                                        <div id="chart-se-saifi-caus-anual" style="height: 300px; width: 92%; margin: 0 auto"></div>
                                    </div>
                                    <div id="GraficoSistemaElectricoSeleccionado11" class="row mb-2 border bd-gray" style="margin-left: 0!important; margin-right: 0!important; display: none;">
                                        <div id="chart-se-saidi-caus-anual" style="height: 300px; width: 92%; margin: 0 auto"></div>
                                    </div>
                                    <div id="GraficoSistemaElectricoSeleccionado12" class="row mb-2 border bd-gray" style="margin-left: 0!important; margin-right: 0!important;">
                                        <div id="chart-se-saifi-pri-caus-anual" style="height: 300px; width: 92%; margin: 0 auto"></div>
                                    </div>
                                    <div id="GraficoSistemaElectricoSeleccionado13" class="row mb-2 border bd-gray" style="margin-left: 0!important; margin-right: 0!important; display: none;">
                                        <div id="chart-se-saifi-prin-causas" style="height: 300px; width: 92%; margin: 0 auto"></div>
                                    </div>
                                </div>
                            </div>
                            <div id="_target_3" style="display:none;">
                                <div class="example" style="">
                                    <div class="row mb-2 border bd-gray" style="margin-left: 0!important; margin-right: 0!important;">
                                        <div class="cell-md-6">
                                            <div id="chart-alim-contri-saifi" style="height: 300px; margin: 0 auto"></div>
                                        </div>
                                        <div class="cell-md-6">
                                            <div id="chart-alim-contri-saidi" style="height: 300px; margin: 0 auto"></div>
                                        </div>
                                    </div>
                                    <div class="row mb-2 border bd-gray" style="margin-left: 0!important; margin-right: 0!important;">
                                        <div id="chart-res-alim" style="height: 400px; width: 92%; margin: 0 auto"></div>
                                    </div>
                                    <div id="DetalleAlimentadorMTSeleccionado" class="row mb-2 bg-green fg-white bd-gray drop-shadow" style="margin-left: 0!important; margin-right: 0!important;">
                                        <div class="example bg-white set-border bd-grayLight" data-text="">
                                            <table class="cell-hover row-border bg-white" style="width: 99%!important;">
                                                <tbody>
                                                    <tr>
                                                        <td class="p-0" style="height: 0px!important; max-width: 4.8vw!important; min-width: 4.8vw!important;"></td>
                                                        <td class="p-0" style="height: 0px!important; max-width: 4.8vw!important; min-width: 4.8vw!important;"></td>
                                                        <td class="p-0" style="height: 0px!important; max-width: 4.8vw!important; min-width: 4.8vw!important;"></td>
                                                        <td class="p-0" style="height: 0px!important; max-width: 4.8vw!important; min-width: 4.8vw!important;"></td>
                                                        <td class="p-0" style="height: 0px!important; max-width: 4.8vw!important; min-width: 4.8vw!important;"></td>
                                                        <td class="p-0" style="height: 0px!important; max-width: 4.8vw!important; min-width: 4.8vw!important;"></td>
                                                        <td class="p-0" style="height: 0px!important; max-width: 4.8vw!important; min-width: 4.8vw!important;"></td>
                                                        <td class="p-0" style="height: 0px!important; max-width: 4.8vw!important; min-width: 4.8vw!important;"></td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="4" rowspan="2">
                                                            <h6 style="margin-top: .5rem!important;">ALIMENTADOR: <span id="alimentador_Seleccionado"></span></h6>
                                                            <button class="button light mini" id="dropdown_toggle_3">ver mas...</button>
                                                            <button class="button light mini place-right" id="EliminarSeleccionAlimentador">Eliminar selección</button>
                                                        </td>
                                                        <td>Código</td>
                                                        <td>N° Usuarios</td>
                                                        <td>Km</td>
                                                        <td>Nivel Tensión</td>
                                                    </tr>
                                                    <tr>
                                                        <td id="alimentador_codigo"></td>
                                                        <td id="alimentador_usu"></td>
                                                        <td id="alimentador_red"></td>
                                                        <td id="alimentador_nivel_tension"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div class="pos-relative">
                                                <div data-role="dropdown" data-toggle-element="#dropdown_toggle_3">
                                                    <table class="cell-hover row-border bg-white" style="width: 99%!important;">
                                                        <tbody>
                                                            <tr>
                                                                <td class="p-0" style="height: 0px!important; max-width: 4.8vw!important; min-width: 4.8vw!important;"></td>
                                                                <td class="p-0" style="height: 0px!important; max-width: 4.8vw!important; min-width: 4.8vw!important;"></td>
                                                                <td class="p-0" style="height: 0px!important; max-width: 4.8vw!important; min-width: 4.8vw!important;"></td>
                                                                <td class="p-0" style="height: 0px!important; max-width: 4.8vw!important; min-width: 4.8vw!important;"></td>
                                                                <td class="p-0" style="height: 0px!important; max-width: 4.8vw!important; min-width: 4.8vw!important;"></td>
                                                                <td class="p-0" style="height: 0px!important; max-width: 4.8vw!important; min-width: 4.8vw!important;"></td>
                                                                <td class="p-0" style="height: 0px!important; max-width: 4.8vw!important; min-width: 4.8vw!important;"></td>
                                                                <td class="p-0" style="height: 0px!important; max-width: 4.8vw!important; min-width: 4.8vw!important;"></td>
                                                            </tr>
                                                            <tr id="Fila_alim_SUM_MT_DENTRO_ZC">
                                                                <td colspan="7" style="max-width: 35vw!important; min-width: 35vw!important;">Suministros MT Dentro de la Zona de Concesión</td>
                                                                <td id="alim_SUM_MT_DENTRO_ZC"></td>
                                                            </tr>
                                                            <tr id="Fila_alim_SUM_MT_FUERA_ZC">
                                                                <td colspan="7" style="max-width: 35vw!important; min-width: 35vw!important;">Suministros MT Fuera de la Zona de Concesión</td>
                                                                <td id="alim_SUM_MT_FUERA_ZC"></td>
                                                            </tr>
                                                            <tr id="Fila_alim_SUM_BT_DENTRO_ZC">
                                                                <td colspan="7" style="max-width: 35vw!important; min-width: 35vw!important;">Suministros BT Dentro de la Zona de Concesión</td>
                                                                <td id="alim_SUM_BT_DENTRO_ZC"></td>
                                                            </tr>
                                                            <tr id="Fila_alim_SUM_BT_FUERA_ZC">
                                                                <td colspan="7" style="max-width: 35vw!important; min-width: 35vw!important;">Suministros BT Fuera de la Zona de Concesión</td>
                                                                <td id="alim_SUM_BT_FUERA_ZC"></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="GraficoAlimentadorMTSeleccionado1" class="row mb-2 border bd-gray" style="margin-left: 0!important; margin-right: 0!important;">
                                        <div id="chart-alim-prin-causas" style="height: 300px; width: 92%; margin: 0 auto"></div>
                                    </div>
                                    <div id="GraficoAlimentadorMTSeleccionado2" class="row mb-2 border bd-gray" style="margin-left: 0!important; margin-right: 0!important;">
                                        <a href="javascript:CargarCompenentesMalEstado();">Componentes en mal estado</a><br />
                                    </div>
                                    <div id="GraficoAlimentadorMTSeleccionado3" class="row mb-2 border bd-gray" style="margin-left: 0!important; margin-right: 0!important;">
                                        <div id="alim-sumin-mct" style="font-size: 0.8rem; width: 92%; margin: 0 auto"></div>
                                    </div>

                                    <div id="GraficoAlimentadorMTSeleccionado4" class="row mb-2 border bd-gray" style="margin-left: 0!important; margin-right: 0!important;">
                                        <div id="chart-alim-sumin-mct" style="height: 300px; width: 92%; margin: 0 auto"></div>
                                    </div>
                                    <div id="GraficoAlimentadorMTSeleccionado5" class="row mb-2 border bd-gray" style="margin-left: 0!important; margin-right: 0!important;">
                                        <div id="alim-sum-urbano" style="width: 100%!important; display: none">
                                            <div class="example bg-white set-border bd-grayLight no-padding no-margin" data-text="">
                                                <table style="display: table !important; width: 100%;">
                                                    <thead>
                                                        <tr>
                                                            <th colspan="6" style="font-size: 0.8rem; padding: 5px;">
                                                                <label>Suministros MT Pendientes de Subsanación - Urbano</label>
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <th style="width: 20%!important;">
                                                                <label>Suministro MT</label></th>
                                                            <th style="width: 15%!important;">
                                                                <label>Sobretensión
                                                                    <br />
                                                                    >7,5%</label></th>
                                                            <th style="width: 15%!important;">
                                                                <label>Sobretensión
                                                                    <br />
                                                                    <7,5%</label></th>
                                                            <th style="width: 15%!important;">
                                                                <label>Subtensión
                                                                    <br />
                                                                    > 7,5%</label></th>
                                                            <th style="width: 15%!important;">
                                                                <label>Subtensión
                                                                    <br />
                                                                    < 7,5%</label></th>
                                                            <th style="width: 20%!important;">
                                                                <label>Monto de
                                                                    <br />
                                                                    Compensación USD</label></th>
                                                        </tr>
                                                    </thead>
                                                </table>
                                            </div>
                                            <div class="example bg-white set-border bd-grayLight no-padding no-margin" data-text="" style="max-height: 30vh!important; overflow-y: auto">
                                                <table id="TablaASSUrbano" class="table striped compact" style="display: table !important; width: 100%; text-align: center; font-size: 0.8rem;">
                                                    <tbody>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <button class="button small float-right" onclick="ExportarXLSSuministro('alim-sum-urbano')"><span class="mif-file-excel"></span> Exportar</button>
                                        </div>

                                        <div id="alim-sum-rural" style="width: 100%!important; display: none">
                                            <div class="example bg-white set-border bd-grayLight no-padding no-margin" data-text="">
                                                <table id="TablaASSRuralHead" style="display: table !important; width: 100%;">
                                                    <thead>
                                                        <tr>
                                                            <th colspan="6" style="font-size: 0.8rem; padding: 5px;">
                                                                <label>Suministros MT Pendientes de Subsanación - Rural</label>
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <th style="width: 20%!important;">
                                                                <label>Suministro MT</label></th>
                                                            <th style="width: 15%!important;">
                                                                <label>Sobretensión
                                                                    <br />
                                                                    >7,5%</label></th>
                                                            <th style="width: 15%!important;">
                                                                <label>Sobretensión
                                                                    <br />
                                                                    <7,5%</label></th>
                                                            <th style="width: 15%!important;">
                                                                <label>Subtensión
                                                                    <br />
                                                                    > 7,5%</label></th>
                                                            <th style="width: 15%!important;">
                                                                <label>Subtensión
                                                                    <br />
                                                                    < 7,5%</label></th>
                                                            <th style="width: 20%!important;">
                                                                <label>Monto de
                                                                    <br />
                                                                    Compensación USD</label></th>
                                                        </tr>
                                                    </thead>
                                                </table>
                                            </div>
                                            <div class="example bg-white set-border bd-grayLight no-padding no-margin" data-text="" style="max-height: 30vh!important; overflow-y: auto">
                                                <table id="TablaASSRural" class="table striped compact" style="display: table !important; width: 100%; text-align: center; font-size: 0.8rem;">
                                                    <tbody>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <button class="button small float-right" onclick="ExportarXLSSuministro('alim-sum-rural')"><span class="mif-file-excel"></span> Exportar</button>
                                        </div>
                                    </div>


                                </div>
                            </div>
                            <div id="_target_4" style="display:none;">
                                <div class="example" style="">
                                    <div class="row mb-2 border bd-gray" style="margin-left: 0!important; margin-right: 0!important;">
                                        <div id="chart-sed" style="height: 400px; width: 92%; margin: 0 auto"></div>
                                    </div>
                                    <div class="row mb-2 border bd-gray" style="margin-left: 0!important; margin-right: 0!important;">
                                        <div id="sed-sum-urbano" style="width: 100%!important; display: none">
                                            <div class="example bg-white set-border bd-grayLight no-padding no-margin" data-text="">
                                                <table style="display: table !important; width: 100%;">
                                                    <thead>
                                                        <tr>
                                                            <th colspan="7" style="font-size: 0.8rem; padding: 5px;">
                                                                <label>Suministros BT Pendientes de Subsanación - Urbano</label>
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <th style="width: 12%!important;">
                                                                <label>SED</label></th>
                                                            <th style="width: 13%!important;">
                                                                <label>Sobretensión
                                                                    <br />
                                                                    >7,5%</label></th>
                                                            <th style="width: 13%!important;">
                                                                <label>Sobretensión
                                                                    <br />
                                                                    <7,5%</label></th>
                                                            <th style="width: 12%!important;">
                                                                <label>Subtensión
                                                                    <br />
                                                                    > 7,5%</label></th>
                                                            <th style="width: 12%!important;">
                                                                <label>Subtensión
                                                                    <br />
                                                                    < 7,5%</label></th>
                                                            <th style="width: 15%!important;">
                                                                <label>Total Suministros
                                                                    <br />
                                                                    Compensados</label></th>
                                                            <th style="width: 15%!important;">
                                                                <label>Monto de
                                                                    <br />
                                                                    Compensación USD</label></th>
                                                        </tr>
                                                    </thead>
                                                </table>
                                            </div>
                                            <div class="example bg-white set-border bd-grayLight no-padding no-margin" data-text="" style="max-height: 30vh!important; overflow-y: auto">
                                                <table id="TablaSSUrbano" class="table striped compact" style="display: table !important; width: 100%; text-align: center; font-size: 0.8rem;">
                                                    <tbody>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <button class="button small float-right" onclick="ExportarXLSSuministro('sed-sum-urbano')"><span class="mif-file-excel"></span> Exportar</button>
                                        </div>
                                        <div id="sed-sum-rural" style="width: 100%!important; display: none">
                                            <div class="example bg-white set-border bd-grayLight no-padding no-margin" data-text="">
                                                <table style="display: table !important; width: 100%; table-layout: auto!important;">
                                                    <thead>
                                                        <tr>
                                                            <th colspan="4" style="font-size: 0.8rem; padding: 5px;">
                                                                <label>Suministros BT Pendientes de Subsanación - Rural</label>
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <th style="width: 25%!important;">
                                                                <label>SED</label></th>
                                                            <th style="width: 25%!important;">
                                                                <label>Sobretensión >7,5%</label></th>
                                                            <!--th style="width: 13%!important;">
                                                                <label>Sobretensión
                                                                    <br />
                                                                    <7,5%</label></th-->
                                                            <th style="width: 25%!important;">
                                                                <label>Subtensión >7,5%</label></th>
                                                            <!--th style="width: 12%!important;">
                                                                <label>Subtensión
                                                                    <br />
                                                                    < 7,5%</label></th-->
                                                            <!--th style="width: 20%!important;">
                                                                <label>Total Suministros
                                                                    <br />
                                                                    Medidos</label></th-->
                                                            <th style="width: 25%!important;">
                                                                <label>Monto de
                                                                    
                                                                    Compensación USD</label></th>
                                                        </tr>
                                                    </thead>
                                                </table>
                                            </div>
                                            <div class="example bg-white set-border bd-grayLight no-padding no-margin" data-text="" style="max-height: 30vh!important; overflow-y: auto">
                                                <table id="TablaSSRural" class="table striped compact" style="display: table !important; width: 100%; text-align: center; font-size: 0.8rem;">
                                                    <tbody>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <button class="button small float-right" onclick="ExportarXLSSuministro('sed-sum-rural')"><span class="mif-file-excel"></span> Exportar</button>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
                <div class="cell-sm-7 pl-0">
                    <div id="map" data-dojo-type="dijit.layout.ContentPane" data-dojo-props="splitter:true, region:'center'" style="padding: 0!important; width: 100%!important; height: 100%!important;">
                        <small id="info" class="pos-fixed pos-bottom-right z-top" style="z-index:50;"></small>

                        <div id="medidaDIV" class="drop-shadow" style="width:250px!important; position:absolute; right:500px; top:-500px; z-Index:999; background-color:#ffffff!important;">
                          <div id="titlePane" data-dojo-type="dijit/TitlePane" data-dojo-props="title:'Regla', closable:false">
                            <div id="measurementDiv"></div>
                          </div>
                        </div>
                        <div id="alerta-charms" data-role="charms" class="drop-shadow" data-position="bottom" style="left: 45vw!important; max-width: 50vw!important; min-width: 50vw!important;">
                            <div class="example bg-white set-border bd-grayLight no-padding no-margin" data-text="" style="width:100%">
                                <table style="width:100%;height: 30px !important;">
                                    <thead>
                                        <tr style="height: 25px;">
                                            <th style="width: 12%;text-align: center;"><label>Registro</label></th>
                                            <th style="width: 18%;text-align: center;"><label>Fecha Reg.</label></th>
                                            <th style="width: 8%;text-align: center;"><label>Cod. Emp.</label></th>
                                            <th style="width: 17%;"><label>Empresa</label></th>
                                            <th style="width: 12%;text-align: center;"><label>Cod. Sis. Elec.</label></th>
                                            <th style=""><label>Sis. Eléctrico</label></th>
                                            <th style="width: 5%;"><span class="mif-cross fg-white" onclick="$('#alerta-charms').data('charms').toggle()"></span></th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <div class="example bg-white set-border bd-grayLight no-padding no-margin" data-text="Alerta" style="overflow-y: auto; height: 40vh!important;">
                                 <table id="tablaAlerta"  class="table striped compact" style=" text-align: left; font-size: 0.8rem; width:100%">
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div id="leyenda-charms" class="fg-black bg-white drop-shadow" data-role="charms" data-position="right" style="top: 10vw!important; width: 18vw!important; max-height: 40vw!important; min-height: 40vw!important;">
                            <div id="layerListPane" data-dojo-type="dijit/layout/ContentPane" style="">
                                <div id="legendDiv" style="top: 15px!important; left: 15px!important; right: 15px!important;">
                                    <div class="row mb-2">
                                        <h6>Monitoreo de Interrupciones</h6>
                                    </div>
                                    <span id="layer_list">
                                        <input type="checkbox" class="list_item" id="layer0CheckBox" value="5" data-caption="Empresa" />Empresa<br/>
                                        <input type="checkbox" class="list_item" id="layer1CheckBox" value="4" data-caption="Sistema Electrico" />Sistema Electrico<br/>
                                        <input type="checkbox" class="list_item" id="layer2CheckBox" value="3" data-caption="Alimentadores" />Alimentadores<br/>
                                        <input type="checkbox" class="list_item" id="layer3CheckBox" value="1" data-caption="Subestacion Distribucion" />Subestacion Distribucion<br/>
                                        <input type="checkbox" class="list_item" id="layer4CheckBox" value="0" data-caption="Subestacion Transmision" />Subestacion Transmision<br/>
                                        <input type="checkbox" class="list_item" id="layer5CheckBox" value="6" data-caption="Suministros" />Suministros<br/>
                                        </span>
                                </div>
                            </div>
                        </div>
						<div id="leyendid" style="z-index:9999;bottom: 10px !important;position: absolute; width: 250px !important;height: 150px !important;background: white;">
						</div>
                        <div id="galeria-mapas-charms" class="fg-black bg-white drop-shadow" data-role="charms" data-position="right" style="top: 10vw!important; width: 16vw!important; max-height: 35vw!important; min-height: 35vw!important;">
                            <div data-dojo-type="dijit/layout/ContentPane" style="width: 98%!important; height: 98%!important; overflow: auto;">
                                <div id="basemapGallery"></div>
                            </div>
                        </div>
                        <div id="DetalleAlerta-charms" class="drop-shadow bg-white" data-role="charms" data-position="bottom" style="font-size: 11px!important; left: 45vw!important; height: 68vh; max-width: 40vw!important; min-width: 40vw!important;">
                            <div class="window-caption" style="background-color: #4390df!important;">
                                <span class="icon mif-bell"></span>
                                <span class="title">Detalle Alerta</span>
                                <div class="buttons">
                                    <span class="btn-close" onclick="$('#DetalleAlerta-charms').data('charms').toggle();"></span>
                                </div>
                            </div>
                            <div style="overflow-y: scroll!important; height: 62vh;">
                                <div class="marco fg-black bg-white set-border bd-grayLight" data-text="Registro" style="min-height: 3.5vw!important; width: 98%!important;">
                                    <div class="grid">
                                        <div class="row">
                                            <div class="cell-3">
                                                <label><b>Nro. Registro Grabación</b></label>
                                            </div>
                                            <div class="cell-3">
                                                <label id="RegistroGrabacion"></label>
                                            </div>
                                            <div class="cell-3">
                                                <label><b>Fecha Grabación</b></label>
                                            </div>
                                            <div class="cell-3">
                                                <label id="FechaGrabacion"></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class='marco fg-black bg-white set-border bd-grayLight' data-text="Rango" style="min-height: 3vw!important; width: 98%!important;">
                                    <div class="grid">
                                        <div class="row">
                                            <div class="cell-3">
                                                <p><b>Fecha hora inicio</b></p>
                                            </div>
                                            <div class="cell-3">
                                                <label id="RangoFechaIni"></label>
                                            </div>
                                            <div class="cell-3">
                                                <p><b>Fecha hora fin</b></p>
                                            </div>
                                            <div class="cell-3">
                                                <label id="RangoFechaFin"></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class='marco fg-black bg-white set-border bd-grayLight' data-text="Motivo y Causa" style="min-height: 6vw!important; width: 98%!important;">
                                    <div class="grid">
                                        <div class="row">
                                            <div class="cell-3">
                                                <p><b>Motivo</b></p>
                                            </div>
                                            <div class="cell-3">
                                                <label id="Motivo"></label>
                                            </div>
                                            <div class="cell-3">
                                                <p><b>Causa</b></p>
                                            </div>
                                            <div class="cell-3">
                                                <label id="Causa"></label>
                                            </div>
                                        </div>
                                        <hr />
                                        <div class="row">
                                            <div class="cell-3">
                                                <p><b>Detalle</b></p>
                                            </div>
                                            <div class="cell-9">
                                                <label id="DetalleCausa"></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class='marco fg-black bg-white set-border bd-grayLight' data-text="Instalación Causante" style="min-height: 8vw!important; width: 98%!important;">
                                    <div class="grid">
                                        <div class="row">
                                            <div class="cell-3">
                                                <p><b>Tipo</b></p>
                                            </div>
                                            <div class="cell-3">
                                                <label id="Tipo"></label>
                                            </div>
                                            <div class="cell-3">
                                                <p><b>Perteneciente</b></p>
                                            </div>
                                            <div class="cell-3">
                                                <label id="Perteneciente"></label>
                                            </div>
                                        </div>
                                        <hr />
                                        <div class="row">
                                            <div class="cell-3">
                                                <p><b>Descripción</b></p>
                                            </div>
                                            <div class="cell-9">
                                                <label id="Descripcion"></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class='marco fg-black bg-white set-border bd-grayLight' data-text="Afectados" style="min-height: 4vw!important; width: 98%!important;">
                                    <div class="grid">
                                        <div class="row">
                                            <div class="cell-3">
                                                <p><b>Nro. Usuarios</b></p>
                                            </div>
                                            <div class="cell-3">
                                                <label id="NumUsuarios"></label>
                                            </div>
                                            <div class="cell-3">
                                                <p><b>Demanda Afectada (kw)</b></p>
                                            </div>
                                            <div class="cell-3">
                                                <label id="DemandaAfectadaKW"></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class='marco fg-black bg-white set-border bd-grayLight' data-text="Sistemas Eléctricos" style="min-height: 7vw!important; width: 98%!important;">
                                    <table id="sisafectado" class="cell-hover row-border bg-white" style="width: 100%!important;">
                                        <thead>
                                            <tr>
                                                <th class="p-0" style="max-width: 4.8vw!important; min-width: 6vw!important;">Sistema Eléctrico</th>
                                                <th class="p-0" style="max-width: 4.8vw!important; min-width: 12vw!important;">Lugar Afectado</th>
                                                <th class="p-0" style="max-width: 4.8vw!important; min-width: 10vw!important;">Ubicación</th>
                                                <th class="p-0" style="max-width: 4.8vw!important; min-width: 4vw!important;">UBIGEO</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td id="AlertaSisEle"></td>
                                                <td id="AlertaLugAfe"></td>
                                                <td id="AlertaUbicacion"></td>
                                                <td id="AlertaUBIGEO"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</body> 
</html>  