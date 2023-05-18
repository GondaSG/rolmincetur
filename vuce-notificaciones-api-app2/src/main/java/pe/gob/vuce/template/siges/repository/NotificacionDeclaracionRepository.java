package pe.gob.vuce.template.siges.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pe.gob.vuce.template.siges.domain.NotificacionDeclaracion;

public interface NotificacionDeclaracionRepository extends JpaRepository<NotificacionDeclaracion, Integer>{
	
	@Query(value="SELECT * FROM notificacion_declaracion where notificacion_id = ?1", nativeQuery=true)
	List<NotificacionDeclaracion> findByNotificacionId(int notificacionId);
	
	@Query(value="SELECT * FROM notificacion_declaracion where flag_leido = false", nativeQuery=true)
	List<NotificacionDeclaracion> findNoLeidos();
}
