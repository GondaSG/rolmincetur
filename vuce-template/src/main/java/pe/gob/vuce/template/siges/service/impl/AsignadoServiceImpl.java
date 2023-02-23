package pe.gob.vuce.template.siges.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.gob.vuce.template.siges.domain.Asignacion;
import pe.gob.vuce.template.siges.entity.ResponseEntity;
import pe.gob.vuce.template.siges.repository.AsignadoRepository;
import pe.gob.vuce.template.siges.service.AsignadoService;

@Service
public class AsignadoServiceImpl implements AsignadoService{

	@Autowired
	AsignadoRepository _repository;
		
	public ResponseEntity<Asignacion> findAll() throws Exception{
		try {
			ResponseEntity<Asignacion> response = new ResponseEntity<Asignacion>();
			List<Asignacion> items = _repository.findAll();
			response.setItems(items);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}
}
