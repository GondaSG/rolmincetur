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
@IdClass(RolAsignacionId.class)
@Table(name = "rol_asignacion", uniqueConstraints= {
		@UniqueConstraint(name = "rol_asignacion_pk", columnNames = {"rolId", "asignacionId"})
})
public class RolAsignacion extends BaseEntity implements Serializable {
	@Id()
	@Column(name = "rolId")
	private int IdRol;
	@Id
	@Column(name = "asignacionId")
	private int IdAsignacion;
	
	@ManyToOne
	@JoinColumn(
			name = "rolId", 
			referencedColumnName = "id", 
			insertable = false, 
			updatable = false,
			foreignKey = @ForeignKey(name = "rol_fk"))
	
	private Rol rol;
	
	@ManyToOne
	@JoinColumn(
			name = "asignacionId", 
			referencedColumnName = "id", 
			insertable = false, 
			updatable = false, 
			foreignKey = @ForeignKey(name = "asignacion_fk"))
	private Asignacion asignacion;
	
	public int getIdAsignacion() {
		return IdAsignacion;
	}

	public void setIdAsignacion(int idAsignacion) {
		IdAsignacion = idAsignacion;
	}

	public int getIdRol() {
		return IdRol;
	}

	public void setIdRol(int idRol) {
		IdRol = idRol;
	}
	
	public Asignacion getAsignacion() {
		return asignacion;
	}

	public void setAsignacion(Asignacion asignacion) {
		this.asignacion = asignacion;
	}

	public Rol getRol() {
		return rol;
	}

	public void setRol(Rol rol) {
		this.rol = rol;
	}
	@Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass())
            return false;

        RolAsignacion that = (RolAsignacion) o;
        return Objects.equals(rol, that.rol) &&
                Objects.equals(asignacion, that.asignacion);
    }

    @Override
    public int hashCode() {
        return Objects.hash(rol, asignacion);
    }
}
