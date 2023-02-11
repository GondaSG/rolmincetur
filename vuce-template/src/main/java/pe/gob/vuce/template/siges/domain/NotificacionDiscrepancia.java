package pe.gob.vuce.template.siges.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table
public class NotificacionDiscrepancia {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	@SequenceGenerator(name = "notificacion_discrepancia_id_seq", sequenceName="notificacion_discrepancia_id_seq", allocationSize=1)
	private int id;	
	
	@Column(length=1000)
	private String detalle;

	@Column
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date fechaCreacion;
	
	@ManyToOne
    @JoinColumn(name = "notificacion_id", referencedColumnName = "id")
	private Notificacion notificacion;

	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDetalle() {
		return detalle;
	}

	public void setDetalle(String detalle) {
		this.detalle = detalle;
	}

	public Date getFechaCreacion() {
		return fechaCreacion;
	}

	public void setFechaCreacion(Date fechaCreacion) {
		this.fechaCreacion = fechaCreacion;
	}

	public Notificacion getNotificacion() {
		return notificacion;
	}

	public void setNotificacion(Notificacion notificacion) {
		this.notificacion = notificacion;
	}	
}
