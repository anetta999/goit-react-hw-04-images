import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, StyledModal } from './Modal.styled';

const mmodalRoot = document.querySelector('#modal-root');

export const Modal = ({ image, onClose }) => {
  // Вішаємо/прибираємо случач, коли відкриваємо/закриваємо модалку по Esc
  useEffect(() => {
    const handleModalCloseByEsc = evt => {
      if (evt.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleModalCloseByEsc);

    return () => {
      window.removeEventListener('keydown', handleModalCloseByEsc);
    };
  }, [onClose]);

  // Закриваємо модалку по кліку на бекдроп
  const handleModalCloseByClickOnBackdrop = evt => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <Backdrop onClick={handleModalCloseByClickOnBackdrop}>
      <StyledModal>
        <img src={image.largeImageURL} alt={image.tags} />
      </StyledModal>
    </Backdrop>,
    mmodalRoot
  );
};
