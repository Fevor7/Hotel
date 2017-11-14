package by.htp.itacademy.hotel.dao;

import java.sql.SQLException;

import org.hibernate.HibernateException;

import by.htp.itacademy.hotel.dao.exception.DaoException;
import by.htp.itacademy.hotel.domain.entity.*;
import by.htp.itacademy.hotel.domain.vo.ListPage;

public interface RoomDao extends IDao<Room>{

	/**
	 * The method returns a list of all rooms from the database.
	 * 
	 * @param language
	 * @param order
	 * 
	 * @return
	 */
	void getAll(ListPage<Room> listPage) throws HibernateException;

	/**
	 * The method returns a list of rooms corresponding to the parameters of the
	 * order from the database.
	 * 
	 * @param listPage
	 * 
	 * @param order
	 * @param language
	 * @return
	 * @throws SQLException 
	 */
	void roomListSearch(ListPage<Room> listPage, Order order) throws SQLException,  HibernateException;

	/**
	 * The method returns a list of numbers that match the order parameters from the
	 * database for the administrator.
	 * 
	 * @param listPage
	 * 
	 * @param order
	 * @param language
	 * @return
	 * @throws DaoException
	 */
	void roomListSearchAdmin(ListPage<Room> listPage, Order order) throws HibernateException;


}
