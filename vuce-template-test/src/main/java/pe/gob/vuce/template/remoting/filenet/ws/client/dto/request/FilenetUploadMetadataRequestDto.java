package pe.gob.vuce.template.remoting.filenet.ws.client.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
public class FilenetUploadMetadataRequestDto {
	private String Key;
	private double value;
}
