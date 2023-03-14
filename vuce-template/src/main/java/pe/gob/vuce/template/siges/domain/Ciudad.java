package pe.gob.vuce.template.siges.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
public class Ciudad {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	@SequenceGenerator(name = "ciudad_id_seq", sequenceName="ciudad_id_seq", allocationSize=1)
	private int id;	
	@Column(length=250, nullable = false)
	private String nombre;	
	@Column(length=400)
	private String puerto;
	@ManyToOne
    @JoinColumn(name = "pais_id", referencedColumnName = "id", nullable = false)
	private Pais pais;	
	@Column(length=200)
	private String estado;
	@Column(length=250)
	private String nombre_abreviado;
	@Column
	private int modo_transporte_id;
	@Column
	private int secuencia_pais_iso;			
	
	public String getPuerto() {
		return puerto;
	}
	public void setPuerto(String puerto) {
		this.puerto = puerto;
	}	
	public String getEstado() {
		return estado;
	}
	public void setEstado(String estado) {
		this.estado = estado;
	}
	public String getNombre_abreviado() {
		return nombre_abreviado;
	}
	public void setNombre_abreviado(String nombre_abreviado) {
		this.nombre_abreviado = nombre_abreviado;
	}
	public int getModo_transporte_id() {
		return modo_transporte_id;
	}
	public void setModo_transporte_id(int modo_transporte_id) {
		this.modo_transporte_id = modo_transporte_id;
	}
	public int getSecuencia_pais_iso() {
		return secuencia_pais_iso;
	}
	public void setSecuencia_pais_iso(int secuencia_pais_iso) {
		this.secuencia_pais_iso = secuencia_pais_iso;
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
