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
    
    var ffecha = "SV_FECHAINISUP";
    var fDescripcion = "DOCUMENTSCON";
    var frd = "SV_RD";

    var fobjectidform2 = "OBJECTID";
    
    var ftema = "COMENTATSCON";
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
    var REC_FECHAINI = "SV_FECHAINISUP";
    var REC_START = "FECINITSCON";

    var REC_EST_INIC = "REC_EST_INIC_child";
    var REC_INICIALES = "SV_EMPSUP_INI";
    var REC_RD_parent = "SV_SUPER_INI";
    var REC_RD_parent2 = "SV_RD";
    var REC_DNI = "SV_DNI";

    //// DEFINICIÓN DE FEATURE LAYERS 
    var fl_serv1 = new FeatureLayer({ 
      url: url_attachements,
      outFields: ["*"],
      visible:true,
      definitionExpression: "1=1"
    });

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
      var fi = moment(fecha).add(5,'hours').format('DD/MM/YYYY HH:mm:ss');
      var ff = moment(fecha).add(29,'hours').format('DD/MM/YYYY HH:mm:ss');

      var sql = fusuario + " = '"+usuario+"' and "+ffecha+" between '"+fi+"' and '"+ff+"'";
      //sql = fusuario + " = '"+usuario+"' ";
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
              $('#title').html('REPORTE DIARIO N° RD-'+row[REC_CL]+'-'+row[REC_INICIALES]+'-'+row[REC_RD_parent]+'-'+row[REC_RD_parent2]);
              $('#REC_AGESUP').html(row[REC_AGESUP]);
              $('#REC_UNISUP').html(row[REC_UNISUP]);
              $('#REC_UBICACION').html("Distrito de &  " + row[REC_UBICACION] + ", provincia de" + row[REC_UBICACION2] + " y departamento de " + row[REC_UBICACION3]);
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
      var data = responses;
      console.log(data, ids);
      if (responses.length == 0) { 
        console.log("No se encontraron registros relacionados de fotos");
        $tbfotos.html("No se encontraron registros relacionados de fotos");
        $('#div_barprogress').html(showPreloaderProgress(100));
        $('#btn_exportword').html('<i class="small material-icons">filter</i><i class="material-icons">file_download</i>').prop('disabled', false);    
        return; 
      }
      let contfoto = 0;
      for (var i = 0; i < ids.length; i++) {
        let row2 = responses[i].attributes;
        var query = new QueryTask({url:url_attachements2}); 
        var params  = new Query();  
        params.returnGeometry = false;
        params.outFields = ["*"];
        //params.orderByFields= [`${ffecha} asc`];
        params.where = "PARENTGLOBALID = '"+ids[i]+"'";
        query.execute(params).then(function(response){
          console.log(response);
          let img1 = '<td rowspan="3" colspan="2" style="border: solid 1px;"></td>', img2 = '<td rowspan="1" colspan="2" style="border: solid 1px;"></td>', 
          img3 = '<td rowspan="1" colspan="3" style="border: solid 1px;"></td>', img4 = '<td rowspan="1" colspan="2" style="border: solid 1px;"></td>',
          img5 = '<td rowspan="1" colspan="3" style="border: solid 1px;"></td>', imgt = '';
          let sihay1, sihay2, sihay3, sihay4, sihay5  = false;
          response.features.forEach( (response, i) => {
              let rec_fotos = response.attributes;
              let row = rec_fotos;
              let tema = (row[ftema] != null) ? row[ftema] : "";
              
              let rdescFotos = (row[descFotos] != null) ? row[descFotos] : "";
              if (rdescFotos == "FACHADA"){
                sihay1 = true;
                img1 = `<td id="td_f_${ids[i]}" rowspan="3" colspan="2" style="text-align: center; border: solid 1px;"><img height="180px" width="180px" id="img_f_${row[fobjectidform2]}" crossorigin="Anonymous"></td>`;
              }
              else if (rdescFotos == "GABINETE"){
                sihay2 = true;
                img2 = `<td id="td_g_${ids[i]}" rowspan='1' colspan="2" style="text-align: center; border: solid 1px;"><img height="180px" width="180px" id="img_g_${row[fobjectidform2]}" crossorigin="Anonymous"></td>`;
              }
              else if (rdescFotos == "MEDIDOR"){
                img3 = `<td id="td_m_${ids[i]}" rowspan="1" colspan="3" style="text-align: center; border: solid 1px;"><img height="180px" width="180px" id="img_m_${row[fobjectidform2]}" crossorigin="Anonymous"></td>`;
              }
              else if (rdescFotos == "GASODOMESTICO"){
                img4 = `<td id="td_gd_${ids[i]}" rowspan='1' colspan="2" style="text-align: center; border: solid 1px;"><img height="180px" width="180px" id="img_gd_${row[fobjectidform2]}" crossorigin="Anonymous"></td>`;
              }
              else if (rdescFotos == "RECIBO"){
                img5 = `<td id="td_r_${ids[i]}" rowspan='1' colspan="3" style="text-align: center; border: solid 1px;"><img height="180px" width="180px" id="img_r_${row[fobjectidform2]}" crossorigin="Anonymous"></td>`;
              }
          });

            //let id_rec_foto = 0;row[fobjectidform2];
            //console.log('id_rec_foto');
            //console.log(id_rec_foto);
            
            //let rd = (row[frd] != null) ? row[frd] : ""; 
            let depa = (row2[fdepa] != null) ? row2[fdepa] : "";
            let prov = (row2[fprov] != null) ? row2[fprov] : ""; 
            let dist = (row2[fdist] != null) ? row2[fdist] : "";
            let zona = (row2[fzona] != null) ? row2[fzona] : "";
            let este = (row2[feste] != null) ? row2[feste] : "";
            let norte = (row2[fnorte] != null) ? row2[fnorte] : "";
            let num = (row2[fnum] != null) ? row2[fnum] : "";
            let dir = row2["TVIASUPTSCON"] + " & " + row2["NVIASUPTSCON"] + " & " + row2["NUMZLTSUPTSCON"] + " & " + row2["INTDEPSUPTSCON"] + " & " + row2["PISOSUPTSCON"] + " & " + row2["URBSUPTSCON"];
            
            contfoto++;
            contfoto > 99 ? correlat=contfoto : correlat = ('0'+contfoto).slice(-2);            

            let table  = document.createElement('table');
            let trfoto = '', tr1 = '', tr2 = '', f1 = '', f2 = '', f3 = '';
            table.style.cssText = "font-family: Calibri; font-size: 14px; width: 100%; border-collapse: collapse;6";
            
            tr1 = `<tr>
                    <td width="100px" rowspan="2" colspan="1" style="text-align: center; border: solid 1px; white-space: nowrap; background-color: #002258; color: white;">&nbsp;&nbsp;${contfoto} &nbsp;&nbsp;</td>
                    <td width="100px" colspan="1" style="text-align: center; border: solid 1px; background-color: #002258; color: white;"><b>Departamento</b></td>
                    <td width="100px" colspan="1" style="text-align: center; border: solid 1px; background-color: #002258; color: white;"><b>Provincia</b></td>
                    <td width="100px" colspan="1" style="text-align: center; border: solid 1px; background-color: #002258; color: white;"><b>Distrito</b></td>
                    <td width="100px" colspan="1" style="text-align: center; border: solid 1px; background-color: #002258; color: white;"><b>N° Contrato</b></td>
                    <td width="100px" colspan="2" style="text-align: center; border: solid 1px;">${num}</td>
                  </tr>
                  <tr>
                    <td colspan="1" style="text-align: center; border: solid 1px;">${depa}</td>
                    <td colspan="1" style="text-align: center; border: solid 1px;">${prov}</td>
                    <td colspan="1" style="text-align: center; border: solid 1px;">${dist}</td>
                    <td colspan="1" style="text-align: center; border: solid 1px; background-color: #002258; color: white;"><b>Huso</b></td>
                    <td colspan="1" style="text-align: center; border: solid 1px; background-color: #002258; color: white;"><b>Este</b></td>
                    <td colspan="1" style="text-align: center; border: solid 1px; background-color: #002258; color: white;"><b>Norte</b></td>
                  </tr>
                  <tr>
                    <td colspan="1" style="text-align: center; border: solid 1px; background-color: #002258; color: white;"><b>Dirección</b></td>
                    <td colspan="3" style="text-align: center; border: solid 1px;">${dir}</td>                     
                    <td colspan="1" style="text-align: center; border: solid 1px;">${zona}</td>
                    <td colspan="1" style="text-align: center; border: solid 1px;">${este}</td>
                    <td colspan="1" style="text-align: center; border: solid 1px;">${norte}</td>
                  </tr>`;
            trfoto = `
                    <tr>
                      ${img1}
                      ${img2}
                      ${img3}
                    </tr>
                    <tr>
                      <td colspan="2" style="border: solid 1px; text-align: center; background-color: #002258; color: white;"><b>GABINETE</b></td>
                      <td colspan="3" style="border: solid 1px; text-align: center; background-color: #002258; color: white;"><b>MEDIDOR</b></td>
                    </tr>
                    <tr>
                      ${img4}
                      ${img5}
                    </tr>`;
            tr2 = `<tr>
                    <td colspan="2" style="border: solid 1px; text-align: center; background-color: #002258; color: white;"><b>FACHADA</b></td>
                    <td colspan="2" style="border: solid 1px; text-align: center; background-color: #002258; color: white;"><b>GASODOMESTICO</b></td>
                    <td colspan="3" style="border: solid 1px; text-align: center; background-color: #002258; color: white;"><b>RECIBO</b></td>
                  </tr>
                  <tr>
                    <td colspan="7" style="border: solid 1px; text-align: center; background-color: #002258; color: white;"><b>OBSERVACIONES</b></td>
                  </tr>
                  <tr>
                    <td colspan="7" rowspan="3" style="border: solid 1px; text-align: center;">&nbsp;&nbsp;</td>
                  </tr>`;
            
            table.innerHTML = tr1 + trfoto + tr2 + f1 + f2 + f3;
            document.querySelector("#tb_fotos").appendChild(table);

          

          response.features.forEach( (response, i) => {
            let rec_fotos = response.attributes;
            let row = rec_fotos;
            let id_rec_foto = response.attributes[fobjectidform2];
            fetch(`${_proxyurl}?${url_attachements2}/${id_rec_foto}/attachments?f=pjson`) //lee json de url
              //fetch(`${url_attachements}/${id_rec_foto}/attachments?f=pjson`) //lee json de url
              .then(response => response.json())
              .then(function(datajson) {
                  if(!datajson.error){
                    const attachments = datajson.attachmentInfos; 
                    if (attachments.length > 0 ) {
                      attachments.forEach(function(attachment) { //always 1
                        let idattachmet = attachment.id;
                        let urlimg = getUrlAttachment(id_rec_foto, idattachmet); 
                        let rdescFotos = (row[descFotos] != null) ? row[descFotos] : "";
                        imgt = "";
                        if (rdescFotos == "FACHADA"){
                          imgt = `#img_f_${id_rec_foto}`
                        }
                        else if (rdescFotos == "GABINETE"){
                          imgt = `#img_g_${id_rec_foto}`
                        }
                        else if (rdescFotos == "MEDIDOR"){
                          imgt = `#img_m_${id_rec_foto}`
                        }
                        else if (rdescFotos == "GASODOMESTICO"){
                          imgt = `#img_gd_${id_rec_foto}`
                        }
                        else if (rdescFotos == "RECIBO"){
                          imgt = `#img_r_${id_rec_foto}`
                        }
                        $(imgt).attr('src', urlimg);
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
          });

          waitLoadImgs();



        });
      }
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
      return `${_proxyurl}?${url_attachements2}/${idfeature}/attachments/${idattachmet}`; 
      //return `${url_attachements}/${idfeature}/attachments/${idattachmet}`; 
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
