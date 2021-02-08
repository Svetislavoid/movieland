// libraries
import { isUndefined, isEmpty, find } from 'lodash';
import moment from 'moment';

// settings & functions
import {
  POSTER_SIZES,
  SECURE_BASE_URL
} from '@/common/settings';

export const displayName = (title, name) => {
  return title ? title : name;
};

export const displayReleaseYear = (releaseDate, firstAirDate) => {
  let showReleaseYear = false;
  let releaseYear = '';

  if (!isUndefined(releaseDate) || !isUndefined(firstAirDate)) {
    showReleaseYear = true;
    releaseYear = releaseDate ? moment(releaseDate).year() : moment(firstAirDate).year();
  }

  return {
    showReleaseYear,
    releaseYear
  };
};

export const displayOriginalName = (title, originalTitle, name, originalName) => {
  let showOriginalName = false;
  let originalNameToDisplay = '';

  if (!isUndefined(title)) {
    showOriginalName = title !== originalTitle;
    originalNameToDisplay = originalTitle;
  } else if (!isUndefined(name)) {
    showOriginalName = originalName && name !== originalName;
    originalNameToDisplay = originalName;
  }

  return {
    showOriginalName,
    originalNameToDisplay
  };
};

export const displayGenres = (mediaType, genreIds, movieGenresList, tvGenresList) => {
  let showGenres = false;
  let genres = [];

  if (mediaType === 'movie') {
    genres = genreIds.map((id) => {
      return find(movieGenresList.genres, { 'id': id }).name;
    });
    showGenres = !isEmpty(genres);
  } else if (mediaType === 'tv') {
    genres = genreIds.map((id) => {
      return find(tvGenresList.genres, { 'id': id }).name;
    });
    showGenres = !isEmpty(genres);
  }

  return {
    showGenres,
    genres
  };
};

export const displayOriginalLanguage = (language, languagesList) => {
  let showOriginalLanguage = false;
  let originalLanguage = '';

  if (!isUndefined(language)) {
    showOriginalLanguage = true;
    originalLanguage = find(languagesList, { 'iso_639_1': language }).english_name;
  }

  return {
    showOriginalLanguage,
    originalLanguage
  };
};

export const displayOriginCountries = (countries, countriesList) => {
  let showOriginCountries = false;
  let originCountries = [];

  if (!isUndefined(countries)) {
    showOriginCountries = true;
    originCountries = countries.map((country) => {
      return find(countriesList, { 'iso_3166_1': country }).english_name;
    });
  }

  return {
    showOriginCountries,
    originCountries
  };
};

export const displayKnownFor = (knownForItems) => {
  let showKnownFor = false;
  let knownFor = [];

  if (!isUndefined(knownForItems)) {
    showKnownFor = true;
    knownFor = knownForItems.map((item) => {
      return {
        id: item.id,
        title: item.title || item.name,
        releaseYear: item.release_date ? moment(item.release_date).year() : moment(item.first_air_date).year(),
        posterUrl: `${SECURE_BASE_URL}${POSTER_SIZES.small}${item.poster_path}`
      };
    });
  }

  return {
    showKnownFor,
    knownFor
  };
};