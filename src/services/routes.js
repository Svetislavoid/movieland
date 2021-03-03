// ########################################
// ####### ACCOUNT ROUTES
// ########################################

// Get account details
export const GET_ACCOUNT = '/account';

// Get favorite movies
export const GET_FAVORITE_MOVIES = '/favorite/movies';

// Get favorite tv shows
export const GET_FAVORITE_TV_SHOWS = '/favorite/tv';

// Get movies to watch later
export const GET_MOVIES_WATCHLIST = '/watchlist/movies';

// Get tv shows to watch later
export const GET_TV_SHOWS_WATCHLIST = '/watchlist/tv';

// Add to favorites list
export const ADD_TO_FAVORITES = '/favorite';

// Add to watch later list
export const ADD_TO_WATCHLIST = '/watchlist';

// ########################################
// ####### AUTH ROUTES
// ########################################

// Get request token
export const GET_REQUEST_TOKEN = '/authentication/token/new';

// Get session id
export const GET_SESSION_ID = '/authentication/session/new';

// ########################################
// ####### SEARCH ROUTES
// ########################################

// Search for movies, tv shows and people
export const MULTI_SEARCH = '/search/multi';

// Search for movies
export const MOVIE_SEARCH = '/search/movie';

// Search for tv shows
export const TV_SEARCH = '/search/tv';

// Search for people
export const PERSON_SEARCH = '/search/person';

// Search keyword
export const KEYWORD_SEARCH = '/search/keyword';

// ########################################
// ####### GET ROUTES
// ########################################

// Get configuration
export const GET_API_CONFIGURATION = '/configuration';
export const GET_COUNTRIES = '/configuration/countries';
export const GET_LANGUAGES = '/configuration/languages';

// Get movie details
export const GET_MOVIE = '/movie';

// Get tv show details
export const GET_TV = '/tv';

// Get person details
export const GET_PERSON = '/person';

// Get trending
export const GET_TRENDING = '/trending';

// Get genres
export const GET_MOVIE_GENRES = '/genre/movie/list';
export const GET_TV_GENRES = '/genre/tv/list';
