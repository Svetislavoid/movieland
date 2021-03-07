// possible values:
//   mediaType: 'all', 'movie', 'tv', 'person'
//   timeWindow: 'day', 'week'
export const SETTINGS = {
  trendingMediaTypes: ['movie', 'tv', 'person'],
  trendingTimeWindow: 'week',
  numberOfTrendingItemsToShow: 6,
  includeAdultContent: false,
  knownForItemsPerPage: 12
};

export const BACKDROP_SIZES = {
  small: 'w300',
  medium: 'w780',
  large: 'w1280',
  original: 'original'
};

export const POSTER_SIZES = {
  smallest: 'w92',
  smaller: 'w154',
  small: 'w185',
  large: 'w342',
  larger: 'w500',
  largest: 'w780',
  original: 'original'
};

export const PROFILE_SIZES = {
  small: 'w45',
  medium: 'w185',
  large: 'h632',
  original: 'original'
};

export const LOGO_SIZES = {
  smallest: 'w45',
  smaller: 'w92',
  small: 'w154',
  large: 'w185',
  larger: 'w300',
  largest: 'w500',
  original: 'original'
};

export const STILL_SIZES = {
  small: 'w92',
  medium: 'w185',
  large: 'w300',
  original: 'original'
};

// app base url
export const MOVIELAND_BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : 'https://themovieland.herokuapp.com/';

// tmdb auth url
export const AUTH_URL = 'https://www.themoviedb.org/authenticate/';

// url for getting images
export const BASE_URL = 'http://image.tmdb.org/t/p/';
export const SECURE_BASE_URL = 'https://image.tmdb.org/t/p/';

// video services urls
export const VIDEO_SERVICES = {
  YouTube: 'https://www.youtube.com/embed/',
  Vimeo: 'https://vimeo.com/'
};

export const DATETIME_FORMAT = 'MMMM Do, YYYY';
