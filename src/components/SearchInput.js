import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

// styles
import '@/components/SearchInput.css';

// functions
import { setRedirectionVariable } from '@/common/functions';

// libraries
import { isEmpty } from 'lodash';

const SearchInput = (props) => {
  const { defaultSearchValue } = props;

  const [searchTerm, setSearchTerm] = useState(defaultSearchValue || '');
  const [redirectToSearchPage, setRedirectToSearchPage] = useState(false);

  const handleSearch = (searchTerm) => {
    if (isEmpty(searchTerm)) return;

    setRedirectionVariable(setRedirectToSearchPage);
  };

  const handleSearchOnEnter = (event, searchTerm) => {
    if (isEmpty(searchTerm) || event.key !== 'Enter') return;

    setRedirectionVariable(setRedirectToSearchPage);
  };

  return (
    <div className='ml-search-input-holder'>
      <input
        className='ml-search-input-input'
        type='search'
        placeholder='Search for movies, tv shows and people'
        value={searchTerm}
        onInput={(event) => setSearchTerm(event.target.value)}
        onKeyPress={(event) => handleSearchOnEnter(event, searchTerm)}
      />
      <span
        className='ml-search-input-button'
        onClick={() => handleSearch(searchTerm)}
      >
        &#10140;
      </span>
      {
        redirectToSearchPage &&
        <Redirect push to={`/search/${searchTerm}`} />
      }
    </div>
  );
};

export default SearchInput;