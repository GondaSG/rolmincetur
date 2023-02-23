package pe.gob.vuce.template.siges.service;

import pe.gob.vuce.template.siges.domain.Asignacion;
import pe.gob.vuce.template.siges.entity.ResponseEntity;

public interface AsignadoService {

	ResponseEntity<Asignacion> findAll() throws Exception;
}
