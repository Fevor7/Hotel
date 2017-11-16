package by.htp.itacademy.hotel.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import by.htp.itacademy.hotel.domain.entity.*;
import by.htp.itacademy.hotel.domain.vo.ListPage;
import by.htp.itacademy.hotel.service.exception.ServiceNoOrderFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import by.htp.itacademy.hotel.service.OrderService;
import by.htp.itacademy.hotel.service.exception.ServiceException;

import java.util.List;
import java.util.Locale;
import java.util.ResourceBundle;

import  static by.htp.itacademy.hotel.util.Parameter.*;

@RestController
@RequestMapping("order")
public class OrderController {
	
	@Autowired
	private OrderService orderService;
    private static final String COMMAND = "orderListUser";

	@PostMapping
	public ResponseEntity<Order> createOrder(@RequestBody Order order, HttpSession session) {
		ResponseEntity<Order> responseEntity = null;
		try {
			orderService.createOrder(order, (User)session.getAttribute("user") );
			responseEntity =  new ResponseEntity<>(HttpStatus.OK);
		} catch (ServiceException e) {
			responseEntity =  new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
		}
		return responseEntity;
	}

	@GetMapping("user")
    public ResponseEntity<ListPage<Order>> userOrderList(@RequestParam("pagenumber") Integer pageNumber, HttpSession session) {
        ResponseEntity<ListPage<Order>> responseEntity = null;
	    try {
            User user = (User) session.getAttribute(SESSION_PARAMETER_USER);
            System.out.println(pageNumber);
            ListPage<Order> listPage = new ListPage<Order>(pageNumber, AMOUNT_ELEMENTS, COMMAND);
            orderService.orderListUser(listPage, user);
            loadingDundle(listPage.getData(), fetchLanguage(session));
            responseEntity = new ResponseEntity<ListPage<Order>>(listPage, HttpStatus.OK);
        } catch (ServiceNoOrderFoundException e) {
	        e.printStackTrace();
            responseEntity = new ResponseEntity<ListPage<Order>>(HttpStatus.NOT_FOUND);
        }
        return responseEntity;
    }

    private void loadingDundle(List<Order> list, String language) {
        ResourceBundle bundle = ResourceBundle.getBundle(PAGE_CONTENT, new Locale(language));
        for (Order order : list) {
            TypeRoom typeRoomNew = new TypeRoom();
            typeRoomNew.setId(order.getTypeRoom().getId());
            String value = order.getTypeRoom().getValue();
            typeRoomNew.setValue(bundle.getString(value));
            order.setTypeRoom(typeRoomNew);
            StatusOrder statusNew = new StatusOrder();
            statusNew.setId(order.getOrderStatus().getId());
            value = order.getOrderStatus().getValue();
            statusNew.setValue(bundle.getString(value));
            order.setOrderStatus(statusNew);
        }
    }

    String fetchLanguage(HttpSession session) {
        String language = (String) session.getAttribute(REQUEST_ACTION_LANGUAGE);
        if (!LANGLIST.contains(language)) {
            language = LANGUAGE_RU;
        }
        return language;
    }
}
