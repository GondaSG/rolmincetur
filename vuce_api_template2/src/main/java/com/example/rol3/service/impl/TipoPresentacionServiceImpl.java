package com.example.rol3.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.rol3.domain.TipoPresentacion;
import com.example.rol3.repository.TipoPresentacionRepository;

@Service
public class TipoPresentacionServiceImpl implements com.example.rol3.service.TipoPresentacionService{

	@Autowired
	TipoPresentacionRepository tipoPresentacionRepository;
	
	@Override
	public List<TipoPresentacion> findAll(){
		return tipoPresentacionRepository.findAll();
	}
}
