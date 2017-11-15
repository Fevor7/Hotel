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
    if (!validateData(dateStart)) {
        var incorrectName = document.querySelector('.errorCheckIn').value;
        document.querySelector('.errorOrder').innerHTML = incorrectName;
        return;
    }
    if (!validateData(dateEnd)) {
        var incorrectName = document.querySelector('.errorCheckOut').value;
        document.querySelector('.errorOrder').innerHTML = incorrectName;
        return;
    }

    var bed = document.querySelector('.bed').value;
    var person = document.querySelector('.person').value;
    var minPrice = document.querySelector('.inputMinPrice').value;
    var maxPrice = document.querySelector('.inputMaxPrice').value;
    var idTypeRoom = document.querySelector('.typeRoom').value;
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
