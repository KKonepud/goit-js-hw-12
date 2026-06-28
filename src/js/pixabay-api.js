import axios from 'axios';

export function getImagesByQuery(query) {
  return axios
    .get(`https://pixabay.com/api/`, {
      params: {
        key: '56427454-39c521709c23a9b65e6fd603c',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => response.data);
}
