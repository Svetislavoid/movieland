import React from 'react';

// components
import Button from '@/components/Button';

// styles
import '@/components/ConfirmModal.css';

const ConfirmModal = (props) => {
  const {
    title,
    content,
    cancelClicked,
    okClicked
  } = props;

  return (
    <div className='ml-confirm-modal-wrapper'>
      <div className='ml-confirm-modal'>
        {
          title &&
            (<h6 className='ml-confirm-modal-title'>
              { title }
            </h6>)
        }
        {
          content &&
            (<div className='ml-confirm-modal-content'>
              { content }
            </div>)
        }
        <div className='ml-confirm-modal-action-buttons'>
          <Button
            className='ml-confirm-modal-button'
            label='Cancel'
            clickHandler={cancelClicked}
          />
          <Button
            className='ml-confirm-modal-button'
            label='Ok'
            clickHandler={okClicked}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
