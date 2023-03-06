package pe.gob.vuce.template.siges.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import pe.gob.vuce.template.siges.domain.NotificacionNoDeclaracion;
@Repository
public interface NotificacionNoDeclaracionRepository extends JpaRepository<NotificacionNoDeclaracion, Integer>{
	
	@Query(value="SELECT * FROM notificacion_no_declaracion where notificacion_id = ?1", nativeQuery=true)
	List<NotificacionNoDeclaracion> findByNotificacionId(int notificacionId);
}
