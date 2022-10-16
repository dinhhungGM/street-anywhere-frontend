import { useMemo, memo } from 'react';
import { Box, Paper } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import _ from 'lodash';
import randomColor from 'randomcolor';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface IAppBarChartProps {
  options?: any;
  data?: any[];
  chartTitle?: string;
  labelField: string;
  valueField: string;
}
const AppBarChart = ({
  options = {},
  data = [],
  labelField,
  valueField,
  chartTitle = 'Chart.js Bar Chart',
}: IAppBarChartProps) => {
  const chartOptions = useMemo(() => {
    return {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: chartTitle,
          position: 'bottom' as const,
        },
      },
      ...options,
    };
  }, []);

  const chartData = useMemo(() => {
    const labels = _.map(data, (item) => item[labelField]);
    return {
      labels,
      datasets: [
        {
          label: 'Number of uses',
          data: _.map(data, (item) => item[valueField]),
          backgroundColor: randomColor({ count: labels.length, format: 'rgb' }),
        },
      ],
    };
  }, [data]);

  return (
    <>
      <Box component={Paper} padding={2} elevation={3}>
        <Bar options={chartOptions} data={chartData} />
      </Box>
    </>
  );
};

export default memo(AppBarChart);
