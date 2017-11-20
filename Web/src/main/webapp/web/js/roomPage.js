async function showRoomPage(pageNumber) {
    try {
        var template = await get2('page/room');
        getNode('.insertPage').innerHTML = template;
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
    getNode('.errorOrder').innerHTML = "";
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
    var minPrice = getNode('.inputMinPrice').value;
    var maxPrice = getNode('.inputMaxPrice').value;
    var idTypeRoom = getNode('.typeRoom').value;
    var Order = {
        dateStart: dateStart,
        dateEnd: dateEnd,
        bedNumber: bed,
        personNumber: person,
        minPrice: minPrice,
        maxPrice: maxPrice,
        idTypeRoom: idTypeRoom,
        pageNumber: pageNumber
    }

    sendRoomParameter(Order);
}

async function sendRoomParameter(Order) {
    try {
        var list = await get2('room?', Order);
        var template = await fetchTemplate3('room');
        createTable(list, template, 'roomsearch');
    } catch (error) {
        console.log(error);
    }
}

function validateData(data) {
    return (/[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])/.test(data));
}
