let map, view;
let isOffice = true;
let codeUbigeo = "";
let urlServicePuertos = "https://gisem.osinergmin.gob.pe/validar/apipuertos/puerto";
//let urlServicePuertos = "http://localhost:27185/puerto";
let puerto;
let puertoxano;
let terminalesxano;
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

    _proxyurl = "http://gisem.osinergmin.gob.pe/proxy_developer/proxy.ashx";
    $(document).ready(async function() {
        await $.getJSON(urlServicePuertos, function(response) {
            puerto = response;
        })
        const anos = puerto.data.map(t => t.ano).filter((obj, index, array) => { return array.indexOf(obj) == index });
        prepareComboAnos()
        $("#idanos").on("change", function() {
            puertoxano = puerto.data.filter(t => t.ano == this.value);
            terminalesxano = puerto.data2.filter(t => t.ano == this.value);
            const valuesCombo = puertoxano.map(t => t.puerto).filter((obj, index, array) => { return array.indexOf(obj) == index });
            const valuesRadioButton = terminalesxano.map(t => t.terminal).filter((obj, index, array) => { return array.indexOf(obj) == index });
            createOptions(valuesCombo);
            prepareDataBarras(valuesCombo);
            prepareTerminal(valuesRadioButton);
            $("input:radio[name=terminales]").on("change", function() {
                prepareDataTable(this.value);
            });
        });

        createHighCharts();
        $("#idPuertos").on("change", function() {
            console.log(this.value);
        });
        //$("#idPuertos").on("change");
        function prepareTerminal(valuesRadioButton) {
            let values = valuesRadioButton.map((t, index) => `<input type='radio' id='combo${index}' name='terminales' value='${t}'><label for='combo${index}'>${t}</label><br>`);
            $("#idTerminal").html(values);

        }

        function prepareComboAnos() {
            let values = anos.map((t, index) => `<option id='${index}'> ${t} </option>`);
            $("#idanos").html(values);
        }

        function prepareDataTable(_terminal) {
            const terminal = terminalesxano
                .filter(t => t.terminal == _terminal);
            const productos = terminal.map(t => t.producto)
                .filter((obj, index, array) => { return array.indexOf(obj) == index });
            console.log(productos);
            const data = productos.map(t => {
                    let valor = terminal
                        .filter(t2 => t2.producto == t)
                        .map(t3 => t3.diasDespacho)
                        .reduce((a, b) => Number(a) + Number(b), 0);
                    return { nombre: t, diasAcumulados: valor };
                }).sort((a, b) => b[1] - a[1])
                .map(t => `<tr><td>${t.nombre}</td><td>${t.diasAcumulados}</td></tr>`);

            $("#idtable").html(data);
            return data
        }

        function prepareDataBarras(valuesCombo) {
            const data = valuesCombo.map(t => {
                    let acumulado = puertoxano.filter(t2 => t2.puerto == t).map(t => t.díasDeCierre).reduce((a, b) => Number(a) + Number(b), 0)
                    return [t, acumulado]
                })
                .sort((a, b) => b[1] - a[1]);
            createChartMonth(data);
        }

        function createChartMonth(datas) {
            if (this.chartsMonth != null) {
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
                            text: 'dias acumulados'
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }
                    },
                    series: [{
                        type: 'bar',
                        name: 'Puertos',
                        data: datas
                    }],
                    legend: {
                        itemStyle: {
                            color: 'white'
                        }
                    },
                });

        }

        function createOptions(valuesCombo) {
            let values = valuesCombo.map((t, index) => `<option id='${index}'> ${t} </option>`);
            $("#idPuertos").html(values);
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