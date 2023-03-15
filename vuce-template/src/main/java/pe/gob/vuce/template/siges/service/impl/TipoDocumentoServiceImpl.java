package pe.gob.vuce.template.siges.service.impl;

import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.gob.vuce.template.siges.domain.TipoDocumento;
import pe.gob.vuce.template.siges.entity.ResponseEntity;
import pe.gob.vuce.template.siges.repository.TipoDocumentoRepository;
import pe.gob.vuce.template.siges.service.TipoDocumentoService;

@Service
public class TipoDocumentoServiceImpl implements TipoDocumentoService{

	@Autowired
	TipoDocumentoRepository _repository;
	
	@Override
	public ResponseEntity<TipoDocumento> findAll() throws Exception {
		try {
			ResponseEntity<TipoDocumento> response = new ResponseEntity<TipoDocumento>();
			List<TipoDocumento> items = _repository.findAll();
			response.setItems(items);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}		
	}
}
