import { isEscapeEvent } from './util.js';

//Задаем переменные
const MAX_COMMENTS = 5;
const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentsToShowCount = bigPicture.querySelector('.social__comment-count');
const body = document.querySelector('body');
let count = 0;

//Создаем комментарий
const createCommentItem = (comment) => {
  const newCommentItem = document.createElement('li');
  newCommentItem.classList.add('social__comment');
  const commentImage = document.createElement('img');
  commentImage.classList.add('social__picture');
  commentImage.src = comment.avatar;
  commentImage.alt = comment.name;
  commentImage.width = 35;
  commentImage.height = 35;
  newCommentItem.appendChild(commentImage);

  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = comment.message;
  newCommentItem.appendChild(commentText);
  return newCommentItem;
};

//Функция открытия полноразмерного изображения
const renderFullImage = (picture) => {

  //Функция события закрытия на кнопку
  const onPopupEscKeydown = (evt) => {
    isEscapeEvent(evt, closeFullImage);
  };

  //Функция события закрытия по клику
  const onPopupCloseButtonClick = () => {
    closeFullImage();
  };

  //Функция закрытия изображения
  function closeFullImage() {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEscKeydown);
    closeButton.removeEventListener('click', onPopupCloseButtonClick);
    commentsLoader.removeEventListener('click', commentsLoaderOnClick);
    count = 0;
  }
  //Обработчик события закрытия по клику
  closeButton.addEventListener('click', onPopupCloseButtonClick);

  //Обработчик события закрытия по кнопке
  document.addEventListener('keydown', onPopupEscKeydown);


  function commentsLoaderOnClick() {
    count += MAX_COMMENTS;
    renderCommentsSlice();
  }

  function renderCommentsSlice() {
    commentsContainer.innerHTML = '';
    const commentsFragment = document.createDocumentFragment();
    // создаем срез комментов, будет показываться 5 штук, при клике count перезапишется
    const commentsToShow = picture.comments.slice(0, count + MAX_COMMENTS);
    commentsToShow.forEach((comment) => {
      commentsFragment.appendChild(createCommentItem(comment));
    });
    commentsContainer.appendChild(commentsFragment);
    commentsLoader.classList.toggle('hidden', picture.comments.length === commentsToShow.length);
    commentsToShowCount.innerHTML = `${commentsToShow.length} из <span class="comments-count">${picture.comments.length}</span> комментариев`;
  }

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;

  renderCommentsSlice();
  commentsLoader.addEventListener('click', commentsLoaderOnClick);
};

export { renderFullImage };
