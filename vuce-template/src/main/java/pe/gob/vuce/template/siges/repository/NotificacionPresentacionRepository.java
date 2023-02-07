package pe.gob.vuce.template.siges.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.gob.vuce.template.siges.domain.NotificacionPresentacion;

@Repository
public interface NotificacionPresentacionRepository extends JpaRepository<NotificacionPresentacion, Integer>{
	
	@Modifying
	@Query(value="delete from notificacion_presentacion where notificacion_id = ?1", nativeQuery=true)
	int deleteNotificacionPresentacion(int id);
	
}
