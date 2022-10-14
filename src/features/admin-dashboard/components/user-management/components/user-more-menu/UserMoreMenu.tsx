import { useRef, useState, memo } from 'react';
import { Delete, Edit, MoreVert } from '@mui/icons-material';
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { AppIcon } from '../../../../../../solutions/components/app-icon';
import SweetAlert from 'sweetalert2';
import { useAppDispatch } from '../../../../../../app/hooks';
import { adminActions } from '../../../../store';

interface IUserMoreMenuProps {
  adminUserId: number;
  user: any;
}
const UserMoreMenu = ({ adminUserId, user }: IUserMoreMenuProps) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleDeleteUser = (): void => {
    setIsOpen(false);
    SweetAlert.fire({
      title: 'Confirm',
      icon: 'question',
      text: `Are you sure to delete ${user.fullName} account?`,
      showCancelButton: true,
    }).then((status) => {
      if (status.isConfirmed) {
        dispatch(
          adminActions.deleteUser({
            adminUserId,
            userId: user.id,
          }),
        );
      }
    });
  };

  const handleUpdateUser = (): void => {
    setIsOpen(false);
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <AppIcon icon={MoreVert} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleDeleteUser}>
          <ListItemIcon>
            <AppIcon icon={Delete} />
          </ListItemIcon>
          <ListItemText primary='Delete' primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <AppIcon icon={Edit} />
          </ListItemIcon>
          <ListItemText primary='Edit' primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
};

export default memo(UserMoreMenu);
