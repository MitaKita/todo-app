var todoListKey = 'todos';

function get(id) {
  return $(`#${id}`);
}

function getTodosFromLocalStorage() {
  var todoItemList = localStorage.getItem(todoListKey);
  return todoItemList ? JSON.parse(todoItemList) : [];
}

function getTodoItem(todoId) {
  return $.grep(getTodosFromLocalStorage(), function(item) { return item.id === todoId })[0];  
}

function saveToLocalStorage(todos) {
  return $.Deferred((defer) => {
    try {
      localStorage.setItem(todoListKey, JSON.stringify(todos));
      defer.resolve();
    } catch (error) {
      defer.reject(error);
    }
  });
}

function getIndexFromId(id) {
  var todoList = getTodosFromLocalStorage();
  return todoList.findIndex((element) => {
    return element.id === id;
  });
}

function removeFromLocalStorage(index) {
  return $.Deferred((defer) => {
    try {
      var todos = getTodosFromLocalStorage();
      todos.splice(index, 1);
      localStorage.setItem(todoListKey, JSON.stringify(todos));
      defer.resolve();
    } catch (error) {
      defer.reject(error);
    }
  });
}
