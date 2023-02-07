package pe.gob.vuce.template.siges.service;

import pe.gob.vuce.template.siges.domain.CategoriaAlimento;
import pe.gob.vuce.template.siges.domain.UnidadMedida;
import pe.gob.vuce.template.siges.entity.ResponseEntity;

public interface UnidadMedidaService {
	
	ResponseEntity create(UnidadMedida item) throws Exception;
	ResponseEntity<UnidadMedida> findById(int id) throws Exception;
	UnidadMedida update(UnidadMedida notificacion);
	ResponseEntity<UnidadMedida> findAll() throws Exception;
	ResponseEntity delete(int id) throws Exception;
}
