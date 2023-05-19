package pe.gob.vuce.template.siges.service;

import pe.gob.vuce.template.siges.domain.Pais;
import pe.gob.vuce.template.siges.entity.ResponseEntity;

public interface PaisService {

	ResponseEntity<Pais> findAll() throws Exception;
}
