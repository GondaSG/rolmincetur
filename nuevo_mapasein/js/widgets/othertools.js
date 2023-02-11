define([
  "js/core/permission",

  "esri/Basemap",
  "esri/widgets/BasemapGallery",
  "esri/layers/WebTileLayer",
  "esri/widgets/Print",

], function (
  Permission,

  Basemap,
  BasemapGallery,
  WebTileLayer,
  Print

) {   

  // Variables de Permisos
  var __permisos_generals = Permission.getPermisosGenerals();
  var __permisos_tools = Permission.getPermisosTools();

  $(function(){
      if(__permisos_generals.indexOf('MapaBase') != -1){ 
        $.get("./view/widgets-generals.html", function(data) { 
          $('#wg_basemap').append($(data).find("#wg_basemap_content")); 
          initBaseMap();
        });
      }      
      if(__permisos_tools.indexOf('Imprimir') != -1){ 
        $.get("./view/widgets-tools.html", function(data) { 
          $('#wg_print').append($(data).find("#wg_print_content"));
          initPrint();
        });
      }
  });   

  // BaseMap
  function initBaseMap(){
    // Basemap Imagery Galery Google
    let _webtilelayer = new WebTileLayer({
      urlTemplate: "https://mts1.google.com/vt/lyrs=s@186112443&hl=x-local&src=app&x={col}&y={row}&z={level}&s=Galile",
      title: "google maps"
    });
    
    let _basemap = new Basemap({
      baseLayers: [_webtilelayer],
      thumbnailUrl: "img/widget/mapgoogle.png",
      title: "Google Imagery"
    });

    let _basemapgallery = new BasemapGallery({
      view: __globspace.view,
      container: "container_basemap"
    });
    _basemapgallery.source.basemaps.items.push(_basemap);
  }


  /// Print
  function initPrint() {
    let print = new Print({
      view: __globspace.view,
      container: 'container_printmap',
      templateOptions: {
        title: "Mapa SEIN - DSE",
      },
      printServiceUrl: "https://gisem.osinergmin.gob.pe/serverosih/rest/services/ExportWebMapSEIN/GPServer/Export%20Web%20Map"
    });
  }

  // Evento lanzado para cerrar widget Print 
  $("#wg_print").on('click', '.btn-close', function (e) {
    $(this).parents('.card').removeClass('visible').addClass('notvisible');
  });


  /// Perfil Longitudinal
  $("#div_view").on("click", "#btn_menuperfillong", function () {
    window.open("https://agol-osinergmin.maps.arcgis.com/apps/Profile/index.html?appid=02bbfc993f2d41e9b26388f5f1efa888", "myWindow", "toolbar=yes,scrollbars=yes,resizable=yes,top=300,left=10,width=800,height=600");
  });


});

/* REVISADO ♠ */ 