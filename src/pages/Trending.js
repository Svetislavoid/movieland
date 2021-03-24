import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// components
import Section from '@/components/Section';
import Button from '@/components/Button';
import BackButton from '@/components/BackButton';
import Spinner from '@/components/Spinner';

// styles
import '@/pages/Trending.css';

// services
import { getTrending } from '@/services';

// settings && functions
import { responseItemHasNeededData, addInfoToHistoryState } from '@/common/functions';
import { SETTINGS } from '@/common/settings';

// libraries
import { isEmpty } from 'lodash';

const { trendingTimeWindow } = SETTINGS;

const Trending = () => {
  // state variables
  const [results, setResults] = useState(window.history.state?.state?.results || []);
  const [page, setPage] = useState(window.history.state?.state?.page || 1);
  const [totalPages, setTotalPages] = useState(window.history.state?.state?.totalPages || 0);
  const [sectionTitle, setSectionTitle] = useState('');
  const [showLoadMoreSpinner, setShowLoadMoreSpinner] = useState(false);
  const [resultsLoaded, setResultsLoaded] = useState(window.history.state?.state?.resultsLoaded || false);

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
    addInfoToHistoryState(history, {
      results: results,
      page: page,
      totalPages: totalPages,
      resultsLoaded: resultsLoaded
    });
  }, [history, results, page, totalPages, resultsLoaded]);

  useEffect(() => {
    if (!isEmpty(results)) return;

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
  }, [mediaType, history, results]);

  useEffect(() => {
    const scrollTop = window.history.state?.state?.scrollTop || 0;

    window.scrollTo(0, scrollTop);
  }, [pathname]);

  return (
    <div>
      <BackButton />
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
