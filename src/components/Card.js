import React, { useContext } from 'react';

// styles
import '@/components/Card.css';

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

// libraries
import { isUndefined } from 'lodash';

const InfoItem = (props) => {
  const {
    show,
    className,
    label,
    dataToShow,
    children
  } = props;

  return show ? (
    <p className={className}>
      {
        label &&
        (<span className='ml-card-label'>{ label }</span>)
      }
      {
        dataToShow &&
        (<span>{ dataToShow }</span>)
      }
      { children }
    </p>
  ) : null;
};

const Card = ({ item }) => {
  // movie data: id, media_type, popularity, genre_ids, backdrop_path, adult, title, original_title, vote_count, release_date, overview, vote_average, video, poster_path, original_language
  // tv show data: id, media_type, popularity, genre_ids, backdrop_path, name, original_name, vote_count, overview, vote_average, poster_path, original_language, origin_country, first_air_date
  // person data: id, media_type, popularity, name, gender, known_for_department, known_for, adult, profile_path
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
    profile_path
  } = item;

  // Context
  const [state] = useContext(Context);

  const {
    countriesList,
    languagesList,
    movieGenresList,
    tvGenresList
  } = state;

  const posterUrl = `${SECURE_BASE_URL}${POSTER_SIZES.large}${poster_path || profile_path}`;

  return (
    <div className='ml-card'>
      <img
        className='ml-card-poster'
        src={posterUrl}
        alt={title || name}
      />
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
          show={ displayGenres(media_type, genre_ids, movieGenresList, tvGenresList).showGenres }
          label='Genres:'
          dataToShow={ displayGenres(media_type, genre_ids, movieGenresList, tvGenresList).genres.join(', ') }
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
          show={ !isUndefined(overview) }
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
        </InfoItem>
      </div>
    </div>
  );
};

export default Card;