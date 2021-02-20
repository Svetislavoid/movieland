import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// components
import SearchInput from '@/components/SearchInput';
import Section from '@/components/Section';
import Button from '@/components/Button';

// styles
import '@/pages/Search.css';

// services
import { searchMoviesTvShowsPeople } from '@/services';

// functions
import { responseItemHasNeededData } from '@/common/functions';

const Search = () => {
  // state variables
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  // component variables
  const { pathname } = window.location;
  const searchTerm = decodeURIComponent(pathname.split('/')[2]);

  // history
  const history = useHistory();

  const loadMoreResults = (pageToLoad) => {
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

        return response;
      })
      .catch((error) => {
        history.push('/error');
      });
  };

  // Search for a movie, tv show or person
  useEffect(() => {
    searchMoviesTvShowsPeople(searchTerm)
      .then((response) => {
        const {
          results,
          page,
          total_pages,
          total_results
        } = response.data;

        // Filter result items that do not have all the needed data
        const filteredResults = results.filter((item) => responseItemHasNeededData(item));

        setSearchResults(filteredResults);
        setPage(page);
        setTotalPages(total_pages);
        setTotalResults(total_results);

        return response;
      })
      .catch((error) => {
        history.push('/error');
      });
  }, [searchTerm, history]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div>
      <div className='ml-search-search-input'>
        <SearchInput defaultSearchValue={ searchTerm } />
      </div>
      <h6 className='ml-search-results-info'>
        Found { totalResults } {totalResults === 1 ? 'result' : 'results'} for '{ searchTerm }'
      </h6>
      <Section
        dataToShow={searchResults}
      />
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
