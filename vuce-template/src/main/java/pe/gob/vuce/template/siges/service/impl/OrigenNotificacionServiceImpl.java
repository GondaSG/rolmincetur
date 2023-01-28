package pe.gob.vuce.template.siges.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.gob.vuce.template.siges.domain.OrigenNotificacion;
import pe.gob.vuce.template.siges.repository.OrigenNotificacionRepository;
import pe.gob.vuce.template.siges.service.OrigenNotificacionService;

@Service
public class OrigenNotificacionServiceImpl implements OrigenNotificacionService {
	
	@Autowired
	OrigenNotificacionRepository origenNotificacionRepository;
	
	@Override
	public List<OrigenNotificacion> findAll(){
		return origenNotificacionRepository.findAll();
	}

}
