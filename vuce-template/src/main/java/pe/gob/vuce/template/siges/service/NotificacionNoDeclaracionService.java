package pe.gob.vuce.template.siges.service;

import pe.gob.vuce.template.siges.domain.NotificacionNoDeclaracion;
import pe.gob.vuce.template.siges.entity.ResponseEntity;

public interface NotificacionNoDeclaracionService {

	@SuppressWarnings("rawtypes")
	ResponseEntity create (NotificacionNoDeclaracion item) throws Exception;
	ResponseEntity<NotificacionNoDeclaracion> findById(int id) throws Exception;
	NotificacionNoDeclaracion update (NotificacionNoDeclaracion notificacionDeclaracion);
	@SuppressWarnings("rawtypes")
	ResponseEntity delete (int id) throws Exception;
	ResponseEntity<NotificacionNoDeclaracion> findAll() throws Exception;	
	ResponseEntity<NotificacionNoDeclaracion> findByNotificacionId(int notificacionId) throws Exception;
	
}
