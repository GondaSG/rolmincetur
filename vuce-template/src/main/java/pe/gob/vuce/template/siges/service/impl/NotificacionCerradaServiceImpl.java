package pe.gob.vuce.template.siges.service.impl;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.gob.vuce.template.siges.domain.Notificacion;
import pe.gob.vuce.template.siges.domain.NotificacionCerrada;
import pe.gob.vuce.template.siges.domain.NotificacionDeclaracion;
import pe.gob.vuce.template.siges.entity.ResponseEntity;
import pe.gob.vuce.template.siges.repository.NotificacionCerradaRepository;
import pe.gob.vuce.template.siges.repository.NotificacionDeclaracionRepository;
import pe.gob.vuce.template.siges.repository.NotificacionRepository;
import pe.gob.vuce.template.siges.service.NotificacionCerradaService;

@Service
public class NotificacionCerradaServiceImpl implements NotificacionCerradaService {

	@Autowired
	NotificacionCerradaRepository _repository;
	
	@Autowired
	NotificacionRepository _notificacionRepository;
	
	@Autowired
	NotificacionDeclaracionRepository _repositoryDeclaracion;
	
	@SuppressWarnings("rawtypes")
	@Override
	public ResponseEntity create(NotificacionCerrada item) throws Exception {
		try {
			Integer id = item.getId();
			String message ="";
			boolean success = false;
			if (id == 0) {
				NotificacionCerrada item2 = this._repository.save(item);
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
	
	public ResponseEntity<NotificacionCerrada> findByNotificacionId(int notificacionId) throws Exception {
		try {
			Optional<Notificacion> result = _notificacionRepository.findById(notificacionId);
			if(!result.isPresent()) {
				throw new Exception("No se encuentra notificacion registrada.");
			}
			ResponseEntity<NotificacionCerrada> response = new ResponseEntity<NotificacionCerrada>();
			List<NotificacionCerrada> items = _repository.findByNotificacionId(notificacionId);
			response.setItems(items);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}
	
	public ResponseEntity<NotificacionCerrada> validar(int notificacionId) throws Exception {
		try {
			boolean success = true;
			List<NotificacionDeclaracion> itemsDeclarados = _repositoryDeclaracion.findByNotificacionId(notificacionId);
			List<NotificacionCerrada> items = _repository.findByNotificacionId(notificacionId);
			if (items.size() == 0) {
				success = false;
			}
			else if (itemsDeclarados.size() == 0) {
				success = false;
			}
			else if (itemsDeclarados.size() != items.size()) {
				success = false;
			}
			else {
				for (int i = 0; i < items.size(); i++) {
					NotificacionCerrada item = items.get(i);
					int size = itemsDeclarados.stream().filter(p -> p.getEntidad().getId() == item.getEntidad().getId()).toArray().length;
					if (size == 0) {
						success = false;
					}
				}
			}
			ResponseEntity<NotificacionCerrada> response = new ResponseEntity<NotificacionCerrada>();
			response.setSuccess(success);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}
}
