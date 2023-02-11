define([
  "esri/widgets/DistanceMeasurement2D",
  "esri/widgets/AreaMeasurement2D"

], function (
  DistanceMeasurement2D,
  AreaMeasurement2D
) {

  var _area2d = null;
  var _distancia2d = null;
  var activedwidget = false;

  function reactivarWidgets(){
    let $containerdistancia = document.createElement("div");
    $containerdistancia.id = 'container_distancia2d';
    $containerdistancia.className = 'notvisible';
    
    let $containerarea = document.createElement("div");
    $containerarea.id = 'container_area2d';
    $containerarea.className = 'notvisible';

    $('#container_wg_medir').append($containerarea);
    $('#container_wg_medir').append($containerdistancia);

    _area2d = new AreaMeasurement2D({
      view: __globspace.view,
      container : "container_area2d"  
    });
  
    _distancia2d = new DistanceMeasurement2D({
      view: __globspace.view,
      container : "container_distancia2d",
      unit : 'hectares'
    });

  }

  // Evento lanzado para comenzar a medir
  $("#wg_medir2d").on('click', '.btn-medir2d', function () {
    
    if(!activedwidget){
      activedwidget = true;
      reactivarWidgets();
    }

    $('.container-wg-medir .esri-button ').tooltip('disable');
    $('.btn-medir2d').removeClass('active');
    $(this).addClass('active');
    
    let typemeasure = $(this).val();
    
    switch (typemeasure) {
      case 'distancia2d':
        $('#container_distancia2d').toggleClass('visible notvisible');
        $('#container_area2d').addClass('notvisible').removeClass('visible');
        
        setTimeout(() => {
          $('.esri-direct-line-measurement-3d__actions button').tooltip('disable');
        }, 500);

        break;

      case 'area2d':
        $('#container_area2d').toggleClass('visible notvisible');
        $('#container_distancia2d').addClass('notvisible').removeClass('visible');
        
        setTimeout(() => {
          $('.esri-area-measurement-3d__actions button').tooltip('disable');
        }, 500);
        
        break;

      case 'clear':
        
        $('#modalcleartoolmeasure').modal();
        
        break;
    }
  });

  //Evento lanzado para abrir mensaje de confirmación al querer cerrar
  $("#wg_medir2d").on('click', '.btn-close', function (e) {
    $('#lbl_titletool').text('Medir');
    $('#modalcleartool').modal('show');
    $('#btn_yescleartool').removeClass().addClass('btn-confirm wg-medir2d');
  });

  //Evento lanzado al confirmar el cerrar (limpiar)
  $('#modalcleartool').on('click', '#btn_yescleartool.wg-medir2d', function (event) {
    clearOperation();

    $('#container_area2d, #container_distancia2d').addClass('notvisible').removeClass('visible');
    $('.btn-medir2d').removeClass('active');
    $('#modalcleartool').modal('hide');
    $('#btn_yescleartool').removeClass('wg-medir2d');

    $('#wg_medir2d').removeClass("visible").addClass("notvisible");
    
  });

    // Evento lanzado al confirmar el borrar medidas 
    $('#modalcleartoolmeasure').on('click', '#btn_yescleartoolmeasure', function (event) {
      clearOperation();

      $('#container_area2d, #container_distancia2d').addClass('notvisible').removeClass('visible');
      $('.btn-medir2d').removeClass('active');

      $('#modalcleartoolmeasure').modal('hide');
      $('.btn-medir2d').removeClass('active');

    });

    //Evento lanzado al cancelar el borrar medidas 
    $('#modalcleartoolmeasure').on('click', '#btn_notcleartoolmeasure', function (event) {
      $('#modalcleartoolmeasure').modal('hide');
      $('.btn-medir2d').removeClass('active');
    });

    function clearOperation(){
      if(activedwidget){
        activedwidget = false;
        _distancia2d.destroy();
        _area2d.destroy();
        _distancia2d = null;
        _area2d = null;
      }
    }

});


/* REVISADO ♠ */