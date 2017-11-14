package by.htp.itacademy.hotel.domain.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="foto_hotel")
public class FotoAddressHotel extends Unit{

	private static final long serialVersionUID = -2577810102457863436L;

	public FotoAddressHotel() {
		super();
	}

	public FotoAddressHotel(Long id, String value) {
		super(id, value);
	}

	
}
