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
public class Usuario {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
	@SequenceGenerator(name = "usuario_id_seq", sequenceName="usuario_id_seq", allocationSize=1)
	private int id;
	@Column(length=50, nullable=false)
	private String codigo;
	@Column(length=400, nullable=false)
	private String nombre;
	@Column(length=400, nullable=false)
	private String correo;
	@Column(length=20)
	private String telefono;
	@Column(length=20, nullable=false)
	private String ruc;

	@ManyToOne
    @JoinColumn(name = "rol_id", referencedColumnName = "id", nullable=false)
	private Rol rol;
	
	@ManyToOne
    @JoinColumn(name = "entidad_id", referencedColumnName = "id", nullable=false)
	private Entidad entidad;
	
	@ManyToOne
    @JoinColumn(name = "tipo_usuario_id", referencedColumnName = "id", nullable=false)
	private TipoUsuario tipoUsuario;
	
	@ManyToOne
    @JoinColumn(name = "tipo_documento_id", referencedColumnName = "id", nullable=false)
	private TipoDocumento tipoDocumento;
	
	public String getCodigo() {
		return codigo;
	}

	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}

	public Rol getRol() {
		return rol;
	}

	public void setRol(Rol rol) {
		this.rol = rol;
	}

	public Entidad getEntidad() {
		return entidad;
	}

	public void setEntidad(Entidad entidad) {
		this.entidad = entidad;
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

	public String getCorreo() {
		return correo;
	}

	public void setCorreo(String correo) {
		this.correo = correo;
	}

	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}
	
	public String getRuc() {
		return ruc;
	}

	public void setRuc(String ruc) {
		this.ruc = ruc;
	}
	
	public TipoUsuario getTipoUsuario() {
		return tipoUsuario;
	}

	public void setTipoUsuario(TipoUsuario tipoUsuario) {
		this.tipoUsuario = tipoUsuario;
	}

	public TipoDocumento getTipoDocumento() {
		return tipoDocumento;
	}

	public void setTipoDocumento(TipoDocumento tipoDocumento) {
		this.tipoDocumento = tipoDocumento;
	}
}
