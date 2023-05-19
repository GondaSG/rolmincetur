package pe.gob.vuce.template.siges.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.gob.vuce.template.siges.domain.CategoriaAlimento;
import pe.gob.vuce.template.siges.domain.TipoNotificacion;
import pe.gob.vuce.template.siges.entity.ResponseEntity;
import pe.gob.vuce.template.siges.repository.TipoNotificacionRepository;
import pe.gob.vuce.template.siges.service.TipoNotificacionService;

@Service
public class TipoNotificacionServiceImpl implements TipoNotificacionService{

	@Autowired
	TipoNotificacionRepository _repository;

	@Override
	public ResponseEntity<TipoNotificacion> findAll() throws Exception{
		try {
			ResponseEntity<TipoNotificacion> response = new ResponseEntity<TipoNotificacion>();
			List<TipoNotificacion> items = _repository.findAll();
			response.setItems(items);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}
}
