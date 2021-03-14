import React from 'react';

// styles
import '@/components/Button.css';

const Button = (props) => {
  const {
    label,
    disabled,
    clickHandler,
    className
  } = props;

  return (
    <button
      className={`waves-effect waves-light ${className} ml-button`}
      disabled={disabled}
      onClick={clickHandler}
    >
      { label }
    </button>
  );
};

export default Button;
