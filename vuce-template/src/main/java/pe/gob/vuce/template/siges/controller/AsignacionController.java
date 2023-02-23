package pe.gob.vuce.template.siges.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pe.gob.vuce.template.siges.domain.Asignacion;
import pe.gob.vuce.template.siges.entity.ResponseEntity;
import pe.gob.vuce.template.siges.service.AsignadoService;

@RestController
@RequestMapping(value="asignado")
public class AsignacionController extends BaseController {
	
	@Autowired
	AsignadoService _service;
	
	@GetMapping
	public ResponseEntity<Asignacion> findAll(){
		ResponseEntity<Asignacion> response = new ResponseEntity<>();
		try {
			response = this._service.findAll();
		} catch (Exception ex) {
			response.setMessage(ex);
		}
		return response;	
	}

}
