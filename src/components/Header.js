import React from 'react';
import { Link } from 'react-router-dom';

// styles
import '@/components/Header.css';

// assets
import movieLandLogo from '@/assets/logo_128x128.png';

const Header = () => {
  return (
    <header className='ml-header'>
      <Link
        className='ml-header-app-logo'
        to='/'
      >
        <img
          className='ml-header-logo-small-screen'
          src={movieLandLogo}
          alt='movieland logo'
        />
        <h1 className='ml-header-app-name'>Movie</h1>
        <img
          className='ml-header-logo'
          src={movieLandLogo}
          alt='movieland logo'
        />
        <h1 className='ml-header-app-name'>land</h1>
      </Link>
    </header>
  );
};

export default Header;
