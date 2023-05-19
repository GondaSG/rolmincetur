package pe.gob.vuce.template.authorize.domain.repository;

import pe.gob.vuce.template.authorize.application.dto.UsuarioDto;
import pe.gob.vuce.template.authorize.domain.entity.Usuario;

public interface UsuarioRepository {
    Usuario save(Usuario usuario);

    Usuario update(Usuario usuario);

    Usuario getById(long usuarioId);

    Usuario getByNameAndSOL(String nombreUsuario, String usuarioSol);
}
