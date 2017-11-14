package by.htp.itacademy.hotel.domain.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "type_room")
public class TypeRoom extends Unit{

	private static final long serialVersionUID = -3597250003310523664L;

	public TypeRoom() {
		super();
	}

	public TypeRoom(Long id, String value) {
		super(id, value);
	}

}
