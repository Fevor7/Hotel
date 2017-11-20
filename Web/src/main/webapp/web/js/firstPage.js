securityHeaderName = "SecurityHeader";
securityHeaderValue = "javathebest";

async function showFirstPage(pageNumber) {
	try {
		var template = await get2('page/first');
		getNode('.insertPage').innerHTML = template;
		animateSlider();
		verificationUser();
		loadWindowNewOrder();
	} catch (error) {
		console.log(error);
	}
}

function verificationUser() {
	var name = getNode('.nameUser').value;
	var role = getNode('.roleUser').value;
	var hiddenField = getNode('.fieldLOGIN').value;
	if (name == "") {
		loginStatus = "none";
		getNode('.exit').style.display = "none";
		getNode('.login').innerText = hiddenField;
		getNode('.exit').style.display = "none";
		getNode('.admin').style.display = "none";
	} else {
		loginStatus = name;
		getNode('.login').innerText = name;
		getNode('.exit').style.display = "block";
		if (role == 'true') {
			getNode('.admin').style.display = "block";
		}
	}
}

async function loadWindowNewOrder() {
	try {
		var template = await fetchTemplate3('newOrder');
		var list = await get2('room/type');
		createWindowWithType(list, template, '.insertWindowNewOrder');
	} catch (error) {
		console.log(error);
	}
}

function createWindowWithType(response, template, nameSelector) {
	getNode(nameSelector).innerHTML = template;
	var list = JSON.parse(response);
	var selectElement = getNode('.typeRoom');
	for (i = 0; i < list.length; i++) {
		var option = document.createElement('option');
		option.innerText = list[i].value;
		option.className = 'firstOptionType';
		option.value = list[i].id;
		selectElement.appendChild(option);
	}
}

function enterPressMin(e) {
	if (e.keyCode == 13) {
		onfocusMin();
	}
}

function onfocusMin() {
	var valueInput = getNode('.inputMinPrice').value;
	var valueInputMax = getNode('.inputMaxPrice').value;
	if ((valueInput >= 20) && (valueInput <= 2000)) {
		getNode('.minPrice').value = valueInput;
		getNode('.maxPrice').min = valueInput;
		if (valueInput > valueInputMax) {
			getNode('.maxPrice').min = valueInput;
			getNode('.maxPrice').value = valueInput;
			getNode('.inputMaxPrice').value = valueInput;
		}
	} else {
		var min = 20;
		getNode('.inputMinPrice').value = min;
		getNode('.minPrice').value = min;
		getNode('.maxPrice').min = min;
	}
}

function enterPressMax(e) {
	if (e.keyCode == 13) {
		onfocusMax();
	}
}

function onfocusMax() {
	var valueInput = getNode('.inputMaxPrice').value;
	var valueInputMin = getNode('.inputMinPrice').value;
	if ((valueInput >= 20) && (valueInput <= 2000)) {
		getNode('.maxPrice').value = valueInput;
		getNode('.minPrice').max = valueInput;
		if (valueInput < valueInputMin) {
			getNode('.minPrice').max = valueInput;
			getNode('.minPrice').value = valueInput;
			getNode('.inputMinPrice').value = valueInput;
		}
	} else {
		var max = 2000;
		var min = 20;
		getNode('.inputMaxPrice').value = max;
		getNode('.maxPrice').value = max;
		getNode('.minPrice').min = min;
	}
}

function priceMin() {
	var valuerate = getNode('.minPrice').value;
	getNode('.inputMinPrice').value = valuerate;
	getNode('.maxPrice').min = valuerate;
}

function priceMax() {
	var valuerate = getNode('.maxPrice').value;
	getNode('.inputMaxPrice').value = valuerate;
	getNode('.minPrice').max = valuerate;
}

