<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<jsp:useBean id="now" class="java.util.Date" scope="page" />
<fmt:setLocale value="${language}" scope="session" />

<div class="filterRoom" align="center"></div>
<div class="insertRoomTemp"></div><div class="insertRoomList"></div>