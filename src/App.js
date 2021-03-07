import React, { useEffect, useContext, useMemo } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

// components
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Trending from '@/pages/Trending';
import Single from '@/pages/Single';
import ErrorPage from '@/pages/Error';
import Settings from '@/pages/Settings';
import Auth from '@/pages/Auth';
import Favorites from '@/pages/Favorites';
import WatchLater from '@/pages/WatchLater';

// styles
import '@/App.css';

// services & store
import {
  getApiConfiguration,
  getCountries,
  getLanguages,
  getMovieGenres,
  getTvGenres,
  getFavoriteMovies,
  getFavoriteTvShows,
  getMoviesWatchlist,
  getTvShowsWatchlist
} from '@/services';
import { Context } from '@/store/store';

// libraries
import { isEmpty } from 'lodash';

const App = () => {
  // Context
  const [state, dispatch] = useContext(Context);

  // history
  const history = useHistory();

  const accountId = localStorage.getItem('accountId');
  const sessionId = localStorage.getItem('sessionId');
  const loggedIn = accountId && sessionId;

  const {
    apiConfiguration,
    countriesList,
    languagesList,
    movieGenresList,
    tvGenresList
  } = state;

  const appApiFunctions = useMemo(() =>
    [
      {
        route: getApiConfiguration,
        dispatchType: 'SET_API_CONFIGURATION'
      },
      {
        route: getCountries,
        dispatchType: 'SET_COUNTRIES'
      },
      {
        route: getLanguages,
        dispatchType: 'SET_LANGUAGES'
      },
      {
        route: getMovieGenres,
        dispatchType: 'SET_MOVIE_GENRES'
      },
      {
        route: getTvGenres,
        dispatchType: 'SET_TV_GENRES'
      },
    ], []);

  const userApiFunctions = useMemo(() =>
    [
      {
        route: getFavoriteMovies,
        dispatchType: 'SET_FAVORITE_MOVIES_IDS',
        params: [accountId, sessionId]
      },
      {
        route: getFavoriteTvShows,
        dispatchType: 'SET_FAVORITE_TV_SHOWS_IDS',
        params: [accountId, sessionId]
      },
      {
        route: getMoviesWatchlist,
        dispatchType: 'SET_MOVIES_WATCHLIST_IDS',
        params: [accountId, sessionId]
      },
      {
        route: getTvShowsWatchlist,
        dispatchType: 'SET_TV_SHOWS_WATCHLIST_IDS',
        params: [accountId, sessionId]
      },
    ], [accountId, sessionId]);

  // Get and store:
  //    - tmdb configuration
  //    - genres
  useEffect(() => {
    appApiFunctions.forEach((apiFunction) => {
      apiFunction.route()
        .then((response) => {
          dispatch({
            type: apiFunction.dispatchType,
            payload: response.data
          });

          return response;
        })
        .catch((error) => {
          history.push('/error');
        });
    });
  }, [dispatch, history, appApiFunctions]);

  // Get and store:
  //    - list of ids of favorite movies and tv shows
  //    - list of ids of movies and tv shows to watch later
  useEffect(() => {
    if (loggedIn) {
      userApiFunctions.forEach((apiFunction) => {
        apiFunction.route(...apiFunction.params)
          .then((response) => {
            const { results } = response.data;
            const ids = results.map((result) => result.id);

            dispatch({
              type: apiFunction.dispatchType,
              payload: ids
            });

            return response;
          })
          .catch((error) => {
            history.push('/error');
          });
      });
    }
  }, [dispatch, history, userApiFunctions, loggedIn]);

  useEffect(() => {
    dispatch({
      type: 'SET_LOGGED_IN',
      payload: loggedIn
    });
  }, [loggedIn, dispatch]);

  return (
    <div className='ml-app'>
      <Header />
      {
        !isEmpty(apiConfiguration) &&
        !isEmpty(countriesList) &&
        !isEmpty(languagesList) &&
        !isEmpty(movieGenresList) &&
        !isEmpty(tvGenresList) &&
        <div className='ml-app-main-content'>
          <Switch>
            <Route exact path='/favorites' component={Favorites} />
            <Route exact path='/watch-later' component={WatchLater} />
            <Route exact path='/settings' component={Settings} />
            <Route exact path='/movie/:id' component={Single} />
            <Route exact path='/tv/:id' component={Single} />
            <Route exact path='/person/:id' component={Single} />
            <Route exact path='/trending/:mediaType' component={Trending} />
            <Route exact path='/search/:searchTerm' component={Search} />
            <Route exact path='/approve' component={Auth} />
            <Route exact path='/' component={Home} />
            <Route component={ErrorPage} />
          </Switch>
        </div>
      }
      <Footer />
    </div>
  );
};

export default App;
