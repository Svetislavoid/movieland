import React, { createContext, useReducer } from 'react';

// store
import Reducer from '@/store/reducer';

const initialState = {
  showScrollToTopButton: false,
  loggedIn: false,
  listsChanged: 0,
  apiConfiguration: {},
  countriesList: {},
  languagesList: {},
  movieGenresList: [],
  tvGenresList: [],
  favoriteMoviesListIds: [],
  favoriteTvShowsListIds: [],
  moviesWatchlistIds: [],
  tvShowsWatchlistIds: [],
  confirmModalData: { show: false }
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;
