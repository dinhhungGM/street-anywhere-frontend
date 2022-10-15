import React, { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Box } from '@mui/material';
import _ from 'lodash';

ChartJS.register(ArcElement, Tooltip, Legend);

interface IAppDoughnutChartProps {
  options?: any;
  data: any;
  labelField: string;
  valueField: string;
}
const AppDoughnutChart = ({ data = [] }: IAppDoughnutChartProps) => {
  const chartData = useMemo(() => {
    return {};
  }, [data]);
  return (
    <>
      <Box></Box>
    </>
  );
};

export default React.memo(AppDoughnutChart);
