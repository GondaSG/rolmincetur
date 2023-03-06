package pe.gob.vuce.template.siges.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import pe.gob.vuce.template.siges.domain.NotificacionCerrada;

@Repository
public interface NotificacionCerradaRepository extends JpaRepository<NotificacionCerrada, Integer>{
	
	@Query(value="SELECT * FROM notificacion_cerrada where notificacion_id = ?1", nativeQuery=true)
	List<NotificacionCerrada> findByNotificacionId(int notificacionId);
}
