import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

// components
import InfoItem from '@/components/InfoItem';
import Section from '@/components/Section';
import Button from '@/components/Button';
import BackButton from '@/components/BackButton';
import Spinner from '@/components/Spinner';
import ImagesModal from '@/components/ImagesModal';

// services
import {
  getSingle,
  addToFavorites,
  addToWatchlist
} from '@/services';
import { Context } from '@/store/store';

// styles
import '@/pages/Single.css';

// settings & functions
import {
  POSTER_SIZES,
  PROFILE_SIZES,
  SECURE_BASE_URL,
  DATETIME_FORMAT,
  VIDEO_SERVICES
} from '@/common/settings';
import {
  displayName,
  displayReleaseYear,
  displayOriginalLanguage,
  getSetting
} from '@/common/functions';

// assets
import noImageAvailable from '@/assets/no_image_available.png';

// libraries
import { isUndefined, isEmpty, take, uniqBy } from 'lodash';
import moment from 'moment';
import M from 'materialize-css';

// prop types
import PropTypes from 'prop-types';

const PosterImages = (props) => {
  const {
    posterImages,
    openImagesModal
  } = props;

  return (!isEmpty(posterImages)) ? (
    <div className='ml-single-poster-images'>
      <h3 className='ml-single-poster-images-title'>Images</h3>
      <div className='ml-single-poster-images-items'>
        {
          posterImages.map((image, index) => (
            <img
              key={image.file_path}
              className='ml-single-image'
              src={`${SECURE_BASE_URL}${POSTER_SIZES.large}${image.file_path}`}
              alt='poster'
              onClick={() => openImagesModal(index)}
            />
          ))
        }
      </div>
    </div>
  ) : null;
};

const Videos = (props) => {
  const {
    videos
  } = props;

  return (!isEmpty(videos)) ? (
    <div className='ml-single-videos'>
      <h3 className='ml-single-videos-title'>Videos</h3>
      <div className='ml-single-videos-items'>
        {
          videos.map((video) => (
            <div
              className='ml-single-video'
              key={video.id}
            >
              <iframe
                className='ml-single-video-iframe'
                title={video.name}
                allowFullScreen='allowfullscreen'
                mozallowfullscreen='mozallowfullscreen'
                msallowfullscreen='msallowfullscreen'
                oallowfullscreen='oallowfullscreen'
                webkitallowfullscreen='webkitallowfullscreen'
                src={`${VIDEO_SERVICES[video.site]}${video.key}`} >
              </iframe>
            </div>
          ))
        }
      </div>
    </div>
  ) : null;
};

const Credits = (props) => {
  const { credits } = props;

  return credits ?
    credits.map((item) => {
      const {
        id,
        media_type: mediaType,
        name,
        title,
        release_date: releaseDate,
        first_air_date: firstAirDate,
        poster_path: posterPath
      } = item;

      return (
        <Link
          className='ml-single-known-for-item'
          key={id}
          to={`/${mediaType}/${id}`}
        >
          <img
            className='ml-single-known-for-poster'
            src={posterPath
                 ? `${SECURE_BASE_URL}${POSTER_SIZES.smallest}${posterPath}`
                 : noImageAvailable}
            alt={name || title}
          />
          <div>
            <span>{ displayName(title, name) }</span>
            {
              displayReleaseYear(releaseDate, firstAirDate).showReleaseYear &&
              <span> ({ displayReleaseYear(releaseDate, firstAirDate).releaseYear })</span>
            }
          </div>
        </Link>
      );
    }) : null;
} ;

