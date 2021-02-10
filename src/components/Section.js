import React from 'react';

// components
import Card from '@/components/Card';

// styles
import '@/components/Section.css';

const Section = (props) => {
  const { title, dataToShow } = props;

  return (
    <section className='ml-section'>
      {
        title &&
        <h2 className='ml-section-title'>{ title }</h2>
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