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

async function showOrderListPage(pageNumber, type) {
	idStatusOrderVar = type;
	try {
		var listPage = await get2('order?', {
			type: type,
			pagenumber: pageNumber
		});
		var templateList = await fetchTemplate3('orderList');
        getNode('.insertOrderList').innerHTML = templateList;
		createTableOrderAdmin(listPage, type, pageNumber);
	} catch (error) {
        var errorOrder = getNode('.oderNotFound').value;
        getNode('.insertOrderList').style.color = 'white';
        getNode('.insertOrderList').innerHTML = '<br>'
            + errorOrder;
	}

}

async function createTableOrderAdmin(listPage, type, pageNumber) {
	try {
		var templateLine = await fetchTemplate3('tableLineAdmin');
        fillDataTable(listPage, templateLine, type, pageNumber);
	} catch (error) {
		console.log(error);
	}
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
			getNode('.tableLine').appendChild(tr);
		} else {
			var trFirst = getNode('.trTag');
			getNode('.tableLine').insertBefore(tr, trFirst);
		}
		fillDataAdmin(list[i-1]);
	}
	createPagingOrderAdmin('.bottomPaging',listPageObj, 'orderList', type);
}

function createPagingOrderAdmin(inDiv,listPage, method, type) {
	var quantity = Math.ceil((listPage.total) / (listPage.maxPerPage));
	if (quantity > 1) {
		var insertDiv = getNode(inDiv);
		var page = document.createElement('div');
		createPageline(page);
		createLink(quantity, listPage, page, method, type);
		insertDiv.appendChild(page);	
		insertDiv.appendChild(document.createElement('br'));
	}
}

function fillDataAdmin(order) {
	getNode('.idOrderTable').innerHTML = order.orderId;
	if(order.room!=null) {
		getNode('.roomIdOrderTable').dataset.room = order.room.id;
		getNode('.roomIdOrderTable').innerHTML = order.room.number;
	}
	getNode('.userIdOrderTable').innerHTML = order.user.login;
	getNode('.dataStartOrderTable').innerHTML = editDate(order.dateStart);
	getNode('.dataEndOrderTable').innerHTML = editDate(order.dateStart);
	getNode('.personOrderTable').innerHTML = order.personNumber;
	getNode('.roomOrderTable').innerHTML = order.bedNumber;
	getNode('.typeRoomTable').innerHTML = order.typeRoom.value;
	getNode('.typeRoomTable').dataset.type = order.typeRoom.id;
	if (order.totalAmount!=undefined) {
        getNode('.totalAmountTable').innerHTML = order.totalAmount;
	}
	getNode('.statusTable').innerHTML = order.orderStatus.value;
	getNode('.statusTable').dataset.status = order.orderStatus.id;
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
	
	getNode('.roomIdMenu').value = idRoomAdmin;
	getNode('.roomIdEditOrder').innerHTML = idRoomVarAdmin;
	getNode('.orderIdAdminEdit').innerText = idOrderVarAdmin;
	getNode('.userIdEditOrder').innerHTML = idUserVarAdmin;
	getNode('.dateStart').value = dateStartVarAdmin;
	getNode('.dateEnd').value = dateEndVarAdmin;
	getNode('.bed').value = roomVarAdmin;
	getNode('.person').value = personVarAdmin;
	getNode('.typeRoom').value = typeRoomAdmin;
	getNode('.statusOrder').value = statusAdmin;
	getNode('.totalEditOrder').value = totalAmountAdmin;
	getNode('.editOrderAdminButton').style.display = "inline-block";
	getNode('.save').style.display = "inline-block";
	getNode('.delete').style.display = "inline-block";
	getNode('.chooseRoom').style.display = "inline-block";
	getNode('.orderlistFilter').style.display = "inline-block";
	getNode('.Revert').style.display = "inline-block";
	getNode('.numberIdInsert').value = idRoomAdmin;
}

