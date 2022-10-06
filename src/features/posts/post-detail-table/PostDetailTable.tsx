import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { memo } from 'react';

interface IPostDetailTableProps {
  location?: string;
  longitude?: number;
  latitude?: number;
}

const PostDetailTable = ({ location, longitude, latitude }: IPostDetailTableProps) => {
  return (
    <>
      <Box paddingY={3}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: '#000',
                }}
              >
                <TableCell>
                  <Typography fontWeight={700} color='#fff'>
                    Information
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={700} color='#fff'>
                    Detail
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Location</TableCell>
                <TableCell>{location}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Longitude</TableCell>
                <TableCell>{longitude}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Latitude</TableCell>
                <TableCell>{latitude}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default memo(PostDetailTable);
