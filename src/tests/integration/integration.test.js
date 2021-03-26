import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Context from '@/store/store';

// pages
import Auth from '@/pages/Auth';
import Error from '@/pages/Error';
import Favorites from '@/pages/Favorites';
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Settings from '@/pages/Settings';
import Single from '@/pages/Single';
import Trending from '@/pages/Trending';
import WatchLater from '@/pages/WatchLater';

afterEach(cleanup);

describe('Test integration', () => {
  describe('Test back button rendering', () => {
    const pages = [
      {
        name: 'Auth',
        component: <Auth />,
        backButtonTest: (el) => expect(el).toBeNull()
      },
      {
        name: 'Error',
        component: <Error />,
        backButtonTest: (el) => expect(el).toBeNull()
      },
      {
        name: 'Favorites',
        component: <Favorites />,
        backButtonTest: (el) => expect(el).not.toBeNull()
      },
      {
        name: 'Home',
        component: <Home />,
        backButtonTest: (el) => expect(el).toBeNull()
      },
      {
        name: 'Search',
        component: <Search />,
        backButtonTest: (el) => expect(el).not.toBeNull()
      },
      {
        name: 'Settings',
        component: <Settings />,
        backButtonTest: (el) => expect(el).not.toBeNull()
      },
      {
        name: 'Single',
        component: <Single />,
        backButtonTest: (el) => expect(el).not.toBeNull()
      },
      {
        name: 'Trending',
        component: <Trending />,
        backButtonTest: (el) => expect(el).not.toBeNull()
      },
      {
        name: 'WatchLater',
        component: <WatchLater />,
        backButtonTest: (el) => expect(el).not.toBeNull()
      },
    ];

    pages.forEach((page) => {
      const { name, component, backButtonTest } = page;

      test(`${name} page`, () => {
        const {
          container,
          unmount,
          queryByTestId
        } = render(<Context><BrowserRouter>{component}</BrowserRouter></Context>);

        expect(container).toBeInTheDocument();

        backButtonTest(queryByTestId('ml-back-button'));

        unmount(container);
      });
    });
  });
});
