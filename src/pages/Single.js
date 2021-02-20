import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

// components
import InfoItem from '@/components/InfoItem';
import Section from '@/components/Section';
import Button from '@/components/Button';

// services
import { getSingle } from '@/services';
import { Context } from '@/store/store';

// styles
import '@/pages/Single.css';

// settings & functions
import {
  BACKDROP_SIZES,
  POSTER_SIZES,
  PROFILE_SIZES,
  LOGO_SIZES,
  SECURE_BASE_URL,
  DATETIME_FORMAT,
  VIDEO_SERVICES
} from '@/common/settings';
import {
  displayName,
  displayReleaseYear,
  displayOriginalName,
  displayGenres,
  displayOriginalLanguage,
  displayOriginCountries,
  displayKnownFor,
  getSetting
} from '@/common/functions';

// assets
import noImageAvailable from '@/assets/no_image_available.png';

// libraries
// import moment from 'moment';
import { isUndefined, isEmpty, take, uniqBy } from 'lodash';
import moment from 'moment';

const PosterImages = (props) => {
  const {
    posterImages
  } = props;

  return (!isEmpty(posterImages)) ? (
    <div className='ml-single-known-for'>
      <h3 className='ml-single-known-for-title'>Images</h3>
      <div className='ml-single-known-for-items'>
        {
          posterImages.map((image) => (
            <img src={`${SECURE_BASE_URL}${POSTER_SIZES.large}${image.file_path}`} />
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
    <div className='ml-single-known-for'>
      <h3 className='ml-single-known-for-title'>Videos</h3>
      <div className='ml-single-known-for-items'>
        {
          videos.map((video) => (
            <iframe
              key={video.id}
              allowfullscreen='allowfullscreen'
              mozallowfullscreen='mozallowfullscreen'
              msallowfullscreen='msallowfullscreen'
              oallowfullscreen='oallowfullscreen'
              webkitallowfullscreen='webkitallowfullscreen'
              src={`${VIDEO_SERVICES[video.site]}${video.key}`} >
            </iframe>))
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
        media_type,
        name,
        title,
        release_date,
        first_air_date,
        poster_path
      } = item;

      return (
        <Link
          className='ml-single-known-for-item'
          key={id}
          to={`/${media_type}/${id}`}
        >
          <img
            className='ml-single-known-for-poster'
            src={poster_path ? `${SECURE_BASE_URL}${POSTER_SIZES.smallest}${poster_path}` : noImageAvailable}
            alt={name || title}
          />
          <div>
            <span>{ displayName(title, name) }</span>
            {
              displayReleaseYear(release_date, first_air_date).showReleaseYear &&
              <span> ({ displayReleaseYear(release_date, first_air_date).releaseYear })</span>
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
  const [profileImages, setProfileImages] = useState([]);
  const [castCredits, setCastCredits] = useState([]);
  const [crewCredits, setCrewCredits] = useState([]);
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
  const [languages, setLanguages] = useState([]);
  const [lastEpisodeToAir, setLastEpisodeToAir] = useState({});
  const [nextEpisodeToAir, setNextEpisodeToAir] = useState({});
  const [networks, setNetworks] = useState([]);
  const [numberOfSeasons, setNumberOfSeasons] = useState(0);
  const [numberOfEpisodes, setNumberOfEpisodes] = useState(0);
  const [seasons, setSeasons] = useState([]);
  const [type, setType] = useState('');

  // component variables
  const { pathname } = window.location;
  const mediaType = decodeURIComponent(pathname.split('/')[1]);
  const id = decodeURIComponent(pathname.split('/')[2]);

  // Context
  const [state] = useContext(Context);

  const { languagesList } = state;

  // history
  const history = useHistory();

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

  useEffect(() => {
    getSingle(mediaType, id)
      .then((response) => {
        const { data } = response;

        // common
        setName(data.name || data.title); // DONE ---------------------
        setPosterImage(data.poster_path || data.profile_path); // DONE ---------------------

        // person specific
        setAdult(data.adult); // DONE ---------------------
        setBiography(data.biography); // DONE ---------------------
        setBirthday(data.birthday); // DONE ---------------------
        setDeathday(data.deathday); // DONE ---------------------
        setGender(data.gender); // DONE ---------------------
        setPlaceOfBirth(data.place_of_birth); // DONE ---------------------
        setProfileImages((profileImages) => data?.images?.profiles ? data.images.profiles.map((image) => image.file_path) : profileImages);
        setCastCredits((castCredits) => data?.combined_credits?.cast ? data.combined_credits.cast : castCredits); // DONE ---------------------
        setCrewCredits((crewCredits) => data?.combined_credits?.crew ? data.combined_credits.crew : crewCredits); // DONE ---------------------
        setAllCredits(() => getCombinedCredits(data)); // DONE ---------------------
        setCreditsTotalPages(() => Math.ceil(getCombinedCredits(data).length / getSetting('knownForItemsPerPage')));

        // movie specific
        setGenres((genres) => data?.genres ? data.genres.map((genre) => genre.name) : genres); // DONE ---------------------
        setOriginalLanguage(data.original_language); // DONE ---------------------
        setOriginalName(data.original_name || data.original_title); // DONE ---------------------
        setOverview(data.overview); // DONE ---------------------
        setProductionCompanies((productionCompanies) => data.production_companies || productionCompanies); // DONE ---------------------
        setProductionCountries((productionCountries) => data.production_countries || productionCountries); // DONE ---------------------
        setReleaseDate(data.release_date); // DONE ---------------------
        setRuntime(data.runtime); // DONE ---------------------
        setSpokenLanguages((spokenLanguages) => data.spoken_languages || spokenLanguages); // DONE ---------------------
        setStatus(data.status); // DONE ---------------------
        setTagline(data.tagline); // DONE ---------------------
        setVoteAverage(data.vote_average); // DONE ---------------------
        setVideos((videos) => data?.videos?.results ? data.videos.results : videos);
        setBackdropImages((backdropImages) => data?.images?.backdrops ? data.images.backdrops : backdropImages);
        setPosterImages((posterImages) => data?.images?.posters ? data.images.posters : posterImages);
        setSimilar((similar) => data?.similar?.results ? data.similar.results : similar);

        // tv show specific
        setCreatedBy((createdBy) => data?.created_by ? data.created_by.map((creator) => creator.name) : createdBy);
        setEpisodeRuntime((episodeRuntime) => data?.episode_run_time ? data?.episode_run_time : episodeRuntime);
        setFirstAirDate(data.first_air_date);
        setLastAirDate(data.last_air_date);
        setInProduction(data.in_production ? 'Yes' : 'No');
        setLanguages(data.languages);
        setLastEpisodeToAir((lastEpisodeToAir) => data?.last_episode_to_air ? data.last_episode_to_air : lastEpisodeToAir);
        setNextEpisodeToAir((nextEpisodeToAir) => data?.next_episode_to_air ? data.next_episode_to_air : nextEpisodeToAir);
        setNetworks((networks) => data?.networks ? data.networks.map((network) => network.name) : networks);
        setNumberOfSeasons(data.number_of_seasons);
        setNumberOfEpisodes(data.number_of_episodes);
        setSeasons(data.seasons);
        setType(data.type);

        setDataLoaded(true);

        return response;
      })
      .catch((error) => {
        history.push('/error');
      });
  }, [mediaType, id, history]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={`ml-single ${dataLoaded && 'ml-single-loaded'}`}>
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
            <InfoItem
              show={ !isEmpty(tagline) }
              className='ml-single-tagline'
              dataToShow={ tagline }
            />
            <InfoItem
              show={ !isEmpty(biography) }
              className='ml-single-biography'
              dataToShow={ biography }
            />
            <InfoItem
              show={ !isEmpty(overview) }
              className='ml-single-biography'
              dataToShow={ overview }
            />
            <InfoItem
              show={ !isEmpty(originalName) }
              label='Original name:'
              dataToShow={ originalName }
            />
            <InfoItem
              show={ !isEmpty(genres) }
              label='Genres:'
              dataToShow={ genres.join(', ') }
            />
            <InfoItem
              show={ !isEmpty(createdBy) }
              label='Created by:'
              dataToShow={ createdBy.join(', ') }
            />
            <InfoItem
              show={ !isUndefined(adult) }
              label='Adult content:'
              dataToShow={ adult ? 'Yes' : 'No' }
            />
            <InfoItem
              show={ !isEmpty(birthday) }
              label='Birthday:'
              dataToShow={ moment(birthday).format(DATETIME_FORMAT) }
            />
            <InfoItem
              show={ !isEmpty(deathday) }
              label='Deathday:'
              dataToShow={ moment(deathday).format(DATETIME_FORMAT) }
            />
            <InfoItem
              show={ !isUndefined(gender) }
              label='Gender:'
              dataToShow={ gender === 1 ? 'female' : 'male' }
            />
            <InfoItem
              show={ !isEmpty(placeOfBirth) }
              label='Place of birth:'
              dataToShow={ placeOfBirth }
            />
            <InfoItem
              show={ !isEmpty(releaseDate) }
              label='Release date:'
              dataToShow={ moment(releaseDate).format(DATETIME_FORMAT) }
            />
            <InfoItem
              show={ !isEmpty(firstAirDate) }
              label='First air date:'
              dataToShow={ moment(firstAirDate).format(DATETIME_FORMAT) }
            />
            <InfoItem
              show={ !isEmpty(lastAirDate) }
              label='Last air date:'
              dataToShow={ moment(lastAirDate).format(DATETIME_FORMAT) }
            />
            <InfoItem
              show={ !isEmpty(lastEpisodeToAir) }
              label='Last episode to air:'
              dataToShow={ `Season ${lastEpisodeToAir.season_number}, episode ${lastEpisodeToAir.episode_number} on ${moment(lastEpisodeToAir.air_date).format(DATETIME_FORMAT)}` }
            />
            <InfoItem
              show={ !isEmpty(nextEpisodeToAir) }
              label='Next episode to air:'
              dataToShow={ `Season ${nextEpisodeToAir.season_number}, episode ${nextEpisodeToAir.episode_number} on ${moment(nextEpisodeToAir.air_date).format(DATETIME_FORMAT)}` }
            />
            <InfoItem
              show={ displayOriginalLanguage(originalLanguage, languagesList).showOriginalLanguage }
              label='Original language:'
              dataToShow={ displayOriginalLanguage(originalLanguage, languagesList).originalLanguage }
            />
            <InfoItem
              show={ !isEmpty(spokenLanguages) }
              label='Spoken languages:'
              dataToShow={ spokenLanguages.map((language) => language.english_name).join(', ') }
            />
            <InfoItem
              show={ !isEmpty(networks) }
              label='Networks:'
              dataToShow={ productionCompanies.map((company) => company.name).join(', ') }
            />
            <InfoItem
              show={ !isEmpty(productionCompanies) }
              label='Production companies:'
              dataToShow={ productionCompanies.map((company) => company.name).join(', ') }
            />
            <InfoItem
              show={ !isEmpty(productionCountries) }
              label='Production countries:'
              dataToShow={ productionCountries.map((country) => country.name).join(', ') }
            />
            <InfoItem
              show={ !isUndefined(voteAverage) }
              label='Average vote:'
              dataToShow={ voteAverage }
            />
            <InfoItem
              show={ !isUndefined(runtime) }
              label='Runtime:'
              dataToShow={ `${runtime} min` }
            />
            <InfoItem
              show={ !isEmpty(episodeRuntime) }
              label='Episode runtime:'
              dataToShow={ `${episodeRuntime.join(', ')} min` }
            />
            <InfoItem
              show={ !isUndefined(numberOfSeasons) }
              label='Number of seasons:'
              dataToShow={ numberOfSeasons }
            />
            <InfoItem
              show={ !isUndefined(numberOfEpisodes) }
              label='Number of episodes:'
              dataToShow={ numberOfEpisodes }
            />
            <InfoItem
              show={ !isEmpty(type) }
              label='Type:'
              dataToShow={ type }
            />
            <InfoItem
              show={ !isEmpty(inProduction) }
              label='In production:'
              dataToShow={ inProduction }
            />
            <InfoItem
              show={ !isEmpty(status) }
              label='Status:'
              dataToShow={ status }
            />
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
          <PosterImages posterImages={backdropImages} />
        )
      }
      {
        (!isEmpty(videos)) &&
        (
          <Videos videos={videos} />
        )
      }
      {
        (!isEmpty(similar)) &&
        (
          <Section
            title={`Similar ${mediaType === 'movie' ? 'movies' : 'TV shows'}`}
            dataToShow={similar}
            mediaType={mediaType}
          />
        )
      }
    </div>
  );
};

export default Single;
