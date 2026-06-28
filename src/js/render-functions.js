import SimpleLightBox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
};
const lightbox = new SimpleLightBox('.gallery a');

export function createGallery(images) {
  const markup = images
    .map(
      image => `<li>
  <a href="${image.largeImageURL}">
    <img src="${image.webformatURL}" alt="${image.tags}" />
  </a>
  <div>
    <p>Likes: ${image.likes}</p>
    <p>Views: ${image.views}</p>
    <p>Comments: ${image.comments}</p>
    <p>Downloads: ${image.downloads}</p>
  </div>
</li>
  `
    )
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  refs.gallery.innerHTML = '';
}

export function showLoader() {
  refs.loader.classList.add('is-visible');
}
export function hideLoader() {
  refs.loader.classList.remove('is-visible');
}
