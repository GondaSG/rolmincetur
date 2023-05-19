package pe.gob.vuce.template.siges.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.gob.vuce.template.siges.domain.Notificacion;
import pe.gob.vuce.template.siges.domain.NotificacionAccion;
import pe.gob.vuce.template.siges.entity.ResponseEntity;
import pe.gob.vuce.template.siges.repository.NotificacionAccionRepository;
import pe.gob.vuce.template.siges.repository.NotificacionRepository;
import pe.gob.vuce.template.siges.service.NotificacionAccionService;
@Service
public class NotificacionAccionServiceImpl implements NotificacionAccionService {
	
	@Autowired
	NotificacionAccionRepository _repository;
	@Autowired
	NotificacionRepository _notificacionRepository;
	@Override
	public ResponseEntity create(NotificacionAccion notificacionAccion) throws Exception {
		try {
			Integer id = notificacionAccion.getId();
			String message ="";
			boolean success = false;
			if (id == 0) {
				NotificacionAccion item2 = this._repository.save(notificacionAccion);
				id = item2.getId();
				message += "Se guardarón sus datos de manera correcta";
			}else {
				message += "Se actualizarón sus datos de manera correcta";
				this._repository.save(notificacionAccion);
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
	public ResponseEntity<NotificacionAccion> findById(int id) throws Exception {
		try {
			if (id ==0) {
				throw new Exception("No existe el elemento");
			}
			boolean success = true;
			ResponseEntity<NotificacionAccion> response = new ResponseEntity<NotificacionAccion>();
			NotificacionAccion item = _repository.findById(id).get();
			response.setSuccess(success);
			response.setItem(item);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}

	@Override
	public NotificacionAccion update(NotificacionAccion notificacionAccion) {
		_repository.save(notificacionAccion);
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
	public ResponseEntity<NotificacionAccion> findAll() throws Exception {
		try {
			ResponseEntity<NotificacionAccion> response = new ResponseEntity<NotificacionAccion>();
			List<NotificacionAccion> items = _repository.findAll();
			response.setItems(items);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}
	
	@Override
	public ResponseEntity<NotificacionAccion> findByNotificacionId(int notificacionId) throws Exception {
		try {
			Optional<Notificacion> result = _notificacionRepository.findById(notificacionId);
			if(!result.isPresent()) {
				throw new Exception("No se encuentra notificacion registrada.");
			}
			ResponseEntity<NotificacionAccion> response = new ResponseEntity<NotificacionAccion>();
			List<NotificacionAccion> items = _repository.findByNotificacionId(notificacionId);
			response.setItems(items);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}
}
