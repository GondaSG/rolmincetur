package pe.gob.vuce.template.siges.service;

import java.util.List;

import pe.gob.vuce.template.siges.domain.FuenteNotificacion;

public interface FuenteNotificacionService {

	FuenteNotificacion create(FuenteNotificacion fuenteNotificacion);
	FuenteNotificacion findById(int id);
	FuenteNotificacion update(FuenteNotificacion fuenteNotificacion);
	void delete(int id);
	List<FuenteNotificacion> findAll();

}
