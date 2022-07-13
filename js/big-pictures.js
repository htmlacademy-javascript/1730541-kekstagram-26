import { isEscapeEvent } from './util.js';

//Описание переменных
const MAX_COMMENT = 5;
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img');
const socialCommentCount = document.querySelector('.social__comment-count');
const body = document.querySelector('body');
const commentsList = document.querySelector('.social__comments');
const commentElement = commentsList.querySelector('.social__comment');
const commentsLoader = document.querySelector('.comments-loader');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
let count = 0;

// Отрисовка одного комментария
const getBigPictureComment = (comment) => {
  const commentItem = commentElement.cloneNode(true);
  commentItem.querySelector('.social__picture').src = comment.avatar;
  commentItem.querySelector('.social__picture').alt = comment.name;
  commentItem.querySelector('.social__text').textContent = comment.message;
  return commentItem;
};

//Создание фрагмента комментария
const createCommentsFragment = (commentsArray) => {
  const fragment = document.createDocumentFragment();
  commentsArray.forEach((comment) => {
    const newComment = getBigPictureComment(comment);
    fragment.appendChild(newComment);
  });
  commentsList.appendChild(fragment);
};

//Создание полноразмерного изображения
const ShowBigPhoto = (bigPhoto) => {
  body.classList.add('modal-open');
  commentsList.innerHTML = '';
  bigPictureImg.querySelector('img').src = bigPhoto.url;
  bigPicture.querySelector('.likes-count').textContent = bigPhoto.likes;
  bigPicture.querySelector('.comments-count').textContent = bigPhoto.comments.length;
  bigPicture.querySelector('.social__caption').textContent = bigPhoto.description;
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onBigPictureEscPress);
  renderCommentsSlice();
  commentsLoader.addEventListener('click', commentsLoaderOnClick);

  bigPictureClose.addEventListener('click', onBigPictureCloseClick());
  document.addEventListener('keydown', onBigPictureEscPress);
};


function renderCommentsSlice(bigPhoto) {
  commentElement.innerHTML = '';
  const commentsFragment = document.createDocumentFragment();
  // создаем срез комментов, будет показываться 5 штук, при клике count перезапишется
  const commentsToShow = bigPhoto.comments.slice(0, count + MAX_COMMENT);
  commentsToShow.forEach((comment) => {
    commentsFragment.appendChild(createCommentsFragment(comment));
  });
  commentElement.appendChild(commentsFragment);
  commentsLoader.classList.toggle('hidden', bigPhoto.comments.length === commentsToShow.length);
  socialCommentCount.innerHTML = `${commentsToShow.length} из <span class="comments-count">${bigPhoto.comments.length}</span> комментариев`;
}

//Обработчик загрузки комментариев
function commentsLoaderOnClick() {
  // изменяем значение count прибавляя 5, следовательно slice станет (5, 10), отрисуется еще 5 штук
  count += MAX_COMMENT;
  renderCommentsSlice();
}

// Закрытие окна полноразмерного изображения
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureEscPress);
  bigPictureClose.removeEventListener('click', onBigPictureCloseClick);
  commentsLoader.removeEventListener('click', commentsLoaderOnClick);
  count = 0;
};

// Функция закрытия окна полноразмерного изображения по Escape
function onBigPictureEscPress(evt) {
  isEscapeEvent(evt, closeBigPicture);
}

//Обработчик закрытия окна кликом по иконке закрытия
function onBigPictureCloseClick() {
  closeBigPicture();
}

export { ShowBigPhoto };
