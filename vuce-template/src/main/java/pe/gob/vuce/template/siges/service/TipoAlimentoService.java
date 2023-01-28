package pe.gob.vuce.template.siges.service;

import java.util.List;

import pe.gob.vuce.template.siges.domain.TipoAlimento;

public interface TipoAlimentoService {

	TipoAlimento create(TipoAlimento tipoAlimento);
	TipoAlimento findById(int id);
	TipoAlimento update(TipoAlimento tipoAlimento);
	void delete(int id);
	List<TipoAlimento> findAll();

}
