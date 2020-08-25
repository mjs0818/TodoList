const form = document.querySelector(".js-form"),
input = form.querySelector("input"),
greeting = document.querySelector(".js-greeting");

const USER_LS = "currentUser",
SHOWING_CN = "showing";

function saveName(text){  // Local Storage에 user 이름 저장
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();  // enter키를 입력했을 때 기본적으로 발생하는 동작을 막음
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue)
}

function askForName() { // currentUser가 없을 때 user 이름 요청
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text){
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello ${text}`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
      askForName();
    }else{
      paintGreeting(currentUser);
    }
}
function init(){
    loadName();
};

init();