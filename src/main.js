import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

const refs = {
  form: document.querySelector('.form'),
  inputData: document.querySelector('input[name="search-text"]'),
};

refs.form.addEventListener('submit', onSubmit);
function onSubmit(event) {
  event.preventDefault();
  const query = refs.form.elements['search-text'].value.trim();
  if (!query) {
    return;
  }
  clearGallery();
  showLoader();
  getImagesByQuery(query)
    .then(data => {
      const hits = data.hits;
      if (!hits.length) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        return;
      }
      createGallery(hits);
    })
    .catch(() => {
      iziToast.error({
        message: 'Something went wrong. Please try again!',
      });
    })
    .finally(() => {
      hideLoader();
    });
}
