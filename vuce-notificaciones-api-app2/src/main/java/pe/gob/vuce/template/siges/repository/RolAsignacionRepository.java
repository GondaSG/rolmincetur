package pe.gob.vuce.template.siges.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import pe.gob.vuce.template.siges.domain.Asignacion;
import pe.gob.vuce.template.siges.domain.NotificacionEstado;
import pe.gob.vuce.template.siges.domain.RolAsignacion;

@Repository
public interface RolAsignacionRepository extends JpaRepository<RolAsignacion, Integer>{
	@Modifying
	@Query(value="delete from rol_asignacion where rol_id = ?1", nativeQuery=true)
	int deleteByRol(int RolId);
	

}
