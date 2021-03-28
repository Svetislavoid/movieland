import React from 'react';
import { render } from '@testing-library/react';
import InfoItem from '@/components/InfoItem';

describe('Test InfoItem component', () => {
  test('render info item when show is set to true', () => {
    const props = {
      show: true,
      className: 'info-item-class',
      label: 'Name',
      dataToShow: 'Monty Python and the Holy Grail'
    };

    const {
      container,
      unmount,
      getByText,
      getByTestId,
    } = render(<InfoItem { ...props } />);

    getByText('Name');
    getByText('Monty Python and the Holy Grail');
    expect(getByTestId('ml-info-item')).toHaveClass('info-item-class');

    unmount(container);
  });

  test('do not render info item when show is set to false', () => {
    const props = {
      show: false,
      className: 'info-item-class',
      label: 'Name',
      dataToShow: 'Monty Python and the Holy Grail'
    };

    const {
      container,
      unmount,
      queryByText,
      queryByTestId
    } = render(<InfoItem { ...props } />);

    expect(queryByText('Name')).toBeNull();
    expect(queryByText('Monty Python and the Holy Grail')).toBeNull();
    expect(queryByTestId('ml-info-item')).toBeNull();

    unmount(container);
  });
});
