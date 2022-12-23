import { Search } from '@mui/icons-material';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Discover from '../discover/Discover';
import styles from './styles.module.scss';

interface ISearchBoxProps {
  onClose?: any;
}
const SearchBox = ({ onClose }: ISearchBoxProps) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const handleOnChange = (e) => {
    setName(e.target.value);
  };

  const handleOnKeyDown = (e) => {
    if (!e.altKey && !e.ctrlKey && !e.shiftKey && e.key === 'Enter' && name.trim()) {
      onClose();
      navigate(`/search-user?name=${ name }`, { replace: true });
    }
  };

  return (
    <>
      <Box className={styles['search-box']}>
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
        <Box className={styles['search-box__discover']}>
          <Discover />
        </Box>
      </Box>
    </>
  );
};

export default SearchBox;
