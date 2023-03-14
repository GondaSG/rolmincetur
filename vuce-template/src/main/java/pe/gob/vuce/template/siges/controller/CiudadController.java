package pe.gob.vuce.template.siges.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pe.gob.vuce.template.siges.domain.Ciudad;
import pe.gob.vuce.template.siges.domain.TipoAlimento;
import pe.gob.vuce.template.siges.entity.ResponseEntity;
import pe.gob.vuce.template.siges.service.CiudadService;

@RestController
@RequestMapping(value="ciudad")
public class CiudadController extends BaseController {

	@Autowired
	CiudadService _service;
	
	@GetMapping
	public ResponseEntity<Ciudad> findAll(){
		ResponseEntity<Ciudad> response = new ResponseEntity<>();
		try {
			response = this._service.findAll();
		} catch (Exception ex) {
			response.setMessage(ex);
		}
		return response;
	}
	
	@GetMapping("/buscarpais/{id}")
	public ResponseEntity<Ciudad> findById(@PathVariable("id") int id) {
		try {
			ResponseEntity<Ciudad> response = this._service.findById(id);
			return response;
		} catch (Exception ex) {
			return super.getJSON(ex);
		}
	}
}
