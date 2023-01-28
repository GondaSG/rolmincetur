package pe.gob.vuce.template.siges.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.gob.vuce.template.siges.domain.TipoPresentacion;
import pe.gob.vuce.template.siges.repository.TipoPresentacionRepository;
import pe.gob.vuce.template.siges.service.TipoPresentacionService;

@Service
public class TipoPresentacionServiceImpl implements TipoPresentacionService{

	@Autowired
	TipoPresentacionRepository tipoPresentacionRepository;
	
	@Override
	public List<TipoPresentacion> findAll(){
		return tipoPresentacionRepository.findAll();
	}
}