async function updateUserOrderAdmin() {
	totalAmountAdmin = getNode('.totalEditOrder').value; 
	getNode('.errorOrder').innerHTML = "";
	if (reloginAdmin) {
		if(!validateData(getNode('.dateStart').value)) {
			var incorrectName = getNode('.errorCheckIn').value;
			getNode('.errorOrder').innerHTML = incorrectName;
			return;
		} 
		if(!validateData(getNode('.dateEnd').value)) {
			var incorrectName = getNode('.errorCheckOut').value;
			getNode('.errorOrder').innerHTML = incorrectName;
			return;
		} 
		
		if(!validateNumber(getNode('.totalEditOrder').value)) {
			var incorrectRoom = getNode('.errorTotal').value;
			getNode('.errorOrder').innerHTML = incorrectRoom;
			return;
		}
		dateStartVarAdmin = getNode('.dateStart').value;
		dateEndVarAdmin = getNode('.dateEnd').value;
		roomVarAdmin = getNode('.bed').value;
		personVarAdmin = getNode('.person').value;
		idRoomVarAdmin = getNode('.roomIdEditOrder').value;
		idRoomAdmin = getNode('.numberIdInsert').value;
		typeRoomAdmin = getNode('.typeRoom').value;
		statusAdmin = getNode('.statusOrder').value;
	}
	var Order = {
        orderId: idOrderVarAdmin,
        dateStart: dateStartVarAdmin,
        dateEnd: dateEndVarAdmin,
        bedNumber: roomVarAdmin,
        personNumber: personVarAdmin,
        totalAmount: totalAmountAdmin
	}

    var TypeRoom = {
		id: typeRoomAdmin
	}

	var Room = {
		id:  idRoomAdmin
	}

	var StatusOrder = {
		id: statusAdmin
	}

	Order.typeRoom = TypeRoom;
	Order.orderStatus = StatusOrder;
	if (idRoomAdmin!='undefined') {
		Order.room = Room;
	}

	try {
		await put("admin/order","",  JSON.stringify(Order) );
        reloginAdmin = true;
        var update = getNode('.updateMessage').value;
		getNode('.message').innerHTML = update;
		getNode('.windowMessage').style.display = "block";
        showOrderListAdmin('5');
	} catch (error) {
		console.log(error);
        	reloginAdmin = false;
			logOut();
			getNode('.windowLogIn').style.display = "block";
			loginCallBack = function() {
			updateUserOrderAdmin();
		}
	}
}

async function deleteUserOrderAdmin() {
    var errorMessage = getNode('.orderDeleteError').value;
    var deleteOK = getNode('.deleteOK').value;
    var ObjectOrder = {
        orderId: idOrderVarAdmin
    }
    try {
        await deleteAJAX('order', "" , JSON.stringify(ObjectOrder));
        showOrderListAdmin('5');
		getNode('.message').innerHTML = deleteOK;
		getNode('.windowMessage').style.display = "block";
    } catch (error) {
        logOut();
		getNode('.windowLogIn').style.display = "block";
		loginCallBack = function() {
			deleteUserOrderAdmin();
		}
    }

}

function revertValueFilterOrderAdmin() {
	getNode('.errorOrder').innerHTML = "";
	getNode('.roomIdEditOrder').value = idRoomVarAdmin;
	getNode('.orderIdAdminEdit').innerText = idOrderVarAdmin;
	getNode('.userIdEditOrder').value = idUserVarAdmin;
	getNode('.dateStart').value = dateStartVarAdmin;
	getNode('.dateEnd').value = dateEndVarAdmin;
	getNode('.bed').value = roomVarAdmin;
	getNode('.person').value = personVarAdmin;
	getNode('.typeRoom').value = typeRoomAdmin;
	getNode('.statusOrder').value = statusAdmin;

}

async function searchForRoomAdmin(pageNumber) {
	var order = validationRoomAdmin(pageNumber);
	try {
        var listPage = await get2('admin/room?', order);
        var template = await fetchTemplate3('room');
        createTableAdmin(listPage, template, 'roomsearchadmin');
	} catch (error) {
		console.log(error);
	}

}

