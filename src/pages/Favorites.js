import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// components
import Section from '@/components/Section';

// services & store
import {
  getFavoriteMovies,
  getFavoriteTvShows
} from '@/services';

const Favorites = () => {
  // state variables
  const [favoriteMoviesList, setFavoriteMoviesList] = useState([]);
  const [favoriteTvShowsList, setFavoriteTvShowsList] = useState([]);

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

          return response;
        })
        .catch((error) => {
          history.push('/error');
        });

      getFavoriteTvShows(accountId, sessionId)
        .then((response) => {
          const { results } = response.data;

          setFavoriteTvShowsList(results);

          return response;
        })
        .catch((error) => {
          history.push('/error');
        });
    }
  }, [history]);

  return (
    <div className='ml-favorites'>
      <Section
        title='Favorite movies'
        dataToShow={favoriteMoviesList}
      />
      <Section
        title='Favorite tv shows'
        dataToShow={favoriteTvShowsList}
      />
    </div>
  );
};

export default Favorites;
