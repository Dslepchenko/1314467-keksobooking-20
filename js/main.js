'use strict';
(function () {

  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');
  var adFormFieldsets = document.querySelectorAll('.ad-form fieldset');
  var filterFormSelect = document.querySelectorAll('.map__filters select');
  var filterFormFieldsets = document.querySelectorAll('.map__filters fieldset');
  var mapPinMain = document.querySelector('.map__pin--main');
  var typeHousingSelectAdForm = adForm.querySelector('select[name="type"]');
  var priceInputAdForm = adForm.querySelector('input[name="price"]');
  var UNACTIVE_PIN_COORDS = '603, 408';
  var MAIN_PIN_LEFT = '575px';
  var MAIN_PIN_TOP = '375px';
  var adFormAddressInput = adForm.querySelector('#address');
  var getTimeIn = document.querySelector('#timein');
  var getTimeOut = document.querySelector('#timeout');
  var roomNumbers = document.querySelector('#room_number');
  var guestsCapacity = document.querySelector('#capacity');

  // disable || enable для объектов страницы
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
  var deletePins = function () {
    var pinsItems = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pinsItems.forEach(function (pin) {
      pin.remove();
    });
  };
  // Неактивный статус страницы
  var setInActiveState = function () {
    deletePins();
    mapPinMain.style.left = MAIN_PIN_LEFT;
    mapPinMain.style.top = MAIN_PIN_TOP;
    map.classList.add('map--faded');
    mapPins.classList.add('map--faded');
    mapFilters.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    deActivationPage(adFormFieldsets);
    deActivationPage(filterFormSelect);
    deActivationPage(filterFormFieldsets);
    deActivationPage(mapFilters);
    adFormAddressInput.value = UNACTIVE_PIN_COORDS;
  };

  // Активный статус страницы
  var setActiveState = function () {
    map.classList.remove('map--faded');
    mapPins.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    activationPage(adFormFieldsets);
    activationPage(filterFormSelect);
    activationPage(filterFormFieldsets);
    activationPage(adForm);
    activationPage(mapFilters);
    window.backend.load(window.pins.successHandler, window.backend.onDataError);
    window.form.onTitleChanged(typeHousingSelectAdForm);
    // adFormAddressInput.value = window.form.getAddressCoordinate(mapPinMain);
    window.form.onTypeHousingChanged(priceInputAdForm, typeHousingSelectAdForm);
    window.form.getTimeInAndTimeOut(getTimeIn, getTimeOut);
    window.form.getGuestCapacity(roomNumbers, guestsCapacity);
  };

  // обработчик события по клику на главный пин, и дальнейшая активация страницы
  mapPinMain.addEventListener('click', function () {
    setActiveState();
  });
  // обработчик события по нажатию Enter, и дальнейшая активация страницы
  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === window.constant.VALUE_KEYS.Enter) {
      setActiveState();
    }
  });
  setInActiveState();

  window.main = {
    setInActiveState: setInActiveState,
  };
})();
