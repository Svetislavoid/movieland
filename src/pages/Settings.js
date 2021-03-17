import React, { useState } from 'react';

// components
import BackButton from '@/components/BackButton';

// functions
import { getSetting, setSetting } from '@/common/functions';

// styles
import '@/pages/Settings.css';

// libraries
import { without } from 'lodash';

const Settings = () => {
  const [mediaTypes, setMediaTypes] = useState(getSetting('trendingMediaTypes'));
  const [timeWindow, setTimeWindow] = useState(getSetting('trendingTimeWindow'));
  const [numberOfItemsToShow, setNumberOfItemsToShow] = useState(getSetting('numberOfTrendingItemsToShow'));
  const [showSimilarContent, setShowSimilarContent] = useState(getSetting('showSimilarContent'));
  const [includeAdultContent, setIncludeAdultContent] = useState(getSetting('includeAdultContent'));

  const handleMediaTypeSetting = (e) => {
    const setting = e.target.value;

    // remove setting if it is already included in mediaTypes,
    // add it otherwise
    const newMediaTypes = mediaTypes.includes(setting) ?
      without(mediaTypes, setting) :
      [
        ...mediaTypes,
        setting
      ];

    setMediaTypes(newMediaTypes);
    setSetting('trendingMediaTypes', newMediaTypes);
  };

  const handleTimeWindowSetting = (e) => {
    const selectedTimeWindow = e.target.value;

    setTimeWindow(selectedTimeWindow);
    setSetting('trendingTimeWindow', selectedTimeWindow);
  };

  const handleNumberOfItemsSetting = (e) => {
    const numberOfItems = e.target.value;

    setSetting('numberOfTrendingItemsToShow', numberOfItems);
  };

  const handleSimilarContentSetting = (e) => {
    const shouldShowSimilarContent = e.target.checked;

    setShowSimilarContent(shouldShowSimilarContent);
    setSetting('showSimilarContent', shouldShowSimilarContent);
  };

  const handleAdultContentSetting = (e) => {
    const shouldIncludeAdultContent = e.target.checked;

    setIncludeAdultContent(shouldIncludeAdultContent);
    setSetting('includeAdultContent', shouldIncludeAdultContent);
  };

  const CheckBox = (props) => {
    const {
      value,
      defaultChecked,
      label
    } = props;

    return (
      <p>
        <label>
          <input
            value={value}
            type='checkbox'
            defaultChecked={defaultChecked}
            onChange={(e) => handleMediaTypeSetting(e)} />
          <span>{label}</span>
        </label>
      </p>
    );
  };

  const RadioButton = (props) => {
    const {
      value,
      defaultChecked,
      label
    } = props;

    return (
      <p>
        <label>
          <input
            name='timeWindow'
            type='radio'
            value={value}
            defaultChecked={defaultChecked}
            onChange={(e) => handleTimeWindowSetting(e)}
          />
          <span>{label}</span>
        </label>
      </p>
    );
  };

  const RangeInput = (props) => {
    const {
      min,
      max,
      numberOfItemsToShow
    } = props;

    const [itemsToShow, setItemsToShow] = useState(numberOfItemsToShow);

    return (
      <p className='range-field ml-settings-trending-items-no'>
        <input
          className='ml-settings-trending-items-no-input'
          type='range'
          min={min}
          max={max}
          defaultValue={itemsToShow}
          onChange={(e) => {
            handleNumberOfItemsSetting(e);
            setItemsToShow(e.target.value);
          }}
          onMouseUp={(e) => setNumberOfItemsToShow(e.target.value)}
          onTouchEnd={(e) => setNumberOfItemsToShow(e.target.value)}
        />
        <span className='ml-settings-trending-items-no-counter'>
          { itemsToShow }
        </span>
      </p>
    );
  };

  const Switch = (props) => {
    const {
      falseLabel,
      trueLabel,
      defaultValue,
      defaultChecked,
      handleSwitchChange
    } = props;

    return (
      <p>
        <label>
          { falseLabel }
          <input
            type='checkbox'
            defaultValue={defaultValue}
            defaultChecked={defaultChecked}
            onChange={(e) => handleSwitchChange(e)}
          />
          <span className='lever'></span>
          { trueLabel }
        </label>
      </p>
    );
  };

  return (
    <div className='ml-settings'>
      <BackButton />
      <h1 className='ml-settings-title'>Settings</h1>
      <div className='ml-settings-holder'>
        <div className='ml-settings-section'>
          <p className='ml-settings-label'>
            Trending sections to show on Homepage:
          </p>
          <CheckBox
            value='movie'
            defaultChecked={mediaTypes.includes('movie')}
            label='Movies'
          />
          <CheckBox
            value='tv'
            defaultChecked={mediaTypes.includes('tv')}
            label='Tv shows'
          />
          <CheckBox
            value='person'
            defaultChecked={mediaTypes.includes('person')}
            label='Persons'
          />
        </div>
        <div className='ml-settings-section'>
          <p className='ml-settings-label'>
            Show what's trending in the past:
          </p>
          <RadioButton
            value='day'
            defaultChecked={timeWindow === 'day'}
            label='Day'
          />
          <RadioButton
            value='week'
            defaultChecked={timeWindow === 'week'}
            label='Week'
          />
        </div>
        <div className='ml-settings-section'>
          <p className='ml-settings-label'>
            Number of items to show in each trending section:
          </p>
          <RangeInput
            min='3'
            max='20'
            numberOfItemsToShow={numberOfItemsToShow}
          />
        </div>
        <div className='ml-settings-section switch'>
          <p className='ml-settings-label'>
            Show similar movies and tv shows:
          </p>
          <Switch
            falseLabel='No'
            trueLabel='Yes'
            defaultValue={showSimilarContent}
            defaultChecked={showSimilarContent}
            handleSwitchChange={handleSimilarContentSetting}
          />
        </div>
        <div className='ml-settings-section switch'>
          <p className='ml-settings-label'>
            Show adult content:
          </p>
          <Switch
            falseLabel='No'
            trueLabel='Yes'
            defaultValue={includeAdultContent}
            defaultChecked={includeAdultContent}
            handleSwitchChange={handleAdultContentSetting}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
