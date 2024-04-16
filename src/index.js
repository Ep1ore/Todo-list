const newBtn = document.getElementById("new-btn");
newBtn.addEventListener("click", addTodo);

function addTodo() {
    const title = prompt("Title of todo:")
    const description = prompt("Description:")
    const dueDate = prompt("Due date of todo (use MM/DD/YYYY) format:")
    const priority = prompt("Priority of todo (Low, Medium, High):")
}
