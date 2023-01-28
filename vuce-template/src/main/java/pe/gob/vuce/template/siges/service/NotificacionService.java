package pe.gob.vuce.template.siges.service;

import java.util.List;

import pe.gob.vuce.template.siges.domain.Notificacion;

public interface NotificacionService {

	Notificacion create(Notificacion notificacion);
	Notificacion findById(int id);
	Notificacion update(Notificacion notificacion);
	void delete(int id);
	List<Notificacion> findAll();
	
}
