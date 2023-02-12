package pe.gob.vuce.template.siges.service;

import pe.gob.vuce.template.siges.domain.Rol;
import pe.gob.vuce.template.siges.entity.ResponseEntity;

public interface RolService {

	ResponseEntity create(Rol item) throws Exception;
	ResponseEntity<Rol> findById(int id) throws Exception;
	Rol update(Rol notificacion);
	ResponseEntity<Rol> findAll() throws Exception;
	ResponseEntity delete(int id) throws Exception;
}
