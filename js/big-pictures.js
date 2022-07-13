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
const commentsCount = document.querySelector('.comments-count');
const commentListFragment = document.createDocumentFragment();
let count = 0;

// Закрытие окна полноразмерного изображения
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureEscPress);
  bigPictureClose.removeEventListener('click', onBigPictureCloseClick);
};

// Функция закрытия окна полноразмерного изображения по Escape
function onBigPictureEscPress(evt) {
  isEscapeEvent(evt, closeBigPicture);
}

//Обработчик закрытия окна кликом по иконке закрытия
function onBigPictureCloseClick() {
  bigPictureClose.addEventListener('click', closeBigPicture);
}

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
  bigPictureClose.addEventListener('click', onBigPictureCloseClick);
  const getCurentCommentCount = Math.floor(commentsCount / MAX_COMMENT) + Math.ceil(commentsCount % MAX_COMMENT / MAX_COMMENT);
  if (MAX_COMMENT >= commentsCount) {
    commentsLoader.classList.add('hidden');
  }
  else {
    commentsLoader.classList.remove('hidden');
  }

  // Функция добавления комментариев
  const addCommentsToList = () => {
    bigPhoto.comments.slice(count * MAX_COMMENT, (count + 1) * MAX_COMMENT).forEach((comment) => {
      const commentElementCopy = commentElement.cloneNode(true);
      const commentAvatar = commentElementCopy.querySelector('.social__comment .social__picture');
      const commentMesssage = commentElementCopy.querySelector('.social__comment .social__text');
      commentAvatar.src = comment.avatar;
      commentAvatar.alt = comment.name;
      commentMesssage.textContent = comment.message;
      commentListFragment.append(commentElementCopy);
    });
    commentsList.append(createCommentsFragment);
    const shownComments = (count + 1) * MAX_COMMENT <= commentsCount ? (count + 1) * MAX_COMMENT : commentsCount;
    socialCommentCount.textContent = `${shownComments} из ${commentsCount} комментариев`;
  };

  commentsLoader.addEventListener('click', () => {
    count++;
    if (count === getCurentCommentCount - 1) {
      commentsLoader.classList.add('hidden');
    }
    addCommentsToList();
  });
};

export { ShowBigPhoto };
