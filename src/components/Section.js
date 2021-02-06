import React from 'react';

// components
import Card from '@/components/Card';

// styles
import '@/components/Section.css';

// third-party libraries
import { isEmpty } from 'lodash';

const TrendingSection = (props) => {
  const { dataToShow } = props;

  return (
    <div className='ml-section'>
      {
        !isEmpty(dataToShow) &&
        dataToShow.map((item) => {
          return (<Card key={item.id} item={item} />);
        })
      }
    </div>
  );
};

export default TrendingSection;