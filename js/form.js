'use strict';

(function () {

  var PIN_TIP_HEIGHT = 22;
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
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');
  var adFormFieldsets = document.querySelectorAll('.ad-form fieldset');
  var filterFormSelect = document.querySelectorAll('.map__filters select');
  var filterFormFieldsets = document.querySelectorAll('.map__filters fieldset');
  var mapPinMain = document.querySelector('.map__pin--main');
  var typeHousingSelectAdForm = adForm.querySelector('select[name="type"]');

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
    mapFilters.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    deActivationPage(adFormFieldsets);
    deActivationPage(filterFormSelect);
    deActivationPage(filterFormFieldsets);
    deActivationPage(mapFilters);
    roomNumbers.removeEventListener('click', getGuestCapacity);
    getTimeIn.removeEventListener('click', getTimeInAndTimeOut);
    titleInputAdForm.removeEventListener('change', onTitleChanged);
    typeHousingSelectAdForm.removeEventListener('change', onTypeHousingChanged);
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
    // window.pins.generatePins();
    roomNumbers.addEventListener('click', getGuestCapacity);
    getTimeIn.addEventListener('click', getTimeInAndTimeOut);
    titleInputAdForm.addEventListener('change', onTitleChanged);
    typeHousingSelectAdForm.addEventListener('change', onTypeHousingChanged);
    adFormAddressInput.value = getAddressCoordinate();
    window.backend.load(window.pins.successHandler, window.backend.errorHandler);
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
  var titleInputAdForm = adForm.querySelector('input[name="title"]');
  // Функция для валидации заголовка
  function onTitleChanged() {
    if (titleInputAdForm.validity.tooShort) {
      titleInputAdForm.setCustomValidity('Заголовок должен состоять минимум из 30-ти символов');
    } else if (titleInputAdForm.validity.tooLong) {
      titleInputAdForm.setCustomValidity('Заголовок не должен превышать 100 символов');
    } else if (titleInputAdForm.validity.valueMissing) {
      titleInputAdForm.setCustomValidity('Обязательное поле');
    } else {
      titleInputAdForm.setCustomValidity('');
    }
  }
  // Функция для генерации минимальной цены за ночь относительно выбранного Типа жилья
  var priceInputAdForm = adForm.querySelector('input[name="price"]');

  function onTypeHousingChanged() {
    var type = OFFER_TYPES[typeHousingSelectAdForm.value];
    priceInputAdForm.placeholder = type.minPrice;
    priceInputAdForm.min = type.minPrice;
  }
  onTypeHousingChanged();

  // Валидация комнат от в зависимости от количества гостей

  var roomNumbers = document.querySelector('#room_number');
  var guestsCapacity = document.querySelector('#capacity');

  var getGuestCapacity = function () {

    switch (roomNumbers.value) {
      case '1':
        guestsCapacity[0].setAttribute('disabled', true);
        guestsCapacity[1].setAttribute('disabled', true);
        guestsCapacity[2].removeAttribute('disabled', '');
        guestsCapacity[3].setAttribute('disabled', true);
        break;
      case '2':
        guestsCapacity[0].setAttribute('disabled', true);
        guestsCapacity[1].removeAttribute('disabled', '');
        guestsCapacity[2].setAttribute('disabled', true);
        guestsCapacity[3].setAttribute('disabled', true);
        break;
      case '3':
        guestsCapacity[0].removeAttribute('disabled', '');
        guestsCapacity[1].setAttribute('disabled', true);
        guestsCapacity[2].setAttribute('disabled', true);
        guestsCapacity[3].setAttribute('disabled', true);
        break;
      case '100':
        guestsCapacity[0].setAttribute('disabled', true);
        guestsCapacity[1].setAttribute('disabled', true);
        guestsCapacity[2].setAttribute('disabled', true);
        guestsCapacity[3].removeAttribute('disabled', '');
    }
  };

  // валидация времени заезда и выезда

  var getTimeIn = document.querySelector('#timein');
  var getTimeOut = document.querySelector('#timeout');

  var getTimeInAndTimeOut = function () {
    switch (getTimeIn.value) {
      case '12:00':
        getTimeOut[0].removeAttribute('disabled', '');
        getTimeOut[1].setAttribute('disabled', true);
        getTimeOut[2].setAttribute('disabled', true);
        break;
      case '13:00':
        getTimeOut[0].removeAttribute('disabled', '');
        getTimeOut[1].removeAttribute('disabled', '');
        getTimeOut[2].setAttribute('disabled', true);
        break;
      case '14:00':
        getTimeOut[0].removeAttribute('disabled', '');
        getTimeOut[1].removeAttribute('disabled', '');
        getTimeOut[2].removeAttribute('disabled', '');
        break;
    }
  };

  setInActiveState();

  window.form = {
    setActiveState: setActiveState,
    setInActiveState: setInActiveState,
  };
}());
