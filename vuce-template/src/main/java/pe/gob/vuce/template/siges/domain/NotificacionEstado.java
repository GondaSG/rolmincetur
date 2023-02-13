package pe.gob.vuce.template.siges.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

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
@Table(name = "notificacion_estado", uniqueConstraints= {
		@UniqueConstraint(name = "notificacion_estado_pk", columnNames = {"notificacionId", "estadoId"})
})
public class NotificacionEstado implements Serializable{
	@Id()
	@Column(name = "notificacionId")
	private int IdNotificacion;
	@Id
	@Column(name = "estadoId")
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

	@ManyToOne
	@JoinColumn(
			name = "notificacionId", 
			referencedColumnName = "id", 
			insertable = false, 
			updatable = false,
			foreignKey = @ForeignKey(name = "notificacion_fk"))
	
	private Notificacion notificacion;
	
	@ManyToOne
	@JoinColumn(
			name = "estadoId", 
			referencedColumnName = "id", 
			insertable = false, 
			updatable = false, 
			foreignKey = @ForeignKey(name = "estado_fk"))
	
	private Estado estado;
	
	@Column (nullable=true)
	private boolean flagActivo;
	
	public boolean getFlagActivo() {
		return flagActivo;
	}

	public void setFlagActivo(boolean flagActivo) {
		this.flagActivo = flagActivo;
	}

	public boolean getFlagLeido() {
		return flagLeido;
	}

	public void setFlagLeido(boolean flagLeido) {
		this.flagLeido = flagLeido;
	}
	
	@Column (nullable=true)
	private boolean flagLeido;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date fechaCreacion = new Date();
	public Date getFechaCreacion() {
		return fechaCreacion;
	}
	public void setFechaCreacion(Date fechaCreacion) {
		this.fechaCreacion = fechaCreacion;
	}
	
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
