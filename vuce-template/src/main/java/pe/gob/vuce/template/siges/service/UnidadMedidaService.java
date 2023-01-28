package pe.gob.vuce.template.siges.service;

import java.util.List;

import pe.gob.vuce.template.siges.domain.UnidadMedida;

public interface UnidadMedidaService {

	UnidadMedida create(UnidadMedida unidadMedida);
	UnidadMedida findById(int id);
	void delete(int id);
	UnidadMedida update(UnidadMedida unidadMedida);
	List<UnidadMedida> findAll();
	
}
