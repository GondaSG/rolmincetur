package com.example.rol3.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.rol3.domain.OrigenNotificacion;
import com.example.rol3.repository.OrigenNotificacionRepository;

@Service
public class OrigenNotificacionServiceImpl implements com.example.rol3.service.OrigenNotificacionService {
	
	@Autowired
	OrigenNotificacionRepository origenNotificacionRepository;
	
	@Override
	public List<OrigenNotificacion> findAll(){
		return origenNotificacionRepository.findAll();
	}

}
