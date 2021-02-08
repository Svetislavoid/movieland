import React from 'react';

// styles
import '@/components/Search.css';

const Search = () => {
  return (
    <div className='ml-search'>
      <input
        className='ml-search-input'
        type='text'
        placeholder='Search for movies, tv shows and people'
      />
    </div>
  );
};

export default Search;