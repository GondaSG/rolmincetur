package pe.gob.vuce.template.siges.service.impl;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.gob.vuce.template.siges.domain.TipoAlimento;
import pe.gob.vuce.template.siges.repository.TipoAlimentoRepository;
import pe.gob.vuce.template.siges.service.TipoAlimentoService;

@Service
public class TipoAlimentoServiceImpl implements TipoAlimentoService{

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
