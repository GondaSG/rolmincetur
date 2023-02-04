package com.example.rol3.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.rol3.domain.FuenteNotificacion;
import com.example.rol3.repository.FuenteNotificacionRepository;

@Service
public class FuenteNotificacionServiceImpl  implements com.example.rol3.service.FuenteNotificacionService{

	@Autowired
	FuenteNotificacionRepository fuenteNotificacionRepository;
	
	@Override
	public FuenteNotificacion create(FuenteNotificacion fuenteNotificacion) {
		return fuenteNotificacionRepository.save(fuenteNotificacion);
	}
	
	@Override
	public FuenteNotificacion findById(int id) {
		Optional<FuenteNotificacion> fuenteNotificacion = fuenteNotificacionRepository.findById(id);
		return fuenteNotificacion.isPresent() ? fuenteNotificacion.get()	: new FuenteNotificacion();
 	}
	
	@Override
	public FuenteNotificacion update(FuenteNotificacion fuenteNotificacion) {
		return fuenteNotificacionRepository.save(fuenteNotificacion);
	}
	
	@Override
	public void delete(int id) {
		fuenteNotificacionRepository.deleteById(id);
	}
	
	@Override
	public List<FuenteNotificacion> findAll(){
		return fuenteNotificacionRepository.findAll();
	}
	
}
