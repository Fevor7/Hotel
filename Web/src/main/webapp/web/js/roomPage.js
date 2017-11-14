async function showRoomPage(pageNumber) {
	try {
		var template = await get2('page/room');
		document.querySelector('.insertPage').innerHTML = template;
		loadFilterRoom();
		showRoomList(pageNumber);
	} catch (error) {
		console.log(error);
	}
}


async function loadFilterRoom() {
	try {
		var list = await get2('room/type');
		var template = await fetchTemplate3('filterRoom');
		createWindowWithType(list, template, '.filterRoom');
	} catch (error) {
		console.log(error);
	}
}

function searchForRoom(pageNumber) {
	document.querySelector('.errorOrder').innerHTML = "";
	var dateStart = document.querySelector('.dateStart').value;
	var dateEnd = document.querySelector('.dateEnd').value;
	var todayDate = new Date();
	var curr_month = todayDate.getMonth() + 1;
	if(!validateData(dateStart)) {
		var incorrectName = document.querySelector('.errorCheckIn').value;
		document.querySelector('.errorOrder').innerHTML = incorrectName;
		return;
	} 
	if(!validateData(dateEnd)) {
		var incorrectName = document.querySelector('.errorCheckOut').value;
		document.querySelector('.errorOrder').innerHTML = incorrectName;
		return;
	}
	var dateOutput = ((String(todayDate.getFullYear()).length == 1) ? "0"
			+ todayDate.getFullYear() : todayDate.getFullYear())
			+ "-"
			+ ((String(curr_month).length == 1) ? "0" + curr_month : curr_month)
			+ "-"
			+ ((String(todayDate.getDate()).length == 1) ? "0"
					+ todayDate.getDate() : todayDate.getDate());

	var bed = document.querySelector('.bed').value;
	var person = document.querySelector('.person').value;
	var minPrice = document.querySelector('.inputMinPrice').value;
	var maxPrice = document.querySelector('.inputMaxPrice').value;
	var date = new Date(dateStart);
	var curr_month2 = date.getMonth() + 1;
	var dateOutputStart = ((String(date.getFullYear()).length == 1) ? "0"
			+ date.getFullYear() : date.getFullYear())
			+ "-"
			+ ((String(curr_month2).length == 1) ? "0" + curr_month2
					: curr_month2)
			+ "-"
			+ ((String((date.getDate())).length == 1) ? "0"
					+ (date.getDate()) : (date.getDate()));
	var dateE = new Date(dateEnd);
	var curr_month3 = dateE.getMonth() + 1;
	var dateOutputEnd = ((String(dateE.getFullYear()).length == 1) ? "0"
			+ dateE.getFullYear() : dateE.getFullYear())
			+ "-"
			+ ((String(curr_month3).length == 1) ? "0" + curr_month3
					: curr_month3)
			+ "-"
			+ ((String((dateE.getDate())).length == 1) ? "0"
					+ (dateE.getDate()) : (dateE.getDate()));

	var idTypeRoom = document.querySelector('.typeRoom').value;
	var Order = {
			dateStart: dateStart,
			  dateEnd: dateEnd,
			bedNumber: bed,
		 personNumber: person,
		     minPrice: minPrice,
		     maxPrice: maxPrice,
		   pageNumber: pageNumber
	}
	var TypeRoom = {
			id: idTypeRoom
	}
	Order.typeRoom = TypeRoom;
	var JSONOrder = JSON.stringify(Order);
	var encoded_param = encodeURIComponent(JSONOrder);
	sendRoomParameter(pageNumber, encoded_param);
}


function sendRoomParameter(pageNumber, JSONOrder, callback) {
	get('?action=roomsearch&', {
		order: JSONOrder
	}, (error, list) => {
		if (error) {
			alert(error.message);
		} else {
			fetchTemplate('room', (error, template) => {
				if (error) {
					alert(error.message)
				} else {
					createTable(list, template, 'roomsearch');
				}
			});
		}
	});
}

function validateData(data) {
	return (/[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])/.test(data)); 
}
function ajaxPostSearchRoom(params) {
	var url = 'Servlet' + params;
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			var response = request.responseText;
			switch (response) {
			case 'error': {
				var error = document.querySelector('.messageRoomNotFound').value;
				document.querySelector('.insertRoomList').style.color = "white";
				document.querySelector('.insertRoomList').innerHTML = error;
				break;
			}
			case 'errordata': {
				var error = document.querySelector('.incorrectDataError').value;
				document.querySelector('.errorOrder').innerHTML = error;
				break;
			}
			default: {
				var response = request.responseText;
				document.querySelector('.insertRoomList').style.color = "black";
				document.querySelector('.insertRoomList').innerHTML = request.responseText;
				break;
			}
			}

		}
	}
	request.open('GET', url, true);
	request.setRequestHeader(securityHeaderName, securityHeaderValue);
	request.setRequestHeader('Content-Type',
			'application/x-www-form-urlencoded');
	request.send('');
}
