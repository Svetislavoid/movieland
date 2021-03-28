import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Menu from '@/components/Menu';

describe('Test Menu component', () => {
  test('renders \'Favorites\' and \'Watch later\' menu links when logged in', () => {
    const props = {
      loggedIn: true,
      login: jest.fn(),
      logout: jest.fn(),
    };

    const {
      container,
      unmount,
      getByText
    } = render(<BrowserRouter><Menu { ...props } /></BrowserRouter>);

    getByText('Settings');
    getByText('Favorites');
    getByText('Watch later');
    getByText('Logout');

    userEvent.click(getByText('Logout'));

    expect(props.logout).toHaveBeenCalledTimes(1);

    unmount(container);
  });

  test('does not render \'Favorites\' and \'Watch later\' menu links when logged out', () => {
    const props = {
      loggedIn: false,
      login: jest.fn(),
      logout: jest.fn(),
    };

    const {
      container,
      unmount,
      getByText,
      queryByText
    } = render(<BrowserRouter><Menu { ...props } /></BrowserRouter>);

    getByText('Settings');
    getByText('Login');
    expect(queryByText('Favorites')).toBeNull();
    expect(queryByText('Watch later')).toBeNull();

    userEvent.click(getByText('Login'));

    expect(props.login).toHaveBeenCalledTimes(1);

    unmount(container);
  });
});
