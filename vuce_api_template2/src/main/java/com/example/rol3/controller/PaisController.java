package com.example.rol3.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.rol3.domain.Pais;
import com.example.rol3.service.PaisService;

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
