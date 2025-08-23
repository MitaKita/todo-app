const dataId = 'todoItem';

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData(dataId, event.target.id);
}

function drop(event) {
  const above = event.layerY < (event.target.offsetHeight / 2);
  const sourceId = event.dataTransfer.getData(dataId);
  move(sourceId, event.target.id, above);
}

function move(sourceId, targetId, before) {
  const movedItem = getTodoItem(sourceId);

  removeFromLocalStorage(getIndexFromId(sourceId)).then(() => {
    insertMovedItem(movedItem, getIndexFromId(targetId), before).then(() => {
      buildTodoList();
    });
  });
}

function insertMovedItem(movedItem, targetIndex, before) {
  const todos = getTodosFromLocalStorage();
  const startIndex = before ? targetIndex : targetIndex + 1;
  todos.splice(startIndex, 0, movedItem);
  return saveToLocalStorage(todos);
}