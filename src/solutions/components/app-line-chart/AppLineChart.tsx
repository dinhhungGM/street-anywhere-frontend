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
        datalabels: {
          backgroundColor: function (context) {
            return context.dataset.backgroundColor;
          },
          borderRadius: 4,
          color: 'white',
          font: {
            weight: 'bold',
          },
          formatter: Math.round,
          padding: 6,
        },
      },
      aspectRatio: 5 / 3,
      layout: {
        padding: {
          top: 32,
          right: 16,
          bottom: 16,
          left: 8,
        },
      },
      elements: {
        line: {
          fill: false,
          tension: 0.4,
        },
      },
      scales: {
        y: {
          stacked: true,
        },
      },
      ...options,
    };
  }, []);
  const chartData = useMemo(() => {
    const color = randomColor({ format: 'rgb', luminosity: 'dark' });
    const config = _.reduce(
      data,
      (acc, item) => {
        const value = item[valueField];
        if (value) {
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
