import React from 'react';

// styles
import '@/components/Footer.css';

// assets
import tmdbLogo from '@/assets/tmdb_logo.svg';

const Footer = () => {
  return (
    <footer className='ml-footer'>
      <img className='ml-tmdb-logo' src={tmdbLogo} alt='tmdb logo' />
    </footer>
  );
};

export default Footer;
