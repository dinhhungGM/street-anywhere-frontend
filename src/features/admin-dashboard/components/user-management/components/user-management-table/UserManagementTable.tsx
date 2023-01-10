import {
  Avatar,
  Chip,
  Stack,
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
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserMoreMenu } from '../user-more-menu';
import styles from './styles.module.scss';
import { tableConfigs } from './tableConfigs';

interface IUserManagementTableProps {
  adminUserId: number;
  allUsers: any[];
}
const UserManagementTable = ({ adminUserId, allUsers }: IUserManagementTableProps) => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(9);
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allUsers.length) : 0;
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <>
      <TableContainer>
        <Table aria-label='custom pagination table'>
          <TableHead className={styles.thead}>
            <TableRow>
              {tableConfigs.map((col) => (
                <TableCell key={col.field} component='th' align={col.isCenter ? 'center' : 'left'}>
                  <TableSortLabel>
                    <Typography fontWeight={700}>{col.headerName}</Typography>
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? allUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : allUsers
            ).map((user) => (
              <TableRow
                key={user.id}
                hover
                onClick={() => navigate(`/profile/${user.id}`)}
                sx={{ cursor: 'pointer' }}>
                <TableCell component='th' scope='row'>
                  <Typography fontWeight={600}>{user.id}</Typography>
                </TableCell>
                <TableCell>
                  <Stack
                    direction='row'
                    spacing={2}
                    alignItems='center'
                    justifyContent='flex-start'>
                    <Avatar src={user.profilePhotoUrl} alt={`${user.fullName} Avatar`} />
                    <Typography fontWeight={600}>{user.fullName}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Chip label={user.role} color={user.isAdmin ? 'error' : 'primary'} />
                </TableCell>
                <TableCell>
                  <Avatar src={user.rankLogoUrl} alt={user.rankName} />
                </TableCell>
                <TableCell>
                  <Typography>{user.rankName}</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography>{user.postCount}</Typography>
                </TableCell>
                <TableCell>
                  <UserMoreMenu adminUserId={adminUserId} user={user} />
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={allUsers.length}
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
    </>
  );
};

export default React.memo(UserManagementTable);
