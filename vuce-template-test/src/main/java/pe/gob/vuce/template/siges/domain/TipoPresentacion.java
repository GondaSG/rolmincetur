package pe.gob.vuce.template.siges.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

@Entity
public class TipoPresentacion {
		
	public TipoPresentacion(int id, String nombre) {
		super();
		this.id = id;
		this.nombre = nombre;
	}
	public TipoPresentacion() {
		super();
	}
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	@SequenceGenerator(name = "tipo_presentacion_id_seq", sequenceName="tipo_presentacion_id_seq", allocationSize=1)
	private int id;
	@Column(length=200, nullable=false)
	private String nombre;
	
	
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
}
