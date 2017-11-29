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
	getNode('.check').style.display = "none";
}

async function showPersonalPage(){
    try {
        var user = await get('session/user');
        var template = await fetchTemplate('personalPage');
        var userObject = JSON.parse(user);
        trueUser(userObject.name, userObject.role);
        createWindowInfo(user, template);
        showUserOrderList(0);
    } catch (error) {
        console.log(error);
    }
}

function logOutUser() {
	logOut();
	getNode('.windowLogIn').style.display = "block";
	loginCallBack = function() {
		showPersonalPage();
	}
}

function createWindowInfo(user, template) {
	var userObject = JSON.parse(user);
	switchMenu(user, template);
	getNode('.loginInsert').innerText = userObject.login;
	getNode('.userNameInsert').innerText = userObject.name;
	getNode('.userSurname').innerText = userObject.surname;
	getNode('.userEmailInsert').innerText = userObject.email;
}

function switchMenu(user, template){
	getNode('.insertPage').innerHTML = template;
	nameUser = user.name;
	surnameUser = user.surname;
	var role = user.role;
	var roleLine = getNode('.roleUser').value;
	if (role == "true") {
		roleLine = getNode('.roleAdmin').value;
	}
	getNode('.roleLine').innerHTML = roleLine;
}


async function showUserOrderList(pageNumber) {
    try {
        var listPage = await get('order/user?', {
            pagenumber: pageNumber
        });
        var templateTableOrder = await  fetchTemplate('userOrderList');
        createTableUserOrder(pageNumber, listPage, templateTableOrder);
        addListenerPersonalPage();
    } catch (error) {
        console.log(error);
    }

}

function addListenerPersonalPage() {
	getNode('.dateStart').addEventListener('click', dateStartClick);
    getNode('.dateStart').addEventListener('blur', dateStartClick);
    getNode('.dateEnd').addEventListener('click', dateEndClick);
    getNode('.dateEnd').addEventListener('blur', dateEndClick);
    getNode('.updateUserOrder').addEventListener('click', updateUserOrder);
    getNode('.deleteUserOrder').addEventListener('click', deleteUserOrder);
    getNode('.closeWindowEditOrder').addEventListener('click', closeWindowEditOrder);
    getNode('.closeMessagePayment').addEventListener('click', roomPayment);
    getNode('.closeWindowPayment').addEventListener('click', closeWindowPayment);
}

async function createTableUserOrder(pageNumber, listPage, templateTableOrder){
    try {
        getNode('.insertOrderList').innerHTML = templateTableOrder;
        var listTypeRoom = await get('room/type');
        var templateTableLine = await fetchTemplate('tableLine');
        createTableOrder(pageNumber,listPage, templateTableLine, listTypeRoom);
        fillTypeRoom(listTypeRoom);
    } catch (error) {
        console.log(error);
    }
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
			getNode('.tableLine').appendChild(tr);
		} else {
			var trFirst = getNode('.trTag');
			getNode('.tableLine').insertBefore(tr, trFirst);
		}
		fillData(list[i-1]);
	}
	createPagingOrder('.bottomPaging',listPageObj, 'orderListUser');
}


function fillData(order) {
	getNode('.idOrderTable').innerHTML = order.orderId;
	if(order.room!=null) {
	getNode('.numberRoomOrderTable').innerHTML = order.room.number;
	}
	getNode('.dataStartOrderTable').innerHTML = editDate(order.dateStart);
	getNode('.dataEndOrderTable').innerHTML = editDate(order.dateEnd);
	getNode('.personOrderTable').innerHTML = order.personNumber;
	getNode('.roomOrderTable').innerHTML = order.bedNumber;
	getNode('.typeRoomTable').innerHTML = order.typeRoom.value;
	getNode('.typeRoomTable').dataset.prop = order.typeRoom.id;
	if (order.totalAmount!=undefined) {
        getNode('.totalAmountTable').innerHTML = order.totalAmount;
	}
	getNode('.statusTable').innerHTML = order.orderStatus.value;
	getNode('.statusTable').dataset.status = order.orderStatus.id;
    getNode('.editOrderButton').addEventListener('click', ()=> showEditOrderWindow(event));
}

