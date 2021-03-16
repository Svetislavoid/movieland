import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

// components
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

  const { loggedIn } = state;

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
        ...state.confirmModalData,
        show: true,
        title: 'Login on TMDb',
        content: 'Movieland needs your permission to read and write data on your behalf on TMDb. This is necessary if you want to see and maintain your favorites and watch later lists. You will be redirected to the TMDb website where you can login and approve Movieland to use your data.',
        cancelClicked: () => dispatch({
          type: 'SHOW_CONFIRM_MODAL',
          payload: { show: false }
        }),
        okClicked: () => loginOnTMDB()
      }
    });
  };

  const logout = () => {
    dispatch({
      type: 'SHOW_CONFIRM_MODAL',
      payload: {
        ...state.confirmModalData,
        show: true,
        title: 'Logout',
        content: 'If you logout you will no longer be able to view your favorites and watch later lists, or add/remove new movies or tv shows from within Movieland. Logout anyway?',
        cancelClicked: () => dispatch({
          type: 'SHOW_CONFIRM_MODAL',
          payload: { show: false }
        }),
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
        }
      }
    });
  };

  const Menu = (props) => {
    const { loggedIn } = props;

    return (
      <div className='ml-home-menu'>
        {
          loggedIn && (
            <>
              <Link
                className='ml-home-menu-link'
                to='/favorites'
              >
                <i className='material-icons ml-home-menu-icons'>
                  favorite
                </i>
                Favorites
              </Link>
              <Link
                className='ml-home-menu-link'
                to='/watch-later'
              >
                <i className='material-icons ml-home-menu-icons'>
                  watch_later
                </i>
                Watch later
              </Link>
            </>
          )
        }
        <Link
          className='ml-home-menu-link'
          to='/settings'
        >
          <i className='material-icons ml-home-menu-icons'>
            settings
          </i>
          Settings
        </Link>
        {
          loggedIn ?
            (<div
              className='ml-home-menu-link'
              onClick={logout}
            >
              <i className='material-icons ml-home-menu-icons'>
                person
              </i>
              Logout
            </div>) :
            (<div
              className='ml-home-menu-link'
              onClick={login}
            >
              <i className='material-icons ml-home-menu-icons'>
                person
              </i>
              Login
            </div>)
        }
      </div>
    );
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
        Welcome to Movieland! A great place to find all you want to know about latest movies, tv shows and actors!
      </h5>
      <div className='ml-home-search'>
        <SearchInput />
      </div>
      <Menu loggedIn={loggedIn} />
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
