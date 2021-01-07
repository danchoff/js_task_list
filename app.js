//DEFINE UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// CALLING LOAD ALL EVENT LISTENERS Function
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  //DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  //ADD task event
  form.addEventListener('submit', addTask);

  //Remove task event
  taskList.addEventListener('click', removeTask);

  //Clear task events
  clearBtn.addEventListener('click', clearTasks);

  //Filter tasks
   filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from LocalStorage
function getTasks(e) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
      //create li element
    const li = document.createElement('li');
    // add class
    li.className = 'collection-item';
    // create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class ="fa fa-remove"></i>';
    // append the link to li
    li.appendChild(link);

    // append the li to ul

    taskList.appendChild(li);
  });
}

// ADD task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task');
  }
  //create li element
  const li = document.createElement('li');
  // add class
  li.className = 'collection-item';
  // create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // add class
  link.className = 'delete-item secondary-content';
  // add icon html
  link.innerHTML = '<i class ="fa fa-remove"></i>';
  // append the link to li
  li.appendChild(link);

  // append the li to ul

  taskList.appendChild(li);

  // Store in LocalStorage
  storeTaskInLocalStorage(taskInput.value);

  // clear input

  taskInput.value = '';

  e.preventDefault();
}

// STORE TASK
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//remove task
function removeTask(e) {
  if(e.target.parentElement.classList.contains 
    ('delete-item')) {
      if (confirm('Are You Sure You Want To Delete This Item?')) {
      
      e.target.parentElement.parentElement.remove();

      // Remove from localstorage
      removeTaskFromLocalStorage (e.target.parentElement.parentElement);
    }
  }  
}

// Remove from LocalStorage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
  // SIMPLE METHOD   taskList.innerHTML = '';

  //FASTER METHOD - LOOPING
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // CLEAR FROM LOCALSTORAGE  
  clearTasksFromLocalStorage();
}

// clear tasks from localstorage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach
  (function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}