import React from 'react';
import { useHistory } from 'react-router-dom';

// styles
import '@/pages/Error.css';

// components
import Button from '@/components/Button';

const ErrorPage = () => {
  // history
  const history = useHistory();

  const goHome = () => {
    history.push('/');
  };

  return (
    <div className='ml-error'>
      <div className='ml-error-heading'>
        <p className='ml-error-404'>404</p>
        <h1>Oops!</h1>
        <h4>Something went wrong!</h4>
      </div>
      <p className='ml-error-explanation'>The page you are looking for doesn't exist or another error occurred</p>
      <Button
        label='Return Home'
        clickHandler={goHome}
      />
    </div>
  );
};

export default ErrorPage;
