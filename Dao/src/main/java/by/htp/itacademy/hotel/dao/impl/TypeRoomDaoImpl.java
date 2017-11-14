package by.htp.itacademy.hotel.dao.impl;

import java.util.List;

import org.hibernate.HibernateException;
import org.springframework.stereotype.Repository;

import by.htp.itacademy.hotel.dao.TypeRoomDao;
import by.htp.itacademy.hotel.domain.entity.TypeRoom;
@Repository
public class TypeRoomDaoImpl extends DaoImpl<TypeRoom> implements TypeRoomDao {

	public TypeRoomDaoImpl() {
		super(TypeRoom.class);
		
	}

	@Override
	public List<TypeRoom> getAll() throws HibernateException {
		return  getEm().createQuery("SELECT t FROM TypeRoom t order by t.id asc", TypeRoom.class).getResultList();
	}


}
