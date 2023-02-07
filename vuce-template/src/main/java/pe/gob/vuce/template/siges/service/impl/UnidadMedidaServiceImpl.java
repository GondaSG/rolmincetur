package pe.gob.vuce.template.siges.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.gob.vuce.template.siges.domain.UnidadMedida;
import pe.gob.vuce.template.siges.entity.ResponseEntity;
import pe.gob.vuce.template.siges.repository.UnidadMedidaRepository;
import pe.gob.vuce.template.siges.service.UnidadMedidaService;

@Service
public class UnidadMedidaServiceImpl implements UnidadMedidaService{

	@Autowired
	UnidadMedidaRepository _repository;
	
	@SuppressWarnings("rawtypes")
	public ResponseEntity create(UnidadMedida item) throws Exception{
		try {
			Integer id = item.getId();
			String message = "";
			boolean success = false;
			if (id == 0) {
				UnidadMedida item2 = this._repository.save(item);
				id = item2.getId();
				message += "Se guardaron sus datos de manera correcta";
			} else {
				message += "Se actualizaron sus datos de manera correcta";
				this._repository.save(item);
			}
			success = true;
			ResponseEntity response = new ResponseEntity();
			response.setExtra(id.toString());
			response.setMessage(message);
			response.setSuccess(success);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}
	
	@Override
	public ResponseEntity<UnidadMedida> findById(int id) throws Exception{
		try {
			if (id == 0) {
				throw new Exception("No existe el elemento");
			}
			boolean success = true;
			ResponseEntity<UnidadMedida> response = new ResponseEntity<UnidadMedida>();
			UnidadMedida item = _repository.findById(id).get();
			response.setSuccess(success);
			response.setItem(item);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}
	
	@Override
	public UnidadMedida update(UnidadMedida unidadMedida) {
		return _repository.save(unidadMedida);
	}
	
	@Override
	public ResponseEntity delete(int id) throws Exception{
		try {			
			this._repository.deleteById(id);
			ResponseEntity response = new ResponseEntity();
			response.setMessage("Se ha eliminado correctamente");
			response.setSuccess(true);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}
	
	@Override
	public ResponseEntity<UnidadMedida> findAll() throws Exception{
		try {
			ResponseEntity<UnidadMedida> response = new ResponseEntity<UnidadMedida>();
			List<UnidadMedida> items = _repository.findAll();
			response.setItems(items);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}
}
