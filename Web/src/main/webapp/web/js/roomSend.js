async function showRoomList(pageNumber) {
	try {
		var list = await get('room/page/'+pageNumber);
		var template = await fetchTemplate('room');
        await createTable(list, template, 'roomList');
		return list;
	} catch(error) {
		console.log(error);
	}
}


async function createTable(response, templateRoom, method) {
	var listPage = JSON.parse(response);
	var insertDiv = getNode('.insertRoomList');
	$('.insertRoomList').empty();
	createPaging(listPage, method);
	var list = listPage.data;
	for (i = 0; i<list.length; i++) {
        var newTemplate = await parseTemplate(list[i], templateRoom);
        var windowRoom = document.createElement('div');
        windowRoom.className = "windowRoom";
        windowRoom.innerHTML = newTemplate;
        getNode('.insertRoomList').appendChild(windowRoom);
	}
	createPaging(listPage, method);
	
}

async function parseTemplate(object, template) {
	object.typeValueRoom = object.typeRoom.value;
	var bundle = await getBundle();
    var newBundle = JSON.parse(bundle);
    var newTempalate = template.replace(/\{\{(\w*)\}\}/g, (match, value)=> {return object[value]; });
    return  newTempalate.replace(/\{(\w*)\}/g, (match, value)=>{ return newBundle[value]; });

}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}