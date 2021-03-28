import React from 'react';

// styles
import '@/components/ScrollToTopButton.css';

const ScrollToTopButton = () => {

  return (
    <button
      data-testid='ml-scroll-to-top-button'
      className='ml-scroll-to-top-button'
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <i className='material-icons'>arrow_upward</i>
    </button>
  );
};

export default ScrollToTopButton;
