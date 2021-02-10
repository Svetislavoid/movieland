import React, { useState, useEffect } from 'react';

// components
import Section from '@/components/Section';
import SearchInput from '@/components/SearchInput';

// styles
import '@/pages/Home.css';

// services
import { getTrending } from '@/services';

// settings & functions
import { TRENDING_SETTINGS } from '@/common/settings';
import {
  responseItemHasNeededData
} from '@/common/functions';

// libraries
import { take } from 'lodash';

const {
  mediaTypes,
  timeWindow,
  numberOfItemsToShowOnHomepage
} = TRENDING_SETTINGS;

const Home = () => {
  // state variables
  const [trendingAll, setTrendingAll] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTvShows, setTrendingTvShows] = useState([]);
  const [trendingPersons, setTrendingPersons] = useState([]);

  // Get data for each trending type defined in settings
  useEffect(() => {
    mediaTypes.forEach((type) => {
      getTrending(type, timeWindow)
        .then((response) => {
          const { results } = response.data;

          // Filter result items that do not have all the needed data
          const filteredResponse = results.filter((item) => responseItemHasNeededData(item));
          const items = take(filteredResponse, numberOfItemsToShowOnHomepage);

          if (type === 'movie') {
            setTrendingMovies(items);
          } else if (type === 'tv') {
            setTrendingTvShows(items);
          } else if (type === 'person') {
            setTrendingPersons(items);
          } else if (type === 'all') {
            setTrendingAll(items);
          }
        });
    });
  }, []);

  return (
    <div className='ml-home'>
      <div className='ml-home-search'>
        <SearchInput />
      </div>
      {
        TRENDING_SETTINGS.mediaTypes.includes('all') &&
        <Section
          title='Trending'
          dataToShow={trendingAll}
        />
      }
      {
        TRENDING_SETTINGS.mediaTypes.includes('movie') &&
        <Section
          title='Trending movies'
          dataToShow={trendingMovies}
        />
      }
      {
        TRENDING_SETTINGS.mediaTypes.includes('tv') &&
        <Section
          title='Trending TV shows'
          dataToShow={trendingTvShows}
        />
      }
      {
        TRENDING_SETTINGS.mediaTypes.includes('person') &&
        <Section
          title='Trending persons'
          dataToShow={trendingPersons}
        />
      }
    </div>
  );
};

export default Home;
