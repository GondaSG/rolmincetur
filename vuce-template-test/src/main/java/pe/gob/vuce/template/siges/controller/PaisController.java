package pe.gob.vuce.template.siges.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pe.gob.vuce.template.siges.domain.Pais;
import pe.gob.vuce.template.siges.entity.ResponseEntity;
import pe.gob.vuce.template.siges.service.PaisService;

@RestController
@RequestMapping(value="pais")
public class PaisController extends BaseController {
	
	@Autowired
	PaisService _service;
	
	@GetMapping
	public ResponseEntity<Pais> findAll(){
		ResponseEntity<Pais> response = new ResponseEntity<>();
		try {
			response = this._service.findAll();
		} catch (Exception ex) {
			response.setMessage(ex);
		}
		return response;	
	}

}
