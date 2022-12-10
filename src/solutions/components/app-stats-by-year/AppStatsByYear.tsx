import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import { memo, useMemo, useState } from 'react';
import { AppLineChart } from '../app-line-chart';
import _ from 'lodash';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

interface IAppStatsByYearProps {
  dataByYears: any;
  chartTitle?: string;
}
const AppStatsByYear = ({ dataByYears = null, chartTitle = 'Chart' }: IAppStatsByYearProps) => {
  const [year, setYear] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setYear(event.target.value as string);
  };
  const yearOptions = useMemo(() => {
    if (_.isEmpty(dataByYears) || _.isNil(dataByYears)) {
      return [];
    }
    const years = Object.keys(dataByYears);
    if (years.length) {
      setYear(years[0]);
    }
    return years;
  }, [dataByYears]);

  const chartData = useMemo(() => {
    if (year && dataByYears[year]) {
      return _.map(dataByYears[year].details, (data) => ({
        month: MONTHS[data.month - 1],
        count: data.count,
      }));
    }
    return [];
  }, [year]);

  return (
    <>
      <Stack spacing={2} alignItems='center' justifyContent='center'>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Year</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={year}
            label='Year'
            onChange={handleChange}>
            {yearOptions &&
              yearOptions.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <Box width='100%' height='100%'>
          <AppLineChart data={chartData} labelField='month' valueField='count' chartTitle={chartTitle} />
        </Box>
      </Stack>
    </>
  );
};

export default memo(AppStatsByYear);
