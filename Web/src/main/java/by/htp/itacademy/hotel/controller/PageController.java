package by.htp.itacademy.hotel.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;

import static by.htp.itacademy.hotel.util.Parameter.*;
import static by.htp.itacademy.hotel.util.AddressPage.*;

@Controller
@RequestMapping("page")
public class PageController {

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
}
