/**
 * url de referencia bibliográfica para wkid's 
 * https://epsg.io/?q=Peru
 * https://gidahatari.com/ih-es/cuantos-sistemas-de-proyeccion-existen-para-peru-colombia-y-argentina
 */

define([
    "esri/tasks/GeometryService",
    "esri/tasks/support/ProjectParameters",
    "esri/geometry/SpatialReference",
    "esri/geometry/Point",
    "esri/layers/GraphicsLayer",
    "esri/Graphic",
], function (
    GeometryService,
    ProjectParameters,
    SpatialReference,
    Point,
    GraphicsLayer,
    Graphic
) {
    var __zona = '',
        __aux_zona = '',
        __typecoordenada = 'geografica',
        __symbol = {
            type: "simple-marker",
            color: 'red',
            width: 1,
            size: 10,
            outline: {
                color: "#3dff3d",
                width: 1
            }
        },
        __lblcoord = {
            type: "text",
            color: "#075daa",
            haloColor: "white",
            haloSize: "2px",
            text: null,
            yoffset: -15,
            font: {
                size: 11,
                family: "arial",
            }
        },
        __lbldatum = {
            type: "text",
            color: "#044075",
            haloColor: "white",
            haloSize: "2px",
            text: null,
            yoffset: 20,
            font: {
                size: 10,
                family: "arial",
            }
        };

    const _sr_geografica = new SpatialReference({ wkid: 4326 });

    var $cmbproyectada = $('#cmb_proyectada_zona'),
        $cmbwgs84 = $('#cmb_proyectada_wgs84'),
        $cmbpsad56 = $('#cmb_proyectada_psad56'),
        $txtcoord1 = $('#txt_coord1'),
        $txtcoord2 = $('#txt_coord2');
   
    var _gly_coodxy = new GraphicsLayer({
        listMode: "hide",
        title: 'gly_coodXY'
    });
    __globspace.map.add(_gly_coodxy);

    // Evento lanzado para cambiar sistemas de coordenadas
    $('#cmb_sistemacoord').on('change', function () {
        let option = $(this).val();
        $txtcoord1.val('');
        $txtcoord2.val('');
        if (option == 'proyectada') {
            $('#lbl_coord').text('Este');
            $('#lbl_coord2').text('Norte');
            $('#wg_searchxy .container-proyectada').removeClass('visible').addClass('notvisible');
            $cmbproyectada.parents('.container-proyectada').removeClass('notvisible').addClass('visible');
            $cmbproyectada.prop('selectedIndex', 0);
            $cmbwgs84.parents('.container-proyectada').removeClass('notvisible').addClass('visible');
            __typecoordenada = 'wgs84';
        } else {
            $('#lbl_coord').text('Longitud');
            $('#lbl_coord2').text('Latitud');
            $('#wg_searchxy .container-proyectada').removeClass('visible').addClass('notvisible');
            __typecoordenada = 'geografica';
        }
    });

    // Evento lanzadado para cambiar el tipo de datum
    $cmbproyectada.on('change', function () {
        let option = $(this).val(); 
        if(option == 'wgs84'){
            $cmbwgs84.parents('.container-proyectada').removeClass('notvisible').addClass('visible');
            $cmbpsad56.parents('.container-proyectada').removeClass('visible').addClass('notvisible');
            __typecoordenada ='wgs84';
        }else{
            $cmbwgs84.parents('.container-proyectada').removeClass('visible').addClass('notvisible');
            $cmbpsad56.parents('.container-proyectada').removeClass('notvisible').addClass('visible');
            __typecoordenada = 'psad56';
        }
    });

    // Evento lanzado para buscar la coordenada
    $('#form_searchXY').on('submit', function (evt) {
        evt.preventDefault();

        const _sr_z17_wgs84 = new SpatialReference({ wkid: 32717 }),
            _sr_z18_wgs84 = new SpatialReference({ wkid: 32718 }),
            _sr_z19_wgs84 = new SpatialReference({ wkid: 32719 }),
            _sr_z17_psad56 = new SpatialReference({ wkid: 24877 }),
            _sr_z18_psad56 = new SpatialReference({ wkid: 24878 }),
            _sr_z19_psad56 = new SpatialReference({ wkid: 24879 });

        let coordx = $txtcoord1.val();
        let coordy = $txtcoord2.val();
        let zona = '';
        if (coordy.trim().length == 0 || coordx.trim().length == 0) {
            alertMessage('Coordenadas Obligatorias', 'warning', 'top-center', true);
        } else {
            if (__typecoordenada == 'wgs84') {
                zona = $cmbwgs84.val();
                switch (zona) {
                    case 'sr_z17_wgs84':
                        __aux_zona = _sr_z17_wgs84;
                        __zona = '17';
                        break;
                    case 'sr_z18_wgs84':
                        __aux_zona = _sr_z18_wgs84;
                        __zona = '18';
                        break;
                    case 'sr_z19_wgs84':
                        __aux_zona = _sr_z19_wgs84;
                        __zona = '19';
                        break;
                    default:
                        alertMessage('Seleccione una zona UTM !', 'warning', 'top-center', true);
                        break;

                }
                if (!zona == '') {
                    let point = new Point(coordx, coordy, __aux_zona);
                    __lblcoord.text = `${coordx}E \n ${coordy}N `;
                    __lbldatum.text = `WGS84 \n Zona: ${__zona}`;
                    goLocation(point, __lblcoord, __lbldatum);
                }
            }
            else if(__typecoordenada == 'psad56') {
                zona = $cmbpsad56.val();
                switch (zona) {
                    case 'sr_z17_psad56':
                        __aux_zona = _sr_z17_psad56;
                        __zona = '17';
                        break;
                    case 'sr_z18_psad56':
                        __aux_zona = _sr_z18_psad56;
                        __zona = '18';
                        break;
                    case 'sr_z19_psad56':
                        __aux_zona = _sr_z19_psad56;
                        __zona = '19';
                        break;
                    default:
                        alertMessage('Seleccione una zona UTM !', 'warning', 'top-center', true);
                        break;

                }
                if (!zona == '') {
                    let point = new Point(coordx, coordy, __aux_zona);
                    __lblcoord.text = `${coordx}E \n ${coordy}N `;
                    __lbldatum.text = `PSAD56 \n Zona: ${__zona}`;
                    goLocation(point, __lblcoord, __lbldatum);
                }
            }
            else if(__typecoordenada == 'geografica') {
                if (!(coordx > -181 && coordx < 181)) {
                    alertMessage('La longitud ingresada esta fuera de rango.  Por favor ingrese un valor comprendido entre (-180, 180). ', 'warning', 'top-center', true);
                } else if (!(coordx > -91 && coordx < 91)) {
                    alertMessage('La latitud ingresada esta fuera de rango.  Por favor ingrese un valor comprendido entre (-90, 90). ', 'warning', 'top-center', true);
                } else {
                    __aux_zona = _sr_geografica;
                    let point = new Point(coordx, coordy, __aux_zona);
                    __lblcoord.text = ` Longitud: ${point.longitude} \n Latitud: ${point.latitude}`;
                    __lbldatum.text = '';
                    goLocation(point, __lblcoord, __lbldatum);
                }
            }
        }
    });

    //Evento lanzado para limpiar toda la operación
    $('#wg_searchxy').on('click', '.btn-limpiar', function () {
        clearAllOperation();
    });

    //Evento lanzado para abrir mensaje de confirmación al querer cerrar
    $("#wg_searchxy").on('click', '.btn-close', function (e) {
        $('#lbl_titletool').text('Buscar Coordenada');
        $('#modalcleartool').modal('show');
        $('#btn_yescleartool').removeClass().addClass('btn-confirm wg-searchxy');
    });

    //Evento lanzado al confirmar el cerrar (limpiar)
    $('#modalcleartool').on('click', '#btn_yescleartool.wg-searchxy', function (event) {
        clearAllOperation();
        $('#modalcleartool').modal('hide');
        $('#btn_yescleartool').removeClass('wg-searchxy');

        $('#wg_searchxy').removeClass("visible").addClass("notvisible");

    });

    function goLocation(point, lblcoord, lbldatum) {
        let _geometryservice = new GeometryService("https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer");
        let _projectparams = new ProjectParameters();
        _projectparams.geometries = [point];
        _projectparams.outSpatialReference = _sr_geografica;

        _geometryservice.project(_projectparams).then(function (projectedPoint) {
            let geometry = projectedPoint[0];

            if (_gly_coodxy.graphics.length === 0) {
                let _gra_coordxy = new Graphic({
                    geometry: geometry,
                    symbol: __symbol
                });
                let _gra_lblcoord = new Graphic({
                    geometry: geometry,
                    symbol: lblcoord
                });
                let _gra_lbldatum = new Graphic({
                    geometry: geometry,
                    symbol: lbldatum
                });
                _gly_coodxy.addMany([_gra_coordxy, _gra_lblcoord, _gra_lbldatum]);
            } else {
                _gly_coodxy.graphics.getItemAt(0).geometry = geometry;
                _gly_coodxy.graphics.getItemAt(1).geometry = geometry;
                _gly_coodxy.graphics.getItemAt(1).symbol = lblcoord;
                _gly_coodxy.graphics.getItemAt(2).geometry = geometry;
                _gly_coodxy.graphics.getItemAt(2).symbol = lbldatum;
            }

            __globspace.view.when(function () {
                __globspace.view.goTo({
                    target: _gly_coodxy.graphics.toArray()
                });
            });

        }, function (error) {
            console.error(error);
            console.error(error.details);
        });
    }

    function clearAllOperation() {
        _gly_coodxy.removeAll();
        __typecoordenada = 'geografica';
        $txtcoord1.val('');
        $txtcoord2.val('');
        $cmbproyectada.prop('selectedIndex', 0);
        $cmbwgs84.prop('selectedIndex', 0);
        $cmbpsad56.prop('selectedIndex', 0);
        $('#cmb_sistemacoord').prop('selectedIndex', 0);
        $('#wg_searchxy .container-proyectada').removeClass('visible').addClass('notvisible');
    }

});


/* REVISADO ♠ */