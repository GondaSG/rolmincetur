package pe.gob.vuce.template.dto;

import java.util.Date;

public class NotificacionEstadoDTO {
	
	private int IdNotificacion;
	
	private int IdEstado;
	
	private boolean flagActive;

	public boolean getFlagActive() {
		return flagActive;
	}

	public void setFlagActive(boolean flagActive) {
		this.flagActive = flagActive;
	}

	public int getIdNotificacion() {
		return IdNotificacion;
	}

	public void setIdNotificacion(int idNotificacion) {
		IdNotificacion = idNotificacion;
	}

	public int getIdEstado() {
		return IdEstado;
	}

	public void setIdEstado(int idEstado) {
		IdEstado = idEstado;
	}
	
}
