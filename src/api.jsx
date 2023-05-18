import axios from 'axios';
const API_KEY = '34577809-7101597b9962251251dc5571b';
const PER_PAGE = 12; // скільки виводити на сторінку зображень

export const getImages = async (searchText, page) => {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${searchText}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
  );
  return {
    fetchImages:
      response.data
        .hits /* список зображень 34577809-7101597b9962251251dc5571b*/,
    total: response.data.totalHits /*скільки всього зображень  */,
    per_page: PER_PAGE /* скільки виводити на сторінку зображень */,
  };
};
