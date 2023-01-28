package com.example.rol3.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.rol3.domain.TipoNotificacion;
import com.example.rol3.repository.TipoNotificacionRepository;

@Service
public class TipoNotificacionServiceImpl implements com.example.rol3.service.TipoNotificacionService{

	@Autowired
	TipoNotificacionRepository tipoNotificacionRepository;

	@Override
	public List<TipoNotificacion> findAll() {
		// TODO Auto-generated method stub
		return tipoNotificacionRepository.findAll();
	}
}
