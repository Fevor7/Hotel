securityHeaderName = "SecurityHeader";
securityHeaderValue = "javathebest";
idUserVarAdmin = '';
idOrderVarAdmin = '';
idRoomVarAdmin = '';
idRoomAdmin = '';
dateStartVarAdmin = '';
dateEndVarAdmin = '';
personVarAdmin = '';
roomVarAdmin = '';
typeRoomAdmin = '';
statusAdmin = '';
totalAmountAdmin = '';
reloginAdmin = true;
orderStatus = '';

function showOrderListPage(pageNumber, type) {
	idStatusOrderVar = type;
	var action = '?action=orderlist&';
	if (type == '5') {
		action = '?action=allorderlist&';
	}
	get(action, {
		type: type,
		pagenumber: pageNumber
	}, (error, listPage) => {
		if (error) {
			logOutUser();
		} else {
			fetchTemplate('orderList', (error, templateList) => {
				if (error) {
					alert(error.message)
				} else {
					document.querySelector('.insertOrderList').innerHTML = templateList;
					createTableOrderAdmin(listPage, type, pageNumber);
				}
			});
		}
	});
}

function createTableOrderAdmin(listPage, type, pageNumber) {
	fetchTemplate('tableLineAdmin', (error, templateLine) => {
		if (error) {
			alert(error.message)
		} else {
			fillDataTable(listPage, templateLine, type, pageNumber);
		}
	});
}

function fillDataTable(listPage, templateLine, type, pageNumber) {
	var listPageObj = JSON.parse(listPage);
	var list = listPageObj.data;
	createPagingOrderAdmin('.topPaging', listPageObj, 'orderList', type);
	for(var i = list.length; i>0 ; i--) {
		var tr = document.createElement('tr');
		tr.className = 'trTag';
		tr.innerHTML = templateLine;
		if (i==list.length) {
			document.querySelector('.tableLine').appendChild(tr);
		} else {
			var trFirst = document.querySelector('.trTag');
			document.querySelector('.tableLine').insertBefore(tr, trFirst);
		}
		fillDataAdmin(list[i-1]);
	}
	createPagingOrderAdmin('.bottomPaging',listPageObj, 'orderList', type);
}

function createPagingOrderAdmin(inDiv,listPage, method, type) {
	var quantity = Math.ceil((listPage.total) / (listPage.maxPerPage));
	if (quantity > 1) {
		var insertDiv = document.querySelector(inDiv);
		var page = document.createElement('div');
		createPageline(page);
		createLink(quantity, listPage, page, method, type);
		insertDiv.appendChild(page);	
		insertDiv.appendChild(document.createElement('br'));
	}
}

function fillDataAdmin(order) {
	document.querySelector('.idOrderTable').innerHTML = order.orderId;
	if(order.room!=null) {
		document.querySelector('.roomIdOrderTable').dataset.room = order.room.id;
		document.querySelector('.roomIdOrderTable').innerHTML = order.room.number;
	}
	document.querySelector('.userIdOrderTable').innerHTML = order.user.login;
	document.querySelector('.dataStartOrderTable').innerHTML = order.dateStart;
	document.querySelector('.dataEndOrderTable').innerHTML = order.dateEnd;
	document.querySelector('.personOrderTable').innerHTML = order.personNumber;
	document.querySelector('.roomOrderTable').innerHTML = order.bedNumber;
	document.querySelector('.typeRoomTable').innerHTML = order.typeRoom.value;
	document.querySelector('.typeRoomTable').dataset.type = order.typeRoom.id;
	document.querySelector('.totalAmountTable').innerHTML = order.totalAmount;
	document.querySelector('.statusTable').innerHTML = order.orderStatus.value;
	document.querySelector('.statusTable').dataset.status = order.orderStatus.id;
}

