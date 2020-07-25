'use strict';
(function () {
  var templateCard = document.querySelector('#card').content.querySelector('.map__card');
  var map = document.querySelector('.map');
  var mapContainer = document.querySelector('.map__filters-container');
  var mapPins = document.querySelector('.map__pins');
  var card = templateCard.cloneNode(true);
  var popupPhoto = card.querySelector('.popup__photos');
  var featuresPopup = card.querySelector('.popup__features');

  var getOfferFeatures = function (offerFeatures) {
    if (offerFeatures.length > 0) {
      featuresPopup.innerHTML = '';
      for (var i = 0; i < offerFeatures.length; i++) {
        var feature = document.createElement('li');
        feature.classList.add('popup__feature', 'popup__feature--' + offerFeatures[i]);
        featuresPopup.appendChild(feature);
      }
    } else {
      featuresPopup.classList.add('hidden');
    }
  };
  var getPhotos = function (offerPhotos) {
    if (offerPhotos.length > 0) {
      var photo = card.querySelector('.popup__photo');
      photo.src = offerPhotos[0];
      for (var i = 1; i < offerPhotos.length; i++) {
        photo = photo.cloneNode(true);
        photo.src = offerPhotos[i];
        popupPhoto.appendChild(photo);
      }
    } else {
      popupPhoto.classList.add('hidden');
    }
  };

  var createCard = function (cardOffers) {

    card.querySelector('.popup__title').textContent = cardOffers.offer.title;
    card.querySelector('.popup__text--address').textContent = cardOffers.offer.address;
    card.querySelector('.popup__text--price').textContent = cardOffers.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = cardOffers.offer.type;
    card.querySelector('.popup__text--capacity').textContent = cardOffers.offer.rooms + ' комнаты для ' + cardOffers.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardOffers.offer.checkin + ', выезд до ' + cardOffers.offer.checkout;
    card.querySelector('.popup__description').textContent = cardOffers.offer.description;

    getOfferFeatures(cardOffers);
    getPhotos(cardOffers);

    card.querySelector('.popup__avatar').src = cardOffers.author.avatar;
    return card;
  };
  // if (cardOffers.offer.features.length > 0) {
  //   featuresPopup.innerHTML = '';
  //   for (var j = 0; j < cardOffers.offer.features.length; j++) {
  //     var feature = document.createElement('li');
  //     feature.classList.add('popup__feature', 'popup__feature--' + cardOffers.offer.features[j]);
  //     featuresPopup.appendChild(feature);
  //   }
  // } else {
  //   featuresPopup.classList.add('hidden');
  // }

  // if (cardOffers.offer.photos.length > 0) {
  //   var photo = card.querySelector('.popup__photo');
  //   photo.src = cardOffers.offer.photos[0];
  //   for (var i = 1; i < cardOffers.offer.photos.length; i++) {
  //     photo = photo.cloneNode(true);
  //     photo.src = cardOffers.offer.photos[i];
  //     popupPhoto.appendChild(photo);
  //   }
  // } else {
  //   popupPhoto.classList.add('hidden');
  // }

  var renderCard = function (data) {
    map.innerHTML = '';
    map.appendChild(mapPins);
    map.appendChild(mapContainer);
    mapContainer.before(map.appendChild(createCard(data)));
    var mapCard = document.querySelector('.map__card');
    var closeCard = document.querySelector('.popup__close');

    closeCard.addEventListener('click', function () {
      closePopup(map, mapCard);
    });
  };

  var onPopupEscPress = function (evt) {
    if (evt.key === window.constant.VALUE_KEYS.Escape) {
      evt.preventDefault();
      closePopup();
    }
  };
  var closePopup = function () {
    var mapCard = document.querySelector('.map__card');
    map.removeChild(mapCard);

    document.removeEventListener('keydown', onPopupEscPress);
  };

  window.openPopup = function (pinOffers) {
    renderCard(pinOffers);

    document.addEventListener('keydown', onPopupEscPress);
  };
})();
