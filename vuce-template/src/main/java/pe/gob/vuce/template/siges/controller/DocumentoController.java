package pe.gob.vuce.template.siges.controller;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import pe.gob.vuce.template.siges.domain.Documento;
import pe.gob.vuce.template.siges.domain.FuenteNotificacion;
import pe.gob.vuce.template.siges.entity.ResponseEntity;
import pe.gob.vuce.template.siges.repository.DocumentoRepository;
import pe.gob.vuce.template.siges.service.DocumentoService;

@RestController
@RequestMapping(value="documento")
public class DocumentoController {
	@Autowired
	DocumentoService documentoService;
	@PostMapping("uploadFile")
	public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file){
		try {
			documentoService.save(file);
			return null;
		} catch (Exception ex) {
			return null;
		}
	}
	@GetMapping("/download")
	public void downloadFile(@Param("id") Long id, HttpServletResponse response) throws Exception{
		Documento documento = documentoService.findById(id);
		response.setContentType("application/octet-stream");
		String headerKey = "Content-Disposition";
		String headerValue = "attachment; filename=" + documento.getName();
		response.setHeader(headerKey,headerValue);
		response.getOutputStream();
	}
}
