var donutChartWrapperName = 'donutChartWrapper';
var donutTitleName = 'donutTitle';
var donutTextName = 'donutText';
var donutSegmentName = 'donutSegment';

var circumference = 50 * 2 * Math.PI;
var strokeDashOffset = circumference * 0.5;

var currentTodoItem;

function hideDonut() {
  get(donutChartWrapperName).addClass('not-visible')
}

function updateDonut() {
  if (currentTodoItem) {
    showDonut(getTodoItem(currentTodoItem.id));
  }
}

function showDonut(todoItem) {
  currentTodoItem = todoItem;
  get(donutTitleName).html(`Progress for: ${todoItem.description}`);
  get(donutChartWrapperName).removeClass('not-visible');

  var donutText = get(donutTextName).html(getDonutText(todoItem));

  var donutSegment = get(donutSegmentName);
  donutSegment.css({
    'stroke-dasharray': getStrokeDashArray(todoItem),
    'stroke-dashoffset': strokeDashOffset
  })
  donutSegment.removeClass('not-visible')
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
  var spentTime = todoItem.timeSpent ? todoItem.timeSpent : 0;
  var timeLeft = totalTime - spentTime;

  var spentTimePercentage = spentTime / totalTime;
  var timeLeftPercentage = timeLeft / totalTime;

  var spentTimeStrokeSize = circumference * spentTimePercentage;
  var restStrokeSize = circumference - spentTimeStrokeSize;

  return `${spentTimeStrokeSize} ${restStrokeSize}`;
}
