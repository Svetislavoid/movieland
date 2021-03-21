import React from 'react';
import { render } from '@testing-library/react';
import ServiceLink from '@/components/ServiceLink';

describe('Test ServiceLink component', () => {
  test('renders service link with an icon', () => {
    const props = {
      linkClassName: 'ml-footer-service-logo-link',
      imageAlt: 'linkedin logo'
    };

    const {
      container,
      unmount,
      getByAltText,
      getByTestId
    } = render(<ServiceLink { ...props } />);

    getByTestId('ml-footer-service-logo-link');
    getByAltText('linkedin logo');

    unmount(container);
  });
});
