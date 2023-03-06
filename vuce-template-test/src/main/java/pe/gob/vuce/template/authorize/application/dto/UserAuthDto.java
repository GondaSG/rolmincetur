package pe.gob.vuce.template.authorize.application.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
public class UserAuthDto implements Serializable {
	private Long id;
	//Heredados
	private String applicationKey;
	private String idSesion;
    private String esPrincipal;
    private String tipUsuario;
    //private boolean tienePermiso;
	private String name;
	private String bearerToken;
	private boolean isAuthenticated;
	//private PersonaDto person;
	private UsuarioDto user;
	private List<PerfilDto> profiles;
}
