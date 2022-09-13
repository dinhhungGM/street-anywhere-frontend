import { Search } from '@mui/icons-material';
import { Box } from '@mui/material';
import Discover from '../discover/Discover';
import styles from './styles.module.scss';

const SearchBox = () => {
  return (
    <>
      <Box className={styles['search-box']}>
        <Box className={styles['search-box__input']}>
          <input type='text' placeholder='Search' autoFocus />
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
