package pe.gob.vuce.template.siges.service;

import pe.gob.vuce.template.siges.domain.Entidad;
import pe.gob.vuce.template.siges.entity.ResponseEntity;

public interface EntidadService {
	
	ResponseEntity<Entidad> findAll() throws Exception;
	ResponseEntity create(Entidad entidad) throws Exception;
	ResponseEntity<Entidad> findById(int id) throws Exception;
	Entidad update(Entidad notificacion);
	ResponseEntity delete(int id) throws Exception;

}
