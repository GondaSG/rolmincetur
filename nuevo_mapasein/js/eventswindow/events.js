var __$wgcontainer='';

$('.draggable-element').draggable({
    handle: '.card-header-gis',
    containment: "#mibody",
    scroll: false
});


$('#div_widgets').on('click', '.btn-close', function () {  //cerrar card widgets con btn-close  div_widgets
    console.log('click cerrar ');
    let btnmax = $(this).parent().find('.btn-minimizar').attr('data-btnmax');
    let closedirect = $(this).attr('data-close-direct');

    if(typeof btnmax == 'undefined' || typeof closedirect != 'undefined'){
        $(this).parents('.card').removeClass('visible').addClass('notvisible');
    }else{
        __$wgcontainer = $(this).parents('.card'); // btns y div maximizadores tools - wg
    }

})

$('#div_results').on('click', '.icon-close', function (event) { //cerrar card de resultados con icon-close
    event.preventDefault();
    $(this).parents('.card').removeClass('visible').addClass('notvisible');
});

$("#btn_yescleartool").click(function (e) {  // opcion Aceptar de modal para cerrar wg
    e.preventDefault();

    $('#div_btnmaximizadores, #div_btnmaximizadoresresult').css('bottom', '');        
    $('#modalcleartool').modal('hide');
    // __$wgcontainer.removeClass("visible").addClass("notvisible"); //se movio a cada wg que tiene esta funcionalidad
    __$wgcontainer = '';

})

$("#btn_notcleartool").click(function (e) {   // opcion Cancelar de modal para cerrar wg
    e.preventDefault();
    $('#modalcleartool').modal('hide');
    __$wgcontainer = '';
});

$('#cerrarVideo, #btn_minvideo').on('click', function(){ //cerrar card del resultado de drones
    $('#video').trigger('pause');
});


//Menu
let aux = true;
$('#div_menu').on('click', '.item-menu', function () { // abrir o cerrar el widgets desde el menu main
    let idcontainer = $(this).attr('data-subcontainer');
    $(idcontainer).toggleClass('visible notvisible');
    if(idcontainer == '#wg_lyl_sein' && aux ){
        aux = false;
        activeTooltip();
        removeAccion();
    }

    // btns maximizadores 
    let btnmax = $(idcontainer).find('.btn-minimizar').attr('data-btnmax');
    if(typeof btnmax != 'undefined'){
        let $btnmax = $(`${btnmax}`);
        $btnmax.removeClass("visibility").addClass("notvisibility");
    }
})
$("#div_menu").on("click", "#btn_menuevents", function () { // eventos coes
    $(this).find('#lbl_numevents').removeClass("visible").addClass("notvisible");
});


$('#div_results').on('click', '.btn-tbltoggle', function (e) { //minimizar o maxinizar tabla
    e.preventDefault();
    $(this).toggleClass('icon-caret-up icon-caret-down');
    $(this).parents('.card').toggleClass('max-size min-size');
    
    // div btns-maximizadores 
    let heightgrilla =$('#div_results').find('.visible').outerHeight();
    $('#div_btnmaximizadores, #div_btnmaximizadoresresult').css('bottom', `${heightgrilla}px`);
})

/**
 * btns maximizadores
 * para la posicion de los btns maximizadores se implemento en los archivos: eventos - helper - informationlayers (div btns-maximizadores: comentario)
 */
// wg
$('#div_widgets').on('click', '.btn-minimizar', function () {
    let btnmax = $(this).attr('data-btnmax');
    let $btnmax = $(`${btnmax}`);   
    $btnmax.removeClass("notvisibility").addClass("visibility");
    let $divwg = $(this).parents('.card').addClass('fadeOut');
    setTimeout(function(){ $divwg.removeClass("visible fadeOut").addClass("notvisible"); }, 1000);    
});

$('#div_btnmaximizadores').on('click', '.btn-maximizar', function () {
    let wgcontainer = $(this).attr('data-subcontainer');
    let $wgcontainer = $(wgcontainer);

    $wgcontainer.removeClass("notvisible").addClass("visible");
    $(this).removeClass("visibility").addClass("notvisibility");
});

// resultados
$('#div_btnmaximizadoresresult').on('click', '.btn-maximizar', function () {

    let wgcontainer = $(this).attr('data-subcontainer');
    let $wgcontainer = $(wgcontainer);

    $wgcontainer.removeClass("notvisible").addClass("visible");
    $(this).removeClass("visibility").addClass("notvisibility");
});

