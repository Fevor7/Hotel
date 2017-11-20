async function showAboutPage() {
    try {
        var response = await get2('about');
        var template = await fetchTemplate3('about');
        compileAboutPage(response, template);
    } catch (error){
        console.log(error);
    }
}

function compileAboutPage(response, template) {
    var hotel = JSON.parse(response);
    getNode('.insertPage').innerHTML = template;
    getNode('.hotelName').innerText = hotel.name;
    getNode('.starReting').innerHTML = hotel.starReting;
    getNode('.hotelAddress').innerText = hotel.address;
    getNode('.hotelLocation').innerHTML = hotel.location;
    getNode('.hotelAbout').innerText = hotel.about;
    var listFacil = getNode('.listFacil');
    createListFacilitiesAndFoto(listFacil, hotel);
}

function createListFacilitiesAndFoto(listFacil, hotel) {
    for (var i = 0; i < hotel.facilities.length; i++) {
        var spanOne = document.createElement('span');
        spanOne.className = 'checkMark';
        var text = document.createTextNode('&#10003;');
        spanOne.innerHTML = '&#10003;'
        var spanTwo = document.createElement('span');
        spanTwo.appendChild(document.createTextNode(hotel.facilities[i].value));
        listFacil.appendChild(spanOne);
        listFacil.appendChild(spanTwo);
    }
    for (var i = 0; i < hotel.fotoAddress.length; i++) {
        var img = document.createElement('img');
        img.src = hotel.fotoAddress[i].value;
        var br = document.createElement('br');
        getNode('.listFoto').appendChild(img);
        getNode('.listFoto').appendChild(br);
    }
}