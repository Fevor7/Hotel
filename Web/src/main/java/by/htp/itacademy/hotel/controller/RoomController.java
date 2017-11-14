package by.htp.itacademy.hotel.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.ResourceBundle;

import javax.servlet.http.HttpSession;

import by.htp.itacademy.hotel.domain.entity.Room;
import by.htp.itacademy.hotel.domain.vo.ListPage;
import by.htp.itacademy.hotel.service.exception.ServiceNoRoomFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import by.htp.itacademy.hotel.domain.entity.TypeRoom;
import by.htp.itacademy.hotel.service.RoomService;
import by.htp.itacademy.hotel.service.exception.ServiceException;

import static by.htp.itacademy.hotel.util.Parameter.*;

@RestController
@RequestMapping("room")
public class RoomController {
	
	@Autowired
	private RoomService roomService;

	@GetMapping
	private ResponseEntity<ListPage<Room>> getRoomList(@RequestParam("pageNumber") Integer pageNumber, HttpSession session) {
		ResponseEntity<ListPage<Room>> response = null;
		ListPage<Room> listPage = new ListPage<>(pageNumber, AMOUNT_ELEMENTS, ROOM_LIST);
		try {
			roomService.roomList(listPage);
			loadingDundle(listPage.getData(), fetchLanguage(session));
			response = new ResponseEntity<ListPage<Room>>(listPage, HttpStatus.OK);
		} catch (ServiceNoRoomFoundException e) {
			response = new ResponseEntity<ListPage<Room>>(HttpStatus.NO_CONTENT);
		}
		return response;
	}

	@GetMapping("type")
	public ResponseEntity<List<TypeRoom>> getRoomTypeList(HttpSession session) {
		List<TypeRoom> list = null;
		try {
			list = roomService.typeRoomList(null);
			setValueType(list, fetchLanguage(session));
		} catch (ServiceException e) {
			e.printStackTrace();
		}
		return new ResponseEntity<List<TypeRoom>>(list, HttpStatus.OK);
	}

	/**
	 * The method takes the meaning of the language
	 *
	 */
	String fetchLanguage(HttpSession session) {
		String language = (String) session.getAttribute(REQUEST_ACTION_LANGUAGE);
		if (!LANGLIST.contains(language)) {
			language = LANGUAGE_RU;
		}
		return language;
	}

	private void setValueType(List<TypeRoom> list, String language) {
		ResourceBundle bundle = ResourceBundle.getBundle(PAGE_CONTENT, new Locale(language));
		for (TypeRoom type : list) {
			String value = type.getValue();
			type.setValue(bundle.getString(value));
		}
	}

	private void loadingDundle(List<Room> list, String language) {
		ResourceBundle bundle = ResourceBundle.getBundle(PAGE_CONTENT, new Locale(language));
		HashSet<TypeRoom> set = new HashSet<>();
		for (Room room : list) {
			set.add(room.getTypeRoom());
		}
		for (TypeRoom type : set) {
			type.setValue(bundle.getString(type.getValue()));
		}
	}
	
}
