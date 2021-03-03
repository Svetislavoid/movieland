import React, { useContext, useEffect, useState } from 'react';
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

const Card = ({ item, mediaType }) => {
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

  // API for getting similar movies/tv shows do not
  // return media_type in the response - that's why
  // it has to be passed explicitly in this case
  const itemMediaType = media_type || mediaType;

  // Context
  const [state] = useContext(Context);

  const {
    countriesList,
    languagesList,
    movieGenresList,
    tvGenresList,
    favoriteMoviesListIds,
    favoriteTvShowsListIds,
    moviesWatchlistIds,
    tvShowsWatchlistIds
  } = state;

  // state variables
  const [favorite, setFavorite] = useState(false);
  const [watchLater, setWatchLater] = useState(false);

  const posterUrl = (poster_path || profile_path) &&
                    `${SECURE_BASE_URL}${POSTER_SIZES.larger}${poster_path || profile_path}`;

  useEffect(() => {
    switch (itemMediaType) {
      case 'movie':
        setFavorite(favoriteMoviesListIds.includes(id));
        setWatchLater(moviesWatchlistIds.includes(id));
        break;
      case 'tv':
        setFavorite(favoriteTvShowsListIds.includes(id));
        setWatchLater(tvShowsWatchlistIds.includes(id));
        break;
      default:
        break;
    }
  });

  return (
    <div className='ml-card'>
      <Link to={`/${itemMediaType}/${id}`}>
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
          show={ itemMediaType }
          label='Type:'
          dataToShow={ itemMediaType }
        />
        <InfoItem
          show={ displayGenres(itemMediaType, genre_ids, movieGenresList, tvGenresList).showGenres }
          label='Genres:'
          dataToShow={ displayGenres(itemMediaType, genre_ids, movieGenresList, tvGenresList).genres.join(', ') }
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
        to={`/${itemMediaType}/${id}`}
      >
        Show more...
      </Link>
      {
        itemMediaType !== 'person' && (
          <div className='ml-card-action-icons'>
            <i className={`material-icons ml-card-action-icon ${favorite && 'ml-card-action-icon-active'}`}>
              favorite
            </i>
            <i className={`material-icons ml-card-action-icon ${watchLater && 'ml-card-action-icon-active'}`}>
              watch_later
            </i>
          </div>
        )
      }
    </div>
  );
};

export default Card;