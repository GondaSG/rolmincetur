package pe.gob.vuce.template.siges.service;

import pe.gob.vuce.template.siges.domain.CategoriaAlimento;
import pe.gob.vuce.template.siges.entity.ResponseEntity;

public interface CategoriaAlimentoService {
	
	ResponseEntity create(CategoriaAlimento item) throws Exception;
	ResponseEntity<CategoriaAlimento> findById(int id) throws Exception;
	CategoriaAlimento update(CategoriaAlimento notificacion);
	ResponseEntity<CategoriaAlimento> findAll() throws Exception;
	ResponseEntity delete(int id) throws Exception;
	
}
