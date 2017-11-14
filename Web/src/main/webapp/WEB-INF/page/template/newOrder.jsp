<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<jsp:useBean id="now" class="java.util.Date" scope="page" />

<fmt:bundle basename="pagecontent" prefix="newOrder.">
	<div class="clientOrder" align="center"><br>
	
		<div><h3><fmt:message key="header"/></h3></div>
		
		<span><fmt:message key="checkIn"/></span><br> 
		<input type="date" class="dateStart" min="<fmt:formatDate type="time" value="${now}" pattern="yyyy-MM-dd"/>" value="<fmt:formatDate type="time" value="${now}" pattern="yyyy-MM-dd"/>" OnClick="dateStartClick()" onblur="dateStartClick()"><br><br> 	
		<span><fmt:message key="checkOut"/></span><br> 
		<input type="date" class="dateEnd" min="<fmt:formatDate type="time" value="${now}" pattern="yyyy-MM-dd"/>" value="<fmt:formatDate type="time" value="${now}" pattern="yyyy-MM-dd"/>" OnClick="dateEndClick()" onblur="dateEndClick()"><br><br>
		<span><fmt:message key="person"/></span><br>
		
		<select class="person">
			<option><fmt:message key="select"/></option>
			<option>1</option>
			<option>2</option>
			<option>3</option>
			<option>4</option>
			<option>5</option>
		</select><br><br> 
		
		<span><fmt:message key="bed"/></span><br> 
		<select class="bed">
			<option class="firstOption"><fmt:message key="select"/></option>
			<option>1</option>
			<option>2</option>
			<option>3</option>
			<option>4</option>
			<option>5</option>
		</select><br><br> 
		
		<span><fmt:message key="typeRoom"/></span><br> 
		<select class="typeRoom">
		</select><br><br><br> 
		
		<input type="button" value="<fmt:message key="sendButton"/>" class="sendApplocationButton" OnClick="sendNewOrder()" />
		<br><br> 
		<input type="hidden" value="<fmt:message key="orderOk"/>" class="orderOk"> 
		<input type="hidden" value="<fmt:message key="errorBed"/>" class="messageErrorBed">
		<input type="hidden" value="<fmt:message key="errorData"/>" class="messageErrorData">
		<input type="hidden" value="<fmt:message key="errorPerson"/>" class="messageErrorPerson"> 
		<input type="hidden" value="<fmt:message key="errorCheckIn"/>" class="errorCheckIn"> 
		<input type="hidden" value="<fmt:message key="errorCheckOut"/>" class="errorCheckOut"> 
		<span class="errorOrder"></span>
	</div>
</fmt:bundle>