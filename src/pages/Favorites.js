// This components is the same as WatchLater, consider merging them
import React, { useEffect, useState } from 'react';
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

// libraries
import { isEmpty } from 'lodash';

const Favorites = () => {
  // state variables
  const [favoriteMoviesList, setFavoriteMoviesList] = useState(window.history.state?.state?.favoriteMoviesList || []);
  const [favoriteTvShowsList, setFavoriteTvShowsList] = useState(window.history.state?.state?.favoriteTvShowsList || []);
  const [favoriteMoviesListLoaded, setFavoriteMoviesListLoaded] = useState(window.history.state?.state?.favoriteMoviesListLoaded);
  const [favoriteTvShowsListLoaded, setFavoriteTvShowsListLoaded] = useState(window.history.state?.state?.favoriteTvShowsListLoaded);
  const [tabActive, setTabActive] = useState(window.history.state?.state?.tabActive || 'movies');

  // history
  const history = useHistory();

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
    const scrollTop = window.history.state?.state?.scrollTop || 0;

    window.scrollTo(0, scrollTop);

    const accountId = localStorage.getItem('accountId');
    const sessionId = localStorage.getItem('sessionId');

    if (!isEmpty(favoriteMoviesList) || !isEmpty(favoriteTvShowsList)) return;

    if (accountId && sessionId) {
      getFavoriteMovies(accountId, sessionId)
        .then((response) => {
          const { results } = response.data;

          setFavoriteMoviesList(results);
          setFavoriteMoviesListLoaded(true);

          return response;
        })
        .catch((error) => {
          history.push('/error');
        });

      getFavoriteTvShows(accountId, sessionId)
        .then((response) => {
          const { results } = response.data;

          setFavoriteTvShowsList(results);
          setFavoriteTvShowsListLoaded(true);

          return response;
        })
        .catch((error) => {
          history.push('/error');
        });
    } else {
      history.push('/');
    }
  }, [history, favoriteMoviesList, favoriteTvShowsList]);

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
