import React from 'react';

// styles
import '@/components/Footer.css';

// assets
import tmdbLogo from '@/assets/tmdb_logo.svg';

const Footer = () => {
  return (
    <footer className='ml-footer'>
      <a
        className='ml-tmdb-logo'
        href='https://www.themoviedb.org/'
        target='blank'
      >
        <img src={tmdbLogo} alt='tmdb logo' />
      </a>
      <span className='ml-app-creator'>
        <small><em>Created by</em></small> Svetislav Grujić
      </span>
    </footer>
  );
};

export default Footer;
