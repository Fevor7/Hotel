<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="r" uri="http://anydoby.com/simpletags"%>
	
<fmt:bundle basename="pagecontent" prefix="roomList.">

			<div class="winEqImg">
				<img class="imageRoom" src="{{fotoAddress}}" alt="test">
			</div>
			<div align="center" class="divInfo">
				<span class="titleRoom">№: </span> 
				<span class="numberInsert">{{number}}</span><br>
				
				<span class="titleRoom">{roomList_type}:</span>
				<span class="typeRoomInsert">{{typeValueRoom}}</span><br>
				<span class="titleRoom">{roomList_size}:</span>
				<span class="sizeInsert">{{size}}</span> <span>м²</span><br>
				<span class="titleRoom">{roomList_person}:</span>
				<span class="personInsert">{{person}}</span><br>
				<span class="titleRoom">{roomList_bed}:</span>
				<span class="bedInsert">{{bed}}</span><br>
				<span class="titleRoom">{roomList_price}:</span>
				<span>$</span>
				<span class="priceInsert">{{price}}</span>
				<span>{roomList_term}</span>
				<button class="selectRoomButton">SELECT</button>
			</div>

</fmt:bundle>