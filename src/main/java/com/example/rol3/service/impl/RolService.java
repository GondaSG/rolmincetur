package com.example.rol3.service.impl;

import java.util.List;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.rol3.domain.Rol;
import com.example.rol3.repository.RolRepository;

@Service
public class RolService implements com.example.rol3.service.RolService {
    @Autowired
    RolRepository rolRepository;
	@Override
	public Rol create(Rol rol) {
		return rolRepository.save(rol);
	}

	@Override
	public Rol findById(int id) {
		Optional<Rol> rol = rolRepository.findById(id);
		return rol.isPresent() ? rol.get() : new Rol();
	}

	@Override
	public Rol update(Rol rol) {
		return rolRepository.save(rol);
	}

	@Override
	public void delete(int id) {
		rolRepository.deleteById(id);
	}

	@Override
	public List<Rol> findAll() {
		return rolRepository.findAll();
	}

}
