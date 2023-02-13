var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector('#tasks-to-do');

var createTaskHandler = function(event){
  //prevent the form's "submit" event from reloading the page each time
  event.preventDefault();

  var listItemEl = document.createElement('li');
  listItemEl.className = 'task-item';
  listItemEl.textContent = "New task added";
  tasksToDoEl.appendChild(listItemEl);
}

formEl.addEventListener('submit', createTaskHandler);
