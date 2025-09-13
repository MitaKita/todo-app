const todoListKey = 'todos';

function get(id) {
  return $(`#${id}`);
}

function getTodosFromLocalStorage() {
  const todoItemList = localStorage.getItem(todoListKey);
  return todoItemList ? JSON.parse(todoItemList) : [];
}

function getTodoItem(todoId) {
  return $.grep(getTodosFromLocalStorage(), (item) => { return item.id === todoId })[0];  
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
  const todoList = getTodosFromLocalStorage();
  return todoList.findIndex((element) => {
    return element.id === id;
  });
}

function removeFromLocalStorage(index) {
  return $.Deferred((defer) => {
    try {
      const todos = getTodosFromLocalStorage();
      todos.splice(index, 1);
      localStorage.setItem(todoListKey, JSON.stringify(todos));
      defer.resolve();
    } catch (error) {
      defer.reject(error);
    }
  });
}
