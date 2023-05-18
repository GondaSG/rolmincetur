package pe.gob.vuce.template.siges.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pe.gob.vuce.template.siges.domain.TipoNotificacion;
import pe.gob.vuce.template.siges.entity.ResponseEntity;
import pe.gob.vuce.template.siges.service.TipoNotificacionService;

@RestController
@RequestMapping(value="tipoNotificacion")
public class TipoNotificacionController {

	@Autowired
	TipoNotificacionService _service;
	
	@GetMapping
	public ResponseEntity<TipoNotificacion> findAll(){
		ResponseEntity<TipoNotificacion> response = new ResponseEntity<>();
		try {
			response = this._service.findAll();
		} catch (Exception ex) {
			response.setMessage(ex);
		}
		return response;
	}
}
