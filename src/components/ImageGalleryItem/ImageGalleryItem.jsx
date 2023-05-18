import { Component } from 'react';
import { Image, Item } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  static propTypes = {
    image: PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired,
  };

  state = {
    selectedImage: null,
  };

  /* Вибрати зображення */
  setSelectedImage = () => {
    this.setState({ selectedImage: this.props.image });
  };

  /* Закрити модальне вікно */
  closeModal = () => {
    this.setState({ selectedImage: null });
  };

  render() {
    const { selectedImage } = this.state;
    const { id, webformatURL, largeImageURL } = this.props.image;
    return (
      <Item>
        <Image src={webformatURL} alt={id} onClick={this.setSelectedImage} />
        {selectedImage && (
          <Modal onClose={this.closeModal}>
            <img src={largeImageURL} alt={id} />
          </Modal>
        )}
      </Item>
    );
  }
}
