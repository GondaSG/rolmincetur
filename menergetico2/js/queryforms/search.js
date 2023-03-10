let busquedaCampoEmpresa = false;

define([
    "js/core/services",
    "js/helper",

    "esri/tasks/QueryTask",
    "esri/tasks/support/Query",
    "esri/Graphic",
    "esri/layers/GraphicsLayer"
  ], function(
    Services,
    Helper,

    QueryTask,
    Query,
    Graphic,
    GraphicsLayer
    ){

    
        
    var __grouplayer=[],
        __layers=[], //capa=[{titlelayers:titulo_capas, service: url_servicio, fields: campos({fieldname, fieldlabel})}],
        __url_query='',
        __fields=[],
        __query=[],
        __queryindex=0,
        __titlelayer='',    

        __url_ubigeo='',
        __sql_ubigeo='',
        _gra_ubigeo={},
        _symbol={
            type: "simple-line",
            color: "#2196f3",
            width: 2,
        },
        url_ubigeoregion=Services.getUrlDepartamento(),
        url_ubigeoprovincia=Services.getUrlProvincia(),
        url_ubigeodistrito=Services.getUrlDistrito(),
        __sublayer = {},
        __ubigeogeometry = {},        
        __jsonvaluefiels =[];
    
    __globspace._gly_searchadvanced = new GraphicsLayer({
        listMode:"hide",
        title:"Busqueda Avanzada"
    });

    var _gly_ubigeo = new GraphicsLayer({
        listMode: "hide",
        title: "Buffer"
    });

    __globspace.map.add(__globspace._gly_searchadvanced);

    loadRegion();
    loadRegionPestaniaUbigeo();

    /**
     * load groups
     * lleno __grouplayer
     */
    $('#wg_search_advanced').on('change', '#cmb_sector', function (e) {
        e.preventDefault();
        let group = $(this).val(),
            layers = __globspace.currentmap.layers.items,
            aux_layer='';
        clearAll();
        if(group!=''){
            let auxlength = layers.length;
            for (let i = 0; i < auxlength; i++) {
                let layer = layers[i];
                if(group==layer.aux_alias){
                    let hassublayers='',
                        padres='?'+layer.title,
                        nivelcero=layer.title,
                        resultado= [];
                    layer.sublayers!=null ? hassublayers=true : hassublayers=false;
                    aux_layer=extraerlayer(layer.sublayers.items,padres, hassublayers, nivelcero, resultado);
                    break;
                }
            }

            if(aux_layer!=''){
                __grouplayer=getGroupLayer(aux_layer);
            }
            let cmb='<option value="">-- Elija un grupo --</option>',
                ngrouplayer=__grouplayer.length;

            for (let i = 0; i < ngrouplayer; i++) {
                let item = __grouplayer[i];
                cmb +=`<option value="${i}">${item.group}</option>`;
            }
            $('#cmb_grupo').html(cmb);
        }
    });

    $('#wg_search_advanced').on('change', '#cmb_sector_pestaniaubigeo', function (e) {
        e.preventDefault();
        let group = $(this).val(),
            layers = __globspace.currentmap.layers.items,
            aux_layer='';
        //clearAll_PestaniaUbigeo();
        if(group!=''){
            let auxlength = layers.length;
            for (let i = 0; i < auxlength; i++) {
                let layer = layers[i];
                if(group==layer.aux_alias){
                    let hassublayers='',
                        padres='?'+layer.title,
                        nivelcero=layer.title,
                        resultado= [];
                    layer.sublayers!=null ? hassublayers=true : hassublayers=false;
                    aux_layer=extraerlayer(layer.sublayers.items,padres, hassublayers, nivelcero, resultado);
                    break;
                }
            }

            if(aux_layer!=''){
                __grouplayer=getGroupLayer(aux_layer);
            }
            let cmb='<option value="">-- Elija un grupo --</option>',
                ngrouplayer=__grouplayer.length;

            for (let i = 0; i < ngrouplayer; i++) {
                let item = __grouplayer[i];
                cmb +=`<option value="${i}">${item.group}</option>`;
            }
            $('#cmb_grupo_pestaniaubigeo').html(cmb);
        }
        //console.log("__url_ubigeo en sector => " + __url_ubigeo);
    });

    /**
     * load grupos 
     * lleno __layers del __grouplayer 
     */
    $('#wg_search_advanced').on('change', '#cmb_grupo', function (e) {
        //console.log("cmb_grupo");
        e.preventDefault();
        let sector = $(this).val();
        clearLayer();
        if(sector!=''){
            __layers=__grouplayer[sector].children;
            let cmb='<option value="">-- Elija una capa --</option>',
                nlayers= __layers.length;
            
            for (let i = 0; i < nlayers; i++) {
                cmb +=`<option value="${i}">${__layers[i].layers}</option>`;
            }
            $('#cmb_layer').html(cmb);
        }else{
            $('#cmb_layer').html('<option value="">-- Primero elija un grupo --</option>');
            $('#cmb_fields').html('<option value="">-- Primero elija una capa --</option>');
        }
    });

    $('#wg_search_advanced').on('change', '#cmb_grupo_pestaniaubigeo', function (e) {
        
        e.preventDefault();
        let sector = $(this).val();
        //clearLayer_PestaniaUbigeo();
        if(sector!=''){
            __layers=__grouplayer[sector].children;
            let cmb='<option value="">-- Elija una capa --</option>',
                nlayers= __layers.length;
            
            for (let i = 0; i < nlayers; i++) {
                cmb +=`<option value="${i}">${__layers[i].layers}</option>`;
            }
            $('#cmb_layer_pestaniaubigeo').html(cmb);
        }else{
            $('#cmb_layer_pestaniaubigeo').html('<option value="">-- Primero elija un grupo --</option>');
            $('#cmb_fields_pestaniaubigeo').html('<option value="">-- Primero elija una capa --</option>');
        }
        //console.log("__url_ubigeo en grupo => " + __url_ubigeo);
    });

    /**
     * load fields
     * lleno __url_query del __layer
     * lleno __fields del __layer
     */
    $('#wg_search_advanced').on('change', '#cmb_layer', function (e) {
        e.preventDefault();
        clearFields();
        let layer = $(this).val();
        
        if (layer != '') {
            __url_query = __layers[layer].service;
            __sublayer = __layers[layer].sublayer;
            getTypeFields();
        } else {
            $('#btn_searchadvanced').addClass('notvisible').removeClass('visible');
            $('#cmb_fields').html('<option value="">-- Primero elija una capa --</option>');
        }
        
    });

    $('#wg_search_advanced').on('change', '#cmb_layer_pestaniaubigeo', function (e) {
        e.preventDefault();
        clearFields_PestaniaUbigeo();
        let layer = $(this).val();
        
        if (layer != '') {
            __url_query = __layers[layer].service;
            __sublayer = __layers[layer].sublayer;
            getTypeFieldsPestaniaUbigeo();
        } else {
            $('#btn_searchadvanced_pestaniaubigeo').addClass('notvisible').removeClass('visible');
            $('#cmb_fields_pestaniaubigeo').html('<option value="">-- Primero elija una capa --</option>');
        }
        //console.log("__url_ubigeo en layer => " + __url_ubigeo);
    });



    $('#wg_search_advanced').on('change', '#cmb_fields', function (e) {    
        let typedata = $('#cmb_fields option:selected').attr('data-typedata');

        $("#txt_filter").prop("disabled",false);
        
        if(['double', 'small', 'integer', 'single', 'date'].includes(typedata)){
            $('#cmb_condition').prop('selectedIndex', 1);
        }else{
            $('#cmb_condition').prop('selectedIndex', 0);
        }

        if(typedata =='date'){
            $('#txt_filter').attr('type', 'date')
        }else{
            $('#txt_filter').attr('type', 'text')
        }
    });

    $("#txt_filter").keyup(function(e){
        loadDropDown(e.target.value);
    });

    $("#txt_filter_pestaniaUbigeo").keyup(function(e){
        loadDropDownUbigeo(e.target.value);
    });

    $('#wg_search_advanced').on('change', '#cmb_fields_pestaniaubigeo', function (e) {    
        let typedata = $('#cmb_fields_pestaniaubigeo option:selected').attr('data-typedata');

        $("#txt_filter_pestaniaUbigeo").prop("disabled",false);
        
        if(['double', 'small', 'integer', 'single', 'date'].includes(typedata)){
            $('#cmb_condition_pestaniaubigeo').prop('selectedIndex', 1);
        }else{
            $('#cmb_condition_pestaniaubigeo').prop('selectedIndex', 0);
        }

        if(typedata =='date'){
            $('#txt_filter_pestaniaubigeo').attr('type', 'date')
        }else{
            $('#txt_filter_pestaniaubigeo').attr('type', 'text')
        }
        //console.log("__url_ubigeo en fields => " + __url_ubigeo);
    });

    
    /**
     * add filters in table
     * lleno __query
     * utilizo __queryindex 
     */
    $('#wg_search_advanced').on('click', '#btn_addfilter', function (e) {    
            e.preventDefault();
        
        let fieldname=$('#cmb_fields').val(),
            fieldlabel=$('#cmb_fields option:selected').text(),
            condition=$('#cmb_condition').val(),
            filter=$('#txt_filter').val(),
            typedata = $('#cmb_fields option:selected').attr('data-typedata'),
            option='';

        if(filter == null) filter='';
        if(fieldname!='' && filter.trim().length!=0){
            __queryindex++;
            __query.length==0 ? option='--': option='and'; 
            __query.push({
                'id': __queryindex,
                'fieldname': fieldname,
                'condition': condition,
                'filter': filter,
                'option': option,
                'typedata': typedata
            });
            
            aux_cadena=`<select name="opcion" class='cmb-operadorlogico' data_queryindex="${__queryindex}" >
                            <option value="and">and</option>
                            <option value="or">or</option>
                        </select>`;
            __query.length==1 ? aux_cadena='--': ''; 
            cadena=`<tr id="tr_${__queryindex}">
                    <td> ${aux_cadena}</td>
                    <td>${fieldlabel}</td>
                    <td>${condition}</td>
                    <td>${filter}</td>
                    <td><span class="btn_removefilter icon-remove" data_queryindex="${__queryindex}"></span></td>
                </tr>`;
                
            $('#tbody_filter').append(cadena);
        }else{
            alertMessage('Seleccione un campo o escriba un filtro','warning');
        }
    });



    $('#wg_search_advanced').on('click', '#btn_addfilter_pestaniaubigeo', function (e) {    
        e.preventDefault();
    
        let fieldname=$('#cmb_fields_pestaniaubigeo').val(),
            fieldlabel=$('#cmb_fields_pestaniaubigeo option:selected').text(),
            condition=$('#cmb_condition_pestaniaubigeo').val(),
            filter=$('#txt_filter_pestaniaubigeo').val(),
            typedata = $('#cmb_fields_pestaniaubigeo option:selected').attr('data-typedata'),
            option='';

        if(filter == null) filter='';
        if(fieldname!='' && filter.trim().length!=0){
            __queryindex++;
            __query.length==0 ? option='--': option='and'; 
            __query.push({
                'id': __queryindex,
                'fieldname': fieldname,
                'condition': condition,
                'filter': filter,
                'option': option,
                'typedata': typedata
            });
            
            aux_cadena=`<select name="opcion" class='cmb-operadorlogico' data_queryindex="${__queryindex}" >
                            <option value="and">and</option>
                            <option value="or">or</option>
                        </select>`;
            __query.length==1 ? aux_cadena='--': ''; 
            cadena=`<tr id="tr_${__queryindex}">
                    <td> ${aux_cadena}</td>
                    <td>${fieldlabel}</td>
                    <td>${condition}</td>
                    <td>${filter}</td>
                    <td><span class="btn_removefilter icon-remove" data_queryindex="${__queryindex}"></span></td>
                </tr>`;
                
            $('#tbody_filter_pestaniaubigeo').append(cadena);
        }else{
            alertMessage('Seleccione un campo o escriba un filtro','warning');
        }
    });



    
    // cambiar la opcion del filto : and o or 
    $('#wg_search_advanced').on('change', '.cmb-operadorlogico', function(event) {
        event.preventDefault();
        let option=$(this).val(),
            queryindex=$(this).attr('data_queryindex'),
            nquery=__query.length;
        
        for (let i = 0; i < nquery; i++) {
            if(queryindex==__query[i].id){
                __query[i].option=option;
                break;
            }
        }
    });

    // eliminar un filtro
    $('#wg_search_advanced').on('click', '.btn_removefilter', function(event) {
        event.preventDefault();
        let queryindex=$(this).attr('data_queryindex'),
            nquery=__query.length;
        
        for (let i = 0; i < nquery; i++) {
            if(queryindex==__query[i].id){
                $('#tr_'+queryindex).remove();
                __query.splice(i, 1);
                break;
            }
        }
        if(__query.length!=0){
            if(__query[0].option!='--'){
                __query[0].option='--';
                $('#tr_'+__query[0].id+ ' td').first().text('--');
            }
        }
    });

    /**
     * btn buscar
     * lleno __titlelayer
     */
    $("#btn_searchadvanced").click(function (e){
        Helper.showPreloader();
        Helper.hideGrid();
        
        let sector=$('#cmb_sector').val(),
            aux_sector=$('#cmb_sector option:selected').text(),
            group=$('#cmb_grupo option:selected').text(),
            layer=$('#cmb_layer option:selected').text();
        
        __titlelayer ='Consulta avanzada: \n'+ aux_sector+' / '+ group +' / ' + layer;

        if(__query.length!=0 || __url_ubigeo!=''){
            search();
        }else{
            Helper.hidePreloader();
            alertMessage('Elija campos a filtrar o ubigeo.','warning', 'top-center', true);
        }
    });


    $("#btn_searchadvanced_pestaniaubigeo").click(function (e){
        Helper.showPreloader();
        Helper.hideGrid();
        
        let sector=$('#cmb_sector_pestaniaubigeo').val(),
            aux_sector=$('#cmb_sector_pestaniaubigeo option:selected').text(),
            group=$('#cmb_grupo_pestaniaubigeo option:selected').text(),
            layer=$('#cmb_layer_pestaniaubigeo option:selected').text();
        
        __titlelayer ='Consulta avanzada: \n'+ aux_sector+' / '+ group +' / ' + layer;
        if(__query.length!=0 || __url_ubigeo!=''){
            searchPestaniaUbigeo();
        }else{
            Helper.hidePreloader();
            alertMessage('Elija campos a filtrar o ubigeo.','warning', 'top-center', true);
        }
    });

    // load cmb provincia
    $('#cmb_ubigeoregion').on('change',function(){
        $('#cmb_ubigeodistrito').html('<option value="">--Primero elija una provincia--</option>');
        $('#cmb_ubigeoprovincia').html('<option value="">--Primero elija una regi??n--</option>');
        let codregion = $(this).val();
        if(codregion!=''){
            __url_ubigeo=url_ubigeoregion;
            __sql_ubigeo=`CODDEPARTAMENTO = '${codregion}'`;
    
            let _queryt = new QueryTask({url:url_ubigeoprovincia}),
                _qparams = new Query();
            _qparams.returnGeometry = false;
            _qparams.outFields =["NOMPROVINCIA","CODPROVINCIA","CODDEPARTAMENTO"];
            _qparams.orderByFields= ["NOMPROVINCIA"];
            _qparams.where = `CODDEPARTAMENTO = '${codregion}'`;
            _qparams.returnDistinctValues = true;
            _queryt.execute(_qparams).then(function(response){   
                let nreg = response.features.length,
                    cmb = "<option selected value=''>- Seleccione una provincia -</option>";
                for (let i = 0; i < nreg ; i++){
                    let nameprovincia = response.features[i].attributes['NOMPROVINCIA'],
                        codprovincia = response.features[i].attributes['CODPROVINCIA'];
                    cmb = cmb + "<option value="+codprovincia+">"+nameprovincia+"</option>";
                }
                $('#cmb_ubigeoprovincia').html(cmb);
    
            }).catch(function (error) {
                console.log("query task error");
                console.log(error);
            });            
        }else{
            __url_ubigeo = '';
            __sql_ubigeo = '';
        }
    });


    $('#cmb_ubigeoregion_pestaniaubigeo').on('change',function(){
        $('#cmb_ubigeodistrito_pestaniaubigeo').html('<option value="">--Primero elija una provincia--</option>');
        $('#cmb_ubigeoprovincia_pestaniaubigeo').html('<option value="">--Primero elija una regi??n--</option>');
        let codregion = $(this).val();
        if(codregion!=''){
            __url_ubigeo=url_ubigeoregion;
            __sql_ubigeo=`CODDEPARTAMENTO = '${codregion}'`;
    
            let _queryt = new QueryTask({url:url_ubigeoprovincia}),
                _qparams = new Query();
            _qparams.returnGeometry = false;
            _qparams.outFields =["NOMPROVINCIA","CODPROVINCIA","CODDEPARTAMENTO"];
            _qparams.orderByFields= ["NOMPROVINCIA"];
            _qparams.where = `CODDEPARTAMENTO = '${codregion}'`;
            _qparams.returnDistinctValues = true;
            _queryt.execute(_qparams).then(function(response){   
                let nreg = response.features.length,
                    cmb = "<option selected value=''>- Seleccione una provincia -</option>";
                for (let i = 0; i < nreg ; i++){
                    let nameprovincia = response.features[i].attributes['NOMPROVINCIA'],
                        codprovincia = response.features[i].attributes['CODPROVINCIA'];
                    cmb = cmb + "<option value="+codprovincia+">"+nameprovincia+"</option>";
                }
                $('#cmb_ubigeoprovincia_pestaniaubigeo').html(cmb);
                $('#btn_searchadvanced_pestaniaubigeo').addClass('visible').removeClass('notvisible');
    
            }).catch(function (error) {
                console.log("query task error");
                console.log(error);
            });            
        }else{
            __url_ubigeo = '';
            __sql_ubigeo = '';
        }
    });

 
    // load cmc distrito
    $('#cmb_ubigeoprovincia').on('change',function(){
        $('#cmb_ubigeodistrito').html('<option value="">--Primero elija una provincia--</option>');
        let codprovincia = $(this).val();
        if(codprovincia!=''){
            __url_ubigeo=url_ubigeoprovincia;
            __sql_ubigeo=`CODPROVINCIA='${codprovincia}'`;
    
            let _queryt = new QueryTask({url:url_ubigeodistrito}),
                _qparams = new Query();
            _qparams.returnGeometry = false;
            _qparams.outFields = ["NOMDISTRITO","UBIGEO","CODPROVINCIA"];
            _qparams.orderByFields= ["NOMDISTRITO"];
            _qparams.where = `CODPROVINCIA='${codprovincia}'`;
            _qparams.returnDistinctValues = true;
            _queryt.execute(_qparams).then(function(response){
                let nreg = response.features.length;
                let cmb = "<option selected value=''>-- Seleccione distrito --</option>";
                for (let i = 0; i < nreg ; i++){
                    let namedistrito = response.features[i].attributes['NOMDISTRITO'];
                    let coddistrito = response.features[i].attributes['UBIGEO'];
                    cmb = cmb + "<option value="+coddistrito+">"+namedistrito+"</option>";
                }
                $('#cmb_ubigeodistrito').html(cmb);
            }).catch(function (error) {
                console.log("query task error");
                console.log(error);
            });
        }else{
            __url_ubigeo = url_ubigeoregion;
            __sql_ubigeo = `CODDEPARTAMENTO = '${ $('#cmb_ubigeoregion').val() }'`;
        }
    });

    $('#cmb_ubigeoprovincia_pestaniaubigeo').on('change',function(){
        $('#cmb_ubigeodistrito_pestaniaubigeo').html('<option value="">--Primero elija una provincia--</option>');
        let codprovincia = $(this).val();
        if(codprovincia!=''){
            __url_ubigeo=url_ubigeoprovincia;
            __sql_ubigeo=`CODPROVINCIA='${codprovincia}'`;
    
            let _queryt = new QueryTask({url:url_ubigeodistrito}),
                _qparams = new Query();
            _qparams.returnGeometry = false;
            _qparams.outFields = ["NOMDISTRITO","UBIGEO","CODPROVINCIA"];
            _qparams.orderByFields= ["NOMDISTRITO"];
            _qparams.where = `CODPROVINCIA='${codprovincia}'`;
            _qparams.returnDistinctValues = true;
            _queryt.execute(_qparams).then(function(response){
                let nreg = response.features.length;
                let cmb = "<option selected value=''>-- Seleccione distrito --</option>";
                for (let i = 0; i < nreg ; i++){
                    let namedistrito = response.features[i].attributes['NOMDISTRITO'];
                    let coddistrito = response.features[i].attributes['UBIGEO'];
                    cmb = cmb + "<option value="+coddistrito+">"+namedistrito+"</option>";
                }
                $('#cmb_ubigeodistrito_pestaniaubigeo').html(cmb);
            }).catch(function (error) {
                console.log("query task error");
                console.log(error);
            });
        }else{
            __url_ubigeo = url_ubigeoregion;
            __sql_ubigeo = `CODDEPARTAMENTO = '${ $('#cmb_ubigeoregion').val() }'`;
        }
    });

    $('#cmb_ubigeodistrito').on('change',function(){
        let coddistrito = $(this).val();
        if(coddistrito!=''){
            __url_ubigeo=url_ubigeodistrito;
            __sql_ubigeo=`UBIGEO='${coddistrito}'`;
        }else{
            __url_ubigeo = url_ubigeoprovincia;
            __sql_ubigeo = `CODPROVINCIA='${ $('#cmb_ubigeoprovincia').val() }'`;
        }
    });

    $('#cmb_ubigeodistrito_pestaniaubigeo').on('change',function(){
        let coddistrito = $(this).val();
        if(coddistrito!=''){
            __url_ubigeo=url_ubigeodistrito;
            __sql_ubigeo=`UBIGEO='${coddistrito}'`;
        }else{
            __url_ubigeo = url_ubigeoprovincia;
            __sql_ubigeo = `CODPROVINCIA='${ $('#cmb_ubigeoprovincia_pestaniaubigeo').val() }'`;
        }
    });



    // Evento lanzado para limpiar toda la operaci??n
    $("#wg_search_advanced").on('click', '#btn_clearsearchadvanced', function (e) {    
        $('#cmb_sector').prop('selectedIndex',0);
        Helper.hideGrid();
        clearAll();
    })

    // Evento lanzado para limpiar toda la operaci??n
    $("#wg_search_advanced").on('click', '#btn_clearsearchadvanced_icon_close', function (e) {    
        $('#cmb_sector_pestania').prop('selectedIndex',0);
        $('#cmb_sector_pestaniaubigeo').prop('selectedIndex',0);
        Helper.hideGrid();
        clearAll();
        clearAll_PestaniaUbigeo();
    })

    // Evento lanzado para limpiar toda la operaci??n
    $("#wg_search_advanced").on('click', '#btn_clearsearchadvanced_pestaniaubigeo', function (e) {    
        $('#cmb_sector').prop('selectedIndex',0);
        $('#cmb_sector_pestaniaubigeo').prop('selectedIndex',0);
        Helper.hideGrid();
        clearAll();
        clearAll_PestaniaUbigeo();
    });

    //Evento lanzado para hacer zoom a cada registro de la tabla resultado
    $('#container_tblsearchadvanced').on('click', '.tdzoom', function(){
        $('.tbl-result tr.active').removeClass('active');
        $(this).parent().toggleClass('active ');

        let objectid=$(this).attr('id');
        let namefield = $(this).attr('data-namefield');
        let sql = `${ namefield } = ${ objectid }`;
        Helper.paintToZoom(sql, __url_query, __globspace._gly_searchadvanced);
    })

    // Evento lanzado para mostrar/ocultar div ubigeo
    $("#wg_search_advanced").on('click', '#btn_toggleubigeo', function (e) {        
        $('#btn_toggleubigeo').toggleClass('icon-chevron-down icon-chevron-up');
        $('#container_ubigeo').toggle(100);
    })
    
    $("#btnswitch_2d3d").on('change',function(){
        __globspace.currentview.map.add(__globspace._gly_searchadvanced);
    })


    // contrar registro de busqueda y pasar a busqueda
    function search() {
        __globspace._gly_searchadvanced.removeAll();
        _gly_ubigeo.removeAll();
        let sql = '1=1', 
            idtable='#tbl_searchadvanced', 
            isexportable=true, 
            nquery=__query.length;

        // formaci??n del sql 
        for (let i = 0; i < nquery; i++){
            let item = __query[i],
                filter = item.filter.toUpperCase(),
                typedata=item.typedata,
                auxsql='';

            switch (typedata) {
                case 'double': case 'small-integer': case 'integer': case 'single':
                    auxsql = ` ${item.fieldname} ${item.condition} "${filter}"`;
                    break;
                case 'date':
                    let fi = moment(filter).add(5, 'hours').format('YYYY-MM-DD HH:mm:ss'); //consulta al servicio en hora utc (+5);
                    let ff = moment(filter).add(29, 'hours').subtract(1, 'seconds').format('YYYY-MM-DD HH:mm:ss');
                    
                    if(item.condition == '=' || item.condition == 'contiene'){
                        auxsql = `(${ item.fieldname } BETWEEN timestamp '${ fi }' AND timestamp '${ ff }')`;
                    }else{
                        if(item.condition == '<='){
                            auxsql = ` ${item.fieldname} ${item.condition} timestamp '${ff}'`;    
                        }else if(item.condition == '>='){
                            fi = moment(filter).add(5, 'hours').subtract(1, 'seconds').format('YYYY-MM-DD HH:mm:ss');
                            auxsql = ` ${item.fieldname} ${item.condition} timestamp '${fi}'`;
                        }else if(item.condition == '>'){
                            auxsql = ` ${item.fieldname} ${item.condition} timestamp '${ff}'`;
                        }else if(item.condition == '<'){
                            auxsql = ` ${item.fieldname} ${item.condition} timestamp '${fi}'`;
                        }
                    }
                    break;
                default:
                    auxsql = `Upper(${item.fieldname}) ${item.condition} '${filter}'`;
                    break;
            }

            if (item.option == '--') {
                if(typedata == 'date'){
                    sql = auxsql;
                }else{
                    item.condition == 'contiene' ? sql += ` and Upper(${item.fieldname}) like '%${filter}%'` : sql = auxsql;
                }
            } else {
                if(typedata == 'date'){
                    sql += ` ${item.option} ${auxsql}`;
                }else{
                    item .condition == 'contiene' ? sql += ` ${item.option} Upper(${item.fieldname}) like '%${filter}%'` : sql += ` ${item.option} ${auxsql}`;
                }
            }
        }
        
        __globspace.currentview.graphics.remove(_gra_ubigeo);

        // si se a selecionado un item de ubigeo primero obtengo la geometria del ubigeo y luego la consulta propia
        if(__url_ubigeo!=''){
            let _queryt = new QueryTask({url:__url_ubigeo}),
                _qparams  = new Query(); 
            _qparams.returnGeometry = true;
            _qparams.where = __sql_ubigeo;
            _queryt.execute(_qparams).then(function(response){
                __ubigeogeometry=response.features[0].geometry;
                let _queryt2 = new QueryTask({url:__url_query}),
                    _qparams2  = new Query();
                _qparams2.where = sql;
                _qparams2.outFields = ["*"];
                _qparams2.geometry = __ubigeogeometry;
                _qparams2.spatialRelationship = "intersects";
                _qparams2.returnGeometry = true;
                
                _queryt2.execute(_qparams2).then(function(response){
                    let nreg = response.features.length;
                    let fields = response.fields;
                    if(nreg==0){
                        alertMessage("La consulta no tiene registros a mostrar", "warning",'', true)
                        Helper.hidePreloader();
                    }else{
                        if(nreg>=1000){
                            alertMessage('El resultado supera el l??mite, por ello solo se muestra los primeros 1000 registros. \n Para mejorar su consulta, ingrese m??s filtros.','warning', 'bottom-right');
                        }
                        if(busquedaCampoEmpresa)
                            Helper.loadTableByFindSensitivityCompany(response, fields, __titlelayer, idtable, isexportable);
                        else 
                            Helper.loadTable(response, fields, __titlelayer, idtable, isexportable);
                        // Helper.renderToZoom(response, __globspace._gly_searchadvanced);
                        Helper.renderGraphic(response, __globspace._gly_searchadvanced);

                        if(Object.keys(_gra_ubigeo).length ==0){
                            _gra_ubigeo = new Graphic({
                                geometry: __ubigeogeometry, 
                                symbol:_symbol,
                            });
                        }
                        _gra_ubigeo.geometry=__ubigeogeometry;
                        __globspace.currentview.graphics.add(_gra_ubigeo);
                        __globspace.currentview.when(function () {
                            __globspace.currentview.goTo({
                                target: __ubigeogeometry
                            });
                        });
                    }
                }).catch(function (error) {
                    Helper.hidePreloader();
                    console.log("query task error", error);
                })          
            }).catch(function (error) {
                Helper.hidePreloader();
                console.log("query task error", error);
            })
        }else{
            
            let _queryt = new QueryTask({url:__url_query}),
                _qparams  = new Query();
            _qparams.where = sql;
            _qparams.outFields = ["*"];
            _qparams.returnGeometry = true;

            _queryt.execute(_qparams).then(function(response){
                let nreg = response.features.length;
                let fields = response.fields;
                if(nreg==0){
                    alertMessage("La consulta no tiene registros a mostrar", "warning", '', true);
                    Helper.hidePreloader();
                }else{
                    if(nreg>=1000){
                        alertMessage('El resultado supera el l??mite, por ello solo se muestra los primeros 1000 registros. \n Para mejorar su consulta, ingrese m??s filtros.','warning', 'bottom-right');
                    }
                    if(busquedaCampoEmpresa)
                        Helper.loadTableByFindSensitivityCompany(response, fields, __titlelayer, idtable, isexportable);
                    else 
                        Helper.loadTable(response, fields, __titlelayer, idtable, isexportable);
                    Helper.renderToZoom(response, __globspace._gly_searchadvanced);
                }
            }).catch(function (error) {
                Helper.hidePreloader();
                console.log("query task error");
                console.log(error);
            })
        }
    }



    function searchPestaniaUbigeo() {
        __globspace._gly_searchadvanced.removeAll();
        _gly_ubigeo.removeAll();
        let sql = '1=1', 
            idtable='#tbl_searchadvanced', 
            isexportable=true, 
            nquery=__query.length;

        // formaci??n del sql 
        for (let i = 0; i < nquery; i++){
            let item = __query[i],
                filter = item.filter.toUpperCase(),
                typedata=item.typedata,
                auxsql='';

            switch (typedata) {
                case 'double': case 'small-integer': case 'integer': case 'single':
                    auxsql = ` ${item.fieldname} ${item.condition} "${filter}"`;
                    break;
                case 'date':
                    let fi = moment(filter).add(5, 'hours').format('YYYY-MM-DD HH:mm:ss'); //consulta al servicio en hora utc (+5);
                    let ff = moment(filter).add(29, 'hours').subtract(1, 'seconds').format('YYYY-MM-DD HH:mm:ss');
                    
                    if(item.condition == '=' || item.condition == 'contiene'){
                        auxsql = `(${ item.fieldname } BETWEEN timestamp '${ fi }' AND timestamp '${ ff }')`;
                    }else{
                        if(item.condition == '<='){
                            auxsql = ` ${item.fieldname} ${item.condition} timestamp '${ff}'`;    
                        }else if(item.condition == '>='){
                            fi = moment(filter).add(5, 'hours').subtract(1, 'seconds').format('YYYY-MM-DD HH:mm:ss');
                            auxsql = ` ${item.fieldname} ${item.condition} timestamp '${fi}'`;
                        }else if(item.condition == '>'){
                            auxsql = ` ${item.fieldname} ${item.condition} timestamp '${ff}'`;
                        }else if(item.condition == '<'){
                            auxsql = ` ${item.fieldname} ${item.condition} timestamp '${fi}'`;
                        }
                    }
                    break;
                default:
                    auxsql = `Upper(${item.fieldname}) ${item.condition} '${filter}'`;
                    break;
            }

            if (item.option == '--') {
                if(typedata == 'date'){
                    sql = auxsql;
                }else{
                    item.condition == 'contiene' ? sql += ` and Upper(${item.fieldname}) like '%${filter}%'` : sql = auxsql;
                }
            } else {
                if(typedata == 'date'){
                    sql += ` ${item.option} ${auxsql}`;
                }else{
                    item .condition == 'contiene' ? sql += ` ${item.option} Upper(${item.fieldname}) like '%${filter}%'` : sql += ` ${item.option} ${auxsql}`;
                }
            }
        }
        
        __globspace.currentview.graphics.remove(_gra_ubigeo);

        // si se a selecionado un item de ubigeo primero obtengo la geometria del ubigeo y luego la consulta propia
        if(__url_ubigeo!=''){
            let _queryt = new QueryTask({url:__url_ubigeo}),
                _qparams  = new Query(); 
            _qparams.returnGeometry = true;
            _qparams.where = __sql_ubigeo;
            _queryt.execute(_qparams).then(function(response){
                if(
                    $("#cmb_ubigeoregion_pestaniaubigeo").val().length!=0
                    && $("#cmb_sector_pestaniaubigeo").val().length==0
                    && $("#cmb_grupo_pestaniaubigeo").val().length==0
                    && $("#cmb_layer_pestaniaubigeo").val().length==0
                    && $("#cmb_fields_pestaniaubigeo").val().length==0
                ){
                    
                    Helper.renderGraphic(response, __globspace._gly_searchadvanced);
                    __ubigeogeometry=response.features[0].geometry;
                    _gra_ubigeo.geometry=__ubigeogeometry;
                    //__globspace.currentview.graphics.add(_gra_ubigeo);
                    __globspace.currentview.when(function () {
                        __globspace.currentview.goTo({
                            target: __ubigeogeometry
                        });
                    });
                    Helper.hidePreloader();
                    
                } else if(
                    $("#cmb_sector_pestaniaubigeo").val().length==0
                    || $("#cmb_grupo_pestaniaubigeo").val().length==0
                    || $("#cmb_layer_pestaniaubigeo").val().length==0
                ){
                    alertMessage('Debe seleccionar Sector o Grupo o Capa','warning', 'top-center');
                    Helper.hidePreloader();

                } else {
                    __ubigeogeometry=response.features[0].geometry;
                    let _queryt2 = new QueryTask({url:__url_query}),
                        _qparams2  = new Query(); 
                    
                    _qparams2.where = sql;
                    _qparams2.outFields = ["*"];
                    _qparams2.geometry = __ubigeogeometry;
                    _qparams2.spatialRelationship = "intersects";
                    _qparams2.returnGeometry = true;
                    
                    _queryt2.execute(_qparams2).then(function(response){
                        let nreg = response.features.length;
                        let fields = response.fields;
                        if(nreg==0){
                            alertMessage("La consulta no tiene registros a mostrar", "warning",'', true)
                            Helper.hidePreloader();
                        }else{
                            if(nreg>=1000){
                                alertMessage('El resultado supera el l??mite, por ello solo se muestra los primeros 1000 registros. \n Para mejorar su consulta, ingrese m??s filtros.','warning', 'bottom-right');
                            }
                            if(busquedaCampoEmpresa)
                                Helper.loadTableByFindSensitivityCompany(response, fields, __titlelayer, idtable, isexportable);
                            else 
                                Helper.loadTable(response, fields, __titlelayer, idtable, isexportable);
                            //Helper.loadTable(response, fields, __titlelayer, idtable, isexportable);
                            // Helper.renderToZoom(response, __globspace._gly_searchadvanced);
                            Helper.renderGraphic(response, __globspace._gly_searchadvanced);

                            if(Object.keys(_gra_ubigeo).length ==0){
                                _gra_ubigeo = new Graphic({
                                    geometry: __ubigeogeometry, 
                                    symbol:_symbol,
                                });
                            }
                            _gra_ubigeo.geometry=__ubigeogeometry;
                            //__globspace.currentview.graphics.add(_gra_ubigeo);
                            __globspace.currentview.when(function () {
                                __globspace.currentview.goTo({
                                    target: __ubigeogeometry
                                });
                            });
                        }
                    }).catch(function (error) {
                        Helper.hidePreloader();
                        console.log("query task error", error);
                    })
                }                
            }).catch(function (error) {
                Helper.hidePreloader();
                console.log("query task error", error);
            })
        }else{
            let _queryt = new QueryTask({url:__url_query}),
                _qparams  = new Query();

            _qparams.where = sql;
            _qparams.outFields = ["*"];
            _qparams.returnGeometry = true;

            _queryt.execute(_qparams).then(function(response){
                let nreg = response.features.length;
                let fields = response.fields;
                if(nreg==0){
                    alertMessage("La consulta no tiene registros a mostrar", "warning", '', true);
                    Helper.hidePreloader();
                }else{
                    if(nreg>=1000){
                        alertMessage('El resultado supera el l??mite, por ello solo se muestra los primeros 1000 registros. \n Para mejorar su consulta, ingrese m??s filtros.','warning', 'bottom-right');
                    }
                    if(busquedaCampoEmpresa)
                        Helper.loadTableByFindSensitivityCompany(response, fields, __titlelayer, idtable, isexportable);
                    else 
                        Helper.loadTable(response, fields, __titlelayer, idtable, isexportable);
                    //Helper.loadTable(response, fields, __titlelayer, idtable, isexportable);
                    Helper.renderToZoom(response, __globspace._gly_searchadvanced);
                }
            }).catch(function (error) {
                Helper.hidePreloader();
                console.log("query task error");
                console.log(error);
            })
        }
    }





    // extraer los features layer desde el objeto Visor
    function extraerlayer(layers, padres, hassublayers, nivelcero, resultado) {
        if(!hassublayers){
            resultado.push({
                'titlelayers': padres + '?' + layers.title,
                'service': layers.url,
                'sublayer': layers
            });
            return;

        }else{
            for (let i = 0; i < layers.length; i++) {
                let layer = layers[i];
                
                let aux_padres=padres;
                layer.sublayers!=null ? hassublayers=true : hassublayers=false;
                hassublayers ? padres += `?${layer.title}` : '';
                
                if(!hassublayers){
                    let aux_layer=padres.split("?");
                    // feature que pertenescan a un grupo (features hermanos)
                    if(aux_layer[aux_layer.length - 1]!=layer.parent.title){
                        let aux='?';
                        for (let i = 0; i < aux_layer.length-1; i++) {
                            aux += aux_layer[i];
                        }
                        padres=aux;
                    }
                    extraerlayer(layer, padres, hassublayers, nivelcero, resultado);        
                }else{
                    // para reiniciar varibles padres cuando llega a nivel cero
                    if(layer.parent.title==nivelcero){
                        padres='?'+layer.title;
                    }

                    let aux_layer=aux_padres.split("?");
                    // grupo que pertenescan a un grupo superior (grupos hermanos)
                    if((aux_layer[aux_layer.length - 2]==layer.parent.title) && (layer.parent.title!=nivelcero)){
                        let aux='';
                        for (let i = 0; i < aux_layer.length-1; i++) {
                            aux +=aux_layer[i]+'?';
                        }
                        padres=aux+layer.title;
                    }
                    extraerlayer(layer.sublayers.items, padres, hassublayers, nivelcero,resultado);
                }
            }
        }
        return resultado;
    }


    // extraer los sectores y capas del resultado de la funcion extraerlayer
    function getGroupLayer(layers) {
            grouplayers=[],
            grouplayers.push({'group': '', 'children':['']}),
            indexgrouplayer=0,
            nlayers=layers.length-1;
            
        for (let i = nlayers; i>=0 ; i--) {
            let data=(layers[i].titlelayers).substring(1).replace('?','$'),
                aux_data= data.split('$'),
                group=aux_data[0],
                titlelayer=aux_data[1];

            if(group!=grouplayers[indexgrouplayer].group){
                let layer=[{'layers': titlelayer.replace(/\?/g,' / '), 'service':layers[i].service, 'fields': layers[i].fields}];
                if(i==nlayers){
                    grouplayers[0].group=group;
                    grouplayers[0].children=layer;
                }else{
                    grouplayers.push({'group': group,'children':layer});
                    indexgrouplayer++
                }
            }else{
                let layer={'layers': titlelayer.replace(/\?/g,' / '), 'service':layers[i].service, 'fields': layers[i].fields};
                grouplayers[indexgrouplayer].children.push(layer);
            }
        }
        return grouplayers;
    }

    // obtener los campos del layer con sus tipos de datos
    function getTypeFields(){
        let $selectfields = $('#cmb_fields');
        $selectfields.prop("disabled", true);
        
        let _queryt = new QueryTask({
            url: __url_query
        }),
        _qparams = new Query();

        _qparams.where = '1<>1';
        _qparams.outFields = ['*'];
        _qparams.returnGeometry = false;
        _queryt.execute(_qparams).then(function (response) {
            __fields=response.fields;
            let nfields = response.fields.length,
                fields = response.fields,
                cmb = '<option value="">--Elija un campo--</option>';
            for (let i = 0; i < nfields; i++) {
                let field = fields[i],
                    fieldlabel = (field.alias).toUpperCase();

                if ($.inArray(field.name, Helper.getFieldsHide()) == -1) { // no poder los fields reservados
                    if (field.type != 'oid'){
                        cmb += `<option value="${field.name}" data-typedata=${field.type}> ${fieldlabel}</option>`;
                    }
                }

            }
            $('#cmb_fields').html(cmb);
            $('#btn_searchadvanced').addClass('visible').removeClass('notvisible');
            $selectfields.prop("disabled", false);

        }).catch(function (error) {
            Helper.hidePreloader();
            console.log("query task error: "+ error);
        });
    }


    function getTypeFieldsPestaniaUbigeo(){
        let $selectfields = $('#cmb_fields_pestaniaubigeo');
        $selectfields.prop("disabled", true);
        
        let _queryt = new QueryTask({
            url: __url_query
        }),
        _qparams = new Query();

        _qparams.where = '1<>1';
        _qparams.outFields = ['*'];
        _qparams.returnGeometry = false;
        _queryt.execute(_qparams).then(function (response) {
            __fields=response.fields;
            let nfields = response.fields.length,
                fields = response.fields,
                cmb = '<option value="">--Elija un campo--</option>';
            for (let i = 0; i < nfields; i++) {
                let field = fields[i],
                    fieldlabel = (field.alias).toUpperCase();

                if ($.inArray(field.name, Helper.getFieldsHide()) == -1) { // no poder los fields reservados
                    if (field.type != 'oid'){
                        cmb += `<option value="${field.name}" data-typedata=${field.type}> ${fieldlabel}</option>`;
                    }
                }

            }
            $('#cmb_fields_pestaniaubigeo').html(cmb);
            //$('#btn_searchadvanced_pestaniaubigeo').addClass('visible').removeClass('notvisible');
            $selectfields.prop("disabled", false);

        }).catch(function (error) {
            Helper.hidePreloader();
            console.log("query task error: "+ error);
        });
    }

    //carga region
    function loadRegion() {
        let _queryt = new QueryTask({url:url_ubigeoregion}); 
        let _qparams  = new Query(); 
        _qparams.where = `1=1`;
        _qparams.outFields = ["CODDEPARTAMENTO", "NOMDEPARTAMENTO"];
        _qparams.orderByFields= ["NOMDEPARTAMENTO"];
        _qparams.returnGeometry = false;
        _queryt.execute(_qparams).then(function(response){
            let nreg = response.features.length;
            let cmb = "<option selected value=''>-- Seleccione Regi??n --</option>";
            for (let i = 0; i < nreg ; i++){
                let nom_region = response.features[i].attributes['NOMDEPARTAMENTO'];
                let cod_region = response.features[i].attributes['CODDEPARTAMENTO'];
                cmb = cmb + "<option value="+cod_region+">"+nom_region+"</option>";
            }
            $('#cmb_ubigeoregion').html(cmb);

        }).catch(function (error) {
            console.log("query task error");
            console.log(error);
        })
    }

    function loadRegionPestaniaUbigeo(){
        let _queryt = new QueryTask({url:url_ubigeoregion}); 
        let _qparams  = new Query(); 
        _qparams.where = `1=1`;
        _qparams.outFields = ["CODDEPARTAMENTO", "NOMDEPARTAMENTO"];
        _qparams.orderByFields= ["NOMDEPARTAMENTO"];
        _qparams.returnGeometry = false;
        _queryt.execute(_qparams).then(function(response){
            let nreg = response.features.length;
            let cmb = "<option selected value=''>-- Seleccione Regi??n --</option>";
            for (let i = 0; i < nreg ; i++){
                let nom_region = response.features[i].attributes['NOMDEPARTAMENTO'];
                let cod_region = response.features[i].attributes['CODDEPARTAMENTO'];
                cmb = cmb + "<option value="+cod_region+">"+nom_region+"</option>";
            }
            $('#cmb_ubigeoregion_pestaniaubigeo').html(cmb);

        }).catch(function (error) {
            console.log("query task error");
            console.log(error);
        })
    }

    // funcion limpiar
    function clearFields() {
        __query=[];
        __queryindex=0;
        $('#txt_filter').val('');
        $('#cmb_fields').prop('selectedIndex',0);
        $('#cmb_condition').prop('selectedIndex',0);
        $('#tbody_filter').html('');
    }

    
    function clearFields_PestaniaUbigeo() {
        __query=[];
        __queryindex=0;
        $('#txt_filter_pestaniaubigeo').val('');
        $('#cmb_fields_pestaniaubigeo').prop('selectedIndex',0);
        $('#cmb_condition_pestaniaubigeo').prop('selectedIndex',0);
        $('#tbody_filter').html('');
    }


    function clearLayer() {
        __layers=[];
        __sql_ubigeo='';
        __url_ubigeo='';

        $('#cmb_fields').html('<option value="">--Elija un campo--</option>');
        $('#cmb_layer').html('<option value="">--Elija un capa--</option>');
        clearFields();
        Helper.hideGrid();
    }

    function clearLayer_PestaniaUbigeo() {
        __layers=[];
        __sql_ubigeo='';
        __url_ubigeo='';

        $('#cmb_fields_pestaniaubigeo').html('<option value="">--Elija un campo--</option>');
        $('#cmb_layer_pestaniaubigeo').html('<option value="">--Elija un capa--</option>');
        clearFields_PestaniaUbigeo();
        Helper.hideGrid();
    }
    
    function clearAll() {
        __grouplayer=[];
        __layers=[];
        __url_query='';
        __titlelayer='';
        __fields=[];
        __query=[]; 
        __queryindex=0;
        __url_ubigeo='';
        __sql_ubigeo='';
        __ubigeogeometry = {};
        __sublayer = {};

        $('#cmb_grupo').html('<option value="">--Elija un grupo--</option>');
        $('#cmb_layer').html('<option value="">--Primero elija un grupo--</option>');
        $('#cmb_fields').html('<option value="">--Primero elija una capa--</option>');
        $('#txt_filter').val('');
        $('#cmb_condition').prop('selectedIndex',0);
        $('#tbody_filter').html('');

        $('#cmb_ubigeoregion').prop('selectedIndex', 0);
        $('#cmb_ubigeoprovincia').html('<option value="">--Primero elija una regi??n--</option>');
        $('#cmb_ubigeodistrito').html('<option value="">--Primero elija una provincia--</option>');
        Helper.hideGrid();
        __globspace.currentview.graphics.remove(_gra_ubigeo);
        __globspace._gly_searchadvanced.removeAll();
    }

    function clearAll_PestaniaUbigeo() {
        __grouplayer=[];
        __layers=[];
        __url_query='';
        __titlelayer='';
        __fields=[];
        __query=[]; 
        __queryindex=0;
        __url_ubigeo='';
        __sql_ubigeo='';
        __ubigeogeometry = {};
        __sublayer = {};

        $('#cmb_grupo_pestaniaubigeo').html('<option value="">--Elija un grupo--</option>');
        $('#cmb_layer_pestaniaubigeo').html('<option value="">--Primero elija un grupo--</option>');
        $('#cmb_fields_pestaniaubigeo').html('<option value="">--Primero elija una capa--</option>');
        $('#txt_filter_pestaniaubigeo').val('');
        $('#cmb_condition_pestaniaubigeo').prop('selectedIndex',0);
        $('#tbody_filter').html('');

        $('#cmb_ubigeoregion_pestaniaubigeo').prop('selectedIndex', 0);
        $('#cmb_ubigeoprovincia_pestaniaubigeo').html('<option value="">--Primero elija una regi??n--</option>');
        $('#cmb_ubigeodistrito_pestaniaubigeo').html('<option value="">--Primero elija una provincia--</option>');
        Helper.hideGrid();
        __globspace.currentview.graphics.remove(_gra_ubigeo);
        __globspace._gly_searchadvanced.removeAll();
    }

    function loadDropDown(valor){

        let sectorSelected = $("#cmb_sector").val();
        let groupSelected = $("#cmb_grupo").val();
        let layerSelected = $("#cmb_layer").val();
        let fieldSelected =  $("#cmb_fields").val();
        
        if(valor.trim() == ""){
            $("#listValor").css("visibility","hidden");
            return false;
        }

        if(
            sectorSelected === "sectorelectricidad" &&
            groupSelected === "3" &&
            layerSelected === "8" &&
            fieldSelected === "CODEMP"
        ){
            $("#listValor").css("visibility","visible");
            let url_empresa = "https://services5.arcgis.com/oAvs2fapEemUpOTy/ArcGIS/rest/services/BD_SupervUAP_agol_2_gdb/FeatureServer/7/query";
            let _queryE = new QueryTask({ url: url_empresa }),
            _qparams = new Query();

            _qparams.where = `NOMBRE like '%${valor}%'`;
            _qparams.outFields = ['*'];
            _qparams.returnGeometry = false;
            _queryE.execute(_qparams).then(function (response) {
                $("#listValor").html(`<button class='list-group-item list-group-item-action'>Buscando...</button>`);
                html = "";
                let nroItem = response.features.length;
                if(nroItem!=0){
                    response.features.forEach(data=>{
                        let item = data.attributes;
                        html += `<button class='list-group-item list-group-item-action' onclick="selectedEmpresa('${item.ETIQUETA}')">${item.NOMBRE}</button>`;
                    });
                    $("#listValor").html(html);
                } else {
                    $("#listValor").html(`<button class='list-group-item list-group-item-action'>No existen datos</button>`);
                }
            });
        } else{
            $("#listValor").css("visibility","hidden");
        }

    }

    function loadDropDownUbigeo(valor){

        let sectorSelected = $("#cmb_sector_pestaniaubigeo").val();
        let groupSelected = $("#cmb_grupo_pestaniaubigeo").val();
        let layerSelected = $("#cmb_layer_pestaniaubigeo").val();
        let fieldSelected =  $("#cmb_fields_pestaniaubigeo").val();
        
        if(valor.trim() == ""){
            $("#listValorUbigeo").css("visibility","hidden");
            return false;
        }

        if(
            sectorSelected === "sectorelectricidad" &&
            groupSelected === "3" &&
            layerSelected === "8" &&
            fieldSelected === "CODEMP"
        ){
            $("#listValorUbigeo").css("visibility","visible");
            let url_empresa = "https://services5.arcgis.com/oAvs2fapEemUpOTy/ArcGIS/rest/services/BD_SupervUAP_agol_2_gdb/FeatureServer/7/query";
            let _queryE = new QueryTask({ url: url_empresa }),
            _qparams = new Query();

            _qparams.where = `NOMBRE like '%${valor}%'`;
            _qparams.outFields = ['*'];
            _qparams.returnGeometry = false;
            _queryE.execute(_qparams).then(function (response) {
                $("#listValorUbigeo").html(`<button class='list-group-item list-group-item-action'>Buscando...</button>`);
                html = "";
                let nroItem = response.features.length;
                if(nroItem!=0){
                    response.features.forEach(data=>{
                        let item = data.attributes;
                        html += `<button class='list-group-item list-group-item-action' onclick="selectedEmpresaUbigeo('${item.ETIQUETA}')">${item.NOMBRE}</button>`;
                    });
                    $("#listValorUbigeo").html(html);
                } else {
                    $("#listValorUbigeo").html(`<button class='list-group-item list-group-item-action'>No existen datos</button>`);
                }
            });

        } else{
            $("#listValorUbigeo").css("visibility","hidden");
        }

    }
    
})

function selectedEmpresa(etiqueta){
    $("#txt_filter").val(etiqueta);
    $("#listValor").css("visibility","hidden");
    $("#txt_filter").prop("disabled",true);
    busquedaCampoEmpresa = true;
}

function selectedEmpresaUbigeo(etiqueta){
    $("#txt_filter_pestaniaUbigeo").val(etiqueta);
    $("#listValorUbigeo").css("visibility","hidden");
    $("#txt_filter_pestaniaUbigeo").prop("disabled",true);
    busquedaCampoEmpresa = true;
}