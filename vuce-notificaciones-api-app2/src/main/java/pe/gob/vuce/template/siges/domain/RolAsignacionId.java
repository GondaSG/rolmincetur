package pe.gob.vuce.template.siges.domain;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Embeddable;
@Embeddable
public class RolAsignacionId implements Serializable{
	public RolAsignacionId(int idRol, int idAsignacion) {
		this.IdRol = idRol;
		this.IdAsignacion = idAsignacion;
	}
	public RolAsignacionId() {
	}
	private static final long serialVersionUID = 1L;

    private int IdRol;

    private int IdAsignacion;
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass()) 
            return false;

        RolAsignacionId that = (RolAsignacionId) o;
        return Objects.equals(IdRol, that.IdRol) && 
               Objects.equals(IdAsignacion, that.IdAsignacion);
    }

    @Override   
    public int hashCode() {
        return Objects.hash(IdRol,IdAsignacion);
    }

    @Override
    public String toString() {
        return "RolAsignacion [RolId=" + IdRol + ", AsignacionId=" + IdAsignacion + "]";
    }

}
