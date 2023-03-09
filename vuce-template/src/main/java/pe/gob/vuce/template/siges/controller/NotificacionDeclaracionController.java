package pe.gob.vuce.template.siges.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pe.gob.vuce.template.dto.NotificacionDTO;
import pe.gob.vuce.template.siges.domain.NotificacionDeclaracion;
import pe.gob.vuce.template.siges.entity.ResponseEntity;
import pe.gob.vuce.template.siges.service.NotificacionDeclaracionService;

@RestController
@RequestMapping(value="notificaciondeclaracion")
public class NotificacionDeclaracionController extends BaseController{

	@Autowired
	NotificacionDeclaracionService _service;
	
	@GetMapping
	public ResponseEntity<NotificacionDeclaracion> findAll(){
		ResponseEntity<NotificacionDeclaracion> response = new ResponseEntity<NotificacionDeclaracion>();
		try {
			response = this._service.findAll();
		} catch (Exception ex) {
			response.setMessage(ex);
		}
		return response;
	}
	
	
	@PostMapping
	public ResponseEntity<?> create(@RequestBody NotificacionDeclaracion item){
		try {
			ResponseEntity<?> response = this._service.create(item);
			return response;
		} catch (Exception ex) {
			return super.getJSON(ex);
		}
	}
	
	
	@PutMapping
	public ResponseEntity<?> update(@RequestBody NotificacionDeclaracion item){
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
	public ResponseEntity<NotificacionDeclaracion> findById(@PathVariable("id") int id){
		try {
			ResponseEntity<NotificacionDeclaracion> response = this._service.findById(id);
			return response;
		} catch(Exception ex) {
			return super.getJSON(ex);
		}
	}
	
	
	@SuppressWarnings("unchecked")
	@GetMapping("findByNotificacionId/{notificacionid}")
	public ResponseEntity<NotificacionDeclaracion> findByNotificacionId(@PathVariable("notificacionid") int notificacionid){
		try {
			ResponseEntity<NotificacionDeclaracion> response = this._service.findByNotificacionId(notificacionid);
			return response;
		} catch(Exception ex) {
			return super.getJSON(ex);
		}
	}
	
	
	@SuppressWarnings("unchecked")
	@GetMapping("findByEntidadId/{entidadid}")
	public ResponseEntity<NotificacionDeclaracion> findByEntidadId(@PathVariable("entidadid") int entidadid){
		try {
			ResponseEntity<NotificacionDeclaracion> response = this._service.findByEntidadId(entidadid);
			return response;
		} catch(Exception ex) {
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
}
