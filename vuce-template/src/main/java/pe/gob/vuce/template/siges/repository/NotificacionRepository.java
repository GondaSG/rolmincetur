package pe.gob.vuce.template.siges.repository;

import java.util.Date;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.gob.vuce.template.siges.domain.Notificacion;

@Repository
public interface NotificacionRepository extends JpaRepository<Notificacion, Integer>{
	
	@Query(value="select n.* FROM notificacion n ",	nativeQuery=true)
	Page<Notificacion> search(Pageable page);
	
}
