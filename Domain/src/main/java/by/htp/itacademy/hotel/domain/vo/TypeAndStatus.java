package by.htp.itacademy.hotel.domain.vo;

import java.util.List;

import by.htp.itacademy.hotel.domain.entity.StatusOrder;
import by.htp.itacademy.hotel.domain.entity.TypeRoom;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TypeAndStatus {

	private List<TypeRoom> typeList;
	private List<StatusOrder> statusList;
	
}
