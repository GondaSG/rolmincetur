package pe.gob.vuce.template.siges.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.gob.vuce.template.siges.domain.FuenteNotificacion;

@Repository
public interface FuenteNotificacionRepository extends JpaRepository<FuenteNotificacion, Integer> {

	@Query(value="SELECT * FROM fuente_notificacion where tipo_id = ?1", nativeQuery=true)
	List<FuenteNotificacion> findTipoId(int id);
}