function showAdminEditOrder(event) {
	var target = $(event.target);
	idUserVarAdmin = target.closest('tr').find('.userIdOrderTable').text();
	idOrderVarAdmin = target.closest('tr').find('.idOrderTable').text();
	idRoomVarAdmin = target.closest('tr').find('.roomIdOrderTable').text();
	idRoomAdmin = target.closest('tr').find('.roomIdOrderTable').data('room');
	dateStartVarAdmin = target.closest('tr').find('.dataStartOrderTable')
			.text();
	dateEndVarAdmin = target.closest('tr').find('.dataEndOrderTable').text();
	personVarAdmin = target.closest('tr').find('.personOrderTable').text();
	roomVarAdmin = target.closest('tr').find('.roomOrderTable').text();
	typeRoomAdmin = target.closest('tr').find('.typeRoomTable').data('type');
	statusAdmin = target.closest('tr').find('.statusTable').data('status');
	totalAmountAdmin = target.closest('tr').find('.totalAmountTable').text();
	totalAmountAdmin = totalAmountAdmin.substr(2, 4);
	if (totalAmountAdmin == '') {
		totalAmountAdmin = 0;
	}
	
	document.querySelector('.roomIdMenu').value = idRoomAdmin;
	document.querySelector('.roomIdEditOrder').innerHTML = idRoomVarAdmin;
	document.querySelector('.orderIdAdminEdit').innerText = idOrderVarAdmin;
	document.querySelector('.userIdEditOrder').innerHTML = idUserVarAdmin;
	document.querySelector('.dateStart').value = dateStartVarAdmin;
	document.querySelector('.dateEnd').value = dateEndVarAdmin;
	document.querySelector('.bed').value = roomVarAdmin;
	document.querySelector('.person').value = personVarAdmin;
	document.querySelector('.typeRoom').value = typeRoomAdmin;
	document.querySelector('.statusOrder').value = statusAdmin;
	document.querySelector('.totalEditOrder').value = totalAmountAdmin;
	document.querySelector('.editOrderAdminButton').style.display = "inline-block";
	document.querySelector('.save').style.display = "inline-block";
	document.querySelector('.delete').style.display = "inline-block";
	document.querySelector('.chooseRoom').style.display = "inline-block";
	document.querySelector('.orderlistFilter').style.display = "inline-block";
	document.querySelector('.Revert').style.display = "inline-block";
	document.querySelector('.numberIdInsert').value = idRoomAdmin;
}

