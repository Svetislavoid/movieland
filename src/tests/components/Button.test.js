import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '@/components/Button';

describe('Test Button component', () => {
  test('renders button with the right props', () => {
    const props = {
      label: 'Load more',
      disabled: false,
      clickHandler: jest.fn(),
      className: 'test-button'
    };

    const {
      container,
      unmount,
      getByText,
      getByTestId
    } = render(<Button { ...props } />);

    userEvent.click(getByTestId('ml-button'));
    userEvent.click(getByTestId('ml-button'));

    getByText('Load more');
    expect(getByTestId('ml-button')).toHaveProperty('disabled', false);
    expect(getByTestId('ml-button')).toHaveClass('test-button');
    expect(props.clickHandler).toHaveBeenCalledTimes(2);

    unmount(container);
  });
});
