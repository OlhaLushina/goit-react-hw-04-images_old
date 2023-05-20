import { useState, useEffect } from 'react';
import { getImages } from 'api';
import { GlobalStyle } from '../GlobalStyle';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Searchbar } from '../Searchbar/Searchbar';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { ErrorMess } from 'components/ErrorMess/ErrorMess.styled';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED: 'rejected',
  RESOLVED: 'resolved',
};

export const App = () => {
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    if (!searchText) {
      return;
    }
    async function searchImages() {
      try {
        /* Задаємо статус */
        setStatus(Status.PENDING);

        /* Пошук зображень */
        const { fetchImages, total, per_page } = await getImages(
          searchText,
          page
        );

        /* Задаємо зображення */
        if (page === 1) {
          setImages(fetchImages);
        } else {
          setImages(prevState => [...prevState, ...fetchImages]);
        }

        /* Задаємо загальну кількість сторінок */
        setTotalPages(Math.floor(total / per_page));

        /* Задаємо статус */
        setStatus(Status.RESOLVED);
      } catch (error) {
        /* Задаємо помилку  */
        setError(error);

        /* Задаємо статус */
        setStatus(Status.RESOLVED);
      }
    }

    searchImages();
  }, [searchText, page]);

  /* Задати пошуковий запит */
  const handleSearchText = searchText => {
    setSearchText(searchText);
    setPage(1);
  };

  /* Завантажити більше зображень */
  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <>
      <GlobalStyle />
      <Searchbar onSubmit={handleSearchText} />
      {status === Status.PENDING && <Loader />}
      {status === Status.REJECTED && (
        <ErrorMess>Помилка: {error.message}</ErrorMess>
      )}
      {status === Status.RESOLVED && images && (
        <>
          <ImageGallery images={images} />
          {totalPages > page && <Button onClick={loadMore}>Load more</Button>}
        </>
      )}
      {status === Status.RESOLVED && images.length === 0 && (
        <ErrorMess>Sorry. There are no images.</ErrorMess>
      )}
    </>
  );
};
