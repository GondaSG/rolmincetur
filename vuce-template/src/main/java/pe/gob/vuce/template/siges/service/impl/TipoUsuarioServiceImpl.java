package pe.gob.vuce.template.siges.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.gob.vuce.template.siges.domain.TipoUsuario;
import pe.gob.vuce.template.siges.entity.ResponseEntity;
import pe.gob.vuce.template.siges.repository.TipoUsuarioRepository;
import pe.gob.vuce.template.siges.service.TipoUsuarioService;

@Service
public class TipoUsuarioServiceImpl implements TipoUsuarioService{

	@Autowired
	TipoUsuarioRepository _repository;
	
	public ResponseEntity<TipoUsuario> findAll() throws Exception{
		try {
			ResponseEntity<TipoUsuario> response = new ResponseEntity<TipoUsuario>();
			List<TipoUsuario> items = _repository.findAll();
			response.setItems(items);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}
}
