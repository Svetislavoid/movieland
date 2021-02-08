import React, { useContext } from 'react';

// styles
import '@/components/Card.css';

// services & store
import { Context } from '@/store/store';

// settings
import { POSTER_SIZES } from '@/common/settings';

// libraries
import { isUndefined, isEmpty, find } from 'lodash';
import moment from 'moment';

const Card = ({ item }) => {
  // movie data: id, media_type, popularity, genre_ids, backdrop_path, adult, title, original_title, vote_count, release_date, overview, vote_average, video, poster_path, original_language
  // tv show data: id, media_type, popularity, genre_ids, backdrop_path, name, original_name, vote_count, overview, vote_average, poster_path, original_language, origin_country, first_air_date
  // person data: id, media_type, popularity, name, gender, known_for_department, known_for, adult, profile_path
  const {
    adult,
    backdrop_path,
    genre_ids,
    id,
    media_type,
    original_language,
    original_title,
    overview,
    popularity,
    poster_path,
    release_date,
    title,
    video,
    vote_average,
    vote_count,
    first_air_date,
    name,
    origin_country,
    original_name,
    gender,
    known_for,
    known_for_department,
    profile_path
  } = item;

  // Context
  const [state] = useContext(Context);

  const { secure_base_url } = state.apiConfiguration.images;
  const {
    countriesList,
    languagesList,
    movieGenresList,
    tvGenresList
  } = state;

  const posterUrl = `${secure_base_url}${POSTER_SIZES.large}${poster_path || profile_path}`;

  const displayName = (title, name) => {
    return title ? title : name;
  };

  const displayReleaseYear = (releaseDate, firstAirDate) => {
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

  const displayOriginalName = (title, originalTitle, name, originalName) => {
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

  const displayGenres = (mediaType, genreIds) => {
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

  const displayOriginalLaguage = (language) => {
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

  const displayOriginCountries = (countries) => {
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

  const displayKnownFor = (knownForItems) => {
    let showKnownFor = false;
    let knownFor = [];

    if (!isUndefined(knownForItems)) {
      showKnownFor = true;
      knownFor = knownForItems.map((item) => {
        return {
          id: item.id,
          title: item.title || item.name,
          releaseYear: item.release_date ? moment(item.release_date).year() : moment(item.first_air_date).year(),
          posterUrl: `${secure_base_url}${POSTER_SIZES.small}${item.poster_path}`
        };
      });
    }

    return {
      showKnownFor,
      knownFor
    };
  };

  return (
    <div className='ml-card'>
      <img
        className='ml-card-poster'
        src={posterUrl}
        alt={title || name}
      />
      <h4 className='ml-card-title'>
        {displayName(title, name)}
        {
          displayReleaseYear(release_date, first_air_date).showReleaseYear &&
          <span className='ml-card-release-year'> ({displayReleaseYear(release_date, first_air_date).releaseYear})</span>
        }
      </h4>
      <div className='ml-card-content'>
        {
          displayOriginalName(title, original_title, name, original_name).showOriginalName &&
          <p>
            <span className='ml-card-label'>Original name:</span> { displayOriginalName(title, original_title, name, original_name).originalNameToDisplay }
          </p>
        }
        {
          displayGenres(media_type, genre_ids).showGenres &&
          <p>
            <span className='ml-card-label'>Genres:</span> { displayGenres(media_type, genre_ids).genres.join(', ') }
          </p>
        }
        {
          displayOriginalLaguage(original_language).showOriginalLanguage &&
          <p>
            <span className='ml-card-label'>Original language:</span> { displayOriginalLaguage(original_language).originalLanguage }
          </p>
        }
        {
          displayOriginCountries(origin_country).showOriginCountries &&
          <p>
            <span className='ml-card-label'>Origin country:</span> { displayOriginCountries(origin_country).originCountries.join(', ') }
          </p>
        }
        {
          vote_average &&
          <p className='ml-card-vote-average'>
            <span className='ml-card-label'>Average rating:</span> { vote_average }
          </p>
        }
        {
          overview &&
          <p className='ml-card-overview'>
            { overview }
          </p>
        }
        {
          displayKnownFor(known_for).showKnownFor &&
          <div className='ml-card-known-for-items'>
            {
              displayKnownFor(known_for).knownFor.map((item) => {
                return (
                  <div className='ml-card-known-for-item' key={item.id}>
                    <img
                      className='ml-card-poster'
                      src={item.posterUrl}
                      alt={item.title}
                    />
                    <p>{item.title} ({item.releaseYear})</p>
                  </div>
                );
              })
            }
          </div>
        }
      </div>
    </div>
  );
};

export default Card;