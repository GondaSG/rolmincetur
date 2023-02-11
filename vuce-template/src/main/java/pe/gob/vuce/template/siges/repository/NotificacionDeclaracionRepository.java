package pe.gob.vuce.template.siges.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import pe.gob.vuce.template.siges.domain.NotificacionDeclaracion;

public interface NotificacionDeclaracionRepository extends JpaRepository<NotificacionDeclaracion, Integer>{
	
	@Modifying
	@Query(value="SELECT id, detalle, fecha_creacion, notificacion_id FROM siges.notificacion_declaracion where notificacion_id = ?1", nativeQuery=true)
	List<NotificacionDeclaracion> findByNotificacionId(int notificacionId);
	
	@Modifying
	@Query(value="SELECT id, detalle, fecha_creacion, entidad_id FROM siges.notificacion_declaracion where entidad_id = ?1", nativeQuery=true)
	List<NotificacionDeclaracion> findByEntidadId(int entidadId);
}
