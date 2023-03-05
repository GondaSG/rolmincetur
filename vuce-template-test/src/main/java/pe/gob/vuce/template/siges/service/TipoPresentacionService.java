package pe.gob.vuce.template.siges.service;

import java.util.List;
import pe.gob.vuce.template.siges.domain.TipoPresentacion;
import pe.gob.vuce.template.siges.entity.ResponseEntity;

public interface TipoPresentacionService {
	
	ResponseEntity<TipoPresentacion> findAll() throws Exception;
}
