import React from 'react';
import { useHistory } from 'react-router-dom';

// styles
import '@/pages/Error.css';

// components
import Button from '@/components/Button';

// texts
import texts from '@/common/texts.json';

const ErrorPage = () => {
  const {
    errorPage: {
      title,
      subtitle,
      message
    }
  } = texts;

  // history
  const history = useHistory();

  const goHome = () => {
    history.push('/');
  };

  return (
    <div className='ml-error'>
      <div className='ml-error-heading'>
        <p className='ml-error-404'>404</p>
        <h1>{ title }</h1>
        <h4>{ subtitle }</h4>
      </div>
      <p className='ml-error-explanation'>{ message }</p>
      <Button
        label='Return Home'
        clickHandler={goHome}
      />
    </div>
  );
};

export default ErrorPage;
