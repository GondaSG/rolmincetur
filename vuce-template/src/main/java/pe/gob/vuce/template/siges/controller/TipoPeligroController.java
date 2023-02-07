package pe.gob.vuce.template.siges.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pe.gob.vuce.template.siges.domain.TipoPeligro;
import pe.gob.vuce.template.siges.entity.ResponseEntity;
import pe.gob.vuce.template.siges.service.TipoPeligroService;

@RestController
@RequestMapping(value="tipoPeligro")
public class TipoPeligroController extends BaseController {

	@Autowired
	TipoPeligroService _service ;
	
	@GetMapping ResponseEntity<TipoPeligro> findAll(){
		ResponseEntity<TipoPeligro> response = new ResponseEntity<>();
		try {
			response = this._service.findAll();
		} catch (Exception ex) {
			response.setMessage(ex);
		}
		return response;
	}
}
