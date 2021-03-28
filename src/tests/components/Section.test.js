import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Context from '@/store/store';
import Section from '@/components/Section';

describe('Test Section component', () => {
  test('renders Section component with title and show more link correctly', () => {
    const props = {
      title: 'Trending movies',
      showMoreUrl: '/trending/movie',
    };

    const {
      container,
      unmount,
      getByTestId,
    } = render(<Context><BrowserRouter><Section { ...props } /></BrowserRouter></Context>);

    getByTestId('ml-section-title');
    getByTestId('ml-section-show-more');

    unmount(container);
  });

  test('renders Section component without title and show more link correctly', () => {
    const props = {
      title: '',
      showMoreUrl: '',
    };

    const {
      container,
      unmount,
      queryByTestId,
    } = render(<Context><BrowserRouter><Section { ...props } /></BrowserRouter></Context>);

    expect(queryByTestId('ml-section-title')).toBeNull();
    expect(queryByTestId('ml-section-show-more')).toBeNull();

    unmount(container);
  });
});
