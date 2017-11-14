package by.htp.itacademy.hotel.dao;

import by.htp.itacademy.hotel.domain.entity.Hotel;

public interface HotelDao extends IDao<Hotel> {

	Hotel get2(Long id);

	
}
