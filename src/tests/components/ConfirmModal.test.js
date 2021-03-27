import React from 'react';
import { render } from '@testing-library/react';
import ConfirmModal from '@/components/ConfirmModal';

describe('Test ConfirmModal component', () => {
  test('renders confirm modal with the right props', () => {
    const props = {
      title: 'Confirm',
      content: 'Confirm modal content'
    };

    const {
      container,
      unmount,
      getByText
    } = render(<ConfirmModal { ...props } />);

    getByText('Confirm');
    getByText('Confirm modal content');

    unmount(container);
  });
});
