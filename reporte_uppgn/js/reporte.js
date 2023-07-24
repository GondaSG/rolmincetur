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
      if(paramb64==='MTBkaWNpZW1icmUxOTk1YXV4aWxpb21lZGVzbWF5b2VhZWFlYQ=='){
        cargarCmbUsuario();        
        $('#preloader_gral').addClass('hide');//retira preloader gral
        $('#viewDiv').removeClass('hide').addClass("animate__animated animate__fadeInDown");
      }else{
        console.log("ingrese parámetros");
      }
    });
    
    _proxyurl = "https://gisem.osinergmin.gob.pe/proxy_dsgn/proxy.ashx";
    _proxyurl = "";
	  // AUTENTICACIÓN
    //urlUtils.addProxyRule({
    //  urlPrefix: "http://domainosinerg4321",
    //  proxyUrl: _proxyurl
    //});

	  //// URL DE WEB SERVICES
	  //var url_dsgn = "https://services5.arcgis.com/oAvs2fapEemUpOTy/arcgis/rest/services/UPPGN_SUPERVISION_vista/FeatureServer/0";
	  var url_attachements = "https://services5.arcgis.com/oAvs2fapEemUpOTy/arcgis/rest/services/UPPGN_SUPERVISION_vista/FeatureServer/1";
	
    // fields de ws (1)
    var fusuario = "REC_USUARIO_child";
    var fobjectidform = "objectid";
    var ffecha = "REC_FECHASUPER_child";
    var fDescripcion = "REC_DESC_child";
    var frd = "REC_RD_child";
    var fdescr = "REC_DESC_child";
    var ftema = "REC_TEMA_child_label";
    var fhuso = "REC_ZONE";
    var feste = "REC_X";
    var fnorte = "REC_Y";

    var REC_AGESUP = "REC_AGESUP_child";
    var REC_UNISUP = "REC_UNISUP_child";
    var REC_UBICACION = "REC_UBICACION";
    var REC_EST = "REC_EST_child";
    var REC_SUPER_label = "REC_SUPER_child";
    var REC_CL = "REC_CL_child";
    var REC_ASPECTO = "REC_ASPECTO_child";
    var REC_TIPO = "REC_TIPO_child";
    var REC_MODALIDAD = "REC_MODALIDAD_child";
    var REC_FECHAINI = "REC_FECHAINI_child";
    var REC_START = "REC_START";
    var REC_EST_INIC = "REC_EST_INIC_child";
    var REC_INICIALES = "REC_INICIALES_child";
    var REC_RD_parent = "REC_RD_child";
    var REC_DNI = "REC_DNI";

    //// DEFINICIÓN DE FEATURE LAYERS 
    //var fl_serv1 = new FeatureLayer({ 
    //  url: url_dsgn,
    //  outFields: ["*"],
    //  visible:true,
    //  definitionExpression: "1=1"
    //});

   /******************************* UX *********************************************/

    //CARGAR COMBO FECHA ACTUAL
    var n =  new Date();
    n = moment(n).format('YYYY-MM-DD');
    document.getElementById("fec_superv").value = n;

    //VARIABLES DE FILTRO
    var $cmbuser = $('#cmb_usuario');
    var $fecsuperv = $('#fec_superv');
    //const MESES = [ "ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic" ];
    //const date = new Date();
    //
    //MESES[date.getMonth()];
    //var d = new Date();
    $('#fechaActual').html('26-jun-2023');

    //SELECCIONAR USUARIO Y FECHA A CONSULTAR/FILTRAR
    $('#cmb_usuario, #fec_superv').on('change', function(event){
      clearData("");      
      let usuario = $cmbuser.val(); 
      let fecha = $fecsuperv.val(); 
      if (usuario!= "" && fecha!="") {
        $cmbuser.prop('disabled', true);
        $fecsuperv.prop('disabled', true);
        $('#btn_exportword').prop('disabled', true).html(showPreloaderPnts());
        $('#div_barprogress').html(showPreloaderBar());
        $('#tbody_data').html(`<tr><td colspan="6" style="text-align:center;">${showPreloaderBar()}</td></tr>`);
        filtrar(usuario,fecha);
      }else{
        clearData("Seleccione su usuario");
      }
    });

    //BOTÓN EXPORTAR 
    $('#btn_exportword').on('click', function(event) {
      let usuario = $cmbuser.val();
      let fecha = $fecsuperv.val();
      // let hoy = new Date().toLocaleDateString('en-GB');
      let filename = 'Reporte_Supervision_'+usuario+'_'+fecha;      
      let iscomprimido = $('#chb_switch').is(':checked'); 
      $("#div_fotos").wordExport(filename, iscomprimido);     
      return false;   
    });

    //FILTRA DATA DEL WEBSERVICE Y MUESTRA EN TABLA PARA EXPORTAR 
    function filtrar(usuario, fecha) {
      var fi = moment(fecha).add(5,'hours').format('M/D/YYYY HH:mm:ss');
      var ff = moment(fecha).add(29,'hours').format('M/D/YYYY HH:mm:ss');

      var sql = fusuario + " = '"+usuario+"' and "+ffecha+" between '"+fi+"' and '"+ff+"'";
      var query = new QueryTask({url:url_attachements}); 
      var params  = new Query();  
      params.returnGeometry = false;
      params.outFields = ["*"];
      params.orderByFields= [`${ffecha} asc`];
      params.where = sql;
      query.execute(params).then(function(response){
        $cmbuser.prop('disabled', false);
        $fecsuperv.prop('disabled', false);
        var n = 0;
        if(response.features.length === 0){ 
          clearData('No hay registros coincidentes'); 
        }else{          
          var ids = [];
          responses = response.features;
          var cadena = '';
          let auxlength = responses.length;
          for (var i = 0; i < auxlength; i++) {
            let row = responses[i].attributes;
            let id = row[fobjectidform];
            let fecha = new Date(row[ffecha]);
            let fechaformat = moment(fecha).format('D/M/YYYY HH:mm:ss');
            let nreport = row[frd];            
            let coordenadas = "";
            if (row[feste] != null && row[fnorte] != null){
              coordenadas = row[feste] + ", " + row[fnorte];
            }            
            let tema = row[ftema];
            let descripcion = row[fDescripcion]; 

            cadena = cadena +
              `<tr>
                <td style="text-align: center;">${(i+1)}</td>
                <td style="text-align: center;">${fechaformat}</td>
                <td style="text-align: center;">${nreport}</td>
                <td style="text-align: center;">${coordenadas}</td>
                <td>${tema}</td>
                <td>${descripcion}</td>
              </tr>`;
            n++;
            
            ids.push(id);
            if (i==0) {
              var ini = row[REC_EST_INIC] == null ? '' : '-'+row[REC_EST_INIC];
              $('#title').html('REPORTE DIARIO N° RD-'+row[REC_CL]+ini+'-'+row[REC_INICIALES]+'-'+row[REC_RD_parent]);
              $('#REC_AGESUP').html(row[REC_AGESUP]);
              $('#REC_UNISUP').html(row[REC_UNISUP]);
              $('#REC_UBICACION').html(row[REC_UBICACION]);
              $('#REC_EST').html(row[REC_EST]);
              $('#REC_SUPER_label').html(row[REC_SUPER_label]);
              $('#REC_CL').html(row[REC_CL]);
              $('#REC_ASPECTO').html(row[REC_ASPECTO]);
              $('#REC_TIPO').html(row[REC_TIPO]);
              $('#REC_MODALIDAD').html(row[REC_MODALIDAD]);
              let fecha = new Date(row[REC_FECHAINI]);
              let fecha_start = new Date(row[REC_START]);
              $('#REC_FECHAINI').html(moment(fecha).format('DD/MM/YYYY'));
              $('#REC_START').html(moment(fecha_start).format('DD/MM/YYYY'));
              $('#REC_EST_').html(row[REC_EST]);
              $('#REC_SUPER_label_').html(row[REC_SUPER_label]);
              $('#REC_DNI_').html(row[REC_DNI]);
            }
          }
          $('#tbody_data').html(cadena);
          repaginar();
          getAdjuntos(ids, responses);          
        }
      });
    }

    // OBTIENE FOTOS DE LOS REGISTROS FILTRADOS Y MUESTRA EN DIV OCULTO PARA EXPORTAR
    function getAdjuntos(ids, responses){
      let $tbfotos = $("#tb_fotos").html("");
      _auxsf = 0; //aux n sinfoto
      //fl_serv1.queryRelatedFeatures({
      //  outFields: ["*"],
      //  relationshipId: 1,
      //  objectIds: ids
      //})
      //.then(function(relatedrecords){
        if (responses.length == 0) { 
          console.log("No se encontraron registros relacionados de fotos"); 
          $tbfotos.html("No se encontraron registros relacionados de fotos");
          $('#div_barprogress').html(showPreloaderProgress(100));
          $('#btn_exportword').html('<i class="small material-icons">filter</i><i class="material-icons">file_download</i>').prop('disabled', false);    
          return; 
        }
        let contfoto = 0;
        responses.forEach(response => { 

          //response.data.forEach( t => {
            //let tema = datafiltrada[auxobjectid].tema;
            //let objectid = response[objectid]; 
            //let record = response;
            let rec_fotos = response.attributes;
            //let auxlength = rec_fotos.length;
            //for (let i = 0; i < auxlength; i++) {            
            let row = rec_fotos;
            let tema = (row[ftema] != null) ? row[ftema] : "";
            let id_rec_foto = row[fobjectidform];
            console.log('id_rec_foto');
            console.log(id_rec_foto);
            let rd = (row[frd] != null) ? row[frd] : ""; 
            let desc = (row[fdescr] != null) ? row[fdescr] : "";
            let huso = (row[fhuso] != null) ? row[fhuso] : ""; 
            let este = (row[feste] != null) ? row[feste] : "";  
            let norte = (row[fnorte] != null) ? row[fnorte] : "";
            contfoto++;
            contfoto > 99 ? correlat=contfoto : correlat = ('0'+contfoto).slice(-2);            

            let table  = document.createElement('table');
            let trfoto = '', tr1 = '', tr2 = '', f1 = '', f2 = '', f3 = '';
            table.style.cssText = "font-family: Calibri; font-size: 14px; width: 100%; border-collapse: collapse;6";
            
            trfoto = `<tr><td></td></tr>
                    <tr>
                      <td id="td_${id_rec_foto}" colspan="6" style="border: solid 1px; text-align: center;"><img id="img_${id_rec_foto}" crossorigin="Anonymous"></td>
                    </tr>`;
            tr1 = `<tr>
                    <td colspan="2" style="border: solid 1px; white-space: nowrap;">RD-${rd}-Foto-${correlat}: &nbsp;&nbsp;</td>
                    <td colspan="4" style="border: solid 1px;">${desc}</td>
                  </tr>`;

            tr2 = `<tr>
                    <td colspan="2" style="border: solid 1px;">Tema: </td>
                    <td colspan="4" style="border: solid 1px;">${tema}</td>
                  </tr>
                  <tr>
                    <td style="border: solid 1px;">Huso: &nbsp;&nbsp;</td>
                    <td style="border: solid 1px;">${huso}</td>
                    <td style="border: solid 1px;">Este: </td>
                    <td style="border: solid 1px;">${este}</td>
                    <td style="border: solid 1px;">Norte: </td>
                    <td style="border: solid 1px;">${norte}</td>
                  </tr>`;
            
            table.innerHTML = trfoto + tr1 + tr2 + f1 + f2 + f3;
            document.querySelector("#tb_fotos").appendChild(table);
            
            //fetch(`${_proxyurl}?${url_attachements}/${id_rec_foto}/attachments?f=pjson`) //lee json de url
            fetch(`${url_attachements}/${id_rec_foto}/attachments?f=pjson`) //lee json de url
            .then(response => response.json())
            .then(function(datajson) {
                if(!datajson.error){
                  const attachments = datajson.attachmentInfos; 
                  if (attachments.length > 0 ) {
                    attachments.forEach(function(attachment) { //always 1
                      let idattachmet = attachment.id;
                      let urlimg = getUrlAttachment(id_rec_foto, idattachmet); 
                      $(`#img_${id_rec_foto}`).attr('src', urlimg);
                    });
                  }else{
                    _auxsf++;
                    $(`#img_${id_rec_foto}`).parent().addClass('sinfoto');
                    console.log(`El id_rec_foto ${id_rec_foto} no tiene attachments`);
                  }              
                }else{
                  console.log(`Ocurrió un error al obtener información de foto: ${datajson.error.message}`);
                } 
            });
          //})
            
          //}
          waitLoadImgs();
        });
        
        
      //});
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
            }  
          });
      });
    }


    //OBTIENE URL DE ATTACHMENTS
    function getUrlAttachment(idfeature, idattachmet){
      //return `${_proxyurl}?${url_attachements}/${idfeature}/attachments/${idattachmet}`; 
      return `${url_attachements}/${idfeature}/attachments/${idattachmet}`; 
    }

    // CARGAR CMB USUARIOS
    function cargarCmbUsuario(){
      //let lstusuarios = new Array();
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
