import { Search } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Container,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { memo, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { AppIcon } from '../../../solutions/components/app-icon';
import { wrapperActions } from '../../wrapper/store';
import { ISearchingUser } from '../userModels';
import { default as axios } from './../../../solutions/services/axios';
import styles from './styles.module.scss';
import SweetAlert from 'sweetalert2';
import { AppHeading } from '../../../solutions/components/app-heading';

const SearchUser = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [searchingUsers, setSearchingUsers] = useState<ISearchingUser[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setName(e.target.value);
  };

  const handleOnKeyDown = (e) => {
    if (!e.altKey && !e.ctrlKey && !e.shiftKey && e.key === 'Enter' && name.trim()) {
      searchParams.set('name', name);
      setSearchParams(searchParams);
    }
  };

  const goToProfile = (userId: number) => {
    navigate(`/profile/${ userId }`);
  };

  useEffect(() => {
    const findUsers = async () => {
      const name = searchParams.get('name');
      if (name) {
        try {
          dispatch(wrapperActions.showLoading());
          const { data } = await axios.get(`/users/search-user?name=${ name }`);
          setSearchingUsers(data.value);
        } catch (error) {
          dispatch(
            wrapperActions.showNotification({
              typeOfNotification: 'error',
              message: error.response.data.message,
            }),
          );
        } finally {
          dispatch(wrapperActions.hideLoading());
        }
      }
    };
    findUsers();
  }, [searchParams]);

  return (
    <>
      <Container className={styles.wrapper}>
        <Box marginY={2}>
          <Box className={styles['search-box__input']}>
            <input
              type='text'
              placeholder='Search'
              autoFocus
              value={name}
              onChange={handleOnChange}
              onKeyDown={handleOnKeyDown}
            />
            <span className={styles['search-box__input__icon']}>
              <Search />
            </span>
          </Box>
          <Box marginTop={4}>
            {searchingUsers.length ? (
              <>
                <AppHeading heading={`${ searchingUsers.length } results`} />
                <List>
                  {searchingUsers.map((user) => (
                    <ListItemButton key={user.userId} onClick={() => goToProfile(user.userId)}>
                      <Avatar src={user.profilePhotoUrl} alt={user.fullName} />
                      <Stack marginLeft={2}>
                        <Typography fontWeight={700}>{user.fullName}</Typography>
                        <Typography>{user.totalPost} posts</Typography>
                      </Stack>
                    </ListItemButton>
                  ))}
                </List>
              </>
            ) : (
              <>
                <Stack
                  direction='row'
                  alignItems='center'
                  justifyContent='center'
                  padding={4}
                  spacing={4}>
                  <AppIcon icon={Search} fontSize={48} />
                  <Typography>No users found</Typography>
                </Stack>
              </>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default memo(SearchUser);
