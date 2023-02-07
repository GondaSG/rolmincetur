package pe.gob.vuce.template.siges.service.impl;

import java.util.List;
import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pe.gob.vuce.template.dto.NotificacionDTO;
import pe.gob.vuce.template.dto.NotificacionEstadoDTO;
import pe.gob.vuce.template.siges.domain.Estado;
import pe.gob.vuce.template.siges.domain.Notificacion;
import pe.gob.vuce.template.siges.domain.NotificacionEstado;
import pe.gob.vuce.template.siges.domain.NotificacionLote;
import pe.gob.vuce.template.siges.domain.NotificacionPresentacion;
import pe.gob.vuce.template.siges.entity.PaginatorEntity;
import pe.gob.vuce.template.siges.entity.ResponseEntity;
import pe.gob.vuce.template.siges.repository.NotificacionEstadoRepository;
import pe.gob.vuce.template.siges.repository.NotificacionLoteRepository;
import pe.gob.vuce.template.siges.repository.NotificacionPresentacionRepository;
import pe.gob.vuce.template.siges.repository.NotificacionRepository;
import pe.gob.vuce.template.siges.service.NotificacionService;

@Service
public class NotificacionServiceImpl  implements NotificacionService {
	
	@Autowired
	NotificacionRepository _repository;
	
	@Autowired
	NotificacionEstadoRepository _repositoryEstado;
	
	@Autowired
	NotificacionPresentacionRepository _repositoryPresentacion;
	
	@Autowired
	NotificacionLoteRepository _repositoryLote;
	
	@Autowired(required=true)
    ModelMapper modelMapper;
	
	@Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
	
	@SuppressWarnings("rawtypes")
	@Transactional
	public ResponseEntity create(NotificacionDTO item) throws Exception {
		try {
			Integer id = item.getId();
			String message = "";
			boolean success = false;
			Notificacion item3 = modelMapper.map(item, Notificacion.class);
			if (id == 0) {
				
				Notificacion item2 = this._repository.save(item3);
				id = item2.getId();
				message += "Se guardaron sus datos de manera correcta";
				NotificacionEstadoDTO itemNE = new NotificacionEstadoDTO();
				itemNE.setIdNotificacion(id);
				int idEstadoDefault = 1;
				itemNE.setFlagActive(true);
				itemNE.setIdEstado(idEstadoDefault);
				this.updateStatus(itemNE);
			} else {
				message += "Se actualizaron sus datos de manera correcta";
				this._repository.save(item3);
			}
			this._repositoryLote.deleteNotificacionLote(id);
			for (int i = 0; i < item.getNotificacionLote().size(); i++) {
				Notificacion noti = new Notificacion();
				noti.setId(id);
				NotificacionLote nl = new NotificacionLote();				
				nl.setLote(item.getNotificacionLote().get(i).getLote());
				nl.setCantidad(item.getNotificacionLote().get(i).getCantidad());
				nl.setNotificacion(noti);
				this._repositoryLote.save(nl);
			}
			this._repositoryPresentacion.deleteNotificacionPresentacion(id);
			for (int i = 0; i < item.getNotificacionPresentacion().size(); i++) {
				Notificacion noti = new Notificacion();
				noti.setId(id);
				NotificacionPresentacion nl = new NotificacionPresentacion();
				nl.setTipoPresentacion(item.getNotificacionPresentacion().get(i).getTipoPresentacion());
				nl.setUnidadMedida(item.getNotificacionPresentacion().get(i).getUnidadMedida());
				nl.setVolumen(item.getNotificacionPresentacion().get(i).getVolumen());
				nl.setNotificacion(noti);
				this._repositoryPresentacion.save(nl);
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
	@Transactional
	public ResponseEntity updateStatus(NotificacionEstadoDTO item) throws Exception {
		try {
			Integer id = item.getIdNotificacion();
			String message = "";
			boolean success = false;
			if (id != 0) {
				message += "Se actualizaron sus datos de manera correcta";
				this._repositoryEstado.updateActive(item.getIdNotificacion());
				NotificacionEstado entity = new NotificacionEstado();
				entity.setIdEstado(item.getIdEstado());
				entity.setIdNotificacion(item.getIdNotificacion());
				entity.setFlagActive(item.getFlagActive());
				this._repositoryEstado.save(entity);
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
	public Notificacion update(NotificacionDTO notificacion) {
		Notificacion item = modelMapper.map(notificacion, Notificacion.class);
		return _repository.save(item);
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
			Page<Notificacion> pag = this._repository.search(item.getCodigoGenerado() ,page);
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
