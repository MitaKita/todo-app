var todoItemList;

var addButtonName = 'addButton';
var editButtonName = 'editButton';
var clearButtonName = 'clearButton';
var cancelButtonName = 'cancelButton';

var descriptionName = 'todoDescription';
var estimateName = 'todoEstimate';
var timeSpentName = 'todoTimeSpent';

var timeSpentGroupName = 'timeSpentFormGroup';

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
  if (!todoItemList) {
    todoItemList = localStorage.getItem('todos');
  }
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
  return `<li class="list-group-item justify-content-between todo-list-item">
            ${todo.description}
            <span>
              <span class="badge badge-estimate"
                    title="Time to complete / Time spent"
                    onclick="handleUpdateTime('${todo.id}')">
                ${todo.estimate} / ${todo.timeSpent}
              </span>
              <span class="badge badge-remove" title="Remove item">x</span>
            </span>
          </li>`
}

function handleUpdateTime(todoId) {
  console.log(typeof(todoId))
  console.log(todoId);
  var todoList = getTodosFromLocalStorage();
  var updateItem = $.grep(todoList, function(item) { return item.id === todoId })[0];
  console.log(updateItem)
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
  setValue(descriptionName, '');
  setValue(estimateName, '');
  setValue(timeSpentName, '');

  hideElement(editButtonName);
  hideElement(cancelButtonName);
  hideElement(timeSpentGroupName);
  showElement(addButtonName);
  showElement(clearButtonName);
}

function saveTodoItem() {
  if (!isValid()) {
    return;
  }

  saveToLocalStorage();

  setVal(descriptionName, '');
  setVal(estimateName, '');

  init();
}



function isValid() {
  if (!getValue(descriptionName)) {
    alert('Please, add a description');
    return false;
  }

  if (!getValue(estimateName)) {
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
    description: getValue(descriptionName),
    estimate: getValue(estimateName),
    timeSpent: 0
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
