import { Close, Search } from '@mui/icons-material';
import {
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
import styles from './styles.module.scss';

interface IAppTableProps {
  headerConfigs: {
    isCenter: boolean;
    header: string;
  }[];
  rowConfigs: {
    isCenter?: boolean;
    field: string;
    customClass?: string;
  }[];
  rowKey?: string;
  customTableHeaderClasses?: string;
  isDisplayMoreMenu?: boolean;
  data?: any[];
  pageSize?: number;
  menuTemplate?: any;
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
}

const AppTable = ({
  rowKey,
  data = [],
  pageSize = 9,
  rowConfigs,
  headerConfigs,
  menuTemplate = null,
  searchByField = null,
  filterByField = null,
  dropDownOptions = [],
  isFilterByOption = true,
  isDisplayMoreMenu = false,
  appTableCustomClass = null,
  appTableContentClass = null,
  searchPlaceholder = 'Search',
  dropdownPlaceholder = 'Options',
  customTableHeaderClasses = null,
  appTableFilterBarCustomClass = null,
}: IAppTableProps) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(pageSize);
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;
  const [search, setSearch] = useState('');
  const [dropdown, setDropdown] = useState('');

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

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayData = useMemo(() => {
    return _.filter(data, (item) => {
      if (!search && !dropdown) {
        return true;
      }
      let isValidSearch = !search ? true : _.lowerCase(item[searchByField]).includes(search.trim().toLowerCase());
      let isValidField = !dropdown ? true : _.isEqual(item[filterByField], dropdown);
      return isValidSearch && isValidField;
    });
  }, [search, dropdown, data]);

  return (
    <>
      <Box component={Paper} elevation={3} className={cx(styles['app-table'], appTableCustomClass)}>
        <Box className={cx(styles['app-table__filter-bar'], appTableFilterBarCustomClass)}>
          <Grid container spacing={2}>
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
                    }
                  >
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
        <Box className={cx(styles['app-table__content'], appTableContentClass)}>
          <TableContainer>
            <Table aria-label='custom pagination table'>
              <TableHead className={cx(styles['app-table__content__thead'], customTableHeaderClasses)}>
                <TableRow>
                  {headerConfigs.map((col) => (
                    <TableCell key={col.header} component='th' align={col.isCenter ? 'center' : 'left'}>
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
                  <TableRow key={item[rowKey] || idx} hover>
                    {rowConfigs.map((config, i) => (
                      <TableCell
                        key={config.field || i}
                        component='td'
                        align={config.isCenter ? 'center' : 'left'}
                        className={cx(config.customClass)}
                      >
                        <Typography fontWeight={600}>{item[config.field]}</Typography>
                      </TableCell>
                    ))}
                    {isDisplayMoreMenu && <TableCell>{/* <AppMoreMenu /> */}</TableCell>}
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
                    colSpan={3}
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
