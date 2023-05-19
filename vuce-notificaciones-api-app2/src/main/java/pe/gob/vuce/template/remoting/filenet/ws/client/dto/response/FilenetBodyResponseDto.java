package pe.gob.vuce.template.remoting.filenet.ws.client.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
public class FilenetBodyResponseDto {
	private String code;
	private String title;
	private String description;
}
