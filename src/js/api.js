import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const API_KEY = '40010712-6d7af93e262d6e116d716f3d5';

axios.defaults.baseURL = 'https://pixabay.com/api/';

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    iziToast.error({
      title: 'Error',
      message:
        'Sorry, there are no images matching your search query. Please try again.',
      position: 'topRight',
      progressBarColor: 'red',
    });
    return Promise.reject(error);
  }
);

async function getImages(query, page, perPage) {
  const response = await axios.get(
    `?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );
  return response.data;
}

export { getImages };
