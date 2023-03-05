package pe.gob.vuce.template.siges.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;

@Entity
public class NotificacionLote {

	public NotificacionLote(int id, UnidadMedida unidadMedida, Notificacion notificacion, String lote,
			Double cantidad) {
		super();
		this.id = id;
		this.unidadMedida = unidadMedida;
		this.notificacion = notificacion;
		this.lote = lote;
		this.cantidad = cantidad;
	}
	public NotificacionLote() {
		super();
	}
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	@SequenceGenerator(name = "notificacion_lote_id_seq", sequenceName="notificacion_lote_id_seq", allocationSize=1)
	private int id;
	
	@ManyToOne
    @JoinColumn(name = "unidad_medida_id", referencedColumnName = "id", nullable = false)
	private UnidadMedida unidadMedida;

	@ManyToOne
    @JoinColumn(name = "notificacion_id", referencedColumnName = "id", nullable = false)
	private Notificacion notificacion;
	
	@Column
	private String lote;
	
	@Column(columnDefinition="NUMERIC (12,2)")
	private Double cantidad;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Notificacion getNotificacion() {
		return notificacion;
	}

	public void setNotificacion(Notificacion notificacion) {
		this.notificacion = notificacion;
	}

	public String getLote() {
		return lote;
	}

	public void setLote(String lote) {
		this.lote = lote;
	}

	public Double getCantidad() {
		return cantidad;
	}

	public void setCantidad(Double cantidad) {
		this.cantidad = cantidad;
	}	
	
	public UnidadMedida getUnidadMedida() {
		return unidadMedida;
	}

	public void setUnidadMedida(UnidadMedida unidadMedida) {
		this.unidadMedida = unidadMedida;
	}
}
