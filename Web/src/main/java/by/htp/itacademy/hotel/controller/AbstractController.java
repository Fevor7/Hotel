package by.htp.itacademy.hotel.controller;

import by.htp.itacademy.hotel.domain.entity.Order;
import by.htp.itacademy.hotel.domain.entity.StatusOrder;
import by.htp.itacademy.hotel.domain.entity.TypeRoom;

import javax.servlet.http.HttpSession;

import java.util.List;
import java.util.Locale;
import java.util.ResourceBundle;

import static by.htp.itacademy.hotel.util.Parameter.*;

public abstract class AbstractController {

    protected String fetchLanguage(HttpSession session) {
        String language = (String) session.getAttribute(REQUEST_ACTION_LANGUAGE);
        if (!LANGLIST.contains(language)) {
            language = LANGUAGE_RU;
        }
        return language;
    }


}
