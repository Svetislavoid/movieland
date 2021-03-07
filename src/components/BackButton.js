import React from 'react';
import { useHistory } from 'react-router-dom';

// styles
import '@/components/BackButton.css';

const BackButton = () => {
  // history
  const history = useHistory();

  return (
    <button
      className='ml-back-button'
      onClick={() => history.goBack()}
    >
      <h5><i className='material-icons'>arrow_back</i> Go back</h5>
    </button>
  );
};

export default BackButton;
