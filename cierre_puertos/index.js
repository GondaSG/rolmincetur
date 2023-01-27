let map, view;
let isOffice = true;
let codeUbigeo = "";

require([
    "esri/core/urlUtils",
    "esri/Map",
    "esri/config",
    "esri/views/MapView",
    "esri/WebMap",
    "esri/layers/FeatureLayer",
    "esri/tasks/QueryTask",
    "esri/tasks/support/Query",
    "esri/widgets/Expand",
    "esri/widgets/BasemapGallery",
    "esri/widgets/Editor",
    "esri/widgets/Search",
    "esri/widgets/Home"
], (
    urlUtils,
    Map,
    esriConfig,
    MapView,
    WebMap,
    FeatureLayer,
    QueryTask,
    Query,
    Expand,
    BasemapGallery,
    Editor,
    Search,
    Home
) => {

    _proxyurl = "https://gisem.osinergmin.gob.pe/proxy_developer/proxy.ashx";
    //_proxyurl = "";
    $(document).ready(function() {
        var user = localStorage.getItem("user");
        var region = localStorage.getItem("region");
        var rol = localStorage.getItem("rol");
        if (user == null || user == "") {
            localStorage.setItem('user', '');
            localStorage.setItem('region', '');
            localStorage.setItem('rol', '');
            window.location.href = "login.html";
            return
        }

        var url_department = "https://services5.arcgis.com/oAvs2fapEemUpOTy/ArcGIS/rest/services/ResultadosXY2LVGLP/FeatureServer/0";
        var url_province = "https://services5.arcgis.com/oAvs2fapEemUpOTy/ArcGIS/rest/services/ResultadosXY2LVGLP/FeatureServer/4";
        var url_distrito = "https://services5.arcgis.com/oAvs2fapEemUpOTy/ArcGIS/rest/services/ResultadosXY2LVGLP/FeatureServer/1";

        var url_informales = "https://services5.arcgis.com/oAvs2fapEemUpOTy/ArcGIS/rest/services/survey123_76549cfdea5d4828978ba44f3adfa2d8_stakeholder/FeatureServer/0";
        var urlOficinasRegionales = "https://gisem.osinergmin.gob.pe/serverosih/rest/services/Transversal/Oficinas_Regionales/MapServer/0";

        var colors = {
            'Informal': '#ED5151', //#ED5151
            'Subsanado': '#149ECE', //#149ECE
            'Potencial': '#A7C636', //#A7C636
            'Pendiente': '#9E559C', //#9E559C
            'Formalizado': '#FC921F', //#FC921F
            'En proceso': '#FFDE3E', //#FFDE3E
        };

        $("#userLi").html("Usuario : " + user.replace("@osinergmin.gob.pe", ""));
        $("#regionLi").html("Región : " + region);
        $("#divNotifications").empty();
        if (rol != "Administrador") {
            $.ajax({
                "async": true,
                "crossDomain": true,
                url: 'https://gisem.osinergmin.gob.pe/informales/notificaciones/Notification/GetNotificationForRegion/' + region,
                method: 'get', //en este caso
                "headers": {
                    "content-type": "application/json",
                    "cache-control": "no-cache",
                },
                "processData": false,
                success: function(response) {
                    response.forEach(data => {
                        $("#divNotifications").append('<li>' +
                            '<a class="dropdown-item d-flex border-bottom" href="#">' +
                            '<div class="icon__container align-self-center">' +
                            '<i class="fa-regular fa-calendar"></i>' +
                            '</div>' +
                            '<div>' +
                            '<h4 class="h6 fw-light mb-0">Tipo Establecimiento: ' + data.attributes['tipo_de_establecimiento'] + ' - ' + new Date(data.attributes['editDateTime']).toLocaleDateString() + '</h4>' +
                            '<small class="fw-lighter">Dirección: ' + data.attributes['direccion'] + '</small>' +
                            '<span class="d-block fw-lighter">Comentarios: ' + data.attributes['comentarios'] + '</p>' +
                            '</div>' +
                            '</a>' +
                            '</li>');
                    });
                },
                error: function(error) {
                    alert("Error en el servicio");
                }
            });
        }

        charts = null;
        chartsMonth = null;
        cargarItems(region);

        function cargarServicioOficinas(region, where) {
            var query = new QueryTask({ url: urlOficinasRegionales });
            var params = new Query;
            if (where != null)
                params.where = where;
            else
                params.where = "LOWER(NOM_OF_REGION) = '" + region.toLowerCase() + "'";
            params.returnGeometry = true;
            params.outFields = ["*"];
            params.orderByFields = ["NOM_OF_REGION"];
            return query.execute(params);
        }

        function cargarServicioPorOficinas(geometry, where) {
            var query = new QueryTask({ url: url_informales });
            var params = new Query;
            if (where)
                params.where = where;
            params.returnGeometry = true;
            params.outFields = ["*"];
            if (geometry)
                params.geometry = geometry;
            return query.execute(params);
        }

        function cargarItems(region) {
            $("#listInformales").empty();
            if (rol == "Administrador") {
                cargarServicioPorOficinas(null, "1=1").then(response => {
                    writeListInformales(response.features);
                })
            } else {
                cargarServicioOficinas(region).then(results => {
                    var featureData = results.features[0];
                    if (featureData != null) {
                        cargarServicioPorOficinas(featureData.geometry, null).then(response => {
                            writeListInformales(response.features);
                        })
                    }
                });
            }
        }

        function writeListInformales(features) {
            features.forEach(feature => {
                var $li = $('<li class="list-group-item bg-transparent d-flex align-items-center" id="' + feature.attributes['objectid'] + '">' +
                    '<div class="icon__container">' +
                    '<i class="fa-solid fa-circle fa-2xs" style="color: ' + colors[feature.attributes['Estado']] + ' !important;"></i>' +
                    '</div>' +
                    '<div>' +
                    '<p class="mb-0">Id: <span class="text-primary">' + feature.attributes['objectid'] + '</span></p>' +
                    '<p class="mb-0">Tipo de Establecimiento: <span class="text-success" style="color: ' + colors[feature.attributes['Estado']] + ' !important;">' + feature.attributes['tipo_de_establecimiento'] + '</span> </p>' +
                    (feature.attributes['comentarios'] == null ? '' : '<p class="mb-0">Comentarios: <span class="text-info">' + feature.attributes['comentarios'] + '</span></p>') +
                    '<p class="mb-0">Dirección: <span class="text-primary">' + feature.attributes['Direccion'] + '</span> </p>' +
                    '</div>' +
                    '</li>');
                $("#listInformales").append($li);
            });
        }

        $("#listInformales").on("click", "li", function(event) {
            var where = "Objectid = '" + event.currentTarget.id + "'";
            cargarServicioPorOficinas(null, where).then(response => {
                zoomToLayer2(response, 6);
                view.zoom = view.zoom + 6;
            })
        });

        let editor, features;
        map = new Map({
            basemap: "osm"
        });

        view = new MapView({
            container: "map",
            map: map,
            center: [-74.049, -8.185],
            zoom: 5
        });
        let basemapGallery = new BasemapGallery({
            view: view
        });

        //PROXY//
        //Descomentar para producción//
        //urlUtils.addProxyRule({
        //    urlPrefix: "https://services5.arcgis.com/oAvs2fapEemUpOTy",
        //    proxyUrl: _proxyurl
        //});

        view.watch("scale", scale => {
            cargarServicioPorOficinas(view.extent, "1=1").then(response => {
                $("#divLegend").empty();
                var datas = [];
                response.features.forEach(feature => {
                    var indexData = datas.findIndex(dataSerie => dataSerie.name == feature.attributes["Estado"]);
                    if (indexData == -1) {
                        datas.push({ name: feature.attributes["Estado"], color: colors[feature.attributes["Estado"]] });
                        indexData = datas.length - 1;
                    }
                });
                datas.forEach(data => {
                    $li = $('<li class="list-group-item"><i class="fa-solid fa-circle text-danger fa-xs" style="color:' + data.color + ' !important;"></i> ' + data.name + ' </li>');
                    $("#divLegend").append($li);
                });
            })
        });

        const MeExpand = new Expand({
            view: view,
            content: basemapGallery,
            expanded: false,
            expandTooltip: 'Mapas Base'
        });
        view.ui.add(MeExpand, 'top-left');

        var homeWidget = new Home({
            view: view
        });

        view.ui.add(homeWidget, "top-left");

        const searchWidget = new Search({
            view: view
        });
        // Adds the search widget below other elements in
        // the top left corner of the view
        view.ui.add(searchWidget, {
            position: "top-right",
            index: 2
        });

        const editThisAction = {
            title: "Editar feature",
            id: "edit-this",
            className: "esri-icon-edit"
        };

        // Create a popupTemplate for the featurelayer and pass in a function to set its content and specify an action to handle editing the selected feature
        const template = {
            title: "Local Informal",
            content: [{
                    type: "fields", // FieldsContentElement
                    fieldInfos: [{
                            fieldName: "tipo_de_establecimiento",
                            visible: true,
                            label: "Tipo de Establecimiento"
                        },
                        {
                            fieldName: "Direccion",
                            visible: true,
                            label: "Dirección"
                        },
                        {
                            fieldName: "codSuministro",
                            visible: true,
                            label: "Código Suministro"
                        },
                        {
                            fieldName: "comentarios",
                            visible: true,
                            label: "Comentarios"
                        },
                        {
                            fieldName: "Estado",
                            visible: true,
                            label: "Estado"
                        }
                    ]
                },
                {
                    type: "text", // TextContentElement
                    text: "Imagenes"
                },
                {
                    type: "attachments" // AttachmentsContentElement
                }
            ],
            actions: [editThisAction]
        };

        const featureLayer = new FeatureLayer({
            url: url_informales,
            outFields: ["*"],
            popupTemplate: template
        });

        map.add(featureLayer);
        featureLayer.queryFeatures().then(data => {
            writeElementTotal(data.features);
            writeDataChart(data.features);
            writeDataChartMonth(data.features);
        });

        function writeElementTotal(features) {
            $("#elementTotal").html(features.length);
        }

        $("#map").css("height", "100%");

        view.when(() => {
            editor = new Editor({
                allowedWorkflows: ["update"],
                view: view,
                container: document.createElement("div"),
                layerInfos: [{
                    layer: featureLayer,
                    formTemplate: {
                        elements: [{
                                type: "field",
                                fieldName: "Estado",
                                label: "Estado",
                                hint: "Estado"
                            },
                            {
                                type: "field",
                                fieldName: "comentarios",
                                label: "Comentarios",
                                hint: "Comentarios"
                            },
                            {
                                type: "field",
                                fieldName: "codSuministro",
                                label: "Código de Suministro",
                                hint: "Código de Suministro"
                            },
                            {
                                type: "field",
                                fieldName: "tipo_de_establecimiento",
                                label: "Tipo de Establecimiento",
                                hint: "Tipo de Establecimiento"
                            }
                        ]
                    }
                }]
            });

            // Execute each time the "Edit feature" action is clicked
            function editThis() {
                if (!editor.viewModel.activeWorkFlow) {
                    view.popup.visible = false;
                    var geometry = view.popup.selectedFeature.geometry;
                    var query = new QueryTask({ url: urlOficinasRegionales });
                    var params = new Query;
                    if (rol == "Administrador")
                        params.where = "1=1";
                    else
                        params.where = "LOWER(NOM_OF_REGION) = '" + region.toLowerCase() + "'";
                    params.returnGeometry = true;
                    params.outFields = ["*"];
                    params.geometry = geometry;
                    query.execute(params).then(function(response) {
                        if (response.features.length > 0) {
                            editor.startUpdateWorkflowAtFeatureEdit(view.popup.selectedFeature);
                            view.ui.add(editor, "top-left");
                            view.popup.spinnerEnabled = false;
                        } else {
                            alert("Ud. no puede editar los datos de otra Oficina Regional");
                        }
                    })
                }

                // then grab it from the DOM stack
                setTimeout(() => {
                    let arrComp = editor.domNode.getElementsByClassName("esri-editor__back-button esri-interactive");
                    if (arrComp.length === 1) {
                        arrComp[0].setAttribute("title", "Cancel edits, return to popup");
                        arrComp[0].addEventListener('click', (evt) => {
                            evt.preventDefault();
                            view.ui.remove(editor);
                            view.popup.open({
                                features: features
                            });
                        });
                    }
                }, 150);
            }
            view.popup.on("trigger-action", (event) => {
                if (event.action.id === "edit-this") {
                    editThis();
                }
            });

        });

        view.ui.add('btnDelete', "top-left");
        $("#btnDelete").on('click', function() {
            if (editor == null)
                return;
            view.ui.remove(editor);
            features.forEach((feature) => {
                feature.popupTemplate = template;
            });
            if (features) {
                view.popup.open({
                    features: features
                });
            }
            editor.viewModel.cancelWorkflow();
        });

        // Watch when the popup is visible
        view.popup.watch("visible", (event) => {
            if (editor.viewModel.state === "editing-existing-feature") {
                view.popup.close();
            } else {
                features = view.popup.features;
            }
        });

        featureLayer.on("apply-edits", () => {
            view.ui.remove(editor);
            features.forEach((feature) => {
                feature.popupTemplate = template;
            });
            //if (features) {
            //    view.popup.open({
            //        features: features
            //    });
            //}
            editor.viewModel.cancelWorkflow();
        });
        var layer = {
            url: urlOficinasRegionales,
            title: "",
            index: 0
        }
        var oficinas = [];
        var promises = [];
        var layer_oficinas = createFeatureLayer(layer, "1=1");
        map.add(layer_oficinas, 0);
        cargarServicioOficinas("", "1=1").then(results => {
            results.features.forEach(data => {
                oficinas.push({ name: data.attributes["NOM_OF_REGION"], cantidad: 0 });
                var promise = cargarServicioPorOficinas(data.geometry, null);
                promises.push(promise);
                return promise;
            })
        }).then(data => {
            Promise.all(promises).then(values => {
                oficinas.forEach((t, index) => {
                    t.cantidad = values[index].features.length;
                });
                writeListOficinas(oficinas);
            });
        });

        function writeListOficinas(results) {
            results = results.sort(function(a, b) { return b.cantidad - a.cantidad });
            results.forEach(t => {
                $li = $('<li class="list-group-item d-flex align-items-end" id="' + t.name + '"></li>');
                $("#ulOficinas").append($li);
                $h3 = $('<h3 class="h4 mb-0 text-accent-dark pe-3" id="' + t.name + '">' + t.cantidad + '</h3>');
                $p = $('<p class="h5 mb-0" id="' + t.name + '">' + t.name + '</p>');
                $li.append($h3);
                $li.append($p);
            });
        }

        $("#ulOficinas").on("click", "li", (event) => {
            var text = event.target.id;
            $("#listInformales").empty();
            $("#container").empty();
            $("#containerMes").empty();
            this.charts = null;
            this.chartsMonth = null;
            cargarServicioOficinas(text).then(results => {
                zoomToLayer2(results, 10);
                var featureData = results.features[0];
                if (featureData != null) {
                    cargarServicioPorOficinas(featureData.geometry, null).then(response => {
                        if (response.features.length == 0) {
                            this.charts = null;
                            this.chartsMonth = null;
                            return;
                        }
                        writeListInformales(response.features);
                        writeElementTotal(response.features);
                        writeDataChart(response.features);
                        writeDataChartMonth(response.features);
                    });
                }
            });

        });

        fillLegend();

        function fillLegend() {
            $("#divLegend").empty();
            Object.keys(colors).forEach(color => {
                $li = $('<li class="list-group-item"><i class="fa-solid fa-circle text-danger fa-xs" style="color:' + colors[color] + ' !important;"></i> ' + color + ' </li>');
                $("#divLegend").append($li);
            });
        }

        function zoomToLayer2(results, _zoom) {
            var sourceGraphics = results.features.map(e => { return e.geometry });
            view.goTo(sourceGraphics);

        }

        function createFeatureLayer(layer, where) {
            let featureLayer = new FeatureLayer({
                url: layer.url,
                title: layer.title,
                index: layer.index,
                uurl: layer.url,
                outFields: ["*"],
                definitionExpression: where
            });
            return featureLayer;
        }

        $("#ddlDepartamento").attr("disabled", true);
        $("#ddlProvincia").attr("disabled", true);
        $("#ddlDistrito").attr("disabled", true);

        $("#ckb").on('change', function() {
            codeUbigeo = "";
            if ($(this).is(':checked')) {
                $("#ddlDepartamento").attr("disabled", true);
                $("#ddlProvincia").attr("disabled", true);
                $("#ddlDistrito").attr("disabled", true);
                isOffice = true;
            } else {
                $("#ddlDepartamento").attr("disabled", false);
                $("#ddlProvincia").attr("disabled", false);
                $("#ddlDistrito").attr("disabled", false);
                isOffice = false;
            }
        });

        $("#ddlDepartamento").change(function() {
            if ($("#ddlDepartamento").val() != "0") {
                codeUbigeo = $("#ddlDepartamento").val();
                filtroProvince($("#ddlDepartamento").val());
            } else {
                $("#ddlProvincia").empty();
                $("#ddlDistrito").empty();
                codeUbigeo = "";
            }
        });

        $("#ddlProvincia").change(function() {
            if ($("#ddlDepartamento").val() != "0") {
                codeUbigeo = $("#ddlProvincia").val();
                filtroDistrito($("#ddlProvincia").val());
            } else {
                $("#ddlDistrito").empty();
                codeUbigeo = $("#ddlDepartamento").val();
            }
        });

        $("#ddlDistrito").change(function() {
            if ($("#ddlDepartamento").val() != "0") {
                codeUbigeo = $("#ddlDistrito").val();
            } else {
                codeUbigeo = "";
            }
        });

        filtroDepartment();

        function filtroDepartment() {
            var query = new QueryTask({ url: url_department });
            var params = new Query;
            params.returnGeometry = false;
            params.outFields = ["NOMDEPARTAMENTO", "CODDEPARTAMENTO"];
            params.where = "1=1";
            params.returnDistinctValues = true;
            query.execute(params).then(function(response) {
                $("#ddlDepartamento").append('<option value="0">Seleccione</option>');
                response.features.forEach(data => {
                    $("#ddlDepartamento").append('<option value=' + data.attributes["CODDEPARTAMENTO"] + '>' + data.attributes["NOMDEPARTAMENTO"] + '</option>');
                });
            })
        }

        function filtroProvince(val) {
            $("#ddlProvincia").empty();
            $("#ddlDistrito").empty();
            var query = new QueryTask({ url: url_province });
            var params = new Query;
            params.returnGeometry = false;
            params.outFields = ["CODPROVINCIA", "NOMPROVINCIA"];
            params.where = "CODDEPARTAMENTO = '" + val + "'";
            params.returnDistinctValues = true;
            query.execute(params).then(function(response) {
                $("#ddlProvincia").append('<option value="0">Seleccione</option>');
                response.features.forEach(data => {
                    $("#ddlProvincia").append('<option value=' + data.attributes["CODPROVINCIA"] + '>' + data.attributes["NOMPROVINCIA"] + '</option>');
                });
            })
        }

        function filtroDistrito(val) {
            $("#ddlDistrito").empty();
            var query = new QueryTask({ url: url_distrito });
            var params = new Query;
            params.returnGeometry = false;
            params.outFields = ["UBIGEO", "NOMDISTRITO"];
            params.where = "CODPROVINCIA = '" + val + "'";
            params.returnDistinctValues = true;
            query.execute(params).then(function(response) {
                $("#ddlDistrito").append('<option value="0">Seleccione</option>');
                response.features.forEach(data => {
                    $("#ddlDistrito").append('<option value=' + data.attributes["UBIGEO"] + '>' + data.attributes["NOMDISTRITO"] + '</option>');
                });
            })
        }

        $("#btnExportar").on('click', function() {
            if (isOffice) {
                var text = $("#ulOficinas").find("li.active");
                if (text.length == 0) {
                    alert("Debe seleccionar una Oficina");
                    return
                } else {
                    codeUbigeo = text.find("p").html();
                    cargarDatosOficina(codeUbigeo);
                }
            } else {
                if (codeUbigeo != "") {
                    cargarDatosPorUbigeo(codeUbigeo);
                } else {
                    alert("Debe seleccionar un ubigeo");
                }
            }
        });

        function cargarDatosOficina(cod_dist) {
            document.getElementById('tbl_datos2').innerHTML = "";
            let nombre_distrito = cod_dist;
            var depar = "";
            if (cod_dist == "Lima Norte" || cod_dist == "Lima Norte")
                depar = "Lima"
            else depar = cod_dist;

            var departamento = depar;
            var provincia = "";
            var distrito = "";

            cargarServicioOficinas(cod_dist).then(results => {
                var featureData = results.features[0];
                if (featureData != null) {
                    cargarServicioPorOficinas(featureData.geometry, null).then(response => {
                        if (response.features.length === 0) {
                            alert("No se encontraron resultados");
                        } else {
                            var registros = response.features;
                            var tabla = $("#tbl_datos2");
                            for (var i = 0; i < registros.length; i++) {
                                var atributos = registros[i].attributes;
                                var codOsinergmin = atributos["codSuministro"] != null ? atributos["codSuministro"] : "";
                                var regHidroc = atributos["tipo_de_establecimiento"] != null ? atributos["tipo_de_establecimiento"] : "";
                                var rsocial = atributos["Estado"] != null ? atributos["Estado"] : "";
                                var direccion = atributos["Direccion"] != null ? atributos["Direccion"] : "";
                                var actividad = atributos["comentarios"] != null ? atributos["comentarios"] : "";
                                tabla.append(`<tr>
                                <td>${departamento}</td>
                                <td>${provincia}</td>
                                <td>${distrito}</td>
                                <td>${codOsinergmin}</td>
                                <td>${regHidroc}</td>
                                <td>${rsocial}</td>
                                <td>${direccion}</td>
                                <td>${actividad}</td>
                                <td>SI</td>
                              </tr>`);
                            }
                            exportar('informales_oficina_' + nombre_distrito + '.xls');
                        }
                    })
                }
            });
        }

        function cargarDatosPorUbigeo(cod_dist) {
            document.getElementById('tbl_datos2').innerHTML = "";
            var url = "";
            var filtrocolumn = "UBIGEO";
            if (cod_dist.length == 2) {
                url = url_department;
                filtrocolumn = "CODDEPARTAMENTO";
            }
            if (cod_dist.length == 4) {
                url = url_province;
                filtrocolumn = "CODPROVINCIA";
            }
            if (cod_dist.length == 6) {
                url = url_distrito;
                filtrocolumn = "UBIGEO";
            }
            let nombre_distrito = cod_dist;
            let sql = filtrocolumn + " = '" + cod_dist + "'";
            var atributos2 = null;
            var departamento = null;
            var provincia = null;
            var distrito = null;
            var query = new QueryTask({ url: url });
            var params = new Query;
            params.returnGeometry = true;
            params.outFields = ["*"];
            params.where = sql;
            query.execute(params).then(function(response) {
                geometry = response.features[0].geometry;
                atributos2 = response.features[0].attributes;
                departamento = (atributos2["NOMDEPARTAMENTO"] != null) ? atributos2["NOMDEPARTAMENTO"] : "";
                provincia = (atributos2["NOMPROVINCIA"] != null) ? atributos2["NOMPROVINCIA"] : "";
                distrito = (atributos2["NOMDISTRITO"] != null) ? atributos2["NOMDISTRITO"] : "";
                var query2 = new QueryTask({ url: url_informales });
                var params2 = new Query;
                params2.returnGeometry = false;
                params2.outFields = ["*"];
                params2.geometry = geometry;
                return query2.execute(params2);
            }).then(function(response) {
                if (response.features.length === 0) {
                    alert("No se encontraron resultados");
                } else {
                    var registros = response.features;
                    var tabla = $("#tbl_datos2");
                    for (var i = 0; i < registros.length; i++) {
                        var atributos = registros[i].attributes;
                        var codOsinergmin = atributos["codSuministro"] != null ? atributos["codSuministro"] : "";
                        var regHidroc = atributos["tipo_de_establecimiento"] != null ? atributos["tipo_de_establecimiento"] : "";
                        var rsocial = atributos["Estado"] != null ? atributos["Estado"] : "";
                        var direccion = atributos["Direccion"] != null ? atributos["Direccion"] : "";
                        var actividad = atributos["comentarios"] != null ? atributos["comentarios"] : "";
                        tabla.append(`<tr>
                              <td>${departamento}</td>
                              <td>${provincia}</td>
                              <td>${distrito}</td>
                              <td>${codOsinergmin}</td>
                              <td>${regHidroc}</td>
                              <td>${rsocial}</td>
                              <td>${direccion}</td>
                              <td>${actividad}</td>
                              <td>SI</td>
                            </tr>`);
                    }
                    exportar('informales_' + nombre_distrito + '.xls');
                }
            })
        }

        function exportar(filename) {
            var $tbldatos = document.getElementById('tbl_exportar2');
            Exporter.export($tbldatos, filename, 'Informales');
            return false;
        }

        const textBright = '#F0F0F3';
        const darkTheme = {
            colors: [
                '#a6f0ff',
                '#70d49e',
                '#e898a5',
                '#007faa',
                '#f9db72',
                '#f45b5b',
                '#1e824c',
                '#e7934c',
                '#dadfe1',
                '#a0618b'
            ],

            chart: {
                backgroundColor: '#222222',
                plotBorderColor: '#606063',
                style: {
                    fontFamily: 'Roboto,Arial'
                }
            },

            title: {
                style: {
                    color: textBright,
                    fontFamily: 'Roboto,Arial'
                }
            },

            subtitle: {
                style: {
                    color: textBright,
                    fontFamily: 'Roboto,Arial'
                }
            },

            xAxis: {
                gridLineColor: '#707073',
                labels: {
                    style: {
                        color: textBright
                    }
                },
                lineColor: '#707073',
                minorGridLineColor: '#505053',
                tickColor: '#707073',
                title: {
                    style: {
                        color: textBright
                    }
                }
            },

            yAxis: {
                gridLineColor: '#707073',
                labels: {
                    style: {
                        color: textBright
                    }
                },
                lineColor: '#707073',
                minorGridLineColor: '#505053',
                tickColor: '#707073',
                title: {
                    style: {
                        color: textBright
                    }
                }
            },

            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                style: {
                    color: textBright
                }
            },

            plotOptions: {
                series: {
                    dataLabels: {
                        color: textBright
                    },
                    marker: {
                        lineColor: '#333'
                    }
                },
                boxplot: {
                    fillColor: '#505053'
                },
                candlestick: {
                    lineColor: 'white'
                },
                errorbar: {
                    color: 'white'
                },
                map: {
                    nullColor: '#353535'
                }
            },

            labels: {
                style: {
                    color: '#707073'
                }
            },

            drilldown: {
                activeAxisLabelStyle: {
                    color: textBright
                },
                activeDataLabelStyle: {
                    color: textBright
                }
            },

            navigation: {
                buttonOptions: {
                    symbolStroke: '#DDDDDD',
                    theme: {
                        fill: '#505053'
                    }
                }
            },

            rangeSelector: {
                buttonTheme: {
                    fill: '#505053',
                    stroke: '#000000',
                    style: {
                        color: '#eee'
                    },
                    states: {
                        hover: {
                            fill: '#707073',
                            stroke: '#000000',
                            style: {
                                color: textBright
                            }
                        },
                        select: {
                            fill: '#303030',
                            stroke: '#101010',
                            style: {
                                color: textBright
                            }
                        }
                    }
                },
                inputBoxBorderColor: '#505053',
                inputStyle: {
                    backgroundColor: '#333',
                    color: textBright
                },
                labelStyle: {
                    color: textBright
                }
            },

            navigator: {
                handles: {
                    backgroundColor: '#666',
                    borderColor: '#AAA'
                },
                outlineColor: '#CCC',
                maskFill: 'rgba(180,180,255,0.2)',
                series: {
                    color: '#7798BF',
                    lineColor: '#A6C7ED'
                },
                xAxis: {
                    gridLineColor: '#505053'
                }
            },

            scrollbar: {
                barBackgroundColor: '#808083',
                barBorderColor: '#808083',
                buttonArrowColor: '#CCC',
                buttonBackgroundColor: '#606063',
                buttonBorderColor: '#606063',
                rifleColor: '#FFF',
                trackBackgroundColor: '#404043',
                trackBorderColor: '#404043'
            }
        };
        // Apply the theme
        Highcharts.setOptions(darkTheme);

        function writeDataChart(features) {
            var datas = [];
            this.charts = null;
            features.forEach(feature => {
                var indexData = datas.findIndex(dataSerie => dataSerie.name == feature.attributes["Estado"]);
                if (indexData == -1) {
                    datas.push({ name: feature.attributes["Estado"], y: 0, color: colors[feature.attributes["Estado"]] });
                    indexData = datas.length - 1;
                }
                var data = datas[indexData];
                data.y += 1;
            });
            debugger;
            createChart(datas);
        }

        function createChart(datas) {
            if (this.charts != null) {
                this.charts.series[0].setData(datas);
                this.charts.redraw();
            } else
                this.charts = Highcharts.chart('container', {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: ''
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    accessibility: {
                        point: {
                            valueSuffix: '%'
                        }
                    },
                    credits: {
                        enabled: false
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
                    exporting: {
                        enabled: false
                    },
                    series: [{
                        name: 'Estados',
                        colorByPoint: true,
                        data: datas
                    }],
                    legend: {
                        itemStyle: {
                            color: 'white'
                        }
                    },
                });
        }

        function writeDataChartMonth(features) {
            this.chartsMonth = null;
            //const fechaInicio = new Date();
            // Fecha Inicial del mes
            //var fechaInicioD = new Date(fechaInicio.getFullYear(), fechaInicio.getMonth(), 1);
            var featuresFilters = features; //.filter(t=> t.attributes['CreationDate'] > fechaInicioD.getTime());
            var modificados = 0;
            featuresFilters.forEach(feature => {
                if (feature.attributes['CreationDate'] != feature.attributes['EditDate'])
                    modificados++;
            });
            if (featuresFilters.length == 0)
                return;
            var datas = [{ name: 'Registrados', data: [featuresFilters.length] }, { name: 'Modificados', data: [modificados] }];
            createChartMonth(datas);
        }

        function createChartMonth(datas) {
            if (this.chartsMonth != null) {
                this.chartsMonth.series[0].setData(datas);
                this.chartsMonth.redraw();
            } else
                this.chartsMonth = Highcharts.chart('containerMes', {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: ''
                    },
                    xAxis: {
                        categories: ['Total'],
                        crosshair: true
                    },
                    yAxis: {
                        title: {
                            useHTML: true,
                            text: 'Cantidad'
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                            '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }
                    },
                    series: datas,
                    legend: {
                        itemStyle: {
                            color: 'white'
                        }
                    },
                });

        }

        $("#closeSession").on('click', function() {
            localStorage.setItem('user', '');
            localStorage.setItem('region', '');
            localStorage.setItem('rol', '');
            window.location.href = "login.html";
        });

    });
});