package pe.gob.vuce.template.siges.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.gob.vuce.template.siges.domain.NotificacionLote;

@Repository
public interface NotificacionLoteRepository extends JpaRepository<NotificacionLote, Integer>{
	
	@Modifying
	@Query(value="delete from notificacion_lote where notificacion_id = ?1", nativeQuery=true)
	int deleteNotificacionLote(int id);
	
	@Query(value="select * from notificacion_lote WHERE notificacion_id = ?1", nativeQuery=true)
	List<NotificacionLote> searchByNotificacion(@Param("id") int id);
}
