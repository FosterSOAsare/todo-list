
interface IStorage {
  data: string,
  priority: number,
  status: string,
}
let todos: IStorage[] = [];

// Fetch localStorage  or set one if there is no localStorage
(function () {
  const data = localStorage.getItem("todos");
  todos = data ? JSON.parse(data) : [];
  createTodoItems();
  // Setting local Storage 
  if (todos.length) return;
  localStorage.setItem('todos', JSON.stringify(todos));
})();

// Create a todo item 
function createTodoItem({ data, priority, status }) {
  let todos = document.querySelector("#todos") as HTMLDivElement
  let todo = document.createElement('article');
  todo.classList.add('todo');

  let content = document.createElement('div');
  content.classList.add('content');
  let content_p = document.createElement('p');
  content_p.textContent = data;
  content.appendChild(content_p);

  let actions = document.createElement('div');
  actions.classList.add('actions');
  let action_child1 = document.createElement('div');
  action_child1.classList.add('delete');
  let action_child1_icon = document.createElement('i');
  action_child1_icon.classList.add('fa-solid', "fa-trash");
  action_child1.addEventListener('click', () => deleteTask(data));

  action_child1.appendChild(action_child1_icon);
  let action_child2 = document.createElement('div');
  let action_child2_checkbox = document.createElement('input');
  action_child2_checkbox.setAttribute('type', 'checkbox');
  action_child2_checkbox.addEventListener('change', (e) => checkTask(data, e));
  status == 'done' && action_child2_checkbox.setAttribute("checked", '');
  action_child2.appendChild(action_child2_checkbox);
  actions.append(action_child1, action_child2);

  todo.append(content, actions);
  // Check to see if the todos was empty previously
  let noTasks = document.querySelector('.noTasks');
  if (noTasks) {
    todos.removeChild(noTasks);
  }
  todos.appendChild(todo);
}

// CreateAllTodo Lists On Start
function createTodoItems() {
  // Sort todos based on the priority
  if (todos.length > 0) {
    todos = todos.sort((a, b) => b.priority - a.priority);
    todos.forEach((todo: IStorage) => {
      createTodoItem(todo);
    })
  } else {
    // Add there are no tasks 
    let todo__container = document.querySelector("#todos") as HTMLDivElement;
    let empty = document.createElement('div');
    empty.classList.add('noTasks');
    let icon = document.createElement('i');
    icon.classList.add('fa-solid', 'fa-house');
    let desc = document.createElement('p');
    desc.textContent = "You do not have any tasks";
    empty.append(icon, desc);
    todo__container.appendChild(empty);

  }
}

// Delete All Todo Items 
function deleteTodos() {
  let todo__container = document.querySelector("#todos") as HTMLDivElement;
  let todos = document.querySelectorAll("#todos .todo") as NodeListOf<HTMLDivElement>;
  todos.forEach((todo: any) => {
    todo__container.removeChild(todo);
  })
}


// Show New Task Form
(function () {
  let plus = document.querySelector('.plus') as HTMLDivElement;
  let newForm = document.querySelector('#new') as HTMLDivElement;
  let input = newForm.querySelector("input") as HTMLInputElement;
  plus.addEventListener('click', () => {
    newForm.style.display = 'flex';
    plus.style.display = 'none';
    input.focus();
  })
})();
// Add Task 
(function () {
  let newForm = document.querySelector("#new") as HTMLDivElement;
  let plus = document.querySelector('.plus') as HTMLDivElement;
  let addTaskForm = document.querySelector("form") as HTMLFormElement;
  addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let formData = new FormData(addTaskForm);
    let task = formData.get('task');
    if (task) {
      // Save content 
      let data = {
        data: task.toString(),
        priority: 0,
        status: 'incomplete'
      }
      todos.push(data);

      // Store Data
      localStorage.setItem('todos', JSON.stringify(todos));
      // Clear Input field and Hide Input Field showing the plus sign
      let input = addTaskForm.querySelector('input') as HTMLInputElement;
      input.value = '';
      // Display new task
      createTodoItem(data);
    }
  })
})();

// Delete a task
function deleteTask(content: string) {
  todos = todos.filter((todo: IStorage) => todo.data !== content);
  // Remove and recreate todos
  deleteTodos();
  createTodoItems();
  // edit localStorage
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Mark task as done or incomplete
function checkTask(content: string, event: any) {
  // Toggle status
  todos = todos.map((todo: IStorage) => {
    return todo.data == content ? { ...todo, status: event.target.checked ? 'done' : 'incomplete' } : todo;
  });

  // Store Data
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Add drags to set priority