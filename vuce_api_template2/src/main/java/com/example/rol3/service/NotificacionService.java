package com.example.rol3.service;

import java.util.List;

import com.example.rol3.domain.Notificacion;

public interface NotificacionService {

	Notificacion create(Notificacion notificacion);
	Notificacion findById(int id);
	Notificacion update(Notificacion notificacion);
	void delete(int id);
	List<Notificacion> findAll();
	
}