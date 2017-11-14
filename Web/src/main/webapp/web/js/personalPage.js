idOrderVar = '';
numberRoomVar = '';
dateStartVar = '';
dateEndVar = '';
personVar = '';
roomVar = '';
minPriceVar = '';
maxPriceVar = '';
statusVar = '';
totalVar = '';
typeRoomVar = '';
typeRoomValue = '';
relogin = true;

function closeWindowCheck(){
	document.querySelector('.check').style.display = "none";
}

function showPersonalPage(){
	get('?action=personalpage', {}, (error, user) => {
		if (error) {
			logOutUser();
		} else {
			fetchTemplate('personalPage', (error, template) => {
				if (error) {
					alert(error.message)
				} else {
					createWindowInfo(user, template);
					showUserOrderList(0);
				}
			});
		}
	});
}

function logOutUser() {
	logOut();
	document.querySelector('.windowLogIn').style.display = "block";
	loginCallBack = function() {
		showPersonalPage();
	}
}

function createWindowInfo(user, template) {
	var userObject = JSON.parse(user);
	switchMenu(userObject, template);
	document.querySelector('.loginInsert').innerText = userObject.login;
	document.querySelector('.userNameInsert').innerText = userObject.name;
	document.querySelector('.userSurname').innerText = userObject.surname;
	document.querySelector('.userEmailInsert').innerText = userObject.email;
}

function switchMenu(user, template){
	document.querySelector('.insertPage').innerHTML = template;
	nameUser = user.name;
	surnameUser = user.surname;
	var role = user.role;
	var roleLine = document.querySelector('.roleUser').value;
	if (role == "true") {
		roleLine = document.querySelector('.roleAdmin').value;
	}
	document.querySelector('.roleLine').innerHTML = roleLine;
}


function showUserOrderList(pageNumber) {
	get('?action=orderlistuser&', {
		pagenumber: pageNumber
	}, (error, listPage) => {
		if (error) {
			alert(error.message)
		} else {
			fetchTemplate('userOrderList', (error, templateTableOrder) => {
				if (error) {
					alert(error.message)
				} else {
					createTableUserOrder(pageNumber, listPage, templateTableOrder);
				}
			});
		}
	});
}

function createTableUserOrder(pageNumber, listPage, templateTableOrder){
	document.querySelector('.insertOrderList').innerHTML = templateTableOrder;
	get('?action=typeroom&', {
		pagenumber: pageNumber
	}, (error, listTypeRoom) => {
		if (error) {
			alert(error.message)
		} else {
			fetchTemplate('tableLine', (error, templateTableLine) => {
				if (error) {
					alert(error.message)
				} else {
					createTableOrder(pageNumber,listPage, templateTableLine, listTypeRoom);
					fillTypeRoom(listTypeRoom);
				}
			});
		}
	});
}

function createTableOrder(pageNumber,listPage, templateTableLine, listTypeRoom) {
	var listPageObj = JSON.parse(listPage);
	var list = listPageObj.data;
	createPagingOrder('.topPaging',listPageObj, 'orderListUser');
	for(var i = list.length; i>0 ; i--) {
		var tr = document.createElement('tr');
		tr.className = 'trTag';
		tr.innerHTML = templateTableLine;
		if (i==list.length) {
			document.querySelector('.tableLine').appendChild(tr);
		} else {
			var trFirst = document.querySelector('.trTag');
			document.querySelector('.tableLine').insertBefore(tr, trFirst);
		}
		fillData(list[i-1]);
	}
	createPagingOrder('.bottomPaging',listPageObj, 'orderListUser');
}


function fillData(order) {
	document.querySelector('.idOrderTable').innerHTML = order.orderId;
	if(order.room!=null) {
	document.querySelector('.numberRoomOrderTable').innerHTML = order.room.number;
	}
	document.querySelector('.dataStartOrderTable').innerHTML = order.dateStart;
	document.querySelector('.dataEndOrderTable').innerHTML = order.dateEnd;
	document.querySelector('.personOrderTable').innerHTML = order.personNumber;
	document.querySelector('.roomOrderTable').innerHTML = order.bedNumber;
	document.querySelector('.typeRoomTable').innerHTML = order.typeRoom.value;
	document.querySelector('.typeRoomTable').dataset.prop = order.typeRoom.id;
	document.querySelector('.totalAmountTable').innerHTML = order.totalAmount;
	document.querySelector('.statusTable').innerHTML = order.orderStatus.value;
	document.querySelector('.statusTable').dataset.status = order.orderStatus.id;
}

