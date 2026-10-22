// TO-DO LIST APP

// Get references to HTML elements
const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addTaskBtn");
const list = document.getElementById("taskList");

// Load saved tasks from local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Display tasks when page loads
renderTasks();

// Add task button
addBtn.addEventListener("click", addTask);

// Allow Enter key to add task
input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Add task
function addTask() {

    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const task = {
        text: taskText,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    renderTasks();

    input.value = "";
}

// Display tasks
function renderTasks() {

    list.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");
        li.classList.add("task-item");

        const span = document.createElement("span");
        span.textContent = task.text;

        if (task.completed) {
            span.classList.add("completed");
        }

        const buttonContainer = document.createElement("div");

        // Complete Button
        const completeBtn = document.createElement("button");
        completeBtn.textContent = "✓";
        completeBtn.classList.add("complete-btn");

        completeBtn.addEventListener("click", () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });

        // Delete Button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑️";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        buttonContainer.appendChild(completeBtn);
        buttonContainer.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(buttonContainer);

        list.appendChild(li);
    });
}

// Save tasks
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}