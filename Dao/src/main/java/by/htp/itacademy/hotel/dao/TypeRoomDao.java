package by.htp.itacademy.hotel.dao;

import java.util.List;

import org.hibernate.HibernateException;

import by.htp.itacademy.hotel.dao.exception.DaoException;
import by.htp.itacademy.hotel.domain.entity.TypeRoom;

public interface TypeRoomDao extends IDao<TypeRoom> {

	/**
	 * The method returns the list of the room type from the database.
	 * 
	 * @param language
	 * 
	 * @param typeRoom
	 * @return
	 * @throws DaoException
	 */
	List<TypeRoom> getAll() throws HibernateException;

}
