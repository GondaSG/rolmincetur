package pe.gob.vuce.template.siges.service;

import pe.gob.vuce.template.siges.domain.TipoUsuario;
import pe.gob.vuce.template.siges.entity.ResponseEntity;

public interface TipoUsuarioService {
	
	ResponseEntity<TipoUsuario> findAll() throws Exception;
}