$('#div_results').on('click', '.btn-minimizar', function () { 
    let btnmax = $(this).attr('data-btnmax');
    let $btnmax = $(`${btnmax}`);   
    $btnmax.removeClass("notvisibility").addClass("visibility");
    let $divwg = $(this).parents('.card').addClass('fadeOut');
    setTimeout(function(){ $divwg.removeClass("visible fadeOut").addClass("notvisible"); }, 1000); 
});
$('#div_view').on('click', '.min-graphic', function(){ // grafico
    $('#btn_maxgrafico').removeClass("visibility").addClass("notvisibility");
});
$('#div_view').on('click', '.min-doc', function(){ // documentos
    $('#btn_maxreport').removeClass("visibility").addClass("notvisibility");
});

$('#div_widgets').on('click', '.btn-limpiar', function (event) { // reubicar btn-maximizadores al cerrar la tabla de un widget 
    $('#div_btnmaximizadores, #div_btnmaximizadoresresult').css('bottom', '');
})

// leyenda
$('#div_legend').on('click', '.btn-showlegend', function(e){
    $('#div_legend').toggleClass("showlegend");
    $('.btn-showlegend i').toggleClass("icon-caret-right icon-caret-left");

    $("#div_navegation").toggleClass("navegation-legend-show");
    $("#wg_fieldsearch").toggleClass("directionsearch-legend-show");
    $("#div_btnmaximizadoresresult").toggleClass("btn-max-legend-show");
});

// ayuda calculadora 
$('body').on('click','#btn_helpcalculator',function(){
    $(`#modalhelpcalculator`).modal('show');
});


// adecuar el tamaño de graficos 
document.getElementById('ifr_charts').onload = function() {
    let $iframe = $(this)[0];
    let heightcard = $iframe.contentWindow.document.body.scrollHeight+30+ "px";
    $(`#${$iframe.id}`).parents('.card').css('height',heightcard);
    
}


// para ocultar la img si no existe
window.addEventListener('error', function (e) {  
    if (e.target.nodeName == 'IMG') {
        // Control de imagenes para Eventos Relevantes (externo)
        let element = $(e.target);
        let parentimg = element.parents('.lst-eventos-sein');
        if(parentimg.hasClass('lst-eventos-sein')) {
            e.target.src='./img/widget/plus.png';
        }

        // Control de imagen para Popups
        // no mostrar nada
        let $containerimg = document.querySelector('.esri-feature__media');
        if ($containerimg != null) {
            let $parentimg2 = $containerimg.parentNode;
            $parentimg2.removeChild($containerimg);
        }else{
            let $containerimg2 = $('.esri-feature__main-container').find('img').parents('tr');
            $containerimg2.remove();
        }

        // cambiar por otra img
        // let url_img='https://imgclasificados3.emol.com/5627078_0/231/F124153274143194231138194133769681936231.jpg';
        // let $img = e.target;
        // $img.src=url_img;
    }

}, true);


$('.second-modal').on('hidden.bs.modal', function (e) {
  $('body').addClass('modal-open');
});


$('body').tooltip({
    selector: '[title]',
    trigger: 'hover',
    container: 'body'
}).on('click mousedown mouseup', '[data-toggle="tooltip"], [title]:not([data-toggle="popover"])', function () {
    $('[data-toggle="tooltip"], [title]:not([data-toggle="popover"])').tooltip('hide');
    
});

function activeTooltip(){
    setTimeout(() => {
        $('[title]:not([data-toggle="tooltip"])').tooltip('setContent');
        $('[title]:not([data-toggle="tooltip"])').tooltip({'placement': 'right'});
        $('[data-original-title="Abierto"]').tooltip('disable');
        $('[aria-label="Abierto"]').tooltip('disable');
        $('[data-original-title="Expandir"]').tooltip('disable');
        $('[data-original-title="Transparencia Sector"]').tooltip('disable');
        $('.esri-layer-list__item-title').tooltip('disable');
        $('.container-wg-medir .esri-button').tooltip('disable');
        
        $('li.esri-layer-list__item-action').tooltip('disable');
        $('.esri-direct-line-measurement-3d__clear-button').tooltip('disable');
        $('li.esri-layer-list__item-action[data-original-title="Transparencia"]').tooltip('enable');
        $('li.esri-layer-list__item-action[data-original-title="Buscar en Capa"]').tooltip('enable');
        
        $('[title]:not([data-toggle="tooltip"])').tooltip({ trigger: "hover" });
        $('[data-toggle="tooltip"]').tooltip({ trigger: "hover" }); // para activar el tooltip
    }, 500);
}


function removeAccion(){
    setTimeout(() => {
        $('.remove-accion').parent().remove();
    }, 500);
}


// Evento para solo cerrar el modal desde cancelar o cerrar
$('#modal_tensionpe, #modal_pe, #modal_suministrope').modal({
    keyboard: false,
    backdrop: 'static',
    show: false
});


$('#div_widgets').on('click', '.btn-limpiar', function () { //validaciones 
    $('.form-group').removeClass('error');
    $('.form-group span.lbl-error').remove();
});