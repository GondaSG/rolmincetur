package pe.gob.vuce.template.siges.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pe.gob.vuce.template.siges.domain.TipoDocumento;
import pe.gob.vuce.template.siges.entity.ResponseEntity;
import pe.gob.vuce.template.siges.service.TipoDocumentoService;

@RestController
@RequestMapping(value="tipodocumento")
public class TipoDocumentoController extends BaseController {
	
	@Autowired
	TipoDocumentoService _service;
	
	@GetMapping
	public ResponseEntity<TipoDocumento> findAll(){
		ResponseEntity<TipoDocumento> response =new ResponseEntity<>();
		try {
			response = this._service.findAll();
		} catch (Exception ex) {
			response.setMessage(ex);
		}
		return response;		
	}	
}
