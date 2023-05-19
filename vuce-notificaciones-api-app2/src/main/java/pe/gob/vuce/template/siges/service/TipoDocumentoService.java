package pe.gob.vuce.template.siges.service;

import pe.gob.vuce.template.siges.domain.TipoDocumento;
import pe.gob.vuce.template.siges.entity.ResponseEntity;

public interface TipoDocumentoService {
	ResponseEntity<TipoDocumento> findAll() throws Exception;
}
