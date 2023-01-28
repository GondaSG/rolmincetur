package pe.gob.vuce.template.siges.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pe.gob.vuce.template.siges.domain.UnidadMedida;
import pe.gob.vuce.template.siges.service.UnidadMedidaService;

@RestController
@RequestMapping(value="unidadMedida")
public class UnidadMedidaController {

	@Autowired
	UnidadMedidaService unidadMedidaService;
	
	@GetMapping
	public ResponseEntity<List<UnidadMedida>> findAll(){
		return ResponseEntity.ok(unidadMedidaService.findAll());
	}
	
	@PostMapping
	public ResponseEntity<UnidadMedida> create(@RequestBody UnidadMedida unidadMedida){
		UnidadMedida response = unidadMedidaService.create(unidadMedida);
		
		return new ResponseEntity<UnidadMedida>(response, HttpStatus.CREATED);
	}
	
	@PutMapping
	public ResponseEntity<UnidadMedida> update(@RequestBody UnidadMedida unidadMedida){
		UnidadMedida unidMedidaExists = unidadMedidaService.findById(unidadMedida.getId());
		if (unidMedidaExists.getId()==0) {
			
		}
		
		UnidadMedida response = unidadMedidaService.update(unidadMedida);
		return ResponseEntity.ok(response);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id") int id){
		UnidadMedida unidadMedida = unidadMedidaService.findById(id);
		if (unidadMedida.getId()==0) {
			
		}
		unidadMedidaService.delete(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<UnidadMedida> findById(@PathVariable("id") int id){
		UnidadMedida unidadMedida = unidadMedidaService.findById(id);
		if(unidadMedida.getId()==0) {
			
		}
		return ResponseEntity.ok(unidadMedida);
	}
}
