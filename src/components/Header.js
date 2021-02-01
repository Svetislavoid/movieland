import React from 'react';

// styles
import '@/components/Header.css';

// assets
import movieLandLogo from '@/assets/logo_128x128.png';

const Header = () => {
  return (
    <header className='ml-header'>
      <span className='ml-app-name'>MOVIE</span>
      <img
        className='ml-logo'
        src={movieLandLogo}
        alt='movieland logo'
      />
      <span className='ml-app-name'>LAND</span>
      <div className='ml-login'>login</div>
    </header>
  );
};

export default Header;
