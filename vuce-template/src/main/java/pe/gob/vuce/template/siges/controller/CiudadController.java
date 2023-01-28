package pe.gob.vuce.template.siges.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pe.gob.vuce.template.siges.domain.Ciudad;
import pe.gob.vuce.template.siges.service.CiudadService;

@RestController
@RequestMapping(value="ciudad")
public class CiudadController {

	@Autowired
	CiudadService ciudadService;
	
	@GetMapping
	public ResponseEntity<List<Ciudad>> findAll(){
		return ResponseEntity.ok(ciudadService.findAll());
	}
}
