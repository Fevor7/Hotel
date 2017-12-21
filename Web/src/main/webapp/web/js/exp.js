{
    document.addEventListener('DOMContentLoaded', session);
    document.getElementsByTagName('header')[0].addEventListener('click', showFirstPage);
}

function addingListener(){
    getNode('.liFirstPage').addEventListener('click', showFirstPage);
    getNode('.ruImg').addEventListener('click', ()=>  switchLang('ru') );
    getNode('.engImg').addEventListener('click', () => switchLang('en'));
    getNode('.liRoomPage').addEventListener('click', () => showRoomPage(0));
    getNode('.liAboutPage').addEventListener('click', showAboutPage);
    getNode('.liOrderList').addEventListener('click', () => showOrderListAdmin('5'));
    getNode('.exit').addEventListener('click', logOut);
    getNode('.liLogin').addEventListener('click', showWindowLogin);
    getNode('.logInButton').addEventListener('click', logIn);
    getNode('.showWindowSignUp').addEventListener('click', showWindowSignUp);
    getNode('.closeWindowLogin').addEventListener('click', closeWindowLogin);
    getNode('.formLogin').addEventListener('keypress', () => pressEnter(event));
    getNode('.signUpPart2').addEventListener('keypress', () => pressEnterSignUp(event));
    getNode('.signUpButton').addEventListener('click',signUp);
    getNode('.closechar').addEventListener('click', closeWindowSignUp);
    getNode('.closeMessage').addEventListener('click', closeMessage);
    getNode('.closeWindowPayment').addEventListener('click', closeWindowCheck);
    getNode('.printCheck').addEventListener('click', printCheck);
}







