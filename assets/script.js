// console.dir(document); show doc DOM elmnts
let buttonEl = document.querySelector("#save-task");
let listEl = document.querySelector(".task-list");
//var tasksToDoEl = document.querySelector("#tasks-to-do");

let createTaskHandler = function(){
    let taskItemEl= document.createElement("li");
    taskItemEl.className="task-item";
    taskItemEl.textContent="task created";
      listEl.appendChild(taskItemEl);
}
buttonEl.addEventListener("click", createTaskHandler)