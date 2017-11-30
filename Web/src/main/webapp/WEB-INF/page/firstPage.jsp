<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<fmt:setLocale value="${language}" scope="session"/>
<jsp:useBean id="now" class="java.util.Date" scope="page"/>

<input type="hidden" value="${user.name}" class="nameUser"/>
<input type="hidden" value="${user.role}" class="roleUser"/>

<div class="insertWindowNewOrder"></div>

<div class="banner" align="center">
    <div id="slider-wrap">
        <div id="slider">
            <div class="slide"><img src="web/images/hotel/foto1.jpeg" width="714" height="469"></div>
            <div class="slide"><img src="web/images/hotel/foto2.jpeg" width="714" height="469"></div>
            <div class="slide"><img src="web/images/hotel/foto3.jpeg" width="714" height="469"></div>
        </div>
    </div>
</div>