function createPagingOrder(inDiv, listPage, method) {
	var quantity = Math.ceil((listPage.total) / (listPage.maxPerPage));
	if (quantity > 1) {
		var insertDiv = document.querySelector(inDiv);
		var page = document.createElement('div');
        page.style.color = "#002F4C";
		createPageline(page);
		createLink(quantity, listPage, page, method);
		insertDiv.appendChild(page);	
		insertDiv.appendChild(document.createElement('br'));
	}
}

function fillTypeRoom(typeRoomList) {
	var list = JSON.parse(typeRoomList);
	createSelect(list, '.typeRoom');
}

function createSelect(list, type){
	var select = document.querySelector(type);
	for (var i = 0; i<list.length; i++) {
		var option = document.createElement('option');
		option.className = 'firstOptionType';
		option.value = list[i].id;
		option.innerHTML = list[i].value;
		select.appendChild(option);
	}
}

function showEditOrderWindow(event) {
	document.querySelector('.windowEditOrder').style.display = "none";
	document.querySelector('.windowMessage').style.display = "none";
	document.querySelector('.check').style.display = "none";
	var target = $(event.target);
	idOrderVar = target.closest('tr').find('.idOrderTable').text();
	dateStartVar = target.closest('tr').find('.dataStartOrderTable').text();
	dateEndVar = target.closest('tr').find('.dataEndOrderTable').text();
	personVar = target.closest('tr').find('.personOrderTable').text();
	roomVar = target.closest('tr').find('.roomOrderTable').text();
	typeRoomVar = target.closest('tr').find('.typeRoomTable').data('prop');
	typeRoomValue = target.closest('tr').find('.typeRoomTable').text();
	statusVar = target.closest('tr').find('.statusTable').data('status');
	totalVar = target.closest('tr').find('.totalAmountTable').text();
	numberRoomVar = target.closest('tr').find('.numberRoomOrderTable').text();

	document.querySelector('.dateStart').value = dateStartVar;
	document.querySelector('.dateEnd').value = dateEndVar;
	document.querySelector('.bed').value = roomVar;
	document.querySelector('.person').value = personVar;
	document.querySelector('.totalPay').innerHTML = totalVar;
	document.querySelector('.typeRoom').value = typeRoomVar;
	
	switch (statusVar) {
	case 1: {
		document.querySelector('.windowEditOrder').style.display = "block";
		break;
	}
	case 2: {
		document.querySelector('.check').style.display = "block";
		insertDataCheck();
		break;
	}
	case 3: {
		var message = document.querySelector('.orderStatusMess').value;
		document.querySelector('.message').style.weight= "200px";
		document.querySelector('.message').innerHTML = message;
		document.querySelector('.windowMessage').style.display = "block";
		break;
	}
	case 4: {
		var message = document.querySelector('.orderStatusMess').value;
		document.querySelector('.message').innerHTML = message;
		document.querySelector('.windowMessage').style.display = "block";
		break;
	}
	}

}

function insertDataCheck() {
	document.querySelector('.checkNameInsert').innerHTML = nameUser;
	document.querySelector('.checkSurnameInsert').innerHTML = surnameUser;
	document.querySelector('.checkInInsert').innerHTML = dateStartVar;
	document.querySelector('.checkOutInsert').innerHTML = dateEndVar;
	document.querySelector('.numberRoomInsert').innerHTML = numberRoomVar;
	document.querySelector('.typeRoomRoomInsert').innerHTML = typeRoomValue;
	document.querySelector('.totalInsert').innerHTML = totalVar;
	document.querySelector('.idOrderCheckInsert').innerHTML = idOrderVar;
	
}

function deleteUserOrder() {
	var errorMessage = document.querySelector('.orderDeleteError').value;
	var deleteOK = document.querySelector('.deleteOK').value;
	var params = 'action=orderdelete' + '&' + 'id=' + idOrderVar;
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			if (request.responseText == "OK") {
				showPersonalPage();
				document.querySelector('.message').innerHTML = deleteOK;
				document.querySelector('.windowMessage').style.display = "block";
			}
			if (request.responseText == "error") {
				logOut();
				document.querySelector('.windowLogIn').style.display = "block";
				loginCallBack = function() {
					deleteUserOrder();
				}
			}
			if (request.responseText == "errordelete") {
				document.querySelector('.message').innerHTML = errorMessage;
				document.querySelector('.windowConfirmation').style.display = "none";
				document.querySelector('.windowMessage').style.display = "block";
			}
		}
	}
	request.open('POST', 'Servlet');
	request.setRequestHeader(securityHeaderName, securityHeaderValue);
	request.setRequestHeader('Content-Type',
			'application/x-www-form-urlencoded');
	request.send(params);
}

