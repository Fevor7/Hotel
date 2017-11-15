function pressEnterSignUp(event) {
    if (!event.shiftKey && event.keyCode == 13)
        signUp();
}

function signUp() {
    var hiddenField = document.querySelector('.fillAllFields').value;
    var name = document.querySelector('.nameInputReg').value;
    var surname = document.querySelector('.surnameInputReg').value;
    var email = document.querySelector('.emailInputReg').value;
    var login = document.querySelector('.loginInputReg').value;
    var pass = document.querySelector('.passInputReg').value;
    var repass = document.querySelector('.repassInputReg').value;
    var params = 'action=newuser&name=' + name + '&surname=' + surname
        + '&email=' + email + '&login=' + login + '&pass=' + pass;
    var entry = isEmptySignUp(name, surname, email, login, pass, repass);
    if (entry) {
        document.querySelector('.errorSignUp').innerHTML = hiddenField;
        return;
    }

    if (!validateName(name, surname)) {
        var incorrectName = document.querySelector('.incorrectName').value;
        document.querySelector('.errorSignUp').innerHTML = incorrectName;
        return;
    }

    if (!validateEmail(email)) {
        var hiddenField = document.querySelector('.incorrectEmail').value;
        document.querySelector('.errorSignUp').innerHTML = hiddenField;
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
    var hiddenField = document.querySelector('.shortPassword').value;
    var hiddenField2 = document.querySelector('.passwordError').value;
    if (pass == repass) {
        if (pass.length > 9) {
            result = true;
        } else {
            document.querySelector('.errorSignUp').innerHTML = hiddenField;
            return false;
        }
    } else {
        document.querySelector('.errorSignUp').innerHTML = hiddenField2;
        return false;
    }
    if (!secondValidatePass(pass)) {
        var incorrectPass = document.querySelector('.incorrectPass').value;
        document.querySelector('.errorSignUp').innerHTML = incorrectPass;
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
        var sign = document.querySelector('.signUpOK').value;
        document.querySelector('.windowSignUp').style.display = "none";
        document.querySelector('.windowMessage').style.display = "block";
        document.querySelector('.message').innerHTML = sign;

        document.querySelector('.loginInputReg').value = "";
        document.querySelector('.nameInputReg').value = "";
        document.querySelector('.surnameInputReg').value = "";
        document.querySelector('.emailInputReg').value = "";
        document.querySelector('.passInputReg').value = "";
        document.querySelector('.repassInputReg').value = "";
    } catch (error) {
        var sign = "";
        if(error.message == "500") {
            sign = document.querySelector('.signUpErrorlogin').value;
        }
        if(error.message == "400") {
            sign = document.querySelector('.incorrectDataError').value;
        }
        document.querySelector('.errorSignUp').innerHTML = sign;
    }
}

function closeMessage() {
    document.querySelector('.windowMessage').style.display = "none";

}

function closeWindowSignUp() {
    document.querySelector('.windowSignUp').style.display = "none";
    document.querySelector('.errorSignUp').innerHTML = "";
    document.querySelector('.loginInputReg').value = "";
    document.querySelector('.nameInputReg').value = "";
    document.querySelector('.surnameInputReg').value = "";
    document.querySelector('.emailInputReg').value = "";
    document.querySelector('.passInputReg').value = "";
    document.querySelector('.repassInputReg').value = "";
}