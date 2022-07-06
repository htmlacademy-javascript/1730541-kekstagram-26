import {showAlert} from './util.js';

//Отправляем запрос на сервер
const getData = (onSuccess) => {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => {
      showAlert('Ошибка загрузки данных с сервера : - (');
    });
};

//Отправляем данные на сервер
const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://25.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    })
    .then((response) => {
      if (response.ok) {
        onSuccess(true);
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
