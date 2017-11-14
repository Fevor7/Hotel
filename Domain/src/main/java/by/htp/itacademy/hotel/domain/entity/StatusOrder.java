package by.htp.itacademy.hotel.domain.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="status_order")
public class StatusOrder extends Unit{

	private static final long serialVersionUID = -3979309888109513400L;

	public StatusOrder() {
		super();
	}

	public StatusOrder(Long id, String value) {
		super(id, value);
	}
	
}
