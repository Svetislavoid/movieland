// possible values:
//   mediaType: 'all', 'movie', 'tv', 'person'
//   timeWindow: 'day', 'week'
export const TRENDING_SETTINGS = {
  mediaTypes: ['movie', 'tv', 'person'],
  timeWindow: 'day',
  numberOfItemsToShowOnHomepage: 6
};

// possible values:
//   ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original']
export const POSTER_SIZES = {
  large: 'w500',
  small: 'w154'
};

// url for getting images
export const SECURE_BASE_URL = 'https://image.tmdb.org/t/p/';

// whether to include adult content in multi search or not
export const INCLUDE_ADULT_CONTENT = 'true';