function showAboutPage() {
	get('?action=aboutpage', {} ,(error, response) => {
		if (error) {
			alert(error.message);
		} else {
			fetchTemplate('about', (error, template) => {
				if (error) {
					alert(error.message)
				} else {
					compileAboutPage(response, template);
				}
			});
		}
	});
}


function compileAboutPage(response, template) {
	var hotel = JSON.parse(response);
	document.querySelector('.insertPage').innerHTML = template ;
	document.querySelector('.hotelName').innerText = hotel.name;
	document.querySelector('.starReting').innerHTML = hotel.starReting;
	document.querySelector('.hotelAddress').innerText = hotel.address;
	document.querySelector('.hotelLocation').innerHTML = hotel.location;
	document.querySelector('.hotelAbout').innerText = hotel.about;
	var listFacil = document.querySelector('.listFacil');
	createListFacilitiesAndFoto(listFacil, hotel);
}

function createListFacilitiesAndFoto(listFacil, hotel){
	for(var i=0; i<hotel.facilities.length; i++) {
		var spanOne = document.createElement('span');
		spanOne.className = 'checkMark';
		var text = document.createTextNode('&#10003;');
		spanOne.innerHTML = '&#10003;'
		var spanTwo = document.createElement('span');
		spanTwo.appendChild(document.createTextNode(hotel.facilities[i].value));
		listFacil.appendChild(spanOne);
		listFacil.appendChild(spanTwo);
	}
	for(var i = 0; i<hotel.fotoAddress.length; i++) {
		var img = document.createElement('img');
		img.src = hotel.fotoAddress[i].value;
		var br = document.createElement('br');
		document.querySelector('.listFoto').appendChild(img);
		document.querySelector('.listFoto').appendChild(br);
	}
}