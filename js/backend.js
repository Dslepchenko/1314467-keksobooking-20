'use strict';

(function () {
  var TIMEOUT_IN_MS = 10000;
  var statusCode = {
    OK: 200,
  };

  function load(url, onSuccess, onError) {
    var xhr = setResponse(onSuccess, onError);
    xhr.open('GET', url);

    xhr.send();
  }

  function upload(url, onSuccess, onError, data) {
    var xhr = setResponse(onSuccess, onError);

    xhr.open('POST', url);
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

  window.backend = {
    load: load,
    upload: upload
  };

}());
