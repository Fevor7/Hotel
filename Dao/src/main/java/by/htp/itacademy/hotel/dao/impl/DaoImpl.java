package by.htp.itacademy.hotel.dao.impl;



import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;


import by.htp.itacademy.hotel.dao.IDao;
import lombok.Getter;


public abstract class DaoImpl<T> implements IDao<T>{

	@PersistenceContext
	@Getter
	private EntityManager em;
	private  final Class<T> clazz;
	
	public DaoImpl(Class<T> clazz){
		this.clazz = clazz;
	}
	
	public void add(T model) {
		em.persist(model);
	}

	public void delete(Long id) {
		em.remove(get(id));		
	}

	public T get(Long id) {
		return em.find(clazz, id);
	}

	public void update(T model) {
		em.merge(model);
	}

}


