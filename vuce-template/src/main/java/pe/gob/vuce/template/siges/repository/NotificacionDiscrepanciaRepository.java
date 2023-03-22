package pe.gob.vuce.template.siges.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.gob.vuce.template.siges.domain.NotificacionDiscrepancia;

@Repository
public interface NotificacionDiscrepanciaRepository extends JpaRepository<NotificacionDiscrepancia, Integer>{
		
	@Query(value="SELECT * FROM notificacion_discrepancia where notificacion_id = ?1", nativeQuery=true)
	List<NotificacionDiscrepancia> findByNotificacionId(int notificacionId);
	
	@Query(value="SELECT * FROM notificacion_discrepancia where flag_leido = false", nativeQuery=true)
	List<NotificacionDiscrepancia> findNoLeidos();
}
