package by.htp.itacademy.hotel.controller;

import by.htp.itacademy.hotel.domain.entity.StatusOrder;
import by.htp.itacademy.hotel.domain.entity.TypeRoom;
import by.htp.itacademy.hotel.domain.vo.TypeAndStatus;
import by.htp.itacademy.hotel.service.OrderService;
import by.htp.itacademy.hotel.service.RoomService;
import by.htp.itacademy.hotel.service.exception.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;

import java.util.List;
import java.util.Locale;
import java.util.ResourceBundle;

import static by.htp.itacademy.hotel.util.Parameter.*;
import static by.htp.itacademy.hotel.util.AddressPage.*;

@RestController
@RequestMapping("page")
public class PageController extends AbstractController{

    @Autowired
    private RoomService roomService;
    @Autowired
    private OrderService orderService;

    @GetMapping("first")
    public ModelAndView getFirstPage(HttpSession session){
        session.setAttribute(SESSION_PARAMETER_PAGE, REQUEST_FIRSTPAGE);
        return new ModelAndView(REQUEST_FIRSTPAGE);
    }

    @GetMapping("room")
    public ModelAndView getRoomPage(HttpSession session){
        session.setAttribute(SESSION_PARAMETER_PAGE, REQUEST_ACTION_ROOM_PAGE);
        return new ModelAndView(PAGE_ROOM);
    }

    @GetMapping("order")
    public ResponseEntity<TypeAndStatus> geTypeAndPage(HttpSession session){
        ResponseEntity<TypeAndStatus> responseEntity = null;
        String language = fetchLanguage(session);
        try {
            List<TypeRoom> listType = roomService.typeRoomList();
            List<StatusOrder> listStatus = orderService.fetchStatusList();
            setValue(listStatus, listType, language);
            TypeAndStatus typeAndStatus = new TypeAndStatus(listType,listStatus);
            responseEntity = new ResponseEntity<TypeAndStatus>(typeAndStatus, HttpStatus.OK);
        } catch (ServiceException e) {
           responseEntity = new ResponseEntity<TypeAndStatus>(HttpStatus.NOT_FOUND);
        }
        return responseEntity;
    }

    private void setValue(List<StatusOrder> list, List<TypeRoom> listType, String language) {
        Locale currentLocale = new Locale(language);
        ResourceBundle bundle = ResourceBundle.getBundle(PAGE_CONTENT, currentLocale);
        for (int i = 0; i < list.size(); i++) {
            String value = list.get(i).getValue();
            list.get(i).setValue(bundle.getString(value));
        }
        for (TypeRoom type : listType) {
            String value = type.getValue();
            type.setValue(bundle.getString(value));
        }
    }

}
