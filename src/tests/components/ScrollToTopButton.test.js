import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ScrollToTopButton from '@/components/ScrollToTopButton';

describe('Test ScrollToTopButton component', () => {
  test('scrolls to top of the page when clicked', () => {
    const {
      container,
      unmount,
      getByTestId
    } = render(<ScrollToTopButton />);

    window.scrollTo = jest.fn();
    userEvent.click(getByTestId('ml-scroll-to-top-button'));
    expect(window.scrollTo).toBeCalledWith({ top: 0, behavior: 'smooth' });

    unmount(container);
  });
});