function createPagingOrder(inDiv, listPage, method) {
	var quantity = Math.ceil((listPage.total) / (listPage.maxPerPage));
	if (quantity > 1) {
		var insertDiv = getNode(inDiv);
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
	var select = getNode(type);
	for (var i = 0; i<list.length; i++) {
		var option = document.createElement('option');
		option.className = 'firstOptionType';
		option.value = list[i].id;
		option.innerHTML = list[i].value;
		select.appendChild(option);
	}
}

function showEditOrderWindow(event) {
	getNode('.windowEditOrder').style.display = "none";
	getNode('.windowMessage').style.display = "none";
	getNode('.check').style.display = "none";
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

	getNode('.dateStart').value = dateStartVar;
	getNode('.dateEnd').value = dateEndVar;
	getNode('.bed').value = roomVar;
	getNode('.person').value = personVar;
	getNode('.totalPay').innerHTML = totalVar;
	getNode('.typeRoom').value = typeRoomVar;
	
	switch (statusVar) {
	case 1: {
		getNode('.windowEditOrder').style.display = "block";
		break;
	}
	case 2: {
		getNode('.check').style.display = "block";
		insertDataCheck();
		break;
	}
	case 3: {
		var message = getNode('.orderStatusMess').value;
		getNode('.message').style.weight= "200px";
		getNode('.message').innerHTML = message;
		getNode('.windowMessage').style.display = "block";
		break;
	}
	case 4: {
		var message = getNode('.orderStatusMess').value;
		getNode('.message').innerHTML = message;
		getNode('.windowMessage').style.display = "block";
		break;
	}
	}

}

function insertDataCheck() {
	getNode('.checkNameInsert').innerHTML = nameUser;
	getNode('.checkSurnameInsert').innerHTML = surnameUser;
	getNode('.checkInInsert').innerHTML = dateStartVar;
	getNode('.checkOutInsert').innerHTML = dateEndVar;
	getNode('.numberRoomInsert').innerHTML = numberRoomVar;
	getNode('.typeRoomRoomInsert').innerHTML = typeRoomValue;
	getNode('.totalInsert').innerHTML = totalVar;
	getNode('.idOrderCheckInsert').innerHTML = idOrderVar;
	
}

async function deleteUserOrder() {
	var errorMessage = getNode('.orderDeleteError').value;
	var deleteOK = getNode('.deleteOK').value;
    var ObjectOrder = {
        orderId: idOrderVar
    }
    try {
        await deleteAJAX('order', "" , JSON.stringify(ObjectOrder));
        showPersonalPage();
		getNode('.message').innerHTML = deleteOK;
		getNode('.windowMessage').style.display = "block";
	} catch (error) {
        logOut();
		getNode('.windowLogIn').style.display = "block";
		loginCallBack = function() {
			deleteUserOrder();
		}
	}


}

function closeMessageConfirmation() {
	getNode('.windowConfirmation').style.display = "none";
}

function closeWindowEditOrder() {
	getNode('.windowEditOrder').style.display = "none";

}

async function updateUserOrder() {
	if (relogin) {
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
		dateStartVar = getNode('.dateStart').value;
		dateEndVar = getNode('.dateEnd').value;
		roomVar = getNode('.bed').value;
		personVar = getNode('.person').value;
		typeRoomVar = getNode('.typeRoom').value;
	}
	var update = getNode('.updateMessage').value;

	var ObjectOrder = {
        orderId: idOrderVar,
        dateStart: dateStartVar,
        dateEnd: dateEndVar,
        bedNumber: roomVar,
        personNumber: personVar
	}

	var TypeRoom = {
		id: typeRoomVar
	}

    ObjectOrder.typeRoom = TypeRoom;

	try {
        await put('order', "" ,  JSON.stringify(ObjectOrder));
        relogin = true;
		showPersonalPage();
		getNode('.message').innerHTML = update;
		getNode('.windowMessage').style.display = "block";
	} catch (error) {
        relogin = false;
		logOut();
		getNode('.windowLogIn').style.display = "block";
		loginCallBack = function() {
			updateUserOrder();
		}
	}


}

function closeWindowPayment(){
	getNode('.windowPayment').style.display = "none";
}

function roomPayment(){
	var params = 'action=payment' + '&' + 'id=' + idOrderVar;
	var request = new XMLHttpRequest();
	var paymantOK =  getNode('.paymentOK').value;
	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			if (request.responseText == "OK") {
				showPersonalPage();
				getNode('.message').innerHTML = paymantOK;
				getNode('.windowMessage').style.display = "block";
			}
			if (request.responseText == "error") {
				logOut();
				getNode('.windowLogIn').style.display = "block";
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