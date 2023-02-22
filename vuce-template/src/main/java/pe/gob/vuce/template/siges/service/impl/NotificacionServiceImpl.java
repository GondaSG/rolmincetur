package pe.gob.vuce.template.siges.service.impl;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;

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
import pe.gob.vuce.template.dto.NotificacionFaseDTO;
import pe.gob.vuce.template.siges.domain.Notificacion;
import pe.gob.vuce.template.siges.domain.NotificacionDeclaracion;
import pe.gob.vuce.template.siges.domain.NotificacionEstado;
import pe.gob.vuce.template.siges.domain.NotificacionFase;
import pe.gob.vuce.template.siges.domain.NotificacionLote;
import pe.gob.vuce.template.siges.domain.NotificacionPresentacion;
import pe.gob.vuce.template.siges.entity.PaginatorEntity;
import pe.gob.vuce.template.siges.entity.ResponseEntity;
import pe.gob.vuce.template.siges.repository.NotificacionEstadoRepository;
import pe.gob.vuce.template.siges.repository.NotificacionFaseRepository;
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
	
	@Autowired
	NotificacionFaseRepository _repositoryFase;
	
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
				if (item.getIsnacional()==true) {
					LocalDate current_date = LocalDate.now();
					String num = String.format("%04d", this._repository.count());
					String tipo = "R";
					if (item.getTipoNotificacion().getId() == 1)
						tipo = "A";
					else if (item.getTipoNotificacion().getId() == 2)
						tipo = "I";
					else if (item.getTipoNotificacion().getId() == 3)
						tipo = "R";
					item3.setCodigoGenerado(current_date.getYear()+". "+ tipo+".PE."+ num);
				}
				Notificacion item2 = this._repository.save(item3);
				id = item2.getId();
				message += "Se guardaron sus datos de manera correcta";
				NotificacionEstadoDTO itemNE = new NotificacionEstadoDTO();
				itemNE.setIdNotificacion(id);
				int idEstadoDefault = 1;
				itemNE.setFlagActivo(true);
				itemNE.setIdEstado(idEstadoDefault);
				this.updateStatus(itemNE);
				NotificacionFaseDTO itemNF = new NotificacionFaseDTO();
				itemNF.setIdNotificacion(id);
				int idFaseDefault = 1;
				itemNF.setFlagActivo(true);
				itemNF.setIdFase(idFaseDefault);
				this.updateFase(itemNF);
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
				entity.setFlagActivo(item.getFlagActivo());
				entity.setFlagLeido(false);
				entity.setMensaje(item.getMensaje());
				this._repositoryEstado.save(entity);
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
	
	@SuppressWarnings("rawtypes")
	@Transactional
	public ResponseEntity updateFase(NotificacionFaseDTO item) throws Exception {
		try {
			Integer id = item.getIdNotificacion();
			String message = "";
			boolean success = false;
			if (id != 0) {
				message += "Se actualizaron sus datos de manera correcta";
				this._repositoryFase.updateActive(item.getIdNotificacion());
				NotificacionFase entity = new NotificacionFase();
				entity.setIdFase(item.getIdFase());
				entity.setIdNotificacion(item.getIdNotificacion());
				entity.setFlagActivo(item.getFlagActivo());
				entity.setMensaje(item.getMensaje());
				this._repositoryFase.save(entity);
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
	public ResponseEntity<NotificacionDTO> findById(int id) throws Exception {
		try {
			if (id == 0) {
				throw new Exception("No existe el elemento");
			}
			boolean success = true;
			ResponseEntity<NotificacionDTO> response = new ResponseEntity<NotificacionDTO>();
			Notificacion item = _repository.findById(id).get();
			NotificacionDTO item2 = modelMapper.map(item, NotificacionDTO.class);
			item2.setNotificacionPresentacion(this._repositoryPresentacion.searchByNotificacion(id));
			item2.setNotificacionLote(this._repositoryLote.searchByNotificacion(id));
			item2.setEstados(this._repositoryEstado.searchByNotificacion(id));
			//item2.setFase(this._repositoryFase.searchByNotificacion(id));
			response.setSuccess(success);
			response.setItem(item2);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}
	
	@Override
	@Transactional
	public Notificacion update(NotificacionDTO notificacion) {
		Notificacion item = modelMapper.map(notificacion, Notificacion.class);
		return _repository.save(item);
	}
	
	@SuppressWarnings("rawtypes")
	@Transactional
	public ResponseEntity delete(int id) throws Exception {
		try {			
			//this._repository.deleteById(id);
			this._repository.updateActive(id);
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
			int value = item.getFechaCreacion() == null ? 0 : 1;
			if (item.getFechaCreacion() == null)
				item.setFechaCreacion(new java.sql.Date(Calendar.getInstance().getTime().getTime()));
			if (item.getFechaCreacionFinal() == null)
				item.setFechaCreacionFinal(new java.sql.Date(Calendar.getInstance().getTime().getTime()));
			int value2 = 0;
			if (item.getTipoNotificacionId() != null)
				value2 = 1;
			int value3 = 0;
			if (item.getEstadoId() != null)
				value3 = 1;
			Page<Notificacion> pag = this._repository.search(item.getCodigoGenerado(), item.getIsnacional(), item.getFlagDigesa(), item.getFlagSenasa(),
					item.getFechaCreacion(), item.getFechaCreacionFinal(), value,
					item.getTipoNotificacionId(), value2,
					item.getEstadoId(), value3,
					page);
			List<Notificacion> items = pag.getContent();
			paginator.setTotal((int) pag.getTotalElements());
			response.setItems(items);
			response.setPaginator(paginator);
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
				NotificacionEstado item2 = this._repositoryEstado.findByState(id, item.getEstado().getId());
				item2.setFlagLeido(true);
				this._repositoryEstado.save(item2);
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
	
	public ResponseEntity<NotificacionDTO> getNoLeidos(boolean flagDigesa,	boolean flagSanipes, boolean flagSenasa) throws Exception {
		try {
			ResponseEntity<NotificacionDTO> response = new ResponseEntity<NotificacionDTO>();
			List<Notificacion> items = this._repository.getNoLeidos(flagDigesa, flagSanipes, flagSenasa);			
			List<NotificacionDTO> notiList = Arrays.asList(modelMapper.map(items, NotificacionDTO[].class));
			for (int i = 0; i < notiList.size(); i++) {
				NotificacionDTO item = notiList.get(i);
				item.setNotificacionEstado(this._repositoryEstado.findByNoti(item.getId()));
			}
			response.setItems(notiList);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}
	
	@Override
	public ResponseEntity<NotificacionFase> findFase(int id) throws Exception {
		try {
			Optional<Notificacion> result = this._repository.findById(id);
			if(!result.isPresent()) {
				throw new Exception("No se encuentra notificacion registrada.");
			}
			ResponseEntity<NotificacionFase> response = new ResponseEntity<NotificacionFase>();
			List<NotificacionFase> items = this._repositoryFase.searchByNotificacion(id);
			response.setItems(items);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}
}
