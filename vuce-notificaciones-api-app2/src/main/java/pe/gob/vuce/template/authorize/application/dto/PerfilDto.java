package pe.gob.vuce.template.authorize.application.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.gob.vuce.template.authorize.util.Constantes;
import pe.gob.vuce.template.authorize.util.Util;

import java.util.Date;

@Data
@NoArgsConstructor
public class PerfilDto {
    private Long id;
    @JsonProperty("profileName")
    private String perfil;
    @JsonProperty("description")
    private String descripcion;
    @JsonProperty("startDate")
    private String fechaIniVigencia;
    @JsonProperty("expirationDate")
    private String fechaFinVigencia;

    PerfilDto(Date fechaIniVigencia, Date fechaFinVigencia) {
        setFechaIniVigencia(fechaIniVigencia);
        setFechaFinVigencia(fechaFinVigencia);
    }

    public void setFechaIniVigencia(Date fechaIniVigencia) {
        this.fechaIniVigencia = fechaIniVigencia == null ? null : Util.getStrFromDate(fechaIniVigencia, Constantes.DATEFORMAT_DDMMYYYY);
    }

    public void setFechaFinVigencia(Date fechaFinVigencia) {
        this.fechaFinVigencia = fechaFinVigencia == null ? null : Util.getStrFromDate(fechaFinVigencia, Constantes.DATEFORMAT_DDMMYYYY);
    }
}
