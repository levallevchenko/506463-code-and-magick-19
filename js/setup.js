'use strict';

var WIZARDS_NUMBER = 4;

var wizardsProperties = {
  WIZARD_NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  WIZARD_SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  WIZARD_COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  WIZARD_EYE_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
};

var setupWindow = document.querySelector('.setup');
setupWindow.classList.remove('hidden');

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
