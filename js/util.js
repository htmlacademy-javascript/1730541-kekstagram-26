const ALERT_SHOW_TIME = 5000;
const TIME_OUT_DELAY = 500;

//Генерация числа из массива
const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Функция для проверки максимальной длины строки
const checkStringLength = (string, length) => string.length <= length;

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
const showAlert = () => {
  const alertContainerElement = document.createElement('div');
  alertContainerElement.classList.add('alert__container');
  const alertElement = document.createElement('div');
  alertElement.classList.add('alert__message');
  alertElement.textContent = 'Ошибка загрузки данных';
  alertContainerElement.append(alertElement);
  document.body.append(alertContainerElement);

  setTimeout(() => {
    alertContainerElement.remove();
  }, ALERT_SHOW_TIME);
};

export { getRandomPositiveInteger, checkStringLength, isEscapeEvent, showAlert, debounce, getRandomUniqueElements };
