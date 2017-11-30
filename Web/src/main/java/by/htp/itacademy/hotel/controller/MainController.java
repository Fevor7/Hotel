package by.htp.itacademy.hotel.controller;

import javax.servlet.http.HttpSession;

import by.htp.itacademy.hotel.domain.entity.*;
import by.htp.itacademy.hotel.domain.vo.ListPage;
import by.htp.itacademy.hotel.service.HotelService;
import by.htp.itacademy.hotel.service.RoomService;
import by.htp.itacademy.hotel.service.exception.ServiceException;
import by.htp.itacademy.hotel.service.exception.ServiceNoRoomFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.*;

import static by.htp.itacademy.hotel.util.Parameter.*;

@RestController
@RequestMapping("/")
public class MainController extends  AbstractController{

    @Autowired
    private HotelService hotelService;

    @GetMapping
    public ModelAndView header(HttpSession session) {
        settingLanguage(session);
        return new ModelAndView(REQUEST_ACTION_HOMEPAGE);
    }

    @GetMapping("template/{name}")
    public ModelAndView template(@PathVariable("name") String name) {
        return new ModelAndView("template/" + name);
    }

    @GetMapping("session/user")
    public ResponseEntity<User> getUserSession(HttpSession session) {
        User user = (User) session.getAttribute("user");
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @GetMapping("session/page")
    public ResponseEntity<Unit> getPageSession(HttpSession session) {
        String page = (String) session.getAttribute(SESSION_PARAMETER_PAGE);
        return new ResponseEntity<Unit>(new Unit(page), HttpStatus.OK);
    }

    @GetMapping("about")
    public ResponseEntity<Hotel> getAboutpage(HttpSession session) {
        String language = fetchLanguage(session);
        ResponseEntity<Hotel> responseEntity = null;
        try {
            Hotel hotel = hotelService.hotelInfo();
            loadingDundleHotel(hotel, language);
            responseEntity = new ResponseEntity<Hotel>(hotel, HttpStatus.OK);
            session.setAttribute(SESSION_PARAMETER_PAGE, REQUEST_ACTION_ABOUT_PAGE);
        } catch (ServiceException e) {
            responseEntity = new ResponseEntity<Hotel>(HttpStatus.NO_CONTENT);
            e.printStackTrace();
        }
        return responseEntity;
    }

    @PutMapping("language/{value}")
    public void switchLanguage(@PathVariable("value") String value, HttpSession session) {
        session.setAttribute(REQUEST_ACTION_LANGUAGE, value);
    }

    @GetMapping("bundle")
    public ResponseEntity<Map<String, String>> getBundle() {
        Locale currentLocale = new Locale("ru");
        ResourceBundle bundle = ResourceBundle.getBundle(PAGE_CONTENT, currentLocale);
        Map<String, String> map = fetchMapWithBundle(bundle);
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    private void settingLanguage(HttpSession session) {
        Object languageValue = session.getAttribute(REQUEST_ACTION_LANGUAGE);
        if (languageValue == null) {
            session.setAttribute(REQUEST_ACTION_LANGUAGE, REQUEST_ACTION_LANGUAGE_RU);
        }
    }

    private void loadingDundleHotel(Hotel hotel, String language) {
        Locale currentLocale = new Locale(language);
        ResourceBundle bundle = ResourceBundle.getBundle(PAGE_CONTENT, currentLocale);
        String name = hotel.getName();
        hotel.setName(bundle.getString(name));
        String address = hotel.getAddress();
        hotel.setAddress(bundle.getString(address));
        String about = hotel.getAbout();
        hotel.setAbout(bundle.getString(about));
        setFacilities(hotel.getFacilities(), language);
    }

    private void setFacilities(List<FacilitiesHotel> listFacilities, String language) {
        Locale currentLocale = new Locale(language);
        ResourceBundle bundle = ResourceBundle.getBundle(PAGE_CONTENT, currentLocale);
        for (FacilitiesHotel facilitiesHotel : listFacilities) {
            String value = facilitiesHotel.getValue();
            facilitiesHotel.setValue(bundle.getString(value));
        }
    }

    private Map<String, String> fetchMapWithBundle(ResourceBundle bundle) {
        Map<String, String> map = new HashMap<>();
        Enumeration<String> keys = bundle.getKeys();
        while (keys.hasMoreElements()) {
            String key = keys.nextElement();
            map.put(key, bundle.getString(key));
        }
        return map;
    }


}
