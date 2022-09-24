import {
  CameraIndoor,
  ColorLens,
  Headphones,
  Help,
  Map,
  Memory,
  Museum,
  Park,
  Public,
  SportsSoccer,
  VideogameAsset,
} from '@mui/icons-material';
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import cx from 'classnames';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { AppIcon } from '../../../../solutions/components/app-icon';
import { landingPageActions, landingPageSelectors } from '../../store';
import styles from './styles.module.scss';

const Categories = () => {
  const dispatch = useAppDispatch();
  const displayCategories = useAppSelector(landingPageSelectors.selectCategories);
  const [queryParams, setQueryParams] = useSearchParams();
  const [toggle, setToggle] = useState(false);

  const checkIsActive = (categoryId: number): boolean => {
    const currentCategoryId = queryParams.get('category');
    return categoryId && categoryId === +currentCategoryId;
  };

  const filterPostByCategory = (categoryId: string) => {
    if (!toggle) {
      queryParams.set('category', categoryId);
    } else {
      queryParams.delete('category');
    }
    setQueryParams(queryParams);
    setToggle(!toggle);
  };

  useEffect(() => {
    dispatch(landingPageActions.getAllCategoriesAsync(null));
  }, []);

  return (
    <>
      <>
        <Box
          sx={{
            backgroundColor: '#fff',
            padding: '12px',
            borderRadius: '16px',
          }}
        >
          <Typography variant='h4'>Categories</Typography>
          <List>
            {displayCategories?.map((category) => (
              <ListItem
                key={category.id}
                className={cx(styles.category, checkIsActive(category.id) && styles.active)}
                onClick={() => filterPostByCategory(category.id.toString())}
              >
                <ListItemIcon>{configs[category.categoryName.toLowerCase()]}</ListItemIcon>
                <ListItemText>{category.categoryName}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Box>
      </>
    </>
  );
};

export const configs = {
  art: <AppIcon component={ColorLens} color='#747df6' />,
  entertainment: <AppIcon component={CameraIndoor} color='#9391fd' />,
  games: <AppIcon component={VideogameAsset} color='#44ff00' />,
  history: <AppIcon component={Museum} color='#eab171' />,
  'how to': <AppIcon component={Help} color='#fbe44b' />,
  internet: <AppIcon component={Public} color='#9391fd' />,
  music: <AppIcon component={Headphones} color='#44ff00' />,
  nature: <AppIcon component={Park} color='#44ff00' />,
  sports: <AppIcon component={SportsSoccer} color='#f92bfd' />,
  technology: <AppIcon component={Memory} color='#1d1d1f' />,
  traveling: <AppIcon component={Map} color='#e60023' />,
};

export default Categories;
