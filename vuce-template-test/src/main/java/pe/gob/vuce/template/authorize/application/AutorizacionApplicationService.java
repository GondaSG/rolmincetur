package pe.gob.vuce.template.authorize.application;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import pe.gob.vuce.template.authorize.application.bean.ToIdentificacion;
import pe.gob.vuce.template.authorize.application.dto.PerfilDto;
import pe.gob.vuce.template.authorize.application.dto.UsuarioDto;
import pe.gob.vuce.template.authorize.domain.enumeration.PerfilType;
import pe.gob.vuce.template.authorize.domain.service.ValidationException;
import pe.gob.vuce.template.authorize.util.Constantes;
import pe.gob.vuce.template.authorize.util.Util;
import pe.gob.vuce.template.remoting.authorization.manager.ws.client.AuthorizationManagerWSClient;
import pe.gob.vuce.template.remoting.authorization.manager.ws.client.dto.response.VuceUserModel;
import pe.gob.vuce.template.remoting.authorization.manager.ws.client.properties.AuthenticationProperty;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class AutorizacionApplicationService {

    @Autowired
    private UsuarioApplicationService usuarioApplicationService;
    @Autowired
    private PerfilApplicationService perfilApplicationService;

    private final AuthenticationProperty authenticationProperties;

    public void getUserInfo(ToIdentificacion toIdentificacion) throws ValidationException {
        String idSesion = toIdentificacion.getUserAuth().getIdSesion();
        UsuarioDto usuarioDto = new UsuarioDto();
        log.info("GetUserInfo::idSesion: {}", idSesion);

        ResponseEntity<VuceUserModel> response = AuthorizationManagerWSClient.getSessionInfo(authenticationProperties, idSesion);
        log.info("GetUserInfo::message: {}", "se termino de invocar url de sesion");
        try {
            if (response.getStatusCode() == HttpStatus.OK) {
                toIdentificacion.getUserAuth().setAuthenticated(true);
                String usuarioSol = "";
                String numeroRuc = "";
                Date fechaRegistro = null;
                List<PerfilDto> perfiles = new ArrayList<PerfilDto>();
                // validate operator permissions
                if (response.getBody().getTipOrigen().equals("IT")) {
                    log.info("GetUserInfo::permission: {}", "IT login");

                    if (!response.getBody().checkIfUsuarioPrincipal()
                            && !response.getBody().getRoles().containsKey(PerfilType.PERFIL_OPERADOR.getCode())) {
                        toIdentificacion.getUserAuth().setAuthenticated(false);
                        throw new ValidationException(1, "Usted no tiene asignado el rol esperado");
                    }
                    toIdentificacion.getUserAuth().setTipUsuario("1");
                    usuarioSol = response.getBody().getUsuarioSOL();
                    numeroRuc = response.getBody().getNumRUC();
                } else { // validate exta users
                    log.info("GetUserInfo::permission: {}", "EXTA login");
                    PerfilDto perfil = null;
                    Boolean expirado = Boolean.FALSE;
                    Map.Entry<String, String> rol = null;
                    Date fechaActual = DateUtils.truncate(new Date(), Calendar.DATE);
                    Iterator<Map.Entry<String, String>> roles = response.getBody().getRoles().entrySet().iterator();
                    while (roles.hasNext()) {
                        rol = roles.next();
                        perfil = this.perfilApplicationService.getByCode(rol.getValue());
                        if (perfil != null) {
                            perfiles.add(perfil);
                        }
                        if (!(fechaActual.after(Util.getDateFromStr(perfil.getFechaIniVigencia(), Constantes.DATEFORMAT_DDMMYYYY))
                                && fechaActual.before(DateUtils.addDays(Util.getDateFromStr(perfil.getFechaFinVigencia(), Constantes.DATEFORMAT_DDMMYYYY), 1)))) {
                            expirado = Boolean.TRUE;
                            break;
                        }
                    }


                    if (expirado) {
                        throw new ValidationException(1, "Al menos uno de los roles asignados en el Sistema PENX ha expirado. Comun�quese con el Administrador del Sistema para habilitarlo.");
                    }

                    if (perfiles.isEmpty()) {
                        throw new ValidationException(1, "Usted no tiene asignado el rol esperado en SUNAT");
                    }
                    toIdentificacion.getUserAuth().setTipUsuario("4");

                    fechaRegistro = new SimpleDateFormat(Constantes.DATEFORMAT_DATE_AND_TIME_REPRESENTATION).parse((String) response.getBody().getMap().get("fecRegistro"));
                    usuarioSol = response.getBody().getLogin();
                    numeroRuc = (response.getBody().getNumRUC() != null && !response.getBody().getNumRUC().equals(""))
                            ? response.getBody().getNumRUC() : response.getBody().getLogin();
                }

                log.info("GetUserInfo::message: {}", "Se obtuvo los datos del usuario!");

                usuarioDto = this.getUsuario(fechaRegistro, numeroRuc, usuarioSol, perfiles, response.getBody());
                toIdentificacion.getUserAuth().setUser(usuarioDto);
                toIdentificacion.getUserAuth().setEsPrincipal(response.getBody().checkIfUsuarioPrincipal() ? "S" : "N");
                toIdentificacion.getUserAuth().setTipUsuario(response.getBody().getTipUsuario());
            }

        } catch (ParseException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        log.info("GetUserInfo::usuarioId: {}", usuarioDto.getId());
    }

    private UsuarioDto getUsuario(Date fechaRegistro, String numeroRuc, String usuarioSol, List<PerfilDto> perfiles, VuceUserModel body) {
        UsuarioDto usuarioDto = usuarioApplicationService.getByNameAndSOL(numeroRuc, usuarioSol);
        // If no exists user, create
        if (usuarioDto == null) {
            log.info("GetUserInfo::message: {}", "Guardando nuevo usuario");
            log.info("GetUserInfo::ruc: {}: ", numeroRuc);
            log.info("GetUserInfo::userSol: {}: ", usuarioSol);
            //User user = new User();
            usuarioDto = new UsuarioDto();
            usuarioDto.setFechaIniVigencia(fechaRegistro);
            usuarioDto.setFechaFinVigencia(DateUtils.addYears(fechaRegistro, 1));
            usuarioDto.setUsuario(numeroRuc);
            usuarioDto.setUsuarioSol(usuarioSol);

            PerfilDto perfil = null;
            if (body.getTipOrigen().equals("IT")) {
                perfil = new PerfilDto();
                perfil.setId(PerfilType.PERFIL_OPERADOR.getID());
                usuarioDto.addPerfil(perfil);
            } else {
                usuarioDto.addPerfiles(perfiles);
            }
            this.usuarioApplicationService.create(usuarioDto);
            usuarioDto = usuarioApplicationService.getByNameAndSOL(numeroRuc, usuarioSol);
        } else {
            Boolean actualizar = Boolean.FALSE;
            for (PerfilDto perfilSunat : perfiles) {
                actualizar = Boolean.TRUE;
                for (PerfilDto perfilBD : usuarioDto.getPerfiles()) {
                    if (perfilSunat.getPerfil().equalsIgnoreCase(perfilBD.getPerfil())) {
                        actualizar = Boolean.FALSE;
                        break;
                    }
                }
                if (actualizar) {
                    break;
                }
            }
            if (actualizar) {
                usuarioDto.getPerfiles().clear();
                usuarioDto.getPerfiles().addAll(perfiles);
                this.usuarioApplicationService.update(usuarioDto);
            }
        }
        return usuarioDto;
    }
}
