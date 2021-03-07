import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// components
import Section from '@/components/Section';
import Button from '@/components/Button';
import Spinner from '@/components/Spinner';

// styles
import '@/pages/Trending.css';

// services
import { getTrending } from '@/services';

// settings && functions
import { responseItemHasNeededData } from '@/common/functions';
import { SETTINGS } from '@/common/settings';

const { trendingTimeWindow } = SETTINGS;

const Trending = () => {
  // state variables
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sectionTitle, setSectionTitle] = useState('');
  const [showLoadMoreSpinner, setShowLoadMoreSpinner] = useState(false);
  const [resultsLoaded, setResultsLoaded] = useState(false);

  // component variables
  const { pathname } = window.location;
  const mediaType = decodeURIComponent(pathname.split('/')[2]);

  // history
  const history = useHistory();

  const loadMoreResults = (pageToLoad) => {
    setShowLoadMoreSpinner(true);

    getTrending(mediaType, trendingTimeWindow, pageToLoad)
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
        setShowLoadMoreSpinner(false);

        return response;
      })
      .catch((error) => {
        history.push('/error');
      });
  };

  useEffect(() => {
    getTrending(mediaType, trendingTimeWindow)
      .then((response) => {
        const {
          results,
          page,
          total_pages: totalPages
        } = response.data;

        // Filter result items that do not have all the needed data
        const filteredResults = results.filter((item) => responseItemHasNeededData(item));

        setResults(filteredResults);
        setPage(page);
        setTotalPages(totalPages);
        setResultsLoaded(true);

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
  }, [mediaType, history]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div>
      <Section
        title={sectionTitle}
        dataToShow={results}
        loaded={resultsLoaded}
      />
      <div className='ml-trending-spinner-holder'>
        {
          showLoadMoreSpinner && (
            <Spinner />)
        }
      </div>
      <div className='ml-trending-button-holder'>
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