function createTableAdmin(response, templateRoom, method) {
	var listPage = JSON.parse(response);
	var insertDiv = getNode('.insertChooseTypeOrder');
	$('.insertChooseTypeOrder').empty();
	createPagingRoomAdmin(listPage, method);
	var list = listPage.data;
	for (i = 0; i<list.length; i++) {
		var newTemplate = templateRoom;
		var windowRoom = document.createElement('div');
		windowRoom.className = "windowRoomAdmin";
		windowRoom.innerHTML = templateRoom;
		var insertRoom = getNode('.insertChooseTypeOrder');
		insertRoom.appendChild(windowRoom);
		var winEqImg = getNode('.imageRoom');
		winEqImg.src = list[i].fotoAddress;
		winEqImg.className = "roomImage";
		var numberInsert = getNode('.numberInsert');
		numberInsert.innerText = list[i].number;
		numberInsert.className = 'number';
		var typeRoomInsert = getNode('.typeRoomInsert');
		typeRoomInsert.innerText = list[i].typeRoom.value;
		typeRoomInsert.className = 'number';
		var sizeInsert = getNode('.sizeInsert');
		sizeInsert.innerText = list[i].size;
		sizeInsert.className = 'number';
		var personInsert = getNode('.personInsert');
		personInsert.innerText = list[i].person;
		personInsert.className = 'number';
		var bedInsert = getNode('.bedInsert');
		bedInsert.innerText = list[i].bed;
		bedInsert.className = 'number';
		var priceInsert = getNode('.priceInsert');
		priceInsert.innerText = list[i].price;
		priceInsert.className = 'number';
		var butt = getNode('.selectRoomButton');
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
		var insertDiv = getNode('.insertChooseTypeOrder');
		var page = document.createElement('div');
		createPageline(page);
		createLink(quantity, listPage, page, method);
		insertDiv.appendChild(page);
	}
}

function validationRoomAdmin(pageNumber) {
	getNode('.errorOrder').innerHTML = "";
	if(!validateData(getNode('.dateStart').value)) {
		var incorrectName = getNode('.errorCheckIn').value;
		getNode('.errorOrder').innerHTML = incorrectName;
		return;
	} 
	if(!validateData(getNode('.dateEnd').value)) {
		var incorrectName = getNode('.errorCheckOut').value;
		getNode('.errorOrder').innerHTML = incorrectName;
		return;
	}
	dateStartVarAdminSend = getNode('.dateStart').value;
	dateEndVarAdminSend = getNode('.dateEnd').value;
	roomVarAdminSend = getNode('.bed').value;
	personVarAdminSend = getNode('.person').value;
	typeRoomAdminSend = getNode('.typeRoom').value;
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
	var update = getNode('.updateMessage').value;

	var Order = {
		orderId: idOrderVarAdmin,
		dateStart: dateStartVarAdminSend,
		dateEnd: dateEndVarAdminSend,
		bedNumber: roomVarAdminSend,
		personNumber: personVarAdminSend,
		pageNumber: pageNumber,
        idTypeRoom: typeRoomAdminSend
	}

	return Order;
}

function validateData(data) {
	return (/[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])/.test(data)); 
}

function validateNumber(number) {
	return (/[0-9]/.test(number)); 
}

function selectRoom(number, id) {
	getNode('.roomIdEditOrder').innerHTML = number;
	getNode('.numberIdInsert').value = id;
}

async function showOrderListAdmin(type) {
	try {
        var listTypeAndStatus = await get2('page/order');
        var templateMenu = await fetchTemplate3('orderMenu');
        var list = JSON.parse(listTypeAndStatus);
        var listType = list.typeList;
        var listStatus = list.statusList;
        createMenu(listType ,listStatus, templateMenu);
        showPageChooseTypeOrder(listStatus, type);
	} catch (error) {
		console.log(error);
	}


}

function createMenu(listType ,listStatus, templateMenu) {
	getNode('.insertPage').innerHTML = templateMenu;
	createSelect(listType, '.typeRoom');
	createSelect(listStatus, '.statusOrder');
}

async function showPageChooseTypeOrder(listStatus, type) {
	try {
        var templateChoose = await fetchTemplate3('orderChoose');
		getNode('.insertChooseTypeOrder').innerHTML = templateChoose;
		createSelect(listStatus, '.orderListChoose');
		showOrderListPage(0, type);
	} catch (error) {
		console.log(error);
	}

}

function editDate(editDate) {
    var date = new Date(editDate);
    var curr_month2 = date.getMonth() + 1;
    return ((String(date.getFullYear()).length == 1) ? "0"
        + date.getFullYear() : date.getFullYear())
        + "-"
        + ((String(curr_month2).length == 1) ? "0" + curr_month2
            : curr_month2)
        + "-"
        + ((String((date.getDate())).length == 1) ? "0"
            + (date.getDate()) : (date.getDate()));

}