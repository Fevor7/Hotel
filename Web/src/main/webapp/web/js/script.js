loginStatus = "none";
securityHeaderName = "SecurityHeader";
securityHeaderValue = "javathebest";



function closeWindowLogin() {
	document.querySelector('.windowLogIn').style.display = "none";
	document.querySelector('.errorLogin').innerHTML = "";
	document.querySelector('.loginLogIn').value = "";
	document.querySelector('.passLogIn').value = "";
	loginCallBack = '';

}

function showWindowLogin() {
	var hiddenField = document.querySelector('.fieldLOGIN').value;
	var login = document.querySelector('.login').innerText;
	if (document.querySelector('.windowLogIn').style.display != "block") {
		if (loginStatus == "none") {
			document.querySelector('.windowLogIn').style.display = "block";
		} else {
			showPersonalPage();
		}
	} else {
		document.querySelector('.windowLogIn').style.display = "none";
	}
	document.querySelector('.errorLogin').innerHTML = "";

}

function showWindowSignUp() {
	document.querySelector('.errorLogin').innerHTML = "";
	document.querySelector('.errorSignUp').innerHTML = "";
	document.querySelector('.windowSignUp').style.display = "block";
	document.querySelector('.loginLogIn').value = "";
	document.querySelector('.passLogIn').value = "";
}

async function switchLang(leng) {
    try {
        await put("language/"+leng);
        location.reload();
    } catch (error) {
        console.log(error);
    }
}
