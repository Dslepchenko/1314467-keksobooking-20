'use strict';
(function () {

  var advertArr = [];
  // Находим map, и удаляем у него класс
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
  // Находим селектор map__pins
  var mapPins = document.querySelector('.map__pins');

  // Находим шаблон #pin
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');

  function getPinTemplate(data) {
    var pinElement = templatePin.cloneNode(true);
    var pinIcon = pinElement.querySelector('img');
    pinElement.style = 'left: ' + data.location.x + 'px; top: ' + data.location.y + 'px;';
    pinIcon.src = data.author.avatar;
    pinIcon.alt = data.author.title;
    pinElement.addEventListener('click', function () {
      window.openPopup(data);
    });

    pinElement.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        window.openPopup(data);
      }
    });
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


  var successHandler = function (arrData) {
    advertArr = arrData;
    renderPins(advertArr);
  };


  window.pins = {
    successHandler: successHandler
  };

})();
