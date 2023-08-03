let noOfTasksCompleted = 0;
let tasksLeft = "";
let toDoList = [];
isDelete = true;
const inputEl = document.querySelector("#input-el");
const inputBtn = document.querySelector("#input-btn");
const ulEl = document.querySelector("#ul-el");
const completedTask = document.querySelector("#completed");
const incompleteTask = document.querySelector("#incomplete");
const allTask = document.querySelector("#all");
const clearAll = document.querySelector("#clear-All");
const completeAllTasks = document.querySelector("#complete-all");
function rendertoDoList(arr) {
  toDoList = arr ? arr : JSON.parse(localStorage.getItem("list") || "[]");

  document.getElementById("count").innerText = arr
    ? arr.length
    : toDoList.length;
  console.log(toDoList.length);
  let listItems = "";
  for (let i = 0; i < toDoList.length; i++) {
    if (arr) {
      listItems += `<li> ${toDoList[i]?.name}</li>`;
    } else {
      listItems += `<li class='option'>
              <div class='option-list-item'>
                  <input type='checkbox' id='${
                    toDoList[i]
                  }' class='checkBox' onclick='checkButton("${i}")' ${
        toDoList[i]?.isChecked ? "checked" : ""
      } >
                  <label for='${toDoList[i]}'>${toDoList[i]?.name}</label>
              </div>
              <button  type='button' id='toggle' class='deleteItemFromList' onclick='deleteButton("${i}")' class='deleteBtn'>X</button>
          </li>`;
    }
  }
  ulEl.innerHTML = listItems;
}
rendertoDoList();
inputBtn.addEventListener("click", function () {
  if (inputEl.value === "") {
    return;
  } else {
    let todo = {
      name: inputEl.value,
      id: toDoList.length,
      isChecked: false,
    };
    console.log(todo.id);
    toDoList.push(todo);
    localStorage.setItem("list", JSON.stringify(toDoList));
    inputEl.value = "";
    rendertoDoList();
  }
});
inputEl.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    inputBtn.click();
  }
});

allTask.addEventListener("click", function () {
  rendertoDoList();
});

completeAllTasks.addEventListener("click", function () {
  toDoList = JSON.parse(localStorage.getItem("list") || "[]");
  toDoList = [
    ...toDoList.map((todo) => {
      return { ...todo, isChecked: true };
    }),
  ];
  localStorage.setItem("list", JSON.stringify(toDoList));

  rendertoDoList();
  console.log(toDoList);
});

clearAll.addEventListener("click", function () {
  localStorage.clear();
  toDoList.length = 0;
  rendertoDoList();
});

completedTask.addEventListener("click", function () {
  let completedList = JSON.parse(localStorage.getItem("list") || "[]");
  completedList = completedList.filter((todo) => todo.isChecked === true);
  console.log(completedList);
  // localStorage.setItem("list", JSON.stringify(toDoList))
  rendertoDoList(completedList);
});

incompleteTask.addEventListener("click", function () {
  let incompleteTask = JSON.parse(localStorage.getItem("list") || "[]");
  incompleteTask = incompleteTask.filter((todo) => todo.isChecked === false);

  //localStorage.setItem("list", JSON.stringify(toDoList))
  rendertoDoList(incompleteTask);
});

function deleteButton(index) {
  toDoList = JSON.parse(localStorage.getItem("list") || "[]");
  toDoList.splice(index, 1);
  // toDoList = toDoList.filter((arrayValue) => arrayValue.name !== del)
  localStorage.setItem("list", JSON.stringify(toDoList));

  rendertoDoList();
}

function checkButton(index) {
  toDoList = JSON.parse(localStorage.getItem("list") || "[]");
  toDoList[index].isChecked = !toDoList[index].isChecked;

  // })
  localStorage.setItem("list", JSON.stringify(toDoList));
  console.log(toDoList);

  rendertoDoList();
}
