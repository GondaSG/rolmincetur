package com.example.rol3.service;

import java.util.List;

import com.example.rol3.domain.TipoAlimento;

public interface TipoAlimentoService {

	TipoAlimento create(TipoAlimento tipoAlimento);
	TipoAlimento findById(int id);
	TipoAlimento update(TipoAlimento tipoAlimento);
	void delete(int id);
	List<TipoAlimento> findAll();

}
