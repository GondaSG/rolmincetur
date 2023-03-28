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
public class TipoDocumento {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	@SequenceGenerator(name = "tipo_documento_id_seq", sequenceName="tipo_documento_id_seq", allocationSize=1)
	private int id;
	@Column(length=150, nullable=false)
	private String descripcion;
	@Column(length=1)
	private String estado;
	@Column(length=1)
	private String personaNatural;
	@Column(length=1)
	private String doc_vuce;
	@Column(length=1)
	private String documento_tipo_sunat;
	@Column(length=1)
	private String equivalencia_sunat_vuce;
	@Column(length=2)
	private String documento_tipo_digemid;
	@Column(length=1)
	private String activo_uo;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	public String getEstado() {
		return estado;
	}
	public void setEstado(String estado) {
		this.estado = estado;
	}
	public String getPersonaNatural() {
		return personaNatural;
	}
	public void setPersonaNatural(String personaNatural) {
		this.personaNatural = personaNatural;
	}
	public String getDoc_vuce() {
		return doc_vuce;
	}
	public void setDoc_vuce(String doc_vuce) {
		this.doc_vuce = doc_vuce;
	}
	public String getDocumento_tipo_sunat() {
		return documento_tipo_sunat;
	}
	public void setDocumento_tipo_sunat(String documento_tipo_sunat) {
		this.documento_tipo_sunat = documento_tipo_sunat;
	}
	public String getEquivalencia_sunat_vuce() {
		return equivalencia_sunat_vuce;
	}
	public void setEquivalencia_sunat_vuce(String equivalencia_sunat_vuce) {
		this.equivalencia_sunat_vuce = equivalencia_sunat_vuce;
	}
	public String getDocumento_tipo_digemid() {
		return documento_tipo_digemid;
	}
	public void setDocumento_tipo_digemid(String documento_tipo_digemid) {
		this.documento_tipo_digemid = documento_tipo_digemid;
	}
	public String getActivo_uo() {
		return activo_uo;
	}
	public void setActivo_uo(String activo_uo) {
		this.activo_uo = activo_uo;
	}
}
