package com.example.rol3.domain;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
    @Column(name = "id_pk", unique = true, nullable = false)
	private int id;
	
	
	
	
	@ManyToOne
    @JoinColumn(name = "fuente_notificacion_id", referencedColumnName = "id_pk")
	private FuenteNotificacion fuenteNotificacion;
	
	
	@Column
	private Date fechaNotificacion;
	@Column
	private Date fechaEvento;
	
	
	
	@Column(length=250)
	private String productor;
	@Column(length=250)
	private String datoImportador;
	@Column(length=250)
	private String datoExportador;
	@Column(length=250)
	private String nombreAlimento;
	
	@ManyToOne
    @JoinColumn(name = "categoria_alimento_id", referencedColumnName = "id_pk")
	private CategoriaAlimento categoriaAlimento;
	
	
	@Column
	private Date fechaProduccion;
	@Column
	private Date fechaVencimiento;
	
	
	
	
	@Column(length=250)
	private String titulo;
	@Column(length=250)
	private String codigoGenerado;
	
	
	
	
	
	
	
	
	
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
