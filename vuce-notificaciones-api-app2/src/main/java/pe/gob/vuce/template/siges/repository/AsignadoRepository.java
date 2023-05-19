package pe.gob.vuce.template.siges.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.gob.vuce.template.siges.domain.Asignacion;

@Repository
public interface AsignadoRepository extends JpaRepository<Asignacion, Integer>{
	@Query(value="select a.* from siges.asignacion a "
			+ "inner join siges.rol_asignacion ra on a.id = ra.asignacion_id "
			+ "where ra.rol_id = ?1", nativeQuery=true)
	List<Asignacion> findByRol (int rolId);
}
