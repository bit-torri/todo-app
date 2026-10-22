//TO-DO LIST APP

//get ref to important elements
const input = document.getElementById("input");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("list");

//retrieve tasks from local storage/if no tasks exists, create empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//display tasks on page load
renderTasks();

//event listener for add button
addBtn.addEventListener("click", addTask);

//allow use to add task /using enter key
input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

//ADDING TASKS
function addTask() {
    //remove extra spaces
    const taskText = input.value.trim();
    //prevent adding empty tasks
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    //create task object
    const task = {
        text: taskText,
        completed: false
    };
    //add task to tasks array
    tasks.push(task);
    //save tasks to local storage
    saveTasks();
    //render tasks
    renderTasks();
    //clear input field
    input.value = "";
}

//DISPLAYING TASKS
function renderTasks() {
    //clear existing tasks
    list.innerHTML = "";

    //loop through tasks and create list items
    tasks.forEach((task, index) => {
        //create list item
        const li = document.createElement("li");
        li.classList.add("task-item");

        //create span for task text
        const span = document.createElement("span");
        span.textContent = task.text;
        //add completed class if task is completed
        if (task.completed) {
            span.classList.add("completed");
        }
        
        //create button container
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-group");

        //create complete button
        const completeBtn = document.createElement("button");
        completeBtn.textContent = "✓";
        completeBtn.classList.add("complete-btn");

        //toggle completed status on click
        completeBtn.addEventListener("click", () => {
            //change true to false and vice versa
            task.completed = !task.completed;

            saveTasks();
            renderTasks();
        });

        //add buttons to list item
        buttonContainer.appendChild(completeBtn);
        buttonContainer.appendChild(deleteBtn);

        //add task text and buttons to list item
        li.appendChild(span);
        li.appendChild(buttonContainer);

        //add task item to list
        list.appendChild(li);
    }); 
}

//SAVING TASKS

//converts tasks array to text
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
        