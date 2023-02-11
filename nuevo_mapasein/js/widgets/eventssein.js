define([ 
  "js/helper", 
  "js/core/permission"

], function ( 
  Helper,
  Permission

){  

  var __proxycorsUrl = 'https://proxycorsnodejs.herokuapp.com/';
  var __controllercoesUrl = 'https://www.coes.org.pe/Portal/eventos/relevantes/';
  var initialized = false;

  // Variables de Permisos
  var __permisos_generals = Permission.getPermisosGenerals();  

  $(function(){
      if(__permisos_generals.indexOf('EventosSein') != -1){ 
        $.get("./view/widgets-generals.html", function(data) { 
          $('#wg_eventscoes').append($(data).find("#wg_eventscoes_content"));
          $('#mod_detalleevento').append($(data).find("#mod_detalleevento_content")); 
          initEventsCoes();          
        });
      }
  });
  
  function initEventsCoes() {
    let today =  new Date();
    today = moment(today).format('YYYY-MM-DD');
    $("#fec_er_inicio").val(today);
    $("#fec_er_fin").val(today);
  }

  function showEventosRelevantesCoes(){
    let urlrequest = __proxycorsUrl + __controllercoesUrl + 'lista';
    $.ajax({
        type: 'POST',
        url: urlrequest,
        data: $('#frmBusqueda').serialize(),
        success: function (evt) {
          Helper.hidePreloader();
          if(evt.length > 460){ //actualmente es length 453 para los vacíos, se considera 460 por holgura
            let $div_lsteventos = $('#div_lsteventos').html(evt);
            $('table', $div_lsteventos).addClass('table table-striped table-sm');    
            $('#btn_er_nextpage').prop('disabled', false);       
            if( !initialized){
              let $tbody = $('#wg_eventscoes tbody');
              let $trs = $tbody.find('tr');
              let auxlength = $trs.length;
              let $lievents = '';
              for (let i = 0; i < auxlength; i++) {
                let $tds = $($trs[i]).find('td');
                let fecha = $.trim($($tds[4]).text()).substring(0, 16);
                let desc = $.trim($($tds).last().text());
                let $itemevt = $($($tds).first()).find('a')[0];
                let auxhref = $($itemevt).attr('href');
                let mensaje = desc+"<br>"+fecha;
                $lievents += `<li class="lbl-evento"><a href='${ auxhref }'><span>${ desc }</span><span class="lbl-evento-footer">${ fecha }</span></a></li>`;
                setTimeout(function(){alertMessage(mensaje,'warning', "bottom-right", true)}, 1000*i);
              }
              (auxlength > 0) ? $('#lbl_numevents').text(auxlength).removeClass('notvisible').addClass('visible'): '';
              $($lievents).insertBefore($("#li_vermas_events"));
            }
          }else{
            $('#div_lsteventos').html("No se encontraron más Eventos Relevantes en este rango de fechas");
            $('#btn_er_nextpage').prop('disabled', true);
          }
          initialized = true;
        },
        error: function (err) {
          Helper.hidePreloader();
          console.log('Ha ocurrido un error al consultar Eventos Relevantes: '+ err);
        }
    });
  } 

  $('#wg_eventscoes').on('click', '#btn_buscareventos', function(){
    Helper.showPreloader();
    let fechaini = $('#fec_er_inicio').val();
    let fechafin = $('#fec_er_fin').val();
    fechaini = moment(fechaini).format('DD/MM/YYYY');
    fechafin = moment(fechafin).format('DD/MM/YYYY');
    $('#FechaDesde').val(fechaini);
    $('#FechaHasta').val(fechafin);
    showEventosRelevantesCoes();
  });  

  $('#wg_eventscoes').on('click', '#btn_er_prepage', function() {
    Helper.showPreloader();
    $('#btn_er_nextpage').prop('disabled', false);
    let numpage = Number($('#hfNroPagina').val()) - 1 ; 
    (numpage==1) ? $(this).prop('disabled', true) : '';
    $('#lbl_er_currpage').text('Pag '+numpage);
    $('#hfNroPagina').val(numpage);  
    showEventosRelevantesCoes();
  });

  $('#wg_eventscoes').on('click', '#btn_er_nextpage', function(){
    Helper.showPreloader();
    $('#btn_er_prepage').prop('disabled', false);
    let numpage = Number($('#hfNroPagina').val()) + 1;
    $('#lbl_er_currpage').text('Pag '+numpage);
    $('#hfNroPagina').val(numpage);    
    showEventosRelevantesCoes();
  });

  verEvento = function (id) {
    Helper.showPreloader();
    let urlrequest = __proxycorsUrl + __controllercoesUrl + 'detalle';    
    $.ajax({
      type: 'POST',
      data: { idEvento:id },
      url: urlrequest, 
      success: function (evt) {
        Helper.hidePreloader();
        let $div_detalleevento = $('#div_detalleevento').html(evt);
        $('table', $div_detalleevento).addClass('table table-bordered');
        $('input[type=button]', div_detalleevento).remove();
        $('#mod_detalleevento').modal('show');            
        $('#btnCancelar').click(function () {
          $('#mod_detalleevento').modal('hide');
        });
      },
      error: function (err) {
        Helper.hidePreloader();
        alert('Ha ocurrido un error al consultar el detalle del evento - Fuente COES');
        console.log('Ha ocurrido un error al consultar el detalle del evento: '+ err);
      }
    });
  }
 
  function showLastEventsSein() { //No disponible actualmente
    fetch(`http://coes.esisel.com/mapaSEINexpand.php?page=1`) //lee json de url
    .then(response => response.json())
    .then(function(datajson) {
      let auxlength = Object.keys(datajson).length;
      if(auxlength > 0) {
        let today = (new Date()).toLocaleDateString('en-GB');
        let aux_today = today.split('/');
        let currentday = `${aux_today[2]}-${aux_today[1]}-${aux_today[0]}`;
        let lastdate = datajson[0].ts.substring(0, 10);
        let auxi = 0;
        let $lievents = "";
        for (let i = 0; i < auxlength; i++) {
          let event = datajson[i];
          let dateevent = event.ts.substring(0, 10);
          
          if(dateevent == lastdate){
            $lievents += `<li class="lbl-evento alertasein" data-evento="${event.id}"><span>${event.descripcion}</span><span class="lbl-evento-footer">${event.ts}</span></li>`;
            if(dateevent == currentday){
              let mensaje = event.descripcion+"<br>"+event.ts;
              setTimeout(function(){alertMessage(mensaje,'warning', "bottom-right", true)}, 1000*i);
              auxi++;
            }
          }else{
            break;
          }
          (auxi > 0) ? $('#lbl_numevents').text(auxi).removeClass('notvisible').addClass('visible'): '';
          $($lievents).insertBefore($("#li_vermas_events"));
        }
      }else{
        console.log("No se encontraron registros sobre eventos SEIN en la fuente de datos del COES ");
      }
    });
  }

  return { 
    showLastEventsSein: function () {
      return showLastEventsSein();
    },
    showEventosRelevantesCoes: function () {
      return showEventosRelevantesCoes();
    }
  }

});

/* REVISADO ♣ */