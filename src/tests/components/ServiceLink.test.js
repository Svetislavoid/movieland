import React from 'react';
import { render } from '@testing-library/react';
import ServiceLink from '@/components/ServiceLink';

describe('Test ServiceLink component', () => {

  [
    {
      name: 'tmdb',
      dataTestId: 'ml-footer-tmdb-link',
      href: 'https://www.themoviedb.org/',
      target: '_blank'
    },
    {
      name: 'linkedin',
      dataTestId: 'ml-footer-linkedin-link',
      href: 'https://www.linkedin.com/in/svetislav-grujic-637537178',
      target: '_blank'
    },
    {
      name: 'gitlab',
      dataTestId: 'ml-footer-gitlab-link',
      href: 'https://gitlab.com/Svetislavoid',
      target: '_blank'
    },
    {
      name: 'github',
      dataTestId: 'ml-footer-github-link',
      href: 'https://github.com/Svetislavoid',
      target: '_blank'
    },
    {
      name: 'bitbucket',
      dataTestId: 'ml-footer-bitbucket-link',
      href: 'https://bitbucket.org/Svetislav',
      target: '_blank'
    }
  ].forEach((service) => {
    const { name, dataTestId, href, target } = service;

    test(`renders ${name} link with an icon`, () => {
      const props = {
        dataTestId: dataTestId,
        linkClassName: 'ml-footer-service-logo-link',
        linkHref: href,
        linkTarget: target,
        imageAlt: `${name} logo`
      };

      const {
        container,
        unmount,
        getByAltText,
        getByTestId
      } = render(<ServiceLink { ...props } />);

      expect(getByTestId(dataTestId)).toHaveProperty('href', href);
      expect(getByTestId(dataTestId)).toHaveProperty('target', target);
      getByAltText(`${name} logo`);

      unmount(container);
    });
  });

});
