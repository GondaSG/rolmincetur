package pe.gob.vuce.template.siges.service;

import java.util.List;

import pe.gob.vuce.template.siges.domain.CategoriaAlimento;

public interface CategoriaAlimentoService {

	CategoriaAlimento create(CategoriaAlimento categoriaAlimento);
	CategoriaAlimento findById(int id);
	CategoriaAlimento update(CategoriaAlimento categoriaAlimento);
	List<CategoriaAlimento> findAll();
	void delete(int id);

}
