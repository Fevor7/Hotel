<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="r" uri="http://anydoby.com/simpletags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<fmt:setLocale value="${language}"/>
<fmt:bundle basename="pagecontent">
	<div>
		<span class="colon"><fmt:message key="orderList_status"/>: </span>
		<select class="orderListChoose">
			<option class="firstOptionType" value="5"><fmt:message key="orderList_all"/></option>
		</select>
	</div>
	<div class="insertOrderList"></div>
</fmt:bundle>