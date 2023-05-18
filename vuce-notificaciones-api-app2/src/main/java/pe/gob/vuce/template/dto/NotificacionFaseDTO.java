package pe.gob.vuce.template.dto;

public class NotificacionFaseDTO {
	
	private int IdNotificacion;
	
	private int IdFase;
	
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

	public int getIdFase() {
		return IdFase;
	}

	public void setIdFase(int idFase) {
		IdFase = idFase;
	}
	
	public String getMensaje() {
		return mensaje;
	}

	public void setMensaje(String mensaje) {
		this.mensaje = mensaje;
	}
}
