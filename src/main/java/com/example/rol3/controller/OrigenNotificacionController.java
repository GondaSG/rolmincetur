package com.example.rol3.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.rol3.domain.OrigenNotificacion;
import com.example.rol3.service.OrigenNotificacionService;

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
