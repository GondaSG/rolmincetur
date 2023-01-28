package com.example.rol3.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.rol3.domain.Ciudad;
import com.example.rol3.repository.CiudadRepository;

@Service
public class CiudadServiceImpl implements com.example.rol3.service.CiudadService{
	
	@Autowired
	CiudadRepository ciudadRepository;
	
	@Override
	public List<Ciudad> findAll(){
		return ciudadRepository.findAll();
	}

}
