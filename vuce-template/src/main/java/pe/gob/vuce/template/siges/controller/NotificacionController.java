package pe.gob.vuce.template.siges.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pe.gob.vuce.template.siges.domain.Notificacion;
import pe.gob.vuce.template.siges.service.NotificacionService;

@RestController
@RequestMapping(value="notificacion")
public class NotificacionController {

	@Autowired
	NotificacionService notificacionService;
	
	@GetMapping
	public ResponseEntity<List<Notificacion>> findAll(){
		return ResponseEntity.ok(notificacionService.findAll());
	}
	
	@PostMapping
	public ResponseEntity<Notificacion> create(@RequestBody Notificacion notificacion){
		Notificacion response = notificacionService.create(notificacion);
		
		return new ResponseEntity<Notificacion>(response, HttpStatus.CREATED);
	}
	
	@PutMapping
	public ResponseEntity<Notificacion> update(@RequestBody Notificacion notificacion){
		
		Notificacion notificacionExists = notificacionService.findById(notificacion.getId());
		if (notificacionExists.getId()==0) {
			
		}
		
		Notificacion response = notificacionService.update(notificacion);
		return ResponseEntity.ok(response);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id") int id){
		Notificacion notificacion = notificacionService.findById(id);
		if (notificacion.getId()==0) {
			
		}
		notificacionService.delete(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Notificacion> findById(@PathVariable("id") int id){
		Notificacion notificacion = notificacionService.findById(id);
		if (notificacion.getId() ==0) {
			
		}
		return ResponseEntity.ok(notificacion);
	}	
}
