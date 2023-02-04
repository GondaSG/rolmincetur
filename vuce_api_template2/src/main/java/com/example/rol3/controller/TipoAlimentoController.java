package com.example.rol3.controller;

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

import com.example.rol3.domain.TipoAlimento;
import com.example.rol3.service.TipoAlimentoService;

@RestController
@RequestMapping(value="tipoAlimento")
public class TipoAlimentoController {
	
	@Autowired
	TipoAlimentoService tipoAlimentoService;
	
	@GetMapping
	public ResponseEntity<List<TipoAlimento>> findAll(){
		return ResponseEntity.ok(tipoAlimentoService.findAll());		
	}

	@PostMapping
	public ResponseEntity<TipoAlimento> create(@RequestBody TipoAlimento tipoAlimento){
		TipoAlimento response = tipoAlimentoService.create(tipoAlimento);
		
		return new ResponseEntity<TipoAlimento>(response, HttpStatus.CREATED);
	}
	
	@PutMapping
	public ResponseEntity<TipoAlimento> update(@RequestBody TipoAlimento tipoAlimento){
		TipoAlimento tipoAlimentoExists = tipoAlimentoService.findById(tipoAlimento.getId());
		if (tipoAlimentoExists.getId()==0) {
			
		}
		
		TipoAlimento response = tipoAlimentoService.update(tipoAlimento);
		return ResponseEntity.ok(response);		
	}
	
	@DeleteMapping
	public ResponseEntity<Void> delete(@PathVariable("id") int id){
		TipoAlimento tipoAlimento = tipoAlimentoService.findById(id);
		if (tipoAlimento.getId()==0) {
			
		}
		tipoAlimentoService.delete(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);		
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<TipoAlimento> findById(@PathVariable("id") int id) {
		TipoAlimento tipoAlimento = tipoAlimentoService.findById(id);
		if(tipoAlimento.getId()==0) {
			
		}
		return ResponseEntity.ok(tipoAlimento);
	}
	
	
}
