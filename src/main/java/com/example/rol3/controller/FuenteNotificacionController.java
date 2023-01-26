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

import com.example.rol3.domain.FuenteNotificacion;
import com.example.rol3.service.FuenteNotificacionService;

@RestController
@RequestMapping(value="fuenteNotificacion")
public class FuenteNotificacionController {
	
	@Autowired
	FuenteNotificacionService fuenteNotificacionService;

	@GetMapping
	public ResponseEntity<List<FuenteNotificacion>> findAll(){
		return ResponseEntity.ok(fuenteNotificacionService.findAll());
	}
	
	@PostMapping
	public ResponseEntity<FuenteNotificacion> create(@RequestBody FuenteNotificacion fuentesNotificacion){
		FuenteNotificacion response = fuenteNotificacionService.create(fuentesNotificacion);
		
		return new ResponseEntity<FuenteNotificacion>(response, HttpStatus.CREATED);
	}
	
	@PutMapping
	public ResponseEntity<FuenteNotificacion> update(@RequestBody FuenteNotificacion fuenteNotificacion){
		FuenteNotificacion fuenteNotificacionExists = fuenteNotificacionService.findById(fuenteNotificacion.getId());
		if (fuenteNotificacionExists.getId()==0) {
			
		}
		
		FuenteNotificacion response = fuenteNotificacionService.update(fuenteNotificacion);
		return ResponseEntity.ok(response);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id") int id){
		FuenteNotificacion fuenteNotificacion = fuenteNotificacionService.findById(id);
		if (fuenteNotificacion.getId()==0) {
			
		}
		fuenteNotificacionService.delete(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<FuenteNotificacion> findById(@PathVariable("id") int id){
		FuenteNotificacion fuenteNotificacion = fuenteNotificacionService.findById(id);
		if(fuenteNotificacion.getId()==0) {
			
		}
		return ResponseEntity.ok(fuenteNotificacion);
	}
	
}
