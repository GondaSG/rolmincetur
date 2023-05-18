package pe.gob.vuce.template.siges.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.gob.vuce.template.dto.NotificacionDTO;
import pe.gob.vuce.template.siges.domain.Ciudad;
import pe.gob.vuce.template.siges.domain.Notificacion;
import pe.gob.vuce.template.siges.entity.ResponseEntity;
import pe.gob.vuce.template.siges.repository.CiudadRepository;
import pe.gob.vuce.template.siges.service.CiudadService;

@Service
public class CiudadServiceImpl implements CiudadService{
	
	@Autowired
	CiudadRepository _repository;
	
	public ResponseEntity<Ciudad> findAll() throws Exception{
		try {
			ResponseEntity<Ciudad> response = new ResponseEntity<Ciudad>();
			List<Ciudad> items = _repository.findAll();
			response.setItems(items);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}
	
	@Override	
	public ResponseEntity<Ciudad> findById(int id) throws Exception {
		try {
			boolean success = true;
			ResponseEntity<Ciudad> response = new ResponseEntity<Ciudad>();
			List<Ciudad> items = _repository.findAll(id);
			response.setSuccess(success);
			response.setItems(items);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}
}
