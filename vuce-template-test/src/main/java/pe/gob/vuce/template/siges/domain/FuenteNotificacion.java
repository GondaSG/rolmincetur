package pe.gob.vuce.template.siges.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

@Entity
public class FuenteNotificacion {
	
	public FuenteNotificacion(int id, String nombre, int tipoId) {
		super();
		this.id = id;
		this.nombre = nombre;
		this.tipoId = tipoId;
	}
	public FuenteNotificacion() {
		super();
	}
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	@SequenceGenerator(name = "fuente_notificacion_id_seq", sequenceName="fuente_notificacion_id_seq", allocationSize=1)
	private int id;
	@Column(length=200, nullable = false)
	private String nombre;
	
	@Column (nullable=false)
	private int tipoId;
	
	public int getTipoId() {
		return tipoId;
	}
	public void setTipoId(int tipoId) {
		this.tipoId = tipoId;
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
}
