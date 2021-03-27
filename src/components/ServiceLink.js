import React from 'react';

// prop types
import PropTypes from 'prop-types';

const ServiceLink = (props) => {
  const {
    dataTestId,
    linkClassName,
    linkHref,
    linkTarget,
    imageClassName,
    imageSrc,
    imageAlt
  } = props;

  return (
    <a
      data-testid={dataTestId}
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

ServiceLink.propTypes = {
  dataTestId: PropTypes.string,
  linkClassName: PropTypes.string,
  linkHref: PropTypes.string,
  linkTarget: PropTypes.string,
  imageClassName: PropTypes.string,
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string,
};

export default ServiceLink;
