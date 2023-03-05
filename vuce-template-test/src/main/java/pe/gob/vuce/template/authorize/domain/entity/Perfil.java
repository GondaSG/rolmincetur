package pe.gob.vuce.template.authorize.domain.entity;

//import lombok.*;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;


public class Perfil {
	private Long id;
	private String perfil;
	private String descripcion;
	private Date fechaIniVigencia;
	private Date fechaFinVigencia;
	private String estado;
	private Set<Usuario> usuarios = new HashSet<Usuario>();
	
	public void addUsuario(Usuario usuario) {
        this.usuarios.add(usuario);
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPerfil() {
		return perfil;
	}

	public void setPerfil(String perfil) {
		this.perfil = perfil;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public Date getFechaIniVigencia() {
		return fechaIniVigencia;
	}

	public void setFechaIniVigencia(Date fechaIniVigencia) {
		this.fechaIniVigencia = fechaIniVigencia;
	}

	public Date getFechaFinVigencia() {
		return fechaFinVigencia;
	}

	public void setFechaFinVigencia(Date fechaFinVigencia) {
		this.fechaFinVigencia = fechaFinVigencia;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public Set<Usuario> getUsuarios() {
		return usuarios;
	}

	public void setUsuarios(Set<Usuario> usuarios) {
		this.usuarios = usuarios;
	}
}
