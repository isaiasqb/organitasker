var pageContentEl = document.querySelector("#page-content");
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector('#tasks-to-do');
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed"); 
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

  //if data-task-id attribute has been added ot the form, it means you are editing a task
  var isEdit = formEl.hasAttribute("data-task-id");
  console.log(`editing a task? - ${isEdit}`)

  if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeTaskEdit(taskNameInput, taskTypeInput, taskId);
  } 
  else {
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput
    };

    createTaskEl(taskDataObj)
  }
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


//function to get the individual ID form the button clicked
var taskButtonHandler = function(event){
  //which element was clicked and triggered the event?
  console.log(event.target);

  var targetEL = event.target;

  // EDIT button is clicked
  if (targetEL.matches(".edit-btn")) {
    var taskId = targetEL.getAttribute("data-task-id");
    console.log(`taskButtonHandler(): EDIT BUTTON Task #${taskId}`);
    //pass the ID to the editTask() function
    editTask(taskId);
  }
  //DELETE button is clicked
  else if (targetEL.matches(".delete-btn")) {
    var taskId = event.target.getAttribute("data-task-id");
    console.log(`taskButtonHandler(): DELETE BUTTON Task #${taskId}`);
    //pass the ID to the deleteTask() function
    deleteTask(taskId);
  } 
};


// EDIT a task - takes taskId parameter form taskButtonHandler()
var editTask = function(taskId) {

  var taskSelected = document.querySelector(`.task-item[data-task-id="${taskId}"]`);
  //get task name and task type info
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  console.log(taskName);
  document.querySelector(`input[name="task-name"]`).value = taskName;
  var taskType = taskSelected.querySelector("span.task-type").textContent;
  console.log(taskType);
  document.querySelector(`select[name="task-type"]`).value = taskType;

  //change the text on the ADD button 
  document.querySelector("#save-task").textContent = "Save Changes";

  //assign the ID from the edited task to the form
  formEl.setAttribute("data-task-id", taskId);
};


//function for finishing editing a task that gets called if the FOR element has been assigned a data-task-id attribute
var completeTaskEdit = function(taskName, taskType, taskId) {
  console.log(`completeTaskEdit() - name: ${taskName}, type: ${taskType}, id: ${taskId}`);

  var taskSelected = document.querySelector(`.task-item[data-task-id="${taskId}"]`);

  //set new values
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  alert("Task updated!")
  formEl.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "Add Task";
};


// DELETE a task - takes taskId parameter form taskButtonHandler()
var deleteTask = function(taskId) {

  var taskSelected = document.querySelector(`.task-item[data-task-id="${taskId}"]`);
  taskSelected.remove();
}


// CHANGE status of the task
var taskStatusChangeHandler = function(event){

  // //get the task item's id
  var taskId = event.target.getAttribute("data-task-id");
  console.log("Task changing status is:" + taskId)

  //get currert selected option's value and convert to lowercase
  var statusValue = event.target.value.toLowerCase();
  console.log("Task changing status to:" + statusValue)

  //find the parent task item element based on the id
  var taskSelected = document.querySelector(`.task-item[data-task-id="${taskId}"]`)
  console.log("taskSelected: " + taskSelected)

  // //change the task to the list correnpondig to the status
  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } 
  else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } 
  else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }
};


// listens for anu clicks on the <main> portion of the document
pageContentEl.addEventListener('click', taskButtonHandler)

// listens for any changes on the <main> portion of the document
pageContentEl.addEventListener("change", taskStatusChangeHandler)