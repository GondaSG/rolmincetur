package pe.gob.vuce.template.siges.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.gob.vuce.template.siges.domain.TipoPeligro;
import pe.gob.vuce.template.siges.repository.TipoPeligroRepository;
import pe.gob.vuce.template.siges.service.TipoPeligroService;

@Service
public class TipoPeligroServiceImpl implements TipoPeligroService{
	
	@Autowired
	TipoPeligroRepository tipoPeligroRepository;
	
	@Override
	public List<TipoPeligro> findAll(){
		return tipoPeligroRepository.findAll();
	}
	
}
