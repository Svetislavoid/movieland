import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ImagesModal from '@/components/ImagesModal';

// settings
import {
  POSTER_SIZES,
  SECURE_BASE_URL,
} from '@/common/settings';

describe('Test ImagesModal component', () => {
  test('renders images modal with the right props', () => {
    const props = {
      images: [
        {
          'aspect_ratio': 1.777777777777778,
          'file_path': '/pcDc2WJAYGJTTvRSEIpRZwM3Ola.jpg',
          'height': 2160,
          'iso_639_1': 'xx',
          'vote_average': 5.518,
          'vote_count': 10,
          'width': 3840
        },
        {
          'aspect_ratio': 1.777777777777778,
          'file_path': '/43NwryODVEsbBDC0jK3wYfVyb5q.jpg',
          'height': 2160,
          'iso_639_1': null,
          'vote_average': 5.456,
          'vote_count': 7,
          'width': 3840
        },
        {
          'aspect_ratio': 1.777777777777778,
          'file_path': '/hjypZf7Juayon8emI6HNSyjbqWF.jpg',
          'height': 900,
          'iso_639_1': 'xx',
          'vote_average': 5.326,
          'vote_count': 7,
          'width': 1600
        },
        {
          'aspect_ratio': 1.777777777777778,
          'file_path': '/nMxZG7NMm9KAatblQ08RkOxTQD6.jpg',
          'height': 1080,
          'iso_639_1': null,
          'vote_average': 5.318,
          'vote_count': 3,
          'width': 1920
        },
      ],
      openedImageIndex: 0,
      closeImagesModal: jest.fn()
    };

    const {
      container,
      unmount,
      getByTestId,
      queryByTestId
    } = render(<ImagesModal { ...props } />);

    getByTestId('ml-images-modal-image');
    getByTestId('ml-images-modal-close-button');
    expect(queryByTestId('ml-images-modal-prev-button')).toBeNull();
    expect(queryByTestId('ml-images-modal-next-button')).not.toBeNull();

    expect(getByTestId('ml-images-modal-image')).toHaveAttribute('src', `${SECURE_BASE_URL}${POSTER_SIZES.original}/pcDc2WJAYGJTTvRSEIpRZwM3Ola.jpg`);

    userEvent.click(getByTestId('ml-images-modal-next-button'));

    expect(getByTestId('ml-images-modal-image')).toHaveAttribute('src', `${SECURE_BASE_URL}${POSTER_SIZES.original}/43NwryODVEsbBDC0jK3wYfVyb5q.jpg`);

    expect(queryByTestId('ml-images-modal-prev-button')).not.toBeNull();
    expect(queryByTestId('ml-images-modal-next-button')).not.toBeNull();

    userEvent.click(getByTestId('ml-images-modal-prev-button'));

    expect(getByTestId('ml-images-modal-image')).toHaveAttribute('src', `${SECURE_BASE_URL}${POSTER_SIZES.original}/pcDc2WJAYGJTTvRSEIpRZwM3Ola.jpg`);

    userEvent.click(getByTestId('ml-images-modal-next-button'));

    expect(getByTestId('ml-images-modal-image')).toHaveAttribute('src', `${SECURE_BASE_URL}${POSTER_SIZES.original}/43NwryODVEsbBDC0jK3wYfVyb5q.jpg`);

    userEvent.click(getByTestId('ml-images-modal-next-button'));

    expect(getByTestId('ml-images-modal-image')).toHaveAttribute('src', `${SECURE_BASE_URL}${POSTER_SIZES.original}/hjypZf7Juayon8emI6HNSyjbqWF.jpg`);

    userEvent.click(getByTestId('ml-images-modal-next-button'));

    expect(getByTestId('ml-images-modal-image')).toHaveAttribute('src', `${SECURE_BASE_URL}${POSTER_SIZES.original}/nMxZG7NMm9KAatblQ08RkOxTQD6.jpg`);

    expect(queryByTestId('ml-images-modal-prev-button')).not.toBeNull();
    expect(queryByTestId('ml-images-modal-next-button')).toBeNull();

    unmount(container);
  });
});
