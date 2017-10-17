var addButtonName = 'addButton';
var editButtonName = 'editButton';
var clearButtonName = 'clearButton';
var cancelButtonName = 'cancelButton';

var descriptionName = 'todoDescription';
var estimateName = 'todoEstimate';
var timeSpentName = 'todoTimeSpent';

var timeSpentGroupName = 'timeSpentFormGroup';

var editedTodoItemId;

function init() {
  buildTodoList();
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
  var todoItemList = localStorage.getItem('todos');
  return todoItemList ? JSON.parse(todoItemList) : [];
}

function createTodoList() {
  $('#todoList').html(getTodoListHtml(getTodosFromLocalStorage()));
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
  return `<li class="list-group-item justify-content-between todo-list-item"
              onclick="handleUpdateTime('${todo.id}')">
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

function handleUpdateTime(todoId) {
  editedTodoItemId = todoId;

  var todoList = getTodosFromLocalStorage();
  var updateItem = $.grep(todoList, function(item) { return item.id === todoId })[0];

  setValue(descriptionName, updateItem.description);
  setValue(estimateName, updateItem.estimate);
  setValue(timeSpentName, updateItem.timeSpent);

  hideElement(addButtonName);
  hideElement(clearButtonName);
  showElement(editButtonName);
  showElement(cancelButtonName);
  showElement(timeSpentGroupName);
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
  hideElement(timeSpentGroupName);
  showElement(addButtonName);
  showElement(clearButtonName);
}

function handleRemove(id) {
  removeFromLocalStorage(getIndexFromId(id));
  init();
}

function getIndexFromId(id) {
  var todoList = getTodosFromLocalStorage();
  return todoList.findIndex((element) => {
    return element.id === id;
  });
}

function saveNewTodoItem() {
  if (!isValid()) {
    return;
  }

  var todos = getTodosFromLocalStorage();
  todos.push(getNewTodo());
  saveToLocalStorage(todos);

  setValue(descriptionName, '');
  setValue(estimateName, '');

  init();
}

function saveEditedTodoItem() {
  if (!isValid()) {
    return;
  }

  var todos = editTodoItem();
  saveToLocalStorage(todos);

  setInitialState();

  init();
}

function isValid(checkTimeSpent = false) {
  if (!getValue(descriptionName)) {
    alert('Please, add a description');
    return false;
  }

  if (!getValue(estimateName)) {
    alert('Please, add a time estimate for the task');
    return false;
  }

  if (checkTimeSpent && !getValue(timeSpentName)) {
    alert('Please, add a value for amount of time spent on the task');
    return false;
  }
  return true;
}

function saveToLocalStorage(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function removeFromLocalStorage(index) {
  var todos = getTodosFromLocalStorage();
  todos.splice(index, 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getNewTodo() {
  return {
    id: chance.guid(),
    description: getValue(descriptionName),
    estimate: getValue(estimateName),
    timeSpent: 0
  };
}

function getCurrentTodoValue(id) {
  return {
    id: id,
    description: getValue(descriptionName),
    estimate: getValue(estimateName),
    timeSpent: getValue(timeSpentName)
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

function editTodoItem() {
  var todos = getTodosFromLocalStorage();
  var index = getIndexFromId(editedTodoItemId);
  todos[index] = getCurrentTodoValue(editedTodoItemId);
  return todos;
}