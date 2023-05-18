package pe.gob.vuce.template.siges.service;

import pe.gob.vuce.template.siges.domain.Usuario;
import pe.gob.vuce.template.siges.entity.ResponseEntity;

public interface UsuarioService {

	ResponseEntity<Usuario> findAll() throws Exception;
	ResponseEntity create (Usuario usuario) throws Exception;
	ResponseEntity<Usuario> findById(int id) throws Exception;
	Usuario update (Usuario notificacion);
	ResponseEntity delete (int id ) throws Exception;
}
