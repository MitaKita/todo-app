var donutChartWrapperName = 'donutChartWrapper';
var donutTitleName = 'donutTitle';
var donutTextName = 'donutText';
var donutSegmentName = 'donutSegment';

var circumference = 50 * 2 * Math.PI;
var strokeDashOffset = circumference * 0.5;

var currentTodoItem;

function hideDonut() {
  hideElement(donutChartWrapperName);
  hideElement(donutTitleName);
}

function updateDonut() {
  if (currentTodoItem) {
    showDonut(getTodoItem(currentTodoItem.id));
  }
}

function showDonut(todoItem) {
  currentTodoItem = todoItem;
  get(donutTitleName).html(`Progress for: ${todoItem.description}`);
  showElement(donutChartWrapperName);

  var donutText = get(donutTextName).html(getDonutText(todoItem));

  var donutSegment = get(donutSegmentName);
  donutSegment.css({
    'stroke-dasharray': getStrokeDashArray(todoItem),
    'stroke-dashoffset': strokeDashOffset
  })
  showElement(donutSegmentName);
}

function getDonutText(todoItem) {
  return `${getPercentageValue(todoItem)}%`;
}

function getPercentageValue(todoItem) {
  var rawValue = Math.round(todoItem.timeSpent / todoItem.estimate * 100);
  return (rawValue > 100) ? 100 : rawValue;
}

function getStrokeDashArray(todoItem) {
  var totalTime = todoItem.estimate;
  var spentTime = getTimeSpent(todoItem);
  var timeLeft = totalTime - spentTime;

  var spentTimePercentage = spentTime / totalTime;
  var timeLeftPercentage = timeLeft / totalTime;

  var spentTimeStrokeSize = circumference * spentTimePercentage;
  var restStrokeSize = circumference - spentTimeStrokeSize;

  return `${spentTimeStrokeSize} ${restStrokeSize}`;
}

function getTimeSpent(todoItem) {
  if (todoItem.timeSpent > todoItem.estimate) {
    return todoItem.estimate;
  }
  return todoItem.timeSpent ? todoItem.timeSpent : 0;
}
