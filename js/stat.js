'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_GAP = 10;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_GAP = 52;
var TEXT_HEIGHT = 16;
var CLOUD_COLOR = '#ffffff';
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var SELF_BAR_COLOR = 'rgba(255, 0, 0, 1)';
var TEXT_COLOR = '#000000';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var getRandomNumber = function (max) {
  return Math.round(Math.random() * max);
};

var SHADOW_CLOUD_X = CLOUD_X + CLOUD_GAP;
var SHADOW_CLOUD_Y = CLOUD_Y + CLOUD_GAP;

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, SHADOW_CLOUD_X, SHADOW_CLOUD_Y, SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

  var CLOUD_TITLE_X = CLOUD_X + BAR_GAP;
  var CLOUD_TITLE_Y = CLOUD_Y + CLOUD_GAP + TEXT_HEIGHT;
  var CONGRETILATION_TITLE = 'Ура, вы победили!';
  var RESULTS_TITLE = 'Список результатов:';

  ctx.fillStyle = TEXT_COLOR;
  ctx.font = '16px PT Mono';
  ctx.fillText(CONGRETILATION_TITLE, CLOUD_TITLE_X, CLOUD_TITLE_Y);
  ctx.fillText(RESULTS_TITLE, CLOUD_TITLE_X, CLOUD_TITLE_Y + TEXT_HEIGHT);

  var maxTime = getMaxElement(times);


  for (var i = 0; i < players.length; i++) {
    var time = Math.round(times[i]);

    var GAMER_BAR_HEIGHT = times[i] * BAR_HEIGHT / maxTime;
    var BAR_X = CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i;
    var BAR_Y = CLOUD_HEIGHT - BAR_GAP / 2;

    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(time, BAR_X, BAR_Y - TEXT_HEIGHT - GAMER_BAR_HEIGHT);
    ctx.fillText(players[i], BAR_X, BAR_Y);

    var MAX_SATURATION = 100;
    if (players[i] === 'Вы') {
      ctx.fillStyle = SELF_BAR_COLOR;
    } else {
      ctx.fillStyle = 'hsl(227,' + getRandomNumber(MAX_SATURATION) + '%, 50%)';
    }

    ctx.fillRect(BAR_X, BAR_Y - TEXT_HEIGHT, BAR_WIDTH, -(GAMER_BAR_HEIGHT) + CLOUD_GAP);
  }
};
