import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// components
import Section from '@/components/Section';
import BackButton from '@/components/BackButton';

// styles
import '@/pages/WatchLater.css';

// services & store
import {
  getMoviesWatchlist,
  getTvShowsWatchlist
} from '@/services';

const WatchLater = () => {
  // state variables
  const [moviesWatchlist, setMoviesWatchlist] = useState([]);
  const [tvShowsWatchlist, setTvShowsWatchlist] = useState([]);
  const [moviesWatchlistLoaded, setMoviesWatchlistLoaded] = useState(false);
  const [tvShowsWatchlistLoaded, setTvShowsWatchlistLoaded] = useState(false);
  const [moviesWatchlistActive, setMoviesWatchlistActive] = useState(true);
  const [tvShowsWatchlistActive, setTvShowsWatchlistActive] = useState(false);

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
          setMoviesWatchlistLoaded(true);

          return response;
        })
        .catch((error) => {
          history.push('/error');
        });

      getTvShowsWatchlist(accountId, sessionId)
        .then((response) => {
          const { results } = response.data;

          setTvShowsWatchlist(results);
          setTvShowsWatchlistLoaded(true);

          return response;
        })
        .catch((error) => {
          history.push('/error');
        });
    } else {
      history.push('/');
    }
  }, [history]);

  return (
    <div className='ml-watch-later'>
      <BackButton />
      <div className='ml-watch-later-tabs'>
        <div
          className={`ml-watch-later-tab ${ moviesWatchlistActive && 'ml-watch-later-tab-active' }`}
          onClick={() => {
            setMoviesWatchlistActive(true);
            setTvShowsWatchlistActive(false);
          }}
        >
          {`Movies watchlist (${moviesWatchlist.length})`}
        </div>
        <div
          className={`ml-watch-later-tab ${ tvShowsWatchlistActive && 'ml-watch-later-tab-active' }`}
          onClick={() => {
            setMoviesWatchlistActive(false);
            setTvShowsWatchlistActive(true);
          }}
        >
          {`Tv shows watchlist (${tvShowsWatchlist.length})`}
        </div>
      </div>
      {
        moviesWatchlistActive &&
        (<Section
          dataToShow={moviesWatchlist}
          mediaType='movie'
          loaded={moviesWatchlistLoaded}
        />)
      }
      {
        tvShowsWatchlistActive &&
        (<Section
          dataToShow={tvShowsWatchlist}
          mediaType='tv'
          loaded={tvShowsWatchlistLoaded}
        />)
      }
    </div>
  );
};

export default WatchLater;
