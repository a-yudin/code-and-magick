'use strict';

var TEXT_FONT_SIZE = '16px';
var TEXT_FONT_FAMILY = 'PT Mono';
var TEXT_COLOR = 'rgb(0, 0, 0)';
var TITLE_TEXT_X_COORDINATE = 140;
var TITLE_TEXT_Y_COORDINATE = 35;
var TITLE_TEXT_LINE_HEIGHT = 20;
var CLOUD_COLOR = 'rgb(255, 255, 255)';
var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var CLOUD_SHADOW_X_OFFSET = 10;
var CLOUD_SHADOW_Y_OFFSET = 10;
var DEFAULT_OFFSET = 0;
var BAR_CHART_INITIAL_X_COORDINATE = 140;
var BAR_INITIAL_Y_COORDINATE = 90;
var TIME_Y_OFFSET = 10;
var PLAYER_NAME_INITIAL_Y_COORDINATE = 260;
var COLUMN_WIDTH = 40;
var COLUMN_MAX_HEIGHT = 150;
var BETWEEN_COLUMN_GAP = 50;
var SATURATE_MIN = 1;
var SATURATE_MAX = 100;
var PLAYER_COLOR = 'rgba(255, 0, 0, 1)';
var PLAYER_NAME = 'Вы';
var VICTORY_MESSAGE = 'Ура вы победили! Список результатов:';
var PI = Math.PI;

window.renderStatistics = function (ctx, names, times) {
  drawCloud(ctx);
  printText(ctx, VICTORY_MESSAGE, TITLE_TEXT_X_COORDINATE, TITLE_TEXT_Y_COORDINATE, 200);
  drawBarChart(ctx, names, times);
};

var printText = function (ctx, text, initialCoordinateX, initialCoordinateY, maxTextWidth) {
  var textWords = text.split(' ');
  var countWords = textWords.length;
  var line = '';

  ctx.fillStyle = TEXT_COLOR;
  ctx.font = TEXT_FONT_SIZE + ' ' + TEXT_FONT_FAMILY;

  for (var i = 0; i < countWords; i++) {
    var testLine = line + textWords[i] + ' ';
    var testWidth = ctx.measureText(testLine).width;
    if (testWidth > maxTextWidth) {
      ctx.fillText(line, initialCoordinateX, initialCoordinateY);
      line = textWords[i] + ' ';
      initialCoordinateY += TITLE_TEXT_LINE_HEIGHT;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, initialCoordinateX, initialCoordinateY);
};

var drawCloud = function (ctx) {
  ctx.fillStyle = CLOUD_COLOR;
  ctx.shadowColor = CLOUD_SHADOW_COLOR;
  ctx.shadowOffsetX = CLOUD_SHADOW_X_OFFSET;
  ctx.shadowOffsetY = CLOUD_SHADOW_Y_OFFSET;
  ctx.beginPath();
  ctx.arc(120, 30, 20, PI, PI * 3 / 2);
  ctx.lineTo(420, 10);
  ctx.arc(420, 110, 100, PI * 3 / 2, PI * 2);
  ctx.lineTo(520, 250);
  ctx.arc(490, 250, 30, PI * 2, PI / 2);
  ctx.lineTo(180, 280);
  ctx.arc(150, 230, 50, PI / 2, PI);
  ctx.lineTo(100, 30);
  ctx.fill();
  // второе облачко
  ctx.moveTo(530, 20);
  ctx.beginPath();
  ctx.arc(530, 20, 10, PI, PI * 4);
  ctx.fill();

  ctx.shadowOffsetX = DEFAULT_OFFSET;
  ctx.shadowOffsetY = DEFAULT_OFFSET;
};

var drawBarChart = function (ctx, names, times) {
  var randomSaturateProperty = 0;
  var integerPlayedTime = 0;
  var coordinateX = 0;
  var barCoordinateY = 0;
  var timeCoordinateY = 0;
  var columnHeight = 0;
  var randomBarColor = '';
  var maxTime = Math.max.apply(null, times);

  names.forEach(function (name, i) {
    if (name === PLAYER_NAME) {
      randomBarColor = PLAYER_COLOR;
    } else {
      randomSaturateProperty = Math.floor(Math.random() * (SATURATE_MAX - SATURATE_MIN)) + SATURATE_MIN;
      randomBarColor = 'hsl(240, ' + randomSaturateProperty + '%, 50%)';
    }
    columnHeight = COLUMN_MAX_HEIGHT / maxTime * times[i];
    integerPlayedTime = Math.round(times[i]) + '';
    coordinateX = i * (COLUMN_WIDTH + BETWEEN_COLUMN_GAP) + BAR_CHART_INITIAL_X_COORDINATE;
    barCoordinateY = BAR_INITIAL_Y_COORDINATE + (COLUMN_MAX_HEIGHT - columnHeight);
    timeCoordinateY = barCoordinateY - TIME_Y_OFFSET;
    printText(ctx, integerPlayedTime, coordinateX, timeCoordinateY, 70);
    printText(ctx, name, coordinateX, PLAYER_NAME_INITIAL_Y_COORDINATE, 70);
    drawBar(ctx, randomBarColor, coordinateX, barCoordinateY, COLUMN_WIDTH, columnHeight);
  });
};

var drawBar = function (ctx, barColor, initialCoordinateX, initialCoordinateY, barWidth, barHeight) {
  ctx.fillStyle = barColor;
  ctx.fillRect(initialCoordinateX, initialCoordinateY, barWidth, barHeight);
};
