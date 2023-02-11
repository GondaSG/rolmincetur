package pe.gob.vuce.template.siges.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.gob.vuce.template.siges.domain.Entidad;
import pe.gob.vuce.template.siges.domain.Notificacion;
import pe.gob.vuce.template.siges.domain.NotificacionDeclaracion;
import pe.gob.vuce.template.siges.entity.ResponseEntity;
import pe.gob.vuce.template.siges.repository.EntidadRepository;
import pe.gob.vuce.template.siges.repository.NotificacionDeclaracionRepository;
import pe.gob.vuce.template.siges.repository.NotificacionRepository;
import pe.gob.vuce.template.siges.service.NotificacionDeclaracionService;

@Service
public class NotificacionDeclaracionServiceImpl implements NotificacionDeclaracionService {

	@Autowired
	NotificacionDeclaracionRepository _repository;
	
	@Autowired
	NotificacionRepository _notificacionRepository;
	
	@Autowired
	EntidadRepository _entidadRepository;
	
	@Override
	public ResponseEntity create(NotificacionDeclaracion item) throws Exception {
		try {
			Integer id = item.getId();
			String message ="";
			boolean success = false;
			if (id == 0) {
				NotificacionDeclaracion item2 = this._repository.save(item);
				id = item2.getId();
				message += "Se guardarón sus datos de manera correcta";
			}else {
				message += "Se actualizarón sus datos de manera correcta";
				this._repository.save(item);
			}
			success = true;
			ResponseEntity response = new ResponseEntity();
			response.setExtra(id.toString());
			response.setMessage(message);
			response.setSuccess(success);
			return response;
		}catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}

	@Override
	public ResponseEntity<NotificacionDeclaracion> findById(int id) throws Exception {
		try {
			if (id ==0) {
				throw new Exception("No existe el elemento");
			}
			boolean success = true;
			ResponseEntity<NotificacionDeclaracion> response = new ResponseEntity<NotificacionDeclaracion>();
			NotificacionDeclaracion item = _repository.findById(id).get();
			response.setSuccess(success);
			response.setItem(item);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}

	@Override
	public NotificacionDeclaracion update(NotificacionDeclaracion notificacionDeclaracion) {
		_repository.save(notificacionDeclaracion);
		return null;
	}

	@Override
	public ResponseEntity delete(int id) throws Exception {
		try {
			this._repository.deleteById(id);
			ResponseEntity response = new ResponseEntity<>();
			response.setMessage("Se ha eliminado correctamente");
			response.setSuccess(true);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}

	@Override
	public ResponseEntity<NotificacionDeclaracion> findAll() throws Exception {
		try {
			ResponseEntity<NotificacionDeclaracion> response = new ResponseEntity<NotificacionDeclaracion>();
			List<NotificacionDeclaracion> items = _repository.findAll();
			response.setItems(items);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}

	@Override
	public ResponseEntity<NotificacionDeclaracion> findByNotificacionId(int notificacionId) throws Exception {
		try {
			Optional<Notificacion> result = _notificacionRepository.findById(notificacionId);
			if(!result.isPresent()) {
				throw new Exception("No se encuentra notificacion registrada.");
			}
			ResponseEntity<NotificacionDeclaracion> response = new ResponseEntity<NotificacionDeclaracion>();
			List<NotificacionDeclaracion> items = _repository.findByNotificacionId(notificacionId);
			response.setItems(items);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}

	@Override
	public ResponseEntity<NotificacionDeclaracion> findByEntidadId(int entidadId) throws Exception {
		try {
			Optional<Entidad> result = _entidadRepository.findById(entidadId);
			if(!result.isPresent()) {
				throw new Exception("No se encuentra notificacion registrada.");
			}
			ResponseEntity<NotificacionDeclaracion> response = new ResponseEntity<NotificacionDeclaracion>();
			List<NotificacionDeclaracion> items = _repository.findByNotificacionId(entidadId);
			response.setItems(items);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}

}
