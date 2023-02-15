package pe.gob.vuce.template.siges.domain;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Embeddable;
@Embeddable
public class NotificacionFaseId implements Serializable{
	private static final long serialVersionUID = 1L;

    private int IdFase;

    private int IdNotificacion;

    public NotificacionFaseId() {

    }

    public NotificacionFaseId(int IdFase, int IdNotificacion) {
        this.IdFase = IdFase;
        this.IdNotificacion = IdNotificacion;
    }   

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass()) 
            return false;

        NotificacionFaseId that = (NotificacionFaseId) o;
        return Objects.equals(IdFase, that.IdFase) && 
               Objects.equals(IdNotificacion, that.IdNotificacion);
    }

    @Override   
    public int hashCode() {
        return Objects.hash(IdNotificacion,IdFase);
    }

    @Override
    public String toString() {
        return "NotificacionEstado [FaseId=" + IdFase + ", NotificacionId=" + IdNotificacion + "]";
    }
}
