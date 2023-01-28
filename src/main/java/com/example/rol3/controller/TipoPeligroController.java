package com.example.rol3.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.rol3.domain.TipoPeligro;
import com.example.rol3.service.TipoPeligroService;

@RestController
@RequestMapping(value="tipoPeligro")
public class TipoPeligroController {

	@Autowired
	TipoPeligroService tipoPeligroService;
	
	@GetMapping ResponseEntity<List<TipoPeligro>> findAll(){
		return ResponseEntity.ok(tipoPeligroService.findAll());
	}
}
