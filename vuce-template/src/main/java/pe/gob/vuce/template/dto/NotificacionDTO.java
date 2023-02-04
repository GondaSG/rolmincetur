package pe.gob.vuce.template.dto;

import java.util.Date;

import pe.gob.vuce.template.siges.domain.FuenteNotificacion;
import pe.gob.vuce.template.siges.domain.OrigenNotificacion;

public class NotificacionDTO {
	
	private int id;	
	
	private OrigenNotificacion origenNotificacion;
	
	private FuenteNotificacion fuenteNotificacion;
	
	private Boolean flagAfectado;
	
	private Boolean flagDigesa;
	
	private Boolean flagSanipes;
	
	private Boolean flagSenasa;
	
	private Date fechaNotificacion;
	
	private Date fechaEvento;

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
