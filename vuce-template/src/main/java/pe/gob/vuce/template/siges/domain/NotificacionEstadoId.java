package pe.gob.vuce.template.siges.domain;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Embeddable;

@Embeddable
public class NotificacionEstadoId implements Serializable{
	private static final long serialVersionUID = 1L;

    private int IdEstado;

    private int IdNotificacion;

    public NotificacionEstadoId() {

    }

    public NotificacionEstadoId(int IdEstado, int IdNotificacion) {
        this.IdEstado = IdEstado;
        this.IdNotificacion = IdNotificacion;
    }   

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass()) 
            return false;

        NotificacionEstadoId that = (NotificacionEstadoId) o;
        return Objects.equals(IdEstado, that.IdEstado) && 
               Objects.equals(IdNotificacion, that.IdNotificacion);
    }

    @Override   
    public int hashCode() {
        return Objects.hash(IdNotificacion,IdEstado);
    }

    @Override
    public String toString() {
        return "NotificacionEstado [EstadoId=" + IdEstado + ", NotificacionId=" + IdNotificacion + "]";
    }
}
