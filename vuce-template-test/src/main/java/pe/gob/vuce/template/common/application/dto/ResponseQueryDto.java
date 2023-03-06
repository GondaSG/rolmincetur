package pe.gob.vuce.template.common.application.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
public class ResponseQueryDto<T> {
	private List<T> data;
	private String message;
	private Integer status;
	private Boolean error;
}
