package by.htp.itacademy.hotel.service.impl;

import java.util.List;
import java.util.Locale;
import java.util.MissingResourceException;
import java.util.ResourceBundle;


import org.apache.log4j.Logger;
import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import by.htp.itacademy.hotel.dao.HotelDao;
import by.htp.itacademy.hotel.domain.entity.FacilitiesHotel;
import by.htp.itacademy.hotel.domain.entity.Hotel;
import by.htp.itacademy.hotel.service.HotelService;
import by.htp.itacademy.hotel.service.exception.ServiceException;

/**
 * The object of this class forms the object of the hotel with a full
 * description.
 * 
 * @author viktor
 *
 */
@Service
@Transactional
public class HotelServiceImpl implements HotelService {

	private static final Logger LOG = Logger.getLogger(HotelServiceImpl.class);
	private static final String LOG_ERROR = " ERROR: ";
	private static final String PAGE_CONTENT = "pagecontent";
	@Autowired
	private HotelDao hotelDao;

	@Override
	public Hotel hotelInfo(String language) throws ServiceException {
		Hotel hotel = null;
		try {
			hotel = hotelDao.get(1L);
			List<FacilitiesHotel> listFacilities = hotel.getFacilities();
			setFacilities(hotel, listFacilities, language);
			loadingDundle(hotel, language);
		} catch (HibernateException | MissingResourceException e) {
			LOG.error(LOG_ERROR + e.getMessage());
			throw new ServiceException(e.getMessage());
		}
		return hotel;
	}

	private void loadingDundle(Hotel hotel, String language) {
		Locale currentLocale = new Locale(language);
		ResourceBundle bundle = ResourceBundle.getBundle(PAGE_CONTENT, currentLocale);
		String name = hotel.getName();
		hotel.setName(bundle.getString(name));
		String address = hotel.getAddress();
		hotel.setAddress(bundle.getString(address));
		String about = hotel.getAbout();
		hotel.setAbout(bundle.getString(about));
	}

	private void setFacilities(Hotel hotel, List<FacilitiesHotel> listFacilities, String language) {
		Locale currentLocale = new Locale(language);
		ResourceBundle bundle = ResourceBundle.getBundle(PAGE_CONTENT, currentLocale);
		for (FacilitiesHotel facilitiesHotel : listFacilities) {
			String value = facilitiesHotel.getValue();
			facilitiesHotel.setValue(bundle.getString(value));
		}
	}

}
