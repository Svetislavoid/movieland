import React, { useEffect } from 'react';

// components
import SearchInput from '@/components/SearchInput';

// styles
import '@/pages/Search.css';

// services
import { searchMoviesTvShowsPeople } from '@/services';

const Search = () => {
  // component variables
  const { pathname } = window.location;
  const searchTerm = decodeURIComponent(pathname.split('/')[2]);

  // Search for a movie, tv show or person
  useEffect(() => {
    searchMoviesTvShowsPeople(searchTerm)
      .then((response) => response);
  }, [searchTerm]);

  return (
    <div>
      <div className='ml-search-search-input'>
        <SearchInput defaultSearchValue={ searchTerm } />
      </div>
    </div>
  );
};

export default Search;
