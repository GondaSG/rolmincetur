package com.example.rol3.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.rol3.domain.TipoPeligro;
import com.example.rol3.repository.TipoPeligroRepository;

@Service
public class TipoPeligroServiceImpl implements com.example.rol3.service.TipoPeligroService{
	
	@Autowired
	TipoPeligroRepository tipoPeligroRepository;
	
	@Override
	public List<TipoPeligro> findAll(){
		return tipoPeligroRepository.findAll();
	}
	
}
