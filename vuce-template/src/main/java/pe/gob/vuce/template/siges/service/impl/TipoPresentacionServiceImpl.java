package pe.gob.vuce.template.siges.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.gob.vuce.template.siges.domain.CategoriaAlimento;
import pe.gob.vuce.template.siges.domain.TipoPresentacion;
import pe.gob.vuce.template.siges.entity.ResponseEntity;
import pe.gob.vuce.template.siges.repository.TipoPresentacionRepository;
import pe.gob.vuce.template.siges.service.TipoPresentacionService;

@Service
public class TipoPresentacionServiceImpl implements TipoPresentacionService{

	@Autowired
	TipoPresentacionRepository _repository;
	
	@Override
	public ResponseEntity<TipoPresentacion> findAll() throws Exception{
		try {
			ResponseEntity<TipoPresentacion> response = new ResponseEntity<TipoPresentacion>();
			List<TipoPresentacion> items = _repository.findAll();
			response.setItems(items);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}
}
