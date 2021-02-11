import React, { useEffect, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';

// components
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Trending from '@/pages/Trending';

// styles
import '@/App.css';

// services & store
import {
  getApiConfiguration,
  getCountries,
  getLanguages,
  getMovieGenres,
  getTvGenres
} from '@/services';
import { Context } from '@/store/store';

// libraries
import { isEmpty } from 'lodash';

const App = () => {
  // Context
  const [state, dispatch] = useContext(Context);

  // Get tmdb configuration and genres and store them
  useEffect(() => {
    getApiConfiguration()
      .then((response) => {
        dispatch({
          type: 'SET_API_CONFIGURATION',
          payload: response.data
        });

        return response;
      });

    getCountries()
      .then((response) => {
        dispatch({
          type: 'SET_COUNTRIES',
          payload: response.data
        });

        return response;
      });

    getLanguages()
      .then((response) => {
        dispatch({
          type: 'SET_LANGUAGES',
          payload: response.data
        });

        return response;
      });

    getMovieGenres()
      .then((response) => {
        dispatch({
          type: 'SET_MOVIE_GENRES',
          payload: response.data
        });

        return response;
      });

    getTvGenres()
      .then((response) => {
        dispatch({
          type: 'SET_TV_GENRES',
          payload: response.data
        });

        return response;
      });
  }, [dispatch]);

  return (
    <div className='ml-app'>
      <Header />
      {
        !isEmpty(state.apiConfiguration) &&
        !isEmpty(state.countriesList) &&
        !isEmpty(state.languagesList) &&
        !isEmpty(state.movieGenresList) &&
        !isEmpty(state.tvGenresList) &&
        <div className='ml-app-main-content'>
          <Switch>
            <Route exact path='/trending/:mediaType' component={Trending} />
            <Route exact path='/search/:searchTerm' component={Search} />
            <Route exact path='/' component={Home} />
          </Switch>
        </div>
      }
      <Footer />
    </div>
  );
};

export default App;
