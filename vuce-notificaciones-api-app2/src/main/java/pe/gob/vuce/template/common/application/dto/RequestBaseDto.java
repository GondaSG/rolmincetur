package pe.gob.vuce.template.common.application.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import pe.gob.vuce.template.authorize.application.enumeration.RequestBodyType;

@Data
@SuperBuilder
@NoArgsConstructor
public class RequestBaseDto {
	protected RequestBodyType requestBodyType;
}
