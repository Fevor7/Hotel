package by.htp.itacademy.hotel.controller;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.*;

import javax.servlet.http.HttpSession;

import by.htp.itacademy.hotel.domain.entity.Order;
import by.htp.itacademy.hotel.domain.entity.Room;
import by.htp.itacademy.hotel.domain.entity.StatusOrder;
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
public class RoomController extends  AbstractController{

    @Autowired
    private RoomService roomService;

    @GetMapping("page/{number}")
    private ResponseEntity<ListPage<Room>> getRoomList(@PathVariable("number") Integer pageNumber, HttpSession session) {
        ResponseEntity<ListPage<Room>> response = null;
        ListPage<Room> listPage = new ListPage<>(pageNumber, AMOUNT_ELEMENTS, ROOM_LIST);
        try {
            roomService.roomList(listPage);
            loadingDundleRoom(listPage.getData(), fetchLanguage(session));
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
            list = roomService.typeRoomList();
            setValueType(list, fetchLanguage(session));
        } catch (ServiceException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<List<TypeRoom>>(list, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<ListPage<Room>> roomSearch(
            @RequestParam(value = "dateStart", defaultValue = "2017-01-01") Date start,
            @RequestParam(value = "dateEnd", defaultValue = "2017-01-01") Date end,
            @RequestParam(value = "bedNumber", defaultValue = "1") Byte bed,
            @RequestParam(value = "personNumber", defaultValue = "1") Byte person,
            @RequestParam(value = "minPrice", defaultValue = "0") BigDecimal min,
            @RequestParam(value = "maxPrice", defaultValue = "0") BigDecimal max,
            @RequestParam(value = "idTypeRoom", defaultValue = "1") Long idType,
            @RequestParam(value = "pageNumber", defaultValue = "0") Integer page,
            HttpSession session) {
        ResponseEntity<ListPage<Room>> response = null;
        try {
            Order order = new Order(start, end, bed, person, min, max, idType);
            ListPage<Room> listPage = new ListPage<>(page, AMOUNT_ELEMENTS, REQUEST_ACTION_ROOM_SEARCH);
            roomService.searchRoom(listPage, order);
            loadingDundleRoom(listPage.getData(), fetchLanguage(session));
            response = new ResponseEntity<ListPage<Room>>(listPage, HttpStatus.OK);
        } catch (ServiceNoRoomFoundException | IllegalArgumentException e) {
            response = new ResponseEntity<ListPage<Room>>(HttpStatus.NO_CONTENT);
        }
        return response;
    }

    private void setValueType(List<TypeRoom> list, String language) {
        ResourceBundle bundle = ResourceBundle.getBundle(PAGE_CONTENT, new Locale(language));
        for (TypeRoom type : list) {
            String value = type.getValue();
            type.setValue(bundle.getString(value));
        }
    }

    private void loadingDundleRoom(List<Room> list, String language) {
        ResourceBundle bundle = ResourceBundle.getBundle(PAGE_CONTENT, new Locale(language));
        Set<TypeRoom> set = new HashSet<>();
        for (Room room : list) {
            set.add(room.getTypeRoom());
        }
        for (TypeRoom type : set) {
            type.setValue(bundle.getString(type.getValue()));
        }
    }



}
