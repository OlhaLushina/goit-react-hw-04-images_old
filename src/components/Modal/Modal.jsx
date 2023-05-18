import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalWindow, Overlay } from './Modal.styled';
import PropTypes from 'prop-types';
const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ children, onClose }) => {
  useEffect(() => {
    /* Реєструємо прослуховувача події*/
    window.addEventListener('keydown', this.handleKeyDown);

    return () => {
      /* Видаляємо прослуховувача події*/
      window.removeEventListener('keydown', this.handleKeyDown);
    };
  }, []);

  /* Закриваємо модалку по Esc */
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  /* Закриваємо модалку по backdrop */
  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalWindow>{children}</ModalWindow>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};
