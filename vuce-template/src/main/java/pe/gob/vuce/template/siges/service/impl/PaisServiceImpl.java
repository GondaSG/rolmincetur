package pe.gob.vuce.template.siges.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.gob.vuce.template.siges.domain.Ciudad;
import pe.gob.vuce.template.siges.domain.Pais;
import pe.gob.vuce.template.siges.entity.ResponseEntity;
import pe.gob.vuce.template.siges.repository.PaisRepository;
import pe.gob.vuce.template.siges.service.PaisService;

@Service
public class PaisServiceImpl implements PaisService{

	@Autowired
	PaisRepository _repository;
		
	public ResponseEntity<Pais> findAll() throws Exception{
		try {
			ResponseEntity<Pais> response = new ResponseEntity<Pais>();
			List<Pais> items = _repository.findAll();
			response.setItems(items);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}
}
