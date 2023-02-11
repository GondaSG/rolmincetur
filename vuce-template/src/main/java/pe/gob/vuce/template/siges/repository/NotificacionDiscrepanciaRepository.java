package pe.gob.vuce.template.siges.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.gob.vuce.template.siges.domain.Notificacion;
import pe.gob.vuce.template.siges.domain.NotificacionDiscrepancia;

@Repository
public interface NotificacionDiscrepanciaRepository extends JpaRepository<NotificacionDiscrepancia, Integer>{

	@Modifying	
	@Query(value="SELECT id, detalle, fecha_creacion, notificacion_id FROM siges.notificacion_accion where notificacion_id = ?1", nativeQuery=true)
	List<NotificacionDiscrepancia> findByNotificacionId(int notificacionId);
}
