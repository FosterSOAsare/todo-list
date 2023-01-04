export interface IStorage {
	data: string;
	priority: number;
	status: string;
}
export class Todo {
	private todos!: IStorage[];
	constructor() {}

	public setTodos(data: IStorage[]) {
		this.todos = data;
	}

	public getTodos() {
		return this.todos;
	}

	// Delete All Todos
	public deleteTodos() {
		let todo__container = document.querySelector("#todos") as HTMLDivElement;
		let todos = document.querySelectorAll("#todos .todo") as NodeListOf<HTMLDivElement>;
		todos.forEach((todo: any) => {
			todo__container.removeChild(todo);
		});
	}

	// Create a todo item
	public createTodoItem({ data, priority, status }: any) {
		let todos = document.querySelector("#todos") as HTMLDivElement;
		let todo = document.createElement("article");
		todo.classList.add("todo");

		let content = document.createElement("div");
		content.classList.add("content");
		let content_p = document.createElement("p");
		content_p.textContent = data;
		content.appendChild(content_p);

		let actions = document.createElement("div");
		actions.classList.add("actions");
		let action_child1 = document.createElement("div");
		action_child1.classList.add("delete");
		let action_child1_icon = document.createElement("i");
		action_child1_icon.classList.add("fa-solid", "fa-trash");
		action_child1.addEventListener("click", () => this.deleteTask(data));

		action_child1.appendChild(action_child1_icon);
		let action_child2 = document.createElement("div");
		let action_child2_checkbox = document.createElement("input");
		action_child2_checkbox.setAttribute("type", "checkbox");
		action_child2_checkbox.addEventListener("change", (e) => this.checkTask(data, e));
		status == "done" && action_child2_checkbox.setAttribute("checked", "");
		action_child2.appendChild(action_child2_checkbox);
		actions.append(action_child1, action_child2);

		todo.append(content, actions);
		// Check to see if the todos was empty previously
		let noTasks = document.querySelector(".noTasks");
		if (noTasks) {
			todos.removeChild(noTasks);
		}
		todos.appendChild(todo);
	}

	// Create all todo items from this.todo
	public createTodoItems() {
		// Sort todos based on the priority
		if (this.todos.length > 0) {
			this.todos = this.todos.sort((a, b) => b.priority - a.priority);
			this.todos.forEach((todo: IStorage) => {
				this.createTodoItem(todo);
			});
		} else {
			// Add there are no tasks
			let todo__container = document.querySelector("#todos") as HTMLDivElement;
			let empty = document.createElement("div");
			empty.classList.add("noTasks");
			let icon = document.createElement("i");
			icon.classList.add("fa-solid", "fa-house");
			let desc = document.createElement("p");
			desc.textContent = "You do not have any tasks";
			empty.append(icon, desc);
			todo__container.appendChild(empty);
		}
	}

	// Delete a task
	public deleteTask(content: string) {
		this.todos = this.todos.filter((todo: IStorage) => todo.data !== content);
		// Remove and recreate todos
		this.deleteTodos();
		this.createTodoItems();
		// edit localStorage
		localStorage.setItem("todos", JSON.stringify(this.todos));
	}

	// Mark as done or uncheck
	checkTask(content: string, event: any) {
		// Toggle status
		this.todos = this.todos.map((todo: IStorage) => {
			return todo.data == content ? { ...todo, status: event.target.checked ? "done" : "incomplete" } : todo;
		});

		// Store Data
		localStorage.setItem("todos", JSON.stringify(this.todos));
	}
}
