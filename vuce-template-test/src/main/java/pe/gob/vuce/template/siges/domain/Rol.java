package pe.gob.vuce.template.siges.domain;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;


@Entity
public class Rol {
	
	public Rol(int id, String nombre, String descripcion, Set<Asignacion> asignacion) {
		super();
		this.id = id;
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.asignacion = asignacion;
	}
	public Rol() {
		super();
	}
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
	@SequenceGenerator(name = "rol_id_seq", sequenceName="rol_id_seq", allocationSize=1)
	private int id;
	@Column(length=80, nullable=false)
	private String nombre;
	@Column(length=600)
	private String descripcion;
	@ManyToMany
	Set<Asignacion> asignacion;
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
	public Set<Asignacion> getAsignacion() {
		return asignacion;
	}
	public void setAsignacion(Set<Asignacion> asignacion) {
		this.asignacion = asignacion;
	}
}
