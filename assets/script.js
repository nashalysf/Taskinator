// console.dir(document); show doc DOM elmnts
//
let taskIdCounter = 1;
let tasks = [];
//form var lets the btn and ENTER KEY to work
let formEl = document.querySelector("#task-form");
//selects div where list items will appear and creates unique id to each item
let tasksToDoEl = document.querySelector("#tasks-to-do");
let taskInprogressEl = document.querySelector("#task-in-progress");
let taskCompletedEl = document.querySelector("#task-completed");
let pageContentEl = document.querySelector("#page-content");
//
//
let taskFormHandler = function (event) {
  event.preventDefault();
  /* When we use square brackets [ ] in a selector, we're trying to select an HTML element by one of its attributes. 
In this case, we're selecting the <input> element that has a name attribute set to a value of "task-name" */
  let taskNameInput = document.querySelector("input[name='task-name']").value;
  let taskTypeInput = document.querySelector("select[name='task-type']").value;
  const taskDataObj = {
    id: taskIdCounter,
    name: taskNameInput,
    type: taskTypeInput,
    status: "to do"
  };
  // dont accept empty values
  if (!taskTypeInput || !taskNameInput) {
    alert("Please fill out the form!");
    return false;
  }
  //when added to list clear input for new task name
  formEl.reset(); 
  let isEdit = formEl.hasAttribute("data-task-id");
  // has data attribute, so get task id and call function to complete edit process
  if (isEdit) {
    let taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  }
  // no data attribute, so create object as normal and pass to createTaskEl function
  else {
    createTaskEl(taskDataObj);
    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);
    saveTasks();
  }
};
//
//
let createTaskEl = function (taskDataObj) {
  // create list item with class name to inherit style and task id as a custom attr
  let taskItemEl = document.createElement("li");
  taskItemEl.className = "task-item";
  taskItemEl.setAttribute("data-task-id", taskIdCounter);
  // create a div to hold task info and add to list item
  let taskInfoEl = document.createElement("div");
  // give class name
  taskInfoEl.className = "task-info";
  // add html content to div
  taskInfoEl.innerHTML ="<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  taskItemEl.appendChild(taskInfoEl);
  let taskActionsEl = createTaskActions(taskIdCounter);
  taskItemEl.appendChild(taskActionsEl);
  taskDataObj.id = taskIdCounter;
  tasks.push(taskDataObj);
  taskIdCounter++;
  // add list item to list and generate unique id to next task
  tasksToDoEl.appendChild(taskItemEl);
  saveTasks();
  
};
let createTaskActions = function (taskId) {
  let actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";
  //edit btn
  let editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(editButtonEl);

  //delete btn
  let deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(deleteButtonEl);

  //select elmnt
  let statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(statusSelectEl);

  //status select OPTIONS elemnts in for loop to DRY
  let statusChoices = ["To do", "In progress", "Completed"];
  for (let i = 0; i < statusChoices.length; i++) {
    let statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);
    statusSelectEl.appendChild(statusOptionEl);
  }
  return actionContainerEl;
};
//bc event happens at the form not the btn
var completeEditTask = function(taskName, taskType, taskId) {
    // find task list item with taskId value
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  
    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;
    
    for (i = 0; i < tasks.length; i++){
        if(tasks[i].id === parseInt(taskId)){
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
        saveTasks();
    };
  
    // remove data attribute from form
    formEl.removeAttribute("data-task-id");
    // update formEl button to go back to saying "Add Task" instead of "Edit Task"
    formEl.querySelector("#save-task").textContent = "Add Task";
  };
  let taskButtonHandler = function (event) {
    let targetEl = event.target;
    if (targetEl.matches(".delete-btn")) {
      let taskId = targetEl.getAttribute("data-task-id");
      deleteTask(taskId);
    } else if (targetEl.matches(".edit-btn")) {
      let taskId = targetEl.getAttribute("data-task-id");
      editTask(taskId);
    }
  };

let deleteTask = function (taskId) {
  let taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );
  taskSelected.remove();

// loop through current tasks
for (var i = 1; i < tasks.length; i++) {
  // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
  if (tasks[i].id !== parseInt(taskId)) {
    tasks.shift(tasks[i]);
  } else{
    tasks.pop(tasks[i]);
  }
}
// reassign tasks array to be the same as updatedTaskArr
console.log(tasks);
saveTasks();
};
let editTask = function (taskId) {
  // get task list item element
  let taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );
  // get content from task name and type
  let taskName = taskSelected.querySelector("h3.task-name").textContent;
  let taskType = taskSelected.querySelector("span.task-type").textContent;
  //show on input to edit scooping global var
  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;
  //change btn
  let saveButton = (document.querySelector("#save-task").textContent = "Save");
  //keeps track of which task is being edited + confirms that task is edited (not created) cause id exists
  formEl.setAttribute("data-task-id", taskId);
};

let taskStatusChangeHandler = function (event) {
    // get the task item's id
  let taskId = event.target.getAttribute("data-task-id");
  event.target.getAttribute("data-task-id");
    // find the parent task item element based on the id
  let taskSelected = document.querySelector( ".task-item[data-task-id='" + taskId + "']" );
     // get the currently selected option's value and convert to lowercase
    let statusValue = event.target.value.toLowerCase();
    if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } else if (statusValue === "in progress") {
    taskInprogressEl.appendChild(taskSelected);
  } else if (statusValue === "completed") {
    taskCompletedEl.appendChild(taskSelected);
  }
  //it didn't create a copy of the task rather moved the task item from its original location in the DOM into the other <ul>
  // didn't create a second <li>. That would only be the case if we used document.createElement()
  for (var i = 1; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].status = statusValue;
    }
}
saveTasks();
};
let saveTasks = function(){
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
let loadTasks = function(){
  let savedtasks = localStorage.getItem("tasks");
  console.log(savedtasks);
  if(!savedtasks){
    return false;
  } 
  //Converts tasks from the string format back into an array of objects.
  savedtasks = JSON.parse(savedtasks);
  for (var i = 1; i < savedtasks.length; i++) {
    createTaskEl(savedtasks[i]);
  }
    savedtasks[i] = taskIdCounter;
    console.log('Task found!');
  }

formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);
loadTasks();