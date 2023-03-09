package pe.gob.vuce.template.siges.service;

import pe.gob.vuce.template.dto.NotificacionDTO;
import pe.gob.vuce.template.siges.domain.NotificacionDeclaracion;
import pe.gob.vuce.template.siges.entity.ResponseEntity;

public interface NotificacionDeclaracionService {

	@SuppressWarnings("rawtypes")
	ResponseEntity create (NotificacionDeclaracion item) throws Exception;
	ResponseEntity<NotificacionDeclaracion> findById(int id) throws Exception;
	NotificacionDeclaracion update (NotificacionDeclaracion notificacionDeclaracion);
	@SuppressWarnings("rawtypes")
	ResponseEntity delete (int id) throws Exception;
	ResponseEntity<NotificacionDeclaracion> findAll() throws Exception;
	
	ResponseEntity<NotificacionDeclaracion> findByNotificacionId(int notificacionId) throws Exception;
	ResponseEntity<NotificacionDeclaracion> findByEntidadId(int entidadId) throws Exception;
	@SuppressWarnings("rawtypes")
	ResponseEntity updateLeido(NotificacionDTO item) throws Exception;
}
