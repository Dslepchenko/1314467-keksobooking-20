'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var adFormAddressInput = adForm.querySelector('#address');


  // Функция, реализующая передвижение главной метки (mainPin) по карте
  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var minX = mapPinMain.clientWidth / -2;
    var maxX = mapPins.clientWidth - mapPinMain.clientWidth / 2;
    var minY = window.constant.LOCATION_Y_MIN - window.constant.PIN_MAIN_HEIGHT_WITH_CORNER;
    var maxY = window.constant.LOCATION_Y_MAX - window.constant.PIN_MAIN_HEIGHT_WITH_CORNER;

    // Координаты точки начала движния
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var getCoords = function (min, max, current) {
        if (current > max) {
          current = max;
        } else if (current < min) {
          current = min;
        }
        return current;
      };
      var clientsXCoord = getCoords(minX, maxX, (mapPinMain.offsetLeft - shift.x));
      var clientsYCoord = getCoords(minY, maxY, (mapPinMain.offsetTop - shift.y));
      mapPinMain.style.top = clientsYCoord + 'px';
      mapPinMain.style.left = clientsXCoord + 'px';
      adFormAddressInput.value = (clientsXCoord + window.constant.PIN_MAIN_SIZE / 2) + ', ' + (clientsYCoord + window.constant.PIN_MAIN_HEIGHT_WITH_CORNER);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
}());
