import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// styles
import '@/components/Card.css';

// components
import InfoItem from '@/components/InfoItem';

// services & store
import {
  addToFavorites,
  addToWatchlist
} from '@/services';
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
import M from 'materialize-css';

// prop types
import PropTypes from 'prop-types';

const Card = ({ item, mediaType, cardClicked }) => {
  const {
    genre_ids: genreIds,
    id,
    media_type: mediaTypeItem,
    original_language: originalLanguage,
    original_title: originalTitle,
    overview,
    poster_path: posterPath,
    release_date: releaseDate,
    title,
    vote_average: voteAverage,
    first_air_date: firstAirDate,
    name,
    origin_country: originCountry,
    original_name: originalName,
    known_for: knownFor,
    profile_path: profilePath,
    adult
  } = item;

  // API for getting similar movies/tv shows do not
  // return media_type in the response - that's why
  // it has to be passed explicitly in this case
  const itemMediaType = mediaTypeItem || mediaType;

  // Context
  const [state, dispatch] = useContext(Context);

  const {
    loggedIn,
    countriesList,
    languagesList,
    movieGenresList,
    tvGenresList,
    favoriteMoviesListIds,
    favoriteTvShowsListIds,
    moviesWatchlistIds,
    tvShowsWatchlistIds
  } = state;

  const accountId = localStorage.getItem('accountId');
  const sessionId = localStorage.getItem('sessionId');

  // state variables
  const [favorite, setFavorite] = useState(false);
  const [watchLater, setWatchLater] = useState(false);

  const posterUrl = (posterPath || profilePath) &&
                    `${SECURE_BASE_URL}${POSTER_SIZES.larger}${posterPath || profilePath}`;

  const toggleFavorite = (accountId, sessionId, mediaType, id, add) => {
    if (!loggedIn) return;

    addToFavorites(accountId, sessionId, mediaType, id, add).then((response) => {
      setFavorite((favorite) => !favorite);
      dispatch({
        type: 'USER_LISTS_CHANGED'
      });

      M.toast({
        html: `"${ name || title }" ${ add ? 'added to' : 'removed from'} favorites list`,
        classes: 'ml-card-toast'
      });
    });
  };

  const toggleWatchLater = (accountId, sessionId, mediaType, id, add) => {
    if (!loggedIn) return;

    addToWatchlist(accountId, sessionId, mediaType, id, add).then((response) => {
      setWatchLater((watchLater) => !watchLater);
      dispatch({
        type: 'USER_LISTS_CHANGED'
      });

      M.toast({
        html: `"${ name || title }" ${ add ? 'added to' : 'removed from'} watch later list`,
        classes: 'ml-card-toast'
      });
    });
  };

  const infoItems = [
    {
      show: displayOriginalName(title, originalTitle, name, originalName).showOriginalName,
      label: 'Original name:',
      dataToShow: displayOriginalName(title, originalTitle, name, originalName).originalNameToDisplay
    },
    {
      show: itemMediaType,
      label: 'Type:',
      dataToShow: itemMediaType
    },
    {
      show: displayGenres(itemMediaType, genreIds, movieGenresList, tvGenresList).showGenres,
      label: 'Genres:',
      dataToShow: displayGenres(itemMediaType, genreIds, movieGenresList, tvGenresList).genres.join(', ')
    },
    {
      show: !isUndefined(adult),
      label: 'Adult content:',
      dataToShow: adult ? 'Yes' : 'No'
    },
    {
      show: displayOriginalLanguage(originalLanguage, languagesList).showOriginalLanguage,
      label: 'Original language:',
      dataToShow: displayOriginalLanguage(originalLanguage, languagesList).originalLanguage
    },
    {
      show: displayOriginCountries(originCountry, countriesList).showOriginCountries,
      label: 'Origin country:',
      dataToShow: displayOriginCountries(originCountry, countriesList).originCountries.join(', ')
    },
    {
      show: !isUndefined(voteAverage),
      label: 'Average rating:',
      dataToShow: voteAverage
    },
    {
      show: !isEmpty(overview),
      className: 'ml-card-overview',
      dataToShow: overview
    },
    {
      show: displayKnownFor(knownFor).showKnownFor,
      className: 'ml-card-known-for-items',
      children: displayKnownFor(knownFor).knownFor.map((item) => {
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
    },
  ];

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
  }, [favoriteMoviesListIds, favoriteTvShowsListIds, moviesWatchlistIds, tvShowsWatchlistIds, id, itemMediaType]);

  return (
    <div
      data-testid='ml-card'
      className='ml-card'
    >
      <Link
        to={`/${itemMediaType}/${id}`}
        onClick={cardClicked}
      >
        <img
          className='ml-card-poster'
          src={posterUrl || noImageAvailable}
          alt={title || name}
        />
      </Link>
      <h4 className='ml-card-title'>
        <span>{ displayName(title, name) }</span>
        {
          displayReleaseYear(releaseDate, firstAirDate).showReleaseYear &&
          <span className='ml-card-release-year'> ({ displayReleaseYear(releaseDate, firstAirDate).releaseYear })</span>
        }
      </h4>
      <div className='ml-card-content'>
        {
          infoItems.map((infoItem, i) => {
            const { show, className, label, dataToShow, children } = infoItem;

            return (
              <InfoItem
                key={ i }
                show={ show }
                className={ className }
                label={ label }
                dataToShow={ dataToShow }
              >
                { children }
              </InfoItem>
            );
          })
        }
      </div>
      <Link
        className='ml-card-read-more-link'
        to={`/${itemMediaType}/${id}`}
        onClick={cardClicked}
      >
        Show more...
      </Link>
      {
        itemMediaType !== 'person' && loggedIn && (
          <div className='ml-card-action-icons'>
            <i className={`material-icons ml-card-action-icon ${favorite && 'ml-card-action-icon-active'}`}
              onClick={() => toggleFavorite(accountId, sessionId, itemMediaType, id, !favorite)}
            >
              favorite
            </i>
            <i className={`material-icons ml-card-action-icon ${watchLater && 'ml-card-action-icon-active'}`}
              onClick={() => toggleWatchLater(accountId, sessionId, itemMediaType, id, !watchLater)}
            >
              watch_later
            </i>
          </div>
        )
      }
    </div>
  );
};

Card.propTypes = {
  item: PropTypes.object.isRequired,
  mediaType: PropTypes.string,
  cardClicked: PropTypes.func,
};

export default Card;
