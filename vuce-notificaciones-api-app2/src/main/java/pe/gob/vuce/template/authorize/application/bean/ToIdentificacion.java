package pe.gob.vuce.template.authorize.application.bean;

import lombok.Getter;
import lombok.Setter;
import pe.gob.vuce.template.authorize.application.dto.UserAuthDto;

@Getter
@Setter
public class ToIdentificacion {
    private UserAuthDto userAuth;
    private ResponseModel response;
}
