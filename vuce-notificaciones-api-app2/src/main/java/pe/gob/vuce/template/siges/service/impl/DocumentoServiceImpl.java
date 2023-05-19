package pe.gob.vuce.template.siges.service.impl;

import java.sql.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import pe.gob.vuce.template.siges.domain.Documento;
import pe.gob.vuce.template.siges.repository.DocumentoRepository;
import pe.gob.vuce.template.siges.service.DocumentoService;

//@Service
public class DocumentoServiceImpl //implements DocumentoService 
{

	@Autowired
	DocumentoRepository documentoRepository;
	//@Override
	@Transactional
	public void save(MultipartFile multipartFile) {
		try {
			Documento documento = new Documento();
			documento.setName(StringUtils.cleanPath(multipartFile.getOriginalFilename()));
			documento.setContent(multipartFile.getBytes());
			documento.setSize(multipartFile.getSize());
			//documento.setUploadTime(new Date());
			//documentoRepository.save(documento);
		} catch (Exception e) {
			// TODO: handle exception
		}
		
	}
	//@Override
	public void save(List<MultipartFile> files, int notificacionId, String detalle, java.util.Date fechaCreacion) {
		for (MultipartFile multipartFile : files) {
			Documento documento = new Documento();
			documento.setName(StringUtils.cleanPath(multipartFile.getOriginalFilename()));
			//documento.setContent(multipartFile.getBytes());
			documento.setSize(multipartFile.getSize());
			//documento.setUploadTime(new Date());
			//documentoRepository.save(documento);
		}
		
		
	}
	//@Override
	public Documento findById(Long id) throws Exception {
		Optional<Documento> result = null;//documentoRepository.findById(id);
		if(!result.isPresent())
			throw new Exception("no se encontro el archivo con el Id: " + id);
		return result.get();
	}

}
