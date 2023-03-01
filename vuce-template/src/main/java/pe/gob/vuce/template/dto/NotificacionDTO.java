package pe.gob.vuce.template.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonFormat;
import pe.gob.vuce.template.siges.domain.CategoriaAlimento;
import pe.gob.vuce.template.siges.domain.Ciudad;
import pe.gob.vuce.template.siges.domain.Entidad;
import pe.gob.vuce.template.siges.domain.Estado;
import pe.gob.vuce.template.siges.domain.FuenteNotificacion;
import pe.gob.vuce.template.siges.domain.NotificacionCerrada;
import pe.gob.vuce.template.siges.domain.NotificacionDiscrepancia;
import pe.gob.vuce.template.siges.domain.NotificacionEstado;
import pe.gob.vuce.template.siges.domain.NotificacionLote;
import pe.gob.vuce.template.siges.domain.NotificacionPresentacion;
import pe.gob.vuce.template.siges.domain.OrigenNotificacion;
import pe.gob.vuce.template.siges.domain.Pais;
import pe.gob.vuce.template.siges.domain.TipoAlimento;
import pe.gob.vuce.template.siges.domain.TipoNotificacion;

public class NotificacionDTO {
	
	private int id;	
	
	private OrigenNotificacion origenNotificacion;
	
	private FuenteNotificacion fuenteNotificacion;
	
	private Boolean flagAfectado;
	
	private Boolean flagDigesa;
	
	private Boolean flagSanipes;
	
	private Boolean flagSenasa;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date fechaNotificacion;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date fechaEvento;

	private TipoNotificacion tipoNotificacion;
	
	private Pais pais;
	
	private Ciudad ciudad;
	
	private String productor;
	
	private String datoImportador;
	
	private String datoExportador;
	
	private String nombreAlimento;
	
	private CategoriaAlimento categoriaAlimento;
	
	private TipoAlimento tipoAlimento;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date fechaProduccion;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date fechaVencimiento;
	
	private String titulo;
	
	private String codigoGenerado;
	
	private Boolean flagQuimico;
	
	private Boolean flagFisico;
	
	private Boolean flagBiologico;
	
	private Boolean flagOtro;
	
	private List<NotificacionPresentacion> notificacionPresentacion = new ArrayList<>();
	
	private List<NotificacionLote> notificacionLote = new ArrayList<>();
	
	private List<NotificacionEstado> estados = new ArrayList<>();
	
	private List<NotificacionDiscrepancia> discrepancias = new ArrayList<>();
	
	private List<NotificacionCerrada> cerradas = new ArrayList<>();

	private List<Integer> tipoNotificacionId;
	
	private List<Integer> estadoId;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date fechaCreacion = new Date();
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date fechaCreacionFinal = new Date();
	
	private Boolean flagNacional;
	
	private String comentario;
	
	private String peligroEspecifico;
	
	private Boolean flagActivo = true;
	
	private Estado estado;
	
	private NotificacionEstado notificacionEstado;
	
	private Entidad entidad;
	
	public Entidad getEntidad() {
		return entidad;
	}
	public void setEntidad(Entidad entidad) {
		this.entidad = entidad;
	}
	
	public NotificacionEstado getNotificacionEstado() {
		return notificacionEstado;
	}
	public void setNotificacionEstado(NotificacionEstado notificacionEstado) {
		this.notificacionEstado = notificacionEstado;
	}
	public List<NotificacionCerrada> getCerradas() {
		return cerradas;
	}
	public void setCerradas(List<NotificacionCerrada> cerradas) {
		this.cerradas = cerradas;
	}	
	public List<NotificacionDiscrepancia> getDiscrepancias() {
		return discrepancias;
	}
	public void setDiscrepancias(List<NotificacionDiscrepancia> discrepancias) {
		this.discrepancias = discrepancias;
	}
	
	public Estado getEstado() {
		return estado;
	}
	public void setEstado(Estado estado) {
		this.estado = estado;
	}
	public Boolean getFlagActivo() {
		return flagActivo;
	}
	public void setFlagActivo(Boolean flagActivo) {
		this.flagActivo = flagActivo;
	}
	
	public String getPeligroEspecifico() {
		return peligroEspecifico;
	}
	public void setPeligroEspecifico(String peligroEspecifico) {
		this.peligroEspecifico = peligroEspecifico;
	}
		
	public List<NotificacionEstado> getEstados() {
		return estados;
	}

	public void setEstados(List<NotificacionEstado> estados) {
		this.estados = estados;
	}
	
	public Boolean getFlagNacional() {
		return flagNacional;
	}

	public void setFlagNacional(Boolean flagNacional) {
		this.flagNacional = flagNacional;
	}

	public String getComentario() {
		return comentario;
	}

	public void setComentario(String comentario) {
		this.comentario = comentario;
	}

	public List<Integer> getTipoNotificacionId() {
		return tipoNotificacionId;
	}

	public void setTipoNotificacionId(List<Integer> tipoNotificacionId) {
		this.tipoNotificacionId = tipoNotificacionId;
	}

	public List<Integer> getEstadoId() {
		return estadoId;
	}
	
	public void setEstadoId(List<Integer> estadoId) {
		this.estadoId = estadoId;
	}
	
	public Date getFechaCreacion() {
		return fechaCreacion;
	}
	
