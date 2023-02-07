package pe.gob.vuce.template.siges.service;

import pe.gob.vuce.template.siges.domain.Ciudad;
import pe.gob.vuce.template.siges.entity.ResponseEntity;

public interface CiudadService {

	ResponseEntity<Ciudad> findAll() throws Exception;

}
