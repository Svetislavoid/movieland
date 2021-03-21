import React from 'react';

const ServiceLink = (props) => {
  const {
    linkClassName,
    linkHref,
    linkTarget,
    imageClassName,
    imageSrc,
    imageAlt
  } = props;

  return (
    <a
      data-testid={linkClassName}
      className={linkClassName}
      href={linkHref}
      target={linkTarget}
    >
      <img
        className={imageClassName}
        src={imageSrc}
        alt={imageAlt}
      />
    </a>
  );
};

export default ServiceLink;
