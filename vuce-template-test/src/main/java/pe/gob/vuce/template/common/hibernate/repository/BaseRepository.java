package pe.gob.vuce.template.common.hibernate.repository;

public interface BaseRepository<T> {
	T persist(T entity);
	T save(T entity);
	T update(T entity);
	T merge(T entity);
	T saveOrUpdate(T entity);
}
