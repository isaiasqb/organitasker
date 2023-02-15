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

  var taskActionEl = createTaskActions(taskIdCounter );
  listItemEl.appendChild(taskActionEl);

  //add entire list item to the list
  tasksToDoEl.appendChild(listItemEl);

  //increase the counter for a new unique id
  taskIdCounter++;
};


//dinamically create the form elements inside each individual task item
var createTaskActions = function(taskId) {
  //create a <div> that will contain all the form elements to edit the task
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  //create the EDIT button
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  //assign the unique id to this button from the parameter
  editButtonEl.setAttribute("data-task-id", taskId); 

  actionContainerEl.appendChild(editButtonEl);

  //create the DELETe button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(deleteButtonEl);

  //Create the DROPDOWN for changing the task status
  var statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(statusSelectEl); 

  //create the DROPDOWN choices
  var statusChoices = ["To Do","In Progress","Completed"]
  for (let i = 0; i < statusChoices.length; i++) {
    //create an option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);
    
    //append to the select element
    statusSelectEl.appendChild(statusOptionEl);
  }
  return actionContainerEl;
}

formEl.addEventListener('submit', taskFormHandler);
