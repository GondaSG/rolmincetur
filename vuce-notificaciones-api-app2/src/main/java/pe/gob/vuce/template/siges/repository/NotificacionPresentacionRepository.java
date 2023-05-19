package pe.gob.vuce.template.siges.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import pe.gob.vuce.template.siges.domain.NotificacionLote;
import pe.gob.vuce.template.siges.domain.NotificacionPresentacion;

@Repository
public interface NotificacionPresentacionRepository extends JpaRepository<NotificacionPresentacion, Integer>{
	
	@Modifying
	@Query(value="delete from notificacion_presentacion where notificacion_id = ?1", nativeQuery=true)
	int deleteNotificacionPresentacion(int id);
	
	@Query(value="select * from notificacion_presentacion WHERE notificacion_id = ?1", nativeQuery=true)
	List<NotificacionPresentacion> searchByNotificacion(@Param("id") int id);
}
