package pe.gob.vuce.template.authorize.domain.entity;


import java.util.Date;


public class Usuario {
    private Long id;
    private String usuario;
    private String usuarioSol;
    //private String clave;
    private String entidad;
    private String area;
    public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getUsuario() {
		return usuario;
	}
	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}
	public String getUsuarioSol() {
		return usuarioSol;
	}
	public void setUsuarioSol(String usuarioSol) {
		this.usuarioSol = usuarioSol;
	}
	public String getEntidad() {
		return entidad;
	}
	public void setEntidad(String entidad) {
		this.entidad = entidad;
	}
	public String getArea() {
		return area;
	}
	public void setArea(String area) {
		this.area = area;
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
	private Date fechaIniVigencia;
    private Date fechaFinVigencia;
    private String estado;
}
