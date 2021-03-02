import React, { useEffect } from 'react';

// services
import {
  getFavoriteMovies,
  getFavoriteTvShows
} from '@/services';

const Favorites = () => {
  const accountId = localStorage.getItem('accountId');
  const sessionId = localStorage.getItem('sessionId');

  useEffect(() => {
    getFavoriteMovies(accountId, sessionId).then((response) => {
      console.log(response.data);
    });

    getFavoriteTvShows(accountId, sessionId).then((response) => {
      console.log(response.data);
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='ml-favorites'>
      Favorites
    </div>
  );
};

export default Favorites;
