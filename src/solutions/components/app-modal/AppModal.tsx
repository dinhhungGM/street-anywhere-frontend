import { Modal, Box, Stack, Typography, IconButton, Button } from '@mui/material';
import React from 'react';
import styles from './styles.module.scss';
import cx from 'classnames';
import { AppIcon } from '../app-icon';
import { Close } from '@mui/icons-material';

interface IAppModalProps {
  isOpen: boolean;
  children?: any;
  classes?: string;
  width?: number | string;
  title?: string;
  onClose?: () => void;
  onOk?: () => void;
  okText?: string;
  onCancel?: () => void;
  cancelText?: string;
}
const AppModal = ({
  isOpen,
  children,
  classes,
  width,
  title,
  onClose,
  onOk,
  okText,
  onCancel,
  cancelText,
  ...restProps
}: IAppModalProps) => {
  return (
    <>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        {...restProps}
      >
        <Box
          className={cx(styles.modal, classes)}
          sx={{
            width: width || '800px',
          }}
        >
          <Box className={styles.modal__header} paddingBottom={1}>
            <Stack direction='row' alignItems='center' justifyContent='space-between' >
              <Typography variant='h5' fontWeight={700}>
                {title || 'Modal title'}
              </Typography>
              <IconButton onClick={onClose}>
                <AppIcon icon={Close} color='#e60023' />
              </IconButton>
            </Stack>
          </Box>
          <Box className={styles.modal__body}>{children}</Box>
          <Box className={styles.modal__footer}>
            <Stack direction='row' alignItems='center' justifyContent='flex-end' spacing={2}>
              <Button variant='contained' color='error' onClick={onCancel}>
                {cancelText || 'Cancel'}
              </Button>
              <Button variant='contained' color='success' onClick={onOk}>
                {okText || 'Ok'}
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AppModal;
