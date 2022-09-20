import { Dialog } from '@mui/material';
import React from 'react';

type AppConfirmDialogProps = {
  isShowDialog: boolean;
  onCloseDialog: (value: any) => void;
};

const AppConfirmDialog = ({ isShowDialog, onCloseDialog }: AppConfirmDialogProps) => {
  return (
    <>
      <Dialog open={isShowDialog} onClose={onCloseDialog}></Dialog>
    </>
  );
};

export default AppConfirmDialog;
