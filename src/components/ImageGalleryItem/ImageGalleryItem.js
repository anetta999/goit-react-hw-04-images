import { Modal } from 'components/Modal/Modal';

import React, { useState } from 'react';
import { Image, ImageWrap } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Відкриваємо/закриваємо модалку
  const toggleModal = () => {
    setIsModalOpen(prevIsModalOpen => !prevIsModalOpen);
  };

  // Забороняємо скрол, якщо модалка відкрита
  isModalOpen
    ? (document.body.style.overflow = 'hidden')
    : (document.body.style.overflow = 'auto');

  return (
    <>
      <ImageWrap onClick={toggleModal}>
        <Image src={image.webformatURL} alt={image.tags} />
      </ImageWrap>
      {isModalOpen && <Modal image={image} onClose={toggleModal} />}
    </>
  );
};
