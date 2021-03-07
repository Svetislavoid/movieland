const Reducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_SCROLL_TO_TOP_BUTTON':
      return {
        ...state,
        showScrollToTopButton: action.payload,
      };
    case 'SET_LOGGED_IN':
      return {
        ...state,
        loggedIn: action.payload,
      };
    case 'SET_API_CONFIGURATION':
      return {
        ...state,
        apiConfiguration: action.payload,
      };
    case 'SET_COUNTRIES':
      return {
        ...state,
        countriesList: action.payload,
      };
    case 'SET_LANGUAGES':
      return {
        ...state,
        languagesList: action.payload,
      };
    case 'SET_MOVIE_GENRES':
      return {
        ...state,
        movieGenresList: action.payload,
      };
    case 'SET_TV_GENRES':
      return {
        ...state,
        tvGenresList: action.payload,
      };
    case 'SET_FAVORITE_MOVIES_IDS':
      return {
        ...state,
        favoriteMoviesListIds: action.payload,
      };
    case 'SET_FAVORITE_TV_SHOWS_IDS':
      return {
        ...state,
        favoriteTvShowsListIds: action.payload,
      };
    case 'SET_MOVIES_WATCHLIST_IDS':
      return {
        ...state,
        moviesWatchlistIds: action.payload,
      };
    case 'SET_TV_SHOWS_WATCHLIST_IDS':
      return {
        ...state,
        tvShowsWatchlistIds: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;