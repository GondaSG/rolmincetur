package pe.gob.vuce.template.siges.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pe.gob.vuce.template.siges.domain.OrigenNotificacion;
import pe.gob.vuce.template.siges.entity.ResponseEntity;
import pe.gob.vuce.template.siges.service.OrigenNotificacionService;

@RestController
@RequestMapping(value="origenNotificacion")
public class OrigenNotificacionController extends BaseController {
	
	@Autowired
	OrigenNotificacionService _service;
	
	@GetMapping
	public ResponseEntity<OrigenNotificacion> findAll(){
		ResponseEntity<OrigenNotificacion> response = new ResponseEntity<>();
		try {
			response = this._service.findAll();
		} catch (Exception ex) {
			response.setMessage(ex);
		}
		return response;
	}

}
