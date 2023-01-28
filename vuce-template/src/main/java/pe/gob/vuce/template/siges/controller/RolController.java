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
import pe.gob.vuce.template.siges.domain.Rol;
import pe.gob.vuce.template.siges.service.RolService;

@RestController
@RequestMapping(value="rol")
public class RolController {

    @Autowired
    RolService rolService;
    
    @GetMapping
    public ResponseEntity<List<Rol>> findAll() {
        return ResponseEntity.ok(rolService.findAll());
    }
    @PostMapping
    public ResponseEntity<Rol> create(@RequestBody Rol rol) {
        Rol response = rolService.create(rol);
        //log.info("Request registered successfully.");
        return new ResponseEntity<Rol>(response, HttpStatus.CREATED);
    }
    
    @PutMapping
    public ResponseEntity<Rol> update(@RequestBody Rol rol) {

    	Rol rolExists = rolService.findById(rol.getId());
        if (rolExists.getId() == 0) {
            //throw new ModelNotFoundException("ID not found.");
        }

        Rol response = rolService.update(rol);
        //  log.info("Request updated successfully.");
        return ResponseEntity.ok(response);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Rol> findById(@PathVariable("id") int id) {
        Rol rol = rolService.findById(id);
        if (rol.getId() == 0) {
           //throw new ModelNotFoundException("ID not found.");
        }
        return ResponseEntity.ok(rol);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") int id) {
    	Rol rol = rolService.findById(id);
        if (rol.getId() == 0) {
            //throw new ModelNotFoundException("ID not found.");
        }
        rolService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
}
