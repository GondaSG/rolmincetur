package pe.gob.vuce.template.siges.service.impl;

import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.gob.vuce.template.siges.domain.Usuario;
import pe.gob.vuce.template.siges.entity.ResponseEntity;
import pe.gob.vuce.template.siges.repository.UsuarioRepository;
import pe.gob.vuce.template.siges.service.UsuarioService;

@Service
public class UsuarioServiceImpl implements UsuarioService {
	
	@Autowired
	UsuarioRepository _repository;
	
	public ResponseEntity<Usuario> findAll() throws Exception {
		try {
			ResponseEntity<Usuario> response = new ResponseEntity<Usuario>();
			List<Usuario> items = _repository.findAll();
			response.setItems(items);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}

	@SuppressWarnings("rawtypes")
	public ResponseEntity create(Usuario item) throws Exception {
		try {
			Integer id = item.getId();
			String message = "";
			boolean success = false;
			if (id == 0) {
				Usuario item2 = this._repository.save(item);
				id = item2.getId();
				message += "Se guardaron sus datos de manera correcta";
			} else {
				message += "Se actualizaron sus datos de manera correcta";
				this._repository.save(item);
			}
			success = true;
			ResponseEntity response = new ResponseEntity();
			response.setExtra(id.toString());
			response.setMessage(message);
			response.setSuccess(success);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}

	public ResponseEntity<Usuario> findById(int id) throws Exception {
		try {
			if (id == 0) {
				throw new Exception("No existe el elemento");
			}
			boolean success = true;
			ResponseEntity<Usuario> response = new ResponseEntity<Usuario>();
			Usuario item = _repository.findById(id).get();
			response.setSuccess(success);
			response.setItem(item);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}

	@Override
	public Usuario update(Usuario notificacion) {
		return _repository.save(notificacion);
	}

	@SuppressWarnings("rawtypes")
	@Transactional
	public ResponseEntity delete(int id) throws Exception {
		try {			
			this._repository.deleteById(id);
			ResponseEntity response = new ResponseEntity();
			response.setMessage("Se ha eliminado correctamente");
			response.setSuccess(true);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}

}
