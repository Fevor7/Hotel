<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="r" uri="http://anydoby.com/simpletags"%>
<jsp:useBean id="now" class="java.util.Date" scope="page" />
<fmt:setLocale value="${language}"/>
<fmt:bundle basename="pagecontent" prefix="orderList.">
	<td class="idOrderTable"></td>
	<td class="numberRoomOrderTable"></td>
	<td class="dataStartOrderTable"></td>
	<td class="dataEndOrderTable"></td>
	<td class="personOrderTable"></td>
	<td class="roomOrderTable"></td>
	<td class="typeRoomTable" ></td>
	<td class="totalAmountTable"></td>
	<td><input type="button" value="edit" class="editOrderButton" OnClick="showEditOrderWindow(event)"/></td>
	<td class="statusTable" ></td>
</fmt:bundle>	