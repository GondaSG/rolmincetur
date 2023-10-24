require(
  [
    "esri/identity/IdentityManager",
    "esri/core/urlUtils",
    "esri/layers/FeatureLayer",
    "esri/tasks/QueryTask",
    "esri/tasks/support/Query",
    "esri/core/watchUtils",
    "dojo/_base/array",
    "dojo/domReady!"
  ],
  function(
    IdentityManager,
    urlUtils, 
    FeatureLayer,
    QueryTask,
    Query,
    watchUtils,
    array
  ){

    $(document).ready(function(){     
      let urlparams= window.location.search;//obtiene parametros de url
      paramb64 = urlparams.substring(1);
      (paramb64 == undefined || paramb64 == ' ') ? paramb64 = "undefined" : "";
      //if(paramb64==='MTBkaWNpZW1icmUxOTk1YXV4aWxpb21lZGVzbWF5b2VhZWFlYQ=='){
      if(paramb64===''){
          cargarCmbUsuario();        
        $('#preloader_gral').addClass('hide');//retira preloader gral
        $('#viewDiv').removeClass('hide').addClass("animate__animated animate__fadeInDown");
        //location.replace('http://127.0.0.1:5500/reporte_uppgn/index.html');
        window.history.pushState(null, "", "index.html");

      }else{
        console.log("ingrese parámetros");
      }
    });
    
    _proxyurl = "https://gisem.osinergmin.gob.pe/proxy_dsgn/proxy.ashx";
	  // AUTENTICACIÓN
    urlUtils.addProxyRule({
      urlPrefix: "https://gisem.osinergmin.gob.pe",
      proxyUrl: _proxyurl
    });

	  //// URL DE WEB SERVICES
	  var url_attachements = "https://gisem.osinergmin.gob.pe/serverdc/rest/services/FS_OSIC_TSCON4/FeatureServer/0";
	  var url_attachements2 = "https://gisem.osinergmin.gob.pe/serverdc/rest/services/FS_OSIC_TSCON4/FeatureServer/1";
	
    // fields de ws (1)
    var fusuario = "SV_SUPERUSER";
    var fobjectidform = "GLOBALID";
    
    var ffecha = "FECINITSCON";
    var fDescripcion = "NOMRASOTSCON";
    var frd = "SV_RD";

    var fobjectidform2 = "OBJECTID";
    
    var ftema = "NUMTSCON";
    var descFotos = "DESCFOTCTSCON";    
    var feste = "SV_X";
    var fnorte = "SV_Y";

    var fdepa = "DEPASUPTSCON";
    var fprov = "PROVSUPTSCON";
    var fdist = "DISTSUPTSCON";
    var fzona = "SV_ZONA";
    var fnum = "NUMTSCON";

    var REC_AGESUP = "SV_AGEFIS";
    var REC_UNISUP = "SV_UNIFIS";
    var REC_ZONA_GEO = "REC_ZONA_GEO_child";
    var REC_UBICACION = "DISTSUPTSCON";
    var REC_UBICACION2 = "PROVSUPTSCON";
    var REC_UBICACION3 = "DEPASUPTSCON";
    var REC_EST = "SV_EMPSUP";
    var REC_SUPER_label = "NOREOSITSCON";

    var REC_CL = "NUCARLITSCON";
    var REC_ASPECTO = "SV_ASPECTOSUP";
    var REC_TIPO = "SV_TIPOSUP";
    var REC_MODALIDAD = "SV_MODALSUP";
    var REC_FECHAINI = "FECINITSCON";
    var REC_START = "FECINITSCON";

    var REC_EST_INIC = "REC_EST_INIC_child";
    var REC_INICIALES = "SV_EMPSUP_INI";
    var REC_RD_parent = "SV_SUPER_INI";
    var REC_RD_parent2 = "SV_RD";
    var REC_DNI = "SV_DNI";

    var $btnLimpiar = $('#btn_limpiar');
    //// DEFINICIÓN DE FEATURE LAYERS 
    var fl_serv1 = new FeatureLayer({ 
      url: url_attachements,
      outFields: ["*"],
      visible:true,
      definitionExpression: "1=1"
    });

   /******************************* UX *********************************************/

    //CARGAR COMBO FECHA ACTUAL
    debugger;
    var n = new Date();
    fecha = moment(n).subtract(1, 'd').format('YYYY-MM-DD');
    //n.setHours(n.getHours() - 24);
    //var fecha = n.toISOString().split('T')[0];
    document.getElementById("fec_superv").value = fecha;
    console.log("fecha:"+fecha)
 
    var nn =  new Date();
    nn = moment(nn).format('YYYY-MM-DD');
    document.getElementById("fec_fin").value = nn;

    //VARIABLES DE FILTRO
    var $cmbuser = $('#cmb_usuario');
    //var $fecsuperv = $('#fec_superv');
    //var $fecfin = $('#fec_fin');
    //$('#fechaActual').html('26-jun-2023');

    //BUSCA POR USUARIO Y FECHA 
    $('#btn_buscar').on('click', function(event) {
      event.preventDefault(); // Evita que el formulario se envíe      
      clearData("");      
      let usuario = $('#cmb_usuario').val();
      let fecha = $('#fec_superv').val();
      let fechaFin = $('#fec_fin').val();
      
      if (usuario !== "" && fecha !== "" && fechaFin !== "") {                   
          //$('#cmb_usuario, #fec_superv, #fec_fin, #btn_buscar').prop('disabled', true);
          $('#btn_exportword').prop('disabled', true).html(showPreloaderBar());
          //$('#btn_exportExcel').prop('disabled', true);
          $('#div_barprogress').html(showPreloaderBar());
          $('#tbody_data').html(`<tr><td colspan="6" style="text-align:center;">${showPreloaderBar()}</td></tr>`);
          filtrar(usuario, fecha, fechaFin);
          $('#div_barprogress').html(showPreloaderProgress(100));

      } else {
          clearData("Seleccione su usuario y complete las fechas.");
        }
    });

    //BOTÓN EXPORTAR 
    // $('#btn_exportword').on('click', function(event) {
    //   let usuario = $cmbuser.val();
    //   let fecha = $fecsuperv.val();
    //   // let hoy = new Date().toLocaleDateString('en-GB');
    //   let filename = 'Reporte_Supervision_'+usuario+'_'+fecha;      
    //   let iscomprimido = $('#chb_switch').is(':checked'); 
    //   $("#div_fotos").wordExport(filename, iscomprimido);     
    //   return false;   
    // });

    //BOTÓN EXPORTAR 
    $('#btn_exportExcel').on('click', function(event) {
      var uri = 'data:application/vnd.ms-excel;base64,',
      template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
      base64 = function(s) {
        return window.btoa(unescape(encodeURIComponent(s)))
      },
      format = function(s, c) {
        return s.replace(/{(\w+)}/g, function(m, p) {
          return c[p];
        })
      }
      var toExcel = document.getElementById("tbl_data2").innerHTML;
      var ctx = {
        worksheet: name || '',
        table: toExcel
      };
      var link = document.createElement("a");
      link.download = "Reporte.xls";
      link.href = uri + base64(format(template, ctx))
      link.click();
    });

 
    //FILTRA DATA DEL WEBSERVICE Y MUESTRA EN TABLA PARA EXPORTAR 
    function filtrar(usuario, fecha, fechaFin) {
      console.log("fecha" + fecha + "fechafin:" + fechaFin)

      var fi = moment(fecha).format('DD/MM/YYYY HH:mm:ss');
      var ff = moment(fechaFin).add(24,'hours').format('DD/MM/YYYY HH:mm:ss');

      var sql = fusuario + " = '"+usuario+"' and "+ffecha+" between '"+fi+"' and '"+ff+"'";
      console.log("sql" + sql);
      //sql = fusuario + " = '"+usuario+"' ";
      var query = new QueryTask({url:url_attachements}); 
      var params  = new Query();  
      params.returnGeometry = false;
      params.outFields = ["*"];
      params.orderByFields= [`${ffecha} asc`];
      params.where = sql;
      query.execute(params).then(function(response){
        //$cmbuser.prop('disabled', false);
        //$fecsuperv.prop('disabled', false);
        //$fecfin.prop('disabled', false);
        var n = 0;
        if(response.features.length === 0){ 
          clearData('No hay registros coincidentes'); 
        }else{          
          var ids = [];
          var ids2 = [];
          responses = response.features;
          var cadena = '';
          var cadena2 = '';
          let auxlength = responses.length;          
          
          for (var i = 0; i < auxlength; i++) {
            let row = responses[i].attributes; 
            let id = row[fobjectidform];
            let fecha = new Date(row[ffecha]);
            let fechaformat = moment(fecha).format('D/M/YYYY'); 
            let fechaCreatedUser = moment(new Date(row["CREATED_DATE"])).format("D/M/YYYY");
            let lastEditedDate = moment(new Date(row["LAST_EDITED_DATE"])).format("D/M/YYYY");
            let fecIniCon = moment(new Date(row["FECINITSCON"])).format("D/M/YYYY");
            let fecFinCon = moment(new Date(row["FECFINTSCON"])).format("D/M/YYYY");

            let nreport = row[frd];            
            let coordenadas = "";
            if (row[feste] != null && row[fnorte] != null){
              coordenadas = row[feste] + ", " + row[fnorte];
            }            
            let tema = row[ftema];
            let descripcion = row[fDescripcion]; 
            let rc = row[REC_INICIALES];
            cadena = cadena +
              `<tr>                
                <td style="text-align: center;">${fechaformat}</td>
                <td style="text-align: center;">${nreport}</td>
                <td style="text-align: center;">${coordenadas}</td>
                <td>${tema}</td>
                <td>${descripcion}</td>
                <td>${row["DEPASUPTSCON"]}</td>
                </tr>`;
            cadena2 = cadena2 +
              `<tr>                
                <td style="text-align: center;">${row["OBJECTID"]}</td>
                <td style="text-align: center;">${row["GLOBALID"]}</td>
                <td style="text-align: center;">${row["CREATED_USER"]}</td>
                <td style="text-align: center;">${fechaCreatedUser}</td>
                <td style="text-align: center;">${row["LAST_EDITED_USER"]}</td>
                <td style="text-align: center;">${lastEditedDate}</td>
                <td style="text-align: center;">${row["ANNOTSCON"]}</td>
                <td style="text-align: center;">${row["NUCARLITSCON"]}</td>
                <td style="text-align: center;">${fecIniCon}</td>
                <td style="text-align: center;">${fecFinCon}</td>
                <td style="text-align: center;">${row["NOMRASOTSCON"]}</td>
                <td style="text-align: center;">${row["DNISUPTSCON"]}</td>
                <td style="text-align: center;">${row["RUCSUPTSCON"]}</td>
                <td style="text-align: center;">${row["PROVSUPTSCON"]}</td>
                <td style="text-align: center;">${row["DISTSUPTSCON"]}</td>
                <td style="text-align: center;">${row["DEPASUPTSCON"]}</td>
                <td style="text-align: center;">${row["NOREOSITSCON"]}</td>
                <td style="text-align: center;">${row["COREOSITSCON"]}</td>
                <td style="text-align: center;">${row["EMREOSITSCON"]}</td>
                <td style="text-align: center;">${row["GABINETTSCON"]}</td>
                <td style="text-align: center;">${row["MEDIDORTSCON"]}</td>
                <td style="text-align: center;">${row["INSTINSTSCON"]}</td>
                <td style="text-align: center;">${row["TIPOUSUTSCON"]}</td>
                <td style="text-align: center;">${row["BENEFICTSCON"]}</td>
                <td style="text-align: center;">${row["ESTAUSUTSCON"]}</td>
                <td style="text-align: center;">${row["DOCUMENTSCON"]}</td>
                <td style="text-align: center;">${row["COMENTATSCON"]}</td>
                <td style="text-align: center;">${row["NUMTSCON"]}</td>
                <td style="text-align: center;">${row["SV_AGEFIS"]}</td>
                <td style="text-align: center;">${row["SV_UNIFIS"]}</td>
                <td style="text-align: center;">${row["SV_EMPSUP"]}</td>
                <td style="text-align: center;">${row["SV_EMPSUP_INI"]}</td>
                <td style="text-align: center;">${row["SV_SUPER_INI"]}</td>
                <td style="text-align: center;">${row["SV_ASPECTOSUP"]}</td>
                <td style="text-align: center;">${row["SV_TIPOSUP"]}</td>
                <td style="text-align: center;">${row["SV_MODALSUP"]}</td>
                <td style="text-align: center;">${row["SV_FECHAINISUP"]}</td>
                <td style="text-align: center;">${row["SV_RD"]}</td>
                <td style="text-align: center;">${row["SV_ZONA"]}</td>
                <td style="text-align: center;">${row["SV_HUSO"]}</td>
                <td style="text-align: center;">${row["SV_X"]}</td>
                <td style="text-align: center;">${row["SV_Y"]}</td>
                <td style="text-align: center;">${row["SV_Z"]}</td>
                <td style="text-align: center;">${row["SV_DNI"]}</td>
                <td style="text-align: center;">${row["SV_PERIODO"]}</td>
                <td style="text-align: center;">${row["SV_SUPERUSER"]}</td>                
                </tr>`;
            $('#tbody_data').html(cadena); 
            $('#tbody_data2').html(cadena2); 
            n++;            
          }          
          repaginar();
          //getAdjuntos(ids, responses);   
          $('#total_reg').text(auxlength + " Registros en total");       
        }
      });
    }


    //GARANTIZAR QUE SE HAYA TERMINADO DE CARGAR TODAS LAS IMÁGENES
    function waitLoadImgs(){ 
      let totalphotos = $('img').length - 2; //2 imgs precargadas: logo vista y logo reporte
      let realphotos;
      let loadedphotos = 0;  
      $('#lbl_numfotos').text((totalphotos)+" fotos");
      $('img').each(function(){  
          $(this).on("load", function(){ //load imgs de servidor
            loadedphotos++;
            realphotos = totalphotos - _auxsf;
            let percent = parseInt(loadedphotos/realphotos*100);
            $('#lbl_percentprogress').text(percent+" %");
            $('#div_barprogress').html(showPreloaderProgress(percent));
            if(totalphotos == (loadedphotos+_auxsf)){  
              $('td.sinfoto').html('Foto no encontrada').css({height: "4em", "font-weight": "bold", color: "#075daa", "font-style": "italic"});
              $('#btn_exportword').html('<i class="small material-icons">filter</i><i class="material-icons">file_download</i>').prop('disabled', false); 
              $('#btn_exportExcel').prop('disabled', false);
            }  
          });
      });
    }

    // CARGAR CMB USUARIOS
    function cargarCmbUsuario(){		
      let query = new QueryTask({url:url_attachements}); 
      let params  = new Query();            
      params.returnGeometry = false;
      params.outFields = [fusuario];
      params.orderByFields= [`${fusuario} asc`];
      params.where = "1=1";
	    params.returnDistinctValues = true;
	    query.execute(params).then(function(response){
        let nreg = response.features.length;
        let cmb = "<option selected value=''>- Seleccione usuario -</option>";
        for (let i = 0; i < nreg ; i++) {
          let dato = response.features[i].attributes[fusuario];
          if(dato != null ){
            cmb = cmb + "<option value='"+dato+"'>"+dato+"</option>";                 
          }
        }       
        $cmbuser.html(cmb);
      });
    }    
    
    console.log($('#btn_limpiar'));
    $('#btn_limpiar').on('click', function(event) {
      document.getElementById("fec_superv").value = fecha;
      document.getElementById("fec_fin").value = nn;
      $cmbuser.val("");
      // $fecsuperv.val(""); 
      // $fecfin.val('');
      clearData(""); 
    });

   /*************************************FUNCIONES DE APOYO **************************/

    //Preloaders
    function showPreloader(){
        return `
          <div class="preloader-wrapper small active">
            <div class="spinner-layer spinner-blue-only">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div><div class="gap-patch">
                <div class="circle"></div>
              </div><div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>
          </div>`;
      }

    function showPreloaderPnts(){
      return `<div class="lds-ellipsis"><div></div><div></div><div></div>`;
    }    

    function showPreloaderBar(){
      return `
        <div class="progress">
            <div class="indeterminate"></div>
        </div>`;
    }

    function showPreloaderProgress(percent){
      return `
        <div class="progress">
            <div class="determinate" style="width: ${percent}%"></div>
        </div>`;      
    }
   
    function clearData(mensaje) {
      $('#tbody_data').html(`<tr><td colspan="6" style="text-align:center;">${mensaje}</td></tr>`); 
      $("#tb_fotos").html(mensaje); 
      $('#btn_exportword').html('<i class="small material-icons">filter</i><i class="material-icons">file_download</i>');
      $('#div_barprogress').html("");
      $('#lbl_numfotos').text("");
      $('#lbl_percentprogress').text("");
      repaginar();
      $('.paginador').prop('hidden', true);
    }

    function repaginar(){
      $('.paginador').prop('hidden', false);
      $('#total_reg').text('');
      $('#myPager').html('');
      $('#tbl_data').pageMe({
        pagerSelector: '#myPager',
        activeColor: 'blue',          
        perPage: 8
      });
    }
      
});
