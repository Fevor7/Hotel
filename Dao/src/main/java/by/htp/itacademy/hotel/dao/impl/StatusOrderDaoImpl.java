package by.htp.itacademy.hotel.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import by.htp.itacademy.hotel.dao.StatusOrderDao;
import by.htp.itacademy.hotel.domain.entity.StatusOrder;

/**
 * The object of this class works with the table - status_order in the MySql
 * database.
 * 
 * @author Viktor
 *
 */
@Repository
public class StatusOrderDaoImpl extends DaoImpl<StatusOrder> implements StatusOrderDao {

	public StatusOrderDaoImpl() {
		super(StatusOrder.class);
	}

	@Override
	public List<StatusOrder> getAll() {
		return  getEm().createQuery("SELECT s FROM StatusOrder s order by id asc", StatusOrder.class).getResultList();
	}

}
