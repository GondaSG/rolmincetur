package pe.gob.vuce.template.siges.service.impl;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.hibernate.mapping.Collection;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.gob.vuce.template.dto.RolDTO;
import pe.gob.vuce.template.siges.domain.Asignacion;
import pe.gob.vuce.template.siges.domain.Notificacion;
import pe.gob.vuce.template.siges.domain.Rol;
import pe.gob.vuce.template.siges.domain.RolAsignacion;
import pe.gob.vuce.template.siges.entity.ResponseEntity;
import pe.gob.vuce.template.siges.repository.AsignadoRepository;
import pe.gob.vuce.template.siges.repository.RolAsignacionRepository;
import pe.gob.vuce.template.siges.repository.RolRepository;
import pe.gob.vuce.template.siges.service.RolService;

@Service
public class RolServiceImpl implements RolService {
    @Autowired
    RolRepository _repository;
    
    @Autowired
    RolAsignacionRepository _repositoryRolAsignacion;
    
    @Autowired
    AsignadoRepository _repositoryAsignacion;
    
    @Autowired(required=true)
    ModelMapper modelMapper;
    
    @SuppressWarnings("rawtypes")
	public ResponseEntity create(RolDTO itemDTO) throws Exception {
		try {
			
			Rol item = modelMapper.map(itemDTO, Rol.class);
			Integer id = item.getId();
			Date date = new Date();
			item.setUsuario("test");
			String message = "";
			boolean success = false;
			if (id == 0) {
				Rol item2 = this._repository.save(item);
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
    
    @SuppressWarnings("rawtypes")
    @Transactional
	public ResponseEntity crearAsignacion(RolDTO itemDTO) throws Exception {
		try {			
			Rol item = modelMapper.map(itemDTO, Rol.class);
			Integer id = item.getId();
			String message = "";
			boolean success = false;
			Rol item3 = this._repository.findById(id).get();
			//item3.setAsignacion(item.getAsignacion());
			RolAsignacion rolAsignacion;
			
			int idEliminado = _repositoryRolAsignacion.deleteByRol(item.getId());
			for(Asignacion asignacion : itemDTO.getAsignacion()) {
				rolAsignacion = new RolAsignacion(); 
				rolAsignacion.setAsignacion(asignacion);
				rolAsignacion.setRol(item3);
				rolAsignacion.setIdRol(item3.getId());
				rolAsignacion.setIdAsignacion(asignacion.getId());
				rolAsignacion.setUsuario(itemDTO.getUsuario());
				_repositoryRolAsignacion.save(rolAsignacion);
			}
			
			//_rolAsignacionrepository.save(rolAsignacion);
			Rol item2 = this._repository.save(item3);			
			if (item2.getId() != 0) {				
				id = item2.getId();
				message += "Se guardaron sus datos de manera correcta";
				success = true;
			}			
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
	public ResponseEntity<RolDTO> findById(int id) throws Exception {
		try {
			if (id == 0) {
				throw new Exception("No exste el elemento");
			}
			boolean success = true;
			ResponseEntity<RolDTO> response = new ResponseEntity<RolDTO>();
			Rol item = _repository.findById(id).get();
			RolDTO itemDTO = modelMapper.map(item, RolDTO.class);
			List<Asignacion> asignaciones = _repositoryAsignacion.findByRol(itemDTO.getId());
			if(asignaciones.size() > 0)
				itemDTO.setAsignacion(asignaciones);
			response.setSuccess(success);
			response.setItem(itemDTO);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}

	@Override
	public RolDTO update(RolDTO itemDTO) {
		Rol item = modelMapper.map(itemDTO, Rol.class);
		item = _repository.save(item);
		return modelMapper.map(item, RolDTO.class);
	}

	@SuppressWarnings("rawtypes")
	@Transactional
	public ResponseEntity delete(int id) throws Exception {
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
	public ResponseEntity<RolDTO> findAll() throws Exception {
		try {
			ResponseEntity<RolDTO> response = new ResponseEntity<RolDTO>();
			List<Rol> items = _repository.findAll();
			List<RolDTO> itemsDTO = Arrays.asList(modelMapper.map(items, RolDTO[].class));
			itemsDTO = itemsDTO.stream().map(t-> {
				List<Asignacion> asignaciones = _repositoryAsignacion.findByRol(t.getId());
				if(asignaciones.size() > 0)
					t.setAsignacion(asignaciones);
				return t;
			}).collect(Collectors.toList());
			response.setItems(itemsDTO);
			return response;
		} catch (Exception ex) {
			throw new Exception(ex.getMessage());
		}
	}

}
