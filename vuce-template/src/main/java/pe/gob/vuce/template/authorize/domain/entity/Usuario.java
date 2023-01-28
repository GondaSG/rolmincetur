package pe.gob.vuce.template.authorize.domain.entity;

import lombok.*;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@NoArgsConstructor(access = AccessLevel.PACKAGE)
public class Usuario {
    private Long id;
    private String usuario;
    private String usuarioSol;
    //private String clave;
    private String entidad;
    private String area;
    private Date fechaIniVigencia;
    private Date fechaFinVigencia;
    private String estado;
}
