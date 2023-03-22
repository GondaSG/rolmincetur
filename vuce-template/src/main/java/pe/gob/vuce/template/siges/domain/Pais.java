package pe.gob.vuce.template.siges.domain;

import javax.persistence.SequenceGenerator;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Pais {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	@SequenceGenerator(name = "pais_id_seq", sequenceName="pais_id_seq", allocationSize=1)
	private int id;
	@Column(length=250, nullable=false)
	private String nombre;
	@Column(length=400)
	private String descripcion;
	@Column(length=2)
	private String isoAlfa2;
	@Column(length=3)
	private String isoAlfa3;
	
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
	public String getIsoAlfa2() {
		return isoAlfa2;
	}
	public void setIsoAlfa2(String isoAlfa2) {
		this.isoAlfa2 = isoAlfa2;
	}
	public String getIsoAlfa3() {
		return isoAlfa3;
	}
	public void setIsoAlfa3(String isoAlfa3) {
		this.isoAlfa3 = isoAlfa3;
	}
}
