import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// components
import SearchInput from '@/components/SearchInput';
import Section from '@/components/Section';
import Button from '@/components/Button';
import BackButton from '@/components/BackButton';
import Spinner from '@/components/Spinner';

// styles
import '@/pages/Search.css';

// services
import { searchMoviesTvShowsPeople } from '@/services';

// functions
import { responseItemHasNeededData, addInfoToHistoryState } from '@/common/functions';

const Search = () => {
  // state variables
  const [searchResults, setSearchResults] = useState(window.history.state?.state?.searchResults || []);
  const [page, setPage] = useState(window.history.state?.state?.page || 1);
  const [totalPages, setTotalPages] = useState(window.history.state?.state?.totalPages || 0);
  const [totalResults, setTotalResults] = useState(window.history.state?.state?.totalResults || 0);
  const [showLoadMoreSpinner, setShowLoadMoreSpinner] = useState(false);
  const [searchResultsLoaded, setSearchResultsLoaded] = useState(window.history.state?.state?.searchResultsLoaded || false);

  // component variables
  const { pathname } = window.location;
  const searchTerm = decodeURIComponent(pathname.split('/')[2]);

  // history
  const history = useHistory();

  const loadMoreResults = (pageToLoad) => {
    setShowLoadMoreSpinner(true);

    searchMoviesTvShowsPeople(searchTerm, pageToLoad)
      .then((response) => {
        const {
          results,
          page
        } = response.data;

        // Filter result items that do not have all the needed data
        const filteredResults = results.filter((item) => responseItemHasNeededData(item));

        setSearchResults((searchResults) => ([
          ...searchResults,
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

  const cardClicked = () => {
    addInfoToHistoryState(history, {
      searchResults: searchResults,
      page: page,
      totalPages: totalPages,
      totalResults: totalResults,
      searchResultsLoaded: searchResultsLoaded
    });
  };

  // Search for a movie, tv show or person
  useEffect(() => {
    searchMoviesTvShowsPeople(searchTerm)
      .then((response) => {
        const {
          results,
          page,
          total_pages: totalPages,
          total_results: totalResults
        } = response.data;

        // Filter result items that do not have all the needed data
        const filteredResults = results.filter((item) => responseItemHasNeededData(item));

        if (window.history.state?.state?.searchResults) {
          addInfoToHistoryState(history, {
            searchResults: undefined,
            page: undefined,
            totalPages: undefined,
            totalResults: undefined,
            searchResultsLoaded: undefined
          });

          return response;
        }

        setSearchResults(filteredResults);
        setPage(page);
        setTotalPages(totalPages);
        setTotalResults(totalResults);
        setSearchResultsLoaded(true);

        return response;
      })
      .catch((error) => {
        history.push('/error');
      });
  }, [history, searchTerm]);

  useEffect(() => {
    const scrollTop = window.history.state?.state?.scrollTop || 0;

    window.scrollTo(0, scrollTop);
  }, [pathname]);

  return (
    <div>
      <BackButton />
      <div className='ml-search-search-input'>
        <SearchInput defaultSearchValue={ searchTerm } />
      </div>
      <h6 className='ml-search-results-info'>
        Found { totalResults } {totalResults === 1 ? 'result' : 'results'} for '{ searchTerm }'
      </h6>
      <Section
        dataToShow={searchResults}
        loaded={searchResultsLoaded}
        cardClicked={cardClicked}
      />
      <div className='ml-search-spinner-holder'>
        {
          showLoadMoreSpinner && (
            <Spinner />)
        }
      </div>
      {
        totalResults ?
          (<div className='ml-search-button-holder'>
            <Button
              label='Load more'
              disabled={page === totalPages}
              clickHandler={() => loadMoreResults(page + 1)}
            />
          </div>) :
          null
      }
    </div>
  );
};

export default Search;
