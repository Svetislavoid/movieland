import React from 'react';
import { render } from '@testing-library/react';
import Footer from '@/components/Footer';

describe('Test Footer component', () => {
  test('renders without crashing', () => {
    const {
      container,
      unmount
    } = render(<Footer />);

    expect(container).toBeInTheDocument();
    unmount(container);
  });

  test('renders app author section', () => {
    const {
      container,
      unmount,
      getByTestId
    } = render(<Footer />);

    getByTestId('ml-footer-app-author');

    unmount(container);
  });

  test('renders app author name', () => {
    const {
      container,
      unmount,
      getByText
    } = render(<Footer />);

    getByText('Created by');
    getByText('Svetislav Grujić');

    unmount(container);
  });

  test('renders service links', () => {
    const {
      container,
      unmount,
      getByTestId
    } = render(<Footer />);

    getByTestId('ml-footer-service-links');

    unmount(container);
  });
});
