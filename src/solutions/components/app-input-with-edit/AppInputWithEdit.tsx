import { Edit } from '@mui/icons-material';
import { Box, Stack, TextField, Typography } from '@mui/material';
import { memo } from 'react';
import { AppIcon } from '../app-icon';
import { AppIconButton } from '../app-icon-button';
import styles from './styles.module.scss';

interface IAppInputWithEditProps {
  value?: any;
  title?: string;
  inputType?: string;
  isReadonly?: boolean;
  onEdit?: any;
}
const AppInputWithEdit = ({
  value,
  title = 'Title',
  inputType = 'text',
  isReadonly = false,
  onEdit,
}: IAppInputWithEditProps) => {
  return (
    <>
      <Box
        sx={{
          minWidth: '100%',
        }}>
        <Stack direction='row' alignItems='center' spacing={2}>
          <Typography fontWeight={700} className={styles.title}>
            {title}:{' '}
          </Typography>
          <Stack direction='row' alignItems='center' width='85%' className={styles.input}>
            <TextField
              type={inputType}
              value={value}
              fullWidth
              sx={{
                '& fieldset': { border: 'none' },
                '& .Mui-disabled': {
                  WebkitTextFillColor: '#000 !important',
                },
              }}
              disabled
            />
            {!isReadonly && (
              <AppIconButton
                tooltip='Edit'
                icon={<AppIcon icon={Edit} color='success' />}
                onClick={onEdit}
              />
            )}
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default memo(AppInputWithEdit);
