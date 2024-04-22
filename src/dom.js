import { project } from './index.js';
import { isExists } from "date-fns";

export function appendTodo(currentTodo){
    const todoDiv = document.createElement("div"); 
    todoDiv.classList.add("todo-div");
    todoDiv.id = `${project} ${currentTodo}`;

    const btnDiv = document.createElement("div");
    btnDiv.classList.add("btn-div");
    todoDiv.appendChild(btnDiv);

    const checkBtn = document.createElement("button");
    checkBtn.classList.add("check-btn");
    if(localStorage.getItem(`${project} ${currentTodo} check`) == "true"){
        checkBtn.classList.add("checked-btn");
    } else {
        localStorage.setItem(`${project} ${currentTodo} check`, false);
    };
    checkBtn.addEventListener("click", function(){
        if(localStorage.getItem(`${project} ${currentTodo} check`) == "false"){
            localStorage.setItem(`${project} ${currentTodo} check`, true);
            checkBtn.classList.add("checked-btn");
        } else{
            localStorage.setItem(`${project} ${currentTodo} check`, false);
            checkBtn.classList.remove("checked-btn");
        }
    });
    const checkImg = document.createElement("img");
    checkImg.src = "../src/img/check.png";
    checkImg.alt = `Check ${localStorage.getItem(`${project} ${currentTodo} title`)} from ${project}`;
    checkImg.classList.add("icon");
    checkBtn.appendChild(checkImg);
    btnDiv.appendChild(checkBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.addEventListener("click", function(){
        let toEdit = prompt("What part do you want to edit? (title, description, date, priority):");
        if(toEdit.toLowerCase() == "title" || toEdit.toLowerCase() == "description"){
            let edit = prompt("Enter the edited input:");
            if(edit == ""){
                window.alert("The input cannot be empty.");
            } else {
                localStorage.setItem(`${project} ${currentTodo} ${toEdit.toLowerCase()}`, edit);
            }
        } else if(toEdit.toLowerCase() == "priority") { 
            let edit = prompt("Priority of todo (Low, Medium, High):");
                if(edit.toLowerCase() == "low"
                    || edit.toLowerCase() == "medium"
                    || edit.toLowerCase() == "high"){
                        localStorage.setItem(`${project} ${currentTodo} priority`, edit);
                    } else {
                        window.alert("Invalid priority.");
                    }
        } else if(toEdit.toLowerCase() == "date"){
            let dateMonth = prompt("Month of todo (number):");
            if(dateMonth == 0 || dateMonth == ""){
                window.alert("You need to add the month of the todo.");
            } else {
                let dateDay = prompt("Day of todo:");
                if(dateDay == 0 || dateDay == ""){
                    window.alert("You need to add the day of the todo.");
                } else {
                    let dateYear = prompt("Year of todo:");
                    // Converting the strings to numbers
                    dateMonth = parseFloat(dateMonth); dateDay = parseFloat(dateDay); dateYear = parseFloat(dateYear);
                    if(!isExists(dateYear, dateMonth - 1, dateDay)){
                        window.alert("Invalid date.");
                    } else {
                        localStorage.setItem(`${project} ${currentTodo} dueDate`, `${dateMonth}/${dateDay}/${dateYear}`);
                    }
                }
            }
        } else {
            window.alert("Invalid element.")
        }
        clearTodos();
        loadTodos();
    });
    const editImg = document.createElement("img")
    editImg.src = "../src/img/edit.png";
    editImg.alt = `Edit ${localStorage.getItem(`${project} ${currentTodo} title`)} from ${project}`;
    editImg.classList.add("icon");
    editBtn.appendChild(editImg);
    btnDiv.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    const deleteImg = document.createElement("img")
    deleteImg.src = "../src/img/delete.png";
    deleteImg.alt = `Delete ${localStorage.getItem(`${project} ${currentTodo} title`)} from ${project}`;
    deleteImg.classList.add("icon");
    deleteBtn.appendChild(deleteImg);
    btnDiv.appendChild(deleteBtn);

    const todoContentDiv = document.createElement("div");
    todoContentDiv.classList.add("todo-content-div");
    todoDiv.appendChild(todoContentDiv);

    const todoTitle = document.createElement("h3");
    todoTitle.classList.add("todo-title");
    todoTitle.textContent = localStorage.getItem(`${project} ${currentTodo} title`);
    todoContentDiv.appendChild(todoTitle);

    const todoDescription = document.createElement("p");
    todoDescription.classList.add("todo-description");
    todoDescription.textContent = localStorage.getItem(`${project} ${currentTodo} description`);
    todoContentDiv.appendChild(todoDescription);

    const todoDueDate = document.createElement("p");
    todoDueDate.classList.add("todo-due-date");
    todoDueDate.textContent = `Due date: ${localStorage.getItem(`${project} ${currentTodo} dueDate`)}`;
    todoContentDiv.appendChild(todoDueDate);

    const todoPriority = document.createElement("p");
    todoPriority.classList.add("todo-priority");
    todoPriority.classList.add(localStorage.getItem(`${project} ${currentTodo} priority`));
    todoPriority.textContent = `Priority: ${localStorage.getItem(`${project} ${currentTodo} priority`)}`;
    todoContentDiv.appendChild(todoPriority);

    const todos = document.getElementById("todos");
    todos.appendChild(todoDiv);
}

export function loadTodos(){
    if(localStorage.getItem(`${project} todoAmount`)){
        let amount = Number(localStorage.getItem(`${project} todoAmount`));
        for(let i = 0; i < amount; i++){
            let current = i + 1;
            appendTodo(current);
        }
    }
}

function clearTodos(){
    document.getElementById("todos").innerHTML = "";
}