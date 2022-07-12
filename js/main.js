import { createPhotosFragment } from './picture.js';
import { onImageOverlayClose } from './form.js';
import { setUserFormSubmit } from './validation.js';
import { getData } from './api.js';
import { showFilteredPictures } from './filter.js';
import { initEffects } from './slider.js';


//Отправляем запрос на сервер
getData((photos) => {
  createPhotosFragment(photos);
  showFilteredPictures(photos);
});

setUserFormSubmit(onImageOverlayClose);
initEffects();