function closeMessageConfirmation() {
	document.querySelector('.windowConfirmation').style.display = "none";
}

function closeWindowEditOrder() {
	document.querySelector('.windowEditOrder').style.display = "none";

}

function updateUserOrder() {
	if (relogin) {
		if(!validateData(document.querySelector('.dateStart').value)) {
			var incorrectName = document.querySelector('.errorCheckIn').value;
			document.querySelector('.errorOrder').innerHTML = incorrectName;
			return;
		} 
		if(!validateData(document.querySelector('.dateEnd').value)) {
			var incorrectName = document.querySelector('.errorCheckOut').value;
			document.querySelector('.errorOrder').innerHTML = incorrectName;
			return;
		}
		dateStartVar = document.querySelector('.dateStart').value;
		dateEndVar = document.querySelector('.dateEnd').value;
		roomVar = document.querySelector('.bed').value;
		personVar = document.querySelector('.person').value;
		typeRoomVar = document.querySelector('.typeRoom').value;
		var date = new Date(dateStartVar);
		var curr_month2 = date.getMonth() + 1;
		dateStartVar = ((String(date.getFullYear()).length == 1) ? "0"
				+ date.getFullYear() : date.getFullYear())
				+ "-"
				+ ((String(curr_month2).length == 1) ? "0" + curr_month2
						: curr_month2)
				+ "-"
				+ ((String((date.getDate())).length == 1) ? "0"
						+ (date.getDate()) : (date.getDate()));
		date = new Date(dateEndVar);
		curr_month2 = date.getMonth() + 1;
		dateEndVar = ((String(date.getFullYear()).length == 1) ? "0"
				+ date.getFullYear() : date.getFullYear())
				+ "-"
				+ ((String(curr_month2).length == 1) ? "0" + curr_month2
						: curr_month2)
				+ "-"
				+ ((String((date.getDate())).length == 1) ? "0"
						+ (date.getDate()) : (date.getDate()));
	}
	var update = document.querySelector('.updateMessage').value;

	var params = 'action=orderupdate' + '&' + 'id=' + idOrderVar + '&'
			+ 'dateStart=' + dateStartVar + '&' + 'dateEnd=' + dateEndVar + '&'
			+ 'bed=' + roomVar + '&' + 'person=' + personVar + '&'
			+ 'idTypeRoom=' + typeRoomVar;
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			if (request.responseText == "OK") {
				relogin = true;
				showPersonalPage();
				document.querySelector('.message').innerHTML = update;
				document.querySelector('.windowMessage').style.display = "block";
			}
			if (request.responseText == "error") {
				relogin = false;
				logOut();
				document.querySelector('.windowLogIn').style.display = "block";
				loginCallBack = function() {
					updateUserOrder();
				}
			}
			if (request.responseText == "errordata") {
				var error = document.querySelector('.messageErrorData').value;
				document.querySelector('.errorOrder').innerHTML = error;
			}

		}
	}
	request.open('POST', 'Servlet');
	request.setRequestHeader(securityHeaderName, securityHeaderValue);
	request.setRequestHeader('Content-Type',
			'application/x-www-form-urlencoded');
	request.send(params);

}

function closeWindowPayment(){
	document.querySelector('.windowPayment').style.display = "none";
}

function roomPayment(){
	var params = 'action=payment' + '&' + 'id=' + idOrderVar;
	var request = new XMLHttpRequest();
	var paymantOK =  document.querySelector('.paymentOK').value;
	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			if (request.responseText == "OK") {
				showPersonalPage();
				document.querySelector('.message').innerHTML = paymantOK;
				document.querySelector('.windowMessage').style.display = "block";
			}
			if (request.responseText == "error") {
				logOut();
				document.querySelector('.windowLogIn').style.display = "block";
				loginCallBack = function() {
					roomPayment();
				}
			}
		}
	}
	request.open('POST', 'Servlet');
	request.setRequestHeader(securityHeaderName, securityHeaderValue);
	request.setRequestHeader('Content-Type',
			'application/x-www-form-urlencoded');
	request.send(params);
}

function printCheck() {
	window.print();
}