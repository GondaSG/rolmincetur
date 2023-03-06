package pe.gob.vuce.template.siges.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import pe.gob.vuce.template.siges.domain.NotificacionDeclaracion;
@Repository
public interface NotificacionDeclaracionRepository extends JpaRepository<NotificacionDeclaracion, Integer>{
	
	@Query(value="SELECT * FROM notificacion_declaracion where notificacion_id = ?1", nativeQuery=true)
	List<NotificacionDeclaracion> findByNotificacionId(int notificacionId);
}
