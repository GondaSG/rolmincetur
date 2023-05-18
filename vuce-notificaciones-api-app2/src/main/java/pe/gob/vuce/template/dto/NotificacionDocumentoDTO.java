package pe.gob.vuce.template.dto;

import java.util.Date;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonFormat;

public class NotificacionDocumentoDTO {
	private int NotificacionId;
	private String Detalle;
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date fechaCreacion;
	
	
}
