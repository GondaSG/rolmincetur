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
import pe.gob.vuce.template.siges.domain.FuenteNotificacion;
import pe.gob.vuce.template.siges.domain.NotificacionAccion;
import pe.gob.vuce.template.siges.entity.ResponseEntity;
import pe.gob.vuce.template.siges.service.FuenteNotificacionService;

@RestController
@RequestMapping(value="fuentenotificacion")
public class FuenteNotificacionController extends BaseController {
	
	@Autowired
	FuenteNotificacionService _service;

	@GetMapping
	public ResponseEntity<FuenteNotificacion> findAll(){
		ResponseEntity<FuenteNotificacion> response = new ResponseEntity<>();		
		try {
			response = this._service.findAll();
		} catch (Exception ex) {
			response.setMessage(ex);
		}
		return response;
	}
	
	@PostMapping
	public ResponseEntity<?> create(@RequestBody FuenteNotificacion item){
		try {
			ResponseEntity<?> response = this._service.create(item);
			return response;
		} catch (Exception ex) {
			return super.getJSON(ex);
		}
	}
	
	@PutMapping
	public ResponseEntity<?> update(@RequestBody FuenteNotificacion item){
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
	public ResponseEntity<FuenteNotificacion> findById(@PathVariable("id") int id){
		try {
			ResponseEntity<FuenteNotificacion> response = this._service.findById(id);
			return response;
		} catch(Exception ex) {
			return super.getJSON(ex);
		}
	}
	
	@GetMapping("findTipoId/{id}")
	public ResponseEntity<FuenteNotificacion> findTipoId(@PathVariable("id") int id){
		try {
			ResponseEntity<FuenteNotificacion> response = this._service.findTipoId(id);
			return response;
		} catch(Exception ex) {
			return super.getJSON(ex);
		}
	}
}
