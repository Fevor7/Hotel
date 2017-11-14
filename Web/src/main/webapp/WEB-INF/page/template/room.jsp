<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="r" uri="http://anydoby.com/simpletags"%>
	
<fmt:bundle basename="pagecontent" prefix="roomList.">
			
			<div class="winEqImg">
				<img class="imageRoom" alt="test">
			</div>
			<div align="center" class="divInfo">
				<span class="titleRoom">№: </span> 
				<span class="numberInsert"></span><br>
				
				<span class="titleRoom"><fmt:message key="type"/>:</span> 
				<span class="typeRoomInsert"></span><br>
				<span class="titleRoom"><fmt:message key="size"/>:</span> 
				<span class="sizeInsert"></span> <span>м²</span><br>
				<span class="titleRoom"><fmt:message key="person"/>:</span> 
				<span class="personInsert"></span><br>
				<span class="titleRoom"><fmt:message key="bed"/>:</span> 
				<span class="bedInsert" ></span><br>
				<span class="titleRoom"><fmt:message key="price"/>:</span> 
				<span>$</span>
				<span class="priceInsert">$ <fmt:message key="term"/></span>
				<span><fmt:message key="term"/></span>
				<button class="selectRoomButton">SELECT</button>
			</div>
</fmt:bundle>