package pe.gob.vuce.template.siges.service;

import java.util.List;
import pe.gob.vuce.template.dto.NotificacionDTO;
import pe.gob.vuce.template.dto.NotificacionEstadoDTO;
import pe.gob.vuce.template.siges.domain.Notificacion;
import pe.gob.vuce.template.siges.entity.PaginatorEntity;
import pe.gob.vuce.template.siges.entity.ResponseEntity;

public interface NotificacionService {
	
	ResponseEntity create(Notificacion item) throws Exception;
	ResponseEntity updateStatus(NotificacionEstadoDTO item) throws Exception;
	ResponseEntity<Notificacion> findById(int id) throws Exception;
	Notificacion update(Notificacion notificacion);
	ResponseEntity<Notificacion> findAll() throws Exception;
	ResponseEntity delete(int id) throws Exception;
	ResponseEntity<Notificacion> search(NotificacionDTO item, PaginatorEntity paginator) throws Exception;
}
