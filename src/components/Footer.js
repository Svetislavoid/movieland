import React from 'react';

// components
import ServiceLink from '@/components/ServiceLink';

// styles
import '@/components/Footer.css';

// assets
import tmdbLogo from '@/assets/tmdb_logo.svg';
import linkedinLogo from '@/assets/linkedin_logo.svg';
import gitlabLogo from '@/assets/gitlab_logo.svg';
import githubLogo from '@/assets/github_logo.png';
import bitbucketLogo from '@/assets/bitbucket_logo.svg';

const Footer = () => {
  return (
    <footer className='ml-footer'>
      <ServiceLink
        linkClassName='ml-footer-tmdb-logo'
        linkHref='https://www.themoviedb.org/'
        linkTarget='_blank'
        imageClassName=''
        imageSrc={tmdbLogo}
        imageAlt='tmdb logo'
      />
      <div className='ml-footer-app-author'>
        <div>
          <small><em>Created by</em></small> Svetislav Grujić
        </div>
        <div className='ml-footer-services'>
          <ServiceLink
            linkClassName='ml-footer-service-logo-link'
            linkHref='https://www.linkedin.com/in/svetislav-grujic-637537178'
            linkTarget='_blank'
            imageClassName='ml-footer-service-logo'
            imageSrc={linkedinLogo}
            imageAlt='linkedin logo'
          />
          <ServiceLink
            linkClassName='ml-footer-service-logo-link'
            linkHref='https://gitlab.com/Svetislavoid'
            linkTarget='_blank'
            imageClassName='ml-footer-service-logo'
            imageSrc={gitlabLogo}
            imageAlt='gitlab logo'
          />
          <ServiceLink
            linkClassName='ml-footer-service-logo-link'
            linkHref='https://github.com/Svetislavoid'
            linkTarget='_blank'
            imageClassName='ml-footer-service-logo'
            imageSrc={githubLogo}
            imageAlt='github logo'
          />
          <ServiceLink
            linkClassName='ml-footer-service-logo-link'
            linkHref='https://bitbucket.org/Svetislav'
            linkTarget='_blank'
            imageClassName='ml-footer-service-logo'
            imageSrc={bitbucketLogo}
            imageAlt='bitbucket logo'
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
