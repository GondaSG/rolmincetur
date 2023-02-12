package pe.gob.vuce.template.siges.service.impl;

import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.gob.vuce.template.siges.domain.Rol;
import pe.gob.vuce.template.siges.entity.ResponseEntity;
import pe.gob.vuce.template.siges.repository.RolRepository;
import pe.gob.vuce.template.siges.service.RolService;

@Service
public class RolServiceImpl implements RolService {
    @Autowired
    RolRepository _repository;
    
    @SuppressWarnings("rawtypes")
	public ResponseEntity create(Rol item) throws Exception {
		try {
			
			Integer id = item.getId();
			String message = "";
			boolean success = false;
			if (id == 0) {
				Rol item2 = this._repository.save(item);
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
    
    @SuppressWarnings("rawtypes")
	public ResponseEntity crearAsignacion(Rol item) throws Exception {
		try {			
			Integer id = item.getId();
			String message = "";
			boolean success = false;
			Rol item3 = this._repository.findById(id).get();
			item3.setAsignacion(item.getAsignacion());
			Rol item2 = this._repository.save(item3);			
			if (item2.getId() != 0) {				
				id = item2.getId();
				message += "Se guardaron sus datos de manera correcta";
				success = true;
			}			
			ResponseEntity response = new ResponseEntity();
			response.setExtra(id.toString());
			response.setMessage(message);
			response.setSuccess(success);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}

	@Override
	public ResponseEntity<Rol> findById(int id) throws Exception {
		try {
			if (id == 0) {
				throw new Exception("No exste el elemento");
			}
			boolean success = true;
			ResponseEntity<Rol> response = new ResponseEntity<Rol>();
			Rol item = _repository.findById(id).get();
			response.setSuccess(success);
			response.setItem(item);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}

	@Override
	public Rol update(Rol rol) {
		return _repository.save(rol);
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

	@Override
	public ResponseEntity<Rol> findAll() throws Exception {
		try {
			ResponseEntity<Rol> response = new ResponseEntity<Rol>();
			List<Rol> items = _repository.findAll();
			response.setItems(items);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}

}