function updateUserOrderAdmin() {
	totalAmountAdmin = document.querySelector('.totalEditOrder').value; 
	document.querySelector('.errorOrder').innerHTML = "";
	if (reloginAdmin) {
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
		
		if(!validateNumber(document.querySelector('.totalEditOrder').value)) {
			var incorrectRoom = document.querySelector('.errorTotal').value;
			document.querySelector('.errorOrder').innerHTML = incorrectRoom;
			return;
		}
		dateStartVarAdmin = document.querySelector('.dateStart').value;
		dateEndVarAdmin = document.querySelector('.dateEnd').value;
		roomVarAdmin = document.querySelector('.bed').value;
		personVarAdmin = document.querySelector('.person').value;
		idRoomVarAdmin = document.querySelector('.roomIdEditOrder').value;
		idRoomAdmin = document.querySelector('.numberIdInsert').value;
		typeRoomAdmin = document.querySelector('.typeRoom').value;
		statusAdmin = document.querySelector('.statusOrder').value;
		var date = new Date(dateStartVarAdmin);
		var curr_month2 = date.getMonth() + 1;
		dateStartVarAdmin = ((String(date.getFullYear()).length == 1) ? "0"
				+ date.getFullYear() : date.getFullYear())
				+ "-"
				+ ((String(curr_month2).length == 1) ? "0" + curr_month2
						: curr_month2)
				+ "-"
				+ ((String((date.getDate())).length == 1) ? "0"
						+ (date.getDate()) : (date.getDate()));
		date = new Date(dateEndVarAdmin);
		curr_month2 = date.getMonth() + 1;
		dateEndVarAdmin = ((String(date.getFullYear()).length == 1) ? "0"
				+ date.getFullYear() : date.getFullYear())
				+ "-"
				+ ((String(curr_month2).length == 1) ? "0" + curr_month2
						: curr_month2)
				+ "-"
				+ ((String((date.getDate())).length == 1) ? "0"
						+ (date.getDate()) : (date.getDate()));
	}
	var update = document.querySelector('.updateMessage').value;

	var params = 'action=orderupdateadmin' + '&' + 'id=' + idOrderVarAdmin
			+ '&' + 'dateStart=' + dateStartVarAdmin + '&' + 'dateEnd='
			+ dateEndVarAdmin + '&' + 'bed=' + roomVarAdmin + '&' + 'person='
			+ personVarAdmin + '&' + 'idTypeRoom=' + typeRoomAdmin + '&'
			+ 'roomId=' + idRoomAdmin + '&' + 'status=' + statusAdmin + '&'
			+ 'totalAmount=' + totalAmountAdmin;
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			if (request.responseText == "OK") {
				reloginAdmin = true;
				showOrderListAdmin(idStatusOrderVar);
				document.querySelector('.message').innerHTML = update;
				document.querySelector('.windowMessage').style.display = "block";
			}
			if (request.responseText == "error") {
				reloginAdmin = false;
				logOut();
				document.querySelector('.windowLogIn').style.display = "block";
				loginCallBack = function() {
					updateUserOrderAdmin();
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

function deleteUserOrderAdmin() {
	var errorMessage = document.querySelector('.orderDeleteError').value;
	var deleteOK = document.querySelector('.deleteOK').value;
	var params = 'action=orderdelete' + '&' + 'id=' + idOrderVarAdmin;
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			if (request.responseText == "OK") {
				showOrderListAdmin(idStatusOrderVar);
				document.querySelector('.message').innerHTML = deleteOK;
				document.querySelector('.windowMessage').style.display = "block";
			}
			if (request.responseText == "error") {
				logOut();
				document.querySelector('.windowLogIn').style.display = "block";
				loginCallBack = function() {
					deleteUserOrderAdmin();
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

function revertValueFilterOrderAdmin() {
	document.querySelector('.errorOrder').innerHTML = "";
	document.querySelector('.roomIdEditOrder').value = idRoomVarAdmin;
	document.querySelector('.orderIdAdminEdit').innerText = idOrderVarAdmin;
	document.querySelector('.userIdEditOrder').value = idUserVarAdmin;
	document.querySelector('.dateStart').value = dateStartVarAdmin;
	document.querySelector('.dateEnd').value = dateEndVarAdmin;
	document.querySelector('.bed').value = roomVarAdmin;
	document.querySelector('.person').value = personVarAdmin;
	document.querySelector('.typeRoom').value = typeRoomAdmin;
	document.querySelector('.statusOrder').value = statusAdmin;

}

function searchForRoomAdmin(pageNumber) {
	var order = validationRoomAdmin(pageNumber);
	var OrderJSON = encodeURIComponent(JSON.stringify(order));
	get('?action=roomsearchadmin&', {
		order: OrderJSON
	}, (error, listPage) => {
		if (error) {
			logOutUser();
		} else {
			fetchTemplate('room', (error, template) => {
				if (error) {
					alert(error.message)
				} else {
					createTableAdmin(listPage, template, 'roomsearchadmin');
				}
			});
		}
	});
}

function createTableAdmin(response, templateRoom, method) {
	var listPage = JSON.parse(response);
	var insertDiv = document.querySelector('.insertChooseTypeOrder');
	$('.insertChooseTypeOrder').empty();
	createPagingRoomAdmin(listPage, method);
	var list = listPage.data;
	for (i = 0; i<list.length; i++) {
		var newTemplate = templateRoom;
		var windowRoom = document.createElement('div');
		windowRoom.className = "windowRoomAdmin";
		windowRoom.innerHTML = templateRoom;
		var insertRoom = document.querySelector('.insertChooseTypeOrder');
		insertRoom.appendChild(windowRoom);
		var winEqImg = document.querySelector('.imageRoom');
		winEqImg.src = list[i].fotoAddress;
		winEqImg.className = "roomImage";
		var numberInsert = document.querySelector('.numberInsert');
		numberInsert.innerText = list[i].number;
		numberInsert.className = 'number';
		var typeRoomInsert = document.querySelector('.typeRoomInsert');
		typeRoomInsert.innerText = list[i].typeRoom.value;
		typeRoomInsert.className = 'number';
		var sizeInsert = document.querySelector('.sizeInsert');
		sizeInsert.innerText = list[i].size;
		sizeInsert.className = 'number';
		var personInsert = document.querySelector('.personInsert');
		personInsert.innerText = list[i].person;
		personInsert.className = 'number';
		var bedInsert = document.querySelector('.bedInsert');
		bedInsert.innerText = list[i].bed;
		bedInsert.className = 'number';
		var priceInsert = document.querySelector('.priceInsert');
		priceInsert.innerText = list[i].price;
		priceInsert.className = 'number';
		var butt = document.querySelector('.selectRoomButton');
		butt.onclick = function(i) {
			return function() {
				selectRoom(list[i].number, list[i].id);
			}
		}(i);
		butt.className = 'selectRoomButtonLast';
	}
	createPagingRoomAdmin(listPage, method);
	
}

function createPagingRoomAdmin(listPage, method) {
	var quantity = Math.ceil((listPage.total) / (listPage.maxPerPage));
	if (quantity > 1) {
		var insertDiv = document.querySelector('.insertChooseTypeOrder');
		var page = document.createElement('div');
		createPageline(page);
		createLink(quantity, listPage, page, method);
		insertDiv.appendChild(page);
	}
}

function validationRoomAdmin(pageNumber) {
	document.querySelector('.errorOrder').innerHTML = "";
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
	dateStartVarAdminSend = document.querySelector('.dateStart').value;
	dateEndVarAdminSend = document.querySelector('.dateEnd').value;
	roomVarAdminSend = document.querySelector('.bed').value;
	personVarAdminSend = document.querySelector('.person').value;
	typeRoomAdminSend = document.querySelector('.typeRoom').value;
	var date = new Date(dateStartVarAdmin);
	var curr_month2 = date.getMonth() + 1;
	dateStartVarAdminSend = ((String(date.getFullYear()).length == 1) ? "0"
			+ date.getFullYear() : date.getFullYear())
			+ "-"
			+ ((String(curr_month2).length == 1) ? "0" + curr_month2
					: curr_month2)
			+ "-"
			+ ((String((date.getDate())).length == 1) ? "0"
					+ (date.getDate()) : (date.getDate()));
	date = new Date(dateEndVarAdmin);
	curr_month2 = date.getMonth() + 1;
	dateEndVarAdminSend = ((String(date.getFullYear()).length == 1) ? "0"
			+ date.getFullYear() : date.getFullYear())
			+ "-"
			+ ((String(curr_month2).length == 1) ? "0" + curr_month2
					: curr_month2)
			+ "-"
			+ ((String((date.getDate())).length == 1) ? "0"
					+ (date.getDate()) : (date.getDate()));
	var update = document.querySelector('.updateMessage').value;

	var Order = {
		orderId: idOrderVarAdmin,
		dateStart: dateStartVarAdminSend,
		dateEnd: dateEndVarAdminSend,
		bedNumber: roomVarAdminSend,
		personNumber: personVarAdminSend,
		pageNumber: pageNumber
	}

	var TypeRoom = {
			id: typeRoomAdminSend
	}
	
	Order.typeRoom = TypeRoom;
	return Order;
}

function validateData(data) {
	return (/[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])/.test(data)); 
}

function validateNumber(number) {
	return (/[0-9]/.test(number)); 
}

function selectRoom(number, id) {
	document.querySelector('.roomIdEditOrder').innerHTML = number;
	document.querySelector('.numberIdInsert').value = id;
}

function showOrderListAdmin(type) {
	get('?action=orderlistadmin', {}, (error, listTypeAndStatus) => {
		if (error) {
			logOutUser();
		} else {
			fetchTemplate('orderMenu', (error, templateMenu) => {
				if (error) {
					alert(error.message)
				} else {
					var list = JSON.parse(listTypeAndStatus);
					var listType = list.typeList;
					var listStatus = list.statusList;
					createMenu(listType ,listStatus, templateMenu);
					showPageChooseTypeOrder(listStatus, type);
				}
			});
		}
	});
}

function createMenu(listType ,listStatus, templateMenu) {
	document.querySelector('.insertPage').innerHTML = templateMenu;
	createSelect(listType, '.typeRoom');
	createSelect(listStatus, '.statusOrder');
}

function showPageChooseTypeOrder(listStatus, type) {
	fetchTemplate('orderChoose', (error, templateChoose) => {
		if (error) {
			alert(error.message)
		} else {
			document.querySelector('.insertChooseTypeOrder').innerHTML = templateChoose;
			createSelect(listStatus, '.orderListChoose');
			showOrderListPage(0, type);
		}
	});
}
