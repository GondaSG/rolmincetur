package pe.gob.vuce.template.remoting.filenet.ws.client.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
public class FilenetUploadRequestDto {
	private String codigoExpediente;
	private String tipoExpediente;
	private String codComponente;
	private String orden;
	private String nombre;
	private String bytes;
	private List<FilenetUploadMetadataRequestDto> metadata;	
}
