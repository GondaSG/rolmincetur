package pe.gob.vuce.template.siges.service.impl;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import pe.gob.vuce.template.dto.EmailDTO;
import pe.gob.vuce.template.dto.IndicadorDTO;
import pe.gob.vuce.template.dto.NotificacionDTO;
import pe.gob.vuce.template.dto.NotificacionEstadoDTO;
import pe.gob.vuce.template.dto.NotificacionFaseDTO;
import pe.gob.vuce.template.dto.ObjectDTO;
import pe.gob.vuce.template.siges.domain.CategoriaAlimento;
import pe.gob.vuce.template.siges.domain.FuenteNotificacion;
import pe.gob.vuce.template.siges.domain.Notificacion;
import pe.gob.vuce.template.siges.domain.NotificacionDeclaracion;
import pe.gob.vuce.template.siges.domain.NotificacionDiscrepancia;
import pe.gob.vuce.template.siges.domain.NotificacionEstado;
import pe.gob.vuce.template.siges.domain.NotificacionFase;
import pe.gob.vuce.template.siges.domain.NotificacionLote;
import pe.gob.vuce.template.siges.domain.NotificacionPresentacion;
import pe.gob.vuce.template.siges.domain.Pais;
import pe.gob.vuce.template.siges.domain.TipoNotificacion;
import pe.gob.vuce.template.siges.domain.Usuario;
import pe.gob.vuce.template.siges.entity.PaginatorEntity;
import pe.gob.vuce.template.siges.entity.ResponseEntity;
import pe.gob.vuce.template.siges.repository.CategoriaAlimentoRepository;
import pe.gob.vuce.template.siges.repository.EstadoRepository;
import pe.gob.vuce.template.siges.repository.NotificacionCerradaRepository;
import pe.gob.vuce.template.siges.repository.NotificacionDeclaracionRepository;
import pe.gob.vuce.template.siges.repository.NotificacionDiscrepanciaRepository;
import pe.gob.vuce.template.siges.repository.NotificacionEstadoRepository;
import pe.gob.vuce.template.siges.repository.NotificacionFaseRepository;
import pe.gob.vuce.template.siges.repository.NotificacionLoteRepository;
import pe.gob.vuce.template.siges.repository.NotificacionPresentacionRepository;
import pe.gob.vuce.template.siges.repository.NotificacionRepository;
import pe.gob.vuce.template.siges.repository.PaisRepository;
import pe.gob.vuce.template.siges.repository.TipoNotificacionRepository;
import pe.gob.vuce.template.siges.repository.UsuarioRepository;
import pe.gob.vuce.template.siges.service.NotificacionService;

@Service
public class NotificacionServiceImpl  implements NotificacionService {
		
	@Autowired
	UsuarioRepository _repositoryUsuario;
	
	@Autowired
	NotificacionRepository _repository;
	
	@Autowired
	NotificacionEstadoRepository _repositoryEstado;
	
	@Autowired
	EstadoRepository _repositoryEstado2;
	
	@Autowired
	NotificacionPresentacionRepository _repositoryPresentacion;
	
	@Autowired
	NotificacionLoteRepository _repositoryLote;
	
	@Autowired
	NotificacionFaseRepository _repositoryFase;
	
	@Autowired
	NotificacionDiscrepanciaRepository _repositoryDiscrepancia;
	
	@Autowired
	NotificacionDeclaracionRepository _repositoryDeclaracion;
	
	@Autowired
	TipoNotificacionRepository _repositoryTipoNotificacion;
	
	@Autowired
	PaisRepository _repositoryPais;
	
	@Autowired
	CategoriaAlimentoRepository _repositoryCategoriaAlimento;
	
	@Autowired
	NotificacionCerradaRepository _repositoryCerrada;
	
	@Autowired(required=true)
    ModelMapper modelMapper;
	
	@Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
	
	@Autowired
	private JavaMailSender mailSender;
	
