package by.htp.itacademy.hotel.dao;

import org.hibernate.HibernateException;

import by.htp.itacademy.hotel.domain.entity.Order;
import by.htp.itacademy.hotel.domain.entity.User;
import by.htp.itacademy.hotel.domain.vo.ListPage;

public interface OrderDao extends IDao<Order>{

	/**
	 * The method returns a list of all orders.
	 * 
	 * @param listPage
	 * @param language
	 * 
	 * @param order
	 * 
	 * @param sqlRequest
	 * @return
	 */
	ListPage<Order> getAll(ListPage<Order> listPage) throws HibernateException;

	/**
	 * The method that returns the list of orders received from the database.
	 * 
	 * @param listPage
	 * 
	 * @param order
	 * 
	 * @param sqlRequest
	 * @return
	 */
	ListPage<Order> fetchSomethingOrder(ListPage<Order> listPage, Order order) throws HibernateException;

	/**
	 * The method returns a list of user orders read from the database.
	 * 
	 * @param listPage
	 * 
	 * @param user
	 * @param language
	 * @return
	 */
	ListPage<Order> fetchUserOrder(ListPage<Order> listPage, User user) throws HibernateException;

}
