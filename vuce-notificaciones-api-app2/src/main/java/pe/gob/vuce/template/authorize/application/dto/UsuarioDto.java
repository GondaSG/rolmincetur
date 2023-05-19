package pe.gob.vuce.template.authorize.application.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import pe.gob.vuce.template.authorize.application.dto.deserializer.UsuarioDtoDeserializer;
import pe.gob.vuce.template.authorize.util.Constantes;
import pe.gob.vuce.template.authorize.util.Util;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@SuperBuilder
@NoArgsConstructor
@JsonDeserialize(using = UsuarioDtoDeserializer.class)
public class UsuarioDto {
    private Long id;
    @JsonProperty("person")
    private PersonaDto persona;
    @JsonProperty("userName")
    private String usuario;
    @JsonProperty("userSol")
    private String usuarioSol;
    @JsonProperty("entity")
    private String entidad;
    @JsonProperty("area")
    private String area;
    @JsonProperty("startDate")
    private String fechaIniVigencia;
    @JsonProperty("endDate")
    private String fechaFinVigencia;
    @JsonProperty("state")
    private String estado;

    UsuarioDto(Date fechaIniVigencia, Date fechaFinVigencia) {
        setFechaIniVigencia(fechaIniVigencia);
        setFechaFinVigencia(fechaFinVigencia);
    }

    public void setFechaIniVigencia(Date fechaIniVigencia) {
        this.fechaIniVigencia = fechaIniVigencia == null ? null : Util.getStrFromDate(fechaIniVigencia, Constantes.DATEFORMAT_DDMMYYYY);
    }

    public void setFechaFinVigencia(Date fechaFinVigencia) {
        this.fechaFinVigencia = fechaFinVigencia == null ? null : Util.getStrFromDate(fechaFinVigencia, Constantes.DATEFORMAT_DDMMYYYY);
    }

    @JsonProperty("profiles")
    @Builder.Default
    private Set<PerfilDto> perfiles = new HashSet<PerfilDto>();

    public void addPerfil(PerfilDto perfil) {
        this.perfiles.add(perfil);
    }

    public void addPerfiles(List<PerfilDto> perfiles) {
        this.perfiles.addAll(perfiles);
    }
}
