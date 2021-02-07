import Api from '@/services/Api';
import {
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

export const searchMoviesTvShowsPeople = (searchTerm) => {
  const params = {
    query: searchTerm
  };

  return Api().get(MULTI_SEARCH, { params });
};

export const searchMovies = (searchTerm) => {
  const params = {
    query: searchTerm
  };

  return Api().get(MOVIE_SEARCH, { params });
};

export const searchTvShows = (searchTerm) => {
  const params = {
    query: searchTerm
  };

  return Api().get(TV_SEARCH, { params });
};

export const searchPeople = (searchTerm) => {
  const params = {
    query: searchTerm
  };

  return Api().get(PERSON_SEARCH, { params });
};

export const searchKeyword = (searchTerm) => {
  const params = {
    query: searchTerm
  };

  return Api().get(KEYWORD_SEARCH, { params });
};

export const getTrending = (mediaType, timeWindow) => {
  return Api().get(`${GET_TRENDING}/${mediaType}/${timeWindow}`);
};

export const getMovieGenres = () => {
  return Api().get(GET_MOVIE_GENRES);
};

export const getTvGenres = () => {
  return Api().get(GET_TV_GENRES);
};
