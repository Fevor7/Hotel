package by.htp.itacademy.hotel.controller;

import javax.servlet.http.HttpSession;

import by.htp.itacademy.hotel.domain.entity.Unit;
import com.google.gson.Gson;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import by.htp.itacademy.hotel.domain.entity.User;

import static by.htp.itacademy.hotel.util.Parameter.*;

@RestController
@RequestMapping("/")
public class MainController {

	@GetMapping
	public ModelAndView header(HttpSession session) {
		settingLanguage(session);
		return new ModelAndView(REQUEST_ACTION_HOMEPAGE);
	}
	
	@GetMapping("template/{name}")
	public ModelAndView template(@PathVariable("name") String name) {
		return new ModelAndView("template/"+name);
	}
	
	@GetMapping("session/user")
	public ResponseEntity<User> getUserSession(HttpSession session) {
		User user = (User)session.getAttribute("user");
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}
	
	@GetMapping("session/page")
	public ResponseEntity<Unit> getPageSession(HttpSession session) {
		String page = (String)session.getAttribute(SESSION_PARAMETER_PAGE);
        return new ResponseEntity<Unit>(new Unit(page), HttpStatus.OK);
	}
	
	/**
	 * The method checks the record of the current language of the page.
	 * 
	 * @param session
	 * @return
	 */
	private void settingLanguage(HttpSession session) {
		Object languageValue = session.getAttribute(REQUEST_ACTION_LANGUAGE);
		if (languageValue == null) {
			session.setAttribute(REQUEST_ACTION_LANGUAGE, REQUEST_ACTION_LANGUAGE_RU);
		}
	}
}
