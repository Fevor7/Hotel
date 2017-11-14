package by.htp.itacademy.hotel.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import by.htp.itacademy.hotel.domain.entity.User;
import by.htp.itacademy.hotel.service.UserService;
import by.htp.itacademy.hotel.service.exception.ServiceNoSuchUserException;

import static by.htp.itacademy.hotel.util.Parameter.*;

@RestController
@RequestMapping("")
public class UserController {

	@Autowired
	private UserService userService;
	
	@PostMapping("user/login")
	public ResponseEntity<User> login(@RequestBody User user, HttpSession session) {
		ResponseEntity<User> response = null;
		try {
			User newUser = userService.logIn(user);
			newUser.setHashCodePass(null);
			session.setAttribute(SESSION_PARAMETER_USER, newUser);
			response = new ResponseEntity<>(newUser, HttpStatus.OK);
		} catch (ServiceNoSuchUserException e) {
			response = new ResponseEntity<>(HttpStatus.LOCKED);
			e.printStackTrace();
		}
		return response;
	}
}
