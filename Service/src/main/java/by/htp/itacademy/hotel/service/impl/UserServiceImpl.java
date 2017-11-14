package by.htp.itacademy.hotel.service.impl;

import by.htp.itacademy.hotel.dao.UserDao;
import by.htp.itacademy.hotel.domain.entity.User;
import by.htp.itacademy.hotel.service.UserService;
import by.htp.itacademy.hotel.service.exception.ServiceException;
import by.htp.itacademy.hotel.service.exception.ServiceNoSuchUserException;

import javax.persistence.PersistenceException;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * The class of this class is designed to execute business logic with user.
 * 
 * @author viktor
 *
 */
@Service
@Transactional
public class UserServiceImpl implements UserService {

	private static final Logger LOG = Logger.getLogger(OrderServiceImpl.class);
	private static final String LOG_ERROR = " ERROR: ";
	private static final String LOG_USER_SIGNUP = "USER SIGNUP. Login: ";
	private static final String ACCESS_USER_EXCEPTION = "Access is denied";
	@Autowired
	private UserDao dao;

	@Override
	public User logIn(User user) throws ServiceNoSuchUserException {
		User newUser = null;
		user.setHashCodePass((long) user.getPassword().hashCode());
		user.setPassword(null);
		try {
			newUser= dao.logIn(user);
		} catch (PersistenceException e) {
			LOG.error(LOG_ERROR + e.getMessage());
			throw new ServiceNoSuchUserException(ACCESS_USER_EXCEPTION);
		}
		return newUser;
	}

	@Override
	public void signUp(User user) throws ServiceException {
		try {
			dao.add(user);
			LOG.info(LOG_USER_SIGNUP + user.getLogin());
		} catch (PersistenceException e) {
			throw new ServiceException(e.getMessage());
		}
	}

	@Override
	public User personalInfo(Long id) throws ServiceNoSuchUserException {
		User user = null;
		try {
			user = dao.get(id);
		} catch (PersistenceException e) {
			LOG.error(LOG_ERROR + e.getMessage());
		}
		if (user == null) {
			throw new ServiceNoSuchUserException(ACCESS_USER_EXCEPTION);
		}
		return user;
	}

}
