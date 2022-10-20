import { Box, Paper } from '@mui/material';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import _ from 'lodash';
import randomColor from 'randomcolor';
import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface IAppLineChartProps {
  options?: any;
  data?: any;
  labelField: string;
  valueField: string;
  chartTitle?: string;
}
const AppLineChart = ({
  options,
  data = [],
  labelField,
  valueField,
  chartTitle = 'Chart.js Line Chart',
}: IAppLineChartProps) => {
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
    const color = randomColor({ format: 'rgb' });
    return {
      labels: _.map(data, labelField),
      datasets: [
        {
          label: 'Number of uses',
          data: _.map(data, valueField),
          borderColor: color,
          backgroundColor: color,
        },
      ],
    };
  }, [data]);

  return (
    <>
      <Box padding={3} component={Paper} elevation={3}>
        <Line options={chartOptions} data={chartData} />
      </Box>
    </>
  );
};

export default React.memo(AppLineChart);
