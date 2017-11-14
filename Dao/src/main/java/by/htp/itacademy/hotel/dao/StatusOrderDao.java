package by.htp.itacademy.hotel.dao;

import java.util.List;

import by.htp.itacademy.hotel.domain.entity.StatusOrder;

public interface StatusOrderDao extends IDao<StatusOrder>{

	List<StatusOrder> getAll();

}
