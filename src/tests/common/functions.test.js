// settings & functions
import {
  POSTER_SIZES,
  SECURE_BASE_URL
} from '@/common/settings';

import {
  displayName,
  displayReleaseYear,
  displayOriginalName,
  displayGenres,
  displayOriginalLanguage,
  displayOriginCountries,
  displayKnownFor,
  responseItemHasNeededData
} from '@/common/functions';

describe('Test common functions', () => {
  test('"displayName" should return name of a movie, tv show or actor/actress', () => {
    expect(displayName('Titanic', undefined)).toBe('Titanic');
    expect(displayName(undefined, 'Titanic')).toBe('Titanic');
    expect(displayName(undefined, undefined)).toBe(undefined);
  });

  test('"displayReleaseYear" should return object with release/first air date and if date should be shown', () => {
    expect(displayReleaseYear('2021-03-19', undefined)).toEqual({
      showReleaseYear: true,
      releaseYear: 2021
    });
    expect(displayReleaseYear(undefined, '2015-08-09')).toEqual({
      showReleaseYear: true,
      releaseYear: 2015
    });
    expect(displayReleaseYear(undefined, undefined)).toEqual({
      showReleaseYear: false,
      releaseYear: ''
    });
  });

  test('"displayOriginalName" should return object with movie/tv show original name and if original name should be shown', () => {
    expect(displayOriginalName('Meeting Place', 'Сабирни центар', undefined, undefined)).toEqual({
      showOriginalName: true,
      originalNameToDisplay: 'Сабирни центар'
    });
    expect(displayOriginalName(undefined, undefined, 'Meeting Place', 'Сабирни центар')).toEqual({
      showOriginalName: true,
      originalNameToDisplay: 'Сабирни центар'
    });
    expect(displayOriginalName(undefined, undefined, 'Titanic', 'Titanic')).toEqual({
      showOriginalName: false,
      originalNameToDisplay: 'Titanic'
    });
    expect(displayOriginalName(undefined, undefined, undefined, undefined)).toEqual({
      showOriginalName: false,
      originalNameToDisplay: ''
    });
  });

  test('"displayGenres" should return object with movie/tv show genres and if genres should be shown', () => {
    const movieGenreIds = [16, 35];
    const tvGenreIds = [10759, 16, 35];

    const movieGenresList = {
      'genres': [
        {
          'id': 16,
          'name': 'Animation'
        },
        {
          'id': 35,
          'name': 'Comedy'
        }
      ]
    };

    const tvGenresList = {
      'genres': [
        {
          'id': 10759,
          'name': 'Action & Adventure'
        },
        {
          'id': 16,
          'name': 'Animation'
        },
        {
          'id': 35,
          'name': 'Comedy'
        }
      ]
    };

    expect(displayGenres('movie', movieGenreIds, movieGenresList, tvGenresList)).toEqual({
      showGenres: true,
      genres: ['Animation', 'Comedy']
    });
    expect(displayGenres('tv', tvGenreIds, movieGenresList, tvGenresList)).toEqual({
      showGenres: true,
      genres: ['Action & Adventure', 'Animation', 'Comedy']
    });
    expect(displayGenres('person', undefined, movieGenresList, tvGenresList)).toEqual({
      showGenres: false,
      genres: []
    });
  });

  test('"displayOriginalLanguage" should return object with movie/tv show original language and if original language should be shown', () => {
    const languagesList = [
      {
        'iso_639_1': 'en',
        'english_name': 'English',
        'name': 'English'
      }
    ];

    expect(displayOriginalLanguage('en', languagesList)).toEqual({
      showOriginalLanguage: true,
      originalLanguage: 'English'
    });
    expect(displayOriginalLanguage('', languagesList)).toEqual({
      showOriginalLanguage: false,
      originalLanguage: ''
    });
  });

  test('"displayOriginCountries" should return object with origin countries and if origin countries should be shown', () => {
    const countriesList = [
      {
        'iso_3166_1': 'US',
        'english_name': 'United States of America'
      }
    ];

    expect(displayOriginCountries(['US'], countriesList)).toEqual({
      showOriginCountries: true,
      originCountries: ['United States of America']
    });
    expect(displayOriginCountries(undefined, countriesList)).toEqual({
      showOriginCountries: false,
      originCountries: []
    });
  });

  test('"displayKnownFor" should return object with movies/tv shows data an actor is known for and if known for section should be shown', () => {
    const knownFor = [
      {
        'poster_path': '/8kNruSfhk5IoE4eZOc4UpvDn6tq.jpg',
        'title': 'Fight Club',
        'id': 550,
        'release_date': '1999-10-15',
        'media_type': 'movie'
      }
    ];

    expect(displayKnownFor(knownFor)).toEqual({
      showKnownFor: true,
      knownFor: [{
        id: 550,
        mediaType: 'movie',
        title: 'Fight Club',
        releaseYear: 1999,
        posterUrl: `${SECURE_BASE_URL}${POSTER_SIZES.smaller}/8kNruSfhk5IoE4eZOc4UpvDn6tq.jpg`
      }]
    });
    expect(displayKnownFor([])).toEqual({
      showKnownFor: false,
      knownFor: []
    });
    expect(displayKnownFor(undefined)).toEqual({
      showKnownFor: false,
      knownFor: []
    });
  });

  test('Should have id and title or name', () => {
    const movieResponse = {
      'title': 'Coming 2 America',
      'id': 484718
    };

    const tvOrPersonResponse = {
      'name': 'The Falcon and the Winter Soldier',
      'id': 88396
    };

    const noIdAndTitleResponse = {
      'name': 'The Falcon and the Winter Soldier'
    };

    const noIdAndNameResponse = {
      'name': 'The Falcon and the Winter Soldier'
    };

    const noNameAndTitleResponse = {
      'id': 1234,
    };

    expect(responseItemHasNeededData(movieResponse)).toBeTruthy();
    expect(responseItemHasNeededData(tvOrPersonResponse)).toBeTruthy();
    expect(responseItemHasNeededData(noIdAndTitleResponse)).toBeFalsy();
    expect(responseItemHasNeededData(noIdAndNameResponse)).toBeFalsy();
    expect(responseItemHasNeededData(noNameAndTitleResponse)).toBeFalsy();
  });
});
