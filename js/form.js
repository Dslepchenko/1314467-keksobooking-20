'use strict';

(function () {
  var OFFER_TYPES = {
    'bungalo': {
      translate: 'Бунгало',
      minPrice: 0
    },
    'flat': {
      translate: 'Квартира',
      minPrice: 1000
    },
    'house': {
      translate: 'Дом',
      minPrice: 5000
    },
    'palace': {
      translate: 'Дворец',
      minPrice: 10000
    }
  };
  // Функция для задания координат
  var getAddressCoordinate = function (coordinate) {
    var locationX = Math.floor(coordinate.offsetLeft + coordinate.offsetWidth / 2);
    var locationY = Math.floor(coordinate.offsetTop + coordinate.offsetHeight + window.constant.PIN_TIP_HEIGHT);
    var location = locationX + ', ' + locationY;

    return location;
  };
  // Функция для валидации заголовка
  function onTitleChanged(title) {
    if (title.validity.tooShort) {
      title.setCustomValidity('Заголовок должен состоять минимум из 30-ти символов');
    } else if (title.validity.tooLong) {
      title.setCustomValidity('Заголовок не должен превышать 100 символов');
    } else if (title.validity.valueMissing) {
      title.setCustomValidity('Обязательное поле');
    } else {
      title.setCustomValidity('');
    }
  }
  // Функция для генерации минимальной цены за ночь относительно выбранного Типа жилья
  function onTypeHousingChanged(priceInput, typeHouse) {
    var type = OFFER_TYPES[typeHouse.value];
    priceInput.placeholder = type.minPrice;
    priceInput.min = type.minPrice;
  }


  // Валидация комнат от в зависимости от количества гостей


  var getGuestCapacity = function (roomValue, guestsValue) {

    switch (roomValue.value) {
      case '1':
        guestsValue.options[0].disabled = true;
        guestsValue.options[1].disabled = true;
        guestsValue.options[3].disabled = true;
        guestsValue.options[2].selected = true;
        break;
      case '2':
        guestsValue.options[0].disabled = true;
        guestsValue.options[3].disabled = true;
        guestsValue.options[1].selected = true;
        break;
      case '3':
        guestsValue.options[3].disabled = true;
        guestsValue.options[0].selected = true;
        break;
      case '100':
        guestsValue.options[0].disabled = true;
        guestsValue.options[1].disabled = true;
        guestsValue.options[2].disabled = true;
        guestsValue.options[3].selected = true;
    }
    roomValue.addEventListener('change', function () {
      getGuestCapacity(roomValue, guestsValue);
    });
  };

  // валидация времени заезда и выезда


  var getTimeInAndTimeOut = function (timeIn, timeOut) {
    switch (timeIn.value) {
      case '12:00':
        timeOut.value = timeIn.value;
        break;
      case '13:00':
        timeOut.value = timeIn.value;
        break;
      case '14:00':
        timeOut.value = timeIn.value;
        break;
    }
    timeIn.addEventListener('change', function () {
      getTimeInAndTimeOut(timeIn, timeOut);
    });
    timeOut.addEventListener('change', function () {
      window.form.getTimeInAndTimeOut(timeOut, timeIn);
    });
  };
  window.form = {
    getAddressCoordinate: getAddressCoordinate,
    getGuestCapacity: getGuestCapacity,
    getTimeInAndTimeOut: getTimeInAndTimeOut,
    onTitleChanged: onTitleChanged,
    onTypeHousingChanged: onTypeHousingChanged,
  };
})();
