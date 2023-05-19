package pe.gob.vuce.template.siges.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pe.gob.vuce.template.siges.domain.TipoUsuario;
import pe.gob.vuce.template.siges.entity.ResponseEntity;
import pe.gob.vuce.template.siges.service.TipoUsuarioService;

@RestController
@RequestMapping(value="tipousuario")
public class TipoUsuarioController {

	@Autowired
	TipoUsuarioService _service;
	
	@GetMapping
	public ResponseEntity<TipoUsuario> findAll(){
		ResponseEntity<TipoUsuario> response = new ResponseEntity<>();
		try {
			response = this._service.findAll();
		} catch (Exception ex) {
			response.setMessage(ex);
		}
		return response;
	}
}
