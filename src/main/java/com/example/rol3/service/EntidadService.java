package com.example.rol3.service;

import java.util.List;

import com.example.rol3.domain.Entidad;

public interface EntidadService {
	
	List<Entidad> findAll();
	Entidad create(Entidad entidad);
	Entidad findById(int id);
	Entidad update(Entidad entidad);
	void delete(int id);

}
