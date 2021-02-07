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
    default:
      return state;
  }
};

export default Reducer;