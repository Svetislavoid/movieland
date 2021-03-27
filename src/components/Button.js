import React from 'react';

// styles
import '@/components/Button.css';

// prop types
import PropTypes from 'prop-types';

const Button = (props) => {
  const {
    label,
    disabled,
    clickHandler,
    className
  } = props;

  return (
    <button
      data-testid='ml-button'
      className={`waves-effect waves-light ${className} ml-button`}
      disabled={disabled}
      onClick={clickHandler}
    >
      { label }
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  clickHandler: PropTypes.func,
  className: PropTypes.string,
};

export default Button;
