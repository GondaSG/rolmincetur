package pe.gob.vuce.template.siges.service;

import org.springframework.web.multipart.MultipartFile;

import pe.gob.vuce.template.siges.domain.Documento;

public interface DocumentoService {
	
	public void save(MultipartFile multipartFile);
	
	public Documento findById(Long id)  throws Exception;
}
