package by.htp.itacademy.hotel.dao.impl;


import org.springframework.stereotype.Repository;

import by.htp.itacademy.hotel.dao.HotelDao;
import by.htp.itacademy.hotel.domain.entity.Hotel;

/**
 * In the object of this class, reads the table with the parameters of the hotel
 * from the database.
 * 
 * @author Viktor
 *
 */
@Repository
public class HotelDaoImpl extends DaoImpl<Hotel> implements HotelDao {

	public HotelDaoImpl() {
		super(Hotel.class);
	}

	public Hotel get2(Long id) {
		return getEm().find(Hotel.class, id);
	}

}
