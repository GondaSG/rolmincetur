define([
    "js/helper",
    "js/core/services",

    "esri/tasks/QueryTask",
    "esri/tasks/support/Query"

], function(
    Helper,
    Services,

    QueryTask,
    Query


) {

    var url_usuario = Services.getUrlUsuario();
    var url_permiso = Services.getUrlPermiso();

    var __fly_users = Services.getFlyUsuarios();


    // INICIAR SESION 

    $('#btn_login').on('click', function() {
        $('#modal_login').modal('show');
    });

    $('#form_login').on('submit', function(evt) {
        evt.preventDefault();
        Helper.showPreloader();

        let user = $('#txt_user').val();
        let password = $('#txt_password').val();

        let sql = `USERNAME = '${user}'`;
        let _queryt = new QueryTask({ url: url_usuario }),
            _qparams = new Query();
        _qparams.outFields = ["NOMBRES", "PASSWORD", "COD_ROL", "OBJECTID"];
        _qparams.where = sql;
        _queryt.execute(_qparams).then(function(response) {
            debugger;
            let nreg = response.features.length;
            if (nreg == 0) {
                Helper.hidePreloader();
                alertMessage('Este usuario no existe en nuestra BD', 'error', '', true);
            } else {
                let features = response.features;
                let incipherpass = Helper.encryptWithAES(password);
                let objectiduser = '';
                let codrol = '';
                let token = '';
                let existspass = false;
                for (let i = 0; i < features.length; i++) {
                    let feature = features[i].attributes;
                    let mycipherpass = feature["PASSWORD"];

                    let mypassbytes = Helper.decryptWithAES(mycipherpass);
                    let inpassbytes = Helper.decryptWithAES(incipherpass); //desencriptado a nivel de bytes
                    if (inpassbytes == mypassbytes) {
                        objectiduser = feature["OBJECTID"];
                        codrol = feature["COD_ROL"];
                        existspass = true;
                        let num = Math.floor(Math.random() * (999 - 100)) + 100
                        token = moment().format('x') + '&' + num;
                        break;
                    }
                }

                if (existspass) {
                    Cookies.set('auxpass', incipherpass);
                    Cookies.set('auxobjectid', objectiduser);
                    Cookies.set('user', user);
                    Cookies.set('id_rol', codrol);

                    if (codrol === 'r000') { // superadmin
                        Cookies.set('issuperadmin', true);
                        Cookies.set('token', token);
                        window.location.reload();

                    } else if (codrol === 'r001') { // admin
                        Cookies.set('isadmin', true);
                        Cookies.set('token', token);
                        window.location.reload();

                    } else {
                        let sql2 = `COD_ROL = '${codrol}'`;
                        let _queryt2 = new QueryTask({
                                url: url_permiso
                            }),
                            _qparams2 = new Query();
                        _qparams2.outFields = ["*"];
                        _qparams2.where = sql2;
                        _queryt2.execute(_qparams2).then(function(response) {

                            const componentes = response.features;
                            const auxlength = componentes.length;
                            for (let i = 0; i < auxlength; i++) {
                                const componente = componentes[i].attributes;
                                if (componente.ASIGNADO == 0) {
                                    const namepermiso = componente.COD_COMPONENTE;
                                    Cookies.set(namepermiso, true);
                                }
                            }
                            window.location.reload();
                        });
                    }
                } else {
                    Helper.hidePreloader();
                    alertMessage('Contraseña incorrecta. <br> Si olvidó su contraseña solicite una nueva al administrador.', 'error', '', true);
                }
            }
        }).catch(function(error) {
            Helper.showError(error);
        });
    });

    $('#modal_login').on('hidden.bs.modal', function(e) {
        $('#form_login')[0].reset();
    });


    // CAMBIAR CONTRASEÑA

    $('#btn_changepass').on('click', function() {
        $('#modal_changepass').modal('show');
    });

    $('#form_changepass').on('submit', function(evt) {
        evt.preventDefault();
        Helper.showPreloader();

        let incurrentpass = $('#txt_currentpass').val();
        let innewpass = $('#txt_newpass').val();
        let inconfirmpass = $('#txt_confirmpass').val();

        let curr_pass_bytes = Helper.decryptWithAES(Cookies.get('auxpass'));
        let in_curr_pass_bytes = Helper.decryptWithAES(Helper.encryptWithAES(incurrentpass));

        if (incurrentpass == '' || innewpass == '' || inconfirmpass == '') {
            alertMessage('Por favor complete todos los campos.', 'warning', '', true);
            Helper.hidePreloader();
        } else if (innewpass != inconfirmpass) {
            alertMessage('La nueva contraseña no coincide. Por favor confirme correctamente.', 'warning', '', true);
            Helper.hidePreloader();
        } else if (in_curr_pass_bytes != curr_pass_bytes) {
            alertMessage('La actual contraseña ingresada es incorrecta.', 'warning', '', true);
            Helper.hidePreloader();
        } else {
            let objectiduser = Cookies.get('auxobjectid');
            let newpassencrypted = Helper.encryptWithAES(innewpass);
            let attributes = {};
            attributes["ObjectId"] = Number(objectiduser);
            attributes["PASSWORD"] = newpassencrypted;
            let params = {
                updateFeatures: [{
                    attributes: attributes
                }]
            };
            applyEditsPassword(params, newpassencrypted);
        }
    });

    function applyEditsPassword(params, newpassencrypted) {
        __fly_users
            .applyEdits(params)
            .then(function(editsResult) {
                let error = editsResult.updateFeatureResults[0].error;
                if (error == null) {
                    Helper.hidePreloader();
                    Cookies.set('auxpass', newpassencrypted);
                    alertMessage('Contraseña modificada correctamente', 'success', '', true);
                    $('#modal_changepass').modal('hide');
                    $('#form_changepass')[0].reset();
                } else {
                    Helper.hidePreloader();
                    alertMessage(`Ocurrió un error al modificar contraseña <br> ${error.message}`, 'warning', '', true);
                }
            })
            .catch(function(error) {
                console.log("error en applyEditsPassword: ", error);
                Helper.hidePreloader();
                __msjalert = `Ocurrió un error al modificar <br> ${error.message}`;
                alertMessage(__msjalert, 'warning', '', true);
            });
    }


    // CERRAR SESION

    $('#btn_exit').on('click', function() {
        Helper.showPreloader();
        $('#menu_logged').removeClass("visible").addClass("notvisible");
        $('#btn_login').removeClass("notvisible").addClass("visible");

        if (Cookies.get('issuperadmin')) {
            Cookies.remove('issuperadmin');
            Cookies.remove('token');
            window.location.reload();
        } else if (Cookies.get('isadmin')) {
            // Cookies.remove('id_rol');
            Cookies.remove('isadmin');
            Cookies.remove('token');
            window.location.reload();
        } else {
            let codrol = Cookies.get('id_rol');
            let sql2 = `COD_ROL = '${codrol}'`;
            let _queryt2 = new QueryTask({ url: url_permiso });
            _qparams2 = new Query();
            _qparams2.outFields = ["*"];
            _qparams2.where = sql2;
            _queryt2.execute(_qparams2).then(function(response) {
                let item = response.features;
                let auxlength = item.length;
                for (let i = 0; i < auxlength; i++) {
                    const element = item[i].attributes;
                    const namepermiso = element.COD_COMPONENTE;
                    if (element.ASIGNADO == 0) {
                        Cookies.remove(namepermiso);
                    }
                }
                window.location.reload();
            }).catch(function(error) {
                Helper.showError(error);
            });
        }

        Cookies.remove('auxpass');
        Cookies.remove('auxobjectid');
        Cookies.remove('user');
        Cookies.remove('id_rol');

    });

});

/* REVISADO ♣ */