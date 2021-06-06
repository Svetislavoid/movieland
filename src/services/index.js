// services
import Api from '@/services/Api';
import {
  GET_REQUEST_TOKEN,
  GET_SESSION_ID,
  GET_ACCOUNT,
  GET_FAVORITE_MOVIES,
  GET_FAVORITE_TV_SHOWS,
  GET_MOVIES_WATCHLIST,
  GET_TV_SHOWS_WATCHLIST,
  ADD_TO_FAVORITES,
  ADD_TO_WATCHLIST,
  GET_API_CONFIGURATION,
  GET_COUNTRIES,
  GET_LANGUAGES,
  MULTI_SEARCH,
  MOVIE_SEARCH,
  TV_SEARCH,
  PERSON_SEARCH,
  KEYWORD_SEARCH,
  GET_TRENDING,
  GET_MOVIE_GENRES,
  GET_TV_GENRES
} from '@/services/routes';

// functions
import { getSetting } from '@/common/functions';

export const getRequestToken = () => {
  return Api().get(GET_REQUEST_TOKEN);
};

export const getSessionId = (requestToken) => {
  const params = {
    request_token: requestToken
  };

  return Api().get(GET_SESSION_ID, { params });
};

export const getAccountDetails = (sessionId) => {
  const params = {
    session_id: sessionId
  };

  return Api().get(GET_ACCOUNT, { params });
};

export const getFavoriteMovies = (accountId, sessionId, page) => {
  const params = {
    session_id: sessionId,
    page: page
  };

  return Api().get(`${GET_ACCOUNT}/${accountId}${GET_FAVORITE_MOVIES}`, { params });
};

export const getFavoriteTvShows = (accountId, sessionId, page) => {
  const params = {
    session_id: sessionId,
    page: page
  };

  return Api().get(`${GET_ACCOUNT}/${accountId}${GET_FAVORITE_TV_SHOWS}`, { params });
};

export const getMoviesWatchlist = (accountId, sessionId, page) => {
  const params = {
    session_id: sessionId,
    page: page
  };

  return Api().get(`${GET_ACCOUNT}/${accountId}${GET_MOVIES_WATCHLIST}`, { params });
};

export const getTvShowsWatchlist = (accountId, sessionId, page) => {
  const params = {
    session_id: sessionId,
    page: page
  };

  return Api().get(`${GET_ACCOUNT}/${accountId}${GET_TV_SHOWS_WATCHLIST}`, { params });
};

export const addToFavorites = (accountId, sessionId, mediaType, id, add) => {
  const params = {
    session_id: sessionId
  };

  const payload = {
    media_type: mediaType,
    media_id: id,
    favorite: add
  };

  return Api().post(`${GET_ACCOUNT}/${accountId}${ADD_TO_FAVORITES}`, payload, { params });
};

export const addToWatchlist = (accountId, sessionId, mediaType, id, add) => {
  const params = {
    session_id: sessionId
  };

  const payload = {
    media_type: mediaType,
    media_id: id,
    watchlist: add
  };

  return Api().post(`${GET_ACCOUNT}/${accountId}${ADD_TO_WATCHLIST}`, payload, { params });
};

export const getApiConfiguration = () => {
  return Api().get(GET_API_CONFIGURATION);
};

export const getCountries = () => {
  return Api().get(GET_COUNTRIES);
};

export const getLanguages = () => {
  return Api().get(GET_LANGUAGES);
};

export const getConfiguration = () => {
  return Api().get(GET_API_CONFIGURATION);
};

export const searchMoviesTvShowsPeople = (searchTerm, page) => {
  const params = {
    query: searchTerm,
    page,
    include_adult: getSetting('includeAdultContent')
  };

  return Api().get(MULTI_SEARCH, { params });
};

export const searchMovies = (searchTerm, page) => {
  const params = {
    query: searchTerm,
    page
  };

  return Api().get(MOVIE_SEARCH, { params });
};

export const searchTvShows = (searchTerm, page) => {
  const params = {
    query: searchTerm,
    page
  };

  return Api().get(TV_SEARCH, { params });
};

export const searchPeople = (searchTerm, page) => {
  const params = {
    query: searchTerm,
    page
  };

  return Api().get(PERSON_SEARCH, { params });
};

export const searchKeyword = (searchTerm, page) => {
  const params = {
    query: searchTerm,
    page
  };

  return Api().get(KEYWORD_SEARCH, { params });
};

export const getTrending = (mediaType, timeWindow, page) => {
  const params = {
    page
  };

  return Api().get(`${GET_TRENDING}/${mediaType}/${timeWindow}`, { params });
};

export const getSingle = (mediaType, id) => {
  const params = {
    append_to_response: 'videos,images,similar,recommendations,keywords,reviews,combined_credits'
  };

  return Api().get(`/${mediaType}/${id}`, { params });
};

export const getMovieGenres = () => {
  return Api().get(GET_MOVIE_GENRES);
};

export const getTvGenres = () => {
  return Api().get(GET_TV_GENRES);
};
