package pe.gob.vuce.template.authorize.domain.entity;

import lombok.*;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@NoArgsConstructor(access = AccessLevel.PACKAGE)
public class Perfil {
	private Long id;
	private String perfil;
	private String descripcion;
	private Date fechaIniVigencia;
	private Date fechaFinVigencia;
	private String estado;
	@Builder.Default private Set<Usuario> usuarios = new HashSet<Usuario>();
	
	public void addUsuario(Usuario usuario) {
        this.usuarios.add(usuario);
    }
}
