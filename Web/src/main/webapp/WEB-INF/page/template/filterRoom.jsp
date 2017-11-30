<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<jsp:useBean id="now" class="java.util.Date" scope="page"/>
<fmt:setLocale value="${language}"/>

<fmt:bundle basename="pagecontent">

    <div><h3><fmt:message key="roomFilter_head"/></h3></div>

    <span><fmt:message key="newOrder_checkIn"/></span><br>
    <input type="date" class="dateStart" min="<fmt:formatDate type="time" value="${now}" pattern="yyyy-MM-dd"/>"
           value="<fmt:formatDate type="time" value="${now}" pattern="yyyy-MM-dd"/>"><br>
    <span><fmt:message key="newOrder_checkOut"/></span><br>
    <input type="date" class="dateEnd" min="<fmt:formatDate type="time" value="${now}" pattern="yyyy-MM-dd"/>"
           value="<fmt:formatDate type="time" value="${now}" pattern="yyyy-MM-dd"/>"><br><br>
    <span><fmt:message key="roomList_person"/></span><span>&emsp;&emsp;</span>
    <span><fmt:message key="roomList_bed"/></span><br>
    <select class="person">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
    </select>
    <span>&emsp;&emsp;&emsp;</span>
    <select class="bed">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
    </select><br><br>
    <span><fmt:message key="newOrder_typeRoom"/></span><br>
    <select class="typeRoom">

    </select><br><br>

    <span><fmt:message key="roomList_price"/></span><br>
    <span><fmt:message key="roomFilter_min"/> $</span>
    <input type="text" class="inputMinPrice" value="20"><br>
    <input class="minPrice" name="range" type="range" min="20" max="2000" step="1" value="20"><br>
    <span><fmt:message key="roomFilter_max"/> $</span>
    <input type="text" class="inputMaxPrice" value="2000"><br>
    <input type="range" class="maxPrice" name="range" min="20" max="2000" step="1" value="2000"><br><br>
    <input type="button" value="<fmt:message key="roomFilter_revert"/>" class="sendApplocationButton"/>
    <span>&emsp;</span>
    <input type="button" value="<fmt:message key="roomFilter_apply"/>"
           class="sendApplocationButton applySearchRoom"/><br><br>
    <input type="hidden" value="<fmt:message key="windowMessage_nothingFound"/>" class="messageRoomNotFound">
    <input type="hidden" value="<fmt:message key="incorrectDataError"/>" class="incorrectDataError">
    <input type="hidden" value="<fmt:message key="newOrder_errorCheckIn"/>" class="errorCheckIn">
    <input type="hidden" value="<fmt:message key="newOrder_errorCheckOut"/>" class="errorCheckOut">
    <span class="errorOrder"></span> <span class="errorOrderRoom"></span>
</fmt:bundle>
