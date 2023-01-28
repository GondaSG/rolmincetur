package pe.gob.vuce.template.siges.service;

import java.util.List;

import pe.gob.vuce.template.siges.domain.Rol;

public interface RolService {

	Rol create(Rol rol);
	Rol findById(int id);
	Rol update(Rol rol);
	void delete(int id);
	List<Rol> findAll();
}
