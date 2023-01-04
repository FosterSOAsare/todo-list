import { Todo } from "./imports/Todo.js";
let todos = new Todo();
// Set theme on start
(function () {
    let theme = localStorage.getItem("theme");
    theme = theme ? theme : "";
    theme == "" ? localStorage.setItem("theme", "") : setTheme(theme);
})();
function setTheme(theme) {
    theme == "dark" ? document.body.classList.add(theme) : document.body.classList.contains("dark") ? document.body.classList.remove("dark") : "";
}
// Toggling Theme
(function () {
    let toggle = document.querySelector(".switch");
    toggle.addEventListener("click", () => {
        let theme = localStorage.getItem("theme");
        theme = theme == "dark" ? "" : "dark";
        setTheme(theme);
        localStorage.setItem("theme", theme);
    });
})();
// Fetch localStorage  or set one if there is no localStorage
(function () {
    const data = localStorage.getItem("todos");
    todos.setTodos(data ? JSON.parse(data) : []);
    todos.createTodoItems();
    // Setting local Storage
    if (todos.getTodos().length)
        return;
    localStorage.setItem("todos", JSON.stringify(todos));
})();
// Show New Task Form
(function () {
    let plus = document.querySelector(".plus");
    let newForm = document.querySelector("#new");
    let input = newForm.querySelector("input");
    plus.addEventListener("click", () => {
        newForm.style.display = "flex";
        plus.style.display = "none";
        input.focus();
    });
})();
// // Add Task
(function () {
    let newForm = document.querySelector("#new");
    let plus = document.querySelector(".plus");
    let addTaskForm = document.querySelector("form");
    addTaskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let formData = new FormData(addTaskForm);
        let task = formData.get("task");
        // Check to see if task already exists
        let exists = Array.from(todos.getTodos()).find((e) => e.data == task);
        exists && alert("Task already exists");
        !task && alert("Please enter a task");
        if (task && !exists) {
            // Save content
            let data = {
                data: task.toString(),
                priority: 0,
                status: "incomplete",
            };
            let newData = Array.from(todos.getTodos());
            newData.push(data);
            todos.setTodos(newData);
            // Store Data
            localStorage.setItem("todos", JSON.stringify(todos.getTodos()));
            // Clear Input field and Hide Input Field showing the plus sign
            let input = addTaskForm.querySelector("input");
            input.value = "";
            input.focus();
            // Display new task
            todos.createTodoItem(data);
        }
    });
})();
