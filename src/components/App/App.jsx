import { Component } from 'react';
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
export class App extends Component {
  state = {
    searchText: '',
    page: 1,
    totalPages: 0,
    images: [],
    error: null,
    status: Status.IDLE,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchText, page } = this.state;

    if (prevState.searchText !== searchText || prevState.page !== page) {
      try {
        this.setState({ status: Status.PENDING });

        const { fetchImages, total, per_page } = await getImages(
          searchText,
          page
        );

        const totalPages = Math.floor(total / per_page);
        this.setState(prevState => ({
          images: [...prevState.images, ...fetchImages],
          totalPages,
          status: Status.RESOLVED,
        }));
      } catch (error) {
        this.setState({ error, status: Status.REJECTED });
      }
    }
  }

  /* Задати пошуковий запит */
  handleSearchText = searchText => {
    this.setState({
      searchText,
      images: [],
      page: 1,
      totalPages: 0,
    });
  };

  /* Завантажити більше зображень */
  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, page, totalPages, error, status } = this.state;

    return (
      <>
        <GlobalStyle />
        <Searchbar onSubmit={this.handleSearchText} />
        {status === Status.PENDING && <Loader />}
        {status === Status.REJECTED && (
          <ErrorMess>Помилка: {error.message}</ErrorMess>
        )}
        {status === Status.RESOLVED && images && (
          <>
            <ImageGallery images={images} />
            {totalPages > page && (
              <Button onClick={this.loadMore}>Load more</Button>
            )}
          </>
        )}
        {status === Status.RESOLVED && images.length === 0 && (
          <ErrorMess>Sorry. There are no images.</ErrorMess>
        )}
      </>
    );
  }
}