	@SuppressWarnings("rawtypes")
	@Transactional
	public ResponseEntity create(NotificacionDTO item) throws Exception {
		try {
			Integer id = item.getId();
			String message = "";
			boolean success = false;
			Notificacion item3 = modelMapper.map(item, Notificacion.class);
			if (id == 0) {
				if (item.getFlagNacional() != null && item.getFlagNacional() == true) {
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
				List<String> emails = this.configEmails(item2, false);
				String[] array = emails.stream().toArray(n -> new String[n]);
				this.send(item2, array);
			} else {
				message += "Se actualizaron sus datos de manera correcta";
				this._repository.save(item3);
			}
			if (item.getNotificacionLote().size() > 0)
			{
				this._repositoryLote.deleteNotificacionLote(id);
			}			
			for (int i = 0; i < item.getNotificacionLote().size(); i++) {
				Notificacion noti = new Notificacion();
				noti.setId(id);
				NotificacionLote nl = new NotificacionLote();				
				nl.setLote(item.getNotificacionLote().get(i).getLote());
				nl.setCantidad(item.getNotificacionLote().get(i).getCantidad());
				nl.setUnidadMedida(item.getNotificacionLote().get(i).getUnidadMedida());
				nl.setNotificacion(noti);
				this._repositoryLote.save(nl);
			}
			if (item.getNotificacionPresentacion().size() > 0)
			{
				this._repositoryPresentacion.deleteNotificacionPresentacion(id);
			}			
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
	
	private List<String> configEmails(Notificacion item, boolean activar) {
		int value = 0;
		List<String> emails = new ArrayList<String>();
		if (item.getFlagDigesa() && !activar) {
			value = 2;
			List<Usuario> user = this._repositoryUsuario.buscarPorEntidad(value);
			if (user.size() > 0)
			{
				for (int i = 0; i < user.size(); i++) {
					emails.add(user.get(i).getCorreo());
				}
			}
		}
		if (item.getFlagSenasa() && !activar) {
			value = 3;
			List<Usuario> user = this._repositoryUsuario.buscarPorEntidad(value);
			if (user.size() > 0)
			{
				for (int i = 0; i < user.size(); i++) {
					emails.add(user.get(i).getCorreo());
				}
			}
		}
		if (item.getFlagSanipes() && !activar) {
			value = 4;
			List<Usuario> user = this._repositoryUsuario.buscarPorEntidad(value);
			if (user.size() > 0)
			{
				for (int i = 0; i < user.size(); i++) {
					emails.add(user.get(i).getCorreo());
				}
			}
		}
		if (activar) {
			value = 6;
			List<Usuario> user = this._repositoryUsuario.buscarPorEntidad(value);
			if (user.size() > 0)
			{
				for (int i = 0; i < user.size(); i++) {
					emails.add(user.get(i).getCorreo());
				}
			}
		}
		return emails;
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
			item2.setNotificacionEstado(this._repositoryEstado.findByNoti(id));
			item2.setCerradas(this._repositoryCerrada.findByNotificacionId(id));
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
	public ResponseEntity<NotificacionDTO> search(NotificacionDTO item, PaginatorEntity paginator)
			throws Exception {
		try {
			ResponseEntity<NotificacionDTO> response = new ResponseEntity<NotificacionDTO>();
			//List<Estado> items23 = this._repositoryEstado.findAll();
			Pageable page = PageRequest.of(paginator.getOffset() - 1, paginator.getLimit());
			int value = item.getFechaCreacion() == null ? 0 : 1;
			if (item.getFechaCreacion() == null)
				item.setFechaCreacion(new java.sql.Date(Calendar.getInstance().getTime().getTime()));
			if (item.getFechaCreacionFinal() == null)
				item.setFechaCreacionFinal(new java.sql.Date(Calendar.getInstance().getTime().getTime()));
			//int value2 = item.getTipoNotificacionId() == null ? 0 : 1;
			//if (item.getTipoNotificacionId() == null) {
			//	item.setTipoNotificacionId(new ArrayList<Integer>(){{
            //        add(1);
            //        add(2);
            //       add(3);
            //          }});
			//}
			//if (item.getTipoNotificacionId() != null)
			//	value2 = 1;
			//int value3 = item.getEstadoId() == null ? 0 : 1;
			//if (item.getEstadoId() != null)
			//	value3 = 1;		
			int booleanDato = item.getFlagNacional() == null ? 0 : 1;
			if (item.getFlagNacional() == null) {
				item.setFlagNacional(false);
			}			
			Page<Notificacion> pag1 = this._repository.search(item.getCodigoGenerado(), item.getFlagNacional(), item.getFlagDigesa(), item.getFlagSenasa(),
					item.getFechaCreacion(), item.getFechaCreacionFinal(), value,
					item.getTipoNotificacionId(), //value2,
					//item.getEstadoId(), value3, 
					booleanDato,
					page);
			List<Notificacion> items2 = pag1.getContent();
			
			List<NotificacionDTO> notiList = Arrays.asList(modelMapper.map(items2, NotificacionDTO[].class));
			for (int i = 0; i < notiList.size(); i++) {
				NotificacionDTO ntdo = notiList.get(i);
				ntdo.setNotificacionEstado(this._repositoryEstado.findByNoti(ntdo.getId()));
				ntdo.setDiscrepancias(this._repositoryDiscrepancia.findByNotificacionId(ntdo.getId()));
			}
			paginator.setTotal((int) pag1.getTotalElements());
			response.setItems(notiList);
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
	
	public ResponseEntity<NotificacionDTO> getNoLeidos(Boolean flagDigesa,	Boolean flagSanipes, Boolean flagSenasa) throws Exception {
		try {
			ResponseEntity<NotificacionDTO> response = new ResponseEntity<NotificacionDTO>();
			int value = 0;
			if (flagDigesa==true && flagSenasa==true && flagSanipes==true) {
				value = 0;
			}
			else if (flagDigesa==true) {
				value = 1;
			}
			else if (flagSenasa==true) {
				value = 2;
			}
			else if (flagSanipes==true) {
				value = 3;
			}	
			List<Notificacion> items = this._repository.getNoLeidos(flagDigesa, flagSanipes, flagSenasa, value);			
			List<NotificacionDTO> listNotificacionDTO = Arrays.asList(modelMapper.map(items, NotificacionDTO[].class));
			for (int i = 0; i < listNotificacionDTO.size(); i++) {
				NotificacionDTO itemDTO = listNotificacionDTO.get(i);
				itemDTO.setTipo("Notificacion");
				itemDTO.setNotificacionEstado(this._repositoryEstado.findByNoti(itemDTO.getId()));
			}
			List<NotificacionDTO> listDiscrepanciaDTO = new ArrayList<NotificacionDTO>();
			List<NotificacionDiscrepancia> listDiscrepancia = this._repositoryDiscrepancia.findNoLeidos();
			for (int i = 0; i < listDiscrepancia.size(); i++) {
				NotificacionDiscrepancia itemDiscrepancia = listDiscrepancia.get(i);
				NotificacionDTO itemDTO = modelMapper.map(itemDiscrepancia.getNotificacion(), NotificacionDTO.class);
				NotificacionEstado notificacionEstado = new NotificacionEstado();
				Notificacion notificacion = new Notificacion();
				notificacion.setId(itemDTO.getId());
				notificacionEstado.setNotificacion(notificacion);
				itemDTO.setNotificacionEstado(notificacionEstado);
				itemDTO.setId(itemDiscrepancia.getId());
				itemDTO.setTipo("Discrepancia");
				itemDTO.setFechaCreacion(itemDiscrepancia.getFechaCreacion());
				listDiscrepanciaDTO.add(itemDTO);
			}
			List<NotificacionDTO> listDeclaracionDTO = new ArrayList<NotificacionDTO>();
			List<NotificacionDeclaracion> listDeclaracion = this._repositoryDeclaracion.findNoLeidos();
			for (int i = 0; i < listDeclaracion.size(); i++) {
				NotificacionDeclaracion itemDeclaracion = listDeclaracion.get(i);
				NotificacionDTO itemDTO = modelMapper.map(itemDeclaracion.getNotificacion(), NotificacionDTO.class);
				NotificacionEstado notificacionEstado = new NotificacionEstado();
				Notificacion notificacion = new Notificacion();
				notificacion.setId(itemDTO.getId());
				notificacionEstado.setNotificacion(notificacion);
				itemDTO.setNotificacionEstado(notificacionEstado);
				itemDTO.setId(itemDeclaracion.getId());
				itemDTO.setTipo("Declaracion");
				itemDTO.setFechaCreacion(itemDeclaracion.getFechaCreacion());
				listDeclaracionDTO.add(itemDTO);
			}
			List<NotificacionDTO> list = new ArrayList<>();
		    list.addAll(listNotificacionDTO);
		    list.addAll(listDiscrepanciaDTO);
		    list.addAll(listDeclaracionDTO);		    
		    //list = list.stream().sorted(Comparator.comparingInt(ObjectDTO::getCantidad)).collect(Collectors.toList());
		    Collections.sort(list, new Comparator<NotificacionDTO>(){
	    	  public int compare(NotificacionDTO o1, NotificacionDTO o2)
	    	  {
	    	     return o1.getFechaCreacion().compareTo(o2.getFechaCreacion());
	    	  }
	    	});
			response.setItems(list);
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
	
	@SuppressWarnings("rawtypes")
	@Transactional
	public ResponseEntity updateNoCompetencia(NotificacionDTO item) throws Exception {
		try {
			Integer id = item.getId();
			String message = "";
			boolean success = false;
			if (id != 0) {
				Notificacion item2 = this._repository.findById(id).get();
				//item2.setFlagNoCompetencia(item.getFlagNoCompetencia());
				this._repository.save(item2);
				message += "Se actualizaron sus datos de manera correcta";
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
	
	public	ResponseEntity<IndicadorDTO> indicadores(IndicadorDTO item) throws Exception {
		try {
			ResponseEntity<IndicadorDTO> response = new ResponseEntity<IndicadorDTO>();
			IndicadorDTO indicador = new IndicadorDTO();
			int value = item.getFechaCreacion() == null ? 0 : 1;
			if (item.getFechaCreacion() == null)
				item.setFechaCreacion(new java.sql.Date(Calendar.getInstance().getTime().getTime()));
			if (item.getFechaCreacionFinal() == null)
				item.setFechaCreacionFinal(new java.sql.Date(Calendar.getInstance().getTime().getTime()));
									
			List<Notificacion> items = this._repository.indicadores(item.getFechaCreacion(), item.getFechaCreacionFinal(), value);
						
			//TipoNotificacion
			List<TipoNotificacion> tipos = this._repositoryTipoNotificacion.findAll();
			List<ObjectDTO> tiposDTO = Arrays.asList(modelMapper.map(tipos, ObjectDTO[].class));						
			for (int i = 0; i < tiposDTO.size(); i++) {
				ObjectDTO object = tiposDTO.get(i);
				object.setCantidad(items.stream().filter(p -> p.getTipoNotificacion().getId() == object.getId()).toArray().length);
			}
			indicador.setTipos(tiposDTO);
			
			//Pais
			List<Pais> pais = this._repositoryPais.findAll();
			List<ObjectDTO> paisDTO = Arrays.asList(modelMapper.map(pais, ObjectDTO[].class));
			for (int i = 0; i < paisDTO.size(); i++) {
				ObjectDTO object = paisDTO.get(i);
				object.setCantidad(items.stream().filter(p -> p.getPais().getId() == object.getId()).toArray().length);
			}			
			paisDTO = paisDTO.stream().sorted(Comparator.comparingInt(ObjectDTO::getCantidad)).collect(Collectors.toList());
			Collections.reverse(paisDTO);
			indicador.setPaises(paisDTO);
			
			//Peligros			
			List<ObjectDTO> peligrosDTO = new ArrayList<ObjectDTO>();
			ObjectDTO peligrosDTO1 = new ObjectDTO();
			peligrosDTO1.setNombre("Biológico");
			peligrosDTO1.setCantidad(items.stream().filter(p -> p.getFlagBiologico() != null && p.getFlagBiologico() == true).toArray().length);
			peligrosDTO.add(peligrosDTO1);
			ObjectDTO peligrosDTO2 = new ObjectDTO();
			peligrosDTO2.setNombre("Químico");
			peligrosDTO2.setCantidad(items.stream().filter(p -> p.getFlagQuimico() != null && p.getFlagQuimico() == true).toArray().length);
			peligrosDTO.add(peligrosDTO2);			
			ObjectDTO peligrosDTO4 = new ObjectDTO();
			peligrosDTO4.setNombre("Físico");
			peligrosDTO4.setCantidad(items.stream().filter(p -> p.getFlagFisico() != null && p.getFlagFisico() == true).toArray().length);
			peligrosDTO.add(peligrosDTO4);
			indicador.setPeligros(peligrosDTO);
			ObjectDTO peligrosDTO3 = new ObjectDTO();
			peligrosDTO3.setNombre("Otros");
			peligrosDTO3.setCantidad(items.stream().filter(p -> p.getFlagOtro() != null && p.getFlagOtro() == true).toArray().length);
			peligrosDTO.add(peligrosDTO3);
			indicador.setPeligros(peligrosDTO);
			
			//Nacional
			ObjectDTO nacionalDTO = new ObjectDTO();
			nacionalDTO.setNombre("Nacional");
			nacionalDTO.setCantidad(items.stream().filter(p -> p.getFlagNacional() != null && p.getFlagNacional() == true).toArray().length);
			indicador.setNacional(nacionalDTO);
			
			//Internacional
			ObjectDTO internacionalDTO = new ObjectDTO();
			internacionalDTO.setNombre("Internacional");
			internacionalDTO.setCantidad(items.stream().filter(p -> p.getFlagNacional() != null && p.getFlagNacional() == false).toArray().length);
			indicador.setInternacional(internacionalDTO);
			
			//Alimentos
			List<CategoriaAlimento> categoria = this._repositoryCategoriaAlimento.findAll();
			List<ObjectDTO> categoriaDTO = Arrays.asList(modelMapper.map(categoria, ObjectDTO[].class));
			for (int i = 0; i < categoriaDTO.size(); i++) {
				ObjectDTO object = categoriaDTO.get(i);
				object.setCantidad(items.stream().filter(p -> p.getTipoNotificacion().getId() == object.getId()).toArray().length);
			}			
			categoriaDTO = categoriaDTO.stream().sorted(Comparator.comparingInt(ObjectDTO::getCantidad)).collect(Collectors.toList());
			Collections.reverse(categoriaDTO);
			indicador.setRechazos(categoriaDTO);
			
			indicador.setTotal(items.size());
			response.setItem(indicador);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}
	

	@Override
	public ByteArrayInputStream exportar(NotificacionDTO item) throws Exception{
		String[] columns = {"CODIGO", "PRODUCTOR", "NOMBRE IMPORTADOR", "NOMBRE EXPORTADOR", "NOMBRE ALIMENTO",
				"CATEGORÍA ALIMENTO", "TIPO ALIMENTO","FECHA NOTIFICACIÓN","FECHA EVENTO","TIPO NOTIFICACIÓN",
				"PELIGRO ESPECÍFICO","AFECTA HUMANOS", "PAÍS", "CIUDAD","FECHA PRODUCCIÓN","FECHA VENCIMIENTO",
				"OBSERVACIONES","TITULO"};
		
		Workbook workbook = new HSSFWorkbook();
		ByteArrayOutputStream stream = new ByteArrayOutputStream();
		
		Sheet sheet = workbook.createSheet("Notificacion");
		Row row = sheet.createRow(0);
		
		for (int i = 0; i < columns.length; i++) {
			Cell cell = row.createCell(i);
			cell.setCellValue(columns[i]);	
		}
		
		int value = item.getFechaCreacion() == null ? 0 : 1;
		if (item.getFechaCreacion() == null)
			item.setFechaCreacion(new java.sql.Date(Calendar.getInstance().getTime().getTime()));
		if (item.getFechaCreacionFinal() == null)
			item.setFechaCreacionFinal(new java.sql.Date(Calendar.getInstance().getTime().getTime()));		
		int booleanDato = item.getFlagNacional() == null ? 0 : 1;
		if (item.getFlagNacional() == null) {
			item.setFlagNacional(false);
		}
		
		List<Notificacion> notificaciones = this._repository.search2(item.getCodigoGenerado(), item.getFlagNacional(),
				item.getFlagDigesa(), item.getFlagSenasa(),	item.getFechaCreacion(), item.getFechaCreacionFinal(), value,
				item.getTipoNotificacionId(), booleanDato);
		int initRow = 1;
		for (Notificacion notificacion : notificaciones) {
			row = sheet.createRow(initRow);
			row.createCell(0).setCellValue(notificacion.getCodigoGenerado());
			row.createCell(1).setCellValue(notificacion.getProductor());
			row.createCell(2).setCellValue(notificacion.getDatoImportador());
			row.createCell(3).setCellValue(notificacion.getDatoExportador());
			row.createCell(4).setCellValue(notificacion.getNombreAlimento());
			row.createCell(5).setCellValue(notificacion.getCategoriaAlimento().getNombre());
			row.createCell(6).setCellValue(notificacion.getTipoAlimento().getNombre());
			row.createCell(7).setCellValue(notificacion.getFechaNotificacion());
			row.createCell(8).setCellValue(notificacion.getFechaEvento());
			row.createCell(9).setCellValue(notificacion.getTipoNotificacion().getNombre());
			row.createCell(10).setCellValue(notificacion.getPeligroEspecifico());
			row.createCell(11).setCellValue(notificacion.getFlagAfectado());
			row.createCell(12).setCellValue(notificacion.getPais().getNombre());
			row.createCell(13).setCellValue(notificacion.getCiudad().getNombre());
			row.createCell(14).setCellValue(notificacion.getFechaProduccion());
			row.createCell(15).setCellValue(notificacion.getFechaVencimiento());
			row.createCell(15).setCellValue(notificacion.getComentario());
			row.createCell(16).setCellValue(notificacion.getTitulo());	
			row.createCell(16).setCellValue(notificacion.getFlagDigesa());
			initRow++;
		}		
		workbook.write(stream);
		workbook.close();		
		return new ByteArrayInputStream(stream.toByteArray());
	}
	
	@Override		
	public ResponseEntity<NotificacionDTO> afectaHumanos(NotificacionDTO item, PaginatorEntity paginator)
			throws Exception {
		try {
			ResponseEntity<NotificacionDTO> response = new ResponseEntity<NotificacionDTO>();
			Pageable page = PageRequest.of(paginator.getOffset() - 1, paginator.getLimit());
			Page<Notificacion> pag1 = this._repository.afectaHumanos(item.getCodigoGenerado(), page);
			List<Notificacion> items2 = pag1.getContent();
			
			List<NotificacionDTO> notiList = Arrays.asList(modelMapper.map(items2, NotificacionDTO[].class));
			for (int i = 0; i < notiList.size(); i++) {
				NotificacionDTO ntdo = notiList.get(i);
				ntdo.setNotificacionEstado(this._repositoryEstado.findByNoti(ntdo.getId()));
				ntdo.setDiscrepancias(this._repositoryDiscrepancia.findByNotificacionId(ntdo.getId()));
			}
			paginator.setTotal((int) pag1.getTotalElements());
			response.setItems(notiList);
			response.setPaginator(paginator);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}
	
	public void send(Notificacion item, String[] emails) {
		SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("riveraevento@gmail.com");
        message.setTo(emails);
        message.setSubject("VUCE - Gestión de Notificaciones de Inocuidad Alimentaria – Notificación # " + item.getCodigoGenerado());
        message.setText("Estimado Funcionario \n" + "\n" +
        		"Tiene una nueva notificación en el sistema de de la plataforma VUCE: \n" + "\n" +
        		"Nro. Notificación: " + item.getCodigoGenerado() + "\n" +
        		"Nombre de la notificación: " + item.getTitulo() + "\n" +
        		"Tipo de Notificación: " + item.getTipoNotificacion().getNombre() + "\n" +
        		"Fuente de la notificación: " + (item.getFlagNacional() ? "Nacional" : "Internacional") + " - " + item.getFuenteNotificacion().getNombre() + "\n" +
        		"Fecha del evento: "+ item.getFechaEvento().toString() + "\n" + "\n" +
        		"Mensaje automatico, por favor no responder. Las tildes has sido omitidas intencionalmente." + "\n"
        		+ "Aviso de confidencialidad:\n "
        		+ "Este correo electronico y/o material adjunto es para uso exclusivo de la persona o entidad a la expresamente se le ha enviado, y puede contener información confidencial o material privilegiado."
        		);
        try {
        	 mailSender.send(message);
		} catch (MailException  e) {
			// TODO: handle exception
			System.out.println(e.getMessage());
		}
	}
	
	@SuppressWarnings("rawtypes")
	public ResponseEntity send(EmailDTO item) throws Exception {
		try {
			boolean success = false;
			Integer id = item.getId();
			String message = "";
			List<String> emails = new ArrayList<String>();
			if (id > 0) {
				Notificacion noti = this._repository.findById(id).get();
				if (noti.getFlagNacional()) {
					emails = this.configEmails(noti, false);
				}
				else {
					emails = this.configEmails(noti, true);
				}				
				List<String> c = new ArrayList<String>();
				for (int i = 0; i < item.getCorreos().length; i++) {
					emails.add(item.getCorreos()[i]);
				}
				String[] array = emails.stream().toArray(n -> new String[n]);
				//emails = emails.concat(item.getCorreos());
				this.send(noti, array);
				success = true;
				message = "Se enviado los correos correctamente";
			}
			ResponseEntity response = new ResponseEntity();
			response.setSuccess(success);
			response.setMessage(message);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}	
	}
	
	public void send() throws MessagingException{
		Notificacion item = new Notificacion();
		item.setCodigoGenerado("2023. P.023");
		TipoNotificacion t = new TipoNotificacion();		
		t.setNombre("Rechazo");
		FuenteNotificacion f = new FuenteNotificacion();
		f.setNombre("Infosan");
		
		item.setFuenteNotificacion(f);		
		item.setTipoNotificacion(t);
		item.setFlagNacional(true);
        item.setTitulo("Leche Gloria");
        item.setFechaEvento(new Date());  
		 
        MimeMessage mime = this.mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mime, true);
        helper.setFrom("riveraevento@gmail.com");
        helper.setTo("riveraevento@gmail.com");
        helper.setSubject("VUCE - Gestón de Notificaciones de Inocuidad Alimentaria - Notificación # " + item.getCodigoGenerado());
        String htmlText = "<div style='background:#FFFFFF;text-align:left;"+
                      "font-size:10pt;font-weight:400;color:#000000;padding:10px;'>"+
                      
                      "Estimado Funcionario <br /><br />"+
                      "Tiene una nueva notificación en el sistema de " +
                      "<b>Gestión Gestón de Notificaciones de Inocuidad Alimentaria</b>" +
                      " de la plataforma VUCE: <br /><br />"+
                      
                      "Nro. Notificación: " + "<b>" + item.getCodigoGenerado()   + "</b><br />"+
                      "Nombre de la notificación: " + "<b>" +item.getTitulo() + "</b><br />" +
                      "Tipo de Notificación: " + item.getTipoNotificacion().getNombre()  +  " <br />"+                    
                      "Fuente de la notificación: " + (item.getFlagNacional() ? "Nacional" : "Internacional") + " - " + item.getFuenteNotificacion().getNombre() + " <br />"+
                      "Fecha del evento: "+ item.getFechaEvento().toString() +  " <br /><br />"+
                      
                      "Mensaje automatico, por favor no responder. Las tildes has sido omitidas intencionalmente.<br />" + 
                      "<b>Aviso de confidencialidad: </b><br />" +
                      "Este correo electronico y/o material adjunto es para uso exclusivo de la persona o entidad a la expresamente se le ha enviado, y puede contener información confidencial o material privilegiado."+
              		
                      "</div>";
          helper.setText(htmlText,true);
          this.mailSender.send(mime);
          }        
		
}
