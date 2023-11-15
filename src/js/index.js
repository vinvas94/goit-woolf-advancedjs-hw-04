import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getImages } from './api';

let page = 1;
let query = null;
let perPage = 40;

let simpleLightbox;

const refs = {
  form: document.querySelector('#search-form'),
  buttonLoad: document.querySelector('.load-more'),
  list: document.querySelector('.gallery'),
};

function createMarkup(arr) {
  if (!refs.list) {
    return;
  }
  const markup = arr
    .map(arr => {
      const {
        id,
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = arr;

      return `
      
      <div class="photo-card" id="${id}">
  <a  href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy"/></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>: ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>: ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>: ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>: ${downloads}
    </p>
  </div>
</div>`;
    })

    .join('');
  refs.list.insertAdjacentHTML('beforeend', markup);
}

refs.form.addEventListener('submit', onSearch);

async function fetchData(query, page, perPage) {
  try {
    const data = await getImages(query, page, perPage);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function onSearch(evt) {
  evt.preventDefault();

  refs.buttonLoad.classList.add('hide');
  page = 1;
  refs.list.innerHTML = '';
  query = evt.currentTarget.searchQuery.value.trim();

  if (query === '') {
    iziToast.warning({
      title: 'Hey',
      message: 'Please specify your search query',
      position: 'topRight',
    });

    return;
  }

  try {
    const data = await fetchData(query, page, perPage);

    if (data.hits.length * page === data.totalHits) {
      refs.buttonLoad.classList.add('hide');
    } else {
      refs.buttonLoad.classList.remove('hide');
    }

    if (data.totalHits === 0) {
      iziToast.error({
        title: 'Hey',
        message:
          'Sorry, there are no images matching your search query. Please try again.',
        position: 'topRight',
      });
    } else {
      createMarkup(data.hits);
      refs.buttonLoad.classList.remove('hide');
      simpleLightboxList();
      iziToast.success({
        title: 'OK',
        message: `Hooray! We found ${data.totalHits} images.`,
        position: 'topRight',
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    refs.form.reset();
  }
}

function simpleLightboxList() {
  if (simpleLightbox) {
    simpleLightbox.refresh();
  } else {
    simpleLightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
      enableKeyboard: true,
    });
  }
}

refs.buttonLoad.addEventListener('click', onButtonLoad);

async function onButtonLoad() {
  page += 1;
  try {
    const data = await fetchData(query, page, perPage);
    if (perPage * page >= data.totalHits) {
      refs.buttonLoad.classList.add('hide');
      iziToast.warning({
        title: 'Hey',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
    createMarkup(data.hits);
    simpleLightboxList();
  } catch (error) {
    console.log(error);
  }
}

// window.addEventListener('scroll', onScroll);

// function onScroll() {
//   const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
//   if (scrollTop + clientHeight >= scrollHeight - 200) {
//     onButtonLoad();
//   }
// }

// onScroll();
