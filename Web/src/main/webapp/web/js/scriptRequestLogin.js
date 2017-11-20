loginCallBack = '';

function pressEnter(event) {
	if (!event.shiftKey && event.keyCode == 13)
		logIn();
}

async function logOut(){
    try {
        await put("user/logOut");
        loginStatus = "none";
        getNode('.exit').style.display = "none";
        var hiddenField = getNode('.fieldLOGIN').value;
        getNode('.login').innerText = hiddenField;
        getNode('.exit').style.display = "none";
        getNode('.admin').style.display = "none";
    } catch (error) {
        getNode('.errorLogin').innerHTML = getNode('.accessDenied').value;
    }

}

function logIn() {
	getNode('.errorLogin').innerHTML = "";
	var hiddenField3 = getNode('.fillAllFields').value;
	var log = getNode('.loginLogIn').value;
	var pass = getNode('.passLogIn').value;
	var User = {
		login: log,
		password: pass
	}
	var url = 'user/login';
	var data = JSON.stringify(User);
	if (isEmpty(log, pass))
		getNode('.errorLogin').innerHTML = hiddenField3;
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
        getNode('.loginLogIn').value = "";
        getNode('.passLogIn').value = "";
	} catch (error) {
		getNode('.errorLogin').innerHTML = getNode('.accessDenied').value;
	}

}



function access(response) {
	var newUser = JSON.parse(response);
    UserObject = newUser;
	if (newUser.role == true) {
		loginStatus = response.substring(4);
		getNode('.windowLogIn').style.display = "none";
		getNode('.login').innerText = newUser.name;
		getNode('.exit').style.display = "block";
		getNode('.errorLogin').innerHTML = "";
		getNode('.admin').style.display = "block";
		if (typeof loginCallBack === 'function') {
			loginCallBack();
		}
		;
		loginCallBack = '';
	} else {
		getNode('.windowLogIn').style.display = "none";
		getNode('.login').innerText = newUse.name;
		getNode('.exit').style.display = "block";
		getNode('.errorLogin').innerHTML = "";

		if (typeof loginCallBack === 'function') {
			loginCallBack();
		}
		;
		loginCallBack = '';
	}

}