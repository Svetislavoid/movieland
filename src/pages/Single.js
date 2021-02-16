import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

// components
import InfoItem from '@/components/InfoItem';
import Section from '@/components/Section';
import Button from '@/components/Button';

// services
import { getSingle } from '@/services';

// styles
import '@/pages/Single.css';

// settings & functions
import {
  BACKDROP_SIZES,
  POSTER_SIZES,
  PROFILE_SIZES,
  LOGO_SIZES,
  SECURE_BASE_URL,
  DATETIME_FORMAT
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
  }

  useEffect(() => {
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
        setProfileImages(data?.images?.profiles && data.images.profiles.map((image) => image.file_path));
        setCastCredits(data?.combined_credits?.cast || []);
        setCrewCredits(data?.combined_credits?.crew || []);
        setAllCredits(() => getCombinedCredits(data));
        setCreditsTotalPages(() => Math.ceil(getCombinedCredits(data).length / getSetting('knownForItemsPerPage')));

        // movie specific
        setGenres(data?.genres && data.genres.map((genre) => genre.name));
        setOriginalLanguage(data.original_language);
        setOriginalName(data.original_name || data.original_title);
        setOverview(data.overview);
        setProductionCompanies(data.production_companies);
        setProductionCountries(data.production_countries);
        setReleaseDate(data.release_date);
        setRuntime(data.runtime);
        setSpokenLanguages(data.spoken_languages);
        setStatus(data.status);
        setTagline(data.tagline);
        setVoteAverage(data.vote_average);
        setVideos(data?.videos?.results || []);
        setBackdropImages(data?.images?.backdrops || []);
        setPosterImages(data?.images?.posters || []);

        // tv show specific
        setCreatedBy(data?.created_by && data.created_by.map((creator) => creator.name));
        setEpisodeRuntime(data.episode_run_time);
        setFirstAirDate(data.first_air_date);
        setLastAirDate(data.last_air_date);
        setInProduction(data.in_production ? 'Yes' : 'No');
        setLanguages(data.languages);
        setLastEpisodeToAir(data.last_episode_to_air);
        setNextEpisodeToAir(data.next_episode_to_air);
        setNetworks(data.networks);
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
              show={ !isEmpty(biography) }
              className='ml-single-biography'
              dataToShow={ biography }
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
                clickHandler={() => loadMoreResults(creditsPage + 1)}
              />
            </div>
          </>
        )
      }
    </div>
  );
};

export default Single;
