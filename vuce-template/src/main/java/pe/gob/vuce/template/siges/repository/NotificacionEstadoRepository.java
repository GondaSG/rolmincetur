package pe.gob.vuce.template.siges.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.gob.vuce.template.siges.domain.NotificacionEstado;

@Repository
public interface NotificacionEstadoRepository extends JpaRepository<NotificacionEstado, Integer>{
	
	@Modifying
	@Query(value="update notificacion_estado set flag_active = false where notificacion_id = ?1", nativeQuery=true)
	int updateActive(int id);	
	
	//@Query(value="update simrac.t_acuerdo_conservacion set bol_flg = false where srl_id = :psrl_id", nativeQuery=true)
    //int updateState(@Param("psrl_id") int id);
}
