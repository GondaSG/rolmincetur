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

import pe.gob.vuce.template.siges.domain.CategoriaAlimento;
import pe.gob.vuce.template.siges.service.CategoriaAlimentoService;

@RestController
@RequestMapping(value="categoriaAlimento")
public class CategoriaAlimentoController {
	
	@Autowired
	CategoriaAlimentoService categoriaAlimentoService;
	
	@GetMapping
	public ResponseEntity<List<CategoriaAlimento>> findAll(){
		return ResponseEntity.ok(categoriaAlimentoService.findAll());
	}

	@PostMapping
	public ResponseEntity<CategoriaAlimento> create(@RequestBody CategoriaAlimento categoriaAlimento){
		CategoriaAlimento response = categoriaAlimentoService.create(categoriaAlimento);
		
		return new ResponseEntity<CategoriaAlimento>(response, HttpStatus.CREATED);
	}
	
	@PutMapping
	public ResponseEntity<CategoriaAlimento> update(@RequestBody CategoriaAlimento categoriaAlimento){
		CategoriaAlimento categoriaAlimentoExists = categoriaAlimentoService.findById(categoriaAlimento.getId());
		if (categoriaAlimentoExists.getId()==0){
			
		}
		
		CategoriaAlimento response = categoriaAlimentoService.update(categoriaAlimento);
		return ResponseEntity.ok(response);	
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id") int id){
		CategoriaAlimento categoriaAlimento = categoriaAlimentoService.findById(id);
		if (categoriaAlimento.getId()==0) {
			
		}
		categoriaAlimentoService.delete(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<CategoriaAlimento> findById(@PathVariable("id") int id){
		CategoriaAlimento categoriaAlimento = categoriaAlimentoService.findById(id);
		if(categoriaAlimento.getId()==0) {
			
		}
		return ResponseEntity.ok(categoriaAlimento);
	}
}
