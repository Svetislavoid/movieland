import React from 'react';

// styles
import '@/components/Spinner.css';

const Spinner = () => {

  return (
    <div className='ml-spinner'>
      <div className='preloader-wrapper active ml-spinner'>
        <div className='spinner-layer spinner-red-only'>
          <div className='circle-clipper left'>
            <div className='circle'></div>
          </div><div className='gap-patch'>
            <div className='circle'></div>
          </div><div className='circle-clipper right'>
            <div className='circle'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;