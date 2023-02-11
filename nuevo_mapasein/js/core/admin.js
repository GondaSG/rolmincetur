define([
  "js/core/services",
  "js/helper",

  "esri/tasks/QueryTask",
  "esri/tasks/support/Query",

], function (
  Services,
  Helper,

  QueryTask,
  Query,

) {

  $(document).ready(function () {
    let urlparams = window.location.search; //obtiene parametros de url
    token = urlparams.substring(1);
    (token == undefined || token == ' ') ? token = "undefined": "";

    if (token != Cookies.get('token')) {
      redirectHome();
    } else {
      $('body').removeClass('notvisible');
    }
  });

  var url_usuario = Services.getUrlUsuario();
  var url_rol = Services.getUrlRol();

  var _fly_user = Services.getFlyUsuarios();
  var _fly_rol = Services.getFlyRoles();
  var _fly_permisos = Services.getFlyPermisos();

  // user
  const f_user_name = 'NOMBRES';
  const f_user_lastname = 'APELLIDOS';
  const f_user_email = 'EMAIL';
  const f_user_phone = 'TELEFONO';
  const f_user_username = 'USERNAME';
  const f_user_password = 'PASSWORD';
  const f_user_codrol = 'COD_ROL';

  // rol
  const f_rol_name = 'NOMBRE';
  const f_rol_cod = 'CODIGO';

  // permiso 
  const f_perm_codrol = 'COD_ROL';
  const f_perm_codcomponente = 'COD_COMPONENTE';
  const f_perm_estado = 'ASIGNADO';

  // componente 
  const f_comp_cod = 'CODIGO';
  const f_comp_name = 'NOMBRE';


  var docready = true;
  var __loadtableuser = false; // cuando se modifique algun rol 
  var __editfeature;
  var __objectid = '';
  var __action = '';
  var __codrol = '';
  var __roles = [];
  var __msjalert = '';
  var __codrolprevios = '';
  var __updatedpass = false;

  var __arr_permisos = [];

  var __cachepermisos = [];

  var datatableuser = '';
  var datatablepermiso = '';

  loadRoles(__loadtableuser);


  //*********************************** UX ******************************************//

  /**
   * Usuarios
   */

  // Evento lanzado para abrir el formulario de añadir un nuevo usuario
  $('#container_user').on('click', '#btn_adduser', function () {
    if (isAdmin()) {
      $('#btn_generatepass').addClass('notvisible').removeClass('visible');
      $('#btn_generateuser').addClass('visible').removeClass('notvisible');
      $('#modalusuario').modal('show');
      $('#modaltitle_user').text('REGISTRAR NUEVO USUARIO');
      __action = 'add';
    } else {
      redirectHome();
    }
  });

  // Evento lanzado para abrir el formulario de edicion del usuario
  $('#container_user').on('click', '.btn-edit', function () {
    __objectid = $(this).attr('id');
    __action = 'edit';
    $(this).parents('tr').css('background', '#6e6e6e4a');
    if (isAdmin()) {
      $('#btn_generateuser').addClass('notvisible').removeClass('visible');
      $('#btn_generatepass').addClass('visible').removeClass('notvisible');
      $('#modaltitle_user').text('EDITAR USUARIO');
      let $txtpass = document.getElementById("txt_pass");
      $txtpass.type = "password";
      Helper.showPreloader();
      selectFeatureUser(__objectid);
    } else {
      redirectHome();
    }
  });

  //Evento lanzado para guardar un nuevo usuario o actualizar datos del usuario
  $('#modalusuario').on('click', '#btn_saveuser', function () {
    if (validarUser()) {
      Helper.showPreloader();
      let passencrypted = Helper.encryptWithAES($("#txt_pass").val());
      let attributes = {};
      attributes[f_user_name] = $("#txt_name").val().trim().toUpperCase();
      attributes[f_user_lastname] = $("#txt_lastname").val().trim().toUpperCase();
      attributes[f_user_email] = $("#txt_email").val().trim();
      attributes[f_user_phone] = $("#txt_phone").val().trim();
      attributes[f_user_codrol] = $("#cmb_rol_user").val();

      let edits = {};
      if (__action == 'edit') {
        __updatedpass ? attributes[f_user_password] = passencrypted : '';
        Object.keys(attributes).forEach(function (name) {
          __editfeature.attributes[name] = attributes[name];
        });
        edits = {
          updateFeatures: [__editfeature]
        };

      } else if (__action = 'add') {
        attributes[f_user_username] = $("#txt_user").val();
        attributes[f_user_password] = passencrypted;
        const addFeature = {
          attributes: attributes
        }
        edits = {
          addFeatures: [addFeature]
        };
      }

      if (isAdmin()) {
        applyEditsUser(edits);
      } else {
        redirectHome();
      }
    }
  });

  // Evento lanzado para abrir mensaje de confirmación al querer eliminar un usuario
  $('#container_user').on('click', '.btn-remove', function () {
    __objectid = $(this).attr('id');
    $(this).parents('tr').css('background', '#6e6e6e4a');
    Helper.showPreloader();
    if (isAdmin()) {
      __action = 'remove';
      selectFeatureUser(__objectid);
    } else {
      redirectHome();
    }
  });

  // Evento lanzado al confirmar la eliminacion 
  $('#modalEliminar').on('click', '#yes_btneliminar', function () {
    Helper.showPreloader();
    const edits = {
      deleteFeatures: [__editfeature]
    };

    if (isAdmin()) {
      applyEditsUser(edits);
    } else {
      redirectHome();
    }
  });

  function loadUsers() {
    let _queryt = new QueryTask({
      url: url_usuario
    });

    let condicion = (Cookies.get('issuperadmin')) ? `${ f_user_codrol } <> 'r000'` : `${ f_user_codrol } not in ('r000', 'r001')`; //omite rol superadmin y/o admin

    let _qparams = new Query();
    _qparams.where = `${ condicion }`
    _qparams.outFields = ['*'];
    _qparams.orderByFields = f_user_name;
    _qparams.returnGeometry = false;
    _queryt.execute(_qparams).then(function (response) {
        loadTableUser(response);
      })
      .catch(function (error) {
        Helper.hidePreloader();
        console.log("query task error - carga inicial \n", error);
        if (error.message == 'Timeout exceeded') {
          loadUsers();
        }
      });
  }

  function loadTableUser(response) {
    let data = response.features;
    let auxlength = data.length;
    let row = '';

    if ($('#tbl_users').hasClass('dataTable')) {
      $('#tbl_users').DataTable().clear();
      $('#tbl_users').DataTable().destroy();
      $(`#tbl_users > tbody`).html('');
    }

    for (let i = 0; i < auxlength; i++) {
      const item = data[i].attributes;
      let name = item[f_user_name] == null ? ' ' : item[f_user_name];
      let lastname = item[f_user_lastname] == null ? ' ' : item[f_user_lastname];
      let email = item[f_user_email] == null ? ' ' : item[f_user_email];
      let phone = item[f_user_phone] == null ? ' ' : item[f_user_phone];
      let username = item[f_user_username] == null ? ' ' : item[f_user_username];
      let rol = __roles.find(rol => rol.cod_rol == item[f_user_codrol]);
      if (typeof rol === 'undefined') {
        rol = '--';
      } else {
        rol = rol.name_rol
      }

      row += `<tr id="formulario_${item.OBJECTID}">
                <td class = 'text-center'>${i+1}</td>
                <td>${name}</td>
                <td>${lastname}</td>
                <td>${email}</td>
                <td>${phone}</td>
                <td>${username}</td>
                <td>${rol}</td>
                <td class = 'text-center'>
                    <button class='btn btn-ms btn-edit btn-crud mr-2' id="${item.OBJECTID}" data-toggle="tooltip" data-placement="left" title="Editar Usuario">
                        <span class="icon-pencil" ></span>
                    </button>
                    <button class=' btn btn-ms btn-remove btn-crud' id="${item.OBJECTID}" data-toggle="tooltip" data-placement="left" title="Eliminar Usuario">
                        <span class="icon-trash-o"></span>
                    </button>
                </td>
            </tr>`;

    };
    $("#tbody_user").html(row);

    datatableuser = Helper.getDataTableUser();
    setTimeout(function () {
      datatableuser.columns.adjust().draw();
    }, 500);

    Helper.hidePreloader();

    if (docready) {
      Helper.hidePreloader();
    }
    if (__msjalert != '') {
      alertMessage(__msjalert, 'success', 'top-center', true);
      __msjalert = '';
    }
  }

  function selectFeatureUser(objectid) {
    _fly_user
      .queryFeatures({
        objectIds: [objectid],
        outFields: ["*"],
        returnGeometry: false
      })
      .then(function (results) {
        if (results.features.length > 0) {
          __editfeature = results.features[0];
          __objectid = '';

          if (__action == 'edit') {
            let rol = __editfeature.attributes[f_user_codrol];
            if (rol == null) {
              rol = '';
            }

            $("#txt_name").val(__editfeature.attributes[f_user_name]);
            $("#txt_lastname").val(__editfeature.attributes[f_user_lastname]);
            $("#txt_email").val(__editfeature.attributes[f_user_email]);
            $("#txt_phone").val(__editfeature.attributes[f_user_phone]);
            $("#txt_user").val(__editfeature.attributes[f_user_username]);
            $("#txt_pass").val(__editfeature.attributes[f_user_password]);
            $("#cmb_rol_user").val(rol);
            $('#modalusuario').modal('show');

          } else if (__action == 'remove') {
            let parrafo = `<p>¿Desea eliminar a ${__editfeature.attributes[f_user_name]} ${__editfeature.attributes[f_user_lastname]}?</p>`;
            $("#mensaje_eliminar").html(parrafo);
            $('#modalEliminar').modal('show');
          }
          Helper.hidePreloader();
        }
      })
      .catch(function (error) {
        Helper.hidePreloader();
        console.log("query task error \n", error);
        if (error.message == 'Timeout exceeded') {
          selectFeatureUser(__objectid);
        }
      });
  }

  function applyEditsUser(params) {
    _fly_user
      .applyEdits(params)
      .then(function (editsResult) {
        let error = false;
        let status = '';
        switch (__action) {
          case 'add':
            status = editsResult.addFeatureResults[0].error;
            if (status == null) {
              __msjalert = 'Se registró correctamente';
            } else {
              error = true;
              __msjalert = `Ocurrió un error al registrar <br> ${status.message}`;
            }
            $('#modalusuario').modal('hide');
            break;
          case 'edit':
            status = editsResult.updateFeatureResults[0].error;
            if (status == null) {
              __msjalert = 'Se modificó correctamente';
              setTimeout(function () {
                $('#tbl_users tr').css('background', '');
              }, 10000);

            } else {
              error = true;
              __msjalert = `Ocurrió un error al modificar <br> ${status.message}`;
            }
            $('#modalusuario').modal('hide');
            break;
          case 'remove':
            status = editsResult.deleteFeatureResults[0].error;
            if (status == null) {
              __msjalert = 'Se eliminó correctamente';
              setTimeout(function () {
                $('#tbl_users tr').css('background', '');
              }, 10000);
            } else {
              error = true;
              __msjalert = `Ocurrió un error al eliminar <br> ${status.message}`;
            }
            $('#modalEliminar').modal('hide');
            break;
        }

        if (error) {
          alertMessage(__msjalert, 'warning', '', true);
          __msjalert = '';
          Helper.hidePreloader();

        } else {
          __action = '';
          __editfeature = {};
          clearinput();
          loadUsers();

        }
      })
      .catch(function (error) {
        console.log("error = ", error);
        Helper.hidePreloader();
        switch (__action) {
          case 'add':
            __msjalert = `Ocurrió un error al registrar <br> ${error.message}`;
            break;
          case 'edit':
            __msjalert = `Ocurrió un error al modificar <br> ${error.message}`;
            break;
          case 'remove':
            __msjalert = `Ocurrió un error al eliminar <br> ${error.message}`;
            $('#modalEliminar').modal('hide');
            break;
        }
        alertMessage(__msjalert, 'warning', '', true);
      });
  }

  

  /**
   * Roles
   */

  // Evento lanzado para visualizar el listado de roles
  $("#btn_addrol").on('click', function () {
    limpiar();
    $("#frm_rol").addClass('visible').removeClass('notvisible');
    datatablepermiso.columns.adjust().draw();
  });

  // Evento lanzado para poder editar el rol seleccionado
  $('#tbl_permisos').on('click', '.btn-editar', function () {
    $('#tbl_permisos tr').css('background', '');
    __objectid = $(this).attr('id');
    let namerol = $(this).parents('tr').find('.name-rol').html();
    if (isAdmin()) {
      $(this).parents('tr').css('background', '#6e6e6e4a');
      $('#brn_addrol').text('Guardar Edición');
      $("#txt_namerol").val(namerol);

      __action = 'edit';

    } else {
      redirectHome();
    }
  });

  // Evento lanzado para guardar un nuevo rol o actualizar datos del rol
  $("#brn_addrol").on('click', function () {
    if (validationRol()) {
      Helper.showPreloader();
      let attributes = {};
      let edits = {};

      attributes[f_rol_name] = $("#txt_namerol").val().trim().toUpperCase();

      if (__action == 'edit') {

        let objectidrol = __objectid;
        let namerol = attributes[f_rol_name];
        let attributes2 = {};
        attributes2["ObjectId"] = Number(objectidrol);
        attributes2[f_rol_name] = namerol;
        edits = {
          updateFeatures: [{
            attributes: attributes2
          }]
        };

        __objectid = '';

      } else {
        __action = 'add';

        if (typeof __codrolprevios === 'undefined') {
          __codrolprevios = 'r0';
        }

        let codrol = __codrolprevios.split('r');

        let num = parseInt(codrol[1]) + 1;
        let numnext = (num < 10) ? '00' + num : (num < 100) ? '0' + num : '' + num;
        let codnext = `r${numnext}`;

        attributes[f_rol_cod] = codnext;
        let addFeature = {
          attributes: attributes
        }
        edits = {
          addFeatures: [addFeature]
        };
      }

      if (isAdmin()) {
        applyEditsRol(edits);
      } else {
        redirectHome();
      }
    }
  });

  // Evento lanzado para cancelar la operacion(add o update) del rol
  $("#btn_cancelrol").on('click', function () {
    clearinput();
    __action = '';
    __codrol = '';
    $('#tbl_permisos tr').css('background', '');
    $('#brn_addrol').text('Guardar');
  });


  function loadRoles(hasloadtableuser) {
    Helper.showPreloader();
    _queryt = new QueryTask({
      url: url_rol
    });

    let condicion = (Cookies.get('issuperadmin')) ? `${ f_rol_cod } <> 'r000'` : `${ f_rol_cod } not in ('r000', 'r001')`; //omite rol superadmin y/o admin

    let _qparams = new Query();
    _qparams.where = `${ condicion }`; 
    _qparams.outFields = ['*'];
    _qparams.orderByFields = f_rol_name 
    _qparams.returnGeometry = false;
    _queryt.execute(_qparams).then(function (response) {
      loadTableRoles(response, hasloadtableuser);

    }).catch(function (error) {
      Helper.hidePreloader();
      console.log("query task error - carga inicial \n", error);
      if (error.message == 'Timeout exceeded') {
        loadRoles(hasloadtableuser);
      }
    });
  }

  function loadTableRoles(response, hasloadtableuser) {
    let data = response.features;
    let auxlength = data.length;
    let row = '';
    let opction = '<option value="">-- Selecionar Rol --</option>';
    __roles = [];
    if ($('#tbl_permisos').hasClass('dataTable')) {
      $('#tbl_permisos').DataTable().clear();
      $('#tbl_permisos').DataTable().destroy();
      $(`#tbl_permisos > tbody`).html('');
    }

    for (let i = 0; i < auxlength; i++) {
      const item = data[i].attributes;
      __roles.push({
        'name_rol': item[f_rol_name],
        'cod_rol': item[f_rol_cod]
      });

      row += `<tr id="formulario_${item.OBJECTID}">
                <td class = 'text-center'>${i + 1}</td>
                <td class='name-rol'>${item[f_rol_name]}</td>
                <td class = 'text-center'>
                    <button class='btn btn-sm btn-editar' id="${item.OBJECTID}" data-toggle="tooltip" data-placement="left" title="Editar Rol">
                        <span class="icon-pencil" ></span>
                    </button>
                </td>
            </tr>`;

      opction += `<option value=${item[f_rol_cod]}> ${item[f_rol_name]}</option>`;
    }
    $("#tbody_permisos").html(row);

    $("#cmb_rol_user").html(opction); // select de roles - usuarios
    $("#cbm_roles").html(opction); // select de roles - permisos
    $("#frm_rol").addClass('visible').removeClass('notvisible');

    datatablepermiso = Helper.getDataTableRoles();
    setTimeout(function () {
      datatablepermiso.columns.adjust().draw();
    }, 500);

    if (docready) {
      docready = false;
      $("#frm_rol").addClass('notvisible').removeClass('visible');
      loadUsers(); // para poder tener el listado de roles
    }

    if (__msjalert != '') {
      Helper.hidePreloader();
      alertMessage(__msjalert, 'success', 'top-center', true);
      __msjalert = '';
    }

    if(hasloadtableuser){
      loadUsers(); // para poder tener el listado de roles
    }
  };


  function applyEditsRol(params) {
    _fly_rol
      .applyEdits(params)
      .then(function (editsResult) {
        let error = false;
        let status = '';
        switch (__action) {
          case 'add':
            status = editsResult.addFeatureResults[0].error;
            if (status == null) {
              __loadtableuser = false;
              __msjalert = 'Se registró correctamente';
              __codrolprevios = params.addFeatures[0].attributes[f_rol_cod];
            } else {
              error = true;
              __msjalert = `No se registró correctamente <br> ${status.message}`;
            }
            break;
          case 'edit':
            status = editsResult.updateFeatureResults[0].error;
            if (status == null) {
              __loadtableuser = true;
              __msjalert = 'Se modificó correctamente';
              setTimeout(function () {
                $('#tbl_permisos tr').css('background', '');
                $('#brn_addrol').text('Guardar');
              }, 10000);

            } else {
              error = true;
              __msjalert = `No se modificó correctamente <br> ${status.message}`;
            }
            break;
        }

        if (error) {
          alertMessage(__msjalert, 'warning', '', true);
          __msjalert = '';
          Helper.hidePreloader();
        } else {
          __action = '';
          __editfeature = {};
          clearinput();
          loadRoles(__loadtableuser);
        }

      })
      .catch(function (error) {
        console.log("error = ", error);
        Helper.hidePreloader();
        switch (__action) {
          case 'add':
            __msjalert = `No se registró correctamente <br> ${error.message}`;
            break;
          case 'edit':
            __msjalert = `No se modificó correctamente <br> ${error.message}`;
            break;
          case 'remove':
            __msjalert = `No se eliminó correctamente <br> ${error.message}`;
            $('#modalEliminar').modal('hide');
            break;
        }
        alertMessage(__msjalert, 'warning', '', true);
      });
  } 


  getLastRol();

  function getLastRol() {
    _queryt = new QueryTask({
      url: url_rol
    });

    let _qparams = new Query();
    _qparams.where = '1=1'; 
    _qparams.orderByFields = ['OBJECTID DESC'];
    _qparams.returnGeometry = false;
    _queryt.execute(_qparams).then(function (response) {
      let data = response.features;
      __codrolprevios = data[0].attributes[f_rol_cod];
    }).catch(function (error) {
      Helper.hidePreloader();
      console.log("query task error - carga inicial \n", error);
      if (error.message == 'Timeout exceeded') {
        loadRoles();
      }
    });
  }



  /**
   * Permisos - roles 
   */

  // Evento lanzado para asiganar que permisos tiene cada rol seleccionado
  $('#cbm_roles').change(function (e) {
    e.preventDefault();
    Helper.showPreloader();
    __codrol = $(this).val();

    if (isAdmin()) {
      if (__codrol != '') {
        getPermiso();
      } else {
        $('.checkbox-permiso').prop('checked', false);
        Helper.hidePreloader();
      }
    } else {
      redirectHome();
    }
  });

  // Evento lanzado para guardar la asignacion de nuevos permisos al rol seleccionado
  $("#btn_addrolpermiso").click(function (e) {
    e.preventDefault();
    Helper.showPreloader();

    let permisos = [];
    if (isAdmin()) {
      if (__codrol != '') {

        __cachepermisos = __cachepermisos.filter(permisos => permisos.id !== __codrol); //eliminar del __cachepermisos el array de permisos que se va a editar para actualizar su data

        let $permisos = $('#boxbody_permisos .checkbox-permiso');
        let auxlength = $permisos.length;
        let count = 0;
        for (let i = 0; i < auxlength; i++) { //selecciono los nuevos permisos(permisos) y los permisos modificados (__arr_permisos) por separado
          const element = $permisos[i];
          const codcomponente = element.id;
          const estado = element.checked;
          if (codcomponente != '' && __codrol != '') {
            let index_permiso = $.inArray(codcomponente, __arr_permisos);

            if (estado) {
              if (index_permiso != -1) {
                __arr_permisos.splice(index_permiso, 1);
              } else {
                permisos.push({
                  'codcomponente': codcomponente,
                  'asignado': 0
                });
              }
            }
          }
        }

        let auxlength2 = __arr_permisos.length;
        for (let i = 0; i < auxlength2; i++) { // unir los permisos modificados( __arr_permisos ) al array de los nuevos permisos( permisos )
          permisos.push({
            'codcomponente': __arr_permisos[i],
            'asignado': 1
          });
        }

        let msjalert = '¡Se detectaron algunos incovenientes! <br> Por favor, verificar los siguientes permisos: <br>';
        let titlepermiso = '';
        let iserror = false;
        let auxlength3 = permisos.length;

        if (auxlength3 > 0) {
          for (let i = 0; i < auxlength3; i++) {
            let item = permisos[i];

            _fly_permisos
              .queryFeatures({
                outFields: ["*"],
                where: `${f_perm_codrol} = '${__codrol}' and ${f_perm_codcomponente} = '${item.codcomponente}'`,
                returnGeometry: false
              })
              .then(function (results) {
                let edits = {};
                let action = '';
                if (results.features.length > 0) {
                  let editFeature = results.features[0];
                  editFeature.attributes[f_perm_estado] = item.asignado;
                  edits = {
                    updateFeatures: [editFeature]
                  };
                  action = 'edit';
                } else {
                  let attributes = {};
                  attributes[f_perm_codrol] = __codrol;
                  attributes[f_perm_codcomponente] = item.codcomponente;
                  attributes[f_perm_estado] = item.asignado;
                  let addFeature = {
                    attributes: attributes
                  }
                  edits = {
                    addFeatures: [addFeature]
                  };
                  action = 'add';
                }

                _fly_permisos // guardar los permisos en featureLayer
                  .applyEdits(edits)
                  .then(function (editsResult) {
                    count++;
                    let status = '';

                    switch (action) {
                      case 'add':
                        status = editsResult.addFeatureResults[0].error;
                        if (status == null) {} else {
                          iserror = true;
                          titlepermiso = $(`#${edits.addFeatures[0].attributes[f_perm_codcomponente]}`).parent().text();
                          msjalert += `- ${titlepermiso} <br>`;
                          console.log(status);
                        }
                        break;
                      case 'edit':
                        status = editsResult.updateFeatureResults[0].error;
                        if (status == null) {} else {
                          iserror = true;
                          titlepermiso = $(`#${edits.updateFeatures[0].attributes[f_perm_codcomponente]}`).parent().text();
                          msjalert += `- ${titlepermiso} <br>`;
                          console.log(status);
                        }
                        break;
                    }

                    if (auxlength3 == count) {
                      getPermiso();
                      if (iserror) {
                        alertMessage(msjalert, 'warning');
                      } else {
                        alertMessage('Se realizó la operación satisfactoriamente', 'success', '', true);
                      }
                    }
                  })
                  .catch(function (error) {
                    count++;
                    iserror = true;
                    console.log('catch - apply');
                    console.log(`Permiso con error - ${titlepermiso} \n`, error);
                    switch (action) {
                      case 'add':
                        titlepermiso = $(`#${edits.addFeatures[0].attributes[f_perm_codcomponente]}`).parent().text();
                        msjalert += `- ${titlepermiso} <br>`;
                        break;
                      case 'edit':
                        titlepermiso = $(`#${edits.updateFeatures[0].attributes[f_perm_codcomponente]}`).parent().text();
                        msjalert += `- ${titlepermiso} <br>`;
                        break;
                    }

                    if (auxlength3 == count) {
                      getPermiso();
                      alertMessage(msjalert, 'warning');
                    }
                  });

              })
              .catch(function (error) {
                count++;
                iserror = true;
                titlepermiso = $(`#${item.codcomponente}`).parent().text();
                msjalert += `- ${titlepermiso} <br>`;
                console.log('catch - query');
                console.log(`Permiso con error - ${titlepermiso} \n`, error);
                if (auxlength3 == count) {
                  getPermiso();
                  alertMessage(msjalert, 'warning');
                }
              })
          }
        } else {
          getPermiso();
          alertMessage('No hay cambios.', 'info', '', true);
        }

      } else {
        Helper.hidePreloader();
        alertMessage('Seleccione un rol', 'warning', '', true);
      }
    } else {
      redirectHome();
    }
  });


  function getPermiso() {
    __arr_permisos = [];

    let cachedata = __cachepermisos.find(response => response.id == __codrol); // caché de resultados de permisos

    if (typeof cachedata === 'undefined') {

      _fly_permisos
        .queryFeatures({
          where: `${f_perm_codrol} = '${__codrol}'`,
          outFields: ["*"],
          returnGeometry: false,
        })
        .then(function (response) {
          __cachepermisos.push({
            id: __codrol,
            response: response
          });
          renderPermisos(response);
        })
        .catch(function (error) {
          console.log('error \n' + error);
          Helper.hidePreloader();
        })

    } else {
      renderPermisos(cachedata.response);
    }
  }

  function renderPermisos(response) {
    let data = response.features;
    let auxlength = data.length;
    $('.checkbox-permiso').prop('checked', false);
    $('.checkbox-permiso[data-public]').prop('checked', true);

    for (let i = 0; i < auxlength; i++) {
      const item = data[i].attributes;
      const estado = item[f_perm_estado];
      
      if (estado == 0) {
        __arr_permisos.push(item[f_perm_codcomponente]);
        $(`#${item[f_perm_codcomponente]}`).prop('checked', true);
      }
    }
    Helper.hidePreloader();
  }


  //********************** FUNCIONES Y EVENTOS DE APOYO *****************************//

  // Eventos lanzados para cambiar de pestañas 
  $("#nav_itemuser").on('click', function () {
    limpiar();
    $("#container_user").addClass('visible').removeClass('notvisible');;
    $("#nav_itemuser").css('background-color', 'rgb(247, 245, 245)');
    $("#nav_itemrol").css('background-color', 'white');

    datatableuser.columns.adjust().draw();
  });

  $("#nav_itemrol").on('click', function () {
    limpiar();
    $("#container_rol").addClass('visible').removeClass('notvisible');;
    $("#nav_itemuser").css('background-color', 'white');
    $("#nav_itemrol").css('background-color', 'rgb(247, 245, 245)');
  });

  // Eventos lanzados para regresar a la pestaña anterior - permisos
  $("#btn_previosrol").on('click', function () {
    limpiar();
    $("#container_rol").addClass('visible').removeClass('notvisible');;
  });

  // Eventos lanzados para cancelar la edicion de datos del usuario
  $('#btn_canceluser, #modalusuario .close').on('click', function () {
    $('#modalusuario').modal('hide');
    $('#tbl_users tr').css('background', '');
    clearOperationUser();
  });

  $('#modalEliminar').on('click', '#not_btneliminar, .close', function () {
    console.log('cancelar operación');
    $('#modalEliminar').modal('hide');
    $('#tbl_users tr').css('background', '');
    clearOperationUser();
  });

  // Evento lanzado para hacer toggle al grupo de permiso
  $(".lbl-grouppermiso").click(function (e) {
    $(this).find('.btn-toggle').toggleClass('icon-chevron-down icon-chevron-up');
    let idcontainer = $(this).attr('data-containerpermiso');
    $(idcontainer).toggle(100);

  });

  // Evento lanzado para generar usuario y contraseña
  $('#btn_generateuser').on('click', function () {
    let nombre = ($('#txt_name').val()).split(' ')[0];
    let apellido = ($('#txt_lastname').val()).split(' ')[0];
    let num = Math.floor(Math.random() * (10 - 99)) + 100;
    let user = (nombre + apellido + num).toLowerCase();
    user = user.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    $('#txt_user').val(user);
    $('#txt_pass').val(user);
  });

  // evento lanzado para resetear contraseña
  $('#btn_generatepass').on('click', function () {
    let $txtpass = document.getElementById("txt_pass");
    let num = Math.floor(Math.random() * (999 - 100)) + 100;
    let newpass = ("recovered" + num).toLowerCase();
    $txtpass.value = newpass;
    $txtpass.type = "text";
    __updatedpass = true;
  });

  // Evento para solo cerrar el modal desde cancelar o cerrar
  $('#modalusuario, #modalEliminar').modal({
    keyboard: false,
    backdrop: 'static',
    show: false
  })


  function validarUser() {
    $('.form-group > div').removeClass('error');
    $('.form-group > div .lbl-error').remove();

    let v_continue = true;
    let counterror = 0;

    if ($('#txt_name').val().trim() === '') {
      $('#txt_name').parent().addClass('error').append('<span class=lbl-error> Nombre obligatorio</span>');
      counterror++;
    }
    if ($('#txt_lastname').val().trim() === '') {
      $('#txt_lastname').parent().addClass('error').append('<span class=lbl-error>Apellidos obligatorio</span>');
      counterror++;
    }
    if ($('#cmb_rol_user').val().trim() === '') {
      $('#cmb_rol_user').parent().addClass('error').append('<span class=lbl-error> Rol obligatorio</span>');
      counterror++;
    }
    if ($('#txt_user').val().trim() === '') {
      $('#txt_user').parent().addClass('error').append('<span class=lbl-error> Usuario obligatorio</span>');
      counterror++;
    }
    if ($('#txt_pass').val().trim() === '') {
      $('#txt_pass').parent().addClass('error').append('<span class="lbl-error ml-2"> Contraseña obligatorio</span>');
      counterror++;
    }

    $('.form-group > div.error:first input').focus();

    if (counterror != 0) {
      v_continue = false;
    }
    return v_continue;
  }

  function validationRol() {
    $('.container-input').removeClass('error');
    $('.container-input .lbl-error').remove();

    let v_continue = true;
    let counterror = 0;

    if ($('#txt_namerol').val().trim() === '') {
      $('#txt_namerol').parent().addClass('error').append('<span class=lbl-error> Rol obligatorio</span>');
      counterror++;
    }

    $('.container-input.error:first input').focus();

    if (counterror != 0) {
      v_continue = false;
    }
    return v_continue;
  }

  function redirectHome() {
    alert('Usted no tiene permiso \nConsulte con su administrador');
    $(location).attr('href', '../index.html');
  }

  function clearinput() {
    $(".limpiar").val("");

    // valicaciones
    $('.form-group > div').removeClass('error');
    $('.form-group > div .lbl-error').remove();
    $('.container-input').removeClass('error');
    $('.container-input .lbl-error').remove();
  }

  function limpiar() {

    $("#container_user").addClass('notvisible').removeClass('visible');
    $("#container_rol").addClass('notvisible').removeClass('visible');

    $("#frm_rol").addClass('notvisible').removeClass('visible');
    $(".limpiar").val("");

    // validaciones
    $('.form-group > div').removeClass('error');
    $('.form-group > div .lbl-error').remove();
    $('.container-input').removeClass('error');
    $('.container-input .lbl-error').remove();
  }

  function isAdmin() {
    let isadmin = false;
    (Cookies.get('isadmin') || Cookies.get('issuperadmin')) ? isadmin = true: '';
    return isadmin;
  }

  function clearOperationUser() {
    __editfeature = {};
    __objectid = '';
    __action = '';

    clearinput();
    $('#tbl_users tr').css('background', '');
  }

});

/* REVISADO ♣ */