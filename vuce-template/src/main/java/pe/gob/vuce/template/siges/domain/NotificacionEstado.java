package pe.gob.vuce.template.siges.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

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
@IdClass(NotificacionEstadoId.class)
@Table(name = "notificacion_estado")
public class NotificacionEstado implements Serializable{
	@Id
	private int IdNotificacion;
	@Id
	private int IdEstado;

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

	public Notificacion getNotificacion() {
		return notificacion;
	}

	public void setNotificacion(Notificacion notificacion) {
		this.notificacion = notificacion;
	}

	public Estado getEstado() {
		return estado;
	}

	public void setEstado(Estado estado) {
		this.estado = estado;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}

	@ManyToOne
	@JoinColumn(name = "idNotificacion", referencedColumnName = "id", insertable = false, updatable = false)
	private Notificacion notificacion;
	
	@ManyToOne
	@JoinColumn(name = "idEstado", referencedColumnName = "id", insertable = false, updatable = false)
	private Estado estado;
	
	private boolean isActive;
	
	@Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass())
            return false;

        NotificacionEstado that = (NotificacionEstado) o;
        return Objects.equals(notificacion, that.notificacion) &&
                Objects.equals(estado, that.estado);
    }

    @Override
    public int hashCode() {
        return Objects.hash(notificacion, estado);
    }
}
