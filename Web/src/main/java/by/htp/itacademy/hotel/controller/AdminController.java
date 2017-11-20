package by.htp.itacademy.hotel.controller;

import by.htp.itacademy.hotel.domain.entity.Order;
import by.htp.itacademy.hotel.domain.entity.Room;
import by.htp.itacademy.hotel.domain.entity.TypeRoom;
import by.htp.itacademy.hotel.domain.entity.User;
import by.htp.itacademy.hotel.domain.vo.ListPage;
import by.htp.itacademy.hotel.service.OrderService;
import by.htp.itacademy.hotel.service.RoomService;
import by.htp.itacademy.hotel.service.exception.ServiceException;
import by.htp.itacademy.hotel.service.exception.ServiceNoRoomFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.math.BigDecimal;
import java.sql.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.ResourceBundle;

import static by.htp.itacademy.hotel.util.Parameter.AMOUNT_ELEMENTS;
import static by.htp.itacademy.hotel.util.Parameter.PAGE_CONTENT;
import static by.htp.itacademy.hotel.util.Parameter.SESSION_PARAMETER_USER;

@RestController
@RequestMapping("admin")
public class AdminController extends AbstractController{

    @Autowired
    private RoomService roomService;
    @Autowired
    private OrderService orderService;

    private static final String COMMAND = "roomsearchadmin";

    @GetMapping("room")
    public ResponseEntity<ListPage<Room>> getRoomListAdmin(
            @RequestParam(value = "orderId", defaultValue = "0") Long id,
            @RequestParam(value = "dateStart", defaultValue = "2017-01-01") Date start,
            @RequestParam(value = "dateEnd", defaultValue = "2017-01-01") Date end,
            @RequestParam(value = "bedNumber", defaultValue = "1") Byte bed,
            @RequestParam(value = "personNumber", defaultValue = "1") Byte person,
            @RequestParam(value = "idTypeRoom", defaultValue = "1") Long idType,
            @RequestParam(value = "pageNumber", defaultValue = "0") Integer page,
            HttpSession session) {
        ResponseEntity<ListPage<Room>> responseEntity = null;
        Order order = new Order(id, start, end, bed, person, idType);
        try {
            ListPage<Room> listPage = new ListPage<Room>(page, AMOUNT_ELEMENTS, COMMAND);
            listPage = roomService.searchRoomAdmin(listPage, order);
            loadingDundle(listPage.getData(), fetchLanguage(session));
            responseEntity = new ResponseEntity<ListPage<Room>>(listPage, HttpStatus.OK);
        } catch (ServiceNoRoomFoundException e) {
            responseEntity = new ResponseEntity<ListPage<Room>>(HttpStatus.NOT_FOUND);
            e.printStackTrace();
        }
        return responseEntity;
    }

    @PutMapping("order")
    public ResponseEntity<Order> updateOrderAdmin(@RequestBody Order order, HttpSession session) {
        ResponseEntity<Order> responseEntity = null;
        User user = (User) session.getAttribute(SESSION_PARAMETER_USER);
        try {
            orderService.updateOrderAdmin(order, user);
            responseEntity = new ResponseEntity<Order>(HttpStatus.OK);
        } catch (ServiceException e) {
            responseEntity = new ResponseEntity<Order>(HttpStatus.BAD_REQUEST);
        }
        return responseEntity;
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
