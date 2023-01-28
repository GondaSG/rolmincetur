package pe.gob.vuce.template.siges.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pe.gob.vuce.template.siges.domain.TipoPeligro;
import pe.gob.vuce.template.siges.service.TipoPeligroService;

@RestController
@RequestMapping(value="tipoPeligro")
public class TipoPeligroController {

	@Autowired
	TipoPeligroService tipoPeligroService;
	
	@GetMapping ResponseEntity<List<TipoPeligro>> findAll(){
		return ResponseEntity.ok(tipoPeligroService.findAll());
	}
}
