package pe.gob.vuce.template.siges.service;

import pe.gob.vuce.template.dto.RolDTO;
import pe.gob.vuce.template.siges.domain.Rol;
import pe.gob.vuce.template.siges.entity.ResponseEntity;

public interface RolService {

	ResponseEntity create(RolDTO item) throws Exception;
	ResponseEntity crearAsignacion(RolDTO item) throws Exception;
	ResponseEntity<RolDTO> findById(int id) throws Exception;
	RolDTO update(RolDTO notificacion);
	ResponseEntity<RolDTO> findAll() throws Exception;
	ResponseEntity delete(int id) throws Exception;
}
