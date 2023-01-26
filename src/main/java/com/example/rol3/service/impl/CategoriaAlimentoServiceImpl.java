package com.example.rol3.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.rol3.domain.CategoriaAlimento;
import com.example.rol3.repository.CategoriaAlimentoRepository;

@Service
public class CategoriaAlimentoServiceImpl implements com.example.rol3.service.CategoriaAlimentoService {
	
	@Autowired
	CategoriaAlimentoRepository categoriaAlimentoRepository;
	
	@Override
	public CategoriaAlimento create(CategoriaAlimento categoriaAlimento) {
		return categoriaAlimentoRepository.save(categoriaAlimento);
	}
	
	@Override
	public CategoriaAlimento findById(int id) {
		Optional<CategoriaAlimento> categoriaAlimento = categoriaAlimentoRepository.findById(id);
		return categoriaAlimento.isPresent() ? categoriaAlimento.get() : new CategoriaAlimento();
	}
	
	@Override
	public CategoriaAlimento update(CategoriaAlimento categoriaAlimento) {
		return categoriaAlimentoRepository.save(categoriaAlimento);
	}
	
	@Override
	public void delete (int id) {
		categoriaAlimentoRepository.deleteById(id);
	}
	
	@Override
	public List<CategoriaAlimento> findAll(){
		return categoriaAlimentoRepository.findAll();
	}

}
