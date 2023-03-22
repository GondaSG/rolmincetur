package pe.gob.vuce.template.siges.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;
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
@IdClass(NotificacionFaseId.class)
@Table(name = "notificacion_fase", uniqueConstraints= {
		@UniqueConstraint(name = "notificacion_fase_pk", columnNames = {"notificacionId", "faseId"})
})
public class NotificacionFase implements Serializable{
	@Id()
	@Column(name = "notificacionId")
	private int IdNotificacion;
	@Id
	@Column(name = "faseId")
	private int IdFase;
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
			name = "faseId", 
			referencedColumnName = "id", 
			insertable = false, 
			updatable = false, 
			foreignKey = @ForeignKey(name = "fase_fk"))
	private Fase fase;
	public int getIdNotificacion() {
		return IdNotificacion;
	}

	public void setIdNotificacion(int idNotificacion) {
		IdNotificacion = idNotificacion;
	}

	public int getIdFase() {
		return IdFase;
	}

	public void setIdFase(int IdFase) {
		this.IdFase = IdFase;
	}

	public Notificacion getNotificacion() {
		return notificacion;
	}

	public void setNotificacion(Notificacion notificacion) {
		this.notificacion = notificacion;
	}

	public Fase getFase() {
		return fase;
	}

	public void setFase(Fase fase) {
		this.fase = fase;
	}
	@Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass())
            return false;

        NotificacionFase that = (NotificacionFase) o;
        return Objects.equals(notificacion, that.notificacion) &&
                Objects.equals(fase, that.fase);
    }

    @Override
    public int hashCode() {
        return Objects.hash(notificacion, fase);
    }
        
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	@Column (nullable=false)
	private Date fechaCreacion = new Date();
	public Date getFechaCreacion() {
		return fechaCreacion;
	}
	public void setFechaCreacion(Date fechaCreacion) {
		this.fechaCreacion = fechaCreacion;
	}
	
	@Column (nullable=false)
	private boolean flagActivo;
	
	public boolean getFlagActivo() {
		return flagActivo;
	}

	public void setFlagActivo(boolean flagActivo) {
		this.flagActivo = flagActivo;
	}
	
	@Column (nullable=true, columnDefinition="TEXT")
	private String mensaje;
	
	public String getMensaje() {
		return mensaje;
	}

	public void setMensaje(String mensaje) {
		this.mensaje = mensaje;
	}
}
