import React, { useState } from 'react';

// styles
import '@/components/ImagesModal.css';

// settings & functions
import {
  POSTER_SIZES,
  SECURE_BASE_URL,
} from '@/common/settings';

const ImagesModal = (props) => {
  const {
    images,
    openedImageIndex,
    closeImagesModal
  } = props;

  const [currentImageIndex, setCurrentImageIndex] = useState(openedImageIndex);

  const goToPreviousImage = () => {
    setCurrentImageIndex(currentImageIndex - 1);
  };

  const goToNextImage = () => {
    setCurrentImageIndex(currentImageIndex + 1);
  };

  return (
    <div className='ml-images-modal-wrapper'>
      <img
        data-testid='ml-images-modal-image'
        className='ml-images-modal-image'
        src={`${SECURE_BASE_URL}${POSTER_SIZES.original}${images[currentImageIndex].file_path}`}
        alt='poster'
      />
      {
        currentImageIndex !== 0 &&
        (<div
          data-testid='ml-images-modal-prev-button'
          className='ml-images-modal-button ml-images-modal-left-button'
          onClick={goToPreviousImage}
        >
          <i className="small material-icons ml-images-modal-button-icon">navigate_before</i>
        </div>)
      }
      {
        currentImageIndex !== images.length - 1 &&
        (<div
          data-testid='ml-images-modal-next-button'
          className='ml-images-modal-button ml-images-modal-right-button'
          onClick={goToNextImage}
        >
          <i className="small material-icons ml-images-modal-button-icon">navigate_next</i>
        </div>)
      }
      <div
        data-testid='ml-images-modal-close-button'
        className='ml-images-modal-button ml-images-modal-close-button'
        onClick={closeImagesModal}
      >
        <i className="small material-icons ml-images-modal-button-icon">close</i>
      </div>
    </div>
  );
};

export default ImagesModal;
