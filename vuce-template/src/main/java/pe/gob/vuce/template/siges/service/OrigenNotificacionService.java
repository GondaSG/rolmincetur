package pe.gob.vuce.template.siges.service;


import pe.gob.vuce.template.siges.domain.OrigenNotificacion;
import pe.gob.vuce.template.siges.entity.ResponseEntity;

public interface OrigenNotificacionService {

	ResponseEntity<OrigenNotificacion> findAll() throws Exception;

}
