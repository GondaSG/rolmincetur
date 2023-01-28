package pe.gob.vuce.template.siges.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pe.gob.vuce.template.siges.domain.TipoPresentacion;
import pe.gob.vuce.template.siges.service.TipoPresentacionService;

@RestController
@RequestMapping(value="tipoPresentacion")
public class TipoPresentacionController {

	@Autowired
	TipoPresentacionService tipoPresentacionService;

	@GetMapping
	public ResponseEntity<List<TipoPresentacion>> findAll(){
		return ResponseEntity.ok(tipoPresentacionService.findAll());
	}
}	
