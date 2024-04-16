import { isExists } from "date-fns";

const newBtn = document.getElementById("new-btn");
newBtn.addEventListener("click", addTodo);

let title = "";
let description = "";
let dateYear = 0;
let dateMonth = 0;
let dateDay = 0;
let priority = "";

function addTodo() {
    title = prompt("Title of todo:")
    if(title == ""){
        window.alert("You need a title for your todo.");
    } else {
        description = prompt("Description:")
        dateMonth = prompt("Month of todo (number):");
        if(dateMonth == 0){
            window.alert("You need to add the month of the todo.");
        } else {
            dateDay = prompt("Day of todo:");
            if(dateDay == 0){
                window.alert("You need to add the day of the todo.");
            } else {
                dateYear = prompt("Year of todo:");
                // Converting the strings to numbers
                dateMonth = parseFloat(dateMonth); dateDay = parseFloat(dateDay); dateYear = parseFloat(dateYear);
                if(!isExists(dateYear, dateMonth - 1, dateDay)){
                    window.alert("Invalid date.");
                } else {
                    priority = prompt("Priority of todo (Low, Medium, High):")
                    priority = priority.toLowerCase();
                    if(priority !== "low" && priority !== "medium" && priority !== "high"){
                        window.alert("Invalid priority.");
                    } else {
                        console.log("Valid todo!");
                    }
                }
            }
            
        }
    }
}
