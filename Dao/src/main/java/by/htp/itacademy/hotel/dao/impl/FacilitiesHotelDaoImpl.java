package by.htp.itacademy.hotel.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import by.htp.itacademy.hotel.dao.FacilitiesHotelDao;
import by.htp.itacademy.hotel.dao.exception.DaoException;
import by.htp.itacademy.hotel.domain.entity.FacilitiesHotel;

/**
 * In the object of this class, a table of the facilities in the hotel from the
 * database is read.
 * 
 * @author Viktor
 *
 */
@Repository
public class FacilitiesHotelDaoImpl extends DaoImpl<FacilitiesHotel> implements FacilitiesHotelDao {

	public FacilitiesHotelDaoImpl() {
		super(FacilitiesHotel.class);
	}

	@Override
	public List<FacilitiesHotel> getAll() throws DaoException {
		
		return null;
	}

}
