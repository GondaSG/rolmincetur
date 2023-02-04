package com.example.rol3.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.rol3.domain.TipoAlimento;
import com.example.rol3.repository.TipoAlimentoRepository;

@Service
public class TipoAlimentoServiceImpl implements com.example.rol3.service.TipoAlimentoService{

	@Autowired
	TipoAlimentoRepository tipoAlimentoRepository;
	
	@Override
	public TipoAlimento create(TipoAlimento tipoAlimento) {
		return tipoAlimentoRepository.save(tipoAlimento);
	}
	
	@Override
	public TipoAlimento findById(int id) {
		Optional<TipoAlimento> tipoAlimento = tipoAlimentoRepository.findById(id);
		return tipoAlimento.isPresent()	? tipoAlimento.get()	: new TipoAlimento();
	}
	
	@Override
	public TipoAlimento update(TipoAlimento tipoAlimento) {
		return tipoAlimentoRepository.save(tipoAlimento);
	}
	
	@Override
	public void delete(int id) {
		tipoAlimentoRepository.deleteById(id);		
	}
	
	@Override
	public List<TipoAlimento> findAll(){
		return tipoAlimentoRepository.findAll();
	}
}
