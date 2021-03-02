import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// components
import Section from '@/components/Section';

// services & store
import {
  getMoviesWatchlist,
  getTvShowsWatchlist
} from '@/services';

const WatchLater = () => {
  // state variables
  const [moviesWatchlist, setMoviesWatchlist] = useState([]);
  const [tvShowsWatchlist, setTvShowsWatchlist] = useState([]);

  // history
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);

    const accountId = localStorage.getItem('accountId');
    const sessionId = localStorage.getItem('sessionId');

    if (accountId && sessionId) {
      getMoviesWatchlist(accountId, sessionId)
        .then((response) => {
          const { results } = response.data;

          setMoviesWatchlist(results);

          return response;
        })
        .catch((error) => {
          history.push('/error');
        });

      getTvShowsWatchlist(accountId, sessionId)
        .then((response) => {
          const { results } = response.data;

          setTvShowsWatchlist(results);

          return response;
        })
        .catch((error) => {
          history.push('/error');
        });
    }
  }, [history]);

  return (
    <div className='ml-watch-later'>
      <Section
        title='Movies watchlist'
        dataToShow={moviesWatchlist}
      />
      <Section
        title='Tv shows watchlist'
        dataToShow={tvShowsWatchlist}
      />
    </div>
  );
};

export default WatchLater;
