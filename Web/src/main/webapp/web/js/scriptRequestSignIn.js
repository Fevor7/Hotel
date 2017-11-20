function pressEnterSignUp(event) {
    if (!event.shiftKey && event.keyCode == 13)
        signUp();
}

function signUp() {
    var hiddenField = getNode('.fillAllFields').value;
    var name = getNode('.nameInputReg').value;
    var surname = getNode('.surnameInputReg').value;
    var email = getNode('.emailInputReg').value;
    var login = getNode('.loginInputReg').value;
    var pass = getNode('.passInputReg').value;
    var repass = getNode('.repassInputReg').value;
    var params = 'action=newuser&name=' + name + '&surname=' + surname
        + '&email=' + email + '&login=' + login + '&pass=' + pass;
    var entry = isEmptySignUp(name, surname, email, login, pass, repass);
    if (entry) {
        getNode('.errorSignUp').innerHTML = hiddenField;
        return;
    }

    if (!validateName(name, surname)) {
        var incorrectName = getNode('.incorrectName').value;
        getNode('.errorSignUp').innerHTML = incorrectName;
        return;
    }

    if (!validateEmail(email)) {
        var hiddenField = getNode('.incorrectEmail').value;
        getNode('.errorSignUp').innerHTML = hiddenField;
        return;
    }
    var User = {
        name: name,
        surname: surname,
        email: email,
        login: login,
        password: pass
    }
    if (validatePassword(pass, repass)) {
        sendNewUser(JSON.stringify(User));
    }

}

function validateEmail(mail) {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail));
}

function validateName(name, surname) {
    var result = (/^[а-яА-ЯёЁa-zA-Z]+$/.test(name)) && (/^[а-яА-ЯёЁa-zA-Z]+$/.test(surname))
    return result;
}

function isEmptySignUp(name, surname, email, login, pass, repass) {
    return (name == null) || (name.length == 0) || (surname == null)
        || (surname.length == 0) || (email == null) || (email.length == 0)
        || (login == null) || (login.length == 0) || (pass == null)
        || (pass.length == 0) || (repass == null) || (repass.length == 0);
}

function validatePassword(pass, repass) {
    var result = true;
    var hiddenField = getNode('.shortPassword').value;
    var hiddenField2 = getNode('.passwordError').value;
    if (pass == repass) {
        if (pass.length > 9) {
            result = true;
        } else {
            getNode('.errorSignUp').innerHTML = hiddenField;
            return false;
        }
    } else {
        getNode('.errorSignUp').innerHTML = hiddenField2;
        return false;
    }
    if (!secondValidatePass(pass)) {
        var incorrectPass = getNode('.incorrectPass').value;
        getNode('.errorSignUp').innerHTML = incorrectPass;
        return false;
    }
    return true;
}

function secondValidatePass(password) {
    return (/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/.test(password));
}


async function sendNewUser(User) {
    try {
        await post('user', "", User);
        var sign = getNode('.signUpOK').value;
        getNode('.windowSignUp').style.display = "none";
        getNode('.windowMessage').style.display = "block";
        getNode('.message').innerHTML = sign;

        getNode('.loginInputReg').value = "";
        getNode('.nameInputReg').value = "";
        getNode('.surnameInputReg').value = "";
        getNode('.emailInputReg').value = "";
        getNode('.passInputReg').value = "";
        getNode('.repassInputReg').value = "";
    } catch (error) {
        var sign = "";
        if(error.message == "500") {
            sign = getNode('.signUpErrorlogin').value;
        }
        if(error.message == "400") {
            sign = getNode('.incorrectDataError').value;
        }
        getNode('.errorSignUp').innerHTML = sign;
    }
}

function closeMessage() {
    getNode('.windowMessage').style.display = "none";

}

function closeWindowSignUp() {
    getNode('.windowSignUp').style.display = "none";
    getNode('.errorSignUp').innerHTML = "";
    getNode('.loginInputReg').value = "";
    getNode('.nameInputReg').value = "";
    getNode('.surnameInputReg').value = "";
    getNode('.emailInputReg').value = "";
    getNode('.passInputReg').value = "";
    getNode('.repassInputReg').value = "";
}