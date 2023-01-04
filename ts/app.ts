import { IStorage, Todo } from "./imports/Todo.js";
let todos = new Todo();

// Set theme on start
(function () {
	let theme = localStorage.getItem("theme");
	theme = theme ? theme : "";
	theme == "" ? localStorage.setItem("theme", "") : setTheme(theme);
})();

function setTheme(theme: string) {
	theme == "dark" ? document.body.classList.add(theme) : document.body.classList.contains("dark") ? document.body.classList.remove("dark") : "";
}

// Toggling Theme
(function () {
	let toggle = document.querySelector(".switch") as HTMLDivElement;
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
	if (todos.getTodos().length) return;
	localStorage.setItem("todos", JSON.stringify(todos));
})();

// // Create a todo item
// function createTodoItem({ data, priority, status }: any) {
// 	let todos = document.querySelector("#todos") as HTMLDivElement;
// 	let todo = document.createElement("article");
// 	todo.classList.add("todo");

// 	let content = document.createElement("div");
// 	content.classList.add("content");
// 	let content_p = document.createElement("p");
// 	content_p.textContent = data;
// 	content.appendChild(content_p);

// 	let actions = document.createElement("div");
// 	actions.classList.add("actions");
// 	let action_child1 = document.createElement("div");
// 	action_child1.classList.add("delete");
// 	let action_child1_icon = document.createElement("i");
// 	action_child1_icon.classList.add("fa-solid", "fa-trash");
// 	action_child1.addEventListener("click", () => deleteTask(data));

// 	action_child1.appendChild(action_child1_icon);
// 	let action_child2 = document.createElement("div");
// 	let action_child2_checkbox = document.createElement("input");
// 	action_child2_checkbox.setAttribute("type", "checkbox");
// 	action_child2_checkbox.addEventListener("change", (e) => checkTask(data, e));
// 	status == "done" && action_child2_checkbox.setAttribute("checked", "");
// 	action_child2.appendChild(action_child2_checkbox);
// 	actions.append(action_child1, action_child2);

// 	todo.append(content, actions);
// 	// Check to see if the todos was empty previously
// 	let noTasks = document.querySelector(".noTasks");
// 	if (noTasks) {
// 		todos.removeChild(noTasks);
// 	}
// 	todos.appendChild(todo);
// }

// Show New Task Form
(function () {
	let plus = document.querySelector(".plus") as HTMLDivElement;
	let newForm = document.querySelector("#new") as HTMLDivElement;
	let input = newForm.querySelector("input") as HTMLInputElement;
	plus.addEventListener("click", () => {
		newForm.style.display = "flex";
		plus.style.display = "none";
		input.focus();
	});
})();

// // Add Task
(function () {
	let newForm = document.querySelector("#new") as HTMLDivElement;
	let plus = document.querySelector(".plus") as HTMLDivElement;
	let addTaskForm = document.querySelector("form") as HTMLFormElement;
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
			let input = addTaskForm.querySelector("input") as HTMLInputElement;
			input.value = "";
			input.focus();
			// Display new task
			todos.createTodoItem(data);
		}
	});
})();

// // Mark task as done or incomplete

// // Add drags to set priority
