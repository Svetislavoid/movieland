import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// styles
import '@/components/SearchInput.css';

// libraries
import { isEmpty } from 'lodash';

const SearchInput = (props) => {
  const { defaultSearchValue } = props;

  const [searchTerm, setSearchTerm] = useState(defaultSearchValue || '');

  const history = useHistory();

  const handleSearch = (event, searchTerm) => {
    if (isEmpty(searchTerm)) return;

    if (event.key === 'Enter' || event.type === 'click') {
      history.push(`/search/${searchTerm}`);
    }
  };

  return (
    <div className='ml-search-input-holder'>
      <input
        className='browser-default ml-search-input-input'
        type='search'
        placeholder='Search for movies, tv shows and people'
        value={searchTerm}
        onInput={(event) => setSearchTerm(event.target.value)}
        onKeyPress={(event) => handleSearch(event, searchTerm)}
      />
      <span
        className='ml-search-input-button'
        onClick={(event) => handleSearch(event, searchTerm)}
      >
        <i className="material-icons">arrow_forward</i>
      </span>
    </div>
  );
};

export default SearchInput;