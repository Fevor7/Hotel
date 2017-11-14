function experm() {
	var order = new Object();
	order.bed = document.querySelector('.bed').value;
	order.person = document.querySelector('.person').value;
	order.typeRoom = document.querySelector('.typeRoom').value;
	var url = 'Servlet?action=createorder&' + JSON.stringify(order);
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			var response = request.responseText;
			alert(JSON.stringify(order));
		}
	}
	request.open('GET', url, true);
	request.setRequestHeader(securityHeaderName, securityHeaderValue);
	request.setRequestHeader('Content-Type',
			'application/x-www-form-urlencoded');
	request.send('');

}

