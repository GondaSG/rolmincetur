package pe.gob.vuce.template.siges.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.gob.vuce.template.siges.domain.TipoNotificacion;
import pe.gob.vuce.template.siges.repository.TipoNotificacionRepository;
import pe.gob.vuce.template.siges.service.TipoNotificacionService;

@Service
public class TipoNotificacionServiceImpl implements TipoNotificacionService{

	@Autowired
	TipoNotificacionRepository tipoNotificacionRepository;

	@Override
	public List<TipoNotificacion> findAll() {
		// TODO Auto-generated method stub
		return tipoNotificacionRepository.findAll();
	}
}
