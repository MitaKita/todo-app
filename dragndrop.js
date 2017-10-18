var dataId = 'todoItem';

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData(dataId, event.target.id);
}

function drop(event) {
  var above = event.layerY < (event.target.offsetHeight / 2);
  var sourceId = event.dataTransfer.getData(dataId);
  move(sourceId, event.target.id, above);
}

function move(sourceId, targetId, before) {
  var movedItem = getTodoItem(sourceId);

  removeSourceFromTodos(sourceId).then(() => {
    var targetIndex = getIndexFromId(targetId);

    insertMovedItem(movedItem, targetIndex, before).then(() => {
      init();
    })
  });
}

function removeSourceFromTodos(sourceId) {
  return removeFromLocalStorage(getIndexFromId(sourceId));
}

function insertMovedItem(movedItem, targetIndex, before) {
  var todos = getTodosFromLocalStorage();
  var startIndex = before ? targetIndex : targetIndex + 1;
  todos.splice(startIndex, 0, movedItem);
  return saveToLocalStorage(todos);
}