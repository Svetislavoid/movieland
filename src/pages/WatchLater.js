// This components is the same as Favorites, consider merging them
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

// functions
import { addInfoToHistoryState } from '@/common/functions';

// libraries
import { isEmpty } from 'lodash';

const WatchLater = () => {
  // state variables
  const [moviesWatchlist, setMoviesWatchlist] = useState(window.history.state?.state?.moviesWatchlist || []);
  const [tvShowsWatchlist, setTvShowsWatchlist] = useState(window.history.state?.state?.tvShowsWatchlist || []);
  const [moviesWatchlistLoaded, setMoviesWatchlistLoaded] = useState(window.history.state?.state?.moviesWatchlistLoaded);
  const [tvShowsWatchlistLoaded, setTvShowsWatchlistLoaded] = useState(window.history.state?.state?.tvShowsWatchlistLoaded);
  const [tabActive, setTabActive] = useState(window.history.state?.state?.tabActive || 'movies');

  // history
  const history = useHistory();

  window.onscroll = () => {
    addInfoToHistoryState(history, {
      scrollTop: document.documentElement.scrollTop
    });
  };

  useEffect(() => {
    addInfoToHistoryState(history, {
      moviesWatchlist: moviesWatchlist,
      tvShowsWatchlist: tvShowsWatchlist,
      moviesWatchlistLoaded: moviesWatchlistLoaded,
      tvShowsWatchlistLoaded: tvShowsWatchlistLoaded,
      tabActive: tabActive
    });
  }, [history, moviesWatchlist, tvShowsWatchlist, moviesWatchlistLoaded, tvShowsWatchlistLoaded, tabActive]);

  useEffect(() => {
    const scrollTop = window.history.state?.state?.scrollTop || 0;

    window.scrollTo(0, scrollTop);

    const accountId = localStorage.getItem('accountId');
    const sessionId = localStorage.getItem('sessionId');

    if (!isEmpty(moviesWatchlist) || !isEmpty(tvShowsWatchlist)) return;

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
  }, [history, moviesWatchlist, tvShowsWatchlist]);

  return (
    <div className='ml-watch-later'>
      <BackButton />
      <div className='ml-watch-later-tabs'>
        <div
          className={`ml-watch-later-tab ${ tabActive === 'movies' && 'ml-watch-later-tab-active' }`}
          onClick={() => setTabActive('movies')}
        >
          {`Movies watchlist (${moviesWatchlist.length})`}
        </div>
        <div
          className={`ml-watch-later-tab ${ tabActive === 'tvShows' && 'ml-watch-later-tab-active' }`}
          onClick={() => setTabActive('tvShows')}
        >
          {`Tv shows watchlist (${tvShowsWatchlist.length})`}
        </div>
      </div>
      {
        tabActive === 'movies' &&
        (<Section
          dataToShow={moviesWatchlist}
          mediaType='movie'
          loaded={moviesWatchlistLoaded}
        />)
      }
      {
        tabActive === 'tvShows' &&
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
