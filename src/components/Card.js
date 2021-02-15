import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

// styles
import '@/components/Card.css';

// components
import InfoItem from '@/components/InfoItem';

// services & store
import { Context } from '@/store/store';

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
  displayKnownFor
} from '@/common/functions';

// assets
import noImageAvailable from '@/assets/no_image_available.png';

// libraries
import { isUndefined, isEmpty } from 'lodash';

const Card = ({ item }) => {
  const {
    genre_ids,
    id,
    media_type,
    original_language,
    original_title,
    overview,
    poster_path,
    release_date,
    title,
    vote_average,
    first_air_date,
    name,
    origin_country,
    original_name,
    known_for,
    profile_path,
    adult
  } = item;

  // Context
  const [state] = useContext(Context);

  const {
    countriesList,
    languagesList,
    movieGenresList,
    tvGenresList
  } = state;

  const posterUrl = (poster_path || profile_path) &&
                    `${SECURE_BASE_URL}${POSTER_SIZES.larger}${poster_path || profile_path}`;

  return (
    <div className='ml-card'>
      <Link to={`/${media_type}/${id}`}>
        <img
          className='ml-card-poster'
          src={posterUrl || noImageAvailable}
          alt={title || name}
        />
      </Link>
      <h4 className='ml-card-title'>
        <span>{ displayName(title, name) }</span>
        {
          displayReleaseYear(release_date, first_air_date).showReleaseYear &&
          <span className='ml-card-release-year'> ({ displayReleaseYear(release_date, first_air_date).releaseYear })</span>
        }
      </h4>
      <div className='ml-card-content'>
        <InfoItem
          show={ displayOriginalName(title, original_title, name, original_name).showOriginalName }
          label='Original name:'
          dataToShow={ displayOriginalName(title, original_title, name, original_name).originalNameToDisplay }
        />
        <InfoItem
          show={ media_type }
          label='Type:'
          dataToShow={ media_type }
        />
        <InfoItem
          show={ displayGenres(media_type, genre_ids, movieGenresList, tvGenresList).showGenres }
          label='Genres:'
          dataToShow={ displayGenres(media_type, genre_ids, movieGenresList, tvGenresList).genres.join(', ') }
        />
        <InfoItem
          show={ !isUndefined(adult) }
          label='Adult content:'
          dataToShow={ adult ? 'Yes' : 'No' }
        />
        <InfoItem
          show={ displayOriginalLanguage(original_language, languagesList).showOriginalLanguage }
          label='Original language:'
          dataToShow={ displayOriginalLanguage(original_language, languagesList).originalLanguage }
        />
        <InfoItem
          show={ displayOriginCountries(origin_country, countriesList).showOriginCountries }
          label='Origin country:'
          dataToShow={ displayOriginCountries(origin_country, countriesList).originCountries.join(', ') }
        />
        <InfoItem
          show={ !isUndefined(vote_average) }
          label='Average rating:'
          dataToShow={ vote_average }
        />
        <InfoItem
          show={ !isEmpty(overview) }
          className='ml-card-overview'
          dataToShow={ overview }
        />
        <InfoItem
          show={ displayKnownFor(known_for).showKnownFor }
          className='ml-card-known-for-items'
          dataToShow={ overview }
        >
          {
            displayKnownFor(known_for).knownFor.map((item) => {
              return (
                <div className='ml-card-known-for-item' key={item.id}>
                  <Link to={`/${item.mediaType}/${item.id}`}>
                    <img
                      className='ml-card-poster'
                      src={item.posterUrl || noImageAvailable}
                      alt={item.title}
                    />
                  </Link>
                  <p>{item.title} ({item.releaseYear})</p>
                </div>
              );
            })
          }
        </InfoItem>
      </div>
      <Link
        className='ml-card-read-more-link'
        to={`/${media_type}/${id}`}
      >
        Show more...
      </Link>
    </div>
  );
};

export default Card;