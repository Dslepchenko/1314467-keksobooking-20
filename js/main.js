'use strict';

// Переменные для генерирования данных
var PIN_AMOUNT = 8;
var TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var PRICES = [
  10000,
  20000,
  30000,
  40000,
  50000
];
var ROOMS = [
  1,
  2,
  3,
  100
];
var GUESTS = [
  1,
  2,
  3
];
var CHECKIN = [
  '12:00',
  '13:00',
  '14:00'
];
var CHECKOUT = [
  '12:00',
  '13:00',
  '14:00'
];
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var PIN_TIP_HEIGHT = 22;
debugger
// Находим map, и удаляем у него класс
var map = document.querySelector('.map');
map.classList.remove('map--faded');
// Находим селектор map__pins
var mapPins = document.querySelector('.map__pins');

// Находим шаблон #pin
var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');

// Функция для выбора случайного значения
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

// Функция для выбора случайного элемента массива
function getRandomArrElem(arr) {
  return arr[getRandomValue(0, arr.length - 1)];
}

// Функция для выбора случайного количество элементов из массив
function getRandomNumOfElemFromArr(arr) {
  var elements = [];
  for (var i = 0; i < getRandomValue(1, arr.length - 1); i++) {
    var option = getRandomArrElem(arr);
    if (elements.indexOf(option) === -1) {
      elements.push(option);
    }
  }
  return elements;
}

// Функция для генерирования данных(моки)
function generateMocks(counter) {
  var mocksList = [];
  for (var i = 0; i < counter; i++) {
    var locationX = getRandomValue(0, mapPins.clientWidth);
    var locationY = getRandomValue(130, 630);
    var mocksPins = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png',
      },
      'offer': {
        'title': getRandomArrElem(TYPES),
        'address': locationX + ' ' + locationY,
        'price': getRandomArrElem(PRICES),
        'type': getRandomArrElem(TYPES),
        'rooms': getRandomValue(1, ROOMS.length - 1),
        'guests': getRandomValue(1, GUESTS.length - 1),
        'checkin': getRandomArrElem(CHECKIN),
        'checkout': getRandomArrElem(CHECKOUT),
        'features': getRandomNumOfElemFromArr(FEATURES),
        'description': getRandomArrElem(TYPES),
        'photos': getRandomNumOfElemFromArr(PHOTOS),
      },
      'location': {
        'x': locationX,
        'y': locationY,
      }
    };
    mocksList.push(mocksPins);
  }
  return mocksList;
}

// На основе данных, полученных из функции generateMocks, клону шаблона pinElement задаем метки координат и изображений
function getPinTemplate(data) {
  var pinElement = templatePin.cloneNode(true);
  var pinIcon = pinElement.querySelector('img');
  pinElement.style = 'left: ' + data.location.x + 'px; top: ' + data.location.y + 'px;';
  pinIcon.src = data.author.avatar;
  pinIcon.alt = data.author.title;
  return pinElement;
}

// Функция для рендеринга пинов на карте
function renderPins(pinsData) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pinsData.length; i++) {
    fragment.appendChild(getPinTemplate(pinsData[i]));
  }
  mapPins.appendChild(fragment);
}

var genetarePins = function () {
  renderPins(generateMocks(PIN_AMOUNT));
};


var adForm = document.querySelector('.ad-form');
var mapFilters = document.querySelector('.map__filters');
var adFormFieldsets = document.querySelectorAll('.ad-form fieldset');
var filterFormSelect = document.querySelectorAll('.map__filters select');
var filterFormFieldsets = document.querySelectorAll('.map__filters fieldset');
var mapPinMain = document.querySelector('.map__pin--main');

var activationPage = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].removeAttribute('disabled', true);
  }

};

var deActivationPage = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].setAttribute('disabled', true);
  }

};

var setInActiveState = function () {
  map.classList.add('map--faded');
  mapPins.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');
  deActivationPage(adFormFieldsets);
  deActivationPage(filterFormSelect);
  deActivationPage(filterFormFieldsets);
  deActivationPage(mapFilters);
};


var setActiveState = function () {
  map.classList.remove('map--faded');
  mapPins.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  activationPage(adFormFieldsets);
  activationPage(filterFormSelect);
  activationPage(filterFormFieldsets);
  activationPage(adForm);
  activationPage(mapFilters);
  genetarePins();
  adFormAddressInput.value = getAddressCoordinate();
};

mapPinMain.addEventListener('click', function () {
  setActiveState();
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    setActiveState();
  }
});
// Поля формы адреса
var adFormAddressInput = adForm.querySelector('#address');
// Функция для задания координат
var getAddressCoordinate = function () {
  var locationX = Math.floor(mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2);
  var locationY = Math.floor(mapPinMain.offsetTop + mapPinMain.offsetHeight + PIN_TIP_HEIGHT);
  var location = locationX + ', ' + locationY;

  return location;
};

var adFormRoomsNumber = adForm.querySelector('#room_number');
var adFormGuests = adForm.querySelector('#capacity');

var roomsAmount = {
  '1': {
    guestsAmout: ['1'],
    customMessage: 'Для 1 комнаты возможен вариант: 1 гость',
  },
  '2': {
    guestsAmout: ['1', '2'],
    customMessage: 'Для 2 комнат возможны варианты: 1 гость, 2 гостя',
  },
  '3': {
    guestsAmout: ['1', '2', '3'],
    customMessage: 'Для 3 комнат возможны варианты: 1 гость, 2 гостя, 3 гостя',
  },
  '100': {
    guestsAmout: ['0'],
    customMessage: 'Для 100 комнат возможен варианты: не для гостей',
  },
};

// Функция для проверки валидации значении комнат и гостей
var checkRoomsAndGuests = function () {
  var roomsValue = adFormRoomsNumber.value;
  var guestsValue = adFormGuests.value;
  var currentRooms = roomsAmount[roomsValue];
  var customMessage = currentRooms['customMessage'];

  for (var i = 0; i < currentRooms['guestsAmout'].length; i++) {
    if (guestsValue === currentRooms['guestsAmout'][i]) {
      customMessage = '';
    }
  }

  adFormGuests.setCustomValidity(customMessage);
};

adFormRoomsNumber.addEventListener('input', function () {
  checkRoomsAndGuests();
});

adFormGuests.addEventListener('input', function () {
  checkRoomsAndGuests();
});

setInActiveState();

// setActiveState();
