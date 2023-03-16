package pe.gob.vuce.template.siges.repository;

import java.io.ByteArrayInputStream;
import java.util.Date;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pe.gob.vuce.template.siges.domain.Notificacion;
import pe.gob.vuce.template.siges.domain.NotificacionEstado;

@Repository
public interface NotificacionRepository extends JpaRepository<Notificacion, Integer>{
	
	
	
	@Query(value="select n.* from notificacion n "
			+ "	inner join notificacion_estado as ne ON ne.notificacion_id = n.id and ne.flag_activo = true "
			+ "	where n.flag_activo = true and n.codigo_generado ilike %?1% "
			+ "	and case when ?9 > 0 then n.flag_nacional = ?2 else 1 = 1 end "
			+ "	and case when ?3 is not null then n.flag_digesa = ?3 else 1 = 1 end "
			+ "	and case when ?4 is not null then n.flag_senasa = ?4 else 1 = 1 end "
			+ "	and case when ?7 > 0 then n.fecha_creacion >= ?5 else 1 = 1 end "
			+ "	and case when ?7 > 0 then n.fecha_creacion <= ?6 else 1 = 1 end "
			+ "	and n.tipo_notificacion_id in (?8) "
			//+ "	and case when ?9 = 0 then 1 = 1 else n.tipo_notificacion_id in (?8) end "
			//+ "	and case when ?11 > 0 then ne.estado_id in (?10) else 1 = 1  end "
			+ " order by fecha_creacion desc",	nativeQuery=true)
	Page<Notificacion> search(String code,	Boolean isNacional, Boolean flagDigesa, Boolean flagSenasa,
	Date fechaCreacion, Date fechaCreacionFinal, int value,	
	List<Integer> tipoNotificacionId, //int value2,
	//List<Integer> estadoId, int value3, 
	int booleanDato,
	Pageable page);
	
	
	@Query(value="select n.* from notificacion n "
			+ "	inner join notificacion_estado as ne ON ne.notificacion_id = n.id and ne.flag_activo = true "
			+ "	where n.flag_activo = true and n.codigo_generado ilike %?1% "
			+ "	and case when ?9 > 0 then n.flag_nacional = ?2 else 1 = 1 end "
			+ "	and case when ?3 is not null then n.flag_digesa = ?3 else 1 = 1 end "
			+ "	and case when ?4 is not null then n.flag_senasa = ?4 else 1 = 1 end "
			+ "	and case when ?7 > 0 then n.fecha_creacion >= ?5 else 1 = 1 end "
			+ "	and case when ?7 > 0 then n.fecha_creacion <= ?6 else 1 = 1 end "
			+ "	and n.tipo_notificacion_id in (?8) "
			+ " order by fecha_creacion desc",	nativeQuery=true)
	List<Notificacion> search2(String code,	Boolean isNacional, Boolean flagDigesa, Boolean flagSenasa,
	Date fechaCreacion, Date fechaCreacionFinal, int value,	List<Integer> tipoNotificacionId, 
	int booleanDato);
	
	
	@Modifying
	@Query(value="update notificacion set flag_activo = false where id = ?1", nativeQuery=true)
	int updateActive(int id);
	
	@Query(value="select n.* from notificacion n "
			+ "	inner join notificacion_estado as ne ON ne.notificacion_id = n.id and ne.flag_activo = true "
			+ " where ne.flag_leido = false "
			+ "	and case when ?1 is not null then n.flag_digesa = ?1 else 1 = 1 end "
			+ "	and case when ?2 is not null then n.flag_sanipes = ?2 else 1 = 1 end "
			+ " and case when ?3 is not null then n.flag_senasa = ?3 else 1 = 1 end ", nativeQuery=true)
	List<Notificacion> getNoLeidos(Boolean flagDigesa, Boolean flagSanipes, Boolean flagSenasa);
	
	@Query(value="select n.* from notificacion n "
			+ " where n.flag_activo = true "
			+ "	and case when ?3 > 0 then n.fecha_creacion >= ?1 else 1 = 1 end "
			+ "	and case when ?3 > 0 then n.fecha_creacion <= ?2 else 1 = 1 end ", nativeQuery=true)
	List<Notificacion> indicadores(Date fechaCreacion, Date fechaCreacionFinal, int value);
	
	@Query(value="select n.* from notificacion n "
			+ "	inner join notificacion_estado as ne ON ne.notificacion_id = n.id and ne.flag_activo = true "
			+ "	where n.flag_activo = true and n.flag_afectado = true and n.codigo_generado ilike %?1% "
			+ " order by fecha_creacion desc",	nativeQuery=true)
	Page<Notificacion> afectaHumanos(String code, Pageable page);
}
