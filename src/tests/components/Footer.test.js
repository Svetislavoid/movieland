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

  test('renders tmdb link correctly', () => {
    const {
      container,
      unmount,
      getByTestId,
      getByAltText,
    } = render(<Footer />);

    getByAltText('tmdb logo');
    expect(getByTestId('ml-footer-tmdb-link')).toHaveProperty('href', 'https://www.themoviedb.org/');

    unmount(container);
  });

  test('renders linkedin link correctly', () => {
    const {
      container,
      unmount,
      getByTestId,
      getByAltText,
    } = render(<Footer />);

    getByAltText('linkedin logo');
    expect(getByTestId('ml-footer-linkedin-link')).toHaveProperty('href', 'https://www.linkedin.com/in/svetislav-grujic-637537178');

    unmount(container);
  });

  test('renders gitlab link correctly', () => {
    const {
      container,
      unmount,
      getByTestId,
      getByAltText,
    } = render(<Footer />);

    getByAltText('gitlab logo');
    expect(getByTestId('ml-footer-gitlab-link')).toHaveProperty('href', 'https://gitlab.com/Svetislavoid');

    unmount(container);
  });

  test('renders github link correctly', () => {
    const {
      container,
      unmount,
      getByTestId,
      getByAltText,
    } = render(<Footer />);

    getByAltText('github logo');
    expect(getByTestId('ml-footer-github-link')).toHaveProperty('href', 'https://github.com/Svetislavoid');

    unmount(container);
  });

  test('renders bitbucket link correctly', () => {
    const {
      container,
      unmount,
      getByTestId,
      getByAltText,
    } = render(<Footer />);

    getByAltText('bitbucket logo');
    expect(getByTestId('ml-footer-bitbucket-link')).toHaveProperty('href', 'https://bitbucket.org/Svetislav');

    unmount(container);
  });
});
