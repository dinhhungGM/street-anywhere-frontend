import { Box, TextField } from '@mui/material';
import { memo } from 'react';
import { AppModal } from '../../../solutions/components/app-modal';
import { ProfilePropertiesEnum } from '../profileDashBoardModels';

interface IUpdateProfileModalProps {
  isOpen: boolean;
  field: ProfilePropertiesEnum;
  fieldName: string;
  onCancel?: () => void;
  onUpdate?: (newValue: any) => any;
}
const UpdateProfileModal = ({
  isOpen,
  field,
  fieldName,
  onCancel = () => {
    return;
  },
  onUpdate = (value) => {
    return;
  },
}: IUpdateProfileModalProps) => {
  return (
    <>
      <AppModal isOpen={isOpen} okText='Update' title={`Update ${ fieldName }`} onCancel={onCancel} onClose={onCancel}>
        {field === ProfilePropertiesEnum.Password ? (
          <>
            <Box marginBottom={1}>
              <TextField fullWidth label='Password' placeholder='Enter old password' />
            </Box>
            <Box marginBottom={1}>
              <TextField fullWidth label='New password' placeholder='Enter new password' />
            </Box>
            <Box>
              <TextField fullWidth label='Confirm password' placeholder='Confirm new password' />
            </Box>
          </>
        ) : (
          <>
            <TextField fullWidth label={fieldName} placeholder={`Enter new ${ fieldName }`} />
          </>
        )}
      </AppModal>
    </>
  );
};

export default memo(UpdateProfileModal);
