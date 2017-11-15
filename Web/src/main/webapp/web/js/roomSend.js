async function showRoomList(pageNumber) {
	try {
		var list = await get2('room/page/'+pageNumber);
		var template = await fetchTemplate3('room');
		createTable(list, template, 'roomList');
		return list;
	} catch(error) {
		console.log(error);
	}
}


function createTable(response, templateRoom, method) {
	var listPage = JSON.parse(response);
	var insertDiv = document.querySelector('.insertRoomList');
	$('.insertRoomList').empty();
	createPaging(listPage, method);
	var list = listPage.data;
	for (i = 0; i<list.length; i++) {
		var newTemplate = templateRoom;
		var windowRoom = document.createElement('div');
		windowRoom.className = "windowRoom";
		windowRoom.innerHTML = templateRoom;
		var insertRoom = document.querySelector('.insertRoomList');
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
	}
	createPaging(listPage, method);
	
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}