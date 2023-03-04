package pe.gob.vuce.template.siges.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NotificacionPresentacion {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	@SequenceGenerator(name = "notificacion_presentacion_id_seq", sequenceName="notificacion_presentacion_id_seq", allocationSize=1)
	private int id;	
	
	@ManyToOne
    @JoinColumn(name = "unidad_medida_id", referencedColumnName = "id", nullable = false)
	private UnidadMedida unidadMedida;
	
	@ManyToOne
    @JoinColumn(name = "tipo_presentacion_id", referencedColumnName = "id", nullable = false)
	private TipoPresentacion tipoPresentacion;
	
	@ManyToOne
    @JoinColumn(name = "notificacion_id", referencedColumnName = "id", nullable = false)
	private Notificacion notificacion;
	
	@Column(columnDefinition="NUMERIC (12,2)")
	private Double volumen;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public UnidadMedida getUnidadMedida() {
		return unidadMedida;
	}

	public void setUnidadMedida(UnidadMedida unidadMedida) {
		this.unidadMedida = unidadMedida;
	}

	public TipoPresentacion getTipoPresentacion() {
		return tipoPresentacion;
	}

	public void setTipoPresentacion(TipoPresentacion tipoPresentacion) {
		this.tipoPresentacion = tipoPresentacion;
	}

	public Notificacion getNotificacion() {
		return notificacion;
	}

	public void setNotificacion(Notificacion notificacion) {
		this.notificacion = notificacion;
	}

	public Double getVolumen() {
		return volumen;
	}

	public void setVolumen(Double volumen) {
		this.volumen = volumen;
	}
}
