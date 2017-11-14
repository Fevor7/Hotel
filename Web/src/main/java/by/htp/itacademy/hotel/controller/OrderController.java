package by.htp.itacademy.hotel.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import by.htp.itacademy.hotel.domain.entity.Order;
import by.htp.itacademy.hotel.domain.entity.User;
import by.htp.itacademy.hotel.service.OrderService;
import by.htp.itacademy.hotel.service.exception.ServiceException;

@RestController
@RequestMapping("order")
public class OrderController {
	
	@Autowired
	private OrderService orderService;
	
	@PostMapping
	public ResponseEntity<Order> createOrder(@RequestBody Order order, HttpSession session) {
		ResponseEntity<Order> responseEntity = null;
		try {
			orderService.createOrder(order, (User)session.getAttribute("user") );
			responseEntity =  new ResponseEntity<>(HttpStatus.OK);
		} catch (ServiceException e) {
			responseEntity =  new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
			e.printStackTrace();
		}
		return responseEntity;
	}
}
