import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Box } from '@mui/material';
import _ from 'lodash';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const defaultOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

interface IAppLineChartProps {
  options?: any;
  data?: any;
  labelField: string;
  valueField: string;
}
const AppLineChart = ({ options = defaultOptions, data = [], labelField, valueField }: IAppLineChartProps) => {
  const chartData = useMemo(() => {
    return {
      labels: _.map(data, labelField),
      datasets: _.map(data, (item) => ({
        label: item[labelField],
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      })),
    };
  }, [data]);
  return (
    <>
      <Box>
        <Line options={options} data={chartData} />
      </Box>
    </>
  );
};

export default React.memo(AppLineChart);
