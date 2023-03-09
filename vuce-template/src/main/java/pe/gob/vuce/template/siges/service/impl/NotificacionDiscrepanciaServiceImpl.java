package pe.gob.vuce.template.siges.service.impl;

import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.gob.vuce.template.dto.NotificacionDTO;
import pe.gob.vuce.template.siges.domain.Notificacion;
import pe.gob.vuce.template.siges.domain.NotificacionDiscrepancia;
import pe.gob.vuce.template.siges.entity.ResponseEntity;
import pe.gob.vuce.template.siges.repository.NotificacionDiscrepanciaRepository;
import pe.gob.vuce.template.siges.repository.NotificacionRepository;
import pe.gob.vuce.template.siges.service.NotificacionDiscrepanciaService;

@Service
public class NotificacionDiscrepanciaServiceImpl implements NotificacionDiscrepanciaService  {

	@Autowired
	NotificacionDiscrepanciaRepository _repository;
	
	@Autowired
	NotificacionRepository _notificacionRepository;
	
	@SuppressWarnings("rawtypes")
	@Override
	public ResponseEntity create(NotificacionDiscrepancia item) throws Exception {
		try {
			Integer id = item.getId();
			String message ="";
			boolean success = false;
			if (id == 0) {
				item.setFlagLeido(false);
				NotificacionDiscrepancia item2 = this._repository.save(item);
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
	public ResponseEntity<NotificacionDiscrepancia> findById(int id) throws Exception {
		try {
			if (id ==0) {
				throw new Exception("No existe el elemento");
			}
			boolean success = true;
			ResponseEntity<NotificacionDiscrepancia> response = new ResponseEntity<NotificacionDiscrepancia>();
			NotificacionDiscrepancia item = _repository.findById(id).get();
			response.setSuccess(success);
			response.setItem(item);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}

	@Override
	public NotificacionDiscrepancia update(NotificacionDiscrepancia notificacionDiscrepancia) {
		_repository.save(notificacionDiscrepancia);
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
	public ResponseEntity<NotificacionDiscrepancia> findAll() throws Exception {
		try {
			ResponseEntity<NotificacionDiscrepancia> response = new ResponseEntity<NotificacionDiscrepancia>();
			List<NotificacionDiscrepancia> items = _repository.findAll();
			response.setItems(items);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}

	@Override
	public ResponseEntity<NotificacionDiscrepancia> findByNotificacionId(int notificacionId) throws Exception {
		try {
			Optional<Notificacion> result = _notificacionRepository.findById(notificacionId);
			if(!result.isPresent()) {
				throw new Exception("No se encuentra notificacion registrada.");
			}
			ResponseEntity<NotificacionDiscrepancia> response = new ResponseEntity<NotificacionDiscrepancia>();
			List<NotificacionDiscrepancia> items = _repository.findByNotificacionId(notificacionId);
			response.setItems(items);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}
	
	@SuppressWarnings("rawtypes")
	@Transactional
	public ResponseEntity updateLeido(NotificacionDTO item) throws Exception {
		try {
			Integer id = item.getId();
			String message = "";
			boolean success = false;
			if (id != 0) {
				message += "Se actualizaron sus datos de manera correcta";
				NotificacionDiscrepancia item2 = this._repository.findById(id).get();
				item2.setFlagLeido(true);
				this._repository.save(item2);
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
}
