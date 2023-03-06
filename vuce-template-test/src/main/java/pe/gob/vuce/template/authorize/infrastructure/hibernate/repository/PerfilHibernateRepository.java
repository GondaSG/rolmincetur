package pe.gob.vuce.template.authorize.infrastructure.hibernate.repository;

import org.hibernate.Session;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import pe.gob.vuce.template.authorize.domain.entity.Perfil;
import pe.gob.vuce.template.authorize.domain.repository.PerfilRepository;
import pe.gob.vuce.template.common.hibernate.repository.BaseHibernateRepository;

import javax.persistence.Query;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Transactional
@Repository
public class PerfilHibernateRepository extends BaseHibernateRepository<Perfil> implements PerfilRepository {
    @Override
    public Perfil save(Perfil perfil) {
        return super.save(perfil);
    }

    @Override
    public Perfil getById(long perfilId) {
        Perfil perfil = null;
        Session session = sessionFactory.getCurrentSession();
        Query query = session.createSQLQuery(
                "SELECT p.perfil_id, p.perfil, p.fecha_inicio_vigencia, p.fecha_fin_vigencia FROM perfil p "
                        + "WHERE p.estado = 'A' AND p.perfil_id = :perfilId");
        List<Object[]> rows = query.setParameter("perfilId", perfilId).getResultList();
        if (!rows.isEmpty()) {
            Object[] row = rows.get(0);
            perfil = Perfil
                    .builder()
                    .id(Long.valueOf(row[0].toString()))
                    .perfil((String) row[1])
                    .fechaIniVigencia((Date) row[2])
                    .fechaFinVigencia((Date) row[3])
                    .build();
        }
        return perfil;
    }

    @Override
    public Perfil getByCode(String codigoPerfil) {
        Perfil perfil = null;
        Session session = sessionFactory.getCurrentSession();
        Query query = session.createSQLQuery(
                "SELECT p.perfil_id, p.perfil, p.fecha_inicio_vigencia, p.fecha_fin_vigencia FROM perfil p "
                        + "WHERE p.estado = 'A' AND p.perfil = :codigo");
        List<Object[]> rows = query.setParameter("codigo", codigoPerfil).getResultList();
        if (!rows.isEmpty()) {
            Object[] row = rows.get(0);
            perfil = Perfil
                    .builder()
                    .id(Long.valueOf(row[0].toString()))
                    .perfil((String) row[1])
                    .fechaIniVigencia((Date) row[2])
                    .fechaFinVigencia((Date) row[3])
                    .build();
        }
        return perfil;
    }

    @Override
    public List<Perfil> getByUsuarioId(Long usuarioId) {
        List<Perfil> perfiles = new ArrayList<Perfil>();
        Session session = sessionFactory.getCurrentSession();
        Query query = session.createSQLQuery(
                "SELECT p.perfil_id, p.perfil, p.descripcion, p.fecha_inicio_vigencia, p.fecha_fin_vigencia FROM perfil p " +
                        "		INNER JOIN usuario_perfil up ON p.perfil_id=up.perfil_id " +
                        "WHERE p.estado = 'A' AND up.usuario_id = :usuarioId");
        List<Object[]> rows = query.setParameter("usuarioId", usuarioId).getResultList();
        Perfil perfil = null;
        if (!rows.isEmpty()) {
            for (Object[] row : rows) {
                perfil = Perfil
                        .builder()
                        .id(Long.valueOf(row[0].toString()))
                        .perfil((String) row[1])
                        .descripcion((String) row[2])
                        .fechaIniVigencia((Date) row[3])
                        .fechaFinVigencia((Date) row[4])
                        .build();
                perfiles.add(perfil);
            }
        }
        return perfiles;
    }
}
