'use strict';

(function () {

  var URL = 'https://javascript.pages.academy/keksobooking';
  var TIMEOUT_IN_MS = 10000;
  var statusCode = {
    OK: 200,
  };

  function load(onSuccess, onError) {
    var xhr = setResponse(onSuccess, onError);
    xhr.open('GET', URL + '/data');

    xhr.send();
  }

  function upload(onSuccess, onError, data) {
    var xhr = setResponse(onSuccess, onError);

    xhr.open('POST', URL);
    xhr.send(data);
  }

  function setResponse(onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + TIMEOUT_IN_MS + ' мс');
    });
    return xhr;
  }
  function errorHandler(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 5px auto; text-align: center; background-color: red; border: 2px solid black';
    node.style.position = 'fixed';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  window.backend = {
    load: load,
    upload: upload,
    errorHandler: errorHandler
  };

})();
