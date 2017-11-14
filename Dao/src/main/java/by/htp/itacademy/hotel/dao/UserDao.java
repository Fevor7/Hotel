package by.htp.itacademy.hotel.dao;

import org.hibernate.HibernateException;
import by.htp.itacademy.hotel.domain.entity.User;

public interface UserDao extends IDao<User> {
	/**
	 * The method that organizes access
	 * 
	 * @param user
	 * @return
	 */
	User logIn(User user) throws HibernateException;

}
