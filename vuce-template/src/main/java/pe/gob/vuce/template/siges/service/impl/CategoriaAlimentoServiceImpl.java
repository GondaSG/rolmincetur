package pe.gob.vuce.template.siges.service.impl;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.gob.vuce.template.siges.domain.CategoriaAlimento;
import pe.gob.vuce.template.siges.repository.CategoriaAlimentoRepository;
import pe.gob.vuce.template.siges.service.CategoriaAlimentoService;

@Service
public class CategoriaAlimentoServiceImpl implements CategoriaAlimentoService {
	
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
