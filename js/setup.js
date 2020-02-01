'use strict';

var WIZARDS_NUMBER = 4;
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

var wizardsProperties = {
  WIZARD_NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  WIZARD_SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  WIZARD_COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  WIZARD_EYE_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
  WIZARD_FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
};

var setupWindow = document.querySelector('.setup');

var getRandomElemFromArr = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var wizards = [];

var getWizards = function () {
  for (var i = 0; i < WIZARDS_NUMBER; i++) {
    wizards[i] = {
      name: getRandomElemFromArr(wizardsProperties.WIZARD_NAMES),
      surname: getRandomElemFromArr(wizardsProperties.WIZARD_SURNAMES),
      coatColor: getRandomElemFromArr(wizardsProperties.WIZARD_COAT_COLORS),
      eyesColor: getRandomElemFromArr(wizardsProperties.WIZARD_EYE_COLORS),
    };
  }
  return wizards;
};

getWizards();

var similarWizardList = setupWindow.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surname;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarWizardList.appendChild(fragment);

document.querySelector('.setup-similar').classList.remove('hidden');


var setupOpen = document.querySelector('.setup-open');
var setupClose = setupWindow.querySelector('.setup-close');

var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    closePopup();
  }
};

var openPopup = function () {
  setupWindow.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setupWindow.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
});


var wizardCoat = document.querySelector('.wizard-coat');
var coatColorInput = setupWindow.querySelector('.setup-wizard-appearance input[name=coat-color]');

var wizardEyes = setupWindow.querySelector('.wizard-eyes');
var eyesColorInput = setupWindow.querySelector('.setup-wizard-appearance input[name=eyes-color]');

var wizardFireball = setupWindow.querySelector('.setup-fireball-wrap');
var fireballColorInput = wizardFireball.querySelector('input');

var changeCoatColor = function () {
  wizardCoat.style.fill = getRandomElemFromArr(wizardsProperties.WIZARD_COAT_COLORS);
  coatColorInput.value = getRandomElemFromArr(wizardsProperties.WIZARD_COAT_COLORS);
};

wizardCoat.addEventListener('click', function () {
  changeCoatColor();
});

var changeEyesColor = function () {
  wizardEyes.style.fill = getRandomElemFromArr(wizardsProperties.WIZARD_EYE_COLORS);
  eyesColorInput.value = getRandomElemFromArr(wizardsProperties.WIZARD_EYE_COLORS);
};

wizardEyes.addEventListener('click', function () {
  changeEyesColor();
});


var changeFireballColor = function () {
  wizardFireball.style.background = getRandomElemFromArr(wizardsProperties.WIZARD_FIREBALL_COLORS);
  fireballColorInput.value = getRandomElemFromArr(wizardsProperties.WIZARD_FIREBALL_COLORS);
};

wizardFireball.addEventListener('click', function () {
  changeFireballColor();
});

// Пыталась упростить и сделать единую функцию, но ерунда какая-то выходит
// var styleProp = 'fill';
// if (wizardFireball.style) {
//   styleProp = 'background';
// };

// var changeColor = function (wizardItem, property, input, styleItem) {
//   wizardItem.style.styleItem = property;
//   input.value = property;
// };

// console.log(wizards[i].coatColor);

//
// wizardCoat.addEventListener('click', function () {
//   changeColor(wizardCoat, wizards[i].coatColor, coatColorInput, styleProp);
// });
