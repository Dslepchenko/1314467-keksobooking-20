'use strict';

(function () {

  var startCoordsPin = {};
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');


  mapPinMain.addEventListener('mousedown', function (evt) {
    // Обработчики события передвижения мыши и отпускания кнопки мыши
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    evt.preventDefault();

    // Начальные координаты пина
    startCoordsPin = {
      x: evt.clientX,
      y: evt.clientY
    };

    // Обработчик событий на передвижение мыши
    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      moveMainPin(moveEvt);
    }

    // Обработчик событий на отпускание мыши
    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
  });

  // Функция перемещения пина
  function moveMainPin(evt) {
    var shift = {
      x: startCoordsPin.x - evt.clientX,
      y: startCoordsPin.y - evt.clientY,
    };

    startCoordsPin = {
      x: evt.clientX,
      y: evt.clientY
    };

    var currentX = mapPinMain.offsetLeft - shift.x;
    var currentY = mapPinMain.offsetTop - shift.y;

    // Проверка границ перемещения пина
    var minX = mapPinMain.clientWidth / -2;
    var maxX = mapPins.clientWidth - mapPinMain.clientWidth / 2;
    var minY = window.constant.LOCATION_Y_MIN - window.constant.PIN_MAIN_HEIGHT_WITH_CORNER;
    var maxY = window.constant.LOCATION_Y_MAX - window.constant.PIN_MAIN_HEIGHT_WITH_CORNER;

    if (currentX < 0) {
      currentX = minX;
    } else if (currentX > maxX) {
      currentX = maxX;
    }

    if (currentY < minY) {
      currentY = minY;
    } else if (currentY > maxY) {
      currentY = maxY;
    }

    mapPinMain.style.left = currentX + 'px';
    mapPinMain.style.top = currentY + 'px';
    window.form.getAddressCoordinate(mapPinMain);
  }

}());
