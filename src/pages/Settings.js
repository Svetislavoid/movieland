import React, { useState } from 'react';

// settings
import { TRENDING_SETTINGS } from '@/common/settings';

// libraries
import { without } from 'lodash';

const Settings = () => {
  const [mediaTypes, setMediaTypes] = useState(
    localStorage.getItem('trendingSettings') ?
      JSON.parse(localStorage.getItem('trendingSettings')).mediaTypes :
      TRENDING_SETTINGS.mediaTypes
  );
  const [timeWindow, setTimeWindow] = useState(
    localStorage.getItem('trendingSettings') ?
      JSON.parse(localStorage.getItem('trendingSettings')).timeWindow :
      TRENDING_SETTINGS.timeWindow
  );
  const [numberOfItemsToShow, setNumberOfItemsToShow] = useState(
    localStorage.getItem('trendingSettings') ?
      JSON.parse(localStorage.getItem('trendingSettings')).numberOfItemsToShow :
      TRENDING_SETTINGS.numberOfItemsToShow
  );

  const handleMediaTypeSettings = (e) => {
    const setting = e.target.name;

    // remove setting if it is already included in mediaTypes,
    // add it otherwise
    const newMediaTypes = mediaTypes.includes(setting) ?
      without(mediaTypes, setting) :
      [
        ...mediaTypes,
        setting
      ];

    setMediaTypes(newMediaTypes);

    localStorage.setItem('trendingSettings', JSON.stringify({
      ...TRENDING_SETTINGS,
      mediaTypes: newMediaTypes
    }))
  };

  return (
    <div>
      <h1>Settings</h1>
      <section className='ml-settings-show-trending'>
        <p>
          <input
            name='movie'
            type='checkbox'
            checked={mediaTypes.includes('movie')}
            onChange={(e) => handleMediaTypeSettings(e)} />
          <span>Movies</span>
        </p>
        <p>
          <input
            name='tv'
            type='checkbox'
            checked={mediaTypes.includes('tv')}
            onChange={(e) => handleMediaTypeSettings(e)} />
          <span>TV shows</span>
        </p>
        <p>
          <input
            name='person'
            type='checkbox'
            checked={mediaTypes.includes('person')}
            onChange={(e) => handleMediaTypeSettings(e)} />
          <span>Persons</span>
        </p>
      </section>
    </div>
  );
};

export default Settings;