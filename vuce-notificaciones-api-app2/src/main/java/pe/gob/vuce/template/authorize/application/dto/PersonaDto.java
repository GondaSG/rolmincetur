package pe.gob.vuce.template.authorize.application.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@Data
@SuperBuilder
@NoArgsConstructor
public class PersonaDto {
    private long id;
    @JsonProperty("firstName")
    private String nombres;
    @JsonProperty("lastName")
    private String apellidos;
    @JsonProperty("documentNumber")
    private String nroDocumento;
    @JsonProperty("address")
    private String direccion;
    @JsonProperty("phone")
    private String telefono;
    @JsonProperty("email")
    private String correo;
    @JsonProperty("isActive")
    private BigDecimal activo;
}
