package by.htp.itacademy.hotel.controller;

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
public class OrderController extends AbstractController{
	
	@Autowired
	private OrderService orderService;
    private static final String COMMAND = "orderlistadmin";

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

	@GetMapping
    public ResponseEntity<ListPage<Order>> getOrderList(
            @RequestParam(name = "type", defaultValue = "0") Long id,
            @RequestParam(name = "pagenumber", defaultValue = "0") Integer pageNumber,
            HttpSession session) {
        ResponseEntity<ListPage<Order>> responseEntity = null;
        User user = (User) session.getAttribute(SESSION_PARAMETER_USER);
        ListPage<Order> listPage = new ListPage<>(pageNumber, AMOUNT_ELEMENTS, COMMAND);
        try {
            orderService.orderList(listPage, id, user);
            loadingDundleOrder(listPage.getData(),fetchLanguage(session));
            session.setAttribute(SESSION_PARAMETER_PAGE, REQUEST_ACTION_ORDER_LIST_ADMIN);
            responseEntity = new ResponseEntity<ListPage<Order>>(listPage, HttpStatus.OK);
        } catch (ServiceNoOrderFoundException e) {
            responseEntity = new ResponseEntity<ListPage<Order>>(HttpStatus.NOT_FOUND);
        }
        return responseEntity;
    }

	@GetMapping("user")
    public ResponseEntity<ListPage<Order>> userOrderList(@RequestParam("pagenumber") Integer pageNumber, HttpSession session) {
        ResponseEntity<ListPage<Order>> responseEntity = null;
	    try {
            User user = (User) session.getAttribute(SESSION_PARAMETER_USER);
            ListPage<Order> listPage = new ListPage<>(pageNumber, AMOUNT_ELEMENTS, COMMAND);
            orderService.orderListUser(listPage, user);
            loadingDundleOrder(listPage.getData(), fetchLanguage(session));
            responseEntity = new ResponseEntity<ListPage<Order>>(listPage, HttpStatus.OK);
            session.setAttribute(SESSION_PARAMETER_PAGE, REQUEST_ACTION_PERSONALPAGE);
        } catch (ServiceNoOrderFoundException e) {
	        e.printStackTrace();
            responseEntity = new ResponseEntity<ListPage<Order>>(HttpStatus.NOT_FOUND);
        }
        return responseEntity;
    }

    @PutMapping
    public ResponseEntity<Order> orderUpdate(@RequestBody Order order, HttpSession session) {
        ResponseEntity<Order> responseEntity = null;
        User user = (User) session.getAttribute(SESSION_PARAMETER_USER);
        try {
            orderService.updateOrder(order, user);
            responseEntity = new ResponseEntity<Order>(HttpStatus.OK);
        } catch (ServiceException e) {
            responseEntity = new ResponseEntity<Order>(HttpStatus.LOCKED);
        }
        return responseEntity;
    }

    @DeleteMapping
    public ResponseEntity<Order> deleteOrder(@RequestBody Order order, HttpSession session) {
        ResponseEntity<Order> responseEntity = null;
        try {
            User user = (User) session.getAttribute(SESSION_PARAMETER_USER);
            orderService.orderDelete(order, user);
            responseEntity = new ResponseEntity<Order>(HttpStatus.OK);
        } catch (ServiceException e) {
            responseEntity = new ResponseEntity<Order>(HttpStatus.LOCKED);
        }
        return responseEntity;
    }

    protected void loadingDundleOrder(List<Order> list, String language) {
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

}
