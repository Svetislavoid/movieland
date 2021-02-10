import React, { useState, useEffect } from 'react';

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
      });
  }

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
      });
  }, [searchTerm]);

  return (
    <div>
      <div className='ml-search-search-input'>
        <SearchInput defaultSearchValue={ searchTerm } />
      </div>
      <p>Found { totalResults } results for '{ searchTerm }'</p>
      <p>Page { page } of { totalPages }</p>
      <Section
        dataToShow={searchResults}
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

export default Search;
