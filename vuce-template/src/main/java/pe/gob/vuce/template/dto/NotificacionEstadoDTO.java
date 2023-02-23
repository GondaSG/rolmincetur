package pe.gob.vuce.template.dto;

public class NotificacionEstadoDTO {
	
	private int IdNotificacion;
	
	private int IdEstado;
	
	private boolean flagActivo;

	private boolean flagLeido;
	
	private String mensaje;
	
	public boolean getFlagLeido() {
		return flagLeido;
	}

	public void setFlagLeido(boolean flagLeido) {
		this.flagLeido = flagLeido;
	}

	public boolean getFlagActivo() {
		return flagActivo;
	}

	public void setFlagActivo(boolean flagActivo) {
		this.flagActivo = flagActivo;
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
	
	public String getMensaje() {
		return mensaje;
	}

	public void setMensaje(String mensaje) {
		this.mensaje = mensaje;
	}
}
