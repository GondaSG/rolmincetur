package pe.gob.vuce.template.siges.service;

import pe.gob.vuce.template.siges.domain.TipoPeligro;
import pe.gob.vuce.template.siges.entity.ResponseEntity;

public interface TipoPeligroService {

	ResponseEntity<TipoPeligro> findAll() throws Exception;

}
