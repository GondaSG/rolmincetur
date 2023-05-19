package pe.gob.vuce.template.siges.service;

import pe.gob.vuce.template.siges.domain.NotificacionAccion;
import pe.gob.vuce.template.siges.domain.TipoAlimento;
import pe.gob.vuce.template.siges.entity.ResponseEntity;

public interface NotificacionAccionService {
	ResponseEntity create(NotificacionAccion item) throws Exception;
	ResponseEntity<NotificacionAccion> findById(int id) throws Exception;
	NotificacionAccion update(NotificacionAccion notificacionAccion);
	ResponseEntity delete(int id) throws Exception;	
	ResponseEntity<NotificacionAccion> findAll() throws Exception;
	
	ResponseEntity<NotificacionAccion> findByNotificacionId(int notificacionId) throws Exception;
}
