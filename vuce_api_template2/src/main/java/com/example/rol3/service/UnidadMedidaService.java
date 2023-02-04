package com.example.rol3.service;

import java.util.List;

import com.example.rol3.domain.UnidadMedida;

public interface UnidadMedidaService {

	UnidadMedida create(UnidadMedida unidadMedida);
	UnidadMedida findById(int id);
	void delete(int id);
	UnidadMedida update(UnidadMedida unidadMedida);
	List<UnidadMedida> findAll();
	
}
