package pe.gob.vuce.template.siges.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pe.gob.vuce.template.siges.domain.NotificacionCerrada;
import pe.gob.vuce.template.siges.entity.ResponseEntity;
import pe.gob.vuce.template.siges.service.NotificacionCerradaService;

@RestController
@RequestMapping(value="notificacioncerrada")
public class NotificacionCerradaController extends BaseController{

	@Autowired
	NotificacionCerradaService _service;
	
	@PostMapping
	public ResponseEntity<?> create(@RequestBody NotificacionCerrada item){
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
	@GetMapping("findByNotificacionId/{notificacionid}")
	public ResponseEntity<NotificacionCerrada> findByNotificacionId(@PathVariable("notificacionid") int notificacionid){
		try {
			ResponseEntity<NotificacionCerrada> response = this._service.findByNotificacionId(notificacionid);
			return response;
		} catch(Exception ex) {
			return super.getJSON(ex);
		}
	}
	
	@SuppressWarnings("unchecked")
	@GetMapping("validar/{notificacionid}")
	public ResponseEntity<NotificacionCerrada> validar(@PathVariable("notificacionid") int notificacionid){
		try {
			ResponseEntity<NotificacionCerrada> response = this._service.validar(notificacionid);
			return response;
		} catch(Exception ex) {
			return super.getJSON(ex);
		}
	}
}
