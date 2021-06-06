// This components is the same as WatchLater, consider merging them
import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

// components
import Section from '@/components/Section';
import BackButton from '@/components/BackButton';

// styles
import '@/pages/Favorites.css';

// services & store
import {
  getFavoriteMovies,
  getFavoriteTvShows
} from '@/services';

// functions
import { addInfoToHistoryState } from '@/common/functions';

const Favorites = () => {
  // state variables
  const [favoriteMoviesList, setFavoriteMoviesList] = useState(window.history.state?.state?.favoriteMoviesList || []);
  const [favoriteTvShowsList, setFavoriteTvShowsList] = useState(window.history.state?.state?.favoriteTvShowsList || []);
  const [favoriteMoviesListLoaded, setFavoriteMoviesListLoaded] = useState(window.history.state?.state?.favoriteMoviesListLoaded);
  const [favoriteTvShowsListLoaded, setFavoriteTvShowsListLoaded] = useState(window.history.state?.state?.favoriteTvShowsListLoaded);
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
      favoriteMoviesList: favoriteMoviesList,
      favoriteTvShowsList: favoriteTvShowsList,
      favoriteMoviesListLoaded: favoriteMoviesListLoaded,
      favoriteTvShowsListLoaded: favoriteTvShowsListLoaded,
      tabActive: tabActive
    });
  }, [history, favoriteMoviesList, favoriteTvShowsList, favoriteMoviesListLoaded, favoriteTvShowsListLoaded, tabActive]);

  useEffect(() => {
    if (favoriteMoviesListLoaded) return;

    if (accountId && sessionId) {
      getListItems({
        service: getFavoriteMovies,
        resultSetter: setFavoriteMoviesList,
        loadingStateSetter: setFavoriteMoviesListLoaded,
      });
    } else {
      history.push('/');
    }
  }, [history, favoriteMoviesListLoaded, accountId, sessionId, getListItems]);

  useEffect(() => {
    if (favoriteTvShowsListLoaded) return;

    if (accountId && sessionId) {
      getListItems({
        service: getFavoriteTvShows,
        resultSetter: setFavoriteTvShowsList,
        loadingStateSetter: setFavoriteTvShowsListLoaded,
      });
    } else {
      history.push('/');
    }
  }, [history, favoriteTvShowsListLoaded, accountId, sessionId, getListItems]);

  useEffect(() => {
    const scrollTop = window.history.state?.state?.scrollTop || 0;

    window.scrollTo(0, scrollTop);
  }, [history]);

  return (
    <div className='ml-favorites'>
      <BackButton />
      <div className='ml-favorites-tabs'>
        <div
          className={`ml-favorites-tab ${ tabActive === 'movies' && 'ml-favorites-tab-active' }`}
          onClick={() => setTabActive('movies')}
        >
          {`Favorite movies (${favoriteMoviesList.length})`}
        </div>
        <div
          className={`ml-favorites-tab ${ tabActive === 'tvShows' && 'ml-favorites-tab-active' }`}
          onClick={() => setTabActive('tvShows')}
        >
          {`Favorite tv shows (${favoriteTvShowsList.length})`}
        </div>
      </div>
      {
        tabActive === 'movies' &&
        (<Section
          dataToShow={favoriteMoviesList}
          mediaType='movie'
          loaded={favoriteMoviesListLoaded}
        />)
      }
      {
        tabActive === 'tvShows' &&
        (<Section
          dataToShow={favoriteTvShowsList}
          mediaType='tv'
          loaded={favoriteTvShowsListLoaded}
        />)
      }
    </div>
  );
};

export default Favorites;
