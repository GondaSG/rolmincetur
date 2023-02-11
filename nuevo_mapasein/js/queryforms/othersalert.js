define([
  "js/helper",
  "js/core/permission"

], function (
    Helper,
    Permission
) {

    var today = new Date();
    var current_year = today.getFullYear();
    var current_month = today.getMonth() + 1; //1-12
    var current_trimester = getQuarterOfYear(current_month); //1-4


    //DEFINICIÓN DE PERIODOS 
    var periodos_generacion = {
        'anioinicio': 2017,
        'aniofin': current_year,
        'periodofin': current_trimester
    };


    // Variables de Permisos
    var __permisos_actionsgroup = Permission.getPermisosActionsgroup();

    $(function(){
      if(__permisos_actionsgroup.indexOf('OtrosDocsIndicadores') != -1){ 
        $.get("./view/widgets-group.html", function(data) { 
          $('#wg_othersalert').append($(data).find("#wg_othersalert_content"));
          initOthersAlert();
        });
      }
    });   

    function initOthersAlert(){
        renderCmbAnios(periodos_generacion);        
    }


    $('#wg_othersalert').on('change', '#cmb_anio_generacion', function () {
        let anio = $(this).val();
        if (anio == current_year) {
            $('#cmb_trimestre_generacion').html(getOptionsTrimester(current_trimester));
        } else {
            $('#cmb_trimestre_generacion').html(getOptionsTrimester(4));
        }
    });

    $('#div_widgets').on('click', '#btn_generacion_margenreserva', function(){
        if(validation()){
            let anio = btoa($('#cmb_anio_generacion').val());
            let trimestre = btoa($('#cmb_trimestre_generacion').val());    
            $('#ifr_charts_margenreserva').attr('src', `./view/graphics/margen-reserva.htm?anio=${ anio }&trimestre=${ trimestre }`);
            $('#container_graphic_margenreserva').addClass('visible').removeClass('notvisible');
            $('#btn_maxgrafico_margenreserva').removeClass("visibility").addClass("notvisibility");
        }
    });

    
    $('#div_widgets').on('click', '#btn_generacion_interrupcion', function(){
        if(validation()){
            let anio = btoa($('#cmb_anio_generacion').val());
            let trimestre = btoa($('#cmb_trimestre_generacion').val());    
            $('#ifr_charts_interrupciones').attr('src', `./view/graphics/interrupcion-se.htm?anio=${ anio }&trimestre=${ trimestre }`);
            $('#container_graphic_interrupcion').addClass('visible').removeClass('notvisible');
            $('#btn_maxgrafico_interrupcion').removeClass("visibility").addClass("notvisibility");
        }        
    });    

    $('#div_widgets').on('click', '#btn_generacion_interrupcion_time', function(){
        if(validation()){
            let anio = btoa($('#cmb_anio_generacion').val());
            let trimestre = btoa($('#cmb_trimestre_generacion').val());    
            $('#ifr_charts_interrupciones_time').attr('src', `./view/graphics/interrupcion-time.htm?anio=${ anio }&trimestre=${ trimestre }`);
            $('#container_graphic_interrupcion_time').addClass('visible').removeClass('notvisible');
            $('#btn_maxgrafico_interrupcion_time').removeClass("visibility").addClass("notvisibility");
        }        
    });


    function validation(){
        let isValid = false;
        let requiere = [{
            idfiel: 'cmb_anio_generacion',
            label: 'año'
        }, {
            idfiel: 'cmb_trimestre_generacion',
            label: 'trimestre'
        }];
      
        if (Helper.getValidationForm('wg_othersalert_content', requiere)) {
            isValid = true;
        }
        return isValid; 
    }

    
    /*********************** FUNCIONES DE APOYO ****************************/
    
    document.getElementById('ifr_charts_interrupciones').onload = function() {
        let $iframe = $(this)[0];
        let heightcard = $iframe.contentWindow.document.body.scrollHeight+30+ "px";
        $(`#${$iframe.id}`).parents('.card').css('height',heightcard);
        
    }
    document.getElementById('ifr_charts_interrupciones_time').onload = function() {
        let $iframe = $(this)[0];
        let heightcard = $iframe.contentWindow.document.body.scrollHeight+30+ "px";
        $(`#${$iframe.id}`).parents('.card').css('height',heightcard);
        
    }
    document.getElementById('ifr_charts_margenreserva').onload = function() {
        let $iframe = $(this)[0];
        let heightcard = $iframe.contentWindow.document.body.scrollHeight+30+ "px";
        $(`#${$iframe.id}`).parents('.card').css('height',heightcard);
        
    }


    function renderCmbAnios(dataperiodos) {
        let $cmbanios = $('#cmb_anio_generacion').html('');
        let inicio = dataperiodos.anioinicio;
        let fin = dataperiodos.aniofin;
        let options = `<option value="">--Elija un año--</option>`;
        for (let i = inicio; i <= fin; i++) {
            options += `<option value="${i}">${i}</option>`;
        }
        $cmbanios.append(options);
    }

    function getQuarterOfYear(month) {
        return (Math.ceil(month / 3));
    }

    function getOptionsTrimester(numtrimester) {
        let options = `<option value="">--Elija un trimestre--</option>`; 
        let trimester = "";
        for (let i = 1; i <= numtrimester; i++) {
            switch (i) {
                case 1:
                    trimester = "1° Trimestre";
                    options += `<option value="1T">${trimester}</option>`;
                    break;
                case 2:
                    trimester = "2° Trimestre";
                    options += `<option value="2T">${trimester}</option>`;
                    break;
                case 3:
                    trimester = "3° Trimestre";
                    options += `<option value="3T">${trimester}</option>`;
                    break;
                case 4:
                    trimester = "4° Trimestre";
                    options += `<option value="4T">${trimester}</option>`;
                    break;
                default:
                    trimester = "Trimestre no identificado";
                    options += `<option value="${trimester}">${trimester}</option>`;
                    break;
            }
        }
        return options;
    }

});
