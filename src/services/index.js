import Api from '@/services/Api';
import {
  GET_CONFIGURATION,
  MULTI_SEARCH,
  MOVIE_SEARCH,
  TV_SEARCH,
  PERSON_SEARCH,
  KEYWORD_SEARCH,
  GET_TRENDING
} from '@/services/routes';

export const getConfiguration = () => {

  return Api().get(GET_CONFIGURATION);
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
