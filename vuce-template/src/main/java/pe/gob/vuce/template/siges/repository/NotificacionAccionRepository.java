package pe.gob.vuce.template.siges.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import pe.gob.vuce.template.siges.domain.NotificacionAccion;

@Repository
public interface NotificacionAccionRepository extends JpaRepository<NotificacionAccion, Integer> {

	/*@Query("SELECT ")
	List<NotificacionAccion> findByNotificacionId(int notificacionId);*/
	@Modifying
	@Query(value="SELECT id, detalle, fecha_creacion, notificacion_id FROM siges.notificacion_accion where notificacion_id = ?1", nativeQuery=true)
	List<NotificacionAccion> findByNotificacionId(int notificacionId);
} 
