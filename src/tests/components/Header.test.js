import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Header from '@/components/Header';

describe('Test Header component', () => {
  test('renders without crashing', () => {
    const { container, unmount } = render(<BrowserRouter><Header /></BrowserRouter>);

    expect(container).toBeInTheDocument();
    unmount(container);
  });

  test('renders app name', () => {
    const {
      container,
      unmount,
      getByText
    } = render(<BrowserRouter><Header /></BrowserRouter>);

    getByText('Movie');
    getByText('land');

    unmount(container);
  });

  test('renders app icon', () => {
    const {
      container,
      unmount,
      getAllByAltText
    } = render(<BrowserRouter><Header /></BrowserRouter>);

    const appIcons = getAllByAltText('movieland logo');

    expect(appIcons.length).toBe(2);
    unmount(container);
  });
});
