"use strict";
let switches = document.getElementsByClassName('switch');

let cal_s_bool = false;

let calendar_switches = document.getElementsByClassName('calendar-switch');

let day_switches = document.getElementsByClassName('day-switch');

let style = localStorage.getItem('style');

let day = localStorage.getItem('day');

if (style == null) {
  setTheme('light');
} else {
  setTheme(style);
}

if (day == null) {
  setDay('Mo');
} else {
  setDay(day);
}

for (let i of switches) {
  i.addEventListener('click', function () {
    let theme = this.dataset.theme;
    setTheme(theme);
  });
}
for (let i of calendar_switches) {
i.addEventListener('click',function(){
  cal_s_bool = !cal_s_bool;
  console.log(cal_s_bool);
  if(cal_s_bool){
  document.getElementById('calendar').style.display = "none";
  }else{
    document.getElementById('calendar').style.display = "flex";
  }
});
}

for (let i of day_switches) {
  i.addEventListener('click', function () {
    let day = this.dataset.day;
    setDay(day);
    location.reload();
  });
}

function setTheme(theme) {
  if (theme == 'light') {
    document.getElementById('switcher-id').href = 'themes/light.css';
  } else if (theme == 'sky') {
    document.getElementById('switcher-id').href = 'themes/sky.css';
  } else if (theme == 'dark') {
    document.getElementById('switcher-id').href = 'themes/dark.css';
  }
  localStorage.setItem('style', theme);
}

function setDay(day) {
  localStorage.setItem('day', day);
}

const toDoInput = document.querySelector('.todo-input');
const toDoBtn = document.querySelector('.todo-btn');
const toDoList = document.querySelector('.taskList');

toDoBtn.addEventListener('click', addToDo);
toDoList.addEventListener('click', deletecheck);


function addToDo(event) {
  // Prevents form from submitting / Prevents form from relaoding;
  event.preventDefault();
  let style = localStorage.getItem('style');
  // toDo DIV;
  const toDoDiv = document.createElement("div");
  toDoDiv.classList.add('todo');

  // Create LI
  const newToDo = document.createElement('li');
  if (toDoInput.value === '') {
          alert("You must write something!");
          
      } 
  else {
      // newToDo.innerText = "hey";
      newToDo.innerText = toDoInput.value;
      newToDo.classList.add('todo-item');
      toDoDiv.appendChild(newToDo);

      // Adding to local storage;
      savelocal(toDoInput.value);

      let time = prompt("Please enter an amount of time in seconds after wich you wanna receive a notification about this task", "10");
      

      // check btn;
      const checked = document.createElement('button');
      checked.innerHTML = '<i class="fa-sharp fa-solid fa-check"></i>';
      checked.classList.add('check-btn', `${style}-button`);
      toDoDiv.appendChild(checked);
      // delete btn;
      const deleted = document.createElement('button');
      deleted.innerHTML = '<i class="fa-sharp fa-solid fa-trash"></i>';
      deleted.classList.add('delete-btn', `${style}-button`);
      toDoDiv.appendChild(deleted);

      // Append to list;
      toDoList.appendChild(toDoDiv);

      // CLearing the input;
      toDoInput.value = '';

      let string = "A small remainder for task " + newToDo.innerText;
      setTimeout(function() {if(toDoList.hasChildNodes(toDoDiv)){alert(string);} }, time*1000);

  }

}   


function deletecheck(event){

  // console.log(event.target);
  const item = event.target;

  // delete
  if(item.classList[0] === 'delete-btn')
  {
      // item.parentElement.remove();
      // animation
      item.parentElement.classList.add("fall");

      //removing local todos;
      removeLocalTodos(item.parentElement);

      item.parentElement.addEventListener('transitionend', function(){
          item.parentElement.remove();
      })
  }

  // check
  if(item.classList[0] === 'check-btn')
  {
      item.parentElement.classList.toggle("completed");
  }


}


// Saving to local storage:
function savelocal(todo){
  //Check: if item/s are there;
  let todos;
  if(localStorage.getItem('todos-'+day) === null) {
      todos = [];
  }
  else {
      todos = JSON.parse(localStorage.getItem('todos-'+day));
  }

  todos.push(todo);
  localStorage.setItem('todos-' + day, JSON.stringify(todos));
}

// window.onload = function () {
//   var reloading = sessionStorage.getItem("reloading");
//   if (reloading) {
//       sessionStorage.removeItem("reloading");
//       getTodos();
//     }
// }

window.onload = getTodos();

function getTodos() {
  let style = localStorage.getItem('style');
  //Check: if item/s are there;
  let todos;
  if(localStorage.getItem('todos-' + day) === null) {
      todos = [];
  }
  else {
      todos = JSON.parse(localStorage.getItem('todos-' + day));
  }

  todos.forEach(function(todo) {
      // toDo DIV;
      const toDoDiv = document.createElement("div");
      toDoDiv.classList.add("todo");

      // Create LI
      const newToDo = document.createElement('li');
      
      newToDo.innerText = todo;
      newToDo.classList.add('todo-item');
      toDoDiv.appendChild(newToDo);

      // check btn;
      const checked = document.createElement('button');
      checked.innerHTML = '<i class="fa-sharp fa-solid fa-check"></i>';
      checked.classList.add("check-btn", `${style}-button`);
      toDoDiv.appendChild(checked);
      // delete btn;
      const deleted = document.createElement('button');
      deleted.innerHTML = '<i class="fa-sharp fa-solid fa-trash"></i>';
      deleted.classList.add("delete-btn", `${style}-button`);
      toDoDiv.appendChild(deleted);

      // Append to list;
      toDoList.appendChild(toDoDiv);
  });
}


function removeLocalTodos(todo){
  //Check: if item/s are there;
  let todos;
  if(localStorage.getItem('todos-' + day) === null) {
      todos = [];
  }
  else {
      todos = JSON.parse(localStorage.getItem('todos-' + day));
  }

  const todoIndex =  todos.indexOf(todo.children[0].innerText);
  // console.log(todoIndex);
  todos.splice(todoIndex, 1);
  // console.log(todos);
  localStorage.setItem('todos-' + day , JSON.stringify(todos));
}


// const taskInput = document.getElementById('todo-input');
// const addTaskBtn = document.getElementById('todo-btn');
// const taskList = document.getElementById('taskList');
// let tasks = [];


// function addTask() {
// const taskValue = taskInput.value;

// if (taskValue === '') {
//   alert('Please enter a task');
//   return;
// }

// const newTask = {
//   id: Date.now(),
//   text: taskValue,
//   completed: false,
// };
// tasks.push(newTask);

// taskInput.value = '';

// renderTasks();
// }

// addTaskBtn.addEventListener('click', addTask);
// taskList.addEventListener('click', deleteTask);

// taskInput.addEventListener('keyup', function(event) {
//   if (event.keyCode === 13) {
//     addTask();
//   }
// });

// function renderTasks() {
//   taskList.innerHTML = '';

//   tasks.forEach(task => {
//     const li = document.createElement('li');
//     li.dataset.id = task.id;
//     li.innerText = task.text;
//     if (task.completed) {
//       li.classList.add('completed');
//     }
//     taskList.appendChild(li);
//   });
// }

// function deleteTask(event) {
//   if (event.target.tagName === 'LI') {
//     const taskId = Number(event.target.dataset.id);

//     tasks = tasks.filter(task => task.id !== taskId);

//     renderTasks();
//   }
// }


