<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="r" uri="http://anydoby.com/simpletags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<fmt:setLocale value="${language}"/>
<fmt:bundle basename="pagecontent">
	<div>
		<span style="color: white"><fmt:message key="orderList.status"/>: </span>
		<select style="font-size: 15px;" class="orderListChoose">
			<option class="firstOptionType" value="5"><fmt:message key="orderList.all"/></option>
		</select>
	</div>
	<div class="insertOrderList" align="center"></div>
</fmt:bundle>