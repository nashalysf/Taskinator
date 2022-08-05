// console.dir(document); show doc DOM elmnts
//
//form var lets the btn and ENTER KEY to work
let formEl = document.querySelector("#task-form");
let tasksToDoEl = document.querySelector("#tasks-to-do");
/* When we use square brackets [ ] in a selector, we're trying to select an HTML element by one of its attributes. 
In this case, we're selecting the <input> element that has a name attribute set to a value of "task-name" */

let createTaskHandler = function(event){
    event.preventDefault();
    let taskNameInput = document.querySelector("input[name='task-name']").value;
    let taskTypeInput = document.querySelector("select[name='task-type']").value;
    // create list item
    let taskItemEl= document.createElement("li");
    taskItemEl.className="task-item";
    // create a div to hold task info and add to list item
    let taskInfoEl = document.createElement('div');
    // give class name
    taskInfoEl.className = "task-info";
    // add html content to div
    taskInfoEl.innerHTML= "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    taskItemEl.appendChild(taskInfoEl);
    // add entire list item to list
    tasksToDoEl.appendChild(taskItemEl); 
};
//bc event happens at the form not the btn
formEl.addEventListener("submit", createTaskHandler);


// difference between .innerHTML && .textContent:
//The textContent property only accepts text content values. If it saw an HTML tag written in as a value, it would literally display the markup characters for that HTML tag without interpreting it as the HTML tag.
//The innerHTML property allows us to write HTML tags inside the string value we're giving it. 