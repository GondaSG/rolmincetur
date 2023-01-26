package com.example.rol3.service;

import java.util.List;

import com.example.rol3.domain.CategoriaAlimento;

public interface CategoriaAlimentoService {

	CategoriaAlimento create(CategoriaAlimento categoriaAlimento);
	CategoriaAlimento findById(int id);
	CategoriaAlimento update(CategoriaAlimento categoriaAlimento);
	List<CategoriaAlimento> findAll();
	void delete(int id);

}
