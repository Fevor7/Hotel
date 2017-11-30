nameUser = '';
surnameUser = '';
pageValue = '';
UserObject = '';



async function session() {
    access(await get('session/user'));
    loadPageSession();

	getNode('.closechar').innerHTML = "&#10006";
	getNode('.closeWindowLogin').innerHTML = "&#10006";

	var body = $(document);
	var menu = $(".menu");

	body.on("scroll", function(e) {

		if (this.scrollingElement.scrollTop > 90) {
			menu.addClass("fixed");
		} else {
			menu.removeClass("fixed");
		}

	});
	addingListener();
}

async function loadPageSession() {
	try {
		var pageJSON = await get('session/page');
        if (pageJSON!="") {
            var pageValue  = JSON.parse(pageJSON);
            loadPage(pageValue.value);
        } else {
            showFirstPage();
        }
	} catch(error) {
		console.log(error);
	}
}

function loadPage (value) {
    switch (value) {
        case 'personalpage': {
            showPersonalPage();
            break;
        }
        case 'orderlist': {
            verificationUser();
            showOrderListPage(0, '5');
            break;
        }
        case 'firstpage': {
            showFirstPage();
            break;
        }
        case 'aboutpage': {
            showAboutPage();
            break;
        }
        case 'roompage': {
            showRoomPage(0);
            break;
        }
        case 'orderlistadmin': {
            showOrderListAdmin('5');
            break;
        }
        default: {
            showFirstPage();
            break;
        }
    }
}

function showOrderListAdminEdit() {
	showOrderListAdmin('5');
}

function selectPage(command, numberPage, orderStatus) {
	switch (command) {
	case 'roomList': {
		showRoomList(numberPage, null);
		break;
	}
	case 'roomsearch': {
		searchForRoom(numberPage);
		break;
	}
	case 'roomsearchadmin': {
		searchForRoomAdmin(numberPage);
		break;
	}
	case 'orderListUser': {
		showUserOrderList(numberPage);
		break;
	}
	case 'orderList': {
		showOrderListPage(numberPage, orderStatus);
		break;
	}
	}
}

function getParamsString(params) {
	var result = '';

	for (key in params) {
		if (params.hasOwnProperty(key)) {
			result += key + '=' + params[key] + '&';
		}
	}

	return result.substr(0, result.length - 1);
}

function get(baseUrl, urlParams) {
	return ajax(baseUrl, urlParams, 'GET');
}

function post(baseUrl, urlParams, data) {
	return ajax(baseUrl, urlParams, 'POST', data);
}
function put(baseUrl, urlParams, data) {
    return ajax(baseUrl, urlParams, 'PUT', data);
}
function deleteAJAX(baseUrl, urlParams, data) {
    return ajax(baseUrl, urlParams, 'DELETE', data);
}

function ajax(baseUrl, params, method, data) {
	return new Promise((resolve, reject) => {
		var paramsString = getParamsString(params);
		var url = baseUrl + paramsString;
		var request = new XMLHttpRequest();
		request.onload = function() {
			if (this.status == 200) {
				resolve(this.responseText);
			} else {
				reject(new Error(this.status));
			}
		};
		request.onerror = function() {
			reject(new Error('Network error'));
		}
		request.open(method, url, true);
		request.setRequestHeader(securityHeaderName, securityHeaderValue);
		request.setRequestHeader('Content-Type',
				'application/json');
		request.send(data || '');
		
	});
}

function fetchTemplate(template) {
	return get('template/'+template, {});
}


function createPaging(listPage, method) {
	var quantity = Math.ceil((listPage.total) / (listPage.maxPerPage));
	if (quantity > 1) {
		var insertDiv = getNode('.insertRoomList');
		var page = document.createElement('div');
		createPageline(page);
		createLink(quantity, listPage, page, method);
		insertDiv.appendChild(page);
	}
}

function createLink(quantity, listPage, page, method, type) {
	for (var i = 0; i < quantity; i++) {
		if (i == listPage.page) {
			var spanNumber = document.createElement('span');
			var text = document.createTextNode(i + 1);
			spanNumber.appendChild(text);
			page.appendChild(createSpace()).appendChild(spanNumber);
		} else {
			createNumberPage(page, i, method, type);
		}

	}
}

function createPageline(page) {
	page.align = 'center';
	page.className = 'paging';
	var pageWord = document.createElement('span');
	var text = document.createTextNode('Page: ');
	pageWord.appendChild(text);
	page.appendChild(pageWord);
}

function createNumberPage(page, i, method, type) {
	var numberPage = document.createElement('a');
	numberPage.href = '#';
	numberPage.appendChild(document.createTextNode(i + 1));
	numberPage.onclick = function(i) {
		return function() {
			selectPage(method, i, type);
		}
	}(i);
	page.appendChild(createSpace()).appendChild(numberPage);
}

function createSpace() {
	var space = document.createElement('span');
	space.innerHTML = "&emsp;"
	return space;

}

function getNode(nameClass) {
	if(nameClass[0] ==='.') {
        return document.querySelector(nameClass);
	}
	return document.getElementById(nameClass);
}

async function getBundle() {
    	var mapJSON = localStorage['ruBundle'];
    	if (mapJSON === undefined) {
            mapJSON = await get('bundle');
            localStorage['ruBundle'] = mapJSON;
		}
    	return mapJSON;
}