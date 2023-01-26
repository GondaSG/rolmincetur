package com.example.rol3.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.rol3.domain.UnidadMedida;
import com.example.rol3.repository.UnidadMedidaRepository;

@Service
public class UnidadMedidaServiceImpl implements com.example.rol3.service.UnidadMedidaService{

	@Autowired
	UnidadMedidaRepository unidadMedidaRepository;
	
	@Override
	public UnidadMedida create(UnidadMedida unidadMedida) {
		return unidadMedidaRepository.save(unidadMedida);
	}
	
	@Override
	public UnidadMedida findById(int id) {
		Optional<UnidadMedida> unidadMedida = unidadMedidaRepository.findById(id);
		return unidadMedida.isPresent() ? unidadMedida.get()	: new UnidadMedida();		
	}
	
	@Override
	public UnidadMedida update(UnidadMedida unidadMedida) {
		return unidadMedidaRepository.save(unidadMedida);
	}
	
	@Override
	public void delete(int id) {
		unidadMedidaRepository.deleteById(id);
	}
	
	@Override
	public List<UnidadMedida> findAll(){
		return unidadMedidaRepository.findAll();
	}
}
