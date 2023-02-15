package com.example.rol3.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.rol3.domain.Notificacion;
import com.example.rol3.repository.NotificacionRepository;

@Service
public class NotificacionServiceImpl  implements com.example.rol3.service.NotificacionService {
	
	@Autowired
	NotificacionRepository notificacionRepository;
	
	@Override
	public Notificacion create(Notificacion notificacion) {
		return notificacionRepository.save(notificacion);
	}

	@Override
	public Notificacion findById(int id) {
		Optional<Notificacion> notificacion = notificacionRepository.findById(id);
		return notificacion.isPresent() ? notificacion.get()	:new Notificacion();
	}

	@Override
	public Notificacion update(Notificacion notificacion) {
		return notificacionRepository.save(notificacion);
	}

	@Override
	public void delete(int id) {
		notificacionRepository.deleteById(id);	
	}

	@Override
	public List<Notificacion> findAll() {
		return notificacionRepository.findAll();
	}	
	
}