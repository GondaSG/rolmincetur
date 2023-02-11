package pe.gob.vuce.template.siges.service;

import pe.gob.vuce.template.siges.domain.NotificacionDiscrepancia;
import pe.gob.vuce.template.siges.entity.ResponseEntity;

public interface NotificacionDiscrepanciaService {

	ResponseEntity create(NotificacionDiscrepancia item) throws Exception;
	ResponseEntity<NotificacionDiscrepancia> findById(int id) throws Exception;
	NotificacionDiscrepancia update(NotificacionDiscrepancia notificacionDiscrepancia);
	ResponseEntity delete (int id) throws Exception;
	ResponseEntity<NotificacionDiscrepancia> findAll() throws Exception;
	
	ResponseEntity<NotificacionDiscrepancia> findByNotificacionId(int notificacionId) throws Exception;
}
