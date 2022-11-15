import { UploadFile } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';
import { AppIcon } from '../app-icon';

interface IAppButtonUploadProps {
  iconSize?: number;
  iconColor?: string;
  acceptFile?: string;
  isMultiple?: boolean;
  buttonLabel?: string;
  textTransform?: string;
  buttonVariant?: 'text' | 'contained' | 'outlined';
  onUploadingFile?: (e) => any;
}
const AppUploadButton = ({
  iconSize = 22,
  acceptFile = '*',
  isMultiple = false,
  iconColor = '#fff',
  buttonLabel = 'Upload',
  textTransform = 'initial',
  buttonVariant = 'contained',
  onUploadingFile = (e) => {},
}: IAppButtonUploadProps) => {
  return (
    <>
      <Button
        variant={buttonVariant}
        startIcon={<AppIcon icon={UploadFile} color={iconColor} fontSize={iconSize} />}
        sx={{ textTransform }}
        component='label'
      >
        {buttonLabel}
        <input hidden accept={acceptFile} multiple={isMultiple} type='file' onChange={onUploadingFile} />
      </Button>
    </>
  );
};

export default React.memo(AppUploadButton);
