package by.htp.itacademy.hotel.dao;

public interface IDao<T> {
	
	void add(T model);

	void delete(Long id);

	void update(T model);
	
	T get(Long id);
}
