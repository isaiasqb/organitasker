var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector('#tasks-to-do');
// start a variable that holds a unique id number for each task
var taskIdCounter = 0;


var taskFormHandler = function(event){
  //prevent the form's "submit" event from reloading the page each time
  event.preventDefault();

  //getting the value of the name input and the dropdown input
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  //check that imput values are not empty strings
  if (!taskNameInput || !taskTypeInput) {
    alert(`Please fill out the form completely`);
    return false;
  }

  formEl.reset();

  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  };

  createTaskEl(taskDataObj)
};

var createTaskEl = function(taskDataObj){
  //create a <li> item
  var listItemEl = document.createElement('li');
  listItemEl.className = 'task-item';

  // add a unique task id as a custom attribute
  listItemEl.setAttribute("data-task-id", taskIdCounter)
  
  // create <div> to hold the task info and add it to the <li> item
  var taskInfoEl = document.createElement("div");
  //give it a class name
  taskInfoEl.className = "task-info";
  //add HTML content to the task-info <div>
  taskInfoEl.innerHTML = "<h3 class='task-name'>"+taskDataObj.name+"</h3><span class='task-type'>"+taskDataObj.type+"</span>"
  //add the name title and the type tag to the list item
  listItemEl.appendChild(taskInfoEl);
  //add entire list item to the list
  tasksToDoEl.appendChild(listItemEl);

  //increase the counter for a new unique id
  taskIdCounter++;
};

formEl.addEventListener('submit', taskFormHandler);
