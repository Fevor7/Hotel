<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<fmt:setLocale value="${language}" />

<fmt:bundle basename="pagecontent">
	<div class="personalPage">
		<div align="center"><h3><fmt:message key="personalPage_head"/></h3></div>
		<div class="personalInfo" >
			<div class="signUpPart1 textPersonInfo">
				<span><fmt:message key="signUp_login"/>:</span> <br> 
				<span><fmt:message key="signUp_name"/>:</span><br> 
				<span><fmt:message key="signUp_surname"/>:</span><br> 
				<span><fmt:message key="signUp_email"/>:</span><br> 
				<span><fmt:message key="personalPage_access"/>:</span><br>
			</div>
			<div class="signUpPart2">
				<span class="loginInsert"></span> <br> 
				<span class="userNameInsert"></span> <br> 
				<span class="userSurname"></span> <br> 
				<span class="userEmailInsert"></span> <br> 
				<span class="roleLine"></span><br> 
				<input type="hidden" value="<fmt:message key="personalPage_noOrderFound"/>" class="noOrderFound" /> 
				<input type="hidden" value="<fmt:message key="personalPage_administrator"/>" class="roleAdmin" /> 
				<input type="hidden" value="<fmt:message key="personalPage_user"/>" class="roleUser"/> 
			</div>
		</div>
		<div align="center" class="orderListText"><hr>
			<h4><span><fmt:message key="personalPage_order"/></span></h4>
		</div>
		<div class="insertOrderList" align="center"></div>
	</div>
</fmt:bundle>



