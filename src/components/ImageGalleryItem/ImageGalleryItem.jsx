import { useState } from 'react';
import { Image, Item } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ image }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { id, webformatURL, largeImageURL } = image;

  /* Закрити модальне вікно */
  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <Item>
      <Image
        src={webformatURL}
        alt={id}
        onClick={() => setSelectedImage(image)}
      />
      {selectedImage && (
        <Modal onClose={closeModal}>
          <img src={largeImageURL} alt={id} />
        </Modal>
      )}
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};
