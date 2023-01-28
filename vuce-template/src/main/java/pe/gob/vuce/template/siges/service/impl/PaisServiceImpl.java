package pe.gob.vuce.template.siges.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.gob.vuce.template.siges.domain.Pais;
import pe.gob.vuce.template.siges.repository.PaisRepository;
import pe.gob.vuce.template.siges.service.PaisService;

@Service
public class PaisServiceImpl implements PaisService{

	@Autowired
	PaisRepository paisRepository;
	
	@Override
	public List<Pais> findAll(){
		return paisRepository.findAll();
	}
}
