package by.htp.itacademy.hotel.controller;

import javax.servlet.http.HttpSession;

import by.htp.itacademy.hotel.exception.CommandInvalidParameterException;
import by.htp.itacademy.hotel.service.exception.ServiceException;
import by.htp.itacademy.hotel.validator.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import by.htp.itacademy.hotel.domain.entity.User;
import by.htp.itacademy.hotel.service.UserService;
import by.htp.itacademy.hotel.service.exception.ServiceNoSuchUserException;

import static by.htp.itacademy.hotel.util.Parameter.*;

@RestController
@RequestMapping("user")
public class UserController {

	@Autowired
	private UserService userService;
	
	@PostMapping("login")
	public ResponseEntity<User> login(@RequestBody User user, HttpSession session) {
		ResponseEntity<User> response = null;
		try {
            System.out.println(user);
            User newUser = userService.logIn(user);
			newUser.setHashCodePass(null);
			session.setAttribute(SESSION_PARAMETER_USER, newUser);
			response = new ResponseEntity<>(newUser, HttpStatus.OK);
		} catch (ServiceNoSuchUserException e) {
			response = new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		return response;
	}

	@PostMapping
    public ResponseEntity SignUp(@RequestBody User user, HttpSession session){
	    ResponseEntity<User> responseEntity = null;
        try {
            userValidation(user);
            userService.signUp(user);
            responseEntity = new ResponseEntity(user, HttpStatus.OK);
        } catch (CommandInvalidParameterException e) {
            responseEntity = new ResponseEntity(HttpStatus.BAD_REQUEST);
        } catch (ServiceException e) {
            responseEntity = new ResponseEntity(HttpStatus.CONFLICT);
        }
        return responseEntity;
    }

    @PutMapping("logOut")
    public void logOut(HttpSession session) {
        session.setAttribute(SESSION_PARAMETER_USER, null);
    }

    /**
     * Validation of User fields.
     *
     * @param user
     * @throws CommandInvalidParameterException
     */
    private void userValidation(User user) throws CommandInvalidParameterException {
        Validator.nameValidation(user.getName());
        Validator.nameValidation(user.getSurname());
        Validator.emailValidation(user.getEmail());
        Validator.passwordValidation(user.getPassword());
    }
}
