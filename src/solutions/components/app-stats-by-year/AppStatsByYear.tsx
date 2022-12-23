import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material';
import _ from 'lodash';
import { memo, useMemo, useState } from 'react';
import { AppBarChart } from '../app-bar-chart';

const MONTHS = [
  'Jan',
  'Feb',
  'March',
  'April',
  'May',
  'June',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
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
      const details = dataByYears[year].details;
      return _.map(MONTHS, (month, idx) => {
        const itemData = _.find(details, (item) => item.month === idx + 1);
        return {
          month,
          count: itemData ? itemData.count : 0,
        };
      });
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
          <AppBarChart
            data={chartData}
            labelField='month'
            valueField='count'
            chartTitle={chartTitle}
            isStats
          />
        </Box>
      </Stack>
    </>
  );
};

export default memo(AppStatsByYear);
