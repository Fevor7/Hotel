package by.htp.itacademy.hotel.dao.impl;

import java.util.List;

import javax.persistence.Query;
import org.hibernate.HibernateException;
import org.springframework.stereotype.Repository;

import by.htp.itacademy.hotel.dao.OrderDao;
import by.htp.itacademy.hotel.domain.entity.Order;
import by.htp.itacademy.hotel.domain.entity.User;
import by.htp.itacademy.hotel.domain.vo.ListPage;

/**
 * The object of this class performs actions with the table of orders in the
 * database.
 * 
 * @author Viktor
 *
 */
@Repository
public class OrderDaoImpl extends DaoImpl<Order> implements OrderDao {

	public OrderDaoImpl() {
		super(Order.class);
	}

	@Override
	public ListPage<Order> getAll(ListPage<Order> listPage) throws HibernateException {
		Query query = getEm().createQuery("select count(id) FROM Order o order by o.id desc");
		Long total = (Long) query.getSingleResult();
		query = getEm().createQuery("select o FROM Order o order by o.id desc", Order.class);
		query.setFirstResult(listPage.getMaxPerPage() * listPage.getPage());
		query.setMaxResults(listPage.getMaxPerPage());
		List<Order> list = query.getResultList();
		return listPage.setData(list).setTotal(total);
	}

	@Override
	public ListPage<Order> fetchSomethingOrder(ListPage<Order> listPage, Long id) throws HibernateException {
		Query query = getEm().createQuery("select count(id) FROM Order o WHERE o.orderStatus.id = ?1 order by o.id desc");
		query.setParameter(1, id);
		Long total = (Long) query.getSingleResult();
		query = getEm().createQuery("select o FROM Order o WHERE o.orderStatus.id = ?1 order by o.id desc", Order.class);
		query.setParameter(1, id);
		query.setFirstResult(listPage.getMaxPerPage() * listPage.getPage());
		query.setMaxResults(listPage.getMaxPerPage());
		List<Order> list = query.getResultList();
		return listPage.setData(list).setTotal(total);
	}

	@Override
	public ListPage<Order> fetchUserOrder(ListPage<Order> listPage, User user) throws HibernateException {
		Query query = getEm().createQuery("select count(id) FROM Order o WHERE o.user.id = ?1 order by o.id desc");
		query.setParameter(1, user.getId());
		Long total = (Long) query.getSingleResult();
		query = getEm().createQuery("select o FROM Order o WHERE o.user.id = ?1 order by o.id desc", Order.class);
		query.setParameter(1, user.getId());
		query.setFirstResult(listPage.getMaxPerPage() * listPage.getPage());
		query.setMaxResults(listPage.getMaxPerPage());
		List<Order> list = query.getResultList();
		return listPage.setData(list).setTotal(total);
	}

}
