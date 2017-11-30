<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="r" uri="http://anydoby.com/simpletags"%>
<fmt:setLocale value="${language}"/>
<fmt:bundle basename="pagecontent" prefix="">
	<div class="windowEditOrderAdmin">

		<div><h3><fmt:message key="orderEdit_headAdmin"/> id:<span class="orderIdAdminEdit"></span></h3></div>

		<span class="userIdText"><fmt:message key="orderList_userLogin"/>:</span>
		<span class="userIdEditOrder"></span><br>
		<span>&emsp;&emsp;</span>
		<span class="userIdText"><fmt:message key="orderList_numberRoom"/>:</span>
		<span>&emsp;&emsp;</span>
		<span class="userIdEditOrder roomIdEditOrder"></span>
		<input type="hidden" class="numberIdInsert"/><br>
		<span><fmt:message key="newOrder_checkIn"/></span><br>
		<input type="date" class="dateStart"><br>
		<span><fmt:message key="newOrder_checkOut"/></span>
		<input type="date" class="dateEnd"><br>

		<span><fmt:message key="orderList_personAb"/></span>
		<span>&emsp;&emsp;</span>
		<span><fmt:message key="orderList_bedAb"/></span> <br>
		<select class="person">
			<option>1</option>
			<option>2</option>
			<option>3</option>
			<option>4</option>
			<option>5</option>
		</select>

		<span>&emsp;&emsp;</span>
		<select class="bed">
			<option>1</option>
			<option>2</option>
			<option>3</option>
			<option>4</option>
			<option>5</option>
		</select><br>

		<span><fmt:message key="newOrder_typeRoom"/></span>
		<select class="typeRoom"></select>
		<br>
		<span><fmt:message key="orderList_status"/></span><br>
		<select class="statusOrder"></select>
		<br>
		<input type="hidden" class="roomIdMenu">
		<input type="text" class="userIdEditOrder totalEditOrder"><br>
		<input  type="button" value="<fmt:message key="roomFilter_revert"/>" class="editOrderAdminButton Revert"/><br>
		<input  type="button" value="<fmt:message key="roomFilter_choose"/>" class="editOrderAdminButton chooseRoom"/>
		<span>&emsp;</span>
		<input  type="button" value="<fmt:message key="orderEdit_butSaveAdmin"/>" class="editOrderAdminButton save"/><br>
		<input  type="button" value="<fmt:message key="orderList_list"/>" class="editOrderAdminButton orderlistFilter"/>
		<span>&emsp;</span>
		<input  type="button" value="<fmt:message key="orderEdit_butDeleteAdmin"/>" class="editOrderAdminButton delete"/>
		<input type="hidden" value="<fmt:message key="newOrder_errorData"/>" class="messageErrorData">
		<input type="hidden" value="<fmt:message key="windowMessage_nothingFound"/>" class="messageRoomNotFound">
		<input type="hidden" value="<fmt:message key="newOrder_errorCheckIn"/>" class="errorCheckIn">
		<input type="hidden" value="<fmt:message key="newOrder_errorCheckOut"/>" class="errorCheckOut">
		<input type="hidden" value="<fmt:message key="orderEdit_errorRoomId"/>" class="errorRoomId">
		<input type="hidden" value="<fmt:message key="orderEdit_errorTotal"/>" class="errorTotal">
		
		<br><br><span class="errorOrder"></span>
	</div>
</fmt:bundle>
<div class="insertChooseTypeOrder"></div>