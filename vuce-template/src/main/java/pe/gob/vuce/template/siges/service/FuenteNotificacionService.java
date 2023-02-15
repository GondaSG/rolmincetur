package pe.gob.vuce.template.siges.service;


import pe.gob.vuce.template.siges.domain.FuenteNotificacion;
import pe.gob.vuce.template.siges.entity.ResponseEntity;

public interface FuenteNotificacionService {

	ResponseEntity create(FuenteNotificacion item) throws Exception;
	ResponseEntity<FuenteNotificacion> findById(int id) throws Exception;
	FuenteNotificacion update(FuenteNotificacion notificacion);
	ResponseEntity delete(int id) throws Exception;
	ResponseEntity<FuenteNotificacion> findAll() throws Exception;
	ResponseEntity<FuenteNotificacion> findTipoId(int id) throws Exception;

}
