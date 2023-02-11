define([
  "esri/widgets/Zoom",
  "esri/widgets/Locate",
  "esri/widgets/Search",
  "esri/geometry/coordinateFormatter",
  "esri/geometry/support/webMercatorUtils",

], function (
  Zoom,
  Locate,
  Search,
  CoordinateFormatter,
  WebMercatorUtils,

) {  

  // Home
  $("#btn_home").on('click', function () {
    __globspace.view.zoom = __globspace.initParams.zoom;
    __globspace.view.center = __globspace.initParams.center;
    __globspace.view.rotation = 0;
  });

  // Mi ubicacion 
  let _location = new Locate({
    view: __globspace.view,
    container: 'btn_location'
  });

  // Search directions
  let _searchWidget = new Search({
    view: __globspace.view,
    container: "container_wgdirectionsearch"
  });

  // Zoom 
  let _zoom = new Zoom({
    view: __globspace.view
  });
  $("#btn_zoom_minus").on('click', function () {
    _zoom.zoomOut();
  });
  $("#btn_zoom_add").on('click', function () {
    _zoom.zoomIn();
  });

  // PreView and NextView están aparte en prevnext.js


  // Pointer Coords (footer)
  coordenadasFooter(__globspace.view);

  function coordenadasFooter(view) {
    view.on(["pointer-down", "pointer-move"], function (event) {
      let point = view.toMap(event);
      if (point != null) {
        // coordenadas geografica
        let coordgeografica = "<b>GCS : </b>" + point.longitude.toFixed(6) + ' , ' + point.latitude.toFixed(6) + ' &nbsp &nbsp';
        $('#lbl_coordgeografica').html(coordgeografica);
        // escala
        let scale = "<b> ESCALA </b>  1 : " + Math.round(view.scale * 1) / 1;
        $('#lbl_scale').html(scale);

        // coordenadas UTM
        let returnpoint = point.spatialReference.isWGS84 ? point : WebMercatorUtils.webMercatorToGeographic(point);
        CoordinateFormatter.load().then(function () {
          let pointutm = CoordinateFormatter.toUtm(returnpoint, "latitude-band-indicators", true);
          let aux_pointutm = pointutm.split(" ");
          let cadenautm = '<b>UTM WGS84 : </b>' + aux_pointutm[1] + "E" + " " + aux_pointutm[2] + "N " + " <b>ZONA : </b>" + aux_pointutm[0];
          $("#lbl_coordutm").html(cadenautm);
        });
      }
    });
  }
  
});

/* REVISADO ♣ */