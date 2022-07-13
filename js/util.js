const ALERT_SHOW_TIME = 5000;
const TIME_OUT_DELAY = 500;

//Генерация числа из массива
function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

// Функция для проверки максимальной длины строки
function checkStringLength(string, length) {
  return string.length <= length;
}

// Функция закрытия окна по Escape
const isEscapeEvent = (evt, action) => {
  if (evt.key === 'Escape') {
    action();
  }
};

//Декоратор
const debounce = (callback, timeoutDelay = TIME_OUT_DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

// Функция, создающая не повторяющийся массив элементов
const getRandomUniqueElements = (arr) => {
  const newArray = arr.slice();
  const elements = [];
  const newArrayLength = arr.length;
  for (let i = 0; i < newArrayLength; i++) {
    const randomId = getRandomPositiveInteger(0, newArray.length - 1);
    elements.push(newArray[randomId]);
    newArray.splice(randomId, 1);
  }
  return elements;
};

//Показ сообщения об отправке с ошибкой на 5 секунд
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export { getRandomPositiveInteger, checkStringLength, isEscapeEvent, showAlert, debounce, getRandomUniqueElements };
