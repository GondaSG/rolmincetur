package pe.gob.vuce.template.siges.service;

import java.util.List;

import pe.gob.vuce.template.siges.domain.Entidad;

public interface EntidadService {
	
	List<Entidad> findAll();
	Entidad create(Entidad entidad);
	Entidad findById(int id);
	Entidad update(Entidad entidad);
	void delete(int id);

}
