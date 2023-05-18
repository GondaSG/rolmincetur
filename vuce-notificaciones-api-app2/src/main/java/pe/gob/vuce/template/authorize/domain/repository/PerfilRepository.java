package pe.gob.vuce.template.authorize.domain.repository;

import pe.gob.vuce.template.authorize.domain.entity.Perfil;

import java.util.List;

public interface PerfilRepository {
    Perfil save(Perfil perfil);

    Perfil getById(long perfilId);

    Perfil getByCode(String codigoPerfil);

    List<Perfil> getByUsuarioId(Long usuarioId);
}
