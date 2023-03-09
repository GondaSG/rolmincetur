package pe.gob.vuce.template.siges.controller;

import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import pe.gob.vuce.template.dto.IndicadorDTO;
import pe.gob.vuce.template.dto.NotificacionDTO;
import pe.gob.vuce.template.dto.NotificacionEstadoDTO;
import pe.gob.vuce.template.dto.NotificacionFaseDTO;
import pe.gob.vuce.template.siges.domain.Notificacion;
import pe.gob.vuce.template.siges.domain.NotificacionFase;
import pe.gob.vuce.template.siges.entity.PaginatorEntity;
import pe.gob.vuce.template.siges.entity.ResponseEntity;
import pe.gob.vuce.template.siges.service.NotificacionService;

@RestController
@RequestMapping(value="notificacion")
public class NotificacionController extends BaseController {

	@Autowired
	NotificacionService _service;
	
	@GetMapping
	public ResponseEntity<Notificacion> findAll(){
		ResponseEntity<Notificacion> response = new ResponseEntity<>();
		try {
			response = this._service.findAll();
		} catch (Exception ex) {
			response.setMessage(ex);
		}
		return response;
	}
	
	@RequestMapping(value = "/updatestatus")
	@PostMapping
	public ResponseEntity<?> estados(@RequestBody NotificacionEstadoDTO item){
		try {
			ResponseEntity<?> response = this._service.updateStatus(item);
			return response;
		} catch (Exception ex) {
			return super.getJSON(ex);
		}
	}
	
	@PostMapping
	public ResponseEntity<?> create(@RequestBody NotificacionDTO item){
		try {
			ResponseEntity<?> response = this._service.create(item);
			return response;
		} catch (Exception ex) {
			return super.getJSON(ex);
		}
	}
	
	@PutMapping
	public ResponseEntity<?> update(@RequestBody NotificacionDTO item){
		try {
			ResponseEntity<?> response = this._service.create(item);
			return response;
		} catch (Exception ex) {
			return super.getJSON(ex);
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable("id") int id){
		try {
			ResponseEntity<?> response = this._service.delete(id);
			return response;
		} catch (Exception ex) {
			return super.getJSON(ex);
		}
	}
	
	@SuppressWarnings("unchecked")
	@GetMapping("/{id}")
	public ResponseEntity<NotificacionDTO> findById(@PathVariable("id") int id){
		try {
			ResponseEntity<NotificacionDTO> response = this._service.findById(id);
			return response;
		} catch(Exception ex) {
			return super.getJSON(ex);
		}
	}
	
	@SuppressWarnings({ "unchecked" })
	@RequestMapping(value = "/search", method = RequestMethod.POST)
	@ResponseBody()
	public ResponseEntity<NotificacionDTO> search(@RequestParam("item") String item) throws IOException {
		try {
			PaginatorEntity paginator = super.setPaginator();
			NotificacionDTO item2 = super.fromJson(item, NotificacionDTO.class);
			ResponseEntity<NotificacionDTO> response = this._service.search(item2, paginator);
			return response;
		} catch (Exception ex) {	
			return super.getJSON(ex);
		}
	}
	
	@RequestMapping(value = "/updateleido")
	@PostMapping
	public ResponseEntity<?> updateLeido(@RequestBody NotificacionDTO item){
		try {
			ResponseEntity<?> response = this._service.updateLeido(item);
			return response;
		} catch (Exception ex) {
			return super.getJSON(ex);
		}
	}
	
	@GetMapping("obtenerNoLeidos/{flagDigesa}/{flagSanipes}/{flagSenasa}")
	public ResponseEntity<NotificacionDTO> getNoLeidos(@PathVariable("flagDigesa") boolean flagDigesa,
			@PathVariable("flagSanipes") boolean flagSanipes, @PathVariable("flagSenasa") boolean flagSenasa){
		ResponseEntity<NotificacionDTO> response = new ResponseEntity<>();
		try {
			response = this._service.getNoLeidos(flagDigesa, flagSanipes, flagSenasa);
		} catch (Exception ex) {
			response.setMessage(ex);
		}
		return response;
	}
	
	@RequestMapping(value = "/updatefase")
	@PostMapping
	public ResponseEntity<?> fase(@RequestBody NotificacionFaseDTO item){
		try {
			ResponseEntity<?> response = this._service.updateFase(item);
			return response;
		} catch (Exception ex) {
			return super.getJSON(ex);
		}
	}
	
	@SuppressWarnings("unchecked")
	@GetMapping("findFase/{id}")
	public ResponseEntity<NotificacionFase> findFase(@PathVariable("id") int id){
		try {
			ResponseEntity<NotificacionFase> response = this._service.findFase(id);
			return response;
		} catch(Exception ex) {
			return super.getJSON(ex);
		}
	}	
	
	@SuppressWarnings({ "unchecked" })
	@RequestMapping(value = "/indicadores", method = RequestMethod.POST)
	@ResponseBody()
	public ResponseEntity<IndicadorDTO> indicadores(@RequestBody IndicadorDTO item) throws IOException {
		try {
			//PaginatorEntity paginator = super.setPaginator();
			//NotificacionDTO item2 = super.fromJson(item, NotificacionDTO.class);
			ResponseEntity<IndicadorDTO> response = this._service.indicadores(item);
			return response;
		} catch (Exception ex) {	
			return super.getJSON(ex);
		}
	}
}
