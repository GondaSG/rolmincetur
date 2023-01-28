package pe.gob.vuce.template.siges.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pe.gob.vuce.template.siges.domain.Pais;
import pe.gob.vuce.template.siges.service.PaisService;

@RestController
@RequestMapping(value="pais")
public class PaisController {
	
	@Autowired
	PaisService paisService;
	
	@GetMapping
	public ResponseEntity<List<Pais>> findAll(){
		return ResponseEntity.ok(paisService.findAll());
	}

}
