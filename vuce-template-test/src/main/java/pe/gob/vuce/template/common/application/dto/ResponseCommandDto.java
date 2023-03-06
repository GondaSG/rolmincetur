package pe.gob.vuce.template.common.application.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
public class ResponseCommandDto {
	private Object response;
	private String message;
	private Integer status;
	private Boolean error;
}
