import React from 'react';

// styles
import '@/components/InfoItem.css';

// prop types
import PropTypes from 'prop-types';

const InfoItem = (props) => {
  const {
    show,
    className,
    label,
    dataToShow,
    children
  } = props;

  return show ? (
    <div
      data-testid='ml-info-item'
      className={className}>
      {
        label &&
        (<span className='ml-label'>{ label }</span>)
      }
      {
        dataToShow &&
        (<span>{ dataToShow }</span>)
      }
      { children }
    </div>
  ) : null;
};

InfoItem.propTypes = {
  show: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  className: PropTypes.string,
  label: PropTypes.string,
  dataToShow: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  children: PropTypes.array,
};

export default InfoItem;
