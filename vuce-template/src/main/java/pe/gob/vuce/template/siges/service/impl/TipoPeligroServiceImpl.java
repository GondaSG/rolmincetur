package pe.gob.vuce.template.siges.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.gob.vuce.template.siges.domain.TipoPeligro;
import pe.gob.vuce.template.siges.entity.ResponseEntity;
import pe.gob.vuce.template.siges.repository.TipoPeligroRepository;
import pe.gob.vuce.template.siges.service.TipoPeligroService;

@Service
public class TipoPeligroServiceImpl implements TipoPeligroService{
	
	@Autowired
	TipoPeligroRepository _repository;
		
	public ResponseEntity<TipoPeligro> findAll() throws Exception{
		try {
			ResponseEntity<TipoPeligro> response = new ResponseEntity<TipoPeligro>();
			List<TipoPeligro> items = _repository.findAll();
			response.setItems(items);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}	
}
