package pe.gob.vuce.template.siges.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.gob.vuce.template.siges.domain.NotificacionEstado;
import pe.gob.vuce.template.siges.domain.NotificacionLote;

@Repository
public interface NotificacionEstadoRepository extends JpaRepository<NotificacionEstado, Integer>{
	
	@Modifying
	@Query(value="update notificacion_estado set flag_active = false where notificacion_id = ?1", nativeQuery=true)
	int updateActive(int id);
	
	@Query(value="select * from notificacion_estado WHERE notificacion_id = ?1", nativeQuery=true)
	List<NotificacionEstado> searchByNotificacion(@Param("id") int id);
}
