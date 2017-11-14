package by.htp.itacademy.hotel.dao.impl;

import javax.persistence.Query;

import org.springframework.stereotype.Repository;

import by.htp.itacademy.hotel.dao.UserDao;
import by.htp.itacademy.hotel.domain.entity.User;

/**
 * The object of this class sends a database query and processes the result. In
 * order to check the presence of a client with specific identification data.
 * 
 * @author Viktor
 *
 */
@Repository
public class UserDaoImpl extends DaoImpl<User> implements UserDao {

	public UserDaoImpl() {
		super(User.class);
	}

	@Override
	public User logIn(User user)  {
		Query query = getEm().createQuery("select u from User u where (u.login = ?1 or u.email = ?2) and u.hashCodePass = ?3 ");
		query.setParameter(1, user.getLogin())
			 .setParameter(2, user.getLogin())
			 .setParameter(3, user.getHashCodePass());
		return (User)query.getSingleResult();
		
	}

}
