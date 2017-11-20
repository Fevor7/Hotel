package by.htp.itacademy.hotel.service;

import java.util.List;

import by.htp.itacademy.hotel.domain.entity.Order;
import by.htp.itacademy.hotel.domain.entity.StatusOrder;
import by.htp.itacademy.hotel.domain.entity.User;
import by.htp.itacademy.hotel.domain.vo.ListPage;
import by.htp.itacademy.hotel.service.exception.ServiceException;
import by.htp.itacademy.hotel.service.exception.ServiceNoOrderFoundException;

public interface OrderService {

	/**
	 * A method that compiles a query string to create an order in the database
	 * 
	 * @param order
	 * @param user
	 * @return
	 */
	void createOrder(Order order, User user) throws ServiceException;

	/**
	 * A service method that forms a query string into a database to obtain a list
	 * of orders
	 * 
	 * @param listPage
	 * @param user
	 * 
	 * @return
	 */
	ListPage<Order> orderList(ListPage<Order> listPage, Long id, User user)
			throws ServiceNoOrderFoundException;

	/**
	 * The method returns a list of user orders.
	 * 
	 * @param listPage
	 * 
	 * @param user
	 * @return
	 * @throws ServiceNoOrderFoundException
	 */
	ListPage<Order> orderListUser(ListPage<Order> listPage, User user)
			throws ServiceNoOrderFoundException;

	/**
	 * The method deletes the order.
	 * 
	 * @param order
	 * @param user
	 * @throws ServiceException
	 */
	void orderDelete(Order order, User user) throws ServiceException;

	/**
	 * The method updates the user's order.
	 * 
	 * @param order
	 * @param user
	 * @throws ServiceException
	 */
	void updateOrder(Order order, User user) throws ServiceException;

	/**
	 * The method updates the order fields by the administrator.
	 * 
	 * @param order
	 * @param user
	 * @throws ServiceException
	 */
	void updateOrderAdmin(Order order, User user) throws ServiceException;

	/**
	 * The method returns a list of stats orders
	 *
	 * @return
	 * @throws ServiceException
	 */
	List<StatusOrder> fetchStatusList() throws ServiceException;

}
