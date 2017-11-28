async function showRoomList(pageNumber) {
	try {
		var list = await get('room/page/'+pageNumber);
		var template = await fetchTemplate('room');
		createTable(list, template, 'roomList');
		return list;
	} catch(error) {
		console.log(error);
	}
}


function createTable(response, templateRoom, method) {
	var listPage = JSON.parse(response);
	var insertDiv = getNode('.insertRoomList');
	$('.insertRoomList').empty();
	createPaging(listPage, method);
	var list = listPage.data;
	for (i = 0; i<list.length; i++) {
		var newTemplate = templateRoom;
		var windowRoom = document.createElement('div');
		windowRoom.className = "windowRoom";
		windowRoom.innerHTML = templateRoom;
		var insertRoom = getNode('.insertRoomList');
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
	}
	createPaging(listPage, method);
	
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}