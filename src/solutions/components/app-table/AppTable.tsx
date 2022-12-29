import { Close, Delete, Edit, Image, Search, YouTube } from '@mui/icons-material';
import {
  Avatar,
  Box,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import cx from 'classnames';
import _ from 'lodash';
import React, { ChangeEvent, useMemo, useState } from 'react';
import { AppIcon } from '../app-icon';
import { AppMoreMenu } from '../app-more-menu';
import styles from './styles.module.scss';

interface IAppTableProps {
  headerConfigs: {
    isCenter?: boolean;
    header?: string;
    customClass?: string;
  }[];
  rowConfigs: {
    isCenter?: boolean;
    field: string;
    customClass?: string;
    isAvatar?: boolean;
    isIcon?: true;
  }[];
  rowKey?: string;
  customTableHeaderClasses?: string;
  isDisplayMoreMenu?: boolean;
  data?: any[];
  pageSize?: number;
  searchPlaceholder?: string;
  dropdownPlaceholder?: string;
  dropDownOptions?: {
    label: string;
    value: any;
  }[];
  searchByField?: string;
  filterByField?: string;
  appTableCustomClass?: string;
  appTableFilterBarCustomClass?: string;
  appTableContentClass?: string;
  isFilterByOption?: boolean;
  onRowClick?: any;
  mappingClickField?: string;
  isDeleteRow?: boolean;
  isEditRow?: boolean;
  onDeleteRow?: any;
  onEditRow?: any;
  isDisplaySearch?: boolean;
}

const AppTable = ({
  rowKey,
  data = [],
  rowConfigs,
  onEditRow,
  onRowClick,
  onDeleteRow,
  pageSize = 9,
  headerConfigs,
  isEditRow = true,
  mappingClickField,
  isDeleteRow = true,
  searchByField = null,
  filterByField = null,
  dropDownOptions = [],
  isDisplaySearch = true,
  isFilterByOption = true,
  isDisplayMoreMenu = false,
  appTableCustomClass = null,
  appTableContentClass = null,
  searchPlaceholder = 'Search',
  dropdownPlaceholder = 'Options',
  customTableHeaderClasses = null,
  appTableFilterBarCustomClass = null,
}: IAppTableProps) => {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [dropdown, setDropdown] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleSearchChange = (e: ChangeEvent): void => {
    const target = e.target as HTMLInputElement;
    setSearch(target.value);
  };
  const handleDropDownChange = (event: SelectChangeEvent) => {
    setDropdown(event.target.value as string);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = (data) => {
    onRowClick(data);
  };

  const handleClickDeleteRow = (itemId: number) => {
    onDeleteRow(itemId);
  };

  const displayData = useMemo(() => {
    return _.filter(data, (item) => {
      if (!search && !dropdown) {
        return true;
      }
      let isValidSearch = !search
        ? true
        : _.lowerCase(item[searchByField]).includes(search.trim().toLowerCase());
      let isValidField = !dropdown ? true : _.isEqual(item[filterByField], dropdown);
      return isValidSearch && isValidField;
    });
  }, [search, dropdown, data]);

  return (
    <>
      <Box
        component={Paper}
        elevation={3}
        className={cx(styles['app-table'], styles[appTableCustomClass])}>
        <Box className={cx(styles['app-table__filter-bar'], styles[appTableFilterBarCustomClass])}>
          <Grid container spacing={2}>
            {isDisplaySearch ? (
              <Grid item sm={12} md={6}>
                <OutlinedInput
                  fullWidth
                  placeholder={searchPlaceholder}
                  startAdornment={
                    <InputAdornment position='start'>
                      <AppIcon icon={Search} />
                    </InputAdornment>
                  }
                  endAdornment={
                    <>
                      {search && (
                        <InputAdornment position='start'>
                          <IconButton color='error' onClick={() => setSearch('')}>
                            <AppIcon icon={Close} />
                          </IconButton>
                        </InputAdornment>
                      )}
                    </>
                  }
                  value={search}
                  onChange={handleSearchChange}
                />
              </Grid>
            ) : null}
            {isFilterByOption && (
              <Grid item sm={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel id='dropdown'>{dropdownPlaceholder}</InputLabel>
                  <Select
                    labelId='dropdown'
                    id='demo-simple-select'
                    label={dropdownPlaceholder}
                    value={dropdown}
                    onChange={handleDropDownChange}
                    endAdornment={
                      <>
                        {dropdown && (
                          <InputAdornment position='start' sx={{ marginRight: 2 }}>
                            <IconButton color='error' onClick={() => setDropdown('')}>
                              <AppIcon icon={Close} />
                            </IconButton>
                          </InputAdornment>
                        )}
                      </>
                    }>
                    {dropDownOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
          </Grid>
        </Box>
        <Box className={cx(styles['app-table__content'], styles[appTableContentClass])}>
          <TableContainer>
            <Table aria-label='custom pagination table'>
              <TableHead
                className={cx(styles['app-table__content__thead'], customTableHeaderClasses)}>
                <TableRow>
                  {headerConfigs.map((col) => (
                    <TableCell
                      key={col.header}
                      component='th'
                      align={col.isCenter ? 'center' : 'left'}
                      className={cx(styles[col.customClass])}>
                      <TableSortLabel>
                        <Typography fontWeight={700}>{col.header}</Typography>
                      </TableSortLabel>
                    </TableCell>
                  ))}
                  {isDisplayMoreMenu && <TableCell></TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? displayData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : displayData
                ).map((item, idx) => (
                  <TableRow key={item[rowKey] || idx} hover className={styles['cursor-pointer']}>
                    {rowConfigs.map((config, i) => (
                      <TableCell
                        key={config.field || i}
                        component='td'
                        align={config.isCenter ? 'center' : 'left'}
                        className={cx(styles[config.customClass])}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRowClick(item[mappingClickField]);
                        }}>
                        {config.isAvatar ? (
                          <Avatar src={item[config.field]} alt='Avatar' />
                        ) : config.isIcon ? (
                          <AppIcon
                            icon={item[config.field] === 'video' ? YouTube : Image}
                            color={item[config.field] === 'video' ? '#e60023' : '#747df6'}
                          />
                        ) : (
                          <Typography fontWeight={600} className={styles.text}>
                            {item[config.field]}
                          </Typography>
                        )}
                      </TableCell>
                    ))}
                    {isDisplayMoreMenu && (
                      <TableCell>
                        <AppMoreMenu isOpenInside>
                          {isEditRow && (
                            <MenuItem>
                              <AppIcon icon={Edit} />
                              <Typography ml={2}>Edit</Typography>
                            </MenuItem>
                          )}
                          {isDeleteRow && (
                            <MenuItem
                              onClick={(e) => {
                                handleClickDeleteRow(item[mappingClickField] as number);
                              }}>
                              <AppIcon icon={Delete} />
                              <Typography ml={2}>Delete</Typography>
                            </MenuItem>
                          )}
                        </AppMoreMenu>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={pageSize} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={headerConfigs.length}
                    count={displayData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        'aria-label': 'rows per page',
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default AppTable;
