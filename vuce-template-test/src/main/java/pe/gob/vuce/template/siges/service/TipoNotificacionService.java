package pe.gob.vuce.template.siges.service;

import pe.gob.vuce.template.siges.domain.TipoNotificacion;
import pe.gob.vuce.template.siges.entity.ResponseEntity;

public interface TipoNotificacionService {	
	
	ResponseEntity<TipoNotificacion> findAll() throws Exception;
}
