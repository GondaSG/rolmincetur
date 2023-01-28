package pe.gob.vuce.template.siges.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pe.gob.vuce.template.siges.domain.TipoNotificacion;

@Repository
public interface TipoNotificacionRepository extends JpaRepository<TipoNotificacion, Integer>{

}
