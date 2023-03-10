import { Box, Paper } from '@mui/material';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import _ from 'lodash';
import randomColor from 'randomcolor';
import React, { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface IAppDoughnutChartProps {
  options?: any;
  data?: any;
  labelField: string;
  valueField: string;
  title?: string;
}
const AppDoughnutChart = ({
  data = [],
  labelField,
  valueField,
  title = 'Doughnut Chart',
}: IAppDoughnutChartProps) => {
  const chartData = useMemo(() => {
    const labels = _.map(data, (item) => item[labelField]);
    const details = _.map(data, (item) => item[valueField]);
    const colors = randomColor({ count: labels.length, format: 'rgb', luminosity: 'dark' });
    return {
      labels,
      datasets: [
        {
          label: title,
          data: details.filter((item) => +item),
          backgroundColor: colors,
          borderColor: colors,
          borderWidth: 1,
        },
      ],
    };
  }, [data]);

  return (
    <>
      <Box component={Paper} elevation={2}>
        <Box
          padding={3}
          sx={{
            width: '650px',
            margin: 'auto',
          }}>
          <Doughnut
            options={{
              plugins: {
                datalabels: {
                  color: '#fff',
                  font: {
                    weight: 'bold',
                    size: 18,
                  },
                },
              },
            }}
            data={chartData}
          />
        </Box>
      </Box>
    </>
  );
};

export default React.memo(AppDoughnutChart);
