loginStatus = "none";
securityHeaderName = "SecurityHeader";
securityHeaderValue = "javathebest";



function closeWindowLogin() {
	getNode('.windowLogIn').style.display = "none";
	getNode('.errorLogin').innerHTML = "";
	getNode('.loginLogIn').value = "";
	getNode('.passLogIn').value = "";
	loginCallBack = '';

}

function showWindowLogin() {
	var hiddenField = getNode('.fieldLOGIN').value;
	var login = getNode('.login').innerText;
	if (getNode('.windowLogIn').style.display != "block") {
		if (loginStatus == "none") {
			getNode('.windowLogIn').style.display = "block";
		} else {
			showPersonalPage();
		}
	} else {
		getNode('.windowLogIn').style.display = "none";
	}
	getNode('.errorLogin').innerHTML = "";

}

function showWindowSignUp() {
	getNode('.errorLogin').innerHTML = "";
	getNode('.errorSignUp').innerHTML = "";
	getNode('.windowSignUp').style.display = "block";
	getNode('.loginLogIn').value = "";
	getNode('.passLogIn').value = "";
}

async function switchLang(leng) {
    try {
        await put("language/"+leng);
        location.reload();
    } catch (error) {
        console.log(error);
    }
}
