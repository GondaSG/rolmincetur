package pe.gob.vuce.template.siges.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.gob.vuce.template.siges.domain.Ciudad;

@Repository
public interface CiudadRepository extends JpaRepository<Ciudad, Integer>{

	@Query(value="select n.* from ciudad n where n.pais_id = ?1", nativeQuery=true)
	List<Ciudad> findAll(int id);
}
