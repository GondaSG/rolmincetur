package com.example.rol3.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.rol3.domain.TipoNotificacion;
import com.example.rol3.service.TipoNotificacionService;

@RestController
@RequestMapping(value="tipoNotificacion")
public class TipoNotificacionController {

	@Autowired
	TipoNotificacionService tipoNotificacionService;
	
	@GetMapping
	public ResponseEntity<List<TipoNotificacion>> findAll(){
		return ResponseEntity.ok(tipoNotificacionService.findAll());
	}
}
