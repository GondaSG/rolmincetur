package pe.gob.vuce.template.dto;

import java.util.List;

import pe.gob.vuce.template.siges.domain.Asignacion;
import pe.gob.vuce.template.siges.domain.BaseEntity;
import pe.gob.vuce.template.siges.domain.RolAsignacion;

public class RolDTO extends BaseEntity{
	
	private int id;
	
	private String nombre;
	
	private String descripcion;
	
	private List<Asignacion> asignacion;
	
	public List<Asignacion> getAsignacion() {
		return asignacion;
	}
	public void setAsignacion(List<Asignacion> asignacion) {
		this.asignacion = asignacion;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
}
