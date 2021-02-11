import React from 'react';
import { Link } from 'react-router-dom';

// components
import Card from '@/components/Card';

// styles
import '@/components/Section.css';

const Section = (props) => {
  const {
    title,
    showMoreUrl,
    dataToShow
  } = props;

  return (
    <section className='ml-section'>
      {
        title &&
        <h2 className='ml-section-title'>
          { title }
        </h2>
      }
      {
        showMoreUrl &&
        <Link
          className='ml-section-show-more'
          to={showMoreUrl}>show more</Link>
      }
      <div className='ml-section-content'>
        {
          dataToShow.map((item) => {
            return (<Card key={item.id} item={item} />);
          })
        }
      </div>
    </section>
  );
};

export default Section;