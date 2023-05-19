package pe.gob.vuce.template.siges.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Asignacion extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
	@SequenceGenerator(name = "asignacion_id_seq", sequenceName="asignacion_id_seq", allocationSize=1)
	private int id;
	
	@Column (nullable=false)
	private String nombre;
	
	@Column (nullable=true)
	private int tipoId;
	
	@Column (nullable=true)
	private String tipoNombre;
	
	public int getTipoId() {
		return tipoId;
	}
	public void setTipoId(int tipoId) {
		this.tipoId = tipoId;
	}	
	public String getTipoNombre() {
		return tipoNombre;
	}
	public void setTipoNombre(String tipoNombre) {
		this.tipoNombre = tipoNombre;
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
