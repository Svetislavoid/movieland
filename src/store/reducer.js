const Reducer = (state, action) => {
  switch (action.type) {
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
    case 'SET_FAVORITE_MOVIES':
      return {
        ...state,
        favoriteMoviesList: action.payload,
      };
    case 'SET_FAVORITE_TV_SHOWS':
      return {
        ...state,
        favoriteTvShowsList: action.payload,
      };
    case 'SET_MOVIES_WATCHLIST':
      return {
        ...state,
        moviesWatchlist: action.payload,
      };
    case 'SET_TV_SHOWS_WATCHLIST':
      return {
        ...state,
        tvShowsWatchlist: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;