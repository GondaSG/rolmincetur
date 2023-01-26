package com.example.rol3.service;

import java.util.List;

import com.example.rol3.domain.FuenteNotificacion;

public interface FuenteNotificacionService {

	FuenteNotificacion create(FuenteNotificacion fuenteNotificacion);
	FuenteNotificacion findById(int id);
	FuenteNotificacion update(FuenteNotificacion fuenteNotificacion);
	void delete(int id);
	List<FuenteNotificacion> findAll();

}
