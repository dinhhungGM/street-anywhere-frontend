import { useMemo, memo } from 'react';
import { Box, Paper } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
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
  isStats?: boolean;
}
const AppBarChart = ({
  options = {},
  data = [],
  labelField,
  valueField,
  chartTitle = 'Chart.js Bar Chart',
  isStats = false,
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
    const config = _.reduce(
      data,
      (acc, item) => {
        const value = item[valueField];
        if (value || isStats) {
          acc.labels.push(item[labelField]);
          acc.data.push(value);
        }
        return acc;
      },
      { labels: [], data: [] },
    );
    return {
      labels: config.labels,
      datasets: [
        {
          label: 'Number of uses',
          data: config.data,
          backgroundColor: randomColor({ count: config.labels.length, format: 'rgb' }),
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
