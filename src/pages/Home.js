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

  // history
  const history = useHistory();

  // Context
  const [state, dispatch] = useContext(Context);

  const { loggedIn } = state;

  const login = () => {
    getRequestToken().then((response) => {
      const { request_token } = response.data;

      window.location.href = `${AUTH_URL}${request_token}?redirect_to=${MOVIELAND_BASE_URL}approve`;
    });
  };

  const logout = () => {
    localStorage.removeItem('accountId');
    localStorage.removeItem('sessionId');

    dispatch({
      type: 'SET_LOGGED_IN',
      payload: false
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
                Favorites
              </Link>
              <Link
                className='ml-home-menu-link'
                to='/watch-later'
              >
                Watch later
              </Link>
            </>
          )
        }
        <Link
          className='ml-home-menu-link'
          to='/settings'
        >
          Settings
        </Link>
        {
          loggedIn ?
            (<div
              className='ml-home-menu-link'
              onClick={logout}
            >
              Logout
            </div>) :
            (<div
              className='ml-home-menu-link'
              onClick={login}
            >
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
          } else if (type === 'tv') {
            setTrendingTvShows(items);
          } else if (type === 'person') {
            setTrendingPersons(items);
          } else if (type === 'all') {
            setTrendingAll(items);
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
        />
      }
      {
        trendingMediaTypes.includes('movie') &&
        <Section
          title='Trending movies'
          showMoreUrl='/trending/movie'
          dataToShow={trendingMovies}
        />
      }
      {
        trendingMediaTypes.includes('tv') &&
        <Section
          title='Trending TV shows'
          showMoreUrl='/trending/tv'
          dataToShow={trendingTvShows}
        />
      }
      {
        trendingMediaTypes.includes('person') &&
        <Section
          title='Trending persons'
          showMoreUrl='/trending/person'
          dataToShow={trendingPersons}
        />
      }
    </div>
  );
};

export default Home;
