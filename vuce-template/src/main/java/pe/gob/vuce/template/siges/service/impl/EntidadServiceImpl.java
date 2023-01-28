package pe.gob.vuce.template.siges.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.gob.vuce.template.siges.domain.Entidad;
import pe.gob.vuce.template.siges.repository.EntidadRepository;
import pe.gob.vuce.template.siges.service.EntidadService;

@Service
public class EntidadServiceImpl implements EntidadService{
	
	@Autowired
	EntidadRepository entidadRepository;
	
	@Override
	public Entidad create(Entidad entidad) {
		return entidadRepository.save(entidad);
	}
	
	@Override
	public Entidad findById(int id) {
		Optional<Entidad> entidad = entidadRepository.findById(id);
		return entidad.isPresent()	? entidad.get() : new Entidad();
	}

	@Override
	public Entidad update(Entidad entidad) {
		return entidadRepository.save(entidad);
	}
	
	@Override
	public void delete(int id) {
		entidadRepository.deleteById(id);		
	}
	
	@Override
	public List<Entidad> findAll(){
		return entidadRepository.findAll();
	}
}
