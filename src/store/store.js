import React, { createContext, useReducer } from 'react';

// store
import Reducer from '@/store/reducer';

const initialState = {
  apiConfiguration: {},
  countriesList: {},
  languagesList: {},
  movieGenresList: [],
  tvGenresList: [],
  favoriteMoviesList: [],
  favoriteTvShowsList: [],
  moviesWatchlist: [],
  tvShowsWatchlist: []
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;