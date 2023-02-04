package com.example.rol3.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.rol3.domain.Pais;
import com.example.rol3.repository.PaisRepository;

@Service
public class PaisServiceImpl implements com.example.rol3.service.PaisService{

	@Autowired
	PaisRepository paisRepository;
	
	@Override
	public List<Pais> findAll(){
		return paisRepository.findAll();
	}
}
