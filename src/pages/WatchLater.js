import React, { useEffect } from 'react';

// services
import {
  getMoviesWatchlist,
  getTvShowsWatchlist
} from '@/services';

const WatchLater = () => {
  const accountId = localStorage.getItem('accountId');
  const sessionId = localStorage.getItem('sessionId');

  useEffect(() => {
    getMoviesWatchlist(accountId, sessionId).then((response) => {
      console.log(response.data);
    });

    getTvShowsWatchlist(accountId, sessionId).then((response) => {
      console.log(response.data);
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='ml-watch-later'>
      WatchLater
    </div>
  );
};

export default WatchLater;
