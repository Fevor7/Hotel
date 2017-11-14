package by.htp.itacademy.hotel.dao.impl;

import java.math.BigInteger;
import java.sql.SQLException;
import java.util.List;

import javax.persistence.Query;

import org.hibernate.HibernateException;
import org.springframework.stereotype.Repository;

import by.htp.itacademy.hotel.dao.RoomDao;
import by.htp.itacademy.hotel.domain.entity.Order;
import by.htp.itacademy.hotel.domain.entity.Room;
import by.htp.itacademy.hotel.domain.vo.ListPage;

import static by.htp.itacademy.hotel.util.SqlCommand.*;

/**
 * The object of this class performs operations on the table of rooms in the
 * database.
 * 
 * @author viktor
 *
 */
@Repository
public class RoomDaoImpl extends DaoImpl<Room> implements RoomDao {

	public RoomDaoImpl() {
		super(Room.class);
	}

	@Override
	public void getAll(ListPage<Room> listPage) throws HibernateException {
		Long total = (Long) getEm().createQuery(SELECT_ROOM_ALL_COUNT).getSingleResult();
		Query query = getEm().createQuery(SELECT_ROOM_ALL, Room.class);
		query.setFirstResult(listPage.getMaxPerPage() * listPage.getPage());
		query.setMaxResults(listPage.getMaxPerPage());
		List<Room> list = query.getResultList();
		listPage.setTotalAndData(total, list);
	}

	@Override
	public void roomListSearch(ListPage<Room> listPage, Order order) throws SQLException {
		Query query = getEm().createNativeQuery(getQuerty(order), Room.class);
		query.setFirstResult(listPage.getMaxPerPage() * listPage.getPage());
		query.setMaxResults(listPage.getMaxPerPage());
		setParameterQuery(query,order);
		List<Room> list = query.getResultList();
		query = getEm().createNativeQuery(getQuertyCount(order));
		setParameterQuery(query,order);
		BigInteger total =  (BigInteger) query.getSingleResult();
		listPage.setTotalAndData(total.longValue(), list);
	}

	private String getQuertyCount(Order order) {
		String query = SELECT_ROOM_SEARCH_TYPE_COUNT;
		Long status = order.getTypeRoom().getId();
		if ((Long.valueOf(1L).equals(status))) {
			query = SELECT_ROOM_SEARCH_COUNT;
		}
		return query;
	}

	private String getQuertyCountAdmin(Order order) {
		String query = SELECT_ROOM_SEARCH_TYPE_COUNT_ADMIN;
		Long status = order.getTypeRoom().getId();
		if ((Long.valueOf(1L).equals(status))) {
			query = SELECT_ROOM_SEARCH_COUNT_ADMIN;
		}
		return query;
	}
	
	private String getQuerty(Order order) {
		String query = SELECT_ROOM_SEARCH_TYPE;
		Long type = order.getTypeRoom().getId();
		if ((Long.valueOf(1L).equals(type))) {
			query = SELECT_ROOM_SEARCH;
		}
		return query;
	}
	
	private String getQuertyAdmin(Order order) {
		String query = SELECT_ROOM_SEARCH_TYPE_ADMIN;
		Long type = order.getTypeRoom().getId();
		if ((Long.valueOf(1L).equals(type))) {
			query = SELECT_ROOM_SEARCH_ADMIN;
		}
		return query;
	}

	@Override
	public void roomListSearchAdmin(ListPage<Room> listPage, Order order) throws HibernateException {
		Query query = getEm().createNativeQuery(getQuertyAdmin(order), Room.class);
		query.setFirstResult(listPage.getMaxPerPage() * listPage.getPage());
		query.setMaxResults(listPage.getMaxPerPage());
		setParameterQueryAdmin(query,order);
		List<Room> list = query.getResultList();
		query = getEm().createNativeQuery(getQuertyCountAdmin(order));
		setParameterQueryAdmin(query,order);
		BigInteger total =  (BigInteger) query.getSingleResult();
		listPage.setTotalAndData(total.longValue(), list);
	}

	private void setParameterQuery(Query query, Order order) {
		query.setParameter(1, order.getDateStart())
			 .setParameter(2, order.getDateStart())
			 .setParameter(3, order.getDateEnd())
			 .setParameter(4, order.getDateEnd())
			 .setParameter(5, order.getMinPrice())
			 .setParameter(6, order.getMaxPrice())
			 .setParameter(7, order.getPersonNumber())
			 .setParameter(8, order.getBedNumber());
		Long type = order.getTypeRoom().getId();
		if (!(Long.valueOf(1L).equals(type))) {
			query.setParameter(9, type);
		} 
	}
	
	private void setParameterQueryAdmin(Query query, Order order) {
		query.setParameter(1, order.getDateStart())
			 .setParameter(2, order.getDateStart())
			 .setParameter(3, order.getDateEnd())
			 .setParameter(4, order.getDateEnd())
			 .setParameter(7, order.getPersonNumber())
			 .setParameter(8, order.getBedNumber());
		Long type = order.getTypeRoom().getId();
		if (!(Long.valueOf(1L).equals(type))) {
			query.setParameter(9, type);
		} 
	}

}
