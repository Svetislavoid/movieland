import React, { useState, useEffect } from 'react';

// components
import Section from '@/components/Section';

// styles
import '@/pages/Home.css';

// services
import { getTrending } from '@/services';

// settings
import { TRENDING_SETTINGS } from '@/common/settings';

const { mediaTypes, timeWindow } = TRENDING_SETTINGS;

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
        .then((r) => {
          if (type === 'movie') {
            setTrendingMovies(r.data.results);
          } else if (type === 'tv') {
            setTrendingTvShows(r.data.results);
          } else if (type === 'person') {
            setTrendingPersons(r.data.results);
          } else if (type === 'all') {
            setTrendingAll(r.data.results);
          }
        });
    });
  }, []);

  return (
    <div className='ml-home'>
      {
        TRENDING_SETTINGS.mediaTypes.includes('all') &&
        <section>
          <h2>Trending:</h2>
          <Section type='all' dataToShow={trendingAll} />
        </section>
      }
      {
        TRENDING_SETTINGS.mediaTypes.includes('movie') &&
        <section>
          <h2>Trending movies:</h2>
          <Section type='movie' dataToShow={trendingMovies} />
        </section>
      }
      {
        TRENDING_SETTINGS.mediaTypes.includes('tv') &&
        <section>
          <h2>Trending tv shows:</h2>
          <Section type='tv' dataToShow={trendingTvShows} />
        </section>
      }
      {
        TRENDING_SETTINGS.mediaTypes.includes('person') &&
        <section>
          <h2>Trending persons:</h2>
          <Section type='person' dataToShow={trendingPersons} />
        </section>
      }
    </div>
  );
};

export default Home;
