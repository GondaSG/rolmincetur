package pe.gob.vuce.template.siges.service;

import pe.gob.vuce.template.siges.domain.TipoAlimento;
import pe.gob.vuce.template.siges.entity.ResponseEntity;

public interface TipoAlimentoService {

	ResponseEntity create(TipoAlimento item) throws Exception;
	ResponseEntity<TipoAlimento> findById(int id) throws Exception;
	TipoAlimento update(TipoAlimento notificacion);
	ResponseEntity delete(int id) throws Exception;	
	ResponseEntity<TipoAlimento> findAll() throws Exception;
}
