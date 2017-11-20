package by.htp.itacademy.hotel.service.impl;

import java.sql.SQLException;
import java.util.*;

import org.apache.log4j.Logger;
import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import by.htp.itacademy.hotel.dao.RoomDao;
import by.htp.itacademy.hotel.dao.TypeRoomDao;
import by.htp.itacademy.hotel.domain.entity.Order;
import by.htp.itacademy.hotel.domain.entity.Room;
import by.htp.itacademy.hotel.domain.entity.TypeRoom;
import by.htp.itacademy.hotel.domain.vo.ListPage;
import by.htp.itacademy.hotel.service.RoomService;
import by.htp.itacademy.hotel.service.exception.ServiceException;
import by.htp.itacademy.hotel.service.exception.ServiceNoRoomFoundException;

/**
 * The class of this class performs the function of business logic over the room
 * object.
 * 
 * @author viktor
 *
 */
@Service
@Transactional
public class RoomServiceImpl implements RoomService {

private static final Logger LOG = Logger.getLogger(RoomServiceImpl.class);
	private static final String TYPE_ROOM_EXCEPTION = "The list of room types is empty.";
	private static final String ROOM_LIST_EXCEPTION = "No rooms found";
	private static final String LOG_ERROR = " ERROR: ";
	private static final String PAGE_CONTENT = "pagecontent";
	@Autowired
	private TypeRoomDao typeRoomDao;
	@Autowired
	private RoomDao roomDao;

	@Override
	public ListPage<Room> roomList(ListPage<Room> listPage) throws ServiceNoRoomFoundException {
		try {
			roomDao.getAll(listPage);
		} catch (HibernateException | MissingResourceException e) {
			LOG.error(LOG_ERROR + e.getMessage());
		}
		if (listPage.getData().isEmpty()) {
			throw new ServiceNoRoomFoundException(ROOM_LIST_EXCEPTION);
		}
		return listPage;
	}

	@Override
	public ListPage<Room> searchRoom(ListPage<Room> listPage, Order order)
			throws ServiceNoRoomFoundException {
		try {
			roomDao.roomListSearch(listPage, order);
		} catch (SQLException e) {
			LOG.error(LOG_ERROR + e.getMessage());
		}
		if (listPage.getData().isEmpty()) {
			throw new ServiceNoRoomFoundException(ROOM_LIST_EXCEPTION);
		}
		return listPage;
	}

	@Override
	public ListPage<Room> searchRoomAdmin(ListPage<Room> listPage, Order order)
			throws ServiceNoRoomFoundException {
		try {
			roomDao.roomListSearchAdmin(listPage, order);
		} catch (HibernateException e) {
			LOG.error(LOG_ERROR + e.getMessage());
		}
		if (listPage.getData().isEmpty()) {
			throw new ServiceNoRoomFoundException(ROOM_LIST_EXCEPTION);
		}
		return listPage;
	}

	@Override
	public List<TypeRoom> typeRoomList() throws ServiceException {
		List<TypeRoom> list = null;
		try {
			list = typeRoomDao.getAll();
		} catch (HibernateException | MissingResourceException e) {
			LOG.error(LOG_ERROR + e.getMessage());
		}
		if (list.isEmpty()) {
			throw new ServiceException(TYPE_ROOM_EXCEPTION);
		}
		return list;
	}

}
