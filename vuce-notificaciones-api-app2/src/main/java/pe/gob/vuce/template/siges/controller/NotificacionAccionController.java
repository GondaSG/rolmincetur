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
import pe.gob.vuce.template.dto.NotificacionEstadoDTO;
import pe.gob.vuce.template.siges.domain.Notificacion;
import pe.gob.vuce.template.siges.domain.NotificacionAccion;
import pe.gob.vuce.template.siges.entity.ResponseEntity;
import pe.gob.vuce.template.siges.service.NotificacionAccionService;

@RestController
@RequestMapping(value="notificacionaccion")
public class NotificacionAccionController extends BaseController {

	@Autowired
	NotificacionAccionService _service; 
	
	@GetMapping
	public ResponseEntity<NotificacionAccion> findAll(){
		ResponseEntity<NotificacionAccion> response = new ResponseEntity<NotificacionAccion>();
		try {
			response = this._service.findAll();
		} catch (Exception ex) {
			response.setMessage(ex);
		}
		return response;
	}
	
	@PostMapping
	public ResponseEntity<?> create(@RequestBody NotificacionAccion item){
		try {
			ResponseEntity<?> response = this._service.create(item);
			return response;
		} catch (Exception ex) {
			return super.getJSON(ex);
		}
	}
	
	@PutMapping
	public ResponseEntity<?> update(@RequestBody NotificacionAccion item){
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
	
	@GetMapping("/{id}")
	public ResponseEntity<NotificacionAccion> findById(@PathVariable("id") int id){
		try {
			ResponseEntity<NotificacionAccion> response = this._service.findById(id);
			return response;
		} catch(Exception ex) {
			return super.getJSON(ex);
		}
	}
	@GetMapping("findByNotificacionId/{notificacionid}")
	public ResponseEntity<NotificacionAccion> findByNotificacionId(@PathVariable("notificacionid") int notificacionid){
		try {
			ResponseEntity<NotificacionAccion> response = this._service.findByNotificacionId(notificacionid);
			return response;
		} catch(Exception ex) {
			return super.getJSON(ex);
		}
	}
}
