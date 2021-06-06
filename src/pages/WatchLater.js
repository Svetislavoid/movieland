// This components is the same as Favorites, consider merging them
import React, { useEffect, useState, useCallback } from 'react';
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

const WatchLater = () => {
  // state variables
  const [moviesWatchlist, setMoviesWatchlist] = useState(window.history.state?.state?.moviesWatchlist || []);
  const [tvShowsWatchlist, setTvShowsWatchlist] = useState(window.history.state?.state?.tvShowsWatchlist || []);
  const [moviesWatchlistLoaded, setMoviesWatchlistLoaded] = useState(window.history.state?.state?.moviesWatchlistLoaded);
  const [tvShowsWatchlistLoaded, setTvShowsWatchlistLoaded] = useState(window.history.state?.state?.tvShowsWatchlistLoaded);
  const [tabActive, setTabActive] = useState(window.history.state?.state?.tabActive || 'movies');

  // history
  const history = useHistory();

  const accountId = localStorage.getItem('accountId');
  const sessionId = localStorage.getItem('sessionId');

  const getListItems = useCallback(({ service, resultSetter, loadingStateSetter, page = 1 }) => {
    service(accountId, sessionId, page)
      .then((response) => {
        const { results, page, total_pages: totalPages } = response.data;

        resultSetter((items) => [...items, ...results]);

        if (page < totalPages) {
          getListItems({
            service: service,
            resultSetter: resultSetter,
            loadingStateSetter: loadingStateSetter,
            page: page + 1
          });
        } else {
          loadingStateSetter(true);
        }

        return response;
      })
      .catch((error) => {
        history.push('/error');
      });
  }, [history, accountId, sessionId]);

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
    if (moviesWatchlistLoaded) return;

    if (accountId && sessionId) {
      getListItems({
        service: getMoviesWatchlist,
        resultSetter: setMoviesWatchlist,
        loadingStateSetter: setMoviesWatchlistLoaded,
      });
    } else {
      history.push('/');
    }
  }, [history, moviesWatchlistLoaded, accountId, sessionId, getListItems]);

  useEffect(() => {
    if (tvShowsWatchlistLoaded) return;

    if (accountId && sessionId) {
      getListItems({
        service: getTvShowsWatchlist,
        resultSetter: setTvShowsWatchlist,
        loadingStateSetter: setTvShowsWatchlistLoaded,
      });
    } else {
      history.push('/');
    }
  }, [history, tvShowsWatchlistLoaded, accountId, sessionId, getListItems]);

  useEffect(() => {
    const scrollTop = window.history.state?.state?.scrollTop || 0;

    window.scrollTo(0, scrollTop);
  }, [history]);

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
