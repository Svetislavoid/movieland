import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

// components
import Menu from '@/components/Menu';
import Section from '@/components/Section';
import SearchInput from '@/components/SearchInput';

// styles
import '@/pages/Home.css';

// services & store
import {
  getRequestToken,
  getTrending
} from '@/services';
import { Context } from '@/store/store';

// settings & functions
import { responseItemHasNeededData, getSetting } from '@/common/functions';
import { AUTH_URL, MOVIELAND_BASE_URL } from '@/common/settings';

// texts
import texts from '@/common/texts.json';

// libraries
import { take } from 'lodash';

const Home = () => {
  // state variables
  const [trendingAll, setTrendingAll] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTvShows, setTrendingTvShows] = useState([]);
  const [trendingPersons, setTrendingPersons] = useState([]);
  const [trendingMediaTypes] = useState(getSetting('trendingMediaTypes'));
  const [trendingTimeWindow] = useState(getSetting('trendingTimeWindow'));
  const [numberOfTrendingItemsToShow] = useState(getSetting('numberOfTrendingItemsToShow'));
  const [trendingAllLoaded, setTrendingAllLoaded] = useState(false);
  const [trendingMoviesLoaded, setTrendingMoviesLoaded] = useState(false);
  const [trendingTvShowsLoaded, setTrendingTvShowsLoaded] = useState(false);
  const [trendingPersonsLoaded, setTrendingPersonsLoaded] = useState(false);

  // history
  const history = useHistory();

  // Context
  const [state, dispatch] = useContext(Context);

  const {
    loggedIn,
    confirmModalData
  } = state;

  const {
    homepage: {
      welcomeMessage
    },
    loginModal: {
      loginTitle,
      loginContent,
      logoutTitle,
      logoutContent
    }
  } = texts;

  const loginOnTMDB = () => {
    getRequestToken().then((response) => {
      const { request_token: requestToken } = response.data;

      window.location.href = `${AUTH_URL}${requestToken}?redirect_to=${MOVIELAND_BASE_URL}approve`;
    });
  };

  const login = () => {
    dispatch({
      type: 'SHOW_CONFIRM_MODAL',
      payload: {
        ...confirmModalData,
        show: true,
        title: loginTitle,
        content: loginContent,
        cancelClicked: () => {
          dispatch({
            type: 'SHOW_CONFIRM_MODAL',
            payload: { show: false }
          });
          dispatch({
            type: 'PREVENT_PAGE_SCROLL',
            payload: { preventPageScroll: false }
          });
        },
        okClicked: () => {
          loginOnTMDB();
          dispatch({
            type: 'PREVENT_PAGE_SCROLL',
            payload: { preventPageScroll: false }
          });
        }
      }
    });
    dispatch({
      type: 'PREVENT_PAGE_SCROLL',
      payload: {
        preventPageScroll: true,
        pageScrollTop: document.documentElement.scrollTop
      }
    });
  };

  const logout = () => {
    dispatch({
      type: 'SHOW_CONFIRM_MODAL',
      payload: {
        ...confirmModalData,
        show: true,
        title: logoutTitle,
        content: logoutContent,
        scrollTop: document.documentElement.scrollTop,
        cancelClicked: () => {
          dispatch({
            type: 'SHOW_CONFIRM_MODAL',
            payload: { show: false }
          });
          dispatch({
            type: 'PREVENT_PAGE_SCROLL',
            payload: { preventPageScroll: false }
          });
        },
        okClicked: () => {
          localStorage.removeItem('accountId');
          localStorage.removeItem('sessionId');
          dispatch({
            type: 'SET_LOGGED_IN',
            payload: false
          });
          dispatch({
            type: 'SHOW_CONFIRM_MODAL',
            payload: { show: false }
          });
          dispatch({
            type: 'PREVENT_PAGE_SCROLL',
            payload: { preventPageScroll: false }
          });
        }
      }
    });
    dispatch({
      type: 'PREVENT_PAGE_SCROLL',
      payload: {
        preventPageScroll: true,
        pageScrollTop: document.documentElement.scrollTop
      }
    });
  };

  // Get data for each trending type defined in settings
  useEffect(() => {
    trendingMediaTypes.forEach((type) => {
      getTrending(type, trendingTimeWindow)
        .then((response) => {
          const { results } = response.data;

          // Filter result items that do not have all the needed data
          const filteredResults = results.filter((item) => responseItemHasNeededData(item));
          const items = take(filteredResults, numberOfTrendingItemsToShow);

          if (type === 'movie') {
            setTrendingMovies(items);
            setTrendingMoviesLoaded(true);
          } else if (type === 'tv') {
            setTrendingTvShows(items);
            setTrendingTvShowsLoaded(true);
          } else if (type === 'person') {
            setTrendingPersons(items);
            setTrendingPersonsLoaded(true);
          } else if (type === 'all') {
            setTrendingAll(items);
            setTrendingAllLoaded(true);
          }

          return response;
        })
        .catch((error) => {
          history.push('/error');
        });
    });
  }, [history, trendingMediaTypes, trendingTimeWindow, numberOfTrendingItemsToShow]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='ml-home'>
      <h5 className='ml-home-welcome-message'>
        { welcomeMessage }
      </h5>
      <div className='ml-home-search'>
        <SearchInput />
      </div>
      <Menu
        loggedIn={loggedIn}
        login={login}
        logout={logout}
      />
      {
        trendingMediaTypes.includes('all') &&
        <Section
          title='Trending'
          showMoreUrl='/trending'
          dataToShow={trendingAll}
          loaded={trendingAllLoaded}
        />
      }
      {
        trendingMediaTypes.includes('movie') &&
        <Section
          title='Trending movies'
          showMoreUrl='/trending/movie'
          dataToShow={trendingMovies}
          loaded={trendingMoviesLoaded}
        />
      }
      {
        trendingMediaTypes.includes('tv') &&
        <Section
          title='Trending TV shows'
          showMoreUrl='/trending/tv'
          dataToShow={trendingTvShows}
          loaded={trendingTvShowsLoaded}
        />
      }
      {
        trendingMediaTypes.includes('person') &&
        <Section
          title='Trending persons'
          showMoreUrl='/trending/person'
          dataToShow={trendingPersons}
          loaded={trendingPersonsLoaded}
        />
      }
    </div>
  );
};

export default Home;
