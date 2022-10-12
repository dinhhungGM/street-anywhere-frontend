import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import cx from 'classnames';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { Icons } from '../../../../solutions/components/icons';
import { categoriesActions, categoriesSelectors } from '../../../categories/store';
import styles from './styles.module.scss';

const Categories = () => {
  const dispatch = useAppDispatch();
  const categoryList = useAppSelector(categoriesSelectors.selectCategoryList);
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
    dispatch(categoriesActions.getCategoryList());
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
            {categoryList?.map((category) => (
              <ListItem
                key={category.id}
                className={cx(styles.category, checkIsActive(category.id) && styles.active)}
                onClick={() => filterPostByCategory(category.id.toString())}
              >
                <ListItemIcon>{Icons[category.categoryName]}</ListItemIcon>
                <ListItemText>{category.categoryName}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Box>
      </>
    </>
  );
};

export default Categories;
