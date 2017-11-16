loginCallBack = '';

function pressEnter(event) {
	if (!event.shiftKey && event.keyCode == 13)
		logIn();
}

async function logOut(){
    try {
        await put("user/logOut");
        loginStatus = "none";
        document.querySelector('.exit').style.display = "none";
        var hiddenField = document.querySelector('.fieldLOGIN').value;
        document.querySelector('.login').innerText = hiddenField;
        document.querySelector('.exit').style.display = "none";
        document.querySelector('.admin').style.display = "none";
    } catch (error) {
        document.querySelector('.errorLogin').innerHTML = document.querySelector('.accessDenied').value;
    }

}

function logIn() {
	document.querySelector('.errorLogin').innerHTML = "";
	var hiddenField3 = document.querySelector('.fillAllFields').value;
	var log = document.querySelector('.loginLogIn').value;
	var pass = document.querySelector('.passLogIn').value;
	var User = {
		login: log,
		password: pass
	}
	var url = 'user/login';
	var data = JSON.stringify(User);
	if (isEmpty(log, pass))
		document.querySelector('.errorLogin').innerHTML = hiddenField3;
	else {
		loginUser(url, "", data);
	}

}

function isEmpty(str, str2) {
	return (str == null) || (str.length == 0) || (str2 == null)
			|| (str2.length == 0);
}

async function loginUser(url, param, data) {
	try {
		access(await post(url, param, data));
        document.querySelector('.loginLogIn').value = "";
        document.querySelector('.passLogIn').value = "";
	} catch (error) {
		document.querySelector('.errorLogin').innerHTML = document.querySelector('.accessDenied').value;
	}

}



function access(response) {
	var newUser = JSON.parse(response);
    UserObject = newUser;
	if (newUser.role == true) {
		loginStatus = response.substring(4);
		document.querySelector('.windowLogIn').style.display = "none";
		document.querySelector('.login').innerText = newUser.name;
		document.querySelector('.exit').style.display = "block";
		document.querySelector('.errorLogin').innerHTML = "";
		document.querySelector('.admin').style.display = "block";
		if (typeof loginCallBack === 'function') {
			loginCallBack();
		}
		;
		loginCallBack = '';
	} else {
		document.querySelector('.windowLogIn').style.display = "none";
		document.querySelector('.login').innerText = newUse.name;
		document.querySelector('.exit').style.display = "block";
		document.querySelector('.errorLogin').innerHTML = "";

		if (typeof loginCallBack === 'function') {
			loginCallBack();
		}
		;
		loginCallBack = '';
	}

}