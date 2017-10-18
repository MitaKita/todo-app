var donutChartWrapperName = 'donutChartWrapper';
var donutTitleName = 'donutTitle';
var donutTextName = 'donutText';
var donutSegmentName = 'donutSegment';

var circumference = 50 * 2 * Math.PI;
var strokeDashOffset = circumference * 0.5;

function hideDonut() {
  get(donutChartWrapperName).addClass('not-visible')
}

function showDonut(todoItem) {
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
  return `${Math.round(todoItem.timeSpent / todoItem.estimate * 100)}%`;
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

function get(id) {
  return $(`#${id}`);
}