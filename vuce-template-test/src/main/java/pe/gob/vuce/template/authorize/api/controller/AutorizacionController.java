package pe.gob.vuce.template.authorize.api.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.util.WebUtils;
import pe.gob.vuce.template.authorize.application.AutorizacionApplicationService;
import pe.gob.vuce.template.authorize.application.UsuarioApplicationService;
import pe.gob.vuce.template.authorize.application.bean.ResponseModel;
import pe.gob.vuce.template.authorize.application.bean.ToIdentificacion;
import pe.gob.vuce.template.authorize.application.dto.UserAuthDto;
import pe.gob.vuce.template.authorize.application.dto.response.TokenDto;
import pe.gob.vuce.template.common.controller.ResponseHandler;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("authorization")
@Slf4j
public class AutorizacionController {

    @Value("${mincetur.template.ui-url}")
    private String MINCETUR_MYAPP_UI_URL;

    @Autowired
    AutorizacionApplicationService autorizacionApplicationService;

    @Autowired
    UsuarioApplicationService usuarioApplicationService;

    @Autowired
    ResponseHandler responseHandler;

    @RequestMapping(method = RequestMethod.GET, path = "/extranet", produces = "application/json; charset=UTF-8")
    public String login(HttpServletRequest request, Model model) throws Exception {
        try {
            String solIdXE = WebUtils.getCookie(request, "SOLIDXE").getValue();
            String sessionId = WebUtils.getCookie(request, "vuce_sesion_id").getValue();
            model.addAttribute("ui_url", MINCETUR_MYAPP_UI_URL);
            if (sessionId != null) {

                ToIdentificacion toIdentificacion = new ToIdentificacion();
                toIdentificacion.setUserAuth(new UserAuthDto());
                toIdentificacion.getUserAuth().setApplicationKey(solIdXE);
                toIdentificacion.getUserAuth().setIdSesion(sessionId);
                toIdentificacion.setResponse(new ResponseModel());

                this.autorizacionApplicationService.getUserInfo(toIdentificacion);

                //BYPASS. Solo para cuando MR est� fuera de servicio
		        /*toIdentificacion.setUserAuth(new UserAuthDto());
				toIdentificacion.getUserAuth().setUser(new UsuarioDto());
				toIdentificacion.getUserAuth().getUser().setUsuario("EXTA0086");
				toIdentificacion.getUserAuth().getUser().setId(6L);*/

                //log.info("getToken:Ruc: {}",toIdentificacion.getUserAuth().getUser().getPersona().getNroDocumento());
                log.info("getToken:Sol: {}", toIdentificacion.getUserAuth().getUser().getUsuarioSol());
                log.info("getToken:Id:  {}", toIdentificacion.getUserAuth().getUser().getId());

                UserAuthDto userAuthDto = usuarioApplicationService.validateUser(toIdentificacion.getUserAuth());
                if (userAuthDto.isAuthenticated()) {
                    model.addAttribute("token", userAuthDto.getBearerToken());
                    model.addAttribute("user", userAuthDto.getId().toString());
                }
            }
        } catch (Exception e) {
            log.info("Error::message: {}", e.getLocalizedMessage());
            model.addAttribute("errorMessage", e.getLocalizedMessage());
            model.addAttribute("token", "");
            model.addAttribute("user", "");
        }
        return "sessions";
    }

    @RequestMapping(method = RequestMethod.GET, path = "/reload-session", produces = "application/json; charset=UTF-8")
    public ResponseEntity<Object> get(
            @RequestParam(value = "sessionId", required = true) String sessionId) throws Exception {
        TokenDto token = new TokenDto();
        try {
            if (sessionId != null) {
                String solIdXE = "";
                ToIdentificacion toIdentificacion = new ToIdentificacion();
                toIdentificacion.setUserAuth(new UserAuthDto());
                toIdentificacion.getUserAuth().setApplicationKey(solIdXE);
                toIdentificacion.getUserAuth().setIdSesion(sessionId);
                toIdentificacion.setResponse(new ResponseModel());

                this.autorizacionApplicationService.getUserInfo(toIdentificacion);

                log.info("getToken:Sol: {}", toIdentificacion.getUserAuth().getUser().getUsuarioSol());
                log.info("getToken:Id:  {}", toIdentificacion.getUserAuth().getUser().getId());

                UserAuthDto userAuthDto = usuarioApplicationService.validateUser(toIdentificacion.getUserAuth());
                if (userAuthDto.isAuthenticated()) {
                    token.setToken(userAuthDto.getBearerToken());
                }
            }
        } catch (Exception e) {
            log.info("Error::message1: {}", e.getLocalizedMessage());
            log.info("Error::message2: {}", e.getMessage());
        }
        if (token != null) return this.responseHandler.getResponse(token, HttpStatus.OK, "");
        return this.responseHandler.getResponse(token, HttpStatus.OK, "No se encontr? informaci?n!");

    }
}
