package pe.gob.vuce.template.siges.service;

import pe.gob.vuce.template.siges.domain.NotificacionCerrada;
import pe.gob.vuce.template.siges.entity.ResponseEntity;

public interface NotificacionCerradaService {

	@SuppressWarnings("rawtypes")
	ResponseEntity create (NotificacionCerrada item) throws Exception;
	@SuppressWarnings("rawtypes")
	ResponseEntity delete (int id) throws Exception;
	ResponseEntity<NotificacionCerrada> findByNotificacionId(int notificacionId) throws Exception;
	ResponseEntity<NotificacionCerrada> validar(int notificacionId) throws Exception;
}
