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

const Favorites = () => {
  // state variables
  const [favoriteMoviesList, setFavoriteMoviesList] = useState([]);
  const [favoriteTvShowsList, setFavoriteTvShowsList] = useState([]);
  const [favoriteMoviesListLoaded, setFavoriteMoviesListLoaded] = useState(false);
  const [favoriteTvShowsListLoaded, setFavoriteTvShowsListLoaded] = useState(false);
  const [favoriteMoviesActive, setFavoriteMoviesActive] = useState(true);
  const [favoriteTvShowsActive, setFavoriteTvShowsActive] = useState(false);

  // history
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);

    const accountId = localStorage.getItem('accountId');
    const sessionId = localStorage.getItem('sessionId');

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
  }, [history]);

  return (
    <div className='ml-favorites'>
      <BackButton />
      <div className='ml-favorites-tabs'>
        <div
          className={`ml-favorites-tab ${ favoriteMoviesActive && 'ml-favorites-tab-active' }`}
          onClick={() => {
            setFavoriteMoviesActive(true);
            setFavoriteTvShowsActive(false);
          }}
        >
          {`Favorite movies (${favoriteMoviesList.length})`}
        </div>
        <div
          className={`ml-favorites-tab ${ favoriteTvShowsActive && 'ml-favorites-tab-active' }`}
          onClick={() => {
            setFavoriteMoviesActive(false);
            setFavoriteTvShowsActive(true);
          }}
        >
          {`Favorite tv shows (${favoriteTvShowsList.length})`}
        </div>
      </div>
      {
        favoriteMoviesActive &&
          (<Section
            dataToShow={favoriteMoviesList}
            mediaType='movie'
            loaded={favoriteMoviesListLoaded}
          />)
      }
      {
        favoriteTvShowsActive &&
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
