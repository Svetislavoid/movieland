import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

// styles
import '@/components/SearchInput.css';

// libraries
import { isEmpty } from 'lodash';

const SearchInput = (props) => {
  const { defaultSearchValue } = props;

  const [searchTerm, setSearchTerm] = useState(defaultSearchValue);
  const [redirectToSearchPage, setRedirectToSearchPage] = useState(false);

  return (
    <div className='ml-search-input-holder'>
      <input
        className='ml-search-input-input'
        type='search'
        placeholder='Search for movies, tv shows and people'
        value={searchTerm}
        onInput={(e) => setSearchTerm(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && !isEmpty(searchTerm) && setRedirectToSearchPage(true)}
      />
      <span
        className='ml-search-input-button'
        onClick={() => !isEmpty(searchTerm) && setRedirectToSearchPage(true)}
      >
        &#10140;
      </span>
      {
        redirectToSearchPage &&
        <Redirect to={`/search/${searchTerm}`} />
      }
    </div>
  );
};

export default SearchInput;