'use strict';

(function () {

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
  var mapPins = document.querySelector('.map__pins');
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

  window.data = {
    generateMocks: generateMocks

  };
}());
