package pe.gob.vuce.template.siges.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pe.gob.vuce.template.siges.domain.OrigenNotificacion;
import pe.gob.vuce.template.siges.service.OrigenNotificacionService;

@RestController
@RequestMapping(value="origenNotificacion")
public class OrigenNotificacionController {
	
	@Autowired
	OrigenNotificacionService origenNotificacionService;
	
	@GetMapping
	public ResponseEntity<List<OrigenNotificacion>> findAll(){
		return ResponseEntity.ok(origenNotificacionService.findAll());
	}

}
