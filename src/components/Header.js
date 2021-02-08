import React from 'react';

// styles
import '@/components/Header.css';

// assets
import movieLandLogo from '@/assets/logo_128x128.png';

const Header = () => {
  return (
    <header className='ml-header'>
      <h1 className='ml-app-name'>Movie</h1>
      <img
        className='ml-logo'
        src={movieLandLogo}
        alt='movieland logo'
      />
      <h1 className='ml-app-name'>land</h1>
    </header>
  );
};

export default Header;
