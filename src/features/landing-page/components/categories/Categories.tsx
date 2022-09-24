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
  VideogameAsset
} from '@mui/icons-material';
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { AppIcon } from '../../../../solutions/components/app-icon';
import { landingPageActions, landingPageSelectors } from '../../store';

const Categories = () => {
  const dispatch = useAppDispatch();
  const displayCategories = useAppSelector(landingPageSelectors.selectCategories);

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
              <ListItem key={category.id} sx={{ borderBottom: '1px solid #f2f5f8' }}>
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