const KnownFor = (props) => {
  const {
    allCredits,
    numberOfItemsToLoad
  } = props;

  // sort all credits by date in descending order
  allCredits.sort((creditA, creditB) => {
    const creditADate = moment(creditA.release_date || creditA.first_air_date);
    const creditBDate = moment(creditB.release_date || creditB.first_air_date);

    return creditBDate - creditADate;
  });

  const paginatedCredits = take(allCredits, numberOfItemsToLoad);

  return (!isEmpty(paginatedCredits)) ? (
    <div className='ml-single-known-for'>
      <h3 className='ml-single-known-for-title'>Known for</h3>
      <div className='ml-single-known-for-items'>
        <Credits credits={paginatedCredits} />
      </div>
    </div>
  ) : null;
};

const Single = () => {
  // state variables
  const [dataLoaded, setDataLoaded] = useState(false);
  const [imagesModalOpened, setImagesModalOpened] = useState(false);
  const [openedImageIndex, setOpenedImageIndex] = useState(0);
  const [favorite, setFavorite] = useState(false);
  const [watchLater, setWatchLater] = useState(false);
  const [showSimilarContent] = useState(getSetting('showSimilarContent'));

  // common
  const [name, setName] = useState('');
  const [posterImage, setPosterImage] = useState('');

  // person specific
  const [adult, setAdult] = useState(false);
  const [biography, setBiography] = useState('');
  const [birthday, setBirthday] = useState('');
  const [deathday, setDeathday] = useState('');
  const [gender, setGender] = useState(0);
  const [placeOfBirth, setPlaceOfBirth] = useState('');
  const [allCredits, setAllCredits] = useState([]);
  const [creditsPage, setCreditsPage] = useState(1);
  const [creditsTotalPages, setCreditsTotalPages] = useState(1);

  // movie specific
  const [genres, setGenres] = useState([]);
  const [originalLanguage, setOriginalLanguage] = useState('');
  const [originalName, setOriginalName] = useState('');
  const [overview, setOverview] = useState('');
  const [productionCompanies, setProductionCompanies] = useState([]);
  const [productionCountries, setProductionCountries] = useState([]);
  const [releaseDate, setReleaseDate] = useState('');
  const [runtime, setRuntime] = useState(0);
  const [spokenLanguages, setSpokenLanguages] = useState([]);
  const [status, setStatus] = useState('');
  const [tagline, setTagline] = useState('');
  const [voteAverage, setVoteAverage] = useState(0);
  const [videos, setVideos] = useState([]);
  const [backdropImages, setBackdropImages] = useState([]);
  const [posterImages, setPosterImages] = useState([]);
  const [similar, setSimilar] = useState([]);

  // tv show specific
  const [createdBy, setCreatedBy] = useState([]);
  const [episodeRuntime, setEpisodeRuntime] = useState([]);
  const [firstAirDate, setFirstAirDate] = useState('');
  const [lastAirDate, setLastAirDate] = useState('');
  const [inProduction, setInProduction] = useState('');
  const [lastEpisodeToAir, setLastEpisodeToAir] = useState({});
  const [nextEpisodeToAir, setNextEpisodeToAir] = useState({});
  const [networks, setNetworks] = useState([]);
  const [numberOfSeasons, setNumberOfSeasons] = useState(0);
  const [numberOfEpisodes, setNumberOfEpisodes] = useState(0);
  const [type, setType] = useState('');

  // component variables
  const { pathname } = window.location;
  const mediaType = decodeURIComponent(pathname.split('/')[1]);
  const id = parseInt(decodeURIComponent(pathname.split('/')[2]));

  // Context
  const [state, dispatch] = useContext(Context);

  const {
    loggedIn,
    languagesList,
    favoriteMoviesListIds,
    favoriteTvShowsListIds,
    moviesWatchlistIds,
    tvShowsWatchlistIds
  } = state;

  // history
  const history = useHistory();

  const accountId = localStorage.getItem('accountId');
  const sessionId = localStorage.getItem('sessionId');

  const loadMoreResults = () => {
    if (creditsPage < creditsTotalPages) {
      setCreditsPage((creditsPage) => creditsPage + 1);
    }
  };

  const getCombinedCredits = (data) => {
    const castCredits = data?.combined_credits?.cast || [];
    const crewCredits = data?.combined_credits?.crew || [];
    const combinedCredits = uniqBy([...castCredits, ...crewCredits], 'id');

    return combinedCredits;
  };

  const openImagesModal = (index) => {
    setOpenedImageIndex(index);
    setImagesModalOpened(true);

    dispatch({
      type: 'PREVENT_PAGE_SCROLL',
      payload: {
        preventPageScroll: true,
        pageScrollTop: document.documentElement.scrollTop
      }
    });
  };

  const closeImagesModal = () => {
    setImagesModalOpened(false);

    dispatch({
      type: 'PREVENT_PAGE_SCROLL',
      payload: { preventPageScroll: false }
    });
  };

  const toggleFavorite = (accountId, sessionId, mediaType, id, add) => {
    if (!loggedIn) return;

    addToFavorites(accountId, sessionId, mediaType, id, add).then((response) => {
      setFavorite((favorite) => !favorite);
      dispatch({
        type: 'USER_LISTS_CHANGED'
      });

      M.toast({
        html: `"${ name }" ${ add ? 'added to' : 'removed from'} favorites list`,
        classes: 'ml-single-toast'
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
        html: `"${ name }" ${ add ? 'added to' : 'removed from'} watch later list`,
        classes: 'ml-single-toast'
      });
    });
  };

  const infoItems = [
    { show: !isEmpty(tagline), className: 'ml-single-tagline', dataToShow: tagline },
    { show: !isEmpty(biography), className: 'ml-single-biography', dataToShow: biography },
    { show: !isEmpty(overview), className: 'ml-single-biography', dataToShow: overview },
    { show: !isEmpty(originalName), label: 'Original name:', dataToShow: originalName },
    { show: !isEmpty(genres), label: 'Genres:', dataToShow: genres.join(', ') },
    { show: !isEmpty(createdBy), label: 'Created by:', dataToShow: createdBy.join(', ') },
    { show: !isUndefined(adult), label: 'Adult content:', dataToShow: adult ? 'Yes' : 'No' },
    { show: !isEmpty(birthday), label: 'Birthday:', dataToShow: moment(birthday).format(DATETIME_FORMAT) },
    { show: !isEmpty(deathday), label: 'Deathday:', dataToShow: moment(deathday).format(DATETIME_FORMAT) },
    { show: !isUndefined(gender), label: 'Gender:', dataToShow: gender === 1 ? 'female' : 'male' },
    { show: !isEmpty(placeOfBirth), label: 'Place of birth:', dataToShow: placeOfBirth },
    { show: !isEmpty(releaseDate), label: 'Release date:', dataToShow: moment(releaseDate).format(DATETIME_FORMAT) },
    { show: !isEmpty(firstAirDate), label: 'First air date:', dataToShow: moment(firstAirDate).format(DATETIME_FORMAT) },
    { show: !isEmpty(lastAirDate), label: 'Last air date:', dataToShow: moment(lastAirDate).format(DATETIME_FORMAT) },
    { show: !isEmpty(lastEpisodeToAir), label: 'Last episode to air:',
      dataToShow: `Season ${lastEpisodeToAir.season_number}, episode ${lastEpisodeToAir.episode_number} on ${moment(lastEpisodeToAir.air_date).format(DATETIME_FORMAT)}` },
    { show: !isEmpty(nextEpisodeToAir), label: 'Next episode to air:',
      dataToShow: `Season ${nextEpisodeToAir.season_number}, episode ${nextEpisodeToAir.episode_number} on ${moment(nextEpisodeToAir.air_date).format(DATETIME_FORMAT)}` },
    { show: displayOriginalLanguage(originalLanguage, languagesList).showOriginalLanguage, label: 'Original language:',
      dataToShow: displayOriginalLanguage(originalLanguage, languagesList).originalLanguage },
    { show: !isEmpty(spokenLanguages), label: 'Spoken languages:', dataToShow: spokenLanguages.map((language) => language.english_name).join(', ') },
    { show: !isEmpty(networks), label: 'Networks:', dataToShow: productionCompanies.map((company) => company.name).join(', ') },
    { show: !isEmpty(productionCompanies), label: 'Production companies:', dataToShow: productionCompanies.map((company) => company.name).join(', ') },
    { show: !isEmpty(productionCountries), label: 'Production countries:', dataToShow: productionCountries.map((country) => country.name).join(', ') },
    { show: !isUndefined(voteAverage), label: 'Average vote:', dataToShow: voteAverage },
    { show: !isUndefined(runtime), label: 'Runtime:', dataToShow: `${runtime} min` },
    { show: !isEmpty(episodeRuntime), label: 'Episode runtime:', dataToShow: `${episodeRuntime.join(', ')} min` },
    { show: !isUndefined(numberOfSeasons), label: 'Number of seasons:', dataToShow: numberOfSeasons },
    { show: !isUndefined(numberOfEpisodes), label: 'Number of episodes:', dataToShow: numberOfEpisodes },
    { show: !isEmpty(type), label: 'Type:', dataToShow: type },
    { show: !isEmpty(inProduction), label: 'In production:', dataToShow: inProduction },
    { show: !isEmpty(status), label: 'Status:', dataToShow: status },
  ];

  useEffect(() => {
    setDataLoaded(false);

    getSingle(mediaType, id)
      .then((response) => {
        const { data } = response;

        // common
        setName(data.name || data.title);
        setPosterImage(data.poster_path || data.profile_path);

        // person specific
        setAdult(data.adult);
        setBiography(data.biography);
        setBirthday(data.birthday);
        setDeathday(data.deathday);
        setGender(data.gender);
        setPlaceOfBirth(data.place_of_birth);
        setAllCredits(() => getCombinedCredits(data));
        setCreditsTotalPages(() => Math.ceil(getCombinedCredits(data).length / getSetting('knownForItemsPerPage')));

        // movie specific
        setGenres((genres) => data?.genres
                              ? data.genres.map((genre) => genre.name)
                              : genres);
        setOriginalLanguage(data.original_language);
        setOriginalName(data.original_name || data.original_title);
        setOverview(data.overview);
        setProductionCompanies((productionCompanies) => data.production_companies || productionCompanies);
        setProductionCountries((productionCountries) => data.production_countries || productionCountries);
        setReleaseDate(data.release_date);
        setRuntime(data.runtime);
        setSpokenLanguages((spokenLanguages) => data.spoken_languages || spokenLanguages);
        setStatus(data.status);
        setTagline(data.tagline);
        setVoteAverage(data.vote_average);
        setVideos((videos) => data?.videos?.results || videos);
        setBackdropImages((backdropImages) => data?.images?.backdrops || backdropImages);
        setPosterImages((posterImages) => data?.images?.posters || posterImages);
        setSimilar((similar) => data?.similar?.results || similar);

        // tv show specific
        setCreatedBy((createdBy) => data?.created_by
                                    ? data.created_by.map((creator) => creator.name)
                                    : createdBy);
        setEpisodeRuntime((episodeRuntime) => data?.episode_run_time
                                              ? data?.episode_run_time.sort()
                                              : episodeRuntime);
        setFirstAirDate(data.first_air_date);
        setLastAirDate(data.last_air_date);
        setInProduction(data.in_production ? 'Yes' : 'No');
        setLastEpisodeToAir((lastEpisodeToAir) => data?.last_episode_to_air || lastEpisodeToAir);
        setNextEpisodeToAir((nextEpisodeToAir) => data?.next_episode_to_air || nextEpisodeToAir);
        setNetworks((networks) => data?.networks
                                  ? data.networks.map((network) => network.name)
                                  : networks);
        setNumberOfSeasons(data.number_of_seasons);
        setNumberOfEpisodes(data.number_of_episodes);
        setType(data.type);

        setDataLoaded(true);

        return response;
      })
      .catch((error) => {
        history.push('/error');
      });
  }, [mediaType, id, history]);

  useEffect(() => {
    switch (mediaType) {
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
  }, [mediaType, id, favoriteMoviesListIds, moviesWatchlistIds, favoriteTvShowsListIds, tvShowsWatchlistIds]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    dataLoaded ?
      (<div className='ml-single ml-single-loaded'>
        <BackButton />
        <div className='ml-single-header'>
          <img
            className='ml-single-poster'
            src={posterImage ? `${SECURE_BASE_URL}${PROFILE_SIZES.original}${posterImage}` : noImageAvailable}
            alt={name}
          />
          <div className='ml-single-info'>
            <h4 className='ml-single-name'>
              {name}
              {
                displayReleaseYear(releaseDate, firstAirDate).showReleaseYear &&
                <span className='ml-single-release-year'> ({ displayReleaseYear(releaseDate, firstAirDate).releaseYear })</span>
              }
            </h4>
            <div className='ml-single-content'>
              {
                infoItems.map((infoItem, i) => {
                  const { show, className, label, dataToShow } = infoItem;

                  return (
                    <InfoItem
                      key={ i }
                      show={ show }
                      className={ className }
                      label={ label }
                      dataToShow={ dataToShow }
                    />
                  );
                })
              }
              {
                mediaType !== 'person' && loggedIn && (
                  <div className='ml-single-action-icons'>
                    <i className={`material-icons ml-single-action-icon ${favorite && 'ml-single-action-icon-active'}`}
                      onClick={() => toggleFavorite(accountId, sessionId, mediaType, id, !favorite)}
                    >
                      favorite
                    </i>
                    <i className={`material-icons ml-single-action-icon ${watchLater && 'ml-single-action-icon-active'}`}
                      onClick={() => toggleWatchLater(accountId, sessionId, mediaType, id, !watchLater)}
                    >
                      watch_later
                    </i>
                  </div>
                )
              }
            </div>
          </div>
        </div>
        {
          (!isEmpty(allCredits)) &&
          (
            <>
              <KnownFor
                allCredits={allCredits}
                numberOfItemsToLoad={creditsPage * getSetting('knownForItemsPerPage')}
              />
              <div className='ml-single-button-holder'>
                <Button
                  label='Load more'
                  disabled={creditsPage === creditsTotalPages}
                  clickHandler={() => loadMoreResults()}
                />
              </div>
            </>
          )
        }
        {
          (!isEmpty(posterImages)) &&
          (
            <PosterImages
              posterImages={backdropImages}
              openImagesModal={openImagesModal}
            />
          )
        }
        {
          (!isEmpty(videos)) &&
          (
            <Videos videos={videos} />
          )
        }
        {
          (showSimilarContent && !isEmpty(similar)) &&
          (
            <Section
              title={`Similar ${mediaType === 'movie' ? 'movies' : 'TV shows'}`}
              dataToShow={similar}
              mediaType={mediaType}
              loaded={dataLoaded}
            />
          )
        }
        {
          imagesModalOpened && !isEmpty(backdropImages) &&
          (
            <ImagesModal
              images={backdropImages}
              openedImageIndex={openedImageIndex}
              closeImagesModal={closeImagesModal}
            />
          )
        }
      </div>) : (
        <div className='ml-single'>
          <BackButton />
          <Spinner />
        </div>
      )
  );
};

PosterImages.propTypes = {
  posterImages: PropTypes.array,
  openImagesModal: PropTypes.bool,
};

Videos.propTypes = {
  videos: PropTypes.array,
};

Credits.propTypes = {
  credits: PropTypes.array,
};

KnownFor.propTypes = {
  allCredits: PropTypes.array,
  numberOfItemsToLoad: PropTypes.number,
};

export default Single;
