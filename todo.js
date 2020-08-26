const toDoForm = document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';
let toDos = [];



function deleteToDo(event){  // todo목록을 버튼 클릭할 때마다 하나씩 제거
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo){
      return toDo.id !== parseInt(li.id);
  })
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos(){  // ToDos를 로컬스토리지에 저장
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // 로컬스토리지는 string형식의 데이터만 저장할 수 있기 때문에 JSON.stringify()를 사용
}

function paintToDo(text){
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "X";
  delBtn.addEventListener("click", deleteToDo); // delBtn이 생성될 때마다 클릭 이벤트를 생성해줌. 클릭이 일어나면 deleteToDo함수 실행
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId; 
  toDoList.appendChild(li);
  const toDoObj = {
      text: text,
      id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(evnet){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos(){ // todo리스트를 불러오는 부분. 로컬스토리지에서 가져옴
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if(loadedToDos !== null){
    const parsedToDos = JSON.parse(loadedToDos);  // 로컬스토리지에 ToDos는 string으로 저장되있기 때문에 JSON.parse사용
    parsedToDos.forEach(function(toDo){
        paintToDo(toDo.text);
    })
  }
}

function init(){
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();