package pe.gob.vuce.template.siges.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.gob.vuce.template.siges.domain.OrigenNotificacion;
import pe.gob.vuce.template.siges.entity.ResponseEntity;
import pe.gob.vuce.template.siges.repository.OrigenNotificacionRepository;
import pe.gob.vuce.template.siges.service.OrigenNotificacionService;

@Service
public class OrigenNotificacionServiceImpl implements OrigenNotificacionService {
	
	@Autowired
	OrigenNotificacionRepository _repository;

	public ResponseEntity<OrigenNotificacion> findAll() throws Exception{
		try {
			ResponseEntity<OrigenNotificacion> response = new ResponseEntity<OrigenNotificacion>();
			List<OrigenNotificacion> items = _repository.findAll();
			response.setItems(items);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}

}
