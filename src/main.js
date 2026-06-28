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
  loadMoreBtn: document.querySelector('.load-more'),
};

let currentQuery = '';
let page = 1;

refs.form.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

async function onSubmit(event) {
  event.preventDefault();

  const query = refs.form.elements['search-text'].value.trim();
  if (!query) return;

  currentQuery = query;
  page = 1;

  clearGallery();
  refs.loadMoreBtn.classList.remove('is-visible');

  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    const hits = data.hits;
    const totalPages = Math.ceil(data.totalHits / 15);

    if (!hits.length) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    createGallery(hits);

    if (totalPages > 1) {
      refs.loadMoreBtn.classList.add('is-visible');
    } else {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again!',
    });
  } finally {
    hideLoader();
  }
}

async function onLoadMore() {
  page += 1;

  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);
    const hits = data.hits;
    const totalPages = Math.ceil(data.totalHits / 15);

    if (!hits.length) {
      refs.loadMoreBtn.classList.remove('is-visible');

      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });

      return;
    }

    createGallery(hits);
    const card = document.querySelector('.gallery li');

    if (card) {
      const cardHeight = card.getBoundingClientRect().height;

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

    if (page >= totalPages) {
      refs.loadMoreBtn.classList.remove('is-visible');

      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again!',
    });
  } finally {
    hideLoader();
  }
}
