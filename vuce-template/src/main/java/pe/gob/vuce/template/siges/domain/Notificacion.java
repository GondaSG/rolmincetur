package pe.gob.vuce.template.siges.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Notificacion {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	@SequenceGenerator(name = "notificacion_id_seq", sequenceName="notificacion_id_seq", allocationSize=1)
	private int id;	
	@ManyToOne
    @JoinColumn(name = "origen_notificacion_id", referencedColumnName = "id")
	private OrigenNotificacion origenNotificacion;	
	@ManyToOne
    @JoinColumn(name = "fuente_notificacion_id", referencedColumnName = "id")
	private FuenteNotificacion fuenteNotificacion;	
	
	@Column
	private Boolean flagAfectado;
	@Column
	private Boolean flagDigesa;
	@Column
	private Boolean flagSanipes;
	@Column
	private Boolean flagSenasa;	
	@Column
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date fechaNotificacion;
	@Column
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date fechaEvento;	
	@ManyToOne
    @JoinColumn(name = "tipo_notificacion_id", referencedColumnName = "id")
	private TipoNotificacion tipoNotificacion;
	@ManyToOne
    @JoinColumn(name = "tipo_peligro_id", referencedColumnName = "id")
	private TipoPeligro tipoPeligro;
	@ManyToOne
    @JoinColumn(name = "pais_id", referencedColumnName = "id")
	private Pais pais;
	@ManyToOne
    @JoinColumn(name = "ciudad_id", referencedColumnName = "id")
	private Ciudad ciudad;		
	@Column(length=250)
	private String productor;
	@Column(length=250)
	private String datoImportador;
	@Column(length=250)
	private String datoExportador;
	@Column(length=250)
	private String nombreAlimento;	
	@ManyToOne
    @JoinColumn(name = "categoria_alimento_id", referencedColumnName = "id")
	private CategoriaAlimento categoriaAlimento;
	@ManyToOne
    @JoinColumn(name = "tipo_alimento_id", referencedColumnName = "id")
	private TipoAlimento tipoAlimento;	
	@Column
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date fechaProduccion;
	@Column
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date fechaVencimiento;	
	@Column(length=250)
	private String titulo;
	@Column(length=250)
	private String codigoGenerado;
	
	
	
	
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
	public Boolean getFlagAfectado() {
		return flagAfectado;
	}
	public void setFlagAfectado(Boolean flagAfectado) {
		this.flagAfectado = flagAfectado;
	}
	public Ciudad getCiudad() {
		return ciudad;
	}
	public void setCiudad(Ciudad ciudad) {
		this.ciudad = ciudad;
	}
	public Pais getPais() {
		return pais;
	}
	public void setPais(Pais pais) {
		this.pais = pais;
	}
	public TipoPeligro getTipoPeligro() {
		return tipoPeligro;
	}
	public void setTipoPeligro(TipoPeligro tipoPeligro) {
		this.tipoPeligro = tipoPeligro;
	}
	public TipoNotificacion getTipoNotificacion() {
		return tipoNotificacion;
	}
	public void setTipoNotificacion(TipoNotificacion tipoNotificacion) {
		this.tipoNotificacion = tipoNotificacion;
	}
	public OrigenNotificacion getOrigenNotificacion() {
		return origenNotificacion;
	}
	public void setOrigenNotificacion(OrigenNotificacion origenNotificacion) {
		this.origenNotificacion = origenNotificacion;
	}
	public TipoAlimento getTipoAlimento() {
		return tipoAlimento;
	}
	public void setTipoAlimento(TipoAlimento tipoAlimento) {
		this.tipoAlimento = tipoAlimento;
	}
	public CategoriaAlimento getCategoriaAlimento() {
		return categoriaAlimento;
	}
	public void setCategoriaAlimento(CategoriaAlimento categoriaAlimento) {
		this.categoriaAlimento = categoriaAlimento;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public FuenteNotificacion getFuenteNotificacion() {
		return fuenteNotificacion;
	}
	public void setFuenteNotificacion(FuenteNotificacion fuenteNotificacion) {
		this.fuenteNotificacion = fuenteNotificacion;
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
	public String getCodigoGenerado() {
		return codigoGenerado;
	}
	public void setCodigoGenerado(String codigoGenerado) {
		this.codigoGenerado = codigoGenerado;
	}
}
