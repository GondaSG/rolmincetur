package pe.gob.vuce.template.siges.service.impl;

import java.util.List;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.gob.vuce.template.siges.domain.Rol;
import pe.gob.vuce.template.siges.repository.RolRepository;
import pe.gob.vuce.template.siges.service.RolService;

@Service
public class RolServiceImpl implements RolService {
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
