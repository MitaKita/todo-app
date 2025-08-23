const donutChartWrapperName = 'donutChartWrapper';
const donutTitleName = 'donutTitle';
const donutTextName = 'donutText';
const donutSegmentName = 'donutSegment';

const circumference = 50 * 2 * Math.PI;
const strokeDashOffset = circumference * 0.5;

let currentTodoItem;

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

  const donutText = get(donutTextName).html(getDonutText(todoItem));

  const donutSegment = get(donutSegmentName);
  donutSegment.css({
    'stroke-dasharray': getStrokeDashArray(todoItem),
    'stroke-dashoffset': strokeDashOffset
  });
  showElement(donutSegmentName);
}

function getDonutText(todoItem) {
  return `${getPercentageValue(todoItem)}%`;
}

function getPercentageValue(todoItem) {
  const rawValue = Math.round(todoItem.timeSpent / todoItem.estimate * 100);
  return (rawValue > 100) ? 100 : rawValue;
}

function getStrokeDashArray(todoItem) {
  const totalTime = todoItem.estimate;
  const spentTime = getTimeSpent(todoItem);
  const timeLeft = totalTime - spentTime;

  const spentTimePercentage = spentTime / totalTime;
  const timeLeftPercentage = timeLeft / totalTime;

  const spentTimeStrokeSize = circumference * spentTimePercentage;
  const restStrokeSize = circumference - spentTimeStrokeSize;

  return `${spentTimeStrokeSize} ${restStrokeSize}`;
}

function getTimeSpent(todoItem) {
  if (todoItem.timeSpent > todoItem.estimate) {
    return todoItem.estimate;
  }
  return todoItem.timeSpent ? todoItem.timeSpent : 0;
}
