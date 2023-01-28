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
import pe.gob.vuce.template.siges.domain.Entidad;
import pe.gob.vuce.template.siges.service.EntidadService;

@RestController
@RequestMapping(value="entidad")
public class EntidadController {
	
	@Autowired
	EntidadService entidadService;
	
	@GetMapping
	public ResponseEntity<List<Entidad>> findAll() {
		return ResponseEntity.ok(entidadService.findAll());
	}	
	
	@PostMapping
	public ResponseEntity<Entidad> create(@RequestBody Entidad entidad){
		Entidad reponse = entidadService.create(entidad);
		
		return new ResponseEntity<Entidad>(reponse, HttpStatus.CREATED);
	}

	@PutMapping
	public ResponseEntity<Entidad> update(@RequestBody Entidad entidad){
		
		Entidad entidadExists = entidadService.findById(entidad.getId());
		if (entidadExists.getId()==0) {
			
		}
		
		Entidad response = entidadService.update(entidad);
		return  ResponseEntity.ok(response);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id") int id){
		Entidad entidad = entidadService.findById(id);
		if (entidad.getId() ==0) {
			
		}
		entidadService.delete(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);		
	}
	
	@GetMapping("/{id}")
    public ResponseEntity<Entidad> findById(@PathVariable("id") int id) {
        Entidad	entidad = entidadService.findById(id);
        if (entidad.getId() == 0) {
           //throw new ModelNotFoundException("ID not found.");
        }
        return ResponseEntity.ok(entidad);
	}    
}
