let map, view;
let isOffice = true;
let codeUbigeo = "";
let urlServicePuertos = "https://gisem.osinergmin.gob.pe/validar/puerto/apipuertos/puerto";
//let urlServicePuertos = "http://localhost:27185/puerto";
let puerto;
let puertoxano;
let terminalesxano;
let terminalxanolast;
let terminalxpuerto;
let ano;
const symBlue = {
    type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
    color: "blue",
    outline: { // autocasts as new SimpleLineSymbol()
        color: [74, 33, 255, 0.5],
        width: 5
    }
};
const symRed = {
    type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
    color: "red",
    outline: { // autocasts as new SimpleLineSymbol()
        color: [250, 0, 35, 0.5],
        width: 5
    }
};
require([
    "esri/core/urlUtils",
    "esri/Map",
    "esri/config",
    "esri/views/MapView",
    "esri/WebMap",
    "esri/Graphic",
    "esri/layers/FeatureLayer",
    "esri/tasks/QueryTask",
    "esri/tasks/support/Query",
    "esri/widgets/Expand",
    "esri/widgets/BasemapGallery",
    "esri/widgets/Editor",
    "esri/widgets/Search",
    "esri/widgets/Home",
    "esri/widgets/Legend",
    "esri/widgets/LayerList",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/layers/GraphicsLayer"
], (
    urlUtils,
    Map,
    esriConfig,
    MapView,
    WebMap,
    Graphic,
    FeatureLayer,
    QueryTask,
    Query,
    Expand,
    BasemapGallery,
    Editor,
    Search,
    Home,
    Legend,
    LayerList,
    SimpleMarkerSymbol,
    GraphicsLayer
) => {

    _proxyurl = "http://gisem.osinergmin.gob.pe/proxy_developer/proxy.ashx";
    $(document).ready(async function() {

        var urlPuertos1 = "https://services5.arcgis.com/oAvs2fapEemUpOTy/arcgis/rest/services/DISPONIBILIDAD_PUERTOS_Capa_vista/FeatureServer/0";
        var urlPuertos2 = "https://services5.arcgis.com/oAvs2fapEemUpOTy/arcgis/rest/services/DISPONIBILIDAD_PUERTOS_Capa_vista/FeatureServer/1";
        var urlPuertos3 = "https://services5.arcgis.com/oAvs2fapEemUpOTy/arcgis/rest/services/DISPONIBILIDAD_PUERTOS_Capa_vista/FeatureServer/2";
        var layer1 = {
            url: urlPuertos1,
            title: "L??mite Departamental",
            index: 0
        }
        var layer2 = {
            url: urlPuertos2,
            title: "Terminales",
            index: 0
        }
        var layer3 = {
            url: urlPuertos3,
            title: "Puertos",
            index: 0
        }

        map = new Map({
            basemap: "osm"
        });

        view = new MapView({
            container: "map",
            map: map,
            center: [-74.049, -8.185],
            zoom: 5
        });

        var homeWidget = new Home({
            view: view
        });

        let layerList = new LayerList({
            view: view
                //listItemCreatedFunction: (event) => {
                //    const item = event.item;
                //    if (item.layer.title == "Puerto Cerrado" || item.layer.title == "Puerto Abierto") {
                //        // don't show legend twice
                //        item.panel = {
                //            content: "legend",
                //            open: true
                //        };
                //    }
                //}
        });
        layerListExpand = new Expand({
            expandIconClass: "esri-icon-layer-list", // see https://developers.arcgis.com/javascript/latest/guide/esri-icon-font/
            // expandTooltip: "Expand LayerList", // optional, defaults to "Expand" for English locale
            view: view,
            content: layerList
        });
        // Adds widget below other elements in the top left corner of the view


        //view.ui.add(homeWidget, "top-left");
        view.ui.add(layerListExpand, "top-left");
        $("#map").css("height", "100%");
        $("#containerBarra").css("height", window.innerHeight - 160 + "px");

        var layer_Feature1 = await createFeatureLayer(layer1, "1=1");
        var layer_Feature2 = await createFeatureLayer1(layer2, "1=1");
        var layer_Feature3 = await createFeatureLayer2(layer3, "1=1");
        map.add(layer_Feature1, 0);
        map.add(layer_Feature2, 0);
        //map.add(layer_Feature3, 0);


        let highlight, statesLyrView, citiesLayerView;

        //view.whenLayerView(layer_Feature2).then(function(layerView) {
        //   statesLyrView = layerView;
        //});
        //
        //view.whenLayerView(layer_Feature3).then(function(layerView) {
        //   citiesLayerView = layerView;
        //});
        function createFeatureLayer(layer, where) {
            let featureLayer = new FeatureLayer({
                url: layer.url,
                title: layer.title,
                //index: layer.index,
                //uurl: layer.url,
                outFields: ["*"],
                definitionExpression: where
            });
            return featureLayer;
        }

        function createFeatureLayer1(layer, where) {
            let featureLayer = new FeatureLayer({
                url: layer.url,
                title: layer.title,
                //index: layer.index,
                //uurl: layer.url,
                outFields: ["*"],
                definitionExpression: where
            });
            return featureLayer;
        }

        function createFeatureLayer2(layer, where) {
            let featureLayer = new FeatureLayer({
                url: layer.url,
                title: layer.title,
                //index: layer.index,
                //uurl: layer.url,
                outFields: ["*"],
                definitionExpression: where,
                popupTemplate: {
                    title: layer.title,
                    content: [{
                        type: "fields",
                        fieldInfos: [
                            { fieldName: "ESTADO", label: "Estado" },
                            { fieldName: "NOMINS", label: "Instalaci??n Portuaria" },
                            { fieldName: "F_Apertura", label: "??ltima Apertura" },
                            { fieldName: "F_Cierre", label: "??ltimo Cierre" }
                        ]
                    }]
                }

            });
            return featureLayer;
        }

        //view.on("click", (event) => {
        //    console.log(event);
        //    const query = {
        //        geometry: event.mapPoint,
        //        returnGeometry: true
        //    };
        //    statesLyrView.queryFeatures(query).then((results) => {
        //        console.log(results);
        //        if (results.features.length > 0) {
        //            if (highlight) {
        //                highlight.remove();
        //            }
        //            // highlight query results
        //            highlight = statesLyrView.highlight(results.features);
        //
        //            citiesLayerView.filter = {
        //                geometry: results.features[0].geometry
        //            };
        //        }
        //        else {
        //            citiesLayerView.queryFeatures(query).then((results) => {
        //                console.log(results);
        //                if (results.features.length > 0) {
        //                    if (highlight) {
        //                        highlight.remove();
        //                    }
        //                    // highlight query results
        //                    highlight = citiesLayerView.highlight(results.features);
        //
        //                    layer_Feature3.filter = {
        //                        geometry: results.features[0].geometry
        //                    };
        //                }
        //            });
        //        }               
        //
        //    });
        //});



        //view.whenLayerView(layer_Feature3).then(function(featureLayerView) {
        view.on("click", function(event) {
            view.hitTest(event).then(function(response) {
                if (highlight) {
                    highlight.remove();
                }
                if (response.results.length) {
                    var feature2 = response.results.filter(function(result) {
                        return result.graphic.layer.title === "Puerto Abierto" || result.graphic.layer.title === "Puerto Cerrado";
                    });
                    if (feature2.length > 0) {
                        var feature = feature2[0].graphic;
                        prepareDataBarras([feature.attributes.instalaci??nPortuariaEst??ndar])
                        prepareDataClick([feature.attributes.instalaci??nPortuariaEst??ndar]);
                        //highlight = featureLayerView.highlight(feature);
                    } else {
                        view.whenLayerView(layer_Feature2).then(function(featureLayerView2) {
                            var feature3 = response.results.filter(function(result) {
                                return result.graphic.layer === layer_Feature2;
                            });
                            if (feature3.length > 0) {
                                var feature4 = feature3[0].graphic;
                                prepareDataBarras([feature4.attributes.TERMINAL])
                                prepareDataClick([feature4.attributes.TERMINAL.replace("CALLAO", "CALLAO (MUELLE 7)")]);
                                highlight = featureLayerView2.highlight(feature4);
                            } else {
                                prepareData(getAno());
                            }
                        });
                    }
                }
            });
        });
        //});


        await $.getJSON(urlServicePuertos, function(response) {
            puerto = response;
            $(".header__right__date").html("Fecha de Actualizaci??n: " + puerto.lastModificationDate);
            $(".loading").hide()
        })
        const anos = puerto.data.map(t => t.ano).filter((obj, index, array) => { return array.indexOf(obj) == index });
        prepareComboAnos()
            //createHighCharts();
        $("#idPuertos").on("change", function() {
            console.log(this.value);
        });

        function prepareData(ano) {
            puertoxano = getPuertoxAnos(ano);
            createFeatureLayers()
            terminalxpuerto = puertoxano.map(t => t.instalaci??nPortuariaEst??ndar).filter(t => t != '-').filter((obj, index, array) => { return array.indexOf(obj) == index });
            terminalesxano = getTerminalesxAno(ano);
            const valuesRadioButton = getValuesRadioButton(terminalxpuerto);
            const valuesCombo = puertoxano.map(t => t.instalaci??nPortuariaEst??ndar).filter(t => t != '-').filter((obj, index, array) => { return array.indexOf(obj) == index });
            terminalxanolast = getTerminalxanolast()
            prepareDataBarras(valuesCombo);
            prepareTerminal(valuesRadioButton);
            prepareRadioEventClick();

        }

        function prepareRadioEventClick() {
            $("input:radio[name=terminales]").on("change", function() {
                prepareDataTable(this.value, terminalxanolast);
                getPuertoxTerminal(this.value)
            });
        }

        function getPuertoxTerminal(_terminal) {
            let array = terminalxanolast.filter(t => t.terminal == _terminal)
            if (array.length) {
                prepareDataBarras([array[0].puerto])
                graficarPuntoPuerto(array[0].puerto)
            }
            return null
        }

        function getTerminalxanolast() {
            const fecha = terminalesxano.map(t => {
                    return { fecha1: new Date(t.fecha), date: t.sdate }
                })
                .sort((a, b) => b.fecha1 - a.fecha1);
            if (fecha.length > 0) {
                let fechalast = fecha[0].date;
                terminalxanolast = terminalesxano.filter(t => t.sdate == fechalast);
            }
            return terminalxanolast;
        }

        function getPuertoxAnos(ano) {
            return puerto.data.filter(t => t.ano == ano);
        }

        function getTerminalesxAno(ano) {
            return puerto.data2.filter(t => t.ano == ano);
        }

        function getAno() {
            return $("#idanos>button.active").attr("value")
        }

        function getValuesRadioButton(arrayPuertos) {
            return arrayPuertos.map(t => {
                let valor = '';
                let isValues = terminalesxano
                    .find(t3 => t3.puerto == t);
                if (!isValues) return valor;
                valor = terminalesxano
                    .filter(t2 => t2.puerto == t)
                    .map(t3 => t3.terminal)
                    .filter((obj, index, array) => { return array.indexOf(obj) == index })
                return valor;
            }).filter(t => t != '');
        }

        function prepareTerminal(valuesRadioButton) {
            let values = valuesRadioButton.map((t, index) => `<div class="form-check"><input class="form-check-input" type="radio" name="terminales" value='${t}' ${index == 0 ? 'checked':''} id="combo${index}"><label class="form-check-label" for="combo${index}">${t}</label></div>`);
            $("#idTerminal").html(values);

        }

        function prepareComboAnos() {
            let values = anos.map(t => `<button type="button" value='${t}' class="btn btn-primary-light text-primary">${t}</button>`).reverse();
            $("#idanos").html(values);
            let lastano = anos[0];
            $('#idanos>button[value=' + lastano + ']').addClass("active");
            $("#idanos>button").on("click", function() {
                $("#idanos>button").removeClass("active");
                $(this).addClass("active");
                prepareData($(this).attr("value"));
                let terminal = $("input:radio[name=terminales]:checked").attr('value')
                prepareDataTable(terminal, terminalxanolast);
                resetLayer();
            });
            $('#idanos>button.active').trigger("click");
        }

        function prepareDataTable(_terminal, terminalxanolast) {
            const terminal = terminalxanolast
                .filter(t => t.terminal == _terminal)
                .map(t => {
                    let _diasDespacho = Math.ceil(Number(t.diasDespacho))
                    let status = _diasDespacho < 6 ? 'bg-danger' : _diasDespacho < 16 ? 'bg-warning' : 'bg-success';
                    return `<tr><td>${t.producto}</td><td class='text-center ${status}'>${_diasDespacho}</td></tr>`
                });
            $("#idtable").html(terminal);
            $(".etiquetatabla").html(' AUTONOMIA DEL TERMINAL ' + _terminal + ' AL ' + terminalxanolast[0].sdate)
        }

        function prepareDataBarras(valuesCombo) {
            const data = valuesCombo.map(t => {
                    let acumulado = puertoxano
                        .filter(t2 => t2.instalaci??nPortuariaEst??ndar == t)
                        .map(t3 => t3.d??asDeCierre)
                        .reduce((a, b) => Number(a) + Number(b), 0)
                    return [t, Number(acumulado.toFixed(2))]
                })
                .sort((a, b) => b[1] - a[1]);
            createChartMonth(data);
        }

        function prepareDataClick(puerto) {
            const valuesRadioButton = getValuesRadioButton([puerto])
            prepareTerminal(valuesRadioButton);
            prepareRadioEventClick();
            let texto = '';
            if (valuesRadioButton.length) {
                prepareDataTable(valuesRadioButton[0], terminalxanolast);
                texto = valuesRadioButton[0];
            } else {
                $("#idtable").html(`<tr><td colspan="2" class="text-center">Sin informaci??n</td></tr>`);
                $(".etiquetatabla").html(' AUTONOMIA DEL TERMINAL ')
            }
        }

        function createChartMonth(datas) {
            if (this.chartsMonth != null) {
                this.chartsMonth.xAxis[0].categories = datas.map(t => t[0]);
                this.chartsMonth.series[0].setData(datas);
                this.chartsMonth.redraw();
            } else
                this.chartsMonth = Highcharts.chart('containerBarra', {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: ''
                    },
                    xAxis: {
                        categories: datas.map(t => t[0]),
                        crosshair: true
                    },
                    yAxis: {
                        title: {
                            useHTML: true,
                            text: 'd??as acumulados'
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        },
                        bar: {
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.y}</b>'
                            }
                        }

                    },
                    series: [{
                        type: 'bar',
                        name: 'Puertos',
                        data: datas,
                        allowPointSelect: true,
                        events: {
                            click: function(event) {
                                graficarPuntoPuerto(event.point.category)
                                prepareDataClick(event.point.category)
                            }
                        }
                    }],
                    legend: {
                        itemStyle: {
                            color: 'black'
                        }
                    },
                });

        }

        function resetLayer() {
            layer_Feature3.definitionExpression = "1 = 1";
            layer_Feature2.definitionExpression = "1 = 1";
            view.center = [-74.049, -8.185];
            view.zoom = 5;
        }

        function graficarPuntoPuerto(puerto) {
            console.log(puerto);
            layer_Feature3.definitionExpression = "NOMINS = '" + puerto + "'";
            var query = layer_Feature3.createQuery();
            query.where = "NOMINS = '" + puerto + "'";
            query.spatialRelationship = "intersects";
            layer_Feature3.queryFeatures(query).then(response => {
                console.log(response);
                zoomToLayer2(response, 10);
            });
        }

        function graficarPuntoTerminal(terminal) {
            layer_Feature2.definitionExpression = "TERMINAL = '" + terminal + "'";
            var query = layer_Feature2.createQuery();
            query.where = "TERMINAL = '" + terminal + "'";
            query.spatialRelationship = "intersects";
            layer_Feature2.queryFeatures(query).then(response => {
                console.log(response);
                zoomToLayer2(response, 10);
            });
        }

        function zoomToLayer2(results, _zoom) {
            var sourceGraphics = results.features.map(e => { return e.geometry });
            view.goTo(sourceGraphics);
            if (_zoom)
                view.zoom = 10;
        }

        function createFeatureLayers() {
            map.remove(map.findLayerById("blue"))
            map.remove(map.findLayerById("red"))
            let query = new Query();
            query.where = "1=1";
            query.outFields = ["*"];
            query.returnGeometry = true;
            layer_Feature3.queryFeatures(query).then(function(results) {
                let puertoxanoxmajorDate = puertoxano
                    .map(t => t.instalaci??nPortuariaEst??ndar)
                    .filter((obj, index, array) => { return array.indexOf(obj) == index })
                    .map(t => {
                        let data = puertoxano
                            .filter(filter => filter.instalaci??nPortuariaEst??ndar == t)
                            .filter(filter => filter.fechaHoraApertura != null)
                            .map(_map => {
                                return { date: new Date(_map.fechaHoraApertura), content: _map }
                            }).sort((a, b) => a.date + b.date)
                        return data[0]
                    });
                let grapishtt = puertoxanoxmajorDate.map(t => {
                    let valores = results.features.filter(fea => fea.attributes.NOMINS == t.content.instalaci??nPortuariaEst??ndar)
                    if (valores.length) {
                        return new Graphic(
                            valores[0].geometry,
                            t.content.estado == "ABIERTO" ? symBlue : symRed,
                            t.content, {
                                title: "Puertos",
                                content: "<strong>Estado</strong> : {estado}<br><strong>Instalacion Portuaria</strong> : {instalaci??nPortuariaEst??ndar}<br><strong>Motivo</strong> : {motivo}<br><strong>??ltim?? Cierre</strong> : {fechaHoraCierre}<br><strong>??ltima Apertura</strong> : {fechaHoraApertura}"
                            }
                        )
                    }
                }).filter(t => t != undefined)
                let layer = new GraphicsLayer({
                    graphics: grapishtt.filter(t => t.attributes.estado == "ABIERTO")
                });
                let layer2 = new GraphicsLayer({
                    graphics: grapishtt.filter(t => t.attributes.estado == "CERRADO")
                });
                layer.title = "Puerto Abierto"
                layer2.title = "Puerto Cerrado"
                layer.id = "blue"
                layer2.id = "red"
                map.add(layer);
                map.add(layer2);
            });
        }

        function createHighCharts() {
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
        }
    });
});