define([
  "js/helper",
  "js/core/services",
  "js/core/permission",  

  "esri/layers/GraphicsLayer",
  "esri/tasks/QueryTask",
  "esri/tasks/support/Query",
  "esri/Graphic",

], function (
  Helper,
  Services,
  Permission,

  GraphicsLayer,
  QueryTask,
  Query,
  Graphic,
) {

  var $containertbl = $('#container_tblsearchforubigeo');

  var __url_layerselected = '',
    __cacheresults = [], // caché de resultados, array de jsons  
    __cachelayers = [], // caché de layers del resultados, array de jsons  
    __url_ubigeo = '',
    __sql_ubigeo = '',
    __buffergeometry = null,

    url_ubigeoregion = Services.getUrlDepartamento(),
    url_ubigeoprovincia = Services.getUrlProvincia(),
    url_ubigeodistrito = Services.getUrlDistrito(),

    _gly_bufferubigeo = new GraphicsLayer({
      listMode: "hide",
      title: 'Gráfico del ubigeo'
    }),

    _gly_searchubigeo = new GraphicsLayer({
      listMode: "hide",
      title: "Búsqueda por ubigeo"
    });

  // Variables de Permisos
  var __permisos_actionsgroup = Permission.getPermisosActionsgroup(),
      __permisos_others = Permission.getPermisosOthers();


  $(function(){
    if(__permisos_actionsgroup.indexOf('BusquedaUbigeo') != -1){ 
      __globspace.view.map.addMany([_gly_bufferubigeo, _gly_searchubigeo]);
      $.get("./view/widgets-group.html", function(data) { 
        $('#wg_searchforubigeo').append($(data).find("#wg_searchforubigeo_content"));
        loadRegion();
      });        
    }
  });  


  // Evento lanzada para cargar provincia
  $('#wg_searchforubigeo').on('change', '#cmb_dpto', function () {
    $('#cmb_provincia').html('<option value="">--Primero elija un región --</option>').attr('disabled', true);
    $('#cmb_distrito').html('<option value="">--Primero elija un provincia --</option>').attr('disabled', true);
    let codregion = $(this).val();

    if (codregion != '') {
      $('#spinner-prov').toggleClass('notvisible visible');

      __url_ubigeo = url_ubigeoregion;
      __sql_ubigeo = `CODDEPARTAMENTO = '${codregion}'`;

      let _queryt = new QueryTask({
          url: url_ubigeoprovincia
        }),
        _qparams = new Query();

      _qparams.outFields = ["NOMPROVINCIA", "CODPROVINCIA", "CODDEPARTAMENTO"];
      _qparams.orderByFields = ["NOMPROVINCIA"];
      _qparams.where = `CODDEPARTAMENTO = '${codregion}'`;
      _qparams.returnDistinctValues = true;
      _qparams.returnGeometry = false;
      _queryt.execute(_qparams).then(function (response) {
        let nreg = response.features.length,
          cmb = "<option selected value=''>- Seleccione provincia -</option>";

        for (let i = 0; i < nreg; i++) {
          let nameprovincia = response.features[i].attributes['NOMPROVINCIA'],
            codprovincia = response.features[i].attributes['CODPROVINCIA'];
          cmb = cmb + "<option value=" + codprovincia + ">" + nameprovincia + "</option>";
        }
        $('#cmb_provincia').html(cmb).attr('disabled', false);
        $('#spinner-prov').toggleClass('notvisible visible');
        $('#cmb_distrito').attr('disabled', false);

      }).catch(function (error) {
        Helper.showError(error);
      });
    } else {
      __url_ubigeo = '';
      __sql_ubigeo = '';
    }
  });

  // Evento lanzada para cargar distrito 
  $('#wg_searchforubigeo').on('change', '#cmb_provincia', function () {
    $('#cmb_distrito').html('<option value="">--Primero elija un provincia --</option>').attr('disabled', true);
    $('#spinner-dist').toggleClass('notvisible visible');

    let codprovincia = $(this).val();

    if (codprovincia != '') {
      __url_ubigeo = url_ubigeoprovincia;
      __sql_ubigeo = `CODPROVINCIA='${codprovincia}'`;

      let _queryt = new QueryTask({
          url: url_ubigeodistrito
        }),
        _qparams = new Query();

      _qparams.outFields = ["NOMDISTRITO", "UBIGEO", "CODPROVINCIA"];
      _qparams.orderByFields = ["NOMDISTRITO"];
      _qparams.where = `CODPROVINCIA='${codprovincia}'`;
      _qparams.returnDistinctValues = true;
      _qparams.returnGeometry = false;
      _queryt.execute(_qparams).then(function (response) {
        let nreg = response.features.length;
        let cmb = "<option selected value=''>-- Seleccione distrito --</option>";
        for (let i = 0; i < nreg; i++) {
          let namedistrito = response.features[i].attributes['NOMDISTRITO'];
          let coddistrito = response.features[i].attributes['UBIGEO'];
          cmb = cmb + "<option value=" + coddistrito + ">" + namedistrito + "</option>";
        }
        $('#cmb_distrito').html(cmb).attr('disabled', false);
        $('#spinner-dist').toggleClass('notvisible visible');

      }).catch(function (error) {
        Helper.showError(error);
      });
    } else {
      __url_ubigeo = url_ubigeoregion;
      __sql_ubigeo = `CODDEPARTAMENTO = '${ $('#cmb_dpto').val() }'`;
    }
  });

  // Evento lanzada para seleccionar distrito 
  $('#wg_searchforubigeo').on('change', '#cmb_distrito', function () {
    let coddistrito = $(this).val();
    if (coddistrito != '') {
      __url_ubigeo = url_ubigeodistrito;
      __sql_ubigeo = `UBIGEO='${coddistrito}'`;
    } else {
      __url_ubigeo = url_ubigeoprovincia;
      __sql_ubigeo = `CODPROVINCIA='${ $('#cmb_provincia').val() }'`;
    }
  })

  // Evento lanzado para obtener la geometria del ubigeo 
  $('#wg_searchforubigeo').on('submit', '#form_searchforubigeo', function (evt) {
    evt.preventDefault();
    if (__url_ubigeo != '') {

      Helper.showPreloader();
      let _queryt = new QueryTask({ url: __url_ubigeo }),
        _qparams = new Query();

      _qparams.where = __sql_ubigeo;
      _qparams.outFields = ["OBJECTID"];
      _qparams.returnGeometry = true;

      _queryt.execute(_qparams).then(function (response) {
        __buffergeometry = response.features[0].geometry;
        updateBuffer();
      }).catch(function (error) {
        Helper.hidePreloader();
        Helper.showError(error);
      });
    } else {
      alertMessage('Seleccione un Departamento', 'warning', 'top-center', true);
    }
  });

  //Evento lanzado para hacer zoom a cada registro de la tabla resultado
  $containertbl.on('click', '.tdzoom', function () {
    $('.tbl-result tr.active').removeClass('active');
    $(this).parent().toggleClass('active');

    let objectid = $(this).attr('id');
    let namefield = $(this).attr('data-namefield');
    let sql = `${ namefield } = ${ objectid }`;
    Helper.paintToZoom(sql, __url_layerselected, _gly_searchubigeo);
  });

  //Evento lanzado para limpiar toda la operación
  $('#wg_searchforubigeo').on('click', '.btn-limpiar', function () {
    $containertbl.removeClass('visible').addClass('notvisible');
    clearAllOperation();
  });

  // FUNCIONES 
  //load cmb region
  function loadRegion() {
    $('#cmb_dpto').attr('disabled', true);
    $('#spinner-reg').toggleClass('notvisible visible');
    let _queryt = new QueryTask({
      url: url_ubigeoregion
    });
    let _qparams = new Query();
    _qparams.where = `1=1`;
    _qparams.outFields = ["CODDEPARTAMENTO", "NOMDEPARTAMENTO"];
    _qparams.orderByFields = ["NOMDEPARTAMENTO"];
    _qparams.returnGeometry = false;
    _queryt.execute(_qparams).then(function (response) {
      let nreg = response.features.length;
      let cmb = "<option selected value=''>-- Seleccione Región --</option>";
      for (let i = 0; i < nreg; i++) {
        let nom_region = response.features[i].attributes['NOMDEPARTAMENTO'];
        let cod_region = response.features[i].attributes['CODDEPARTAMENTO'];
        cmb = cmb + "<option value=" + cod_region + ">" + nom_region + "</option>";
      }
      $('#cmb_dpto').html(cmb).attr('disabled', false);
      $('#spinner-reg').toggleClass('notvisible visible');
    }).catch(function (error) {
      console.log("query task error - carga inicial: " + error);
      // Helper.showError(error);
    });
  }

  // actualizar el buffer
  function updateBuffer() {
    removeTabsContents();
    if (_gly_bufferubigeo.graphics.length === 0) {
      _gly_bufferubigeo.add(
        new Graphic({
          geometry: __buffergeometry,
          symbol: {
            type: "simple-fill",
            color: 'transparent',
            outline: {
              color: "#075daa",
              width: 2
            }
          }
        })
      );
    } else {
      _gly_bufferubigeo.graphics.getItemAt(0).geometry = __buffergeometry;
    }
    __globspace.view.when(function () {
      __globspace.view.goTo({
        target: _gly_bufferubigeo.graphics.toArray()
      });
    });
    matchVisibleLayers();
  }

  // cargar las capas prendidas
  function matchVisibleLayers() {
    let layers = __globspace.sublayersearchforubigeo,
      islayervisible,
      result = [],
      layersvisible = [];

    layers.visible == true ? islayervisible = true : islayervisible = false;

    if (islayervisible) {
      let layertype = layers.type;
      if (typeof layertype === 'undefined') layertype = 'map-image';
      switch (layertype) {
        case 'group':
          layersvisible = getVisibleLayers(layers.layers.items, islayervisible, result);
          break;
        case 'map-image':
          layersvisible = getVisibleLayers(layers.sublayers.items, islayervisible, result);
          break;
        case 'feature':
          const url_servicio = layers.parsedUrl.path;
          const titlelayer = layers.title;
          layersvisible.push({
            'titlelayers': titlelayer,
            'idlayer': layers.id,
            'aliasmil': 'no_mil',
            'urlservicio': url_servicio,
          });
          break;
      }
    }

    if (layersvisible.length > 0) {
      doFirstMatch(layersvisible);
    } else {
      Helper.hidePreloader();
      alertMessage('No hay capas prendidas', 'warning', 'top-center', true);
    }
  }

  // obtener las capas prendidas
  function getVisibleLayers(layers, islayervisible, result) {
    let url_servicio = '';
    if (islayervisible) {
      for (let i = 0; i < layers.length; i++) {
        let layer = layers[i];
        let layertype = layers[i].type;
        layer.visible == true ? islayervisible = true : islayervisible = false;
        if (typeof layertype === 'undefined') layertype = 'map-image';

        if (islayervisible) {
          switch (layertype) {
            case 'group':
              getVisibleLayers(layer.layers.items, islayervisible, result);
              break;
            case 'map-image':
              let hassublayers = '';
              layer.sublayers != null ? hassublayers = true : hassublayers = false;
              if (hassublayers) {
                getVisibleLayers(layer.sublayers.items, islayervisible, result);
              } else {
                url_servicio = layer.url;
                titlelayer = layer.parent.title + '/' + layer.title;
                result.push({
                  'titlelayers': titlelayer,
                  'idlayer': layer.id,
                  'aliasmil': layer.alias_sector,
                  'urlservicio': url_servicio,
                });
                islayervisible = false;
                getVisibleLayers(layer, islayervisible, result);
              }
              break;
            case 'feature':
              url_servicio = layer.parsedUrl.path;
              titlelayer = layer.parent.title + '/' + layer.title;
              result.push({
                'titlelayers': titlelayer,
                'idlayer': layer.id,
                'aliasmil': 'no_mil',
                'urlservicio': url_servicio,
              });
              islayervisible = false;
              getVisibleLayers(layer, islayervisible, result);
              break;
          }
        }
      }
    } else {
      return
    }
    return result;
  }

  function activeEventsTabs() {
    // obtengo los parametros para la consulta de una capa en especifico
    $('#tab_searchforubigeo a').on('click', function (e) {
      e.preventDefault()
      Helper.showPreloader();

      $('.dt-buttons').css('display', 'none');
      $('.tab-content > div').removeClass('active show');
      let datalayer = $(this).attr('href');
      $(datalayer).addClass('active show');

      let idtable = datalayer.substring(1),
        rowcount = $(`#tbl_${idtable} > tbody tr`).length,
        idcache = datalayer,
        cachelayer = __cachelayers.find(response => response.id == idcache); // caché de layers 
      __url_layerselected = cachelayer.urlservicio;

      if (rowcount == 0) {
        getDataIntersected(cachelayer, idtable, idcache); //consultar
      } else {
        $(`#container_tblsearchforubigeo .dt-buttons button[aria-controls='tbl_${idtable}']`).parents('.dt-buttons').css('display', 'contents');

        let layer = __cacheresults.find(response => response.id == idcache); // caché de resultados 
        let response = layer.response;
        // Helper.renderGraphic(response, _gly_searchubigeo);
        Helper.renderToZoomBuffer(response, _gly_searchubigeo, __buffergeometry);
        
        Helper.hidePreloader();
      }
    });

    // start control del carusel
    $('#jcarousel_searchforubigeo.jcarousel').jcarousel().on('jcarousel:animateend', function (event, carousel) {
      let id = $(carousel._visible['0']).index();
      $('#jcarousel_searchforubigeo .jp-item').removeClass('active');
      $('#jcarousel_searchforubigeo .jp-item').eq(id).addClass('active');
    });
    // set width of item
    $('#jcarousel_searchforubigeo.jcarousel li').width($('.jcarousel').width());
    // move slider
    $containertbl.on('click', '.jc-right', function (event) {
      event.preventDefault();
      $('#jcarousel_searchforubigeo.jcarousel').jcarousel('scroll', '+=1');
    });
    $containertbl.on('click', '.jc-left', function (event) {
      event.preventDefault();
      $('#jcarousel_searchforubigeo.jcarousel').jcarousel('scroll', '-=1');
    });
    $containertbl.on('click', '.jp-item', function (event) {
      event.preventDefault();
      let id = $(this).index();
      $('#jcarousel_searchforubigeo.jcarousel').jcarousel('scroll', id);
    });
    // fin control del carusel
  }

  // hacer la primera interseccion( resultado por defecto)
  function doFirstMatch(layers) {
    $('#div_results .grilla').addClass('notvisible').removeClass('visible');
    let isfirstintersect = true,
      auxlength = layers.length,
      count = layers.length,
      tabsearchforubigeo = '',
      tabsearchforubigeocontent = '',
      firstlayer = {},
      firstidtable = '',
      firstidcache = '',
      iserror = false,
      mensaje='¡Se detectaron algunos inconvenientes de conexión! <br> No se pudo cargar lo correspondiente a: <br>';

    for (let j = auxlength - 1; j >= 0; j--) {
      let item = layers[j],
        titletab = item.titlelayers,
        url_servicio = item.urlservicio,
        iddom = `${item.aliasmil}¿${item.idlayer}¿searchforubigeo`,
        _queryt = new QueryTask({
          url: url_servicio
        }),
        _qparams = new Query();

      _qparams.geometry = __buffergeometry;
      _qparams.spatialRelationship = "intersects";
      _qparams.outFields = ['*'];
      _qparams.where = '1=1';
      _queryt.executeForCount(_qparams).then(function (response) {
        let nreg = response;

        // crear tabs y contenido
        if (nreg > 0) {
          let href = `#${iddom}`;
          tabsearchforubigeo += `
                        <li class="nav-item">
                          <a class="nav-link " data-toggle="tab" href="${href}" id="tab${iddom}" role="tab" >${titletab} (<span>${nreg}</span>)</a>
                        </li>`;
          tabsearchforubigeocontent += `
                        <div class="tab-pane fade " id="${iddom}" role="tabpanel" >
                          <table id="tbl_${iddom}" class="tbl-result table table-striped table-bordered nowrap" style="width:100%">
                            <thead></thead>
                            <tbody></tbody>
                          </table>
                        </div>`;

          let data = {
            urlservicio: url_servicio,
            title: titletab,
            id: href
          };
          __cachelayers.push(data);
        }

        // cargar una tabla resultado por defecto (primer layer con entidades intersectados en el buffer )
        if (nreg > 0 && isfirstintersect) {
          isfirstintersect = false;
          firstlayer = {
            urlservicio: url_servicio,
            title: titletab
          };
          firstidtable = `${iddom}`;
          firstidcache = `#${iddom}`;
          __url_layerselected = url_servicio;
        }

        // activar eventos en tabs -- renderizar los tab y contenido 
        if (count == 1) {
          if (isfirstintersect) {
            Helper.hidePreloader();
            alertMessage('No hay entidades en este ubigeo.', 'warning', 'top-center', true);
          } else {
            $('#tab_searchforubigeo').html(tabsearchforubigeo);
            $('#tab_content_searchforubigeo').html(tabsearchforubigeocontent);

            getDataIntersected(firstlayer, firstidtable, firstidcache);
            $(`#tab${firstidtable}`).addClass('active');
            $(`#${firstidtable}`).addClass('active show');

            activeEventsTabs();
          }
        }

        if(iserror){
          alertMessage(mensaje, 'warning');
        }

        count--;

      })
      .catch(function (error) {
        iserror = true;
        mensaje += ` - ${ titletab } <br>`;
        // activar eventos en tabs -- renderizar los tab y contenido 
        if (count == 1) {
          if (isfirstintersect) {
            Helper.hidePreloader();
            alertMessage('No hay entidades en este ubigeo.', 'warning', 'top-center', true);
          } else {
            $('#tab_searchforubigeo').html(tabsearchforubigeo);
            $('#tab_content_searchforubigeo').html(tabsearchforubigeocontent);

            getDataIntersected(firstlayer, firstidtable, firstidcache);
            $(`#tab${firstidtable}`).addClass('active');
            $(`#${firstidtable}`).addClass('active show');

            activeEventsTabs();
            alertMessage(mensaje, 'warning');
          }
        }

        count--;
        console.log("query task error \n", error);
      })
    }
  }

  // ejecutar consulta de interseccion de buffer con capa determinada
  function getDataIntersected(layer, aux_idtable, idcache) {
    let url_servicio = layer.urlservicio;
    let grupo = $('#lbl_sector_searchforubigeo').text(), 
        dpto = $('#cmb_dpto').val()=='' ? '' : $('#cmb_dpto option:selected').text(),
        prov = $('#cmb_provincia').val()=='' ? '' : '- ' + $('#cmb_provincia option:selected').text(),
        dist = $('#cmb_distrito').val()=='' ? '' : '- ' + $('#cmb_distrito option:selected').text();        
    let titleparams = `${dpto} ${prov} ${dist}`;
    let titlelayer = 'Búsqueda por Ubigeo: ' + titleparams + ' \n ' + layer.title; // title del reporte a exportar
    $('#title_tblsearchforubigeo').text(titleparams);

    let _queryt = new QueryTask({
        url: url_servicio
      }),
      _qparams = new Query();

    _qparams.where = '1=1';
    _qparams.outFields = ["*"];
    _qparams.spatialRelationship = "intersects";
    _qparams.geometry = __buffergeometry;
    _qparams.returnGeometry = true;
    _queryt.execute(_qparams).then(function (response) {
      let nreg = response.features.length,
        isexportable = false,
        idtable = `#tbl_${aux_idtable}`;

      (__permisos_others.indexOf('ExportarTabla') != -1) ? isexportable = true : '';

      Helper.loadTable(response, titlelayer, idtable, isexportable);
      Helper.renderToZoomBuffer(response, _gly_searchubigeo, __buffergeometry);

      __cacheresults.push({
        'id': idcache,
        'response': response,
        'nreg': nreg
      }); // caché de resultados 

      if (nreg >= 1000) {
        alertMessage('El resultado supera el límite de registros a mostrar, por lo tanto solo se muestra los primeros 1000 registros.', 'warning', 'top-center', true);
      }
    }).catch(function (error) {
      let mensaje= `¡Se detectaron algunos inconvenientes de conexión!. Por favor vuelva a seleccionar la pestaña ${ layer.title }`;
      alertMessage(mensaje, 'warning');
      $('#container_tblsearchforubigeo').addClass('visible').removeClass('notvisible');
      Helper.hidePreloader();
      console.log("query task error \n", error);
    })
  }

  function clearAllOperation() {
    Helper.hideGrid();
    __url_ubigeo = '';
    __sql_ubigeo = '';
    __buffergeometry = null;
    _gly_bufferubigeo.removeAll();

    $('#cmb_dpto').prop('selectedIndex', 0);
    $('#cmb_provincia').html('<option value="">--Primero elija una región--</option>');
    $('#cmb_distrito').html('<option value="">--Primero elija una provinvia--</option>');
    removeTabsContents();
  }

  function removeTabsContents() {
    _gly_searchubigeo.removeAll();

    __url_layerselected = '';
    __cacheresults = [];
    __cachelayers = [];

    $containertbl.addClass('notvisible').removeClass('visible');
    let $tabs = $('#tab_searchforubigeo');
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
    $('#container_tblsearchforubigeo .txt-dt-filtar').val('');

    $('#tab_searchforubigeo').html('');
    $('#tab_content_searchforubigeo').html('');
  }
  
});