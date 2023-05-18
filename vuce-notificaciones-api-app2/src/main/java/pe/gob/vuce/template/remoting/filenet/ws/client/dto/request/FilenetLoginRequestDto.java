package pe.gob.vuce.template.remoting.filenet.ws.client.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
public class FilenetLoginRequestDto {
	private String username;
	private String password;
}
