package pe.gob.vuce.template.siges.service.impl;

import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pe.gob.vuce.template.dto.NotificacionDTO;
import pe.gob.vuce.template.siges.domain.Notificacion;
import pe.gob.vuce.template.siges.entity.PaginatorEntity;
import pe.gob.vuce.template.siges.entity.ResponseEntity;
import pe.gob.vuce.template.siges.repository.NotificacionRepository;
import pe.gob.vuce.template.siges.service.NotificacionService;

@Service
public class NotificacionServiceImpl  implements NotificacionService {
	
	@Autowired
	NotificacionRepository _repository;
	
	@SuppressWarnings("rawtypes")
	public ResponseEntity create(Notificacion item) throws Exception {
		try {
			Integer id = item.getId();
			String message = "";
			boolean success = false;
			if (id == 0) {
				Notificacion item2 = this._repository.save(item);
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

	@Override	
	public ResponseEntity<Notificacion> findById(int id) throws Exception {
		try {
			if (id == 0) {
				throw new Exception("No existe el elemento");
			}
			boolean success = true;
			ResponseEntity<Notificacion> response = new ResponseEntity<Notificacion>();
			Notificacion item = _repository.findById(id).get();
			response.setSuccess(success);
			response.setItem(item);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}
	
	@Override
	public Notificacion update(Notificacion notificacion) {
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
	
	public ResponseEntity<Notificacion> findAll() throws Exception {
		try {
			ResponseEntity<Notificacion> response = new ResponseEntity<Notificacion>();
			List<Notificacion> items = _repository.findAll();
			response.setItems(items);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}
	
	@Override		
	public ResponseEntity<Notificacion> search(NotificacionDTO item, PaginatorEntity paginator)
			throws Exception {
		try {
			ResponseEntity<Notificacion> response = new ResponseEntity<Notificacion>();
			Pageable page = PageRequest.of(paginator.getOffset() - 1, paginator.getLimit());
			Page<Notificacion> pag = this._repository.search(page);
			List<Notificacion> items = pag.getContent();
			paginator.setTotal((int) pag.getTotalElements());
			response.setItems(items);
			response.setPaginator(paginator);
			return response;

		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}	
}
