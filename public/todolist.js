var todoListName = 'todoList';
const addButtonName = 'addButton';
const editButtonName = 'editButton';
const clearButtonName = 'clearButton';
const cancelButtonName = 'cancelButton';

const descriptionName = 'todoDescription';
const estimateName = 'todoEstimate';
const timeSpentName = 'todoTimeSpent';

const descriptionErrorName = 'todoDescriptionError';
const estimateErrorName = 'todoEstimateError';
const timeSpentErrorName = 'todoTimeSpentError';

let editedTodoItemId;

function init() {
  buildTodoList();
}

function clearAll() {
  if (confirm('Are you sure you want to delete all todo items?')) {
    localStorage.removeItem(todoListKey);
    get(todoListName).html('');
    hideDonut();
  }
}

function buildTodoList() {
  if (hasTodoList()) {
    createTodoList();
  }
}

function hasTodoList() {
  return getTodosFromLocalStorage() ? true : false;
}

function createTodoList() {
  get(todoListName).html(getTodoListHtml());
}

function getTodoListHtml() {
  const todos = getTodosFromLocalStorage();
  let innerHtml = '<ul class="list-group">';

  for (let i = 0; i < todos.length; i++) {
    innerHtml += buildListItem(todos[i]);
  }

  innerHtml += '</ul>';
  return innerHtml;
}

function buildListItem(todo) {
  return `<li id="${todo.id}" class="list-group-item justify-content-between todo-list-item"
              onclick="handleListItemClick('${todo.id}')"
              ondrop="drop(event)"
              ondragover="allowDrop(event)"
              draggable="true"
              ondragstart="drag(event)">
            ${todo.description}
            <span>
              <span class="${getBadgeClasses(todo)}"
                    title="Time to complete / Time spent">
                ${todo.estimate} / ${todo.timeSpent}
              </span>
              <span class="badge badge-remove"
                    title="Remove item"
                    onclick="handleRemove('${todo.id}')">x</span>
            </span>
          </li>`
}

function getBadgeClasses(todo) {
  if (todo.estimate > todo.timeSpent) {
    return 'badge badge-estimate';
  }
  return 'badge badge-done'
}

function handleListItemClick(todoId) {
  clearErrors();
  indicateListItemSelected(todoId);
  editedTodoItemId = todoId;

  const todoList = getTodosFromLocalStorage();
  const updateItem = getTodoItem(todoId);
  
  if (!updateItem) return;

  setEditingState(updateItem);
  showDonut(updateItem);
}

function indicateListItemSelected(id) {
  $(`#${editedTodoItemId}`).removeClass('active');
  $(`#${id}`).addClass('active');
}

function setEditingState(updateItem) {
  setValue(descriptionName, updateItem.description);
  setValue(estimateName, updateItem.estimate);
  setValue(timeSpentName, updateItem.timeSpent);

  hideElement(addButtonName);
  hideElement(clearButtonName);
  showElement(editButtonName);
  showElement(cancelButtonName);
}

function cancelEditTodoItem() {
  setInitialState();
}

function setInitialState() {
  setValue(descriptionName, '');
  setValue(estimateName, '');
  setValue(timeSpentName, '');

  hideElement(editButtonName);
  hideElement(cancelButtonName);
  showElement(addButtonName);
  showElement(clearButtonName);
}

function handleRemove(id) {
  removeFromLocalStorage(getIndexFromId(id));
  init();
}

function saveNewTodoItem() {
  if (!isValid()) {
    return;
  }

  const todos = getTodosFromLocalStorage();
  todos.push(getNewTodo());
  saveToLocalStorage(todos);

  setInitialState();
  init();
}

function saveEditedTodoItem() {
  if (!isValid()) {
    return;
  }

  const todos = editTodoItem();
  saveToLocalStorage(todos);

  setInitialState();

  updateDonut();
  init();
}

function editTodoItem() {
  const todos = getTodosFromLocalStorage();
  const index = getIndexFromId(editedTodoItemId);
  todos[index] = getCurrentTodoValue(editedTodoItemId);
  return todos;
}

function isValid() {
  let isOk = true;
  
  isOk &= checkElement(descriptionName, descriptionErrorName);
  isOk &= checkElement(estimateName, estimateErrorName);
  isOk &= checkElement(timeSpentName, timeSpentErrorName);

  return isOk;
}

function checkElement(elementName, errorName) {
  const isOk = getValue(elementName) ? true : false;

  if (!isOk) {
    showElement(errorName);
  } else {
    hideElement(errorName);
  }
  
  return isOk;
}

function clearErrors() {
  hideElement(descriptionErrorName);
  hideElement(estimateErrorName);
  hideElement(timeSpentErrorName);
}

function getNewTodo() {
  return getCurrentTodoValue(getNewId());
}

function getNewId() {
  return chance.guid();
}

function getCurrentTodoValue(id) {
  return {
    id: id,
    description: getValue(descriptionName),
    estimate: Number(getValue(estimateName)),
    timeSpent: Number(getValue(timeSpentName))
  };
}

function getValue(id) {
  return $(`#${id}`).val();
}

function setValue(id, value) {
  $(`#${id}`).val(value);
}

function hideElement(id) {
  $(`#${id}`).addClass('not-visible');
}

function showElement(id) {
  $(`#${id}`).removeClass('not-visible');
}

function loadDummyData() {
  let todos = getTodosFromLocalStorage();
  todos = addDummyData(todos);
  saveToLocalStorage(todos);
  init();
}

function addDummyData(todos) {
  todos.push.apply(todos, getDummyData());
  return todos;
}
function getDummyData() {
  return [
    {
      id: getNewId(),
      description: 'Write a book',
      estimate: 200,
      timeSpent: 30
    },
    {
      id: getNewId(),
      description: 'Build a house',
      estimate: 300,
      timeSpent: 40
    },
    {
      id: getNewId(),
      description: 'Drive across the country',
      estimate: 80,
      timeSpent: 30
    },
    {
      id: getNewId(),
      description: 'Watch a movie',
      estimate: 1.5,
      timeSpent: 0.5
    },
    {
      id: getNewId(),
      description: 'Do the dishes',
      estimate: 0.5,
      timeSpent: 0
    }
  ];
}
