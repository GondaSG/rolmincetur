define([
    "js/helper",
    "js/core/permission"

], function (
    Helper, 
    Permission
) {    

    var __proxy_cors = ""; // 'https://proxycorsnodejs.herokuapp.com/';
    var __url_path = 'https://gisem.osinergmin.gob.pe/NewMapaSEIN/Documentos/';


    var today = new Date();
    var current_year = today.getFullYear();
    var current_month = today.getMonth() + 1; //1-12
    var current_trimester = getQuarterOfYear(current_month); //1-4

    var countgroupdocs = 0; //contador de cuantos grupos ya fueron ejecutados complemente los request para obtener si existe el documento o no
    
    //DEFINICIÓN DE PERIODOS PARA CADA GRUPO DE INFORMES (editar anioinicio en caso se añadan documentos de años anteriores)
    var periodos_operacion = {
        'anioinicio': 2014,
        'aniofin': current_year,
        'periodofin': current_month - 1,
        'tipoperiodo': 'mensual',
        'periodos':{},
        'alias': 'operacion',
    };
    var periodos_alert_transmi = {
        'anioinicio': 2017,
        'aniofin': current_year,
        'periodofin': current_trimester - 1,
        'tipoperiodo': 'trimestral',
        'periodos':{},
        'alias': 'alert_transmi',
    };
    var periodos_alert_generac = {
        'anioinicio': 2017,
        'aniofin': current_year,
        'periodofin': current_trimester - 1,
        'tipoperiodo': 'trimestral',
        'periodos':{},
        'alias':'alert_generac',
    };
    var periodos_alert_critic = {
        'anioinicio': 2017,
        'aniofin': current_year - 1,
        'periodofin': '',
        'tipoperiodo': 'anual',
        'periodos':[],
        'alias':'alert_critic',
    };
    var periodos_proy_ejecuc = {
        'anioinicio': 2018,
        'aniofin': current_year,
        'periodofin': current_month - 1,
        'tipoperiodo': 'mensual',
        'periodos':{},
        'alias':'proy_ejecuc',
    };
    var periodos_proy_construc = {
        'anioinicio': 2013,
        'aniofin': current_year,
        'periodofin': current_month - 1,
        'tipoperiodo': 'mensual',
        'periodos':{},
        'alias':'proy_construc',
    };

    var periodos_active = {};

    //VARIABLES PARA CACHEO DE ELEMENTOS DOM
    var $divlayersalert = '';
    var $divlayersproyect = '';
    var $divmeses = '';
    var $divtrimestres = '';

    var $cmblayersalert = '';
    var $cmblayersproyect = '';
    var $cmbanios = '';
    var $cmbmeses = '';
    var $cmbtrimestres = '';


    // Variables de Permisos
    var __permisos_generals = Permission.getPermisosGenerals();

    $(function(){
        if(__permisos_generals.indexOf('Informes') != -1){ 
            $.get("./view/widgets-generals.html", function(data) { 
                $('#wg_reports').append($(data).find("#wg_reports_content"));   
                initReport();
            });
        }
    });   

    function initReport(){
        //CACHEO DE ELEMENTOS DOM EN VARIABLES
        $divlayersalert = $('#container_sistemalertlayer');
        $divlayersproyect = $('#container_proyectlayer');
        $divmeses = $('#container_meses');
        $divtrimestres = $('#container_trimestre');

        $cmblayersalert = $('#cmb_layersistalert_reports');
        $cmblayersproyect = $('#cmb_layerproyect_reports');
        $cmbanios = $('#cmb_anio_reports');
        $cmbmeses = $('#cmb_mes_reports');
        $cmbtrimestres = $('#cmb_trimestre_reports');
        
        loadDocsMonth(periodos_operacion);
        loadDocsMonth(periodos_proy_ejecuc);
        loadDocsMonth(periodos_proy_construc);
        loadDocsTrimestre(periodos_alert_transmi);
        loadDocsTrimestre(periodos_alert_generac);
        loadDocsAnio(periodos_alert_critic);
    }



    /*********************** UX ****************************/

    //Evento lanzado para desglosar los intups segun el grupo seleccionado
    $('#wg_reports').on('change', '#cmb_group_reports', function () {
        clearCmbs();
        let group = $(this).val();
        switch (group) {
            case 'gruoperacion':
                periodos_active = periodos_operacion;
                renderCmbAnios(periodos_operacion);

                $divlayersproyect.addClass('notvisible').removeClass('visible');
                $divlayersalert.addClass('notvisible').removeClass('visible');
                $divmeses.addClass('visible').removeClass('notvisible');
                $divtrimestres.addClass('notvisible').removeClass('visible');
                break;
            case 'grualerta':
                $divlayersproyect.addClass('notvisible').removeClass('visible');
                $divlayersalert.addClass('visible').removeClass('notvisible');
                $divmeses.addClass('notvisible').removeClass('visible');
                $divtrimestres.addClass('visible').removeClass('notvisible');

                $cmbanios.html('<option> primera elija un subgrupo</option>'); //validacion

                break;
            case 'gruproyectos':
                $divlayersproyect.addClass('visible').removeClass('notvisible');
                $divlayersalert.addClass('notvisible').removeClass('visible');
                $divmeses.addClass('visible').removeClass('notvisible');
                $divtrimestres.addClass('notvisible').removeClass('visible');

                $cmbanios.html('<option> primera elija un subgrupo</option>'); //validacion
                break;
            default:
                $divlayersproyect.addClass('notvisible').removeClass('visible');
                $divlayersalert.addClass('notvisible').removeClass('visible');
                $divmeses.addClass('notvisible').removeClass('visible');
                $divtrimestres.addClass('notvisible').removeClass('visible');
                break;
        }

        // validaciones
        $cmbtrimestres.html('<option> primera elija un año</option>');
        $cmbmeses.html('<option> primera elija un año</option>');
    });

    // Evento lanzado par obtener el el subgrupo de sistemas de alertas
    $('#wg_reports').on('change', '#cmb_layersistalert_reports',  function () {
        clearValidation();

        $cmbtrimestres.html('<option> primera elija un año</option>'); //validaciones

        let layer = $(this).val();
        $divtrimestres.addClass('visible').removeClass('notvisible');
        if (layer == 'transmision') {
            periodos_active = periodos_alert_transmi;
            renderCmbAnios(periodos_alert_transmi);
        } else if (layer == 'generacion') {
            periodos_active = periodos_alert_generac;
            renderCmbAnios(periodos_alert_generac);
        } else if (layer == 'sistcritico') {
            periodos_active = periodos_alert_critic;
            renderCmbAnios(periodos_alert_critic);
            $divtrimestres.addClass('notvisible').removeClass('visible');
        } else if (layer == '') {
            $cmbanios.html('<option> primera elija un subgrupo</option>'); //validaciones
        }
        
    });

    // // Evento lanzado par obtener el subgrupo de proyectos
    $('#wg_reports').on('change', '#cmb_layerproyect_reports',  function () { 
        clearValidation();
        $cmbmeses.html('<option> primera elija un año</option>'); //validaciones

        let layer = $(this).val();
        if (layer == 'ejecucion') {
            periodos_active = periodos_proy_ejecuc;
            renderCmbAnios(periodos_proy_ejecuc);
        } else if (layer == 'construccion') {
            periodos_active = periodos_proy_construc;
            renderCmbAnios(periodos_proy_construc);
        } else if (layer == '') {
            $cmbanios.html('<option> primera elija un subgrupo</option>'); //validaciones
        }
        
    });

    //  Evento lanzado par obtener los segú el grupo o subgrupo selecionado
    $('#wg_reports').on('change', '#cmb_anio_reports',  function () {    
        clearValidation();
        
        let anio = $(this).val();
        if(anio != ''){
            if (periodos_active.tipoperiodo == "mensual") {
                $cmbmeses.html(getOptionsMonths(periodos_active.periodos[anio]));
            } else if (periodos_active.tipoperiodo == "trimestral") {
                $cmbtrimestres.html(getOptionsTrimester(periodos_active.periodos[anio]));
            }
        }else{
            // validaciones
            $cmbmeses.html('<option> primera elija un año</option>');
            $cmbtrimestres.html('<option> primera elija un año</option>');
        }

    });

    // Evento lanzado para realizar la busqueda del archivo 
    $('#wg_reports').on('submit', '#form_reports', function (evt) {
        evt.preventDefault();
        
        if(validation()){
            $('#btn_maxreport').removeClass("visibility").addClass("notvisibility"); // ocultar el btn minizado de doc
            
            let group = $('#cmb_group_reports').val();
            let layer = '';
            let mes = '';
            let anio = $cmbanios.val();
            let url_report = '';
            let title_report = '';
            switch (group) {
                case 'gruoperacion':
                    mes = $cmbmeses.val();
                    url_report = `Compendios/Operacion/Compendio-Operacion-${anio}-${mes}.pdf`;
                    title_report = `Informe: Sistemas en Operación - ${mes} ${anio}`;
                    break;
    
                case 'grualerta':
                    layer = $cmblayersalert.val();
                    let trimestre = $cmbtrimestres.val();
                    switch (layer) {
                        case 'transmision':
                            url_report = `Compendios/Sistemas-alerta/Catalogo-Transmision-Alerta-${anio}${trimestre}.pdf`;
                            title_report = `Informe: Sistemas en Alerta / Transmisión - ${trimestre} ${anio}`;
                            break;
    
                        case 'generacion':
                            url_report = `Compendios/Sistemas-alerta/Catalogo-Generacion-Aislada-Alerta-${anio}${trimestre}.pdf`;
                            title_report = `Informe: Sistemas en Alerta / Generación - ${trimestre} ${anio}`;
                            break;
    
                        case 'sistcritico':
                            url_report = `Compendios/Sistemas-alerta/Informe-SETA-${anio}.pdf`;
                            title_report = `Informe: Sistemas en Alerta / Sistemas Críticos - ${anio}`;
                            break;
    
                        default:
                            break;
                    }
    
                case 'gruproyectos':
                    mes = $cmbmeses.val();
                    layer = $cmblayersproyect.val();
                    if (layer == 'construccion') {
                        url_report = `Compendios/Proyectos/Compendio-Construccion-${anio}-${mes}.pdf`;
                        title_report = `Informe: Proyectos / Construcción - ${mes} ${anio}`;
                    } else if (layer == 'ejecucion') {
                        url_report = `Compendios/Proyectos/Compendio-Ejecucion-${anio}-${mes}.pdf`;
                        title_report = `Informe: Proyectos / Ejecución - ${mes} ${anio}`;
                    }
                    break;

                default:
                    break;
            }
    
            url_report = __url_path + url_report;
            getDocInforme(url_report, title_report);

        }
    });


    /*********************** FUNCIONES DE APOYO ****************************/

    
    function getDocInforme(url, titlereporte) {
        $('#container_reports').removeClass('pdfobject-container').html('');
        $('#btn_verdoc').attr('href', url);
        $('#lbl_title_report').html(titlereporte);
        $('#container_reportfound').addClass('visible').removeClass('notvisible');
        let options = {
            pdfOpenParams: {
                navpanes: 1,
                view: "FitH",
            },
            fallbackLink: "<p>Este navegador no admite archivos PDF en línea <a href='" + url + "'>Descargar</a></p>"
        };
        PDFObject.embed(url, "#container_reports", options);
    }


    function renderCmbAnios(dataperiodos) {
        $cmbanios.html(`<option value="">-- Elija un año --</option>`);
        let inicio = dataperiodos.anioinicio;
        let fin = dataperiodos.aniofin;
        let options = "";

        if(dataperiodos.tipoperiodo == 'anual'){ //cuando es por periodo anual por ejemplo en alerta- sistemas criticos
            let auxlength = dataperiodos.periodos.length
            let anios = dataperiodos.periodos;
            anios.sort((a,b)=>a-b) // ordenar numeros 
            for (let i = 0; i < auxlength; i++) {
                options += `<option value="${anios[i]}">${anios[i]}</option>`;
            }
        }else{
            for (let i = inicio; i <= fin; i++) {
                options += `<option value="${i}">${i}</option>`;
            }
        }

        $cmbanios.append(options);
    }

    function clearCmbs() {
        $cmblayersalert.prop('selectedIndex', 0);
        $cmblayersproyect.prop('selectedIndex', 0);
        $cmbanios.html("");
        $cmbmeses.html("");
        $cmbtrimestres.html("");

        clearValidation();
    }

    function getQuarterOfYear(month) {
        return (Math.ceil(month / 3));
    }

    function getOptionsMonths(months) {
        let options = `<option value="">-- Elija un mes --</option>`;
        let monthname = "";
        let auxlength = months.length;
        months.sort((a,b)=>a-b);

        for (let i = 0; i < auxlength; i++) {
            monthname = Helper.getMonthName(months[i]).f;
            options += `<option value="${ monthname }">${ monthname }</option>`;
        }
        return options;
    }


    function getOptionsTrimester(trimesters) {

        let options = `<option value="">-- Elija un trimestre --</option>`;
        let trimester = "";
        let auxlength = trimesters.length;
        trimesters.sort((a,b)=>a-b);

        for (let i = 0; i < auxlength; i++) {
            switch (trimesters[i]) {
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


    function validation(){

        clearValidation();

        let v_continue = true;
        let counterror = 0;

        let group = $('#cmb_group_reports').val();
        
        switch (group) {
            case 'gruoperacion':
                
                if ( $cmbanios.val().trim() === '') {
                    $cmbanios.parent().addClass('error').append('<span class=lbl-error> Año obligatorio</span>');
                    $cmbmeses.parent().addClass('error').append('<span class=lbl-error> Mes obligatorio</span>');
                    counterror++;
                    break;
                }

                if ( $cmbmeses.val().trim() === '') {
                    $cmbmeses.parent().addClass('error').append('<span class=lbl-error> Mes obligatorio</span>');
                    counterror++;
                }
                break;

            case 'grualerta':
                
                if ( $cmblayersalert.val().trim() === '') {
                    $cmblayersalert.parent().addClass('error').append('<span class=lbl-error> Subgrupo obligatorio</span>');
                    $cmbanios.parent().addClass('error').append('<span class=lbl-error> Año obligatorio</span>');
                    $cmbtrimestres.parent().addClass('error').append('<span class=lbl-error> Trimestre obligatorio</span>');
                    counterror++;
                    break;
                }

                if ( $cmbanios.val().trim() === '') {
                    $cmbanios.parent().addClass('error').append('<span class=lbl-error> Año obligatorio</span>');
                    $cmbtrimestres.parent().addClass('error').append('<span class=lbl-error> Trimestre obligatorio</span>');
                    counterror++;
                    break
                }

                if($cmblayersalert.val() != 'sistcritico'){
                    if ( $cmbtrimestres.val().trim() === '') {
                        $cmbtrimestres.parent().addClass('error').append('<span class=lbl-error> Trimestre obligatorio</span>');
                        counterror++;
                    }
                }
                
                break;

            case 'gruproyectos':
                if ( $cmblayersproyect.val().trim() === '') {
                    $cmblayersproyect.parent().addClass('error').append('<span class=lbl-error> Subgrupo obligatorio</span>');
                    $cmbanios.parent().addClass('error').append('<span class=lbl-error> Año obligatorio</span>');
                    $cmbmeses.parent().addClass('error').append('<span class=lbl-error> Mes obligatorio</span>');
                    counterror++;
                    break;
                }

                if ( $cmbanios.val().trim() === '') {
                    $cmbanios.parent().addClass('error').append('<span class=lbl-error> Año obligatorio</span>');
                    $cmbmeses.parent().addClass('error').append('<span class=lbl-error> Mes obligatorio</span>');
                    counterror++;
                    break;
                }
                if ( $cmbmeses.val().trim() === '') {
                    $cmbmeses.parent().addClass('error').append('<span class=lbl-error> Mes obligatorio</span>');
                    counterror++;
                }
                
                break;

            default:
                counterror ++;

                $('#cmb_group_reports').parent().addClass('error').append('<span class=lbl-error> Grupo obligatorio</span>');
                $cmblayersalert.parent().addClass('error').append('<span class=lbl-error> Subgrupo obligatorio</span>');
                $cmblayersproyect.parent().addClass('error').append('<span class=lbl-error> Subgrupo obligatorio</span>');
                $cmbanios.parent().addClass('error').append('<span class=lbl-error> Año obligatorio</span>');
                $cmbtrimestres.parent().addClass('error').append('<span class=lbl-error> Trimestre obligatorio</span>');
                $cmbmeses.parent().addClass('error').append('<span class=lbl-error> Mes obligatorio</span>');
                break;

        }

        $('#wg_reports .error select:first').focus();

        if (counterror != 0) {
            v_continue = false;
        }
        return v_continue;

    }

    function clearValidation(){
        $('#wg_reports .form-control').parent().removeClass('error');
        $('#wg_reports .lbl-error').remove();
    }
    

    function loadDocsMonth(dataperiodos) {
        let inicio = dataperiodos.anioinicio;
        let fin = dataperiodos.aniofin;
        let auxlength = (fin - inicio + 1)*12;

        for (let i = inicio; i <= fin; i++) {
            dataperiodos.periodos[i] = [];
            for (let j = 1; j <= 12; j++) {
                let mes = Helper.getMonthName(j).f;
                let layer = dataperiodos.alias;
                let url_report = '';

                switch (layer) {
                    case 'operacion' :
                        url_report = `Compendios/Operacion/Compendio-Operacion-${i}-${mes}.pdf`;
                        break; 
                    case 'proy_construc' :
                        url_report = `Compendios/Proyectos/Compendio-Construccion-${i}-${mes}.pdf`;
                        break; 
                    case 'proy_ejecuc' :
                        url_report = `Compendios/Proyectos/Compendio-Ejecucion-${i}-${mes}.pdf`;
                        break; 

                }

                $.ajax({
                    url: __proxy_cors + __url_path + url_report,
                    type: "HEAD",
                    error: function () {
                        if(auxlength == 1){
                            countgroupdocs ++;
                            if(countgroupdocs == 6){
                                $('#preloader_report').removeClass('preloader-report').addClass('preloader-none');
                                console.clear(); //borrar consola del navegador cuando todos los requeste del reports aya concluido
                            }
                        }
                        auxlength --;
                    },
                    success: function () {
                        dataperiodos.periodos[i].push(j);
                        if(auxlength == 1){
                            countgroupdocs ++;
                            if(countgroupdocs == 6){
                                $('#preloader_report').removeClass('preloader-report').addClass('preloader-none');
                                console.clear(); //borrar consola del navegador cuando todos los requeste del reports aya concluido
                            }
                        }
                        auxlength --;
                    }
                });

            }
        }

    }

    function loadDocsTrimestre(dataperiodos) {
        let inicio = dataperiodos.anioinicio;
        let fin = dataperiodos.aniofin;
        let auxlength = (fin - inicio + 1)*4;
        for (let i = inicio; i <= fin; i++) {
            dataperiodos.periodos[i] = [];

            for (let j = 1; j <= 4; j++) {
                let trimestre = `${ j }T`;
                let layer = dataperiodos.alias;
                let url_reporte = '';

                switch (layer) {
                    case 'alert_transmi' :
                        url_reporte = `Compendios/Sistemas-alerta/Catalogo-Transmision-Alerta-${i}${trimestre}.pdf`;
                        break; 
                    case 'alert_generac' :
                        url_reporte = `Compendios/Sistemas-alerta/Catalogo-Generacion-Aislada-Alerta-${i}${trimestre}.pdf`;
                        break; 

                }

                $.ajax({
                    url: __proxy_cors + __url_path + url_reporte,
                    type: "HEAD",
                    error: function () {
                        if(auxlength == 1){
                            countgroupdocs ++;
                            if(countgroupdocs == 6){
                                $('#preloader_report').removeClass('preloader-report').addClass('preloader-none');
                                console.clear(); //borrar consola del navegador cuando todos los requeste del reports aya concluido
                            }
                        }
                        auxlength --;
                    },
                    success: function () {
                        dataperiodos.periodos[i].push(j);
                        if(auxlength == 1){
                            countgroupdocs ++;
                            if(countgroupdocs == 6){
                                $('#preloader_report').removeClass('preloader-report').addClass('preloader-none');
                                console.clear(); //borrar consola del navegador cuando todos los requeste del reports aya concluido
                            }
                        }
                        auxlength --;
                    }
                });

            }
        }

    }

    function loadDocsAnio(dataperiodos) {
        let inicio = dataperiodos.anioinicio;
        let fin = dataperiodos.aniofin;
        let auxlength = (fin - inicio + 1);

        for (let i = inicio; i <= fin; i++) {
            
            let layer = dataperiodos.alias;
            let url_reporte = '';

            switch (layer) {
                case 'alert_critic' :
                    url_reporte = `Compendios/Sistemas-alerta/Informe-SETA-${i}.pdf`;
                    break; 
            }

            $.ajax({
                url: __proxy_cors + __url_path + url_reporte,
                type: "HEAD",
                error: function () {
                    if(auxlength == 1){
                        countgroupdocs ++;
                        if(countgroupdocs == 6){
                            $('#preloader_report').removeClass('preloader-report').addClass('preloader-none');
                            console.clear(); //borrar consola del navegador cuando todos los requeste del reports aya concluido
                        }
                    }
                    auxlength --;
                },
                success: function () {
                    dataperiodos.periodos.push(i);
                    if(auxlength == 1){
                        countgroupdocs ++;
                        if(countgroupdocs == 6){
                            $('#preloader_report').removeClass('preloader-report').addClass('preloader-none');
                            console.clear(); //borrar consola del navegador cuando todos los requeste del reports aya concluido
                        }
                    }
                    auxlength --;
                }
            });

        }

    }


});
