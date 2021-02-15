import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

// components
import Section from '@/components/Section';
import SearchInput from '@/components/SearchInput';

// styles
import '@/pages/Home.css';

// services
import { getTrending } from '@/services';

// settings & functions
import { TRENDING_SETTINGS } from '@/common/settings';
import { responseItemHasNeededData } from '@/common/functions';

// libraries
import { take } from 'lodash';

const Home = () => {
  // state variables
  const [trendingAll, setTrendingAll] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTvShows, setTrendingTvShows] = useState([]);
  const [trendingPersons, setTrendingPersons] = useState([]);

  // history
  const history = useHistory();

  let mediaTypes = [];
  let timeWindow = '';
  let numberOfItemsToShow = 0;

  // Pull settings from local storage, if they exist,
  // otherwise get default settings from a settings file
  if (localStorage.getItem('trendingSettings')) {
    mediaTypes = JSON.parse(localStorage.getItem('trendingSettings')).mediaTypes;
    timeWindow = JSON.parse(localStorage.getItem('trendingSettings')).timeWindow;
    numberOfItemsToShow = JSON.parse(localStorage.getItem('trendingSettings')).numberOfItemsToShow;
  } else {
    mediaTypes = TRENDING_SETTINGS.mediaTypes;
    timeWindow = TRENDING_SETTINGS.timeWindow;
    numberOfItemsToShow = TRENDING_SETTINGS.numberOfItemsToShow;
  }

  // Get data for each trending type defined in settings
  useEffect(() => {
    mediaTypes.forEach((type) => {
      getTrending(type, timeWindow)
        .then((response) => {
          const { results } = response.data;

          // Filter result items that do not have all the needed data
          const filteredResults = results.filter((item) => responseItemHasNeededData(item));
          const items = take(filteredResults, numberOfItemsToShow);

          if (type === 'movie') {
            setTrendingMovies(items);
          } else if (type === 'tv') {
            setTrendingTvShows(items);
          } else if (type === 'person') {
            setTrendingPersons(items);
          } else if (type === 'all') {
            setTrendingAll(items);
          }

          return response;
        })
        .catch((error) => {
          history.push('/error');
        });
    });
  }, []);

  return (
    <div className='ml-home'>
      <div className='ml-home-search'>
        <SearchInput />
      </div>
      <Link to='/settings'>Settings</Link>
      {
        mediaTypes.includes('all') &&
        <Section
          title='Trending'
          showMoreUrl='/trending'
          dataToShow={trendingAll}
        />
      }
      {
        mediaTypes.includes('movie') &&
        <Section
          title='Trending movies'
          showMoreUrl='/trending/movie'
          dataToShow={trendingMovies}
        />
      }
      {
        mediaTypes.includes('tv') &&
        <Section
          title='Trending TV shows'
          showMoreUrl='/trending/tv'
          dataToShow={trendingTvShows}
        />
      }
      {
        mediaTypes.includes('person') &&
        <Section
          title='Trending persons'
          showMoreUrl='/trending/person'
          dataToShow={trendingPersons}
        />
      }
    </div>
  );
};

export default Home;
