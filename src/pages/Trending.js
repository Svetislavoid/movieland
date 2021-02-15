import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// components
import Section from '@/components/Section';
import Button from '@/components/Button';

// styles
import '@/pages/Trending.css';

// services
import { getTrending } from '@/services';

// settings && functions
import { responseItemHasNeededData } from '@/common/functions';
import { TRENDING_SETTINGS } from '@/common/settings';

const { timeWindow } = TRENDING_SETTINGS;

const Trending = () => {
  // state variables
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sectionTitle, setSectionTitle] = useState('');

  // component variables
  const { pathname } = window.location;
  const mediaType = decodeURIComponent(pathname.split('/')[2]);

  // history
  const history = useHistory();

  const loadMoreResults = (pageToLoad) => {
    getTrending(mediaType, timeWindow, pageToLoad)
      .then((response) => {
        const {
          results,
          page
        } = response.data;

        // Filter result items that do not have all the needed data
        const filteredResults = results.filter((item) => responseItemHasNeededData(item));

        setResults((results) => ([
          ...results,
          ...filteredResults
        ]));
        setPage(page);

        return response;
      })
      .catch((error) => {
        history.push('/error');
      });
  };

  // Search for a movie, tv show or person
  useEffect(() => {
    getTrending(mediaType, timeWindow)
      .then((response) => {
        const {
          results,
          page,
          total_pages
        } = response.data;

        // Filter result items that do not have all the needed data
        const filteredResults = results.filter((item) => responseItemHasNeededData(item));

        setResults(filteredResults);
        setPage(page);
        setTotalPages(total_pages);

        return response;
      })
      .catch((error) => {
        history.push('/error');
      });

    if (mediaType === 'movie') {
      setSectionTitle('Trending movies');
    } else if (mediaType === 'tv') {
      setSectionTitle('Trending Tv shows');
    } else if (mediaType === 'person') {
      setSectionTitle('Trending persons');
    }
  }, [mediaType]);

  return (
    <div>
      <Section
        title={sectionTitle}
        dataToShow={results}
      />
      <div className='ml-search-button-holder'>
        <Button
          label='Load more'
          disabled={page === totalPages}
          clickHandler={() => loadMoreResults(page + 1)}
        />
      </div>
    </div>
  );
};

export default Trending;
