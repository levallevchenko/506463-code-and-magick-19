'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_GAP = 10;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_GAP = 50;
var TEXT_HEIGHT = 16;
var CLOUD_COLOR = '#ffffff';
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var SELF_BAR_COLOR = 'rgba(255, 0, 0, 1)';
var TEXT_COLOR = '#000000';

// Отрисовывает облако
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// Находит максимальный элемент рандомного массива
var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

// Генерирует случайное число и округляет его до целого
var getRandomValue = function (max) {
  return Math.round(Math.random() * max);
};

// Отрисовывает облако со всей статистикой
window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

  // Отрисовывает поздравление
  ctx.fillStyle = TEXT_COLOR; // Цвет текста
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура, вы победили!', CLOUD_X + BAR_GAP, CLOUD_Y + CLOUD_GAP + TEXT_HEIGHT);
  ctx.fillText('Список результатов', CLOUD_X + BAR_GAP, CLOUD_Y + CLOUD_GAP + TEXT_HEIGHT * 2);

  // Выбирает максимальное время из массива times
  var maxTime = getMaxElement(times);

  // Отрисовывает полосы статистики
  for (var i = 0; i < players.length; i++) {
    var time = Math.round(times[i]); // Округляет время игры

    // x = times[i] * BAR_HEIGHT / MAX_TIME – высота полосы статистики определённого игрока
    // Отрисовывает счёт игроков
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(time, CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - BAR_GAP / 2 - TEXT_HEIGHT - times[i] * BAR_HEIGHT / maxTime);

    // Отрисовывает имена игроков
    ctx.fillText(players[i], CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - BAR_GAP / 2);

    // Выбирает цвет полосы статистики
    if (players[i] === 'Вы') {
      ctx.fillStyle = SELF_BAR_COLOR;
    } else {
      ctx.fillStyle = 'hsl(227,' + getRandomValue(100) + '%, 50%)'; // Случайный синий
    }

    // Отрисовывает полосы статистики
    ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - BAR_GAP / 2 - TEXT_HEIGHT, BAR_WIDTH, -((times[i] * BAR_HEIGHT) / maxTime) + CLOUD_GAP);
  }
};
