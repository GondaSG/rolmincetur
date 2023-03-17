package pe.gob.vuce.template.siges.service;

import java.io.ByteArrayInputStream;

import pe.gob.vuce.template.dto.IndicadorDTO;
import pe.gob.vuce.template.dto.NotificacionDTO;
import pe.gob.vuce.template.dto.NotificacionEstadoDTO;
import pe.gob.vuce.template.dto.NotificacionFaseDTO;
import pe.gob.vuce.template.siges.domain.Notificacion;
import pe.gob.vuce.template.siges.domain.NotificacionFase;
import pe.gob.vuce.template.siges.entity.PaginatorEntity;
import pe.gob.vuce.template.siges.entity.ResponseEntity;

public interface NotificacionService {
	
	@SuppressWarnings("rawtypes")
	ResponseEntity create(NotificacionDTO item) throws Exception;
	@SuppressWarnings("rawtypes")
	ResponseEntity updateStatus(NotificacionEstadoDTO item) throws Exception;
	ResponseEntity<NotificacionDTO> findById(int id) throws Exception;
	Notificacion update(NotificacionDTO notificacion);
	ResponseEntity<Notificacion> findAll() throws Exception;
	@SuppressWarnings("rawtypes")
	ResponseEntity delete(int id) throws Exception;
	ResponseEntity<NotificacionDTO> search(NotificacionDTO item, PaginatorEntity paginator) throws Exception;
	@SuppressWarnings("rawtypes")
	ResponseEntity updateLeido(NotificacionDTO item) throws Exception;
	ResponseEntity<NotificacionDTO> getNoLeidos(boolean flagDigesa,	boolean flagSanipes, boolean flagSenasa) throws Exception;
	@SuppressWarnings("rawtypes")
	ResponseEntity updateFase(NotificacionFaseDTO item) throws Exception;
	ResponseEntity<NotificacionFase> findFase(int id) throws Exception;
	@SuppressWarnings("rawtypes")
	ResponseEntity updateNoCompetencia(NotificacionDTO item) throws Exception;
	ResponseEntity<IndicadorDTO> indicadores(IndicadorDTO item) throws Exception;
	ResponseEntity<NotificacionDTO> afectaHumanos(NotificacionDTO item, PaginatorEntity paginator) throws Exception;
	ByteArrayInputStream exportar(NotificacionDTO item) throws Exception;
	void send();
}
