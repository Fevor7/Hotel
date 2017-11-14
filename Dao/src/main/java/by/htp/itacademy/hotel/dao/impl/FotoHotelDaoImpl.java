package by.htp.itacademy.hotel.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import by.htp.itacademy.hotel.dao.FotoHotelDao;

import by.htp.itacademy.hotel.dao.exception.DaoException;
import by.htp.itacademy.hotel.domain.entity.FotoAddressHotel;

/**
 * In the object of this class, reads the table with the names of photos of the
 * hotel from the database.
 * 
 * @author viktor
 *
 */
@Repository
public class FotoHotelDaoImpl extends DaoImpl<FotoAddressHotel> implements FotoHotelDao {

	public FotoHotelDaoImpl() {
		super(FotoAddressHotel.class);
	}

	@Override
	public List<FotoAddressHotel> getAll() throws DaoException {
		return null;
	}

}
