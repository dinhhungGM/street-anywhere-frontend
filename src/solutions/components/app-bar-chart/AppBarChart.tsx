import { Box, Paper } from '@mui/material';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import _ from 'lodash';
import randomColor from 'randomcolor';
import { memo, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

interface IAppBarChartProps {
  options?: any;
  data?: any[];
  imgField?: string;
  isStats?: boolean;
  labelField: string;
  valueField: string;
  chartTitle?: string;
  hoverLabel?: string;
}
const AppBarChart = ({
  data = [],
  labelField,
  valueField,
  options = {},
  isStats = false,
  hoverLabel = 'Number of uses',
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
      aspectRatio: 5 / 3,
      layout: {
        padding: {
          top: 32,
        },
      },
      ...options,
    };
  }, [data]);

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
          label: hoverLabel,
          data: config.data,
          backgroundColor: randomColor({
            count: config.labels.length,
            format: 'rgb',
            luminosity: 'dark',
          }),
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
