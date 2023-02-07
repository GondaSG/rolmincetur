package pe.gob.vuce.template.siges.service.impl;

import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.gob.vuce.template.siges.domain.TipoAlimento;
import pe.gob.vuce.template.siges.entity.ResponseEntity;
import pe.gob.vuce.template.siges.repository.TipoAlimentoRepository;
import pe.gob.vuce.template.siges.service.TipoAlimentoService;

@Service
public class TipoAlimentoServiceImpl implements TipoAlimentoService{

	@Autowired
	TipoAlimentoRepository _repository;
	
	@SuppressWarnings("rawtypes")
	public ResponseEntity create(TipoAlimento item) throws Exception {
		try {
			Integer id = item.getId();
			String message ="";
			boolean success = false;
			if (id == 0) {
				TipoAlimento item2 = this._repository.save(item);
				id = item2.getId();
				message += "Se guardarón sus datos de manera correcta";
			}else {
				message += "Se actualizarón sus datos de manera correcta";
				this._repository.save(item);
			}
			success = true;
			ResponseEntity response = new ResponseEntity();
			response.setExtra(id.toString());
			response.setMessage(message);
			response.setSuccess(success);
			return response;
		}catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}
		
	public ResponseEntity<TipoAlimento> findById(int id) throws Exception {
		try {
			if (id ==0) {
				throw new Exception("No existe el elemento");
			}
			boolean success = true;
			ResponseEntity<TipoAlimento> response = new ResponseEntity<TipoAlimento>();
			TipoAlimento item = _repository.findById(id).get();
			response.setSuccess(success);
			response.setItem(item);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}
	
	@Override
	public TipoAlimento update(TipoAlimento notificacion) {
		return _repository.save(notificacion);
	}
	
	@SuppressWarnings("rawtypes")
	@Transactional
	public ResponseEntity delete(int id) throws Exception{
		try {
			this._repository.deleteById(id);
			ResponseEntity response = new ResponseEntity<>();
			response.setMessage("Se ha eliminado correctamente");
			response.setSuccess(true);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}
	
	@Override
	public ResponseEntity<TipoAlimento> findAll() throws Exception {
		try {
			ResponseEntity<TipoAlimento> response = new ResponseEntity<TipoAlimento>();
			List<TipoAlimento> items = _repository.findAll();
			response.setItems(items);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}		
	}
}
