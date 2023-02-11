define([
  "js/helper",
  "js/core/permission",  

  "esri/tasks/QueryTask",
  "esri/tasks/support/Query",
  "esri/layers/GraphicsLayer"
], function (
  Helper,
  Permission,

  QueryTask,
  Query,
  GraphicsLayer
) {

  var $containertbl = $('#container_tblsearchingroup');

  var __cacheresults = [],
    __url_layerselected = '',
    __filter = '';

  var _gly_searchingroup = new GraphicsLayer({
      listMode: "hide",
      title: "Búsqueda en el grupo"
    });


  // Variables de Permisos
  var __permisos_actionsgroup = Permission.getPermisosActionsgroup();

  $(function(){
    if(__permisos_actionsgroup.indexOf('BuscarGrupo') != -1){ 
      __globspace.map.add(_gly_searchingroup);
      $.get("./view/widgets-group.html", function(data) { 
        $('#wg_searchingroup').append($(data).find("#wg_searchingroup_content"));
      });        
    }
  });  

  $('#wg_searchingroup').on('submit', '#form_searchingroup', function (evt) {
    evt.preventDefault();
    Helper.showPreloader();

    let requiere = [{
      idfiel: 'txt_searchingroup',
      label: 'Campo'
    }];

    if (Helper.getValidationForm('form_searchingroup', requiere)) {
      Helper.hideGrid();
      
      removeTabsContents();
  
      let auxsublayers = __globspace.grouplayersearch,
        hassublayers = true,
        result = [],
        sublayers = {};
  
      sublayers = getSublayers(auxsublayers.sublayers.items, hassublayers, result);
  
      doFirstMatch(sublayers);
    }
  });

  //Evento lanzado para hacer zoom a cada registro de la tabla resultado
  $containertbl.on('click', '.tdzoom', function () {
    $('.tbl-result tr.active').removeClass('active');
    $(this).parent().toggleClass('active ');

    let objectid = $(this).attr('id');
    let namefield = $(this).attr('data-namefield');
    let sql = `${ namefield } = ${ objectid }`;
    Helper.paintToZoom(sql, __url_layerselected, _gly_searchingroup);
  });

  //Evento lanzado para limpiar toda la operación
  $('#wg_searchingroup').on('click', '.btn-limpiar', function () {
    Helper.hideGrid();
    $('#txt_searchingroup').val('');
    removeTabsContents();
  });


 /*********************** FUNCIONES DE APOYO ****************************/

  // obtener las sublayers que tiene el grupo selecionado
  function getSublayers(layers, hassublayers, result) {
    if (hassublayers) {
      for (let i = 0; i < layers.length; i++) {
        let layer = layers[i];
        let titlelayer = layer.parent.title + ' / ' + layer.title;
        layer.sublayers != null ? hassublayers = true : hassublayers = false;
        if (hassublayers) {
          getSublayers(layer.sublayers.items, hassublayers, result);
        } else {
          result.push({
            'titlelayers': titlelayer,
            'idlayer': layer.id,
            'aliasmil': layer.alias_sector,
            'sublayer': layer
          });

          hassublayers = false;
          getSublayers(layer, hassublayers, result);
        }
      }
    } else {
      return
    }
    return result;
  }

  // hacer la primera interseccion( resultado por defecto) 
  function doFirstMatch(layers) {
    $('#div_results .grilla').addClass('notvisible').removeClass('visible');
    __filter = $('#txt_searchingroup').val().trim().toUpperCase();

    let isfirstintersect = true,
      auxlength = layers.length,
      count = layers.length,

      tabsearchgroup = '',
      tabsearchgroupcontent = '',
      firstlayer = {},
      firstidtable = '',
      firstidcache = '',
      iserror = false,
      mensaje='¡Se detectaron algunos inconvenientes de conexión! <br> No se pudo cargar lo correspondiente a: <br>';
      
    for (let j = auxlength - 1; j >= 0; j--) {
      let item = layers[j],
        sublayer = item.sublayer,
        url_servicio = sublayer.url,
        titletab = item.titlelayers,
        iddom = `${item.aliasmil}¿${item.idlayer}¿searchingroup`,

        _queryt = new QueryTask({ url: url_servicio }),
        _qparams = new Query();

      _qparams.where = '1<>1';
      _qparams.outFields = ['*'];
      _qparams.returnGeometry = false;
      _queryt.execute(_qparams).then(function (response) {
          let auxlength = response.fields.length,
            fields = response.fields,
            sql = '';

          for (let i = 0; i < auxlength; i++) {
            let field = fields[i],
              typedata = field.type;

            switch (typedata) {
              case 'double': case 'small-integer': case 'integer': case 'oid': case 'single':
                if (!isNaN(parseFloat(__filter))) {
                  sql += `${field.name} = "${__filter}" or `;
                }
                break;
              case 'date':
                let isformatdate = moment(__filter, 'YYYY-MM-DD', true).isValid();
                if (isformatdate) {
                  let fi = moment(__filter).add(5, 'hours').format('YYYY-MM-DD HH:mm:ss'); //consulta al servicio en hora utc (+5); // moment(__filter).format('M/D/YYYY HH:mm:ss');
                  let ff = moment(__filter).add(29, 'hours').subtract(1, 'seconds').format('YYYY-MM-DD HH:mm:ss'); //moment(__filter).add(24, 'hours').format('M/D/YYYY HH:mm:ss')
                  auxsql = `(${ field.name } BETWEEN timestamp '${ fi }' AND timestamp '${ ff }')`;
                }
                break;
              default:
                sql += `Upper(${field.name}) like '%${__filter}%' or `;
                break;
            }
          }

          sql = sql.trim();
          let lengthsql = sql.lastIndexOf(' ');
          sql = sql.substring(lengthsql, -1);

          // obtener la data de la consulta
          let _queryt2 = new QueryTask({ url: url_servicio });
          let _qparams2 = new Query();
          _qparams2.where = sql;
          _qparams2.outFields = ['*'];
          _qparams2.returnGeometry = false;
          _queryt2.executeForCount(_qparams2).then(function (response) {
            let nreg = response;
            // crear tabs y contenido
            if (nreg > 0) {
              tabsearchgroup += `
                          <li class="nav-item">
                            <a class="nav-link " data-toggle="tab" href="#${iddom}" id="tab${iddom}" role="tab" >${titletab} (<span>${nreg}</span>)</a>
                          </li>`;
              tabsearchgroupcontent += `
                          <div class="tab-pane fade " id="${iddom}" role="tabpanel" >
                            <table id="tbl_${iddom}" class="tbl-result table table-striped table-bordered nowrap" style="width:100%">
                              <thead></thead>
                              <tbody></tbody>
                            </table>
                          </div>`;
            }

            // cargar una tabla resultado por defecto (primer layer con entidades intersectados en el buffer )
            if (nreg > 0 && isfirstintersect) {
              isfirstintersect = false;
              firstlayer = item.sublayer;
              firstidtable = `${iddom}`;
              firstidcache = `#${iddom}`;
              __url_layerselected = url_servicio;
            }

            // activar eventos en tabs -- renderizar los tab y contenido 
            if (count == 1) {
              if (isfirstintersect) {
                Helper.hidePreloader();
                alertMessage('La consulta no tiene registros a mostrar.', 'warning', 'top-center', true);
              } else {
                $('#tab_searchgroup').html(tabsearchgroup);
                $('#tab_content_searchgroup').html(tabsearchgroupcontent);

                getDataQuery(firstlayer, firstidtable, firstidcache);
                $(`#tab${firstidtable}`).addClass('active');
                $(`#${firstidtable}`).addClass('active show');

                activeEventsTabs();
              }
            }
            
            if(iserror){
              alertMessage(mensaje, 'warning');
            }

            count--;
          });
        })
        .catch(function (error) {
          iserror = true;
          mensaje += ` - ${ titletab } <br>`;
          // activar eventos en tabs -- renderizar los tab y contenido 
          if (count == 1) {
            if (isfirstintersect) {
              Helper.hidePreloader();
              alertMessage('La consulta no tiene registros a mostrar.', 'warning', 'top-center', true);
            } else {
              $('#tab_searchgroup').html(tabsearchgroup);
              $('#tab_content_searchgroup').html(tabsearchgroupcontent);

              getDataQuery(firstlayer, firstidtable, firstidcache);
              $(`#tab${firstidtable}`).addClass('active');
              $(`#${firstidtable}`).addClass('active show');

              activeEventsTabs();

              alertMessage(mensaje, 'warning');
            }
          }

          count--;
          console.log("query task error \n", error);
        });
    }
  }

  // ejecutar consulta de interseccion de buffer con capa determinada
  function getDataQuery(layer, aux_idtable, idcache) {
    let url_servicio = layer.url,
      titlelayer = 'Consulta en Grupo: \n ' + layer.parent.title + '-' + layer.title,
      _queryt = new QueryTask({ url: url_servicio }),
      _qparams = new Query();
    
    _qparams.outFields = ['*'];
    _qparams.where = '1<>1';
    _qparams.returnGeometry = false;

    _queryt.execute(_qparams).then(function (response) {
      let fields = response.fields;
      let auxlength = fields.length;
      let sql = '';
      for (let i = 0; i < auxlength; i++) {
        let field = fields[i],
          typedata = field.type;

        switch (typedata) {
          case 'double': case 'small-integer': case 'integer': case 'oid': case 'single':
            if (!isNaN(parseFloat(__filter))) {
              sql += `${field.name} = "${__filter}" or `;
            }
            break;
          case 'date':
            let isformatdate = moment(__filter, 'YYYY-MM-DD', true).isValid();
            if (isformatdate) {
              let fi = moment(__filter).add(5, 'hours').format('YYYY-MM-DD HH:mm:ss'); //consulta al servicio en hora utc (+5);
              let ff = moment(__filter).add(29, 'hours').subtract(1, 'seconds').format('YYYY-MM-DD HH:mm:ss');
              auxsql = `(${ field.name } BETWEEN timestamp '${ fi }' AND timestamp '${ ff }')`;
            }
            break;
          default:
            sql += `Upper(${field.name}) like '%${__filter}%' or `;
            break;
        }
      }

      sql = sql.trim();
      let lengthsql = sql.lastIndexOf(' ');
      sql = sql.substring(lengthsql, -1);

      // obtener la data de la consulta
      let _queryt2 = new QueryTask({
        url: url_servicio
      });
      let _qparams2 = new Query();
      _qparams2.where = sql;
      _qparams2.outFields = ['*'];
      _qparams2.returnGeometry = true;
      _queryt2.execute(_qparams2).then(function (response) {
          let nreg = response.features.length,
            isexportable = false,
            idtable = `#tbl_${aux_idtable}`;
          Helper.loadTable(response, titlelayer, idtable, isexportable);
          Helper.renderToZoom(response, _gly_searchingroup);
          __cacheresults.push({
            'id': idcache,
            'response': response,
            'nreg': nreg
          }); // caché de resultados 
          if (nreg >= 1000) {
            alertMessage('El resultado supera el límite de registros a mostrar, por lo tanto solo se muestra los primeros 1000 registros.', 'warning', 'top-center', true);
          }
        })
        .catch(function (error) {
          let mensaje= `¡Se detectaron algunos inconvenientes de conexión!. Por favor vuelva a seleccionar la pestaña ${ layer.title }`;
          alertMessage(mensaje, 'warning');
          $('#container_tblsearchingroup').addClass('visible').removeClass('notvisible');
          Helper.hidePreloader();
          console.log("query task error \n", error);
        });
    })
    .catch(function (error) {
      let mensaje= `¡Se detectaron algunos inconvenientes de conexión!. Por favor vuelva a seleccionar la pestaña ${ layer.title }`;
      alertMessage(mensaje, 'warning');
      $('#container_tblsearchingroup').addClass('visible').removeClass('notvisible');
      Helper.hidePreloader();
      console.log("query task error \n", error);
    });
  }

  function activeEventsTabs() {
    // obtengo los parametros para la consulta de una capa en especifico
    $('#tab_searchgroup a').on('click', function (e) {
      e.preventDefault()
      Helper.showPreloader();

      $('.dt-buttons').css('display', 'none');
      $('.tab-content > div').removeClass('active show');
      let datalayer = $(this).attr('href');
      $(datalayer).addClass('active show');
      let idtable = datalayer.substring(1);
      let aux = idtable.split('¿');
      let aliasmil = aux[0];
      let idlayer = aux[1];
      let aux_sector = __globspace.infolayers.find(layer => layer.alias == aliasmil);
      let layer = aux_sector.layers.find(layer => layer.id == idlayer);

      __url_layerselected = layer.url;

      let rowcount = $(`#tbl_${idtable} > tbody tr`).length;

      let idcache = datalayer;
      if (rowcount == 0) {
        getDataQuery(layer, idtable, idcache); //consultar
      } else {
        $(`button[aria-controls='tbl_${idtable}']`).parents('.dt-buttons').css('display', 'contents');
        let layer = __cacheresults.find(response => response.id == idcache); // caché de resultados 
        let response = layer.response;
        Helper.renderToZoom(response, _gly_searchingroup);
        Helper.hidePreloader();
      }
    });

    // start control del carusel
    $('#jcarousel_searchgroup').jcarousel().on('jcarousel:animateend', function (event, carousel) {
      let id = $(carousel._visible['0']).index();
      $('#jcarousel_searchgroup .jp-item').removeClass('active');
      $('#jcarousel_searchgroup .jp-item').eq(id).addClass('active');
    });
    // set width of item
    $('#jcarousel_searchgroup .jcarousel li').width($('.jcarousel').width());
    // move slider
    $('#jcarousel_searchgroup').on('click', '.jc-right', function (event) {
      event.preventDefault();
      $('#jcarousel_searchgroup.jcarousel').jcarousel('scroll', '+=1');
    });
    $('#jcarousel_searchgroup').on('click', '.jc-left', function (event) {
      event.preventDefault();
      $('#jcarousel_searchgroup.jcarousel').jcarousel('scroll', '-=1');
    });
    $('#jcarousel_searchgroup').on('click', '.jp-item', function (event) {
      event.preventDefault();
      let id = $(this).index();
      $('#jcarousel_searchgroup.jcarousel').jcarousel('scroll', id);
    });
    // fin control del carusel
  }

  function removeTabsContents() {
    $containertbl.addClass('notvisible').removeClass('visible');
    let $tabs = $('#tab_searchgroup');

    _gly_searchingroup.removeAll();
    __url_layerselected = '';
    __cacheresults = [];

    let auxlength = $tabs.length;
    for (let i = 0; i < auxlength; i++) {
      let aux_idtable = $tabs[i].id.split('tab')[1];
      let idtable = `#tbl${aux_idtable}`;
      
      // limpiar tabla
      let rowcount = $(`${idtable} > tbody tr`).length;
      if (rowcount > 0) {
        $(idtable).DataTable().clear();
        $(idtable).DataTable().destroy();
        $(`${idtable} > thead`).html('');
        $(`${idtable} > tbody`).html('');
      }
    }
    $containertbl.find('.dt-buttons').remove();
    $('#container_tblsearchingroup .txt-dt-filtar').val('');

    $('#tab_searchgroup').html('');
    $('#tab_content_searchgroup').html('');
  }

});