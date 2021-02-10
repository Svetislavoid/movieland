import React from 'react';

// styles
import '@/components/Button.css';

const Button = (props) => {
  const {
    label,
    disabled,
    clickHandler
  } = props;

  return (
    <button
      className='ml-button'
      disabled={disabled}
      onClick={clickHandler}
    >
      { label }
    </button>
  );
};

export default Button;