import axios from 'axios';

export async function getImagesByQuery(query, page) {
  const response = await axios.get(`https://pixabay.com/api/`, {
    params: {
      key: '56427454-39c521709c23a9b65e6fd603c',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 15,
    },
  });
  return response.data;
}
