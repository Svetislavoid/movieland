// libraries
import { isUndefined, isEmpty, find, compact } from 'lodash';
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

  if (releaseDate || firstAirDate) {
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

  const genresList = movieGenresList || tvGenresList;

  if (mediaType === 'movie') {
    genres = genreIds.map((id) => {
      const genre = find(genresList.genres, { 'id': id });
      return genre?.name;
    });
    // remove all falsy values from genres array
    genres = compact(genres);

    showGenres = !isEmpty(genres);
  } else if (mediaType === 'tv') {
    genres = genreIds.map((id) => {
      const genre = find(genresList.genres, { 'id': id });
      return genre?.name;
    });
    // remove all falsy values from genres array
    genres = compact(genres);

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

  if (!isUndefined(knownForItems) && !isEmpty(knownForItems)) {
    showKnownFor = true;

    // Filter items that do not have all the needed data
    const filteredKnownForItems = knownForItems.filter((item) => responseItemHasNeededData(item));

    knownFor = filteredKnownForItems.map((item) => {
      return {
        id: item.id,
        title: item.title || item.name,
        releaseYear: item.release_date ? moment(item.release_date).year() : moment(item.first_air_date).year(),
        posterUrl: item.poster_path && `${SECURE_BASE_URL}${POSTER_SIZES.small}${item.poster_path}`
      };
    });
  }

  return {
    showKnownFor,
    knownFor
  };
};

export const responseItemHasNeededData = (response) => {
  const {
    id,
    title,
    name
  } = response;

  return id &&
        (title || name);
};