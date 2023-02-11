define([
  "js/helper",
  "js/core/services",
  "js/core/permission",

  "esri/tasks/QueryTask",
  "esri/tasks/support/Query",
  "esri/Graphic",
  "esri/layers/GraphicsLayer"
], function (
  Helper,
  Services,
  Permission,

  QueryTask,
  Query,
  Graphic,
  GraphicsLayer
) {


  //Urls de Ubigeo
  var url_ubigeoregion = Services.getUrlDepartamento(),
    url_ubigeoprovincia = Services.getUrlProvincia(),
    url_ubigeodistrito = Services.getUrlDistrito();

  var __layers = [], //capa=[{titlelayers:titulo_capas, service: url_servicio, sublayer: sublayer}],
    __url_query = '',
    __query = [],
    __queryindex = 0,
    __titlelayer = '',
    __url_ubigeo = '',
    __sql_ubigeo = '',
    _symbol = {
      type: "simple-line",
      color: "#2196f3",
      width: 2,
    },
    __sublayer = {},
    __ubigeogeometry = {},
    __jsonvaluefiels = [];

  var _gly_searchadvanced = new GraphicsLayer({
    listMode: "hide",
    title: "Consulta Avanzada"
  });

  var _gly_ubigeo = new GraphicsLayer({
    listMode: "hide",
    title: "Buffer"
  });

  // Variables de Permisos
  var __permisos_generals = Permission.getPermisosGenerals(),
    __permisos_others = Permission.getPermisosOthers();

  $(function () {
    if (__permisos_generals.indexOf('ConsultaAvanzada') != -1) {
      __globspace.map.addMany([_gly_ubigeo, _gly_searchadvanced]);
      $.get("./view/widgets-generals.html", function (data) {
        $('#wg_search_advanced').append($(data).find("#wg_search_advanced_content"));
        initSearchAdvanced();
      });
    }
  });

  function initSearchAdvanced() {
    loadRegion();
  }


  /**
   * load groups
   * llenar variable __grouplayer
   */
  $('#wg_search_advanced').on('change', '#cmb_sector', function (e) {
    e.preventDefault();
    clearAllOperation();

    let group = $(this).val(),
      layers = __globspace.map.layers.items;

    if (group != '') {
      let auxlength = layers.length;
      for (let i = 0; i < auxlength; i++) {
        let layer = layers[i];
        if (group == layer.aux_alias) {
          let hassublayers = '',
            padres = '?' + layer.title,
            nivelcero = layer.title,
            resultado = [];
          layer.sublayers != null ? hassublayers = true : hassublayers = false;
          __layers = extraerlayer(layer.sublayers.items, padres, hassublayers, nivelcero, resultado);
          break;
        }
      }
      let cmb = '<option value="">-- Elija una capa --</option>';
      let auxlength2 = __layers.length;
      for (let i = auxlength2 - 1; i >= 0; i--) {
        let title = (__layers[i].titlelayers).substring(1).replace(/\?/g, ' / ');
        cmb += `<option value="${ i }">${ title }</option>`;
      }

      $('#cmb_layer').html(cmb);
    }
    
  });

  /**
   * load fields
   * llenar variable __url_query del __layer
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

  $('#wg_search_advanced').on('change', '#cmb_fields', function (e) {
    getValueFields();
  });

  /**
   * add filters in table
   * llenar variable __query
   * utilizo variable __queryindex 
   */
  $('#wg_search_advanced').on('click', '#btn_addfilter', function (e) {
    e.preventDefault();
    let fieldname = $('#cmb_fields').val(),
      fieldlabel = $('#cmb_fields option:selected').text(),
      condition = $('#cmb_condition').val(),
      filter = $('#cmb_filter').val(),
      typedata = $('#cmb_fields option:selected').attr('data-typedata'),
      option = '';

    if (filter == null) filter = '';
    if (fieldname != '' && filter.length != 0) {
      __queryindex++;
      __query.length == 0 ? option = '--' : option = 'and';

      __query.push({
        'id': __queryindex,
        'fieldname': fieldname,
        'condition': condition,
        'filter': filter,
        'option': option,
        'typedata': typedata
      });

      aux_cadena = `<select name="opcion" class='cmb-operadorlogico' data_queryindex="${ __queryindex }" >
                            <option value="and">and</option>
                            <option value="or">or</option>
                        </select>`;
      __query.length == 1 ? aux_cadena = '--' : '';
      cadena = `<tr id="tr_${__queryindex}">
                    <td> ${ aux_cadena }</td>
                    <td>${ fieldlabel }</td>
                    <td>${ condition }</td>
                    <td>${ filter }</td>
                    <td><span class="btn_removefilter icon-remove " data_queryindex="${ __queryindex }" data-toggle="tooltip" data-placement="left" title="Eliminar filtro" ></span></td>
                </tr>`;

      $('#tbody_filter').append(cadena);
    } else {
      alertMessage('Seleccione un campo o un filtro', 'warning', 'top-center', true);
    }
  });

  // cambiar la opcion del filtro : and o or 
  $('#wg_search_advanced').on('change', '.cmb-operadorlogico', function (event) {
    event.preventDefault();
    let option = $(this).val(),
      queryindex = $(this).attr('data_queryindex'),
      auxlength = __query.length;

    for (let i = 0; i < auxlength; i++) {
      if (queryindex == __query[i].id) {
        __query[i].option = option;
        break;
      }
    }
  });

  // eliminar un filtro
  $('#wg_search_advanced').on('click', '.btn_removefilter', function (event) {
    event.preventDefault();
    let queryindex = $(this).attr('data_queryindex'),
      auxlength = __query.length;

    for (let i = 0; i < auxlength; i++) {
      if (queryindex == __query[i].id) {
        $('#tr_' + queryindex).remove();
        __query.splice(i, 1);
        break;
      }
    }
    if (__query.length != 0) {
      if (__query[0].option != '--') {
        __query[0].option = '--';
        $('#tr_' + __query[0].id + ' td').first().text('--');
      }
    }
  });

  /**
   * btn buscar
   * llenar variable __titlelayer
   */
  $('#wg_search_advanced').on('click', '#btn_searchadvanced', function (e) {
    Helper.showPreloader();
    Helper.hideGrid();

    let sector = $('#cmb_sector option:selected').text(),
      layer = $('#cmb_layer option:selected').text();

    __titlelayer = 'Consulta avanzada: \n ' + sector + ' - ' + layer;

    if (__query.length != 0 || __url_ubigeo != '') {
      search();
    } else {
      Helper.hidePreloader();
      alertMessage('Elija campos a filtrar o ubigeo.', 'warning', 'top-center', true);
    }
  });

  // load cmb provincia
  $('#wg_search_advanced').on('change', '#cmb_ubigeoregion', function (e) {
    $('#cmb_ubigeodistrito').html('<option value="">--Primero elija una provincia--</option>').attr('disabled', true);
    $('#cmb_ubigeoprovincia').html('<option value="">--Primero elija una región--</option>').attr('disabled', true);
    $('#spinner-provincia').toggleClass('notvisible visible');

    let codregion = $(this).val();
    if (codregion != '') {
      __url_ubigeo = url_ubigeoregion;
      __sql_ubigeo = `CODDEPARTAMENTO = '${ codregion }'`;

      let _queryt = new QueryTask({
          url: url_ubigeoprovincia
        }),
        _qparams = new Query();

      _qparams.where = `CODDEPARTAMENTO = '${ codregion }'`;
      _qparams.outFields = ["NOMPROVINCIA", "CODPROVINCIA", "CODDEPARTAMENTO"];
      _qparams.orderByFields = ["NOMPROVINCIA"];
      _qparams.returnDistinctValues = true;
      _qparams.returnGeometry = false;
      _queryt.execute(_qparams).then(function (response) {
        let nreg = response.features.length,
          cmb = "<option selected value=''>-- Seleccione una provincia --</option>";
        for (let i = 0; i < nreg; i++) {
          let nameprovincia = response.features[i].attributes['NOMPROVINCIA'],
            codprovincia = response.features[i].attributes['CODPROVINCIA'];
          cmb = cmb + "<option value=" + codprovincia + ">" + nameprovincia + "</option>";
        }
        $('#cmb_ubigeoprovincia').html(cmb).attr('disabled', false);
        $('#cmb_ubigeodistrito').attr('disabled', true);
        $('#spinner-provincia').toggleClass('notvisible visible');

      }).catch(function (error) {
        Helper.showError(error);
      });
    } else {
      __url_ubigeo = '';
      __sql_ubigeo = '';
    }
  });

  // load cmb distrito
  $('#wg_search_advanced').on('change', '#cmb_ubigeoprovincia', function (e) {
    $('#cmb_ubigeodistrito').html('<option value="">--Primero elija una provincia--</option>').attr('disabled', true);
    $('#spinner-distrito').toggleClass('notvisible visible');

    let codprovincia = $(this).val();
    if (codprovincia != '') {
      __url_ubigeo = url_ubigeoprovincia;
      __sql_ubigeo = `CODPROVINCIA='${ codprovincia }'`;

      let _queryt = new QueryTask({
          url: url_ubigeodistrito
        }),
        _qparams = new Query();

      _qparams.where = `CODPROVINCIA='${ codprovincia }'`;
      _qparams.outFields = ["NOMDISTRITO", "UBIGEO", "CODPROVINCIA"];
      _qparams.orderByFields = ["NOMDISTRITO"];
      _qparams.returnDistinctValues = true;
      _qparams.returnGeometry = false;
      _queryt.execute(_qparams)
        .then(function (response) {
          let nreg = response.features.length;
          let cmb = "<option selected value=''>-- Seleccione un distrito --</option>";
          for (let i = 0; i < nreg; i++) {
            let namedistrito = response.features[i].attributes['NOMDISTRITO'];
            let coddistrito = response.features[i].attributes['UBIGEO'];
            cmb = cmb + "<option value=" + coddistrito + ">" + namedistrito + "</option>";
          }
          $('#cmb_ubigeodistrito').html(cmb).attr('disabled', false);
          $('#spinner-distrito').toggleClass('notvisible visible');
        }).catch(function (error) {
          Helper.showError(error);
        });
    } else {
      __url_ubigeo = url_ubigeoregion;
      __sql_ubigeo = `CODDEPARTAMENTO = '${ $('#cmb_ubigeoregion').val() }'`;
    }
  });

  $('#wg_search_advanced').on('change', '#cmb_ubigeodistrito', function (e) {
    let coddistrito = $(this).val();
    if (coddistrito != '') {
      __url_ubigeo = url_ubigeodistrito;
      __sql_ubigeo = `UBIGEO='${ coddistrito }'`;
    } else {
      __url_ubigeo = url_ubigeoprovincia;
      __sql_ubigeo = `CODPROVINCIA='${ $('#cmb_ubigeoprovincia').val() }'`;
    }
  })


  // Evento lanzado para limpiar toda la operación
  $("#wg_search_advanced").on('click', '#btn_clearsearchadvanced', function (e) {
    $('#cmb_sector').prop('selectedIndex', 0);
    Helper.hideGrid();
    clearAllOperation();
  });

  // Evento lanzado para mostrar/ocultar div ubigeo
  $("#wg_search_advanced").on('click', '#btn_toggleubigeo', function (e) {
    $(this).toggleClass('icon-chevron-down icon-chevron-up');
    $('#container_ubigeo').toggle(100);
  });

  //Evento lanzado para hacer zoom a cada registro de la tabla resultado
  $('#container_tblsearchadvanced').on('click', '.tdzoom', function () {
    $('.tbl-result tr.active').removeClass('active');
    $(this).parent().toggleClass('active ');

    let objectid = $(this).attr('id');
    let namefield = $(this).attr('data-namefield');
    let sql = `${ namefield } = ${ objectid }`;
    Helper.paintToZoom(sql, __url_query, _gly_searchadvanced);
  });


  // Contar parámetros de consulta (condiciones) y pasar a consultar
  function search() {
    _gly_searchadvanced.removeAll();
    _gly_ubigeo.removeAll();

    let sql = '1=1',
      idtable = '#tbl_searchadvanced',
      isexportable = false,
      nquery = __query.length;

    (__permisos_others.indexOf('ExportarTabla') != -1) ? isexportable = true: '';

    // formación del sql 
    for (let i = 0; i < nquery; i++) {
      let item = __query[i],
        filter = item.filter.toUpperCase(),
        typedata = item.typedata,
        auxsql = '';

      switch (typedata) {
        case 'double':
        case 'small-integer':
        case 'integer':
        case 'single':
          auxsql = ` ${item.fieldname} ${item.condition} "${filter}"`;
          break;
        case 'date':
          let fi = moment(filter, 'DD/MM/YYYY').add(5, 'hours').format('YYYY-MM-DD HH:mm:ss'); //consulta al servicio en hora utc (+5);
          let ff = moment(filter, 'DD/MM/YYYY').add(29, 'hours').subtract(1, 'seconds').format('YYYY-MM-DD HH:mm:ss');

          if (item.condition == '=' || item.condition == 'contiene') {
            auxsql = `(${ item.fieldname } BETWEEN timestamp '${ fi }' AND timestamp '${ ff }')`;
          } else {
            if (item.condition == '<=') {
              auxsql = ` ${item.fieldname} ${item.condition} timestamp '${ff}'`;
            } else if (item.condition == '>=') {
              fi = moment(filter, 'DD/MM/YYYY').add(5, 'hours').subtract(1, 'seconds').format('YYYY-MM-DD HH:mm:ss');
              auxsql = ` ${item.fieldname} ${item.condition} timestamp '${fi}'`;
            } else if (item.condition == '>') {
              auxsql = ` ${item.fieldname} ${item.condition} timestamp '${ff}'`;
            } else if (item.condition == '<') {
              auxsql = ` ${item.fieldname} ${item.condition} timestamp '${fi}'`;
            }
          }
          break;
        default:
          auxsql = `Upper(${item.fieldname}) ${item.condition} '${filter}'`;
          break;
      }

      if (item.option == '--') {
        if (typedata == 'date') {
          sql = auxsql;
        } else {
          item.condition == 'contiene' ? sql += ` and Upper(${item.fieldname}) like '%${filter}%'` : sql = auxsql;
        }
      } else {
        if (typedata == 'date') {
          sql += ` ${item.option} ${auxsql}`;
        } else {
          item.condition == 'contiene' ? sql += ` ${item.option} Upper(${item.fieldname}) like '%${filter}%'` : sql += ` ${item.option} ${auxsql}`;
        }
      }
    }

    // si se a selecionado un item de ubigeo primero obtengo la geometria del ubigeo y luego la consulta propia
    if (__url_ubigeo != '') {
      let _queryt = new QueryTask({
          url: __url_ubigeo
        }),
        _qparams = new Query();

      _qparams.where = __sql_ubigeo;
      // _qparams.outFields = ["OBJECTID"];
      _qparams.returnGeometry = true;
      _queryt.execute(_qparams).then(function (response) {

        __ubigeogeometry = response.features[0].geometry;

        let _queryt2 = new QueryTask({
            url: __url_query
          }),
          _qparams2 = new Query();

        _qparams2.where = sql;
        _qparams2.outFields = ['*'];;
        _qparams2.geometry = __ubigeogeometry;
        _qparams2.spatialRelationship = "intersects";
        _qparams2.returnGeometry = true;
        _queryt2.execute(_qparams2).then(function (response) {
          let nreg = response.features.length;
          if (nreg == 0) {
            alertMessage("La consulta no tiene registros a mostrar", "warning", 'top-center', true)
            Helper.hidePreloader();
          } else {
            if (nreg >= 1000) {
              alertMessage('El resultado supera el límite, por ello solo se muestra los primeros 1000 registros. \n Para mejorar su consulta, ingrese más filtros.', 'warning', 'top-center', true);
            }

            Helper.loadTable(response, __titlelayer, idtable, isexportable);
            Helper.renderGraphic(response, _gly_searchadvanced);

            _gly_ubigeo.add(
              new Graphic({
                geometry: __ubigeogeometry,
                symbol: _symbol
              })
            );

            Helper.turnOnParentsLayer(__sublayer, true); //para asegurarse la visualización de la capa en el view

            __globspace.view.when(function () {
              __globspace.view.goTo({
                target: _gly_ubigeo.graphics.toArray()
              });
            });

          }
        }).catch(function (error) {
          Helper.hidePreloader();
          console.log("query task error - entidades intersectadas con el buffer: ");
          Helper.showError(error);
        });
      }).catch(function (error) {
        Helper.hidePreloader();
        console.log("query task error - buffer:  ");
        Helper.showError(error);
      });
    } else {
      let _queryt = new QueryTask({
          url: __url_query
        }),
        _qparams = new Query();

      _qparams.where = sql;
      _qparams.outFields = ['*'];
      _qparams.returnGeometry = true;
      _queryt.execute(_qparams).then(function (response) {
        let nreg = response.features.length;
        if (nreg == 0) {
          alertMessage("La consulta no tiene registros a mostrar", "warning", '', true);
          Helper.hidePreloader();
        } else {
          if (nreg >= 1000) {
            alertMessage('El resultado supera el límite, por ello solo se muestra los primeros 1000 registros. \n Para mejorar su consulta, ingrese más filtros.', 'warning', 'top-center', true);
          }
          Helper.loadTable(response, __titlelayer, idtable, isexportable);
          Helper.renderToZoom(response, _gly_searchadvanced);

          Helper.turnOnParentsLayer(__sublayer, true); //para asegurarse la visualización de la capa en el view
        }
      }).catch(function (error) {
        Helper.hidePreloader();
        Helper.showError(error);
      });
    }
  }

  // extraer los features layer desde el objeto Visor
  function extraerlayer(layers, padres, hassublayers, nivelcero, resultado) {
    if (!hassublayers) {
      resultado.push({
        'titlelayers': padres + '?' + layers.title,
        'service': layers.url,
        'sublayer': layers
      });
      return;
    } else {
      for (let i = 0; i < layers.length; i++) {
        let layer = layers[i];

        let aux_padres = padres;
        layer.sublayers != null ? hassublayers = true : hassublayers = false;
        hassublayers ? padres += `?${layer.title}` : '';

        if (!hassublayers) {
          let aux_layer = padres.split("?");
          // feature que pertenezcan a un grupo (features hermanos)
          if (aux_layer[aux_layer.length - 1] != layer.parent.title) {
            let aux = '?';
            for (let i = 0; i < aux_layer.length - 1; i++) {
              aux += aux_layer[i];
            }
            padres = aux;
          }
          extraerlayer(layer, padres, hassublayers, nivelcero, resultado);
        } else {
          // para reiniciar variables padres cuando llega a nivel cero
          if (layer.parent.title == nivelcero) {
            padres = '?' + layer.title;
          }

          let aux_layer = aux_padres.split("?");
          // grupo que pertenescan a un grupo superior (grupos hermanos)
          if ((aux_layer[aux_layer.length - 2] == layer.parent.title) && (layer.parent.title != nivelcero)) {
            let aux = '';
            for (let i = 0; i < aux_layer.length - 1; i++) {
              aux += aux_layer[i] + '?';
            }
            padres = aux + layer.title;
          }
          extraerlayer(layer.sublayers.items, padres, hassublayers, nivelcero, resultado);
        }
      }
    }
    return resultado;
  }

  // obtener los campos del layer con sus tipos de datos
  function getTypeFields() {
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
      let nfields = response.fields.length,
        fields = response.fields,
        cmb = '<option value="">--Elija un campo--</option>';
      for (let i = 0; i < nfields; i++) {
        let field = fields[i],
          fieldlabel = (field.alias).toUpperCase();

        if ($.inArray(field.name, Helper.getFieldsHide()) == -1) { // no poder los fields reservados
          if (field.type != 'oid') {
            cmb += `<option value="${field.name}" data-typedata=${field.type}> ${fieldlabel}</option>`;
          }
        }

      }
      $('#cmb_fields').html(cmb);
      $('#btn_searchadvanced').addClass('visible').removeClass('notvisible');
      $selectfields.prop("disabled", false);

    }).catch(function (error) {
      Helper.hidePreloader();
      Helper.showError(error);
    });
  }


  function getValueFields() {

    let $selectfilter = $("#cmb_filter");
    $selectfilter.prop("disabled", true);
    if ($selectfilter.hasClass("select2-hidden-accessible")) {
      $selectfilter.select2("destroy");
    }
    $selectfilter.html('');

    let field = $('#cmb_fields').val(),
      typedata = $('#cmb_fields option:selected').attr('data-typedata'),
      _queryt = new QueryTask({
        url: __url_query
      }),
      _qparams = new Query();

    if (field != '') {
      _qparams.where = '1=1';
      _qparams.outFields = [`${field}`];
      _qparams.orderByFields = [`${field} ASC`];
      _qparams.returnDistinctValues = true;
      _qparams.returnGeometry = false;
      _queryt.execute(_qparams).then(function (response) {
        let auxlength = response.features.length;
        __jsonvaluefiels = [];

        for (let i = 0; i < auxlength; i++) {
          let item = response.features[i].attributes;
          let auxfield = item[field];
          if (auxfield != null) {
            if (typedata == 'date') {
              auxfield = Helper.getFormatDate(auxfield, 'DD/MM/YYYY');
            }

            if ((typedata == 'string' || typedata == 'date') && auxfield.trim().length == 0) {} else {
              __jsonvaluefiels.push({
                id: auxfield,
                text: auxfield
              });
            }

          }

          if (auxlength == i + 1) {
            $selectfilter.select2({
              data: __jsonvaluefiels,
            });
            $selectfilter.prop("disabled", false);
            activeTooltipField();
          }
        }

      }).catch(function (error) {
        Helper.hidePreloader();
        Helper.showError(error);
      });

      if (['double', 'small', 'integer', 'single', 'date'].includes(typedata)) {
        $('#cmb_condition').prop('selectedIndex', 1);
      } else {
        $('#cmb_condition').prop('selectedIndex', 0);
      }
    }
  }


  //carga region
  function loadRegion() {
    $('#cmb_ubigeoregion').attr('disabled', true);
    $('#spinner-region').toggleClass('notvisible visible');

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
      $('#cmb_ubigeoregion').html(cmb);
      $('#cmb_ubigeoregion').attr('disabled', false);
      $('#spinner-region').toggleClass('notvisible visible');
      
    }).catch(function (error) {
      // Helper.showError(error);
      console.log("query task error - carga inicial: ");
      console.log(error);
    });
  }

  // funcion limpiar
  function clearFields() {
    __query = [];
    __queryindex = 0;
    $('#cmb_filter').prop('selectedIndex', 0);
    $('#cmb_fields').prop('selectedIndex', 0);
    $('#cmb_condition').prop('selectedIndex', 0);
    $('#tbody_filter').html('');

    if ($("#cmb_filter").hasClass("select2-hidden-accessible")) {
      $("#cmb_filter").select2("destroy");
      $("#cmb_filter").html('');
    }
  }

  function clearAllOperation() {
    __layers = [];
    __url_query = '';
    __titlelayer = '';
    __query = [];
    __queryindex = 0;
    __url_ubigeo = '';
    __sql_ubigeo = '';
    __ubigeogeometry = {};
    __sublayer = {};

    if ($("#cmb_filter").hasClass("select2-hidden-accessible")) {
      $("#cmb_filter").select2("destroy");
      $("#cmb_filter").html('');
    }

    $('#cmb_grupo').html('<option value="">--Elija un grupo--</option>');
    $('#cmb_layer').html('<option value="">--Primero elija un grupo--</option>');
    $('#cmb_fields').html('<option value="">--Primero elija una capa--</option>');
    $('#cmb_filter').prop('selectedIndex', 0);
    $('#cmb_condition').prop('selectedIndex', 0);
    $('#tbody_filter').html('');

    $('#cmb_ubigeoregion').prop('selectedIndex', 0);
    $('#cmb_ubigeoprovincia').html('<option value="">--Primero elija una región--</option>');
    $('#cmb_ubigeodistrito').html('<option value="">--Primero elija una provincia--</option>');

    $('#btn_searchadvanced').addClass('notvisible').removeClass('visible');

    Helper.hideGrid();
    _gly_searchadvanced.removeAll();
    _gly_ubigeo.removeAll();
  }


  function activeTooltipField() {
    $('#wg_search_advanced #select2-cmb_filter-container').mouseover(function () {
      let mensaje = $(this).attr('title');
      $(this).tooltip().attr('data-original-title', mensaje);
    });
  }


  //Evento lanzado para abrir mensaje de confirmación al querer cerrar
  $('#wg_search_advanced').on('click', '.btn-close', function (event) { 
    event.preventDefault();
    $('#lbl_titletool').text('Consulta Avanzada');
    $('#modalcleartool').modal('show');
    $('#btn_yescleartool').removeClass().addClass('btn-confirm wg-searchadvanced');
  });
  
  //Evento lanzado al confirmar el cerrar (limpiar)
  $('#modalcleartool').on('click', '#btn_yescleartool.wg-searchadvanced', function (event) {
    $('#btn_yescleartool').removeClass('wg-searchadvanced');
    $('#container_tblsearchadvanced').removeClass('visible').addClass('notvisible');
    $('#modalcleartool').modal('hide');
    clearAllOperation();

    $('#wg_search_advanced').removeClass("visible").addClass("notvisible");
  });

});