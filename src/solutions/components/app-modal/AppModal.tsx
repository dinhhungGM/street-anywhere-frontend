import { Modal } from '@mui/material';
import React from 'react';

interface IAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: any;
  classes?: string;
}
const AppModal = ({ isOpen, onClose, children, classes, ...restProps }: IAppModalProps) => {
  return (
    <>
      <Modal
        open={isOpen}
        onClose={onClose}
        className={classes}
        {...restProps}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        {children}
      </Modal>
    </>
  );
};

export default AppModal;
