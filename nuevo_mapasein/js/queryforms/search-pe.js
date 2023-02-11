define([
  "js/helper",
  "js/core/services",
  "js/core/permission",

  "esri/tasks/QueryTask",
  "esri/tasks/support/Query",
  "esri/layers/GraphicsLayer"
], function (
  Helper,
  Services,
  Permission,

  QueryTask,
  Query,
  GraphicsLayer
) {

  var __url_query = '',
    __titlereport = '',

    url_pe = Services.getUrlPE(),
    url_pe_c = Services.getUrlPEContrato();

  // Variables de Permisos
  var __permisos_actionsgroup = Permission.getPermisosActionsgroup(),
    __permisos_layers = Permission.getPermisosLayers();


  let f_pe_det_pe_suministrador = 'SUMINISTRADOR';
  let f_pe_det_pe_cliente = 'CLIENTE';
  let f_pe_det_pe_fechainicio = 'VC_INICIO';
  let f_pe_det_pe_fechafin = 'VC_FIN';
  let f_pe_det_pe_niveltension = 'NIVEL_TENSION';
  let f_pe_det_pe_titularbarra = 'TITULAR_BARRA';
  let f_pe_det_pe_tension = 'TENSION_NOM_OP';
  let f_pe_det_pe_id = 'ID_PE';

  let f_pe_idpe = 'ID_PE';
  let f_pe_nombre = 'NOMBRE_PE';


  $(function () {
    if (__permisos_actionsgroup.indexOf('SearchPE') != -1 && __permisos_layers.indexOf('PuntoEntrega') != -1) {
      $.get("./view/widgets-group.html", function (data) {
        $('#wg_searchpe').append($(data).find("#wg_searchpe_content"));
        initSearchPE();
      });
    }
  });

  function initSearchPE(){
    loadDistribuidores();;        
  }



  // Evento lanzado para obtener los PE segun el suministro
  $('#wg_searchpe').on('change', '#cmb_empresa', function (e) { // load PEs 
    $('#cmb_pe').html('<option value="">--Primero elija Distribuidora--</option>').attr('disabled', true);
    $('#spinner-clientepe').toggleClass('notvisible visible');
    let distribuidora = $(this).val();
    if (distribuidora != '') {

      let _queryt = new QueryTask({ url: url_pe_c}),
        _qparams = new Query();

      _qparams.where = `${f_pe_det_pe_cliente} = '${ distribuidora }'`;
      _qparams.outFields = [f_pe_det_pe_cliente, f_pe_det_pe_id];
      _qparams.orderByFields = [f_pe_det_pe_cliente];
      _qparams.returnDistinctValues = true;
      _qparams.returnGeometry = false;
      _queryt.execute(_qparams)
        .then(function (response) {
          let auxlength = response.features.length,
            sql = '';
          for (let j = 0; j < auxlength; j++) {
            let row = response.features[j].attributes;
            sql += `'${ row[f_pe_det_pe_id] }', `;
          }

          sql = sql.trim().slice(0, -1);
          sql = `${ f_pe_idpe } in (${ sql })`;


          let _queryt2 = new QueryTask({ url: url_pe }),
            _qparams2 = new Query();

          _qparams2.where = sql;
          _qparams2.outFields = [f_pe_nombre, f_pe_idpe];
          _qparams2.orderByFields = [f_pe_nombre];
          _qparams2.returnDistinctValues = true;
          _qparams2.returnGeometry = false;
          _queryt2.execute(_qparams2)
            .then(function (response) {
              let auxlength = response.features.length,
                cmb = "<option selected value=''>-- Elija Punto de Entrega --</option>";
              for (let i = 0; i < auxlength; i++) {
                let namepe = response.features[i].attributes[f_pe_nombre],
                  idpe = response.features[i].attributes[f_pe_idpe];
                cmb += `<option value="${ idpe }"> ${ namepe } </option>`;
              }
              $('#cmb_pe').html(cmb).attr('disabled', false);
              $('#spinner-clientepe').toggleClass('notvisible visible');
            })
            .catch(function (error) {
              Helper.showError(error);
            });

        })
        .catch(function (error) {
          Helper.showError(error);
        });
    }
  })


  // Evento para inicializar busqueda
  $('#wg_searchpe').on('submit', '#form_seachpe', function (evt) {
    evt.preventDefault();
    Helper.showPreloader();
    Helper.hideGrid();
    __titlereport = 'Búsqueda en Puntos de Entrega' //title del reporte para el exportar

    let requiere = [{
        idfiel: 'cmb_empresa',
        label: 'Distribuidora'
      },
      {
        idfiel: 'cmb_pe',
        label: 'Punto de Entrega'
      }, {
        idfiel: 'cmb_aniope',
        label: 'Año'
      }, {
        idfiel: 'cmb_mespe',
        label: 'Mes'
      },
    ]
    if (Helper.getValidationForm('form_seachpe', requiere)) {
      getQueryPE();

      if ($('#div_results .grilla').hasClass('max-size')) {
        $('#div_results .grilla').removeClass('max-size').addClass('min-size');
      }

      $('#container_tblpe').addClass('visible').removeClass('notvisible');
      Helper.hidePreloader();
    }
  });

  // Evento lanzado para limpiar toda la operación
  $('#wg_searchpe').on('click', '#btn_clearsearchpe', function () {
    Helper.hideGrid();
    __url_query = '';
    __titlereport = '';

    $('#cmb_pe').html('<option value="">--Primero elija Distribuidora--</option>');
    $('.form-group').removeClass('error');
    $('.form-group span.lbl-error').remove();

  });


  // FUNCIONES

  function loadDistribuidores() {
    $('#cmb_empresa').attr('disabled', true);;
    $('#spinner-empresape').toggleClass('notvisible visible');

    let _queryt = new QueryTask({ url: url_pe_c });
    let _qparams = new Query();
    _qparams.where = `1=1`;
    _qparams.outFields = [`${f_pe_det_pe_cliente}`];
    _qparams.orderByFields = [`${f_pe_det_pe_cliente}`];
    _qparams.returnGeometry = false;
    _qparams.returnDistinctValues = true;

    _queryt.execute(_qparams).then(function (response) {
      let auxlength = response.features.length;
      let cmb = "<option selected value=''>-- Elija Distrubuidor --</option>";
      for (let i = 0; i < auxlength; i++) {
        let suministrador = response.features[i].attributes[`${f_pe_det_pe_cliente}`];
        cmb += `<option value="${ suministrador }" > ${ suministrador }</option>`;
      }
      $('#cmb_empresa').html(cmb).attr('disabled', false);;
      $('#spinner-empresape').addClass('notvisible').removeClass('visible');

    }).catch(function (error) {
      // Helper.showError(error);
      console.log("query task error - carga inical: ");
      console.log(error);
    });
  }


  function getQueryPE() {

    const suministrador = $('#cmb_empresa').val();
    const namepe = $('#cmb_pe option:selected').text();
    const id_pe = $('#cmb_pe').val();
    const anio = $('#cmb_aniope').val();
    const mes = $('#cmb_mespe').val();

    let fecha = moment(`${ anio }-${ mes }-01`).add(5, 'hours').format('YYYY-MM-DD HH:mm:ss'); //consulta al servicio en hora utc (+5);; // formato por defecto de momento es 'YYYY-MM-DD'

    let sql = `( ${ f_pe_det_pe_cliente } = '${ suministrador }' ) and  ( ${ f_pe_det_pe_id } = '${ id_pe }') and ( ${ f_pe_det_pe_fechainicio } < timestamp '${ fecha }') and ( ${ f_pe_det_pe_fechafin } > timestamp '${ fecha }') `;

    let _queryt = new QueryTask({ url: url_pe_c });
    let _qparams = new Query();
    _qparams.where = sql;
    _qparams.outFields = [f_pe_det_pe_suministrador, f_pe_det_pe_cliente, f_pe_det_pe_fechainicio, f_pe_det_pe_fechafin, f_pe_det_pe_niveltension, f_pe_det_pe_titularbarra, f_pe_det_pe_tension];
    _qparams.orderByFields = `${f_pe_det_pe_fechafin} desc`;
    _qparams.returnGeometry = false;
    _queryt.execute(_qparams).then(function (response) {
      const aux_fields = response.fields;
      const auxlength = response.features.length;
      const addnamepe = { // añadir el campo nombre de punto de entrega ya que en el servicio no lo tiene solo tiene codigo
        alias: "Nombre Punto de Entrega",
        name: 'nombrepe',
        type: "string"
      };
      aux_fields.splice(5, 0, addnamepe);

      for (let i = 0; i < auxlength; i++) {
        let row = response.features[i].attributes;
        row['nombrepe'] = namepe;
      }

      Helper.loadTablePE(response, aux_fields, '#tbl_pe', true);

    }).catch(function (error) {
      Helper.hidePreloader();
      Helper.showError(error);
    });
  }

  loadAniosPE();

  function loadAniosPE() {
    let _queryt = new QueryTask({
      url: url_pe_c
    });
    let _qparams = new Query();
    _qparams.where = "1=1";
    _qparams.outFields = [f_pe_det_pe_fechainicio ];
    _qparams.orderByFields = `${f_pe_det_pe_fechainicio} asc`;
    _qparams.returnGeometry = false;
    _queryt.execute(_qparams)
      .then(function (response) {
        let anioinicio = response.features[0].attributes[f_pe_det_pe_fechainicio ];
        anioinicio = moment(anioinicio);
        anioinicio = anioinicio.year();

        let _queryt2 = new QueryTask({
          url: url_pe_c
        });
        let _qparams2 = new Query();
        _qparams2.where = "1=1";
        _qparams2.outFields = [f_pe_det_pe_fechafin ];
        _qparams2.orderByFields = `${f_pe_det_pe_fechafin} desc`;
        _qparams2.returnGeometry = false;
        _queryt2.execute(_qparams2).then(function (response) {
          let aniofin = response.features[0].attributes[f_pe_det_pe_fechafin ];
          aniofin = moment(aniofin);
          aniofin = aniofin.year();
          let cmb = '<option value="">--Elija Año--</option>';
          for (let i = anioinicio; i <= aniofin; i++) {
            cmb += `<option value="${i}">${i}</option>`;
          }
          $('#cmb_aniope').html(cmb);

        }).catch(function (error) {
          Helper.hidePreloader();
          console.log('anio inicial');
          console.log("query task error - carga inicial: ");
          console.log(error);
        });

      })
      .catch(function (error) {
        Helper.hidePreloader();
        console.log('año final');
        console.log("query task error - carga inicial: ");
        console.log(error);
      });
  }

});