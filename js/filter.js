import { createPhotosFragment } from './drawing.js';
import { getRandomUniqueElements, debounce } from './util.js';

//Описываем переменные
const RANDOM_QUANTITY = 10;
const filters = document.querySelector('.img-filters');
const defaultButton = document.querySelector('#filter-default');
const randomButton = document.querySelector('#filter-random');
const discussedButton = document.querySelector('#filter-discussed');
const activeButton = document.querySelector('.img-filters__button--active');
const allPictures = document.querySelectorAll('.picture');

//Удаляем класс у кнопки
const removeClass = () => {
  activeButton.classList.remove('img-filters__button--active');
};

//Сравнение длинны комментариев
const compareComments = (photoA, photoB) => {
  const rankA = photoA.comments.length;
  const rankB = photoB.comments.length;
  return rankB - rankA;
};

//По умолчанию
const createDefaultFilter = (pictures) => pictures.slice();

//Случайные
const createRandomFilter = (pictures) => {
  const picturesArray = pictures.slice();
  return getRandomUniqueElements(picturesArray).slice(0, RANDOM_QUANTITY);
};

//Обсуждаемые
const createDiscussedFilter = (pictures) => {
  const picturesArray = pictures.slice();
  return picturesArray.sort(compareComments);
};

//Сбрасываем значение фильтра
const clearPicturesContainer = () => {
  allPictures.forEach((picture) => {
    picture.remove();
  });
};

//Присваиваем значение фильтра
const renderPicturesFilter = (pictures) => {
  clearPicturesContainer();
  createPhotosFragment(pictures);
};

//Отфильтровываем изображение по нужному параметру
const showFilteredPictures = (pictures) => {
  filters.classList.remove('img-filters--inactive');
  defaultButton.addEventListener('click', debounce((evt) => {
    removeClass();
    if (evt.target === defaultButton) {
      defaultButton.classList.add('img-filters__button--active');
    }
    renderPicturesFilter(createDefaultFilter(pictures));
  }));
  randomButton.addEventListener('click', debounce((evt) => {
    removeClass();
    if (evt.target === randomButton) {
      randomButton.classList.add('img-filters__button--active');
    }
    renderPicturesFilter(createRandomFilter(pictures));
  }));
  discussedButton.addEventListener('click', debounce((evt) => {
    removeClass();
    if (evt.target === discussedButton) {
      discussedButton.classList.add('img-filters__button--active');
    }
    renderPicturesFilter(createDiscussedFilter(pictures));
  }));
};

export { showFilteredPictures };
