package pe.gob.vuce.template.siges.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pe.gob.vuce.template.siges.domain.CategoriaAlimento;
import pe.gob.vuce.template.siges.domain.TipoPresentacion;
import pe.gob.vuce.template.siges.entity.ResponseEntity;
import pe.gob.vuce.template.siges.service.TipoPresentacionService;

@RestController
@RequestMapping(value="tipopresentacion")
public class TipoPresentacionController {

	@Autowired
	TipoPresentacionService _service;

	@GetMapping
	public ResponseEntity<TipoPresentacion> findAll(){
		ResponseEntity<TipoPresentacion> response = new ResponseEntity<>();
		try {
			response = this._service.findAll();
		} catch (Exception ex) {
			response.setMessage(ex);
		}
		return response;
	}
}	
