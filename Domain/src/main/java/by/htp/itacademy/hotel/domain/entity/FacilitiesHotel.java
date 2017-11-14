package by.htp.itacademy.hotel.domain.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="facilities_hotel")
public class FacilitiesHotel extends Unit{

	private static final long serialVersionUID = -4141087228228408650L;
	
	public FacilitiesHotel() {
		super();
	}

	public FacilitiesHotel(Long id, String value) {
		super(id, value);
	}
	
	
}
