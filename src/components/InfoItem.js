import React from 'react';

import '@/components/InfoItem.css';

const InfoItem = (props) => {
  const {
    show,
    className,
    label,
    dataToShow,
    children
  } = props;

  return show ? (
    <div className={className}>
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

export default InfoItem;