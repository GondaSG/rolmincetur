define([
  "js/helper",
  "js/core/permission",  

  "esri/widgets/Sketch",
  "esri/layers/GraphicsLayer",

  "dojo/domReady!"
], function (
  Helper,
  Permission,

  Sketch,
  GraphicsLayer,
) {

  var _sketch = "";
  var _gly_draw = new GraphicsLayer({
    listMode: "hide",
    title: "Draw"
  });
  
  // Variables de Permisos
  var __permisos_tools = Permission.getPermisosTools();

  $(function(){
    if(__permisos_tools.indexOf('Dibujar') != -1){ 
      __globspace.map.add(_gly_draw);      
      $.get("./view/widgets-tools.html", function(data) { 
        $('#wg_draw').append($(data).find("#wg_draw_content"));
        initDraw();
      });        
    }
  });   

  function initDraw() {
    _sketch = new Sketch({
      view: __globspace.view,
      layer: _gly_draw,
      container: 'container_sketch'
    });

    // Color de relleno blanco con 50% transparencia
    let fillColor = [255, 255, 255, .5]; 

    //contorno rojo
    let stroke = {
      color: [255, 0, 0],
      width: 1
    }

    //Anular todos los colores y tamaños de símbolos predeterminados
    let pointSymbol = _sketch.viewModel.pointSymbol;
    pointSymbol.color = fillColor;
    pointSymbol.outline = stroke;
    pointSymbol.size = 8;

    let polylineSymbol = _sketch.viewModel.polylineSymbol;
    polylineSymbol.color = stroke.color;
    polylineSymbol.width = stroke.width;

    let polygonSymbol = _sketch.viewModel.polygonSymbol;
    polygonSymbol.color = fillColor;
    polygonSymbol.outline = stroke;

    _sketch.on("create", function (event) {
      Helper.createTooltipInstructions();
      if (event.state == "complete") {
        Helper.hideTooltipInstructions();
      }
    });
  }

  function clearAllOperation() {
    _gly_draw.removeAll();
    _sketch.cancel();
    Helper.hideTooltipInstructions();
  }


  /*********************** UX ****************************/

  // Evento lanzado para mostrar las indicaciones para dibujar
  $('#wg_draw').on('click', '.esri-sketch__button', function () {
    let msm = '';
    if ($(this).hasClass('esri-icon-map-pin') && !$(this).hasClass('esri-sketch__button--selected')) {
      msm = 'Click en el mapa para agregar un punto.'
    }
    if ($(this).hasClass('esri-icon-polyline') && !$(this).hasClass('esri-sketch__button--selected')) {
      msm = 'Click en el mapa para comenzar a dibujar una polilínea. Doble clic para finalizar.'
    }
    if ($(this).hasClass('esri-icon-polygon') && !$(this).hasClass('esri-sketch__button--selected')) {
      msm = 'Click en el mapa para comenzar a dibujar un polígono. Doble clic para finalizar.'
    }
    if ($(this).hasClass('esri-icon-checkbox-unchecked') && !$(this).hasClass('esri-sketch__button--selected')) {
      msm = 'Click en el mapa para agregar un cuadrado o mantén presionado el botón izquierdo del ratón para comenzar y suelta para finalizar.'
    }
    if ($(this).hasClass('esri-icon-radio-unchecked') && !$(this).hasClass('esri-sketch__button--selected')) {
      msm = 'Clic en el mapa para agregar un círculo o mantén presionado el botón izquierdo del ratón para comenzar y suelta para finalizar.'
    }
    if (msm == '') {
      Helper.hideTooltipInstructions();
    } else {
      $('#tooltip_mouse span').text(msm);
      Helper.createTooltipInstructions();
    }
  });

  

  //Evento lanzado para abrir mensaje de confirmación al querer cerrar
  $("#wg_draw").on('click', '.btn-close', function (e) {
    $('#lbl_titletool').text('Dibujar');
    $('#modalcleartool').modal('show');
    $('#btn_yescleartool').removeClass().addClass('btn-confirm wg-draw');
  });

  //Evento lanzado al confirmar el cerrar (limpiar)
  $('#modalcleartool').on('click', '#btn_yescleartool.wg-draw', function (event) {
    clearAllOperation();
    $('#modalcleartool').modal('hide');
    $('#btn_yescleartool').removeClass('wg-draw');

    $('#wg_draw').removeClass("visible").addClass("notvisible");
  });


  //Evento lanzado para abrir mensaje de confirmación al querer borrar los graficos
  $('#wg_draw').on('click', '.btn-limpiar', function () {
    $('#modalcleartooldraw').modal();
  });

  //Evento lanzado al confirmar el borrar graficos 
  $('#modalcleartooldraw').on('click', '#btn_yescleartooldraw', function (event) {
    clearAllOperation();
    $('#modalcleartooldraw').modal('hide');
  });
  //Evento lanzado al cancelar el borrar graficos 
  $('#modalcleartooldraw').on('click', '#btn_notcleartooldraw', function (event) {
    $('#modalcleartooldraw').modal('hide');
  });

});

/* REVISADO ♠ */