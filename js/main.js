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

var cfg = {
  MARK: {
    width: 50, // ширина обычных маркеров на карте
    height: 70, // высота
    mainActiveWidth: 65, // ширина главного маркера в активном состоянии
    mainActiveHeight: 87, // высота
    mainInactiveWidth: 65, // ширина главного маркера в НЕ активном состоянии
    mainInactiveHeight: 65 // высота ..
  },

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

renderPins(generateMocks(PIN_AMOUNT));

// 11. Личный проект: доверяй, но проверяй (часть 1)

var map =  document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var adFormFieldsets =  document.querySelectorAll('.ad-form fieldset');
var filterForm =  document.querySelector('.map__filters');
var filterFormSelect =  document.querySelectorAll('.map__filters select');
var filterFormFieldsets = document.querySelectorAll('.map__filters fieldset');

//
setDisabled: function (elements) {
   for (var i = 0; i < elements.length; i++) {
     elements[i].setAttribute('disabled', '');
   }
 }

 setEnabled: function (elements) {
   for (var i = 0; i < elements.length; i++) {
     elements[i].removeAttribute('disabled');
   }
 }


// функция установки неактивного состояния страницы

var setInactive = function () {

// Блок с картой .map содержит класс map--faded;
map.classList.add('map--faded');

// Форма заполнения информации об объявлении .ad-form содержит класс ad-form--disabled;
adForf.classList.add('ad-form--disabled');

// Все <input> и <select> формы .ad-form заблокированы с помощью атрибута disabled, добавленного на них или на их  родительские блоки fieldset
setDisabled(adFormFieldsets);
// Форма с фильтрами .map__filters заблокирована так же, как и форма .ad-form;
setDisabled(filterFormSelect);
setDisabled(filterFormFieldsets);

}

// функция установки активного состояния страницы

var setActive = function() {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    setEnabled(adFormFieldsets);
    setEnabled(filterFormSelect);
    setEnabled(filterFormFieldsets);
}

// активация страницы по клику мыши. Скопировал код из интернета...
var mouse = {

  buttons: {LEFT: 0, MIDDLE: 1, RIGHT: 2, UNDEFINED: 99},

  getPressButton: function (evt) {
    if (typeof evt === 'object') {
      var btnCode = evt.button;

      switch (btnCode) {
        case 0:
          return this.buttons.LEFT;
        case 1:
          return this.buttons.MIDDLE;
        case 2:
          return this.buttons.RIGHT;
      }
    }
    return this.buttons.UNDEFINED;
  }
};

// адрес id

var elementAddress = document.querySelector('#address');

// вычисление координат. Скопировал и подогнал код из интернета...

var getCoord = function (marker, markerState) {
   var width = 0;
   var height = 0;

   switch (markerState) {
     case 'main-active':
       height = cfg.MARK.mainActiveHeight;
       width = cfg.MARK.mainActiveWidth;
       break;
     case 'main-inactive':
       height = cfg.MARK.mainInactiveHeight;
       width = cfg.MARK.mainInactiveWidth;
       break;
     default:
       width = cfg.MARK.width;
       height = cfg.MARK.height;
       break;
   }

   var x = Math.round(func.parseInt(marker.style.left) + width / 2);
   var y = Math.round(func.parseInt(marker.style.top) + height);

   return {
     x: x,
     y: y
   };

 }


// заполнение адреса

var setAddres = function() {

  var coord = getCoord(marker, markerState);
  elementAddress.value = coord.x + ',' + coord.y;
}


// По ТЗ должно быть сначала не активное состояние страницы

setInactive();

// ТЗ: Поле адреса должно быть заполнено всегда, в том числе сразу после открытия страницы (в неактивном состоянии)

var mapPinMain = document.querySelector('.map__pin--main');
address.setAddress(mapPinMain, 'main-inactive');

// перевод страницы Кексобукинга в активный режим при нажатии левой клавиши мыши на главный маркер

mapPinMain.addEventListener('mousedown', function(evt) {
  if (mouse.getPressButton(evt) === mouse.buttons.LEFT) {
    setActive();
  }
});


// нажатие на Enter тоже переводит в активный режим

mapPinMain.addEventListener('keydown', function(evt) {
  if (evt.key === 'Enter') {
    setActive();
  }
});

// дальше - валидация... чето не понимаю что делатьи как ))))
