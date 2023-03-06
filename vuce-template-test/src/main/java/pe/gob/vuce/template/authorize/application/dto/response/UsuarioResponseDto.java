package pe.gob.vuce.template.authorize.application.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import pe.gob.vuce.template.authorize.application.dto.PersonaDto;

@Data
@SuperBuilder
@NoArgsConstructor
public class UsuarioResponseDto {
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
}
