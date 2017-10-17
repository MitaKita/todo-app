function init() {
  buildTodoList();
  initDonutChart();
}

function clearAll() {
  localStorage.removeItem('todos')
  init();
}

function buildTodoList() {
  if (hasTodoList()) {
    createTodoList();
  }
}

function hasTodoList() {
  return getTodosFromLocalStorage() ? true : false;
}

function getTodosFromLocalStorage() {
  var todos = localStorage.getItem('todos');
  return todos ? JSON.parse(todos) : [];
}

function createTodoList() {
  var todoListElement = getTodoListElement();
  todoListElement.innerHTML = getTodoListHtml(getTodosFromLocalStorage());
}

function getTodoListElement() {
  var todoListElement = document.getElementById('todoList');
  todoListElement.innerHTML = '';
  return todoListElement;
}

function getTodoListHtml(todos) {
  var innerHtml = '<ul class="list-group">';

  for (var i = 0; i < todos.length; i++) {
    innerHtml += buildListItem(todos[i]);
  }

  innerHtml += '</ul>'
  return innerHtml;
}

function buildListItem(todo) {
  return `<li class="list-group-item justify-content-between">
            ${todo.description}
            <span class="badge badge-default badge-pill">${todo.estimate}</span>
          </li>`
}

function saveTodoItem() {
  if (!isValid()) {
    return;
  }

  saveToLocalStorage(todoDescription);  
  document.getElementById('todoDescription').value = '';

  init();
}



function isValid() {
  if (!getDescription()) {
    alert('Please, add a description');
    return false;
  }

  if (!getEstimate()) {
    alert('Please, add a time estimate for the task');
    return false;
  }
  return true;
}

function saveToLocalStorage() {
  var todos = getTodosFromLocalStorage();
  todos.push(getNewTodo());
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getNewTodo() {
  return {
    id: chance.guid(),
    description: getDescription(),
    estimate: getEstimate()
  };
}

function getDescription() {
  return document.getElementById('todoDescription').value.trim();
}

function getEstimate() {
  return document.getElementById('todoEstimate').value;
}