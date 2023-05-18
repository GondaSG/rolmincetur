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

import pe.gob.vuce.template.siges.domain.Usuario;
import pe.gob.vuce.template.siges.entity.ResponseEntity;
import pe.gob.vuce.template.siges.service.UsuarioService;

@RestController
@RequestMapping(value="usuario")
public class UsuarioController extends BaseController {
	
	@Autowired
	UsuarioService _service;

	@GetMapping
	public ResponseEntity<Usuario> findAll(){
		ResponseEntity<Usuario> response = new ResponseEntity<>();
		try {
			response = this._service.findAll();
		} catch (Exception ex) {
			response.setMessage(ex);
		}
		return response;
	}
	
	@PostMapping
	public ResponseEntity<?> create(@RequestBody Usuario item){
		try {
			ResponseEntity<?> response = this._service.create(item);
			return response;
		} catch (Exception ex) {
			return super.getJSON(ex);
		}
	}
	
	@PutMapping
	public ResponseEntity<?> update(@RequestBody Usuario item){
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
	public ResponseEntity<Usuario> findById(@PathVariable("id") int id){
		try {
			ResponseEntity<Usuario> response = this._service.findById(id);
			return response;
		} catch (Exception ex) {
			return super.getJSON(ex);
		}
	}
}
