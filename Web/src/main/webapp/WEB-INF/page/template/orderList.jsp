<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="r" uri="http://anydoby.com/simpletags"%>
<jsp:useBean id="now" class="java.util.Date" scope="page" />
	
	<div align="center" class="paging" >
	<br>
		<div class="topPaging"></div>
	</div>

<fmt:bundle basename="pagecontent" prefix="orderList.">	
	<div class="orderList" align="center">
		<table class="myTable">
			<thead>
				<tr>
					<td>ID</td>
						<td><fmt:message key="numberRoom"/></td>
						<td><fmt:message key="userLogin"/></td>
						<td><fmt:message key="checkIn"/></td>
						<td><fmt:message key="checkOut"/></td>
						<td><fmt:message key="person"/></td>
						<td><fmt:message key="bed"/></td>
						<td><fmt:message key="typeRoom"/></td>
						<td><fmt:message key="total"/></td>
						<td>----</td>
						<td><fmt:message key="status"/></td>	
				</tr>
			</thead>
				<tbody class="tableLine"></tbody>
		</table><br>
	</div>
</fmt:bundle>

	<div align="center" class="paging" >
		<div class="bottomPaging"></div>
	</div>