function dateStartClick() {
	var dateStart = getNode('.dateStart').value;
	var dateEnd = getNode('.dateEnd').value;
	var todayDate = new Date();
	var date = new Date(dateStart);
	var dateE = new Date(dateEnd);
	var curr_month = todayDate.getMonth() + 1;

	var curr_date2 = date.getDate();
	var curr_month2 = date.getMonth() + 1;
	var curr_year2 = date.getFullYear();

	var today = new Date(todayDate.getFullYear(), todayDate.getMonth(),
			todayDate.getDate()).valueOf();
	var dateOutput = ((String(todayDate.getFullYear()).length == 1) ? "0"
			+ todayDate.getFullYear() : todayDate.getFullYear())
			+ "-"
			+ ((String(curr_month).length == 1) ? "0" + curr_month : curr_month)
			+ "-"
			+ ((String(todayDate.getDate()).length == 1) ? "0"
					+ todayDate.getDate() : todayDate.getDate());
	var dateOutputEnd = ((String(date.getFullYear()).length == 1) ? "0"
			+ date.getFullYear() : date.getFullYear())
			+ "-"
			+ ((String(curr_month2).length == 1) ? "0" + curr_month2
					: curr_month2)
			+ "-"
			+ ((String(date.getDate()).length == 1) ? "0" + date.getDate()
					: date.getDate());

	if (date.valueOf() < today) {
		getNode('.dateStart').value = dateOutput;
	} else {
		getNode('.dateEnd').min = dateOutputEnd;
	}
	if (date.valueOf() >= dateE.valueOf()) {
		getNode('.dateEnd').value = dateOutputEnd;
	}
}

function dateEndClick() {
	var dateStart = getNode('.dateStart').value;
	var dateEnd = getNode('.dateEnd').value;
	var dataS = new Date(dateStart);
	var dataE = new Date(dateEnd);
	var todayDate = new Date();
	var curr_month = dataS.getMonth() + 1;
	var todayStart = new Date(dataS.getFullYear(), dataS.getMonth(), dataS
			.getDate()).valueOf();
	var dateOutput = dataS.getFullYear()
			+ "-"
			+ ((String(curr_month).length == 1) ? "0" + curr_month : curr_month)
			+ "-"
			+ ((String(dataS.getDate()).length == 1) ? "0" + dataS.getDate()
					: dataS.getDate());
	if (dataE.valueOf() < todayStart.valueOf()) {
		getNode('.dateEnd').value = dateOutput;
	}
}

function sendNewOrder() {
	var dateStart = getNode('.dateStart').value;
	var dateEnd = getNode('.dateEnd').value;
	
	if (!validateData(dateStart)) {
		var incorrectName = getNode('.errorCheckIn').value;
		getNode('.errorOrder').innerHTML = incorrectName;
		return;
	}
	if (!validateData(dateEnd)) {
		var incorrectName = getNode('.errorCheckOut').value;
		getNode('.errorOrder').innerHTML = incorrectName;
		return;
	}

	var bed = getNode('.bed').value;
	var person = getNode('.person').value;
	var idTypeRoom = getNode('.typeRoom').value;
	var date = new Date(dateStart);

	var Order = {
		dateStart : dateStart,
		dateEnd : dateEnd,
		bedNumber : bed,
		personNumber : person
	}

	var TypeRoom = {
		id : idTypeRoom
	}

	Order.typeRoom = TypeRoom;
	var url = 'order';
	var data = JSON.stringify(Order);

	var messageErrorBed = getNode('.messageErrorBed').value;
	var messageErrorPerson = getNode('.messageErrorPerson').value;
	var firstOption = getNode('.firstOption').value;
	var firstOptionType = getNode('.firstOptionType').value;

	if (person == firstOption) {
		getNode('.errorOrder').innerHTML = messageErrorPerson;
	} else {
		if (bed == firstOption) {
			getNode('.errorOrder').innerHTML = messageErrorBed;
		} else {
			ajaxPostOrder(url, "", data);
			getNode('.errorOrder').innerHTML = "";
			getNode('.dateStart').value = dateStart;
			getNode('.dateEnd').value = dateEnd;
			getNode('.bed').value = firstOption;
			getNode('.person').value = firstOption;
			getNode('.typeRoom').value = firstOptionType;
		}
	}

}

function validateData(data) {
	return (/[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])/.test(data));
}

async function ajaxPostOrder(url, param, data) {
	try {
		var template = await post(url, param, data);
		getNode('.message').innerHTML = getNode('.orderOk').value;
		getNode('.windowMessage').style.display = "block";
	} catch (error) {
		logOut();
		getNode('.windowLogIn').style.display = "block";
		loginCallBack = async function() {
            var template = await post(url, param, data);
            getNode('.message').innerHTML = getNode('.orderOk').value;
            getNode('.windowMessage').style.display = "block";
		}
	}

}
