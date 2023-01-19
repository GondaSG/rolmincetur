package com.example.rol3.service;

import java.util.List;

import com.example.rol3.domain.Rol;

public interface RolService {

	Rol create(Rol rol);
	Rol findById(int id);
	Rol update(Rol rol);
	void delete(int id);
	List<Rol> findAll();
}
