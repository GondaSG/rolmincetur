package pe.gob.vuce.template.siges.service.impl;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.gob.vuce.template.siges.domain.Notificacion;
import pe.gob.vuce.template.siges.domain.NotificacionNoDeclaracion;
import pe.gob.vuce.template.siges.entity.ResponseEntity;
import pe.gob.vuce.template.siges.repository.NotificacionNoDeclaracionRepository;
import pe.gob.vuce.template.siges.repository.NotificacionRepository;
import pe.gob.vuce.template.siges.service.NotificacionNoDeclaracionService;

@Service
public class NotificacionNoDeclaracionServiceImpl implements NotificacionNoDeclaracionService {

	@Autowired
	NotificacionNoDeclaracionRepository _repository;
	
	@Autowired
	NotificacionRepository _notificacionRepository;
	
	@SuppressWarnings("rawtypes")
	@Override
	public ResponseEntity create(NotificacionNoDeclaracion item) throws Exception {
		try {
			Integer id = item.getId();
			String message ="";
			boolean success = false;
			if (id == 0) {
				NotificacionNoDeclaracion item2 = this._repository.save(item);
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
	public ResponseEntity<NotificacionNoDeclaracion> findById(int id) throws Exception {
		try {
			if (id ==0) {
				throw new Exception("No existe el elemento");
			}
			boolean success = true;
			ResponseEntity<NotificacionNoDeclaracion> response = new ResponseEntity<NotificacionNoDeclaracion>();
			NotificacionNoDeclaracion item = _repository.findById(id).get();
			response.setSuccess(success);
			response.setItem(item);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}

	@Override
	public NotificacionNoDeclaracion update(NotificacionNoDeclaracion notificacionDeclaracion) {
		_repository.save(notificacionDeclaracion);
		return null;
	}

	@SuppressWarnings("rawtypes")
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
	public ResponseEntity<NotificacionNoDeclaracion> findAll() throws Exception {
		try {
			ResponseEntity<NotificacionNoDeclaracion> response = new ResponseEntity<NotificacionNoDeclaracion>();
			List<NotificacionNoDeclaracion> items = _repository.findAll();
			response.setItems(items);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}

	@Override
	public ResponseEntity<NotificacionNoDeclaracion> findByNotificacionId(int notificacionId) throws Exception {
		try {
			Optional<Notificacion> result = _notificacionRepository.findById(notificacionId);
			if(!result.isPresent()) {
				throw new Exception("No se encuentra notificacion registrada.");
			}
			ResponseEntity<NotificacionNoDeclaracion> response = new ResponseEntity<NotificacionNoDeclaracion>();
			List<NotificacionNoDeclaracion> items = _repository.findByNotificacionId(notificacionId);
			response.setItems(items);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}
}
