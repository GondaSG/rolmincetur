package pe.gob.vuce.template.siges.service;

import pe.gob.vuce.template.dto.NotificacionDTO;
import pe.gob.vuce.template.dto.NotificacionEstadoDTO;
import pe.gob.vuce.template.siges.domain.Notificacion;
import pe.gob.vuce.template.siges.entity.PaginatorEntity;
import pe.gob.vuce.template.siges.entity.ResponseEntity;

public interface NotificacionService {
	
	ResponseEntity create(NotificacionDTO item) throws Exception;
	ResponseEntity updateStatus(NotificacionEstadoDTO item) throws Exception;
	ResponseEntity<NotificacionDTO> findById(int id) throws Exception;
	Notificacion update(NotificacionDTO notificacion);
	ResponseEntity<Notificacion> findAll() throws Exception;
	ResponseEntity delete(int id) throws Exception;
	ResponseEntity<Notificacion> search(NotificacionDTO item, PaginatorEntity paginator) throws Exception;
	ResponseEntity updateLeido(NotificacionDTO item) throws Exception;
	ResponseEntity<NotificacionDTO> getNoLeidos(boolean flagDigesa,	boolean flagSanipes, boolean flagSenasa) throws Exception;
}
