package pe.gob.vuce.template.authorize.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pe.gob.vuce.template.authorize.application.UsuarioApplicationService;
import pe.gob.vuce.template.authorize.application.dto.UsuarioDto;
import pe.gob.vuce.template.common.controller.ResponseHandler;

@RestController
@RequestMapping("v1/vuce-services/template/users")
public class UsuariosController {
    @Autowired
    UsuarioApplicationService userApplicationService;

    @Autowired
    ResponseHandler responseHandler;

    @RequestMapping(method = RequestMethod.GET, path = "/byid", produces = "application/json; charset=UTF-8")
    public ResponseEntity<Object> get(@RequestParam(value = "userId", required = true, defaultValue = "0") Long usuarioId) throws Exception {
        try {
            UsuarioDto usuarioDto = userApplicationService.getById(usuarioId);
            if (usuarioDto != null) return this.responseHandler.getResponse(usuarioDto, HttpStatus.OK, "");
            return this.responseHandler.getResponse(usuarioDto, HttpStatus.OK, "No se encontr� informaci�n!");
        } catch (IllegalArgumentException ex) {
            return this.responseHandler.getAppCustomErrorResponse(ex.getMessage());
        } catch (Exception ex) {
            ex.printStackTrace();
            return this.responseHandler.getAppExceptionResponse();
        }
    }
}
