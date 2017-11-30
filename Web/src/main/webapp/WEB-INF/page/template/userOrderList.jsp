<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="r" uri="http://anydoby.com/simpletags"%>
<fmt:setLocale value="${language}" />
<jsp:useBean id="now" class="java.util.Date" scope="page" />

<fmt:bundle basename="pagecontent" prefix="paging.">
	<div class="pagingOrder" >
		<div class="topPaging"></div>
	</div>
</fmt:bundle>

<fmt:bundle basename="pagecontent" prefix="orderList_">
	<div>
		<table class="myTable">
			<thead>
				<tr>
					<td>ID</td>
					<td><fmt:message key="numberRoom"/></td>
					<td><fmt:message key="checkIn"/></td>
					<td><fmt:message key="checkOut"/></td>
					<td><fmt:message key="person"/></td>
					<td><fmt:message key="bed"/></td>
					<td><fmt:message key="typeRoom"/></td>
					<td><fmt:message key="total"/></td>
					<td>-</td>
					<td><fmt:message key="status"/></td>
				</tr>
			</thead>
			<tbody class="tableLine"></tbody>
		</table>
		<br>
	</div>
</fmt:bundle>

<fmt:bundle basename="pagecontent">


	<div class="pagingOrder" >
		<div class="bottomPaging"></div>
	</div>

	<div class="windowEditOrder">
	
		<div><h3><fmt:message key="orderEdit_header"/></h3></div>
		
		<input type="date" class="dateStart" min="<fmt:formatDate type="time" value="${now}" pattern="yyyy-MM-dd"/>" value="<fmt:formatDate type="time" value="${now}" pattern="yyyy-MM-dd"/>">
		<span> - </span>
		<input type="date" class="dateEnd" min="<fmt:formatDate type="time" value="${now}" pattern="yyyy-MM-dd"/>" value="<fmt:formatDate type="time" value="${now}" pattern="yyyy-MM-dd"/>" ><br><br>
		<span><fmt:message key="roomList_person"/> &emsp;&emsp;&emsp;&emsp;&emsp;</span>
		<span><fmt:message key="roomList_bed"/></span> <br>
		
		<select class="person">
			<option>1</option>
			<option>2</option>
			<option>3</option>
			<option>4</option>
			<option>5</option>
		</select>
		<span>&emsp;&emsp;&emsp;&emsp;&emsp; </span>
		
		<select class="bed">
			<option>1</option>
			<option>2</option>
			<option>3</option>
			<option>4</option>
			<option>5</option>
		</select><br><br>
		
		<span><fmt:message key="newOrder_typeRoom"/></span> <br>
		
		<select class="typeRoom"></select><br><br>
		
		<input type="hidden" value="<fmt:message key="windowMessage_incorrectDataError"/>" class="messageErrorData">
		<input type="hidden" value="<fmt:message key="newOrder_errorCheckIn"/>" class="errorCheckIn">
		<input type="hidden" value="<fmt:message key="newOrder_errorCheckOut"/>" class="errorCheckOut">
		<input  type="button" class="sendApplocationButton updateUserOrder" value=<fmt:message key="orderEdit_butSave"/>>
		<span>&emsp;&emsp;</span>
		<input  type="button" class="sendApplocationButton deleteUserOrder" value=<fmt:message key="orderEdit_butDelete"/> /><br><br>
		<span class="closeWindowLogin closeWindowEditOrder">&#10006;</span>
		<span class="errorOrder"></span>
	</div>

<div class="windowPayment"><br>
	<span><fmt:message key="orderEdit_confirmed"/></span><br><br>
	<span class="totalPay"></span><br><br>
	<input type="button" value="<fmt:message key="orderEdit_pay"/>" class="closeMessage closeWindowPayment"/>
	<span class="closeWindowPayment">&#10006;</span>
</div>

</fmt:bundle>