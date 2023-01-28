package pe.gob.vuce.template.siges.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.gob.vuce.template.siges.domain.Ciudad;
import pe.gob.vuce.template.siges.repository.CiudadRepository;
import pe.gob.vuce.template.siges.service.CiudadService;

@Service
public class CiudadServiceImpl implements CiudadService{
	
	@Autowired
	CiudadRepository ciudadRepository;
	
	@Override
	public List<Ciudad> findAll(){
		return ciudadRepository.findAll();
	}

}