	public void setFechaCreacion(Date fechaCreacion) {
		this.fechaCreacion = fechaCreacion;
	}
	
	public Date getFechaCreacionFinal() {
		return fechaCreacionFinal;
	}
	
	public void setFechaCreacionFinal(Date fechaCreacionFinal) {
		this.fechaCreacionFinal = fechaCreacionFinal;
	}

	public Boolean getFlagQuimico() {
		return flagQuimico;
	}

	public void setFlagQuimico(Boolean flagQuimico) {
		this.flagQuimico = flagQuimico;
	}

	public Boolean getFlagFisico() {
		return flagFisico;
	}

	public void setFlagFisico(Boolean flagFisico) {
		this.flagFisico = flagFisico;
	}

	public Boolean getFlagBiologico() {
		return flagBiologico;
	}

	public void setFlagBiologico(Boolean flagBiologico) {
		this.flagBiologico = flagBiologico;
	}

	public Boolean getFlagOtro() {
		return flagOtro;
	}

	public void setFlagOtro(Boolean flagOtro) {
		this.flagOtro = flagOtro;
	}

	public List<NotificacionLote> getNotificacionLote() {
		return notificacionLote;
	}

	public void setNotificacionLote(List<NotificacionLote> notificacionLote) {
		this.notificacionLote = notificacionLote;
	}

	public TipoNotificacion getTipoNotificacion() {
		return tipoNotificacion;
	}

	public void setTipoNotificacion(TipoNotificacion tipoNotificacion) {
		this.tipoNotificacion = tipoNotificacion;
	}

	public Pais getPais() {
		return pais;
	}

	public void setPais(Pais pais) {
		this.pais = pais;
	}

	public Ciudad getCiudad() {
		return ciudad;
	}

	public void setCiudad(Ciudad ciudad) {
		this.ciudad = ciudad;
	}

	public String getProductor() {
		return productor;
	}

	public void setProductor(String productor) {
		this.productor = productor;
	}

	public String getDatoImportador() {
		return datoImportador;
	}

	public void setDatoImportador(String datoImportador) {
		this.datoImportador = datoImportador;
	}

	public String getDatoExportador() {
		return datoExportador;
	}

	public void setDatoExportador(String datoExportador) {
		this.datoExportador = datoExportador;
	}

	public String getNombreAlimento() {
		return nombreAlimento;
	}

	public void setNombreAlimento(String nombreAlimento) {
		this.nombreAlimento = nombreAlimento;
	}

	public CategoriaAlimento getCategoriaAlimento() {
		return categoriaAlimento;
	}

	public void setCategoriaAlimento(CategoriaAlimento categoriaAlimento) {
		this.categoriaAlimento = categoriaAlimento;
	}

	public TipoAlimento getTipoAlimento() {
		return tipoAlimento;
	}

	public void setTipoAlimento(TipoAlimento tipoAlimento) {
		this.tipoAlimento = tipoAlimento;
	}

	public Date getFechaProduccion() {
		return fechaProduccion;
	}

	public void setFechaProduccion(Date fechaProduccion) {
		this.fechaProduccion = fechaProduccion;
	}

	public Date getFechaVencimiento() {
		return fechaVencimiento;
	}

	public void setFechaVencimiento(Date fechaVencimiento) {
		this.fechaVencimiento = fechaVencimiento;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public List<NotificacionPresentacion> getNotificacionPresentacion() {
		return notificacionPresentacion;
	}

	public void setNotificacionPresentacion(List<NotificacionPresentacion> notificacionPresentacion) {
		this.notificacionPresentacion = notificacionPresentacion;
	}

	public String getCodigoGenerado() {
		return codigoGenerado;
	}

	public void setCodigoGenerado(String codigoGenerado) {
		this.codigoGenerado = codigoGenerado;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public OrigenNotificacion getOrigenNotificacion() {
		return origenNotificacion;
	}

	public void setOrigenNotificacion(OrigenNotificacion origenNotificacion) {
		this.origenNotificacion = origenNotificacion;
	}

	public FuenteNotificacion getFuenteNotificacion() {
		return fuenteNotificacion;
	}

	public void setFuenteNotificacion(FuenteNotificacion fuenteNotificacion) {
		this.fuenteNotificacion = fuenteNotificacion;
	}

	public Boolean getFlagAfectado() {
		return flagAfectado;
	}

	public void setFlagAfectado(Boolean flagAfectado) {
		this.flagAfectado = flagAfectado;
	}

	public Boolean getFlagDigesa() {
		return flagDigesa;
	}

	public void setFlagDigesa(Boolean flagDigesa) {
		this.flagDigesa = flagDigesa;
	}

	public Boolean getFlagSanipes() {
		return flagSanipes;
	}

	public void setFlagSanipes(Boolean flagSanipes) {
		this.flagSanipes = flagSanipes;
	}

	public Boolean getFlagSenasa() {
		return flagSenasa;
	}

	public void setFlagSenasa(Boolean flagSenasa) {
		this.flagSenasa = flagSenasa;
	}

	public Date getFechaNotificacion() {
		return fechaNotificacion;
	}

	public void setFechaNotificacion(Date fechaNotificacion) {
		this.fechaNotificacion = fechaNotificacion;
	}

	public Date getFechaEvento() {
		return fechaEvento;
	}

	public void setFechaEvento(Date fechaEvento) {
		this.fechaEvento = fechaEvento;
	}
}
