var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var todos = [];
// Set theme on start
(function () {
    var theme = localStorage.getItem("theme");
    theme = theme ? theme : "";
    theme == "" ? localStorage.setItem("theme", "") : setTheme(theme);
})();
function setTheme(theme) {
    theme == "dark" ? document.body.classList.add(theme) : document.body.classList.contains("dark") ? document.body.classList.remove("dark") : "";
}
// Toggling Theme
(function () {
    var toggle = document.querySelector(".switch");
    toggle.addEventListener("click", function () {
        var theme = localStorage.getItem("theme");
        theme = theme == "dark" ? "" : "dark";
        setTheme(theme);
        localStorage.setItem("theme", theme);
    });
})();
// Fetch localStorage  or set one if there is no localStorage
(function () {
    var data = localStorage.getItem("todos");
    todos = data ? JSON.parse(data) : [];
    createTodoItems();
    // Setting local Storage
    if (todos.length)
        return;
    localStorage.setItem("todos", JSON.stringify(todos));
})();
// Create a todo item
function createTodoItem(_a) {
    var data = _a.data, priority = _a.priority, status = _a.status;
    var todos = document.querySelector("#todos");
    var todo = document.createElement("article");
    todo.classList.add("todo");
    var content = document.createElement("div");
    content.classList.add("content");
    var content_p = document.createElement("p");
    content_p.textContent = data;
    content.appendChild(content_p);
    var actions = document.createElement("div");
    actions.classList.add("actions");
    var action_child1 = document.createElement("div");
    action_child1.classList.add("delete");
    var action_child1_icon = document.createElement("i");
    action_child1_icon.classList.add("fa-solid", "fa-trash");
    action_child1.addEventListener("click", function () { return deleteTask(data); });
    action_child1.appendChild(action_child1_icon);
    var action_child2 = document.createElement("div");
    var action_child2_checkbox = document.createElement("input");
    action_child2_checkbox.setAttribute("type", "checkbox");
    action_child2_checkbox.addEventListener("change", function (e) { return checkTask(data, e); });
    status == "done" && action_child2_checkbox.setAttribute("checked", "");
    action_child2.appendChild(action_child2_checkbox);
    actions.append(action_child1, action_child2);
    todo.append(content, actions);
    // Check to see if the todos was empty previously
    var noTasks = document.querySelector(".noTasks");
    if (noTasks) {
        todos.removeChild(noTasks);
    }
    todos.appendChild(todo);
}
// CreateAllTodo Lists On Start
function createTodoItems() {
    // Sort todos based on the priority
    if (todos.length > 0) {
        todos = todos.sort(function (a, b) { return b.priority - a.priority; });
        todos.forEach(function (todo) {
            createTodoItem(todo);
        });
    }
    else {
        // Add there are no tasks
        var todo__container = document.querySelector("#todos");
        var empty = document.createElement("div");
        empty.classList.add("noTasks");
        var icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-house");
        var desc = document.createElement("p");
        desc.textContent = "You do not have any tasks";
        empty.append(icon, desc);
        todo__container.appendChild(empty);
    }
}
// Delete All Todo Items
function deleteTodos() {
    var todo__container = document.querySelector("#todos");
    var todos = document.querySelectorAll("#todos .todo");
    todos.forEach(function (todo) {
        todo__container.removeChild(todo);
    });
}
// Show New Task Form
(function () {
    var plus = document.querySelector(".plus");
    var newForm = document.querySelector("#new");
    var input = newForm.querySelector("input");
    plus.addEventListener("click", function () {
        newForm.style.display = "flex";
        plus.style.display = "none";
        input.focus();
    });
})();
// Add Task
(function () {
    var newForm = document.querySelector("#new");
    var plus = document.querySelector(".plus");
    var addTaskForm = document.querySelector("form");
    addTaskForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var formData = new FormData(addTaskForm);
        var task = formData.get("task");
        // Check to see if task already exists
        var exists = todos.find(function (e) { return e.data == task; });
        exists && alert("Task already exists");
        !task && alert("Please enter a task");
        if (task && !exists) {
            // Save content
            var data = {
                data: task.toString(),
                priority: 0,
                status: "incomplete"
            };
            todos.push(data);
            // Store Data
            localStorage.setItem("todos", JSON.stringify(todos));
            // Clear Input field and Hide Input Field showing the plus sign
            var input = addTaskForm.querySelector("input");
            input.value = "";
            input.focus();
            // Display new task
            createTodoItem(data);
        }
    });
})();
// Delete a task
function deleteTask(content) {
    todos = todos.filter(function (todo) { return todo.data !== content; });
    // Remove and recreate todos
    deleteTodos();
    createTodoItems();
    // edit localStorage
    localStorage.setItem("todos", JSON.stringify(todos));
}
// Mark task as done or incomplete
function checkTask(content, event) {
    // Toggle status
    todos = todos.map(function (todo) {
        return todo.data == content ? __assign(__assign({}, todo), { status: event.target.checked ? "done" : "incomplete" }) : todo;
    });
    // Store Data
    localStorage.setItem("todos", JSON.stringify(todos));
}
// Add drags to set priority
