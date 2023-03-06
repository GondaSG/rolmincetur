package pe.gob.vuce.template.authorize.infrastructure.hibernate.repository;

import org.hibernate.Session;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import pe.gob.vuce.template.authorize.domain.entity.Usuario;
import pe.gob.vuce.template.authorize.domain.repository.UsuarioRepository;
import pe.gob.vuce.template.common.hibernate.repository.BaseHibernateRepository;

import javax.persistence.Query;
import java.util.List;

@Transactional
@Repository
public class UsuarioHibernateRepository extends BaseHibernateRepository<Usuario> implements UsuarioRepository {
    public Usuario save(Usuario usuario) {
        return super.save(usuario);
    }

    public Usuario update(Usuario usuario) {
        return super.update(usuario);
    }

    @Override
    public Usuario getById(long usuarioId) {
        Session session = sessionFactory.getCurrentSession();
        Query query = session.createSQLQuery("SELECT u.usuario_id, u.nombre_usuario, u.usuario_sol "
                + " FROM usuario u "
                + " WHERE u.usuario_id = :usuarioId");
        List<Object[]> rows = query.setParameter("usuarioId", usuarioId).getResultList();
        Usuario usuario = null;
        if (!rows.isEmpty()) {
            Object[] row = rows.get(0);
            usuario = Usuario
                    .builder()
                    .id(Long.valueOf(row[0].toString()))
                    .usuario((String) row[1])
                    .usuarioSol((String) row[2])
                    .build();
        }
        return usuario;
    }

    public Usuario getByNameAndSOL(String nombreUsuario, String usuarioSol) {
        Session session = sessionFactory.getCurrentSession();
        Query query = session.createSQLQuery(
                "SELECT u.usuario_id, u.nombre_usuario, u.usuario_sol "
                        + "FROM usuario u "
                        + "WHERE u.nombre_usuario = :nombreUsuario "
                        + "AND u.usuario_sol = :usuarioSol");
        List<Object[]> rows = query
                .setParameter("nombreUsuario", nombreUsuario)
                .setParameter("usuarioSol", usuarioSol)
                .getResultList();
        Usuario usuario = null;
        if (!rows.isEmpty()) {
            Object[] row = rows.get(0);
            usuario = Usuario
                    .builder()
                    .id(Long.valueOf(row[0].toString()))
                    .usuario((String) row[1])
                    .usuarioSol((String) row[2])
                    .build();
        }
        return usuario;
    }
}
