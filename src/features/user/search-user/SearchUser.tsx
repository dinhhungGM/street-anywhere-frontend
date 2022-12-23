import { Search } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Container,
  Divider,
  List,
  ListItemButton,
  Stack,
  Typography,
} from '@mui/material';
import _ from 'lodash';
import { memo, useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { AppHeading } from '../../../solutions/components/app-heading';
import { AppIcon } from '../../../solutions/components/app-icon';
import { Discover } from '../../header/components/discover';
import { wrapperActions } from '../../wrapper/store';
import { ISearchingUser } from '../userModels';
import { default as axios } from './../../../solutions/services/axios';
import styles from './styles.module.scss';

const SearchUser = () => {
  const dispatch = useAppDispatch();
  const [searchingUsers, setSearchingUsers] = useState<ISearchingUser[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [name, setName] = useState('');
  const [savedKeys, setSaveKeys] = useState<string[]>([]);
  const [isShowHistory, setIsShowHistory] = useState(true);
  const navigate = useNavigate();
  const inputRef = useRef();

  const handleOnChange = (e) => {
    setName(e.target.value);
  };

  const handleOnKeyDown = (e) => {
    if (!e.altKey && !e.ctrlKey && !e.shiftKey && e.key === 'Enter' && name.trim()) {
      const keyword = _.find(
        savedKeys,
        (key) => key.trim().toLowerCase() === name.trim().toLowerCase(),
      );
      if (!keyword) {
        setSaveKeys((prev) => [name, ...prev]);
        localStorage.setItem('savedKey', JSON.stringify(savedKeys));
      }
      searchParams.set('name', name);
      setSearchParams(searchParams);
    }
  };

  const goToProfile = (userId: number) => {
    navigate(`/profile/${ userId }`);
  };

  const handleClickOnKey = (key) => {
    setName(key);
    setIsShowHistory(false);
    searchParams.set('name', key);
    setSearchParams(searchParams);
  };

  const handleClearAll = () => {
    setSaveKeys([]);
    localStorage.setItem('savedKey', JSON.stringify([]));
  };

  const handleDeleteKey = (key) => {
    const newKeys = _.filter(savedKeys, (item) => item !== key);
    setSaveKeys(newKeys);
    localStorage.setItem('savedKey', JSON.stringify(newKeys));
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

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('savedKey'));
    if (!savedData) {
      localStorage.setItem('savedKey', JSON.stringify([]));
    } else {
      setSaveKeys(savedData);
    }
  }, []);

  return (
    <>
      <Container className={styles.wrapper}>
        <Box marginY={2}>
          <Box className={styles['search-box__input']}>
            <input
              type='text'
              placeholder='Search user....'
              autoFocus
              value={name}
              onChange={handleOnChange}
              onKeyDown={handleOnKeyDown}
              onFocus={() => setIsShowHistory(true)}
              ref={inputRef}
            />
            <span className={styles['search-box__input__icon']}>
              <Search />
            </span>
          </Box>
          {isShowHistory ? (
            <Box marginY={1}>
              <Discover
                savedKeys={savedKeys}
                onClickOnKey={handleClickOnKey}
                onClearAll={handleClearAll}
                onDeleteKey={handleDeleteKey}
              />
            </Box>
          ) : null}
          <Divider />
          <Box marginTop={4}>
            {searchingUsers.length ? (
              <>
                <AppHeading heading={`All results`} />
